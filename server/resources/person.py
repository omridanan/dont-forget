from bson import ObjectId
from flask_restful import Resource, abort, reqparse
from flask import request
from db_adapter import db
from json_utils import json_response
from webargs import fields
from webargs.flaskparser import use_args, parser, use_kwargs

from task import task_args

person_args = {
    'facebookId': fields.Str(),
    'firstName': fields.Str(),
    'lastName': fields.Str(),
    'birthday': fields.Str(),
    'email': fields.Str(),
    'gender': fields.Str()
    # 'person_id' : fields.UUID(required=True)
}


class PersonListResource(Resource):
    # GET - list *all* persons
    def get(self):
        facebook_id = request.args.get('facebookId')
        filter = {'facebookId': facebook_id} if facebook_id else {}
        return json_response(list(db.persons.find(filter)))

    # POST - create new person
    @use_args(person_args)
    def post(self, args):
        result = db.persons.insert_one(args)
        return json_response(db.persons.find({'_id': result.inserted_id})[0])


class PersonResource(Resource):
    # GET - get specific person by id
    def get(self, person_id):
        result = db.persons.find_one({'_id': ObjectId(person_id)})
        if not result:
            abort(404)

        return json_response(result)

    # PUT - update person
    @use_args(person_args)
    def put(self, args, person_id):
        result = db.persons.update_one(
            {'_id': ObjectId(person_id)}, 
            { '$set' : args }
        )
        
        return json_response(result.raw_result)
        

class PersonTasksResource(Resource):
    def get(self, person_id):
        result = list(db.tasks.find({'personId': ObjectId(person_id), 'isDeleted': False}))

        return json_response(result)

    @use_args(task_args)
    def post(self, args, person_id):
        args['personId'] = ObjectId(person_id)
        args['isSuggested'] = False
        args['isDeleted'] = False
        result = db.tasks.insert_one(args)
        return json_response(db.tasks.find({'_id': result.inserted_id})[0])
