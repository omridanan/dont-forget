from bson import ObjectId
from flask_restful import Resource, abort, reqparse

from db_adapter import db
from json_utils import json_response

def get_person_data():
    parser = reqparse.RequestParser()
        
    parser.add_argument('name', type=str, required=True, location='json')
    parser.add_argument('birthdate', type=int, required=True, location='json')

    args = parser.parse_args(strict=True)

    person_data = {
        "name" : args["name"],
        "birthdate" : args["birthdate"]
    }

    return person_data

class PersonListResource(Resource):
    # GET - list *all* persons
    def get(self):
        return json_response(list(db.persons.find()))

    # POST - create new person
    def post(self):
        person_data = get_person_data()
        result = db.persons.insert_one(person_data)
        
        return json_response({"ObjectId" : result.inserted_id})


class PersonResource(Resource):
    # GET - get specific person by id
    def get(self, person_id):
        result = db.persons.find_one({'_id': ObjectId(person_id)})
        if not result:
            abort(404)

        return json_response(result)

    # UPDATE - update fields of an already exists person 
    def put(self, person_id):
        person_data = get_person_data()
        result = db.persons.update_one({'_id': ObjectId(person_id)}, { '$set' : person_data })

        return json_response(result.raw_result)

class PersonTasksResource(Resource):
    def get(self, person_id):
        result = list(db.persontasks.find({'person_id': ObjectId(person_id)}))
        if not result:
            abort(404)

        return json_response(result)
