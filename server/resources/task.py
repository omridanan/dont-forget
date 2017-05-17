from bson import ObjectId
from flask_restful import Resource, abort

from db_adapter import db
from json_utils import json_response

# Task {
#   id: string;
#   title: string;
#   note: string;
#   label: string;
#   reminder: {
#     date: string,
#     repeat: string
#   };
#   color: string;
#   time: string;
#   restore: string;
# }

def get_task_data():
    parser = reqparse.RequestParser()
        
    parser.add_argument('title', type=str, required=True, location='json')
    parser.add_argument('note', type=str, required=False, location='json')
    parser.add_argument('label', type=list, required=True, location='json')
    parser.add_argument('label', type=list, required=True, location='json')

    person_data = parser.parse_args(strict=True)

    return person_data

class TaskListResource(Resource):
	# GET all
    def get(self):
        return json_response(list(db.tasks.find()))

    # POST
    def post(self):
        person_data = get_person_data()
        result = db.persons.insert_one(person_data)
        
        return json_response({"ObjectId" : result.inserted_id})


class TaskResource(Resource):
	# GET by id
    def get(self, task_id):
        result = db.tasks.find_one({'_id': ObjectId(task_id)})
        if not result:
            abort(404)

        return json_response(result)

    # PUT 
    def put(self, task_id):
    	pass
