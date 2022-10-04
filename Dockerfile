FROM node:latest

WORKDIR /app

COPY package.json /app

COPY docker-compose.yml /app

RUN npm install

COPY . /app

CMD docker-compose build; docker-compose up

EXPOSE 3005