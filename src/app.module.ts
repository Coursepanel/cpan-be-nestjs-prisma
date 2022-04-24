import { CourseModule } from './course/course.module';
import { Module } from '@nestjs/common';
import { NotionModule } from './notion/notion.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   useFactory: async () =>
    //     Object.assign(await getConnectionOptions(), {
    //       autoLoadEntities: true,
    //       keepConnectionAlive: true,
    //       // Setting synchronize: true shouldnt be used in production - otherwise you can lose production data.
    //       synchronize: true,
    //       entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     }),
    // }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      port: 27017,
      url: process.env.MONGO_CONNECTION_STRING,
      useNewUrlParser: true,
      keepConnectionAlive: true,
      // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    NotionModule,
    UserModule,
    CourseModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      // isGlobal: true,
    }),
  ],
})
export class AppModule {}
