#!/bin/bash

# --link wha-selenium \

docker run \
  --rm -it \
  --name wha-tests \
  --link wha-db \
  --link wha-web \
  -v $PWD:/usr/src/app \
  -w /usr/src/app/test \
  wha/swagger-server:0.1.0 npm test
