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
from bson import ObjectId
from text_google_api import get_tags_for_text
from collections import defaultdict

def get_tasks_group():
    tasks_groups = list(db.tasks_group.find())
    return tasks_groups
# TODO add a check if it the group LastUpdated time is greater than the last run time of this job(when job running should add the run time to db)
def run():
    tasks_groups = get_tasks_group()
    
    for tasks_group in tasks_groups:
        
        tasks_ids = tasks_group['tasks']
        
        task_group_id = str(tasks_group['_id'])
        
        # entities_group_by_id = db.entities_group.find_one({'taskGroupId': task_group_id})
        
        # if not entities_group_by_id:
        #     print "There is no entities_group_by_id for %s, let's count and add it" % (task_group_id)
            
        entities_count = defaultdict(int)
        
        for task_id in tasks_ids:
            # entities -
            # _id, taskId, entities = [{entity_name, salience}]
            entities_for_task_row = db.entities.find_one({'taskId': task_id})
            
            task = db.tasks.find_one({'_id': ObjectId(task_id)})
            
            if not entities_for_task_row:
                print "There is not entities_for_task for %s, let's get it" % task_id
                entities_for_task = get_tags_for_text(task['content'])
                
                # insert the result to db
                db.entities.insert_one({
                    "taskId" : task_id,
                    "entities" : entities_for_task
                })
            else:
                print "There is already entities for task %s" % task_id
                entities_for_task = entities_for_task_row['entities']
                
            for entity in entities_for_task:
                entities_count[entity['name']] += 1
        
        # delete old row if exists
        db.entities_group.remove({ "taskGroupId" : task_group_id } );
        
        # insert entities_count to db
        db.entities_group.insert_one({
            "taskGroupId" : task_group_id,
            "entitiesCount" : entities_count
        })
        
        all_entities_count = float(sum(entities_count.values())) # float needed for divide (3 / 100 = 0.03, not 0)
        
        sum_tasks = {}
        
        # print "TaskGroupId", task_group_id
        
        for task_id in tasks_ids:
            
            # print "TaskId", task_id
            
            sum_task = 0
            
            # entities -
            # _id, taskId, entities = [{entity_name, salience}]
            entities_for_task_row = db.entities.find_one({'taskId': task_id})
            
            if not entities_for_task_row:
                print "There is not entities_for_task for %s, why??" % task_id
                # TODO don't return
                return
                
            else:
                entities_for_task = entities_for_task_row['entities']
            
            print "Entities for task: %s, are: %s" % (task_id, entities_for_task)
            
            for entity in entities_for_task:
                
                # print "Current Entity", str(entity)
                
                entity_count = entities_count[entity['name']]
                
                # print "Count in group", entities_count
                
                entity_percentage = float(entity_count) / all_entities_count
                
                entity_val = entity['salience'] * entity_percentage # how much the entity is strong in the sentence and how much is strong in the group.
                
                # print "Entity Val", entity_val
                
                sum_task += entity_val # TODO change to task strong value
                
                print "Sum Task for '%s', '%s' is: %f, percentage: %f, val: %f" % (task_id, entity['name'], entity_val, entity_percentage, entity_val)
                
                sum_tasks[task_id] = sum_task
            
            # print "SumTask", sum_tasks
        
        # Get max sum_task by task
        max_task_id = max(sum_tasks) #TODO max on the keys change to be on the values
        
        print "Max task id by sum_task is: %s with sum_task of: %s" % (max_task_id, sum_tasks[max_task_id])
        
        # Set as task leader
        db.tasks_group.update_one(
            {'_id': ObjectId(task_group_id)}, 
            { '$set' : { "taskLeaderId" : task_id } }
        )
        
        # print "MaxTaskId", max_task_id
            
if __name__ == '__main__':
    run()
        
    