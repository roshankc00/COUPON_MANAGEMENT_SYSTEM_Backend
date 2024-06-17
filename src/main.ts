import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import * as passport from 'passport';
import cors from 'cors';
import 'dotenv/config';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(Logger));
  app.setBaseViewsDir(join(__dirname, '..', 'server/email-templates'));
  app.setGlobalPrefix('api/v1');
  app.use(
    session({
      secret: 'asiodasjoddjdoasddasoidjasiodasdjaiodd',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  const config = new DocumentBuilder()
    .setTitle('Coupon Management System')
    .setDescription('This is the coupon management backend ')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter the Bearer token',
      in: 'header',
    })

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const allowedOrigins = ['http://localhost:3000', process.env.CLIENT_URL];
  app.enableCors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await app.listen(8000);
}
bootstrap();

// server {
//   listen 80;

// location / {
//   proxy_pass http://localhost:8000;
//   proxy_set_header Host $http_host;
//   proxy_set_header X-Real-IP $remote_addr;
//   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
//   proxy_set_header X-Forwarded-Proto $scheme;
// }
// error_page 500 502 503 504 /50x.html;
// location = /50x.html {
// root /usr/share/nginx/html;
// }
// }
