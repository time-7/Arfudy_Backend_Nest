import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(EnvService);

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
    .setTitle('arfudy BackEnd')
    .setDescription('arfudy backend with nestjs')
    .setVersion(envService.get('VERSION'))
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('doc', app, document, { useGlobalPrefix: true });

  await app
    .listen(envService.get('PORT'))
    .then(() =>
      console.log(`HTTP server listening on port ${envService.get('PORT')}`),
    )
    .catch((err) => {
      console.error(err);
    });
}
bootstrap();
