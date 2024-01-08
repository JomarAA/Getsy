from flask import Blueprint, jsonify, request
from flask_login import current_user
from flask_login import login_required
from ..models import db
from ..models.user import Item, Cart, User
from .AWS_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename
from ..forms.item_form import ItemForm

from flask_login import login_required, current_user

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
def get_curr_items():
    userId = current_user.id

    items = Item.query.filter_by(sellerId=userId).all()

    item_data = [item.to_dict() for item in items]

    return jsonify(item=item_data)


@item_routes.route('/new', methods=['POST'])
def create_new_item():

    form = ItemForm()

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
                sellerId=form.sellerId.data,
                name=form.name.data,
                description=form.description.data,
                price=form.price.data
            )

            db.session.add(new_item)
            db.session.commit()

            return 'Item created successfully'
        else:
            return 'No file uploaded'

    return 'Form validation failed'
