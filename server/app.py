#!flask/bin/python
from flask import Flask
from flask_restful import Api

from resources.person import PersonResource, PersonListResource, PersonTasksResource
from resources.task import TaskResource, TaskListResource

app = Flask(__name__)
api = Api(app)

api.add_resource(PersonListResource, '/persons')
api.add_resource(PersonResource, '/persons/<person_id>')
api.add_resource(PersonTasksResource, '/persons/<person_id>/tasks')
api.add_resource(TaskListResource, '/tasks')
api.add_resource(TaskResource, '/tasks/<task_id>')

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8080)
