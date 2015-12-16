# Use this as a base image
FROM nginx:latest

# Maintainer Info
MAINTAINER Ricardo Lobo <ricardolobo@audienciazero.org>

# copy application code to /var/www/boxing-app
COPY build/app /var/www/boxing-app/app

# copy nginx configuration file
COPY dist/nginx/default.conf /etc/nginx/conf.d/
