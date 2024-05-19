FROM  node:18 as development

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build 

CMD [ "npm",'run','start:prod' ]
