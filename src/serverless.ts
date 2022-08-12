import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
// import * as fs from 'fs'
// import * as path from 'path';

// const httpsOptions = {
//   key: fs.readFileSync(path.join(__dirname,'./secrets/private-key.pem')),
//   cert: fs.readFileSync(path.join(__dirname,'./secrets/public-certificate.pem')),
// };

let server: Handler;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
