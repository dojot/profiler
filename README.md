# dojot performance tool

This service has the purpose of testing the performance of the dojot platform in several scenarios, 
such as the delay of the message from the time of sending to the reception via socketio, among other scenarios.

## Installation

This service depends on docker to work. To install it, please run the
commands below. These have been tested on an ubuntu 18.04 environment (same used when generating)
the service's docker image.

```shell
# you may need sudo for those
git submodule init && git submodule update
docker build -t dojo-performance:latest .
docker run -p 3000:3000 dojo-performance:latest
