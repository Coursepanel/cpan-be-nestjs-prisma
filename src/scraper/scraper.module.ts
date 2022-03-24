import { ScraperController } from './scraper.controller';
import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Module({
  controllers: [ScraperController],
  providers: [ScraperService],
  exports: [ScraperService],
})
export class ScraperModule {}
