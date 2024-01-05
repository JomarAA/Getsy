from flask import Blueprint, jsonify, request
from flask_login import current_user
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

    user = User.query.get(userId)
    items = Item.query.filter_by(sellerId=userId).all()

    user_data = user.to_dict()

    item_data = [item.to_dict() for item in items]

    return jsonify(user=user_data, item=item_data)

@item_routes.route('/new', methods=['POST'])
def create_new_item():

    form = ItemForm()

    image = form.data['image']
    image.filename = get_unique_filename(image.filename)
    upload = upload_file_to_s3(image)
    print(upload)

    if 'url' not in upload:
        return 'upload errors'

    new_item = Item(
        image= form.image['image'],
        name=form.name["name"],
        description=form.description["description"],
        price=form.price["price"]
    )

    print(new_item)
    db.session.add(new_item)
    db.session.commit()

    return new_item
