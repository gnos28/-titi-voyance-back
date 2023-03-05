#!/bin/bash

# prune docker
docker stop $(docker ps --filter status=running --filter name=titi-voyance-back -q)
docker rm -f $(docker ps --filter status=exited -q)
docker rmi -f $(docker images titi-voyance-back* -q)
docker image prune -f

# prepare new deployment folder
mv titi-voyance-back/ oldTiti-voyance-back/
git clone git@github.com:gnos28/titi-voyance-back.git
cd titi-voyance-back/
git pull -f --rebase origin main

# récupérer les .env uploadés précédemment avec scp et les déplacer ici
mv ../dotenv/.env.backend back/.env
mv ../dotenv/auth.json back/auth.json

# build docker images
docker compose -f docker-compose.prod.yml build --no-cache

# start container
docker compose -f docker-compose.prod.yml up >~/logs/log.compose.back.$(date +"%s") 2>&1 &
disown

# delete old folder
sudo rm -Rf ~/oldTiti-voyance-back/
