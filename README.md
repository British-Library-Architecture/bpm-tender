# bpm-tender
Resources for the British Library BPM tender (2017) technical demonstration

# Installation
Ubuntu 16.04 and Mac OSX have been tested.

Install docker:

* Ubuntu: https://docs.docker.com/engine/installation/mac
* OSX: https://docs.docker.com/engine/installation/linux/ubuntulinux/
* RHEL7: https://docs.docker.com/engine/installation/linux/rhel/

Install git:
* Ubuntu: `sudo apt-get install git`
* RHEL7: `sudo yum install git`
* OSX: ` brew install git`

## Clone and setup the respository
```
git clone https://github.com/British-Library-Architecture/bpm-tender.git
cd bpm-tender
make install
```  

## Docker environment
The docker build uses docker-compose to create an nginx front end proxy and webserver, nodejs middleware and a redis datastore
The container exposes ports 80 and 8000 can can be accessed locally via `curl localhost` or `curl localhost:8000`
Local documentation can be accessed from a browser via http://localhost:8000/api

To change the exposed port, edit the bpm-tender/docker-compose.yml file:
```
nginx:
    build: ./docker-nginx-alpine
    links:
        - node1:node1
    ports:
        - "80:80"      <<< CHANGE HERE
        - "8000:80"    <<< CHANGE HERE
node1:
    build: ./docker-node-alpine
    links:
        - redis1:redis1
    ports:
        - "8080"
redis1:
    build: ./docker-redis-alpine
    ports:
        - "6379"
```

For example, if port 80 clashes with an existing service then it can be removed. Port 8000 is used by the `make test` script so any changes to this port will need to be reflected in the `Makefile`

Example:
```
    ports:
        - "80"        <<< Removed the 'public facing' part of the networking
        - "9000:80"   <<< Use port 9000 (remember to change the Makefile)
```

## Execution
```
make build
make start
make test
make stop
```

## Examples
```
curl localhost:8000/api/v1/bankaccount/200415
curl localhost:8000/api/v1/identity/newuser
```

### Makefile
A makefile exists that can run a series of tests on the container:
```
cd bpm-tender
make

Help and instructions:
- Use 'make install' to setup the scripts
- Use 'make build'   to generate the docker images. Will download images if required.
- Use 'make start'   to start the docker container services
- Use 'make test'    to run the test suite against the services
- Use 'make stop'    to stop and cleanup the container services
- Use 'make rebuild' to stop, build, start and test services
Advanced:
- Use 'make purge'   to delete docker containers and images. Make build will be required
- Use 'make clean'   to clean any temp files and test data
- Use 'make load'    to reload any test data
- Use 'make reset'   to fully reset the environment

```
