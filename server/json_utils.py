import json

from bson import ObjectId
from flask import make_response


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


def json_response(data, status=200):
    response = make_response(json.dumps(data, cls=JSONEncoder))
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    response.status_code = status
    return response
