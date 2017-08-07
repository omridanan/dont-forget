from bson import ObjectId
from flask_restful import Resource, abort
from db_adapter import db
from json_utils import json_response
from webargs import fields, ValidationError
from webargs.flaskparser import use_args, parser, use_kwargs
import logging
import re
from marshmallow import Schema, fields
import java_taskserver_api as japi

log = logging.getLogger('werkzeug')

class TasksGroupSchema(Schema):
    profileId = fields.Str() # TODO why do we need this? I didn't insert it to the class diagram
    taskGroupId = fields.Str()
    tasks = fields.List(fields.Str())
    taskLeaderId = fields.Str()
    LastUpdated = fields.Int()

    class Meta:
        strict = True

class TasksGroupListResource(Resource):
    # GET all
    def get(self):
        return json_response(list(db.tasks_group.find()))

    # POST
    @use_args(TasksGroupSchema())
    def post(self, args):
        result = db.tasks_group.insert_one(args)
        
        return json_response({"ObjectId" : result.inserted_id})

class TasksGroupResource(Resource):
    # GET by id
    def get(self, task_group_id):
        result = db.tasks_group.find_one({'_id': ObjectId(task_group_id)})
        if not result:
            abort(404)

        return json_response(result)

    # PUT 
    @use_args(TasksGroupSchema())
    def put(self, args, task_group_id):
        result = db.tasks_group.update_one(
            {'_id': ObjectId(task_group_id)}, 
            { '$set' : args }
        )
        
        return json_response(db.tasks_group.find({'_id': ObjectId(task_group_id)})[0])

    def delete(self, task_group_id):
        db.tasks_group.update_one({'_id': ObjectId(task_group_id)}, {"$set": {'isDeleted': True}})
        return ''
