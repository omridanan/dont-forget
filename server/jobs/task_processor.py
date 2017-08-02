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
        profile_group_ids = profile['taskGroups']

        # Use this to decide for which task_group' leader the similiarity percentage is maximum and then add this task to this task group.
        max_similarity_percentage = 0.6; # 0.6 is the minimum value of similarity that a task should have before we want to add it to an existing group. If no task group found, should create a new task group, and add that task to that group. (on creating new task_group should set the first task as leader!
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
            new_group_task_list = group['tasks'] + [task_id]
            db.tasks_group.update({'_id': ObjectId(group_id)}, {'$set': {'tasks': new_group_task_list, 'LastUpdated': int(time.time())}})
        else:
            # Else - no group similar to the task was found, so thus need to create new task group and add the task to the group and set the task as the task leader
            db.tasks_group.insert_one({'ProfileId': profile_id, 'taskLeaderId': task_id, 'tasks': [task_id], 'LastUpdated': int(time.time())})



if __name__ == '__main__':
    processTask("593884b0734d1d61de882a5f","59390ad5734d1d61de884a70")