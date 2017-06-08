### Readme

#### Python packages
run "pip install -r requirements.txt" 
then run app.py

#### Redis
You have to install redis for rq (job queues),
RQ doesn't work on Windows (http://python-rq.org/docs/)

```bash
$ wget http://download.redis.io/releases/redis-3.2.9.tar.gz
$ tar xzf redis-3.2.9.tar.gz
$ cd redis-3.2.9
$ make
```

set PYTHONPATH environment variable to include more folders
```bash
$ cd <root_project>
$ export PYTHONPATH=$PWD/server/jobs:$PWD/server/external_api:$PWD/server/resources:$PWD/server
```

Run the redis-server from terminal
```bash
$ redis-server &
```

Run RQ worker from terminal
```bash
$ rq worker &
```

#### Google cloud
