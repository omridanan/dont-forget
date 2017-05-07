import atexit

from pymongo import MongoClient

uri = 'mongodb://admin:12345678@ds133261.mlab.com:33261/dont-forget'

client = MongoClient(uri)
db = client.get_database('dont-forget')

atexit.register(client.close)
