FROM node:alpine as builder

WORKDIR /app/client

COPY ./package.json ./
RUN yarn
COPY . .

CMD [ "yarn","start" ]