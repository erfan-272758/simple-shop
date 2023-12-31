import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GLOBAL } from './global';
import loadEnv from './loadEnv';

async function bootstrap() {
  // load env
  GLOBAL.env = loadEnv();

  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: true,
  });

  await app.listen(GLOBAL.env.PORT);
}
bootstrap();
