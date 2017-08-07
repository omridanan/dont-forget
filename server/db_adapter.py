import atexit

from pymongo import MongoClient, errors
from pymongo.errors import ConnectionFailure

import time

def db_connect_and_validate(uri):
	client = MongoClient(uri, serverSelectionTimeoutMS=10000)

	# The ismaster command is cheap and does not require auth.
	# https://api.mongodb.com/python/current/api/pymongo/mongo_client.html
	client.admin.command('ismaster')

	return client

while True:
	try:
		# use mlab instance as default
		#uri = 'mongodb://admin:12345678@ds133261.mlab.com:33261/dont-forget'
		uri = 'mongodb://admin:admin@ds143071.mlab.com:43071/dont-forget'	
		client = db_connect_and_validate(uri)

		break
	except Exception as ex:
		print("Failed to log to mlab: ", str(ex))
		time.sleep(1)
		continue
		# raise
		
		# # if failure, use local instance
		# uri	= 'mongodb://localhost:27017/dont-forget'
		# client = db_connect_and_validate(uri)

db = client.get_database('dont-forget')

atexit.register(client.close)
