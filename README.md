# bpm-tender
Resources for the British Library BPM tender (2017) technical demonstration

## Installation
Ubuntu 16.04 and Mac OSX have been tested.

Install docker:

* Ubuntu: https://docs.docker.com/engine/installation/linux/ubuntulinux/
* OSX: https://docs.docker.com/engine/installation/mac
* RHEL7: https://docs.docker.com/engine/installation/linux/rhel/
Note: RedHat 6 is not supported

Install docker-compose:
* Ubuntu: https://docs.docker.com/compose/install/

Install git:
* Ubuntu: `sudo apt-get install git`
* RHEL7: `sudo yum install git`
* OSX: ` brew install git`

### Clone and setup the respository
```
git clone https://github.com/British-Library-Architecture/bpm-tender.git
cd bpm-tender
make install
```  

### Docker environment
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

Example of a binding error:
> ERROR: for nginx  Cannot start service nginx: driver failed programming external connectivity on endpoint bpmtender_nginx_1 (6ea224067468364d047b8b6a3d910142376e5b21f7eea0de022d1fb7b15251a5): Error starting userland proxy: listen tcp 0.0.0.0:80: bind: address already in use


For example:
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

### Example 
Note: The JSON output has been prettified.
```
curl localhost:8000/api/v1/bankaccount/200415
{
  "result": {
    "sort_code": "200415",
    "country": "GB",
    "bank_name": "BARCLAYS BANK PLC",
    "bank_bic": "BARCGB2108L",
    "chaps_bic": "BARCGB22",
    "bank_address": "Dept AC Barclaycard House",
    "bank_city": "Northampton",
    "bank_postalcode": "NN4 7SG",
    "bank_phone": "01604 234234",
    "direct_debits": "NO",
    "pfs_payments": "YES",
    "chaps": "YES",
    "bacs": "YES",
    "ccc_payments": "NO"
  }
}

curl localhost:8000/api/v1/identity/newuser
{
    "identity":"newuser",
    "status":"OK"
}

curl localhost:8000/api/v1/catalogue/isbn/9780224063784
{
    "service": "catalogue",
    "search": "ISBN",
    "isbn": "9781408865453",
    "set_number": "032521",
    "set_size": 0,
    "status": "OK",
    "result": {
        "isbn": "9781408865453",
        "author": "Rowling, J. K.,",
        "title": "Harry Potter & the Deathly Hallows /",
        "format": "619 pages : illustrations ; 21 cm.",
        "publisher": "London : Bloomsbury, 2015."
    }
}
```

### Makefile
A makefile exists that can run a series of tests on the container:
```
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
- Use 'make showlogs' to export to STDOUT the container log files
```

### make test (Service test suite)
Example of the test suite output
```
make test
>>> Test: test-api
Passed - localhost:8000/api - HTTP/1.1 200 OK
Passed - localhost:8000/api/v1 - HTTP/1.1 403 Forbidden
>>> Complete: test-api
>>> Test: test-bankaccount
Passed - localhost:8000/api/v1/bankaccount - HTTP/1.1 200 OK
Passed - localhost:8000/api/v1/bankaccount/200415 - HTTP/1.1 200 OK
Passed - localhost:8000/api/v1/bankaccount/200415/38290008 - HTTP/1.1 200 OK
Passed - localhost:8000/api/v1/bankaccount/200415/38290009 - HTTP/1.1 404 Not Found
>>> Complete: test-bankaccount
>>> Test: test-identity
Passed - localhost:8000/api/v1/identity - HTTP/1.1 200 OK
Passed - localhost:8000/api/v1/identity/baduser - HTTP/1.1 404 Not Found
Passed - localhost:8000/api/v1/identity/newuser/secret1234 - HTTP/1.1 201 Created
Passed - localhost:8000/api/v1/identity/newuser - HTTP/1.1 200 OK
Passed - localhost:8000/api/v1/identity/newuser/secret1234 - HTTP/1.1 200 OK
Passed - localhost:8000/api/v1/identity/newuser/wrong - HTTP/1.1 404 Not Found
>>> Complete: test-identity
>>> Test: test-catalogue
Passed - localhost:8000/api/v1/catalogue - HTTP/1.1 200 OK
Passed - localhost:8000/api/v1/catalogue/isbn - HTTP/1.1 404 Not Found
Passed - localhost:8000/api/v1/catalogue/isbn/ - HTTP/1.1 404 Not Found
Passed - localhost:8000/api/v1/catalogue/isbn/12345678 - HTTP/1.1 404 Not Found
Passed - localhost:8000/api/v1/catalogue/isbn/9780224063784 - HTTP/1.1 200 OK
Passed - localhost:8000/api/v1/catalogue/isbn/ABCDEFG - HTTP/1.1 400 Bad Request
>>> Complete: test-catalogue
>>> Test complete
```
