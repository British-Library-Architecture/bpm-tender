IMAGE_NAME = bpmtender_node1:latest 
CONTAINER_NAME = node-test
PRIVATE_PORT = 8080
PUBLIC_PORT = 8080

default: build run test clean

build:
	docker build -t $(IMAGE_NAME) .

run:
	docker run --rm --name $(CONTAINER_NAME) -p $(PUBLIC_PORT):$(PRIVATE_PORT) $(IMAGE_NAME) &
	# Wait for the container / node to complete initalisation
	sleep 5

test:
	curl localhost:$(PUBLIC_PORT)

clean:
	-docker kill $(CONTAINER_NAME)
	-docker rm $(CONTAINER_NAME)
	-docker rmi $(IMAGE_NAME)
