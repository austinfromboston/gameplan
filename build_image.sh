#!/bin/bash

test -z "$LEVEL" && export LEVEL=0
test "$LEVEL" -ge 1 && cp Gemfile bundled/ && cd bundled/ && docker build -t gameplan-bundle . && docker push gameplan-bundle; cd ../
test "$LEVEL" -ge 0 && docker build -t gameplan . && docker push gameplan
test -n "$REMOTE_TAG" && docker build -t $REMOTE_TAG . && docker push $REMOTE_TAG
