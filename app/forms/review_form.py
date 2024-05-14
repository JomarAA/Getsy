from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange
from ..models.user import Review

class ReviewForm(FlaskForm):
    review = StringField('review', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired(), NumberRange(min=1, max=5)])
    submit = SubmitField('Post Item')
