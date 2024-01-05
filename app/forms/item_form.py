from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, FileField, FileRequired, FileAllowed, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange
from ..models.user import Item
from ..api.AWS_helpers import ALLOWED_EXTENSIONS

class ItemForm(FlaskForm):
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    name = StringField('Name', validators=[DataRequired(), Length(min=3)])
    description = StringField('Description', validators=[DataRequired(), Length(min=4)])
    price = IntegerField('Price', validators=[DataRequired(), NumberRange(min=0.5, message="Price cannot be less than 0.5")])
    submit = SubmitField('Post Item')
