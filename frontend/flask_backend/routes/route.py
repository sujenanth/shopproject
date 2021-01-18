#!/usr/bin/env python3

from flask import Blueprint
from flask import request
from schemas import *
from . import routes

import bcrypt


@routes.route('/register')
def register():
    password = b"123456"
    print(password)
    hashed = bcrypt.hashpw(password, bcrypt.gensalt())
    print(hashed)
    user = User(firstname="Sujenan", lastname="Thirumamany", password=hashed)
    return 'imported'


@routes.route('/check')
def check():
    print("test")
    return 'checked'
