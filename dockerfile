FROM node:16-alpine3.14
WORKDIR /app

RUN apk update && apk add bash dumb-init && rm -rf /var/cache/apk/* 
COPY . .
RUN npm install && npm cache clean --force
RUN npm run build:dev 

CMD NODE_ENV = development npm run start:dev