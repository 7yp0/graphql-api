FROM node:latest

WORKDIR /var/www

COPY . .

RUN yarn install --production && yarn build

EXPOSE 3000

CMD yarn start-production
