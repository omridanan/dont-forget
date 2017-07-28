from db_adapter import db
from pprint import pprint
from bson import ObjectId

# TODO check this value if it should be greater. **reminder maybe need to add tasks.
MIN_TASKS_IN_GROUP = 5

def get_profiles():
    profiles = list(db.profiles.find())
    return profiles
    
# TODO caching?
def get_tasks_group_users(profiles):
    result = {}
    
    for profile in profiles:
        
        profile_id = str(profile['_id'])
        
        result[profile_id] = {}
        
        tasks_groups_ids = profile['taskGroups']
        
        for tasks_group_id in tasks_groups_ids:
            
            result[profile_id][tasks_group_id] = set() # set of users
            
            task_group = db.tasks_group.find_one({'_id': ObjectId(tasks_group_id)})
            
            tasks_ids = task_group['tasks']
            
            for task_id in tasks_ids:
                
                task = db.tasks.find_one({'_id': ObjectId(task_id)})
                
                if not task:
                    print "not found task:", task_id, tasks_group_id, profile_id
                    continue
                else: #TODO remove the else or insert the next rows under the else block
                    # print "exists", task_id, tasks_group_id, profile_id
                    pass
                
                person_id = str(task['personId'])
                
                result[profile_id][tasks_group_id].add(person_id)
                
    return result 
    
def run():
    profiles = get_profiles()

    # TODO change users variable name to persons (also in function name)
    # {'profile_id' : {'task_group_id' : ['user1', '+user2']}}
    users_per_task_group = get_tasks_group_users(profiles)
    
    for profile in profiles:
        
        profile_id = str(profile['_id'])
        
        persons_in_profile = profile['persons']
        
        tasks_groups_ids = profile['taskGroups']
        
        for tasks_group_id in tasks_groups_ids:
            
            tasks_group = db.tasks_group.find_one({'_id': ObjectId(tasks_group_id)})
            
            tasks_count = len(tasks_group['tasks'])
            
            if tasks_count < MIN_TASKS_IN_GROUP:
                print "TaskGroup contains less than %s, count: %s. continue..." % (MIN_TASKS_IN_GROUP, tasks_count)
                continue
            
            print "TaskGroup contains more than %s, count: %s" % (MIN_TASKS_IN_GROUP, tasks_count)
            
            # find persons which does not have a task in group
            for person_id in persons_in_profile:
                
                if person_id not in users_per_task_group[profile_id][tasks_group_id]:

                    #TODO: note: task suggested contains the task that should be suggets to each person (personId, task_group_Id, status(= new/declined)) need to add condition that status is not declined
                    task_suggested = db.task_suggested.find_one({'person_id': person_id})
                    #TODO add a condition that the task_group_id is not exist in task_suggested collection for this user. task_suggested has to support multiple tasks per user

                    # this task didn't be prapre to suggest (not ignored or new)
                    if not task_suggested:
                        
                        print "Add new task_suggested (task_group_id: %s, person_id: %s)" % ( tasks_group_id, person_id )
                        
                        # add this task to table
                        db.task_suggested.insert_one({
                            "tasksGroup" : tasks_group_id,
                            "personId" : person_id,
                            "status" : "new"
                        })
                    else:
                        print "This person has already this task_suggested (task_group_id: %s, person_id: %s)" % ( tasks_group_id, person_id )
                        
if __name__ == '__main__':
    run()