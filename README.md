# Dojot Profiler

This service has the purpose of testing the performance of the dojot platform in several scenarios, 
such as the delay of the message from the time of sending to the reception via socketio, among other scenarios.


## Installation

This service depends on git, docker and docker-compose to work. After you install them, please run the
commands below to run the service. These have been tested on an ubuntu 18.04 environment.

After downloading the project, go to the root directory:

```shell
cd dojot-profiler
```

To update service dependencies:

```shell
# you may need sudo for those
git submodule init && git submodule update
```

This service run on port 3000. Make sure no other service runs on that port. Then run:

```shell
# you may need sudo for those
docker-compose up
```

You must have access to the MongoDB server of Dojot, because Dojot Profiler will get messages from MongoDB for metrics. Profiler use port 27017 to connect with MongoDB. You can expose that port in docker-compose.yml of Dojot like that:

```shell
# changes in docker-compose.yml
mongodb:
    ...
    ports:
      - 27017:27017
    ...
```

Your Dojot persister must using this custom image too:

```shell
# changes in docker-compose.yml
persister:
    image: dojot/persister:performance-tests
    ...
```


## Using the service

The Dojot must be up an running to run the tests. With the service up an running on port 3000, you can follow the instructions in [this vídeo](https://www.youtube.com/watch?v=GJlj9QXHkJI&feature=youtu.be).




