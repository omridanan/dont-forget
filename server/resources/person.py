from bson import ObjectId
from flask_restful import Resource, abort, reqparse
from flask import request
from db_adapter import db
from json_utils import json_response, to_str
from webargs import fields
from webargs.flaskparser import use_args, parser, use_kwargs
from marshmallow import Schema, fields
from datetime import datetime
from .task import TaskSchema
import logging
import job_submit

log = logging.getLogger('werkzeug')

class PersonSchema(Schema):
    facebookId = fields.Str()
    firstName = fields.Str()
    lastName =  fields.Str()
    birthday = fields.Str()
    email = fields.Str()
    gender = fields.Str()
    profiles = fields.List(fields.Str())
    relationshipStatus = fields.Str()
    isSoldier = fields.Bool()
    isStudent = fields.Bool()
    isRentingApartment = fields.Bool()
    likeSport = fields.Bool()
    likeTechnology = fields.Bool()
    likeTours = fields.Bool()
    likeCooking = fields.Bool()
    likeMusic = fields.Bool()
    likeArt = fields.Bool()
    likeFinance = fields.Bool()
    likePolitics = fields.Bool()


    class Meta:
        strict = True

class PersonListResource(Resource):
    # GET user by facebook id
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
        if args['gender'] == "Male": args['profiles'].append("5981e4ba734d1d04a1b3600b")
        if args['gender'] == "Female": args['profiles'].append("59388299734d1d61de882663")
        if args['relationshipStatus'] == "Married": args['profiles'].append("59388562734d1d61de882a96")
        if args['relationshipStatus'] == "Single": args['profiles'].append("5981e7d5734d1d04a1b361d0")
        if args['relationshipStatus'] == "In a relationship": args['profiles'].append("5981e801734d1d04a1b36212")
        if args['relationshipStatus'] == "Engaged": args['profiles'].append("5981e82a734d1d04a1b36222")

        result = db.persons.insert_one(args)

        db.profiles.update(
            {'_id': {'$in': [ObjectId(profile) for profile in args['profiles']]}},
            {'$push': {'persons': result.inserted_id}}
        )

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

        log.warn("PersonTasksResource.post: Insert new task, args: %s" % to_str(args))
        result = db.tasks.insert_one(args)
        
        # Call async to the task processor job to handle new task
        personId = args['personId']
        newTaskId = result.inserted_id
        log.warn("PersonTasksResource.post: Trying to add new task event (PersonId- %s, TaskId-%s)" % (personId, newTaskId))
        
        job_submit.insert_new_task_event(personId, newTaskId)
        
        log.warn("PersonTasksResource.post: Added new task event")
        
        return json_response(db.tasks.find({'_id': result.inserted_id})[0])


class PersonSuggestedTasksResource(Resource):
    def get(self, person_id):
        suggestion_status = db.user_suggestion_status.find({'personId': ObjectId(person_id)})
        suggestion_status = db.task_suggested.find({'personId': ObjectId(person_id)})

        return json_response([])


def get_age_from_birthdate(birthdate):
    b_date = datetime.strptime(birthdate, '%m/%d/%Y')
    return int(((datetime.today() - b_date).days / 365))