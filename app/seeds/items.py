from app.models import db, User, Item, environment, SCHEMA
from sqlalchemy.sql import text

def seed_items():
    Item1 = Item(
        sellerId='1', name='sweater', quantity=3, description='nice sweater', price = 23.43, category='Clothing', image='https://getsy.s3.us-west-1.amazonaws.com/sweater2.webp')
    Item2 = Item(
        sellerId='2', name='ring', quantity=1, description='nice ring', category='Jewlery', price = 123.43, image='https://getsy.s3.us-west-1.amazonaws.com/ring.avif')
    Item3 = Item(
        sellerId='3', name='shelf', quantity=6, description='nice shelf', price = 80.99, category='Home & Living',image='https://getsy.s3.us-west-1.amazonaws.com/shelf.jpeg')
    Item4 = Item(
        sellerId='2', name='white sweater', quantity=2, description='california sweater', price = 30.99, category='Clothing', image='https://getsy.s3.us-west-1.amazonaws.com/51ACKs2j-DL._AC_SX679_.jpg')
    Item5 = Item(
        sellerId='3', name='yellow jacket', quantity=4, description='a very good kids sweater', category='Clothing' , price = 20.99, image='https://getsy.s3.us-west-1.amazonaws.com/91BGszOvK4L._AC_SX679_.jpg')
    Item6 = Item(
        sellerId='1', name='Hardwood Lucet ', quantity=4, description='Beautiful Hardwood Lucet in two sizes for Cord Making the Viking Medieval Way-Beautiful Cherry or Walnut-Great for Kids', price = 12.12, category='Craft Supplies & Tools', image='https://getsy.s3.us-west-1.amazonaws.com/il_680x540.1607138151_7mpz.jpeg')
    Item7 = Item(
        sellerId='2', name='Mucic Journal', quantity=8, description='Leather bound personalized music daily journal', price = 19.99, category='Books, Movies & Music', image='https://getsy.s3.us-west-1.amazonaws.com/il_680x540.5622208262_cdvw.jpeg')
    Item8 = Item(
        sellerId='3', name='Bath Bombs', quantity=20, description='Aromatherapy Bath Bomb - Bath and Beauty Bath Bomb Spa Gift Set for Her- Bath Bombs - Bath Self Care Gift Set', price = 19.99, category='Bath & Beauty', image='https://getsy.s3.us-west-1.amazonaws.com/il_680x540.5610101734_bxvw.jpeg')
    Item10 = Item(
        sellerId='3', name='Crossbody leather bag,', quantity=4, description='Crossbody leather and fabric bag great for every day use. It will fit your most essential things inside such as phone, keys, wallet... The strap is detachable, so you can also use it as a clutch if you prefer to.', price = 29.39, category='Bags & Purses', image='https://getsy.s3.us-west-1.amazonaws.com/il_340x270.2563255638_j6nq.jpeg')
    Item11 = Item(
        sellerId='2', name='J Baby Toddler Bodysuit', quantity=17, description='Your little"un will be the coolest kid in nursery in this DJ Headphones baby/toddler bodysuit.', price =12.45 , category='Baby', image='https://getsy.s3.us-west-1.amazonaws.com/il_1588xN.1481574430_btva.jpeg')
    Item12 = Item(
        sellerId='1', name='Personalized initial pin', quantity=31, description='Personalized brass pin. Custom made initialized great give for men', price =16.12 , category='Accessories', image='https://getsy.s3.us-west-1.amazonaws.com/ff53b06035dd42fb9e69d5fe42752c4d.jpeg')
    Item13 = Item(
        sellerId='1', name='Personalized Headphone Stand', quantity=17, description="This handmade headphone stand holds your headphones and phone, giving you more space on your desk. It's designed to take up little space while looking good on a bedside table, desk, or next to your TV. Made from the highest quality birch plywood, this stand offers multiple options for placement around your home or office.", price =49.90 , category='Electronics & Accessories', image='https://getsy.s3.us-west-1.amazonaws.com/il_794xN.2934516109_t39i.jpeg')
    Item14 = Item(
        sellerId='2', name='Tufted Titmouse Print Bird Watercolor Painting', quantity=3, description='Size and framing notes- 11x14" and larger prints are shipped in a tube and may be shipped separately from other items in your order.- Prints have an additional white border (size refers to image size). The prints fit into a standard mat window for that size. If you are buying an unmatted print and would like it cut to exact size (to go in a frame with no mat) let me know in the checkout notes and I can trim it for you.', price = 18.00, category='Art & Collectibles', image='https://getsy.s3.us-west-1.amazonaws.com/il_794xN.5199383381_2wjz.jpeg')
    Item15 = Item(
        sellerId='3', name='Custom home address plate', quantity=19, description='Custom made home address plate. Mahogany hand made, crafted by request. Shipping 2-7 weeks.', price = 17.22, category='Home & Living', image='https://getsy.s3.us-west-1.amazonaws.com/il_1588xN.2240139670_i5dn.jpeg')
    Item16 = Item(
        sellerId='3', name='Linen wrap dresses for women', quantity=60, description='A Wrap Dress midi is a timeless and elegant wardrobe essential that can elevate any outfit. Handmade from pure linen, organic linen, or flax, it offers a comfortable, breathable, and sustainable option for fashion-conscious individuals', price =80.64 , category='Clothing', image='https://getsy.s3.us-west-1.amazonaws.com/il_1588xN.2515107181_b7dy.jpeg')
    Item17 = Item(
        sellerId='2', name='State necklace', quantity=13, description='A brass necklace with states. Made epr request choose from any states to have on necklace.', price =21.33 , category='Jewlery', image='https://getsy.s3.us-west-1.amazonaws.com/il_1588xN.599928682_abcm.jpeg')
    Item18 = Item(
        sellerId='1', name='Simple black leather crossbody bag with zipper', quantity=12, description='This simple crossbody bag is made of soft black leather and is fully lined with zippered top closure.', price = 31.11, category='Bags & Purses', image='https://getsy.s3.us-west-1.amazonaws.com/f5c3b883b50346b19e2b7b640f5e447f.jpeg')
    Item19 = Item(
        sellerId='1', name='Personalized jewlery tray', quantity=24, description='Custom made personalized jewlery tray. Tray made of oak holds jerwlery safe, personalize with engraving upon request.', price = 21.34, category='Accessories', image='https://getsy.s3.us-west-1.amazonaws.com/c74f29f2bbc749dd9b549c830fb86c3a.jpeg')
    Item20 = Item(
        sellerId='2', name='Children"s Black Ox Sweater', quantity=21, description='Black ox childrens sweater. 70percent cotton, for children sizes 3-6, 7-12', price =17.22 , category='Clothing', image='https://getsy.s3.us-west-1.amazonaws.com/593dc22f8e39459e98150d3c6d70f074.jpeg')
    Item21 = Item(
        sellerId='1', name='Cute cat pattern fingerless gloves', quantity=43, description='Fingerless knitted gloves, cute cat pattern, really soft and cozy. There is medium and large size available. These gloves will keep you warm and cozy and show off your love of your furry cat.', price =14.79 , category='Clothing', image='https://getsy.s3.us-west-1.amazonaws.com/f72e0ef4b9e94eb9b6f1031e31cd9ad5.jpeg')
    Item22 = Item(
        sellerId='1', name='Personalized Sideways Initial Birthstone Necklace,', quantity=12, description='A Personalized Sideways Initial Birthstone Necklace that you will love! Perfect a special gift to yourself and others, a dainty sideways letter surely to be a beautiful accent piece to any ocassion!', price = 17.22, category='Jewlery', image='https://getsy.s3.us-west-1.amazonaws.com/e69403d254354ca7bfba3dceaa0aafc2.jpeg')
    Item23 = Item(
        sellerId='1', name="Ol' Weathered Plank Low Pro", quantity=7, description='This modern rustic platform bed is perfect for any home, from country cottage to city loft. This platform bed and headboard is made of solid, carefully selected planks. We locally source all the materials used to hand make this epic bed. The natural grain gives you warmth and vibes of the wild, while the sleek low profile design keeps things just modern enough.', price =1193.40 , category='Home & Living', image='https://getsy.s3.us-west-1.amazonaws.com/d02351112f16442aa3ab8657a7729c55.jpeg')


    db.session.add(Item1)
    db.session.add(Item2)
    db.session.add(Item3)
    db.session.add(Item4)
    db.session.add(Item5)
    db.session.add(Item6)
    db.session.add(Item7)
    db.session.add(Item8)
    db.session.add(Item10)
    db.session.add(Item11)
    db.session.add(Item12)
    db.session.add(Item13)
    db.session.add(Item14)
    db.session.add(Item15)
    db.session.add(Item16)
    db.session.add(Item17)
    db.session.add(Item18)
    db.session.add(Item19)
    db.session.add(Item20)
    db.session.add(Item21)
    db.session.add(Item22)
    db.session.add(Item23)
    db.session.commit()

def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM items"))

    db.session.commit()
