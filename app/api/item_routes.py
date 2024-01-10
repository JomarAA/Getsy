from flask import Blueprint, jsonify, request
from flask_login import current_user
from flask_login import login_required
from ..models import db
from ..models.user import Item, Cart, User
from .AWS_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename
from ..forms.item_form import ItemForm


item_routes = Blueprint('items', __name__)

@item_routes.route('/')
def get_items():
    item_list = Item.query.all()

    items = [item.to_dict() for item in item_list]

    return jsonify(items)


@item_routes.route('/<int:id>')
def get_single_item(id):

    item = Item.query.get(id)

    item_data = item.to_dict()

    return jsonify(item_data)


@item_routes.route('/current')
@login_required
def get_curr_items():
    userId = current_user.id

    items = Item.query.filter_by(sellerId=userId).all()

    item_data = [item.to_dict() for item in items]

    return jsonify(item=item_data)


@item_routes.route('/new', methods=['POST'])
@login_required
def create_new_item():

    form = ItemForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        uploaded_file = form.image.data

        if uploaded_file:
            uploaded_file.filename = get_unique_filename(uploaded_file.filename)
            upload = upload_file_to_s3(uploaded_file)
            print(upload)

            if 'url' not in upload:
                return 'Upload errors'

            new_item = Item(
                image=upload['url'],
                sellerId=current_user.id,
                name=form.name.data,
                description=form.description.data,
                quantity=form.quantity.data,
                price=form.price.data
            )

            db.session.add(new_item)
            db.session.commit()

            return 'Item created successfully'
        else:
            return 'No file uploaded'

    return form.errors

@item_routes.route('/<int:id>/update', methods=["PUT"])
@login_required
def update_item(id):

    form = ItemForm()


    item = Item.query.get(id)

    if not item:
        return jsonify(error='Item not found'), 404

    if item.sellerId != current_user.id:
        return jsonify(error='Unauthorized'), 403

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        original_image = item.image

        new_image = form.data["image"]

        if not isinstance(new_image, str):
            new_image.filename = get_unique_filename(new_image.filename)
            upload = upload_file_to_s3(new_image)

            if "url" not in upload:
                return upload

            remove_file_from_s3(original_image)
            item.image = upload["url"]

        item.name = form.name.data
        item.description = form.description.data
        item.quantity = form.quantity.data
        item.price = form.price.data
        db.session.commit()

        return 'Item updated successfully'

    else:
        return form.errors

@item_routes.route('/<int:id>/delete', methods=["DELETE"])
@login_required
def delete_item(id):
    item = Item.query.get(id)

    if not item:
        return jsonify(error='Item not found'), 404

    if item.sellerId != current_user.id:
        return jsonify(error='Unauthorized'), 403

    # Remove the item's image from S3 (assuming you have an AWS helper function for this)
    remove_file_from_s3(item.image)

    db.session.delete(item)
    db.session.commit()

    return 'Item deleted successfully'
