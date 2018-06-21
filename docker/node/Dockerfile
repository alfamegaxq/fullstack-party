FROM node:9.2.1

ENV NPM_CONFIG_LOGLEVEL warn

RUN  npm install -g gulp \
    && npm install --global gulp-cli \
    && npm install -g yarn \
    && npm install -g create-react-app

WORKDIR /var/www/html/frontend

EXPOSE 3000

CMD yarn start
