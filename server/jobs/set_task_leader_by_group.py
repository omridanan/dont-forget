# for task_group in task_groups:
#   if task_group was changed since last run time:
#       for task in task_group:
#           +1 for entity in task in entities table
#            Entities Table
#            ---------------
#            TaskGroup - EntityName - Count
#            
#            sum_task = 0 
#           
#          for task in tasks:
#                for entity in task_entities:
#                    sum_task += entity_salience * entity_percentage
#                    
#            Get the task which has the max sum_task,
#            set it as task leader

from db_adapter import db

def get_tasks_group():
    tasks_groups = list(db.tasks_group.find())
    return tasks_groups
    
def run():
    tasks_groups = get_tasks_group()
    
    for tasks_group in tasks_groups:
        
        tasks = tasks_group['tasks']
        task_group_id = tasks_groups['_id']
        entities_count = db.entities_group.find_one({'_id': ObjectId(task_group_id)})['entities_count']
        all_entities_count = float(sum(entities_count.values())) # float needed for divide (3 / 100 = 0.03, not 0)
        
        sum_tasks = {}
        
        print "TaskGroupId", task_group_id
        
        for task_id in tasks:
            
            print "TaskId", task_id
            
            task = db.tasks.find_one({'_id': ObjectId(task_id)})
            sum_task = 0
            
            entities_for_task = db.entities.find_one({'_id': ObjectId(task_group_id)})
            
            for entity_id in entities_for_task:
                
                print "EntityId", entity_id
                
                entity = db.tasks.find_one({'_id': ObjectId(entity_id)})
                
                entity_count = entities_count['entity_id']
                
                entity_percentage = float(entity_count) / all_entities_count
                
                entity_val = entity['salience'] * entity_percentage
                
                sum_task += entity_val
                
                sum_tasks[task_id] = sum_task
                
                print "SumTask", sum_task
                
        
        # Get max sum_task by task
        max_task_id = max(sum_tasks)
        
        # Set as task leader
        db.tasks_group.update_one(
            {'_id': ObjectId(task_group_id)}, 
            { '$set' : { "taskLeaderId" : task_id  }
        )
        
        print "MaxTaskId", max_task_id
            
if __name__ = "__main__":
    run()
        
    