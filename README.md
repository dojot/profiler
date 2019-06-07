# dojot profiler

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



