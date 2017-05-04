FROM node:7

# create working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# install dependencies
COPY package.json /usr/src/app
RUN npm install

# copy sources into working directory
COPY . /usr/src/app

# run build tests
RUN npm test

# make available on port 8080
EXPOSE 8000
