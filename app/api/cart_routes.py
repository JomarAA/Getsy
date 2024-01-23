from flask import Blueprint, jsonify, request
from flask_login import current_user
from ..models import db
from ..models.user import Item, Cart, User
from flask_login import login_required
from ..forms.cart_form import CartForm
from ..forms.item_form import ItemForm

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/user')
@login_required
def get_cart():
    userId = current_user.id
    cart_items = Cart.query.filter_by(user_id=userId).all()

    cart_data = []

    for cart_item in cart_items:
        item = Item.query.get(cart_item.item_id)
        if item:
            cart_data.append({
                'cart_id': cart_item.id,
                'item_id': item.id,
                'item_name': item.name,
                'item_description': item.description,
                'item_quantity': cart_item.quantity,
                'item_price': item.price,
                'image': item.image,
                'created_at': cart_item.created_at,
                'id': cart_item.id
            })

    return jsonify(cart_data)


@cart_routes.route('/<int:item_id>', methods=['POST'])
def add_to_cart(item_id):
    quantity = request.json.get('quantity')

    cart_item = Cart.query.filter_by(user_id=current_user.id, item_id=item_id).first()

    if cart_item:
        cart_item.quantity += 1
    else:
        cart_item = Cart(user_id=current_user.id, item_id=item_id, quantity=1)
        db.session.add(cart_item)

    db.session.commit()

    return jsonify(message='Item added to cart successfully')

@cart_routes.route('/checkout', methods=['DELETE'])
@login_required
def checkout_cart():
    cart_items = Cart.query.filter_by(user_id=current_user.id).all()

    for cart_item in cart_items:
        db.session.delete(cart_item)

    db.session.commit()

    return jsonify(message='Cart checked out and cleared successfully')

@cart_routes.route('/<int:id>/update', methods=['PUT'])
@login_required
def update_item_in_cart(id):
    cart_item = Cart.query.filter_by(user_id=current_user.id, id=id).first()

    form = CartForm()


    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        cart_item.quantity = form.data["quantity"]
        db.session.commit()


    return jsonify(message='Item updated in cart successfully', cart_item=cart_item.to_dict())


@cart_routes.route('/<int:id>/delete', methods=["DELETE"])
@login_required
def delete_cart_item(id):
    item = Cart.query.get(id)

    db.session.delete(item)
    db.session.commit()

    return 'Item deleted successfully'
