FROM node:latest

WORKDIR /var/www

COPY . .

RUN yarn install --production

EXPOSE 3000

CMD yarn build && yarn start-production
