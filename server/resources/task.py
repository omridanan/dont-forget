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

def validate_reminder_repeat_field(val):
    if not re.match('\d[mhdw]', val):
        raise ValidationError("Date repeat interval field must be like: '5m', '1h', '2d' or '2w' etc.")

class ReminderSchema(Schema):
    date = fields.Int(required=True)
    repeat = fields.Str(validate=validate_reminder_repeat_field, required=True) # 1h, 2m, 5d 
    
class TaskSchema(Schema):
    personId = fields.Str()
    content = fields.Str(required=True)
    reminder = fields.Nested(ReminderSchema)
    time = fields.Int(required=True)
    isSuggested = fields.Str()
    suggestedGroup = fields.Str()

    class Meta:
        strict = True

class TaskListResource(Resource):
    # GET all
    def get(self):
        return json_response(list(db.tasks.find()))

    # POST
    @use_args(TaskSchema())
    def post(self, args):
        result = db.tasks.insert_one(args)
        
        # Call job service handling new task
        # japi.process_task()
        log.warn(result)
        log.warn(args)
        
        return json_response({"ObjectId" : result.inserted_id})

class TaskResource(Resource):
    # GET by id
    def get(self, task_id):
        result = db.tasks.find_one({'_id': ObjectId(task_id)})
        if not result:
            abort(404)

        return json_response(result)

    # PUT 
    @use_args(TaskSchema())
    def put(self, args, task_id):
        result = db.tasks.update_one(
            {'_id': ObjectId(task_id)}, 
            { '$set' : args }
        )
        
        return json_response(db.tasks.find({'_id': ObjectId(task_id)})[0])

    def delete(self, task_id):
        db.tasks.update_one({'_id': ObjectId(task_id)}, {"$set": {'isDeleted': True}})
        return ''
