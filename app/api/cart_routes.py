from flask import Blueprint, jsonify, request
from flask_login import current_user
from ..models import db
from ..models.user import Item, Cart, User
from flask_login import login_required

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/')
@login_required
def get_cart_items_by_user(user_id):
    cart_items = Cart.query.filter_by(user_id=user_id).all()

    cart_data = [cart_item.to_dict() for cart_item in cart_items]

    return jsonify(cart_data)


@cart_routes.route('/<int:item_id>', methods=['POST'])
def add_to_cart(item_id):
    quantity = request.json.get('quantity')

    cart_item = Cart.query.filter_by(user_id=current_user.id, item_id=item_id).first()

    if cart_item:
        cart_item.quantity += quantity
    else:
        cart_item = Cart(user_id=current_user.id, item_id=item_id, quantity=quantity)
        db.session.add(cart_item)

    db.session.commit()

    return jsonify(message='Item added to cart successfully')

@cart_routes.route('/checkout', methods=['POST'])
def checkout_cart():
    cart_items = Cart.query.filter_by(user_id=current_user.id).all()

    for cart_item in cart_items:
        db.session.delete(cart_item)

    db.session.commit()

    return jsonify(message='Cart checked out and cleared successfully')
