from mongoengine import *


class User(Document):
    firstname = StringField(required=True)
    lastname = StringField(required=True)
    password = StringField(required=True)


class Item(Document):
    name = StringField(required=True)
    price = StringField(required=True)
    description = StringField()
    kategorie = StringField(required=True)
    imageurl = StringField(required=True)

    meta = {"db_alias": "default", 'collection': 'repo'}
