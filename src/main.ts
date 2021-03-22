import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from './AppModule';

async function bootstrap() {
  console.log('Loading environment configuration...');
  config();

  if (process.env.API_PORT) {
    console.log('Launching app on port ' + process.env.API_PORT + '...');
    const app = await NestFactory.create(AppModule, {
      logger: process.env.DEBUG
        ? ['error', 'warn', 'log', 'verbose', 'debug']
        : ['error', 'warn', 'log'],
    });
    app.setGlobalPrefix('api');
    await app.listen(process.env.API_PORT);
  } else {
    console.error('Could not start app: API_PORT not defined');
  }
}
bootstrap();
