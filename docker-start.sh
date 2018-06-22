#!/bin/bash

sudo docker-compose build
docker-compose run --rm php composer install
docker-compose run --rm node yarn
docker-compose run --rm node cd .. && yarn
docker-compose run --rm node gulp
docker-compose up
