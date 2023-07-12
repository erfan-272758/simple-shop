import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GLOBAL } from './global';
import loadEnv from './loadEnv';

async function bootstrap() {
  // load env
  GLOBAL.env = loadEnv();

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
