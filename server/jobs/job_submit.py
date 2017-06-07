from redis import Redis
from rq import Queue

q = Queue(connection=Redis())

def run_task_flow_manager():
    import java_taskserver_api as japi
    q.enqueue(japi.process_task)
    
    
if __name__ == '__main__':
    run_task_flow_manager()
    
   

