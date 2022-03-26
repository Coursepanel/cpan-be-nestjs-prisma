import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScraperController } from './scraper/scraper.controller';
import { ScraperModule } from './scraper/scraper.module';
import { NotionController } from './notion/notion.controller';
import { NotionModule } from './notion/notion.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ScraperModule,
    NotionModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
  ],
  controllers: [AppController, ScraperController, NotionController],
  providers: [AppService],
})
export class AppModule {}
