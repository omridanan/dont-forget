#!flask/bin/python
from flask import Flask, request, send_from_directory
from flask_restful import Api

from resources.person import PersonResource, PersonListResource, PersonTasksResource, PersonSuggestedTasksResource
from resources.task import TaskResource, TaskListResource
# from resources.tasks_group import *
from flask_cors import CORS
#import cortical_api
import logging

log = logging.getLogger('werkzeug')

app = Flask(__name__, static_url_path='')
api = Api(app)
CORS(app)

api.add_resource(PersonListResource, '/persons')
api.add_resource(PersonResource, '/persons/<person_id>')
api.add_resource(PersonTasksResource, '/persons/<person_id>/tasks')
api.add_resource(PersonSuggestedTasksResource, '/persons/<person_id>/suggested_tasks')
api.add_resource(TaskListResource, '/tasks')
api.add_resource(TaskResource, '/tasks/<task_id>')
# api.add_resource(TaskGroupListResource(), '/tasks_group')
# api.add_resource(TaskGroupResource(), '/tasks_group/<task_group_id>')

@app.route('/')
def root():
    return send_from_directory('static', 'index.html')
    
@app.route('/login')
def login():
    return send_from_directory('static', 'index.html')
    
@app.route('/register')
def register():
    return send_from_directory('static', 'index.html')
    
@app.route('/home')
def home():
    return send_from_directory('static', 'index.html')
    
@app.route('/<path:path>')
def static_path(path):
    return send_from_directory('static', path)

@app.route("/api/AnalyzeTextGoogle/<text>")
def get_labels_for_text(text):
    return text

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8080)
