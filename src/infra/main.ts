import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResourceNotFoundFilter } from './filters/resource-not-found.filter';
import { PrismaExceptionFilter } from './filters/prisma-exception.filter';
import { TableInUseFilter } from './filters/table-in-use.filter';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(EnvService);
  const logger = new Logger('arfudyBackendAPI');

  app.useGlobalFilters(
    new ResourceNotFoundFilter(),
    new PrismaExceptionFilter(),
    new TableInUseFilter(),
  );

  app.enableCors({
    origin: true,
    methods: 'GET, POST, PATCH, DELETE, OPTIONS, HEAD',
    credentials: true,
  });

  app
    .useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    )
    .setGlobalPrefix('api');

  const documentConfig = new DocumentBuilder()
    .setTitle('arfudy Backend API')
    .setDescription('arfudy backend with nestjs')
    .setVersion(envService.get('VERSION'))
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('doc', app, document, { useGlobalPrefix: true });

  await app
    .listen(envService.get('PORT'))
    .then(() =>
      logger.log(`Server listening on port ${envService.get('PORT')}`),
    )
    .catch((err) => {
      logger.error(err);
    });
}
bootstrap();
