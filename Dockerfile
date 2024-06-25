FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

RUN npm install --only=production

EXPOSE 8000

CMD ["node", "dist/src/main"]
