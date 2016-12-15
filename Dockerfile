# Set nginx base image
FROM openresty/openresty:xenial

# File Author / Maintainer
MAINTAINER Guy Wicks
LABEL bpm-api.bl.uk.version="0.0.1 alpha"
LABEL bpm-api.bl.uk.staus="alpha"

# Install packages
RUN apt-get update && apt-get install -y \
  redis-server

# Copy custom configuration file from the current directory
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80:8080
