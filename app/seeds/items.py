from app.models import db, User, Item, environment, SCHEMA
from sqlalchemy.sql import text

def seed_items():
    Item1 = Item(
        sellerId='1', name='sweater', quantity=3, description='nice sweater', price = 23.43, image='https://getsy.s3.us-west-1.amazonaws.com/sweater2.webp')
    Item2 = Item(
        sellerId='2', name='ring', quantity=1, description='nice ring', price = 123.43, image='https://getsy.s3.us-west-1.amazonaws.com/ring.avif')
    Item3 = Item(
        sellerId='3', name='shelf', quantity=6, description='nice shelf', price = 80.99, image='https://getsy.s3.us-west-1.amazonaws.com/shelf.jpeg')

    db.session.add(Item1)
    db.session.add(Item2)
    db.session.add(Item3)
    db.session.commit()

def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
