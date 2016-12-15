# Set nginx base image
FROM ubuntu:latest

# File Author / Maintainer
MAINTAINER Guy Wicks
LABEL bpm-api.bl.uk.version="0.0.1 alpha"
LABEL bpm-api.bl.uk.staus="alpha"

# Install packages
RUN apt-get update && apt-get install --no-install-recommends --no-install-suggests -y \
  redis-server \
  nginx-full

# Copy custom configuration file from the current directory
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx/* /etc/nginx/conf.d/

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
