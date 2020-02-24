FROM node:alpine

WORKDIR /go/src/app/client

COPY ./package.json .
RUN yarn
COPY . .

CMD [ "yarn","start" ]