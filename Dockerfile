# Use this as a base image
FROM nginx:latest

# Maintainer Info
MAINTAINER Ighor Martins <ighor.martins@gmail.com>

ENV LANG pt_PT.UTF-8

# copy application code to /var/www/boxing
COPY dist /var/www/boxing/app

# copy nginx configuration file

COPY nginx/default.conf /etc/nginx/conf.d/
