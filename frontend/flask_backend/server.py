from bson import json_util
from flask import Flask, Blueprint, Request
from flask_mongoengine import MongoEngine
from routes import *
from schemas import *
from flask_pymongo import PyMongo
from mongoengine import *
from flask_cors import CORS

import json
import pkgutil
import sys

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://timemanagement:yc4Z65MQz3qPFVR@37.120.160.221:27017/itemShop?authSource=admin"
app.config['MONGODB_CONNECT'] = True

mongo = PyMongo(app)

app.register_blueprint(routes, url_prefix="/api")
app.register_blueprint(schemas)
CORS(app)


class Item(Document):
    name = StringField(required=True)
    price = StringField(required=True)
    description = StringField()
    kategorie = StringField(required=True)
    imageurl = StringField(required=True)


def parse_json(data):
    return json.loads(json_util.dumps(data))


@app.route('/sss')
def showtest():
    items = mongo.db.items.find_one({'price': 879})
    array = parse_json(items)
    user = User(firstname="Nicola", lastname="Baechi", password="123456")
    mongo.db.users.insert_one(user.to_mongo())
    print(user.password)
    return '<h1>' + user.firstname + ' ' + user.lastname + '</h1>'


@app.route('/register')
def register():
    password = b"123456"
    print(password)
    hashed = bcrypt.hashpw(password, bcrypt.gensalt())
    print(hashed)
    user = User(firstname="Sujenan", lastname="Thirumamany", password=hashed)
    mongo.db.users.insert_one(user.to_mongo())
    return 'imported'


@app.route('/checkUser')
def user():
    param = request.get_json()
    form = request.form
    return {'test': form}


@app.route('/getAllItems')
def getitems():
    items = mongo.db.items.find({})
    parsed = parse_json(items)
    return {'items': parsed }