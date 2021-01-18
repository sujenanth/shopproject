from flask import Blueprint

schemas = Blueprint('schemas', __name__)

from .models import *
