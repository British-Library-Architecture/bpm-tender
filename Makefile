.SILENT:
.PHONY: default clean

HOST = localhost:8000

HTTP_200 = "HTTP/1.1 200"
HTTP_201 = "HTTP/1.1 201"
HTTP_400 = "HTTP/1.1 400"
HTTP_403 = "HTTP/1.1 403"
HTTP_404 = "HTTP/1.1 404"

CURL = curl -siL
GREP = grep
HTTP_TEST = /bin/bash ./bin/test-http-status

FLAG = .flag

default: help

#
# Install
#
install: install$(FLAG)

install$(FLAG):
	@echo $@
	@echo Install and setup: $@
	chmod +x bin/*
	touch install$(FLAG)

#
# Install docker components (Ubuntu)
#
install-docker-ubuntu:
	sudo apt-key adv \
          --keyserver hkp://ha.pool.sks-keyservers.net:80 \
          --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
	echo "deb https://apt.dockerproject.org/repo ubuntu-xenial main" | sudo tee /etc/apt/sources.list.d/docker.list
	sudo apt-get update
	sudo apt-get install -y docker-engine apt-transport-https ca-certificates linux-image-extra-`uname -r` linux-image-extra-virtual
	-sudo groupadd docker
	-sudo usermod -aG docker $(LOCALUSER)
	sudo systemctl enable docker
	curl -sL https://github.com/docker/compose/releases/download/1.9.0/docker-compose-`uname -s`-`uname -m` > /tmp/docker-compose
	sudo cp /tmp/docker-compose /usr/local/bin/docker-compose
	sudo chmod +x /usr/local/bin/docker-compose

	@echo Logout and login required

#
# Build
#
build: build$(FLAG)
	@echo $@
	docker-compose build

build$(FLAG): install$(FLAG)
	@echo $@
	touch build$(FLAG)

rebuild: stop build start

#
# Start / Stop
#
start: start-docker

start-docker:
	$(info Starting containers)
#	nohup docker-compose up &
	docker-compose up
#	sleep 3

stop: stop-docker

stop-docker:
	$(info Stopping containers)
	docker-compose down
#	-@docker rmi $(docker images -aqf dangling=true)  >/dev/null 2>&1
	docker system prune --force

#
# Clean
#
clean:
	-@rm build$(FLAG) >/dev/null 2>&1

purge: clean-containers clean-images

clean-containers: stop-docker
	$(info Clean docker containers)
	-@docker rm `docker ps -aq`  >/dev/null 2>&1

clean-images:
	$(info Clean docker images)
	-@docker rmi `docker images -aq`  >/dev/null 2>&1

load:
	$(info Load - not implemented)

reset:
	$(info Reset - not implemented)


#
# Help
#
help:
	$(info Help and instructions:)
	$(info - Use 'make install'  to setup the scripts)
	$(info - Use 'make build'    to generate the docker images. Will download images if required.)
	$(info - Use 'make start'    to start the docker container services)
	$(info - Use 'make test'     to run the test suite against the services)
	$(info - Use 'make stop'     to stop and cleanup the container services)
	$(info - Use 'make rebuild'  to stop, build, start and test services)
	$(info Advanced:)
	$(info - Use 'make purge'    to delete docker containers and images. Make build will be required)
	$(info - Use 'make clean'    to clean any temp files and test data )
	$(info - Use 'make load'     to reload any test data)
	$(info - Use 'make reset'    to fully reset the environment)
	$(info - Use 'make showlogs' to export to STDOUT the container log files)

#
# Test harness
#

test: test-api test-bankaccount test-identity test-catalogue
	@echo ">>> Test complete"

test-api:
	@echo ">>> Test: $@"
	$(HTTP_TEST) $(HOST)/api                                      $(HTTP_200)
	$(HTTP_TEST) $(HOST)/api/v1                                   $(HTTP_403)
	@echo ">>> Complete: $@"

test-bankaccount:
	@echo ">>> Test: $@"
	$(HTTP_TEST) $(HOST)/api/v1/bankaccount                       $(HTTP_200)
	$(HTTP_TEST) $(HOST)/api/v1/bankaccount/200415                $(HTTP_403)
	$(HTTP_TEST) $(HOST)/api/v1/bankaccount/200415/38290008       $(HTTP_200)
	$(HTTP_TEST) $(HOST)/api/v1/bankaccount/200415/38290008.json  $(HTTP_200)
	$(HTTP_TEST) $(HOST)/api/v1/bankaccount/200415/38290008.xml   $(HTTP_200)
	$(HTTP_TEST) $(HOST)/api/v1/bankaccount/200415/38290009       $(HTTP_404)
	@echo ">>> Complete: $@"

test-identity:
	@echo ">>> Test: $@"
	$(HTTP_TEST) $(HOST)/api/v1/identity                          $(HTTP_200)

	$(HTTP_TEST) $(HOST)/api/v1/identity/baduser                  $(HTTP_404)

	$(HTTP_TEST) $(HOST)/api/v1/identity/newuser/secret1234       $(HTTP_201) POST
	$(HTTP_TEST) $(HOST)/api/v1/identity/newuser                  $(HTTP_200)
	$(HTTP_TEST) $(HOST)/api/v1/identity/newuser/secret1234       $(HTTP_200)
	$(HTTP_TEST) $(HOST)/api/v1/identity/newuser/wrong            $(HTTP_404)
	@echo ">>> Complete: $@"

test-catalogue:
	@echo ">>> Test: $@"
	$(HTTP_TEST) $(HOST)/api/v1/catalogue                         $(HTTP_200)
	$(HTTP_TEST) $(HOST)/api/v1/catalogue/isbn                    $(HTTP_404)
	$(HTTP_TEST) $(HOST)/api/v1/catalogue/isbn/                   $(HTTP_404)
	$(HTTP_TEST) $(HOST)/api/v1/catalogue/isbn/12345678           $(HTTP_404)
	$(HTTP_TEST) $(HOST)/api/v1/catalogue/isbn/9780224063784      $(HTTP_200)
	$(HTTP_TEST) $(HOST)/api/v1/catalogue/isbn/ABCDEFG            $(HTTP_400)
	@echo ">>> Complete: $@"


#
#
#
testtest:
#	$(HTTP_TEST) $(HOST)/api/v1/identity $(HTTP_200)
#	$(HTTP_TEST) $(HOST)/api/v1/identity $(HTTP_404)
	$(HTTP_TEST) $(HOST)/api/v1/identity/newuser/secret1234 $(HTTP_201) POST

