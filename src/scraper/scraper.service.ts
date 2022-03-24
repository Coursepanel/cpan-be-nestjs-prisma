import { Injectable } from '@nestjs/common';

@Injectable()
export class ScraperService {
  async scrapeWeb() {
    return 'hello scraping';
  }
}
