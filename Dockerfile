FROM node:7

# create working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy all apps into image
COPY . /usr/src/app

# build interface assets
RUN cd interface \
  && npm install \
  && npm run build \
  && cp -r build/* ../server/public

# build server
RUN cd server \
  && npm install \
  && npm run build

WORKDIR /usr/src/app/server

EXPOSE 8000

CMD ["node", "lib/server.js"]
