from bson import ObjectId
from flask_restful import Resource, abort
from db_adapter import db
from json_utils import json_response
from webargs import fields, ValidationError
from webargs.flaskparser import use_args, parser, use_kwargs
import logging
import re
import job_submit
from marshmallow import Schema, fields


log = logging.getLogger('werkzeug')

def validate_reminder_repeat_field(val):
    if not re.match('\d[mhdw]', val):
        raise ValidationError("Date repeat interval field must be like: '5m', '1h', '2d' or '2w' etc.")

# class ReminderSchema(Schema):
#     date = fields.Int(required=True)
#     repeat = fields.Str(validate=validate_reminder_repeat_field, required=True) # 1h, 2m, 5d 

class EntitySchema(Schema):
    entity_name = fields.Str()
    entity_type = fields.Str()
    salience = fields.Float()
    
class TaskSchema(Schema):
    personId = fields.Str()
    content = fields.Str(required=True)
    # reminder = fields.Nested(ReminderSchema)
    reminder = fields.Str()
    #time = fields.Int(required=True) # TODO: check if should be required, because the current ui doesn't ask for time when adding new task
    time = fields.Int()  # TODO why we need this? I didn't add it to the class diagram
    isSuggested = fields.Boolean()
    suggestedGroup = fields.Str() # TODO why we need this? I didn't add it to the class diagram
    taskGroups = fields.List(fields.Str())  # TODO why we need this? I didn't add it to the class diagram
    entities =  fields.Nested(EntitySchema)

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
        
        # Call async to the task processor job to handle new task
        personId = args['personId']
        newTaskId = result.inserted_id
        job_submit.insert_new_task_event(personId, newTaskId)

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
        # TODO: fix fatal bug, updating the task, making it to disapear
        result = db.tasks.update_one(
            {'_id': ObjectId(task_id)}, 
            { '$set' : args }
        )
        
        return json_response(db.tasks.find({'_id': ObjectId(task_id)})[0])

    def delete(self, task_id):
        db.tasks.update_one({'_id': ObjectId(task_id)}, {"$set": {'isDeleted': True}})
        return ''
