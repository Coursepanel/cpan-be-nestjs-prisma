import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs'
import * as path from 'path';


async function bootstrap() {
  const ssl = process.env.SSL === 'true' ? true : false;
  const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname,'./secrets/private-key.pem')),
    cert: fs.readFileSync(path.join(__dirname,'./secrets/public-certificate.pem')),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  const port = Number(process.env.PORT) || 3333;
  const hostname = process.env.HOSTNAME || 'localhost';
  await app.listen(port, hostname, () => {
    const address =
      'http' + (ssl ? 's' : '') + '://' + hostname + ':' + port + '/';
    console.log('address', address);
  });
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
