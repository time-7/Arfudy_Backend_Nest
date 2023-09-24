import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './env/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET, POST, PATCH, DELETE, OPTIONS, HEAD',
    credentials: true,
  });

  const configService = app.get(EnvService);
  await app
    .listen(configService.get('PORT'))
    .then(() =>
      console.log(`HTTP server listening on port ${configService.get('PORT')}`),
    )
    .catch((err) => {
      console.error(err);
    });
}
bootstrap();
