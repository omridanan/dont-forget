from db_adapter import db
from bson import ObjectId
from cortical_api import liteClient
import time

# TODO get out of the job folder,
# TODO add caller for this function: (after add task in resources/task, add new event to a queue with the personId , taskId, reader for the queue, and call this function
def processTask(person_id, task_id):
    new_task = db.tasks.find_one({'_id': ObjectId(task_id)})
    person = db.persons.find_one({'_id': ObjectId(person_id)})

    person_profile_ids = person['profiles']

    for profile_id in person_profile_ids:
        profile = db.profiles.find_one({'_id': ObjectId(profile_id)})

        if not 'taskGroups' in profile:
            # create new task group and add the task to the group and set the task as the task leader
            created_task_group_result = db.tasks_group.insert_one({'ProfileId': profile_id, 'taskLeaderId': task_id, 'tasks': [task_id], 'LastUpdated': int(time.time())})

            # connect the new task group list in the profile 'taskGroups' list
            new_task_groups_list = [created_task_group_result.inserted_id]
            db.profiles.update_one({'_id': ObjectId(profile_id)}, {'$set': {'taskGroups': new_task_groups_list}})
        else:
            profile_group_ids = profile['taskGroups']

            # Use this to decide for which task_group' leader the similiarity percentage is maximum and then add this task to this task group.
            max_similarity_percentage = 0.54; # is the minimum value of similarity that a task should have before we want to add it to an existing group. If no task group found, should create a new task group, and add that task to that group. (on creating new task_group should set the first task as leader!
            most_similar_group = None

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
                db.tasks_group.update_one({'_id': ObjectId(group_id)}, {'$set': {'tasks': new_tasks_list, 'LastUpdated': int(time.time())}})
            else:
                # Else - no group similar to the task was found
                # so thus need create new task group and add the task to the group and set the task as the task leader
                created_task_group_result = db.tasks_group.insert_one({'ProfileId': profile_id, 'taskLeaderId': task_id, 'tasks': [task_id], 'LastUpdated': int(time.time())})

                # connect the new task group list in the profile 'taskGroups' list
                new_task_groups_list = profile['taskGroups'] + [created_task_group_result.inserted_id]
                db.profiles.update_one({'_id': ObjectId(profile_id)}, {'$set': {'taskGroups': new_task_groups_list}})

if __name__ == '__main__':
    processTask("5981f5a58ae6893b20843dc4","5982289e8ae6892308ac1eb0")