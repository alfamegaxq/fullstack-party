FROM node:9.2.1

ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /var/www/html \
    && npm install -g gulp \
    && npm install --global gulp-cli
    && npm install -g yarn

WORKDIR /var/www/html

EXPOSE 3000
