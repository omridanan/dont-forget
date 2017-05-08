#!flask/bin/python
from flask import Flask
from flask_restful import Api

from resources.person import PersonResource, PersonListResource
from resources.task import TaskResource, TaskListResource

app = Flask(__name__)
api = Api(app)

api.add_resource(PersonListResource, '/persons')
api.add_resource(PersonResource, '/persons/<person_id>')
api.add_resource(TaskListResource, '/tasks')
api.add_resource(TaskResource, '/tasks/<task_id>')

if __name__ == '__main__':
    app.run(debug=True)
