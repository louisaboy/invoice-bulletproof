FROM node:18.14.0

WORKDIR /invoice-bulletproof

COPY . .

RUN npm install

RUN npm install typeorm

RUN npm un mysql && npm i mysql2

EXPOSE 3000

VOLUME [ "/app/node_modules" ]