from bson import ObjectId
from flask_restful import Resource, abort

from db_adapter import db
from json_utils import json_response


class TaskListResource(Resource):
    def get(self):
        return json_response(list(db.tasks.find()))


class TaskResource(Resource):
    def get(self, task_id):
        result = db.tasks.find_one({'_id': ObjectId(task_id)})
        if not result:
            abort(404)

        return json_response(result)
