from bson import ObjectId
from flask_restful import Resource, abort, reqparse
from flask import request
from db_adapter import db
from json_utils import json_response
from webargs import fields
from webargs.flaskparser import use_args, parser, use_kwargs
from marshmallow import Schema, fields
from datetime import datetime
from .task import TaskSchema

class PersonSchema(Schema):
    facebookId = fields.Str()
    firstName = fields.Str()
    lastName =  fields.Str()
    birthday = fields.Str()
    email = fields.Str()
    gender = fields.Str()
    profiles = fields.List(fields.Str())

    class Meta:
        strict = True

# person_args = {
#     'facebookId': fields.Str(),
#     'firstName': fields.Str(),
#     'lastName': fields.Str(),
#     'birthday': fields.Str(),
#     'email': fields.Str(),
#     'gender': fields.Str(),
#     'relationshipStatus': fields.Str(),
#     'isSoldier': fields.Bool(),
#     'isStudent': fields.Bool(),
#     'isRentingApartment': fields.Bool(),
#     'likeSport': fields.Bool(),
#     'likeTechnology': fields.Bool(),
#     'likeTours': fields.Bool(),
#     'likeCooking': fields.Bool(),
#     'likeMusic': fields.Bool(),
#     'likeArt': fields.Bool(),
#     'likeFinance': fields.Bool(),
#     'likePolitics': fields.Bool(),
# }

class PersonListResource(Resource):
    # GET - list *all* persons
    def get(self):
        facebook_id = request.args.get('facebookId')
        filter = {'facebookId': facebook_id} if facebook_id else {}
        return json_response(list(db.persons.find(filter)))

    # POST - create new person
    @use_args(PersonSchema())
    def post(self, args):
        args['profiles'] = []
        if args['isSoldier']: args['profiles'].append("593882bf734d1d61de882751")
        if args['isStudent']: args['profiles'].append("59385bbf734d1d61de87fd1d")
        if args['isRentingApartment']: args['profiles'].append("59388361734d1d61de882889")
        if args['likeSport']: args['profiles'].append("5981e556734d1d04a1b3603f")
        if args['likeTechnology']: args['profiles'].append("5981e565734d1d04a1b3604d")
        if args['likeTours']: args['profiles'].append("5981e577734d1d04a1b36052")
        if args['likeCooking']: args['profiles'].append("5981e585734d1d04a1b36053")
        if args['likeMusic']: args['profiles'].append("5981e591734d1d04a1b36057")
        if args['likeArt']: args['profiles'].append("5981e5a2734d1d04a1b3605f")
        if args['likeFinance']: args['profiles'].append("5981e5ad734d1d04a1b36066")
        if args['likePolitics']: args['profiles'].append("5981e5ba734d1d04a1b3606c")

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
    @use_args(PersonSchema())
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

    @use_args(TaskSchema())
    def post(self, args, person_id):
        args['personId'] = ObjectId(person_id)
        args['isSuggested'] = args.get('isSuggested') or False
        args['isDeleted'] = False
        result = db.tasks.insert_one(args)
        return json_response(db.tasks.find({'_id': result.inserted_id})[0])


class PersonSuggestedTasksResource(Resource):
    def get(self, person_id):
        suggestion_status = db.user_suggestion_status.find({'personId': ObjectId(person_id)})

        # if suggestion_status.count() == 0:
        #     db.user_suggestion_status.insert_one({'personId': ObjectId(person_id), 'status': 'Suggested'})
        #     user = db.persons.find({'_id': ObjectId(person_id)})[0]
        #     profiles = []
        #     age = get_age_from_birthdate(user.get('birthday'))
        #     if 18 <= age <= 27:
        #         profiles.append('Young18to27')
        #     if user.get('isSoldier'):
        #         profiles.append('Soldier')
        #     if user.get('isStudent'):
        #         profiles.append('CollegeStudent')
        #     if user.get('gender') == 'Male':
        #         profiles.append('Man')
        #         if user.get('relationshipStatus') == 'Married':
        #             profiles.append('MarrigedMan')
        #     else:
        #         profiles.append('Woman')
        #         if user.get('relationshipStatus') == 'Married':
        #             profiles.append('MarrigedWoman')
        #         if age >= 50:
        #             profiles.append('Woman50To120')
        #     if user.get('rentingApartment'):
        #         profiles.append('RentingAnApartment')

        #     suggestions = db.task_suggestions_per_profile.find({'profile': {'$in': profiles}})
        #     return json_response(reduce(lambda x, y: x + y, [s['tasks'] for s in suggestions]))

        return json_response([])


def get_age_from_birthdate(birthdate):
    b_date = datetime.strptime(birthdate, '%m/%d/%Y')
    return int(((datetime.today() - b_date).days / 365))
