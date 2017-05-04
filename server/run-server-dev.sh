#!/bin/bash

docker run \
  --name server \
  --link postgres \
  -v $PWD:/usr/src/app \
  -w /usr/src/app \
  -p 8000:8000 \
  -it \
  --rm \
  node:7 /bin/bash
