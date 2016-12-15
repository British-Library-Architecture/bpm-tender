# bpm-tender
Resources for the British Library BPM tender (2017) technical demonstration

# Use your own Docker environment
Using your flavour of linux (Ubuntu 16.04 and Mac OSX has been tested), install docker and git:
Install docker: https://docs.docker.com/engine/installation/linux/ubuntulinux/

Install git:
``` 
sudo apt-get install git
```

## Clone the respository and build the docker container
```
git clone https://github.com/British-Library-Architecture/bpm-tender.git
cd bpm-tender
chmod a+x bin/*
bin/docker-build
```  
## Docker build
The docker build is based on Ubuntu 16.04 LTS with nginx/openresty webserver with an embedded Redis service
The container exposes port 8080 can can be accessed locally via `curl`

## Docker execution
```
docker 

## Examples
```
curl 
