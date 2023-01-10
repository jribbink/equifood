/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WsAdapter } from '@nestjs/platform-ws';

function pipe<T>(target: T, modifiers: ((target: T) => T)[]): T {
  return modifiers.length == 0
    ? target
    : modifiers[0](pipe(target, modifiers.slice(1)));
}

function setupSwagger(app: INestApplication) {
  const config = pipe(
    new DocumentBuilder()
      .setTitle('Equifood API')
      .setDescription(
        'An overview of all the API endpoints accessible by equifood client apps'
      )
      .setVersion('1.0')
      .setBasePath('api'),
    ['customer', 'merchant', 'admin'].map(
      (role) => (cfg) =>
        cfg.addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT',
            description: `JWT token for ${role}`,
            in: 'header',
          },
          `JWT-${role}`
        )
    )
  ).build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  // Initialize app
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const globalPrefix = 'api';
  app.set('trust proxy', 'loopback');
  app.useWebSocketAdapter(new WsAdapter(app));
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());

  // Initialize swagger (API docs)
  setupSwagger(app);

  // Listen on HTTP port
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
