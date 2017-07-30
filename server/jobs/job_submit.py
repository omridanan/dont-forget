from redis import Redis
from rq import Queue
from task_processor import processTask
import test_rq

q = Queue(connection=Redis())

def run_task_flow_manager(person_id, task_id):
    q.enqueue(processTask, person_id, task_id)
    
def rq_test():
    q.enqueue(test_rq.run)
    
if __name__ == '__main__':
    # run_task_flow_manager(person_id, task_id)
    rq_test()
    
   

