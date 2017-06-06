import task
import requests
import json
import time first, then int(time.time())

BASE_URL = "http://localhost:8080/tasks"

def test_post_task():
    url = BASE_URL
    post_task = {
    	"color" : "#00BFFF",
    	"labels" : ["play", "football"],
    	"note" : "post task test",
    	"restore" : "",
    	"time" : 1496769943,
    	"title": "post task test"
    }
    
    

def test_get_task():
    url = BASE_URL + "/5936e5cf1940d14812465d5a"
    response = requests.get(url)
    json_task = response.text
    received_task = json.loads(json_task)
    
    assert response.status_code == 200
    
    demand_task = {
        "_id": "5936e5cf1940d14812465d5a",
    	"color" : "#00BFFF",
    	"labels" : ["play", "football"],
    	"note" : "important note",
    	"restore" : "",
    	"time" : 1496769943,
    	"title": "Go play football with friends"
    }
    
    assert received_task == demand_task

def test_put_task():
    pass

def test_delete_task():
    pass

def test_get_all_task():
    url = BASE_URL
    response = requests.get(url)
    json_tasks = response.text
    tasks = json.loads(json_tasks)
    
    assert response.status_code == 200
    assert len(tasks) >= 1
    
    t1 = tasks[-1]
    
    assert type(t1) == dict
    
    fields = ["_id", "title", "note", "labels", "color", "time", "restore"]
    
    for field in fields:
        assert field in t1