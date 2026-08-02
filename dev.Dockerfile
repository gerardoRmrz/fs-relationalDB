FROM node:24

WORKDIR /usr/src/app

COPY package.json ./

RUN npm cache clean --force && npm install

COPY . .

CMD [ "node", "index.js" ]