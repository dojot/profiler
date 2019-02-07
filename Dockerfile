FROM node:11.9.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN apk update && apk add build-base libtool autoconf automake jq openssh python3 curl

WORKDIR /usr/src/app/beamer

RUN autoreconf --install

RUN mkdir build

WORKDIR /usr/src/app/beamer/build

RUN ../configure

RUN make && make install

RUN mkdir /home/uploads

WORKDIR /usr/src/app

EXPOSE 3000

CMD [ "npm", "start"] 