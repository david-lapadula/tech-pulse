import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// https://medium.com/@awaisshaikh94/a-detailed-guide-on-implementing-authentication-in-nestjs-4a347ce154b6
