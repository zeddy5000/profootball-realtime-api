import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

   app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableCors();

  app.use(helmet());

  app.use(compression());

  app.setGlobalPrefix(configService.get<string>('app.apiPrefix') ?? 'api');

  const swaggerConfig = new DocumentBuilder()
  .setTitle('ProFootball Match API')
  .setDescription(
    'Real-time football match simulation API built with NestJS.',
  )
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, swaggerConfig);

SwaggerModule.setup('api/docs', app, document);

  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableShutdownHooks();

  const port = configService.get<number>('app.port') ?? 3000;

  await app.listen(port);

  console.log(
    `🚀 ${configService.get('app.name')} running on http://localhost:${port}`,
  );
}

bootstrap();