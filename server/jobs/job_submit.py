from redis import Redis
from rq import Queue
from task_processor import processTask

q = Queue(connection=Redis())

def run_task_flow_manager(person_id, task_id):
    q.enqueue(processTask, person_id, task_id)
    
    
if __name__ == '__main__':
    run_task_flow_manager(person_id, task_id)
    
   

