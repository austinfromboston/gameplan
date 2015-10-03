#!/bin/bash

docker build -t gameplan-bundle -f Dockerfile.bundle .
docker build -t gameplan -f Dockerfile.production .
