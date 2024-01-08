from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os


environment = os.getenv('FLASK_ENV')
SCHEMA = os.environ.get('SCHEMA')



class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

class Item(db.Model):
    __tablename__ = 'items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(250), nullable=False)
    sellerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.TIMESTAMP, default=datetime.now())
    updatedAt = db.Column(db.TIMESTAMP, default=datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'sellerId': self.sellerId,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'image': self.image,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }


class Cart(db.Model):
    __tablename__ = 'cart'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    item_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('items.id')))
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'item_id': self.item_id,
            'quantity': self.quantity,
            'created_at': self.created_at
        }

    user = db.relationship('User', primaryjoin="Cart.user_id == User.id")
    item = db.relationship('Item', primaryjoin="Cart.item_id == Item.id")
