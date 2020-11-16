FROM node:latest

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package.json .

COPY . .

RUN npm install

EXPOSE 9000

CMD ["node", "index.js"]
