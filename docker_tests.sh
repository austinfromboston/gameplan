#!/bin/bash

docker build -t gameplan-tests -f Dockerfile.tests .
docker run gameplan-tests

