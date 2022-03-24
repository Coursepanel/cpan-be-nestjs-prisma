import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScraperController } from './scraper/scraper.controller';
import { ScraperModule } from './scraper/scraper.module';

@Module({
  imports: [ScraperModule],
  controllers: [AppController, ScraperController],
  providers: [AppService],
})
export class AppModule {}
