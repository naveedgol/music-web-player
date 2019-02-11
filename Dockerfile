FROM node:8-alpine

ENV APPLE_MUSIC_TOKEN=""

EXPOSE 5000

ADD . /code

WORKDIR /code

RUN npm install

RUN npm install -g serve @angular/cli

RUN apk add --update bash sed && rm -rf /var/cache/apk/*

RUN chmod u+x build.sh run.sh

RUN ng build --prod --aot

RUN cd ./dist/apple-music-web-player && ls -la

CMD ["/bin/bash","/code/run.sh"]