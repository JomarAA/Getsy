from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, FileField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange
from flask_wtf.file import FileAllowed, FileRequired
from ..models.user import Cart
from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class CartForm(FlaskForm):
    quantity = IntegerField("Quantity", validators=[DataRequired(), NumberRange(min=1, message='Quantity must be at least 1 to update')])
    submit = SubmitField('Post Item')
