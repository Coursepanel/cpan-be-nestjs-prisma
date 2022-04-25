import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin:
        process.env.NODE_ENV !== 'production'
          ? '*'
          : [
              '^(https?://(?:.+.)?fallow.in(?::d{1,5})?)$',
              'https://coursemap.fallow.in/*',
              '103.158.43.20/32',
            ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    },
  });
  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
