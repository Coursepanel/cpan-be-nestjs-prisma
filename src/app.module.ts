import { CourseModule } from './course/course.module';
import { Module } from '@nestjs/common';
import { ScraperModule } from './scraper/scraper.module';
import { NotionModule } from './notion/notion.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // type: 'mongodb',
      // port: '27017',
      // host: 'localhost',
      port: '27017',
      host: 'varaipatam.2g6bq.mongodb.net',
      username: 'coursemapper',
      password: 'anA56sz3*CM100',
      database: 'coursemap-db',
      // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    ScraperModule,
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
