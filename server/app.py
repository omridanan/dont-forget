from flask import Flask, request, send_from_directory
from flask_restful import Api
from flask_cors import CORS
from resources.person import PersonResource, PersonListResource, PersonTasksResource, PersonSuggestedTasksResource, PersonSuggestedTaskResource
from resources.task import TaskResource, TaskListResource

app = Flask(__name__)
api = Api(app)
CORS(app)

API_PREFIX = '/api'

api.add_resource(PersonListResource, '%s/persons' % API_PREFIX)
api.add_resource(PersonResource, '%s/persons/<person_id>' % API_PREFIX)
api.add_resource(PersonTasksResource, '%s/persons/<person_id>/tasks' % API_PREFIX)
api.add_resource(PersonSuggestedTasksResource, '%s/persons/<person_id>/suggested_tasks' % API_PREFIX)
api.add_resource(PersonSuggestedTaskResource, '%s/persons/<person_id>/suggested_tasks/<suggested_task_id>' % API_PREFIX)
api.add_resource(TaskListResource, '%s/tasks' % API_PREFIX)
api.add_resource(TaskResource, '%s/tasks/<task_id>' % API_PREFIX)

@app.route('/')
def root():
    return send_from_directory('static', 'index.html')

@app.route('/<path:path>')
def static_file(path):
    return app.send_static_file(path)
    
@app.route('/login')
def login():
    return send_from_directory('static', 'index.html')
    
@app.route('/register')
def register():
    return send_from_directory('static', 'index.html')
    
@app.route('/tasks')
def home():
    return send_from_directory('static', 'index.html')

@app.route("/api/AnalyzeTextGoogle/<text>")
def get_labels_for_text(text):
    return text

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8080)
