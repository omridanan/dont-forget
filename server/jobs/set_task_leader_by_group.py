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


# or
#import os
#os.environ["PYTHONPATH"] = "/Users/or.l/IdeaProjects/myproject/dont-forget/server/jobs:/Users/or.l/IdeaProjects/myproject/dont-forget/server/external_api:/Users/or.l/IdeaProjects/myproject/dont-forget/server/resources:/Users/or.l/IdeaProjects/myproject/dont-forget/server:/usr/local/lib/python2.7/site-packages"
#os.environ["PYTHONPATH"] = "/Users/or.l/IdeaProjects/myproject/dont-forget/server/jobs:/Users/or.l/IdeaProjects/myproject/dont-forget/server/external_api:/Users/or.l/IdeaProjects/myproject/dont-forget/server/resources:/Users/or.l/IdeaProjects/myproject/dont-forget/server"
import operator
import uuid
import time

from db_adapter import db
from bson import ObjectId
from text_google_api import get_tags_for_text
from collections import defaultdict

def get_tasks_group():
    last_job_iteration = db.jobs_iterations_statuses.find_one({'jobName': "set_task_leader_per_group" })
    print "last_job_iteration: "
    print last_job_iteration
    print "All tasks groups:"
    all_tasks_groups =  list(db.tasks_group.find())
    print all_tasks_groups
    # check if the group LastUpdated time is greater than the last run time of this job(when job running should add the run time to db)
    tasks_groups = [tasks_group for tasks_group in all_tasks_groups if tasks_group['LastUpdated'] > last_job_iteration['timestamp']]
    print "Filtered task_groups: "
    print tasks_groups
    return tasks_groups

def run():
    iteration_uuid = str(uuid.uuid4()) # for debug to see that one iteration is end before new iteration is starting"
    print "set_task_leader_by_group job starting new iteration (number %s)" %(iteration_uuid)
    tasks_groups = get_tasks_group()
    print "This is all the task_groups in the DB:"

    print tasks_groups;

    print "///////////////////////"
    print "Starting pre-process. start calculating entities caount for each task group."
    print "///////////////////////"

    task_group_counter = 1 #using this for debug
    for tasks_group in tasks_groups:
        print "$$$$$$$$$$$$$$$$$$$$$"
        print "looking at task_group number: %f" %(task_group_counter)
        task_group_counter +=1

        task_group_id = str(tasks_group['_id'])
        print "The current task_group_id is: %s" %(task_group_id)
        #tasks_group = db.tasks_group.find_one({'_id': ObjectId("598221bc6d38782bb534cc5e")})

        tasks_ids = tasks_group['tasks']
        print "the task_ids for this task_group are:"
        print tasks_ids

        # entities_group_by_id = db.entities_group.find_one({'taskGroupId': task_group_id})

        # if not entities_group_by_id:
        #     print "There is no entities_group_by_id for %s, let's count and add it" % (task_group_id)

        entities_count = defaultdict(int)

        for task_id in tasks_ids:
            # entities -
            # _id, taskId, entities = [{entity_name, salience}]
            entities_for_task_row = db.entities.find_one({'taskId': task_id})

            print "taskId: " + task_id + ", entities: "
            print entities_for_task_row

            task = db.tasks.find_one({'_id': ObjectId(task_id)})
            print "calculate entities for task: " + task['content']

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

            print "run on each entity and increase the dictionary by 1 (entity_name, count)"
            for entity in entities_for_task:
                entities_count[entity['name']] += 1

            print "This is the result dictionary after adding task entityies: " + task_id
            print entities_count


        print "delete row with old dictionary of entities_count if exists"
        db.entities_group.remove({ "taskGroupId" : task_group_id } );

        print "insert new entities_count to db to entities_group collection for task_group_id: " + task_group_id
        db.entities_group.insert_one({
            "taskGroupId" : task_group_id,
            "entitiesCount" : entities_count
        })

        all_entities_count = float(sum(entities_count.values())) # float needed for divide (3 / 100 = 0.03, not 0)
        print "all entities count for task_group_id " + task_group_id
        print all_entities_count

        tasks_ranks_dictionary = {}

        print "^^^^^^^^^^^^^^^^"
        print "starting the step for finding which task n the group is the task leader"

        for task_id in tasks_ids:
            print "looking now on task_id " + task_id
            task_rank = 0

            entities_for_task_row = db.entities.find_one({'taskId': task_id})

            if not entities_for_task_row:
                print "There is not entities_for_task for %s, why??" % task_id
                # TODO don't return
                return

            else:
                entities_for_task = entities_for_task_row['entities']

            print "Entities for task: %s, are: %s" % (task_id, entities_for_task)

            for entity in entities_for_task:

                print "Current Entity", str(entity)

                entity_count = entities_count[entity['name']]

                print "Count in group", entities_count
                print "entity_count: %f" % (entity_count)
                print "total entities count in this task %f" % (all_entities_count)
                entity_rate = float(entity_count) / all_entities_count
                print "entity_rate  %f" % (entity_rate)
                print "entity_salience in this task is %f" % (entity['salience'])
                entity_rank = entity['salience'] * entity_rate # how much the entity is strong in the sentence and how much is strong in the group.

                print "entity_rank for the specific task %f" % (entity_rank)

                task_rank += entity_rank
                print "current task_rank %f" % (task_rank)

            print "add to the dictionary for task_id %s , this task_rank %f" % (task_id,task_rank)
            tasks_ranks_dictionary[task_id] = task_rank

            print "current tasks_ranks_dictionary:", tasks_ranks_dictionary

        print "final tasks_ranks_dictionary:", tasks_ranks_dictionary

        # Get task_id with the maximum task_rank for this task group, from the dictionary
        max_task_id = max(tasks_ranks_dictionary.iteritems(), key=operator.itemgetter(1))[0]

        print "Max task id in tasks_ranks_dictionary is task_id: %s with task_rank of: %f" % (max_task_id, tasks_ranks_dictionary[max_task_id])

        # Set as task leader
        db.tasks_group.update_one(
            {'_id': ObjectId(task_group_id)},
            { '$set' : { "taskLeaderId" : max_task_id, 'LastUpdated': int(time.time()) } }
        )

        print "for task_group_id %s, choose new taskLeader: %s" %(task_group_id, max_task_id)

    print "set_task_leader_by_group job iteration number %s has finished." %(iteration_uuid)

    last_job_iteration = db.jobs_iterations_statuses.find_one({'jobName': "set_task_leader_per_group" })
    db.jobs_iterations_statuses.update_one(
        {'_id': ObjectId(last_job_iteration['_id'])},
        { '$set' : { 'iterationUUID' : iteration_uuid, 'timestamp' : int(time.time()), 'status': 'succeed' } }
    )

    print "updated jobs_iterations_statuses done."
if __name__ == '__main__':
    run()
        
    