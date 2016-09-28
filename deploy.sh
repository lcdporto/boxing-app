#!/bin/bash

#check if current branch is master branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ "$BRANCH" != "master" ]
then
    echo 'not in the master branch, are you crazyy boy!!?? quitting!'
    exit 1
fi



#Updates de origin master to be in the lastest version
#git push origin master



#Builds the APP production ready source code
gulp


#create a docker-machine if needed with
#docker-machine create -d virtualbox dm


#connect to a docker-machine
docker-machine start dm
eval "$(docker-machine env dm)"



#redirect stderr to stdout and then capture the output
#returns the short hash of the last commit of the current branch
HASHED=$(git log --pretty=format:'%h' -n 1 2>&1)

#build the image
docker build -t lcdporto/boxing-app:$HASHED .

#push the image
docker push lcdporto/boxing-app:$HASHED

#pull the image over ssh
#ssh root@dev.hourlabour.com docker pull ighormartins/hourlabour-app:$HASHED

#tag the image
#ssh root@dev.hourlabour.com docker tag -f ighormartins/hourlabour-app:$HASHED ighormartins/hourlabour-app:development

#rebuild and run containeir with docker-compose
#ssh root@dev.hourlabour.com 'docker-compose up -d'

docker-machine stop dm
