#!flask/bin/python
from flask import Flask, request
from flask_restful import Api

from resources.person import PersonResource, PersonListResource, PersonTasksResource, PersonSuggestedTasksResource
from resources.task import TaskResource, TaskListResource
from flask_cors import CORS
#import cortical_api
import logging

log = logging.getLogger('werkzeug')

app = Flask(__name__)
api = Api(app)
CORS(app)

api.add_resource(PersonListResource, '/persons')
api.add_resource(PersonResource, '/persons/<person_id>')
api.add_resource(PersonTasksResource, '/persons/<person_id>/tasks')
api.add_resource(PersonSuggestedTasksResource, '/persons/<person_id>/suggested_tasks')
api.add_resource(TaskListResource, '/tasks')
api.add_resource(TaskResource, '/tasks/<task_id>')


@app.route("/")
def home():
    return "Don't Forget!"

@app.route("/api/AnalyzeTextGoogle/<text>")
def get_labels_for_text(text):
    return text

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8080)
