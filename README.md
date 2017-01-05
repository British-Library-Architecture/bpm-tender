# bpm-tender
Resources for the British Library BPM tender (2017) technical demonstration

# Use your own Docker environment
Using your flavour of linux (Ubuntu 16.04 and Mac OSX has been tested), install docker and git:

Install docker (Ubuntu): https://docs.docker.com/engine/installation/mac
Install docker (OSX): https://docs.docker.com/engine/installation/linux/ubuntulinux/

Install git:
``` 
sudo apt-get install git
```

## Clone and setup the respository
```
git clone https://github.com/British-Library-Architecture/bpm-tender.git
cd bpm-tender
make install
```  

## Docker environment
The docker build uses docker-compose to create an nginx front end proxy and webserver, nodejs middleware and a redis datastore
The container exposes ports 80 and 8000 can can be accessed locally via `curl localhost` or `curl localhost:8000`
Local documentation can be accessed from a browser via [http://localhost:8000/api]

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
