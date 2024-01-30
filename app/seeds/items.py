from app.models import db, User, Item, environment, SCHEMA
from sqlalchemy.sql import text

def seed_items():
    Item1 = Item(
        sellerId='1', name='sweater', quantity=3, description='nice sweater', price = 23.43, category= 'Clothing', image='https://getsy.s3.us-west-1.amazonaws.com/sweater2.webp')
    Item2 = Item(
        sellerId='2', name='ring', quantity=1, description='nice ring', category= 'Jewlery', price = 123.43, image='https://getsy.s3.us-west-1.amazonaws.com/ring.avif')
    Item3 = Item(
        sellerId='3', name='shelf', quantity=6, description='nice shelf', price = 80.99, category='Home & Living',image='https://getsy.s3.us-west-1.amazonaws.com/shelf.jpeg')
    Item4 = Item(
        sellerId='2', name='white sweater', quantity=2, description='california sweater', price = 30.99, category= 'Clothing', image='https://getsy.s3.us-west-1.amazonaws.com/51ACKs2j-DL._AC_SX679_.jpg')
    Item5 = Item(
        sellerId='3', name='yellow jacket', quantity=4, description='a very good kids sweater', category= 'Clothing', price = 20.99, image='https://getsy.s3.us-west-1.amazonaws.com/91BGszOvK4L._AC_SX679_.jpg')
    Item6 = Item(
        sellerId='1', name='black sweater', quantity=4, description='black ox childrens sweater', price = 50.22, category= 'Clothing', image='https://getsy.s3.us-west-1.amazonaws.com/6eb8274b55d1421e882adad99fbbf2a6.jpeg')

    db.session.add(Item1)
    db.session.add(Item2)
    db.session.add(Item3)
    db.session.add(Item4)
    db.session.add(Item5)
    db.session.add(Item6)
    db.session.commit()

def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
