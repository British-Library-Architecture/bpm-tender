# bpm-tender
Resources for the British Library BPM tender (2017) technical demonstration

# Use your own Docker environment
Using your flavour of linux (Ubuntu 16.04 and Mac OSX has been tested), install docker and git:
Install docker: https://docs.docker.com/engine/installation/linux/ubuntulinux/

Install git:
``` 
sudo apt-get install git
```

## Clone and setup the respository
```
git clone https://github.com/British-Library-Architecture/bpm-tender.git
cd bpm-tender
chmod a+x bin/*
```  
## Docker build
The docker build uses docker-compose to create an nginx front end proxy and webserver, nodejs middleware and a redis datastore
The container exposes port 8000 can can be accessed locally via `curl localhost:8000`
Local documentation can be accessed from a browser via http://localhost:8000/api

## Docker execution
```
docker-compose build
docker-compose up

## Examples
```
curl localhost:8000/api/v1/bankaccount/200415
curl localhost:8000/api/v1/identity/newuser

### Makefile
A makefile exists that can run a series of tests on the container:
```
cd bpm-tender
make

