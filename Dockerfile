FROM  node:18 as developement

WORKDIR /build

COPY package*.json .

RUN npm install

COPY src/ src/

COPY migrations/ migrations/

COPY tsconfig.json tsconfig.json

COPY .env .env

COPY typeorm.config.ts typeorm.config.ts

RUN npm run build 

FROM node:18 as production

WORKDIR /app

COPY --from=developement build/package*.json .

COPY --from=developement build/node_modules node_modules/

COPY --from=developement build/.env .env/

COPY --from=developement build/typeorm.config.ts typeorm.config.ts/

COPY --from=developement build/dist  dist/

CMD [ "npm",'run','start:prod' ]
