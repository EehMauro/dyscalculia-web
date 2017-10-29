FROM node:8

RUN mkdir -p /app

ADD ./package.json /app/package.json

WORKDIR /app

RUN npm install --production

ADD ./build /app

EXPOSE 8080

CMD [ "npm", "run", "start-prod" ]
