from bson import ObjectId
from db_adapter import db

groups = list(db.tasks_group.find())

for i, group in enumerate(groups, 1):
    groupid = str(group['_id'])
    profile = db.profiles.find_one({'_id' : ObjectId(group['profileId'])})
    profile_name = profile['ProfileName']
    task_leader = db.tasks.find_one({'_id' : ObjectId(group['taskLeaderId'])})
    content = task_leader['content']
    print(i, groupid, profile_name, content)