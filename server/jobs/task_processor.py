from db_adapter import db
from bson import ObjectId
from cortical_api import liteClient

import logging

log = logging.getLogger('werkzeug')
source = "task_processor.processTask"

# TODO get out of the job folder,
# TODO add caller for this function: (after add task in resources/task, add new event to a queue with the personId , taskId, reader for the queue, and call this function
def processTask(person_id, task_id):
    log.warn("%s: Processing task..." % source)

    new_task = db.tasks.find_one({'_id': ObjectId(task_id)})
    assert new_task != None, "Didn't fint task %s in db" % task_id

    person = db.persons.find_one({'_id': ObjectId(person_id)})
    assert person != None, "Didn't fint person %s in db" % person_id

    person_profile_ids = person.get('profiles')
    assert person_profile_ids != None, "Person must have list of profiles"

    for profile_id in person_profile_ids:
        profile = db.profiles.find_one({'_id': ObjectId(profile_id)})

        if not 'taskGroups' in profile:
            # create new task group and add the task to the group and set the task as the task leader
            created_task_group_result = db.tasks_group.insert_one({'profileId': profile_id, 'taskLeaderId': task_id, 'tasksIds': [task_id], 'lastUpdated': int(time.time())})

            # connect the new task group list in the profile 'taskGroups' list
            new_task_groups_list = [created_task_group_result.inserted_id]
            db.profiles.update_one({'_id': ObjectId(profile_id)}, {'$set': {'taskGroups': new_task_groups_list}})

            log.warn("%s: [Profile: %s] No taskGroups for profile, added new one with current task" % (source, profile['ProfileName']))
        else:
            profile_group_ids = profile['taskGroups']

            # Use this to decide for which task_group' leader the similiarity percentage is maximum and then add this task to this task group.
            max_similarity_percentage = 0.54; # is the minimum value of similarity that a task should have before we want to add it to an existing group. If no task group found, should create a new task group, and add that task to that group. (on creating new task_group should set the first task as leader!
            most_similar_group = None
            is_group_found_for_new_task = False
            
            for group_id in profile_group_ids:
                group = db.tasks_group.find_one({'_id': ObjectId(group_id)})
                group_task_leader_id = group['taskLeaderId']
                group_task_leader = db.tasks.find_one({'_id': ObjectId(group_task_leader_id)})

                similarity_percentage = liteClient.compare(new_task["content"], group_task_leader["content"])

                if (similarity_percentage >= max_similarity_percentage):
                    # found the most similar group until now
                    most_similar_group = group
                    # save the similar percentage
                    max_similarity_percentage = similarity_percentage

            # Check if we found a similar group to the task. If yes - add the task to the task_group.
            if (most_similar_group != None):
                # add to task_group this task
                new_tasks_list = group['tasks'] + [task_id]
                db.tasks_group.update_one({'_id': ObjectId(group['_id'])}, {'$set': {'tasks': new_tasks_list, 'LastUpdated': int(time.time())}})

                log.warn("%s: [Profile: %s] Found taskGroup similiar (%s) to current task, group_id: %s" % \
                    (source, profile['ProfileName'], max_similarity_percentage, group['_id']))
            else:
                # Else - no group similar to the task was found
                # so thus need create new task group and add the task to the group and set the task as the task leader
                created_task_group_result = db.tasks_group.insert_one({'profileId': profile_id, 'taskLeaderId': task_id, 'tasksIds': [task_id], 'lastUpdated': int(time.time())})

                # connect the new task group list in the profile 'taskGroups' list
                new_task_groups_list = profile['taskGroups'] + [created_task_group_result.inserted_id]
                db.profiles.update_one({'_id': ObjectId(profile_id)}, {'$set': {'taskGroups': new_task_groups_list}})

                log.warn("%s: [Profile: %s] Add new taskGroup, because no taskGroups was enough similiar" % (source, profile['ProfileName']))

if __name__ == '__main__':
    processTask("5981f5a58ae6893b20843dc4","5982289e8ae6892308ac1eb0")