import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { getConnectionOptions } from 'typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

//* Importing all logic modules
import { CourseModule } from './modules/course/course.module';
import { DepartmentModule } from './modules/department/department.module';
import { InstituteModule } from './modules/institute/institute.module';
import { PorModule } from './modules/por/por.module';

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
    // })
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 20,
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      port: 27017,
      // url: process.env.MONGO_CONNECTION_STRING,
      url: 'mongodb+srv://coursemapper:anA56sz3*CM100@varaipatam.2g6bq.mongodb.net/coursemap-db?retryWrites=true&w=majority',
      useNewUrlParser: true,
      keepConnectionAlive: true,
      synchronize: false,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    // UserModule,
    CourseModule,
    DepartmentModule,
    InstituteModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      // isGlobal: true,
    }),
    PorModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
