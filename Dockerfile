FROM node:latest

COPY . .

WORKDIR .

RUN yarn install --production && yarn build

EXPOSE 3000

CMD yarn start-production
