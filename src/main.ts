import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from './AppModule';

async function bootstrap() {
  console.log('Loading environment configuration...');
  config();

  if (process.env.PORT) {
    console.log('Launching app on port ' + process.env.PORT + '...');
    const app = await NestFactory.create(AppModule, {
      logger: process.env.DEBUG
        ? ['error', 'warn', 'log', 'verbose', 'debug']
        : ['error', 'warn', 'log'],
    });
    app.setGlobalPrefix('api');
    await app.listen(process.env.PORT);
  } else {
    console.error('Could not start app: PORT not defined');
  }
}
bootstrap();
