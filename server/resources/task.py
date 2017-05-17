from bson import ObjectId
from flask_restful import Resource, abort
from db_adapter import db
from json_utils import json_response
from webargs import fields
from webargs.flaskparser import use_args, parser, use_kwargs
import logging

log = logging.getLogger('werkzeug')


task_args = {
    "title" : fields.Str(),
    "note"  : fields.Str(),
    "label" : fields.List(fields.Str()),
    "reminder" : fields.Nested({
        'date' : fields.Int(),
        'repeat' : fields.Str(), # 1h, 2m, 5d 
    }),
    "color" : fields.Str(), # RGB
    "time" : fields.Int(), # created time
    "restore" : fields.Str(), # "note"
}

class TaskListResource(Resource):
	# GET all
    def get(self):
        return json_response(list(db.tasks.find()))

    # POST
    @use_args(task_args)
    def post(self, args):
        result = db.tasks.insert_one(args)
        log.error(args)
        
        return json_response({"ObjectId" : result.inserted_id})


class TaskResource(Resource):
	# GET by id
    def get(self, task_id):
        result = db.tasks.find_one({'_id': ObjectId(task_id)})
        if not result:
            abort(404)

        return json_response(result)

    # PUT 
    @use_args(task_args)
    def put(self, task_args, task_id):
    	result = db.tasks.update_one(
            {'_id': ObjectId(task_id)}, 
            { '$set' : args }
        )
        
        return json_response(result.raw_result)
