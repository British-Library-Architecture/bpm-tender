FROM node:alpine

#ARG http_proxy=http://194.66.238.27:7070/
#ARG https_proxy=http://194.66.238.27:7070/

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY ./app /usr/src/app

EXPOSE 8080
CMD [ "npm", "start" ]
