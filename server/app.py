#!flask/bin/python
from flask import Flask, request
from flask_restful import Api

from resources.person import PersonResource, PersonListResource, PersonTasksResource
from resources.task import TaskResource, TaskListResource
# from resources.tasks_group import *
from flask_cors import CORS
import cortical_api
import logging

log = logging.getLogger('werkzeug')

app = Flask(__name__)
api = Api(app)
CORS(app)

api.add_resource(PersonListResource, '/persons')
api.add_resource(PersonResource, '/persons/<person_id>')
api.add_resource(PersonTasksResource, '/persons/<person_id>/tasks')
api.add_resource(TaskListResource, '/tasks')
api.add_resource(TaskResource, '/tasks/<task_id>')
# api.add_resource(TaskGroupListResource(), '/tasks_group')
# api.add_resource(TaskGroupResource(), '/tasks_group/<task_group_id>')


@app.route("/")
def home():
    return "Don't Forget!"

@app.route("/api/AnalyzeTextGoogle/<text>")
def get_labels_for_text(text):
    return text

@app.route("/api/ExtractTextKeywordsCortical/<text>")
def extract_text_keywords_cortical(text):
    return cortical_api.get_keywords(text)

@app.route("/api/CompareTextCortical")
def compare_texts_cortical():
    text1 = str(request.args.get('text1'))
    text2 = str(request.args.get('text2'))

    value = cortical_api.compare_texts_similarity(text1, text2)
    
    return str(value)
    
@app.route("/api/CompareSimilarity")
def compare_similarity():
    return compare_texts_cortical()


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8080)
