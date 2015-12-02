# Use this as a base image
FROM nginx:latest

# Maintainer Info
MAINTAINER Ricardo Lobo <ricardolobo@audienciazero.org>

# copy application code and dist folder to /var/www/boxing-app
COPY app /var/www/boxing-app/app

# copy nginx configuration file
COPY app/dist/nginx/default.conf /etc/nginx/conf.d/

# copy production angular app settings
COPY app/dist/angular/production/app.settings.js /var/www/boxing-app/app/
