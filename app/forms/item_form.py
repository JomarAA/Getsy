from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, FileField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange
from flask_wtf.file import FileAllowed, FileRequired
from ..models.user import Item
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

choices = ['Accessories', 'Art & Collectibles', 'Baby', 'Bags & Purses', 'Bath & Beauty', 'Books, Movies & Music', 'Clothing', 'Craft Supplies & Tools', 'Electronics & Accessories', 'Gifts', 'Home & Living', 'Jewlery']

class ItemForm(FlaskForm):
    image = FileField("Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    name = StringField('Name', validators=[DataRequired(), Length(min=3)])
    description = StringField('Description', validators=[DataRequired(), Length(min=4)])
    price = IntegerField('Price', validators=[DataRequired(), NumberRange(min=0.5, message="Price cannot be less than 0.5")])
    quantity = IntegerField('Quantity', validators=(DataRequired(), NumberRange(min=0)))
    category = SelectField('Category', validators=[DataRequired()], choices=choices)
    submit = SubmitField('Post Item')
