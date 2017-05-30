from redis import Redis
from rq import Queue

q = Queue(connection=Redis())

def run_task_flow_manager():
    import task_flow_manager
    q.enqueue(task_flow_manager.main)
    
    
if __name__ == '__main__':
    run_task_flow_manager()
    
   

