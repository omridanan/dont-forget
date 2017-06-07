from bson import ObjectId
from flask_restful import Resource, abort
from db_adapter import db
from json_utils import json_response
from webargs import fields, ValidationError
from webargs.flaskparser import use_args, parser, use_kwargs
import logging
import re
from marshmallow import Schema, fields

log = logging.getLogger('werkzeug')

def validate_reminder_repeat_field(val):
    if not re.match('\d[mhdw]', val):
        raise ValidationError("Date repeat interval field must be like: '5m', '1h', '2d' or '2w' etc.")

class ReminderSchema(Schema):
    date = fields.Int(required=True)
    repeat = fields.Str(validate=validate_reminder_repeat_field, required=True) # 1h, 2m, 5d 
    
class TaskSchema(Schema):
    title = fields.Str(required=True)
    note = fields.Str(required=True)
    label = fields.List(fields.Str(), required=True)
    reminder = fields.Nested(ReminderSchema)
    color = fields.Str(required=True)
    time = fields.Int(required=True)
    restore = fields.Str(required=True)

    class Meta:
        strict = True
    
    
# task_args = {
#     "title" : fields.Str(required=True),
#     "note"  : fields.Str(),
#     "label" : fields.List(fields.Str()),
#     "reminder" : fields.Nested({
#         'date' : fields.Int(),
#         'repeat' : fields.Str(validate=validate_reminder_repeat_field, required=True), # 1h, 2m, 5d
#     }, required=True),
#     "color" : fields.Str(), # RGB
#     "time" : fields.Int(), # created time
#     "restore" : fields.Str(), # "note"
# }

task_args = {
    'content': fields.Str(),
    'reminder': fields.Str(required=False)
}

class TaskListResource(Resource):
    # GET all
    def get(self):
        return json_response(list(db.tasks.find()))

    # POST
    @use_args(TaskSchema())
    def post(self, args):
        result = db.tasks.insert_one(args)
        return json_response({"ObjectId" : result.inserted_id})


class TaskResource(Resource):
    # GET by id
    def get(self, task_id):
        result = db.tasks.find_one({'_id': ObjectId(task_id)})
        if not result:
            abort(404)

        return json_response(result)

    # PUT 
    #@use_args(task_args, partial=True)
    @use_args(task_args)
    def put(self, args, task_id):
        result = db.tasks.update_one(
            {'_id': ObjectId(task_id)}, 
            { '$set' : args }
        )
        
        return json_response(db.tasks.find({'_id': ObjectId(task_id)})[0])

    def delete(self, task_id):
        db.tasks.update_one({'_id': ObjectId(task_id)}, {"$set": {'isDeleted': True}})
        return ''
