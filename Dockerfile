FROM node:6

RUN mkdir -p /app

ADD ./package.json /app/package.json

WORKDIR /app

RUN npm install --production

ADD ./build /app

EXPOSE 3000

CMD [ "npm", "run", "start-prod" ]
