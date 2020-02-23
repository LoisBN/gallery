FROM node:alpine

WORKDIR /app/client

COPY ./package.json .
RUN yarn
COPY . .

CMD [ "yarn","start" ]