FROM node:14.17.0-alpine

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install -g nodemon
RUN npm install

COPY . /usr/src/app/