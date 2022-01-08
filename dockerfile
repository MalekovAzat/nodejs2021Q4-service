FROM node:16-alpine3.14
WORKDIR /app

RUN apk update && apk add bash dumb-init && rm -rf /var/cache/apk/* 
COPY . .
RUN npm install \
    && npm run build:dev && npm cache clean --force

CMD PORT=${PORT} npm run start:dev