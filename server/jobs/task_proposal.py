from db_adapter import db
from pprint import pprint
from bson import ObjectId

MIN_TASKS_IN_GROUP = 5

def get_profiles():
    profiles = list(db.profiles.find())
    return profiles
    
# caching?
def get_tasks_group_users(profiles):
    result = {}
    
    for profile in profiles:
        profile_id = profile['_id']
        
        result[profile_id] = {}
        
        tasks_groups_ids = profile['taskGroups']
        
        for tasks_group_id in tasks_groups_ids:
            
            result[profile_id][tasks_group_id] = set() # set of users
            
            task_group = db.tasks_group.find_one({'_id': ObjectId(tasks_group_id)})
            
            tasks_ids = task_group['tasks']
            
            for task_id in tasks_ids:
                
                task = db.tasks.find_one({'_id': ObjectId(task_id)})
                
                person_id = task['person_id']
                
                result[profile_id][tasks_group_id].add(person_id)
                
    return result 
    
def run():
    profiles = get_profiles()
    
    # {'profile_id' : {'task_group_id' : ['user1', '+user2']}}
    users_per_task_group = get_tasks_group_users(profiles)
    
    return users_per_task_group
    
    for profile in profiles:
        
        profile_id = profile['_id']
        
        print "ProfileId", profile_id
        
        persons_in_profile = profile['persons']        
        
        tasks_groups_ids = profile['task_groups']
        
        for tasks_group_id in tasks_groups_ids:
            
            print "TaskGroupId", task_group_id
            
            tasks_group = db.tasks_groups.find_one({'_id': ObjectId(tasks_group_id)})
            
            tasks_count = len(tasks_group['tasks'])
            
            if tasks_count < MIN_TASKS_IN_GROUP:
                print "Continue...", tasks_count
                continue
            
            print "PassedMin", tasks_count
            
            # find persons which does not have a task in group
            for person_id in persons_in_profile:
                
                print "PersonId", person_id
                
                if person_id not in users_per_task_group[profile_id][tasks_group_id]:
                    
                    task_suggested = db.tasks_suggested.find_one({'person_id': person_id})
                    
                    # this task didn't be prapre to suggest (not ignored or new)
                    if not task_suggested:
                        
                        # add this task to table
                        db.task_suggested.insert_one({
                            "task_group_id" : task_group_id,
                            "person_id" : person_id,
                            "status" : "new"
                        })
                        
                        
if __name__ == '__main__':
    pprint(run())