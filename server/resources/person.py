from bson import ObjectId
from flask_restful import Resource, abort

from db_adapter import db
from json_utils import json_response


class PersonListResource(Resource):
    def get(self):
        return json_response(list(db.persons.find()))


class PersonResource(Resource):
    def get(self, person_id):
        result = db.persons.find_one({'_id': ObjectId(person_id)})
        if not result:
            abort(404)

        return json_response(result)


class PersonTasksResource(Resource):
    def get(self, person_id):
        result = list(db.persontasks.find({'person_id': ObjectId(person_id)}))
        if not result:
            abort(404)

        return json_response(result)
