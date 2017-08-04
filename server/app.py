from flask import Flask, request, send_from_directory
from flask_restful import Api
from flask_cors import CORS
from resources.person import PersonResource, PersonListResource, PersonTasksResource, PersonSuggestedTasksResource
from resources.task import TaskResource, TaskListResource

app = Flask(__name__)
api = Api(app)
CORS(app)

api.add_resource(PersonListResource, '/persons')
api.add_resource(PersonResource, '/persons/<person_id>')
api.add_resource(PersonTasksResource, '/persons/<person_id>/tasks')
api.add_resource(PersonSuggestedTasksResource, '/persons/<person_id>/suggested_tasks')
api.add_resource(TaskListResource, '/tasks')
api.add_resource(TaskResource, '/tasks/<task_id>')

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
    
@app.route('/home')
def home():
    return send_from_directory('static', 'index.html')

@app.route("/api/AnalyzeTextGoogle/<text>")
def get_labels_for_text(text):
    return text

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8080)
