import json
from bson import ObjectId
from flask import make_response
import datetime
from bson.json_util import dumps


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, datetime.datetime):
            return o.isoformat()
        return json.JSONEncoder.default(self, o)
    
def json_response(data, status=200):
    response = make_response(json.dumps(data, cls=JSONEncoder))
    #response = make_response(dumps(data))
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    response.status_code = status
    return response
