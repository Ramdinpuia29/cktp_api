import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';

import { AppModule } from './app.module';
import swaggerConfig from './utils/configs/swagger.config';
import { DataSource } from 'typeorm';
import { Session } from './api/users/entities/session.entity';
import { TypeormStore } from 'connect-typeorm/out';
import entities from './utils/entities';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: ['http://localhost:3000'], credentials: true });

  // CONFIG SERVICE
  const configService = app.get(ConfigService);

  const appDataSource = new DataSource({
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    port: configService.get<number>('POSTGRES_PORT'),
    username: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DB'),
    entities,
    synchronize: true, // should be false in production
  });

  appDataSource
    .initialize()
    .then(() => {
      console.log('Data source initialized');
    })
    .catch((err) => {
      console.error('Error during data source initialization', err);
    });

  // GLOBAL PREFIX
  app.setGlobalPrefix('/api');

  // VALIDATION PIPE
  app.useGlobalPipes(new ValidationPipe());

  // SESSION
  const sessionsRepository = appDataSource.getRepository(Session);
  app.use(
    session({
      secret: configService.get<string>('COOKIE_SECRET'),
      saveUninitialized: false,
      resave: false,
      name: 'RDP_SESSION_ID',
      cookie: {
        maxAge: 3600000,
      },
      store: new TypeormStore().connect(sessionsRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // SWAGGER
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // PORT NUMBER
  const port = configService.get<number>('PORT');

  try {
    await app.listen(port, () => {
      console.log(`Application running on http://localhost:${port}`);
      console.log(`API Documentation: http://localhost:${port}/api`);
    });
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
