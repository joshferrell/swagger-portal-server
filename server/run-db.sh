#!/bin/bash

docker run \
  --name postgres \
  -d \
  -p 5432:5432 \
  postgres
