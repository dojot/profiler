FROM node:11.9.0-alpine
RUN apk update && apk add build-base libtool autoconf automake
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
WORKDIR /usr/src/app/beamer
RUN autoreconf --install && mkdir build
WORKDIR /usr/src/app/beamer/build
RUN ../configure && make && make install && mkdir /home/uploads
WORKDIR /usr/src/app
EXPOSE 3000
CMD [ "npm", "start"]
