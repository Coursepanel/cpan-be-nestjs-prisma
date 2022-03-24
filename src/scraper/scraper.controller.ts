import { ScraperService } from './scraper.service';
import { Controller, Get } from '@nestjs/common';
@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get()
  async scrapeWeb() {
    return this.scraperService.scrapeWeb();
  }
}
