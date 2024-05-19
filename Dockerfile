FROM  node:18 as development

WORKDIR /build

COPY . .

RUN npm install

RUN npm run build 

FROM node:18 as production

WORKDIR /app

COPY --from=developement build/package*.json .

COPY --from=developement build/node_modules node_modules/

COPY --from=developement build/.env .env/

COPY --from=developement build/typeorm.config.ts typeorm.config.ts/

COPY --from=developement build/dist  dist/

CMD [ "npm",'run','start:prod' ]
