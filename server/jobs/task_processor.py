from db_adapter import db
from bson import ObjectId
from cortical_api import liteClient
import time

def processTask(person_id, task_id):
    new_task = db.tasks.find_one({'_id': ObjectId(task_id)})
    person = db.persons.find_one({'_id': ObjectId(person_id)})

    person_profile_ids = person['profiles']

    for profile_id in person_profile_ids:
        profile = db.profiles.find_one({'_id': ObjectId(profile_id)})
        profile_group_ids = profile['taskGroups']

        is_group_found_for_new_task = False
        for group_id in profile_group_ids:
            group = db.tasks_group.find_one({'_id': ObjectId(group_id)})
            group_task_leader_id = group['taskLeaderId']
            group_task_leader = db.tasks.find_one({'_id': ObjectId(group_task_leader_id)})

            similarity_percentage = liteClient.compare(new_task["content"], group_task_leader["content"])

            if (similarity_percentage >= 60.0):
                # TODO: add to task_group this task
                new_group_task_list = group['tasks'] + [task_id]
                db.tasks_group.update({'_id': ObjectId(group_id)}, {'$set': {'tasks': new_group_task_list, 'LastUpdated': int(time.time())}})
                is_group_found_for_new_task = True

        if (is_group_found_for_new_task == False):
            db.tasks_group.insert_one({'ProfileId': profile_id, 'taskLeaderId': task_id, 'tasks': [task_id], 'LastUpdated': int(time.time())})



if __name__ == '__main__':
    processTask("593884b0734d1d61de882a5f","59390ad5734d1d61de884a70")