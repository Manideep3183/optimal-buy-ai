import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ScraperService } from './scraper/scraper.service';
import { SearchDto } from './dto/search.dto';
import { Product } from './interfaces/product.interface';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly scraperService: ScraperService) {}

  @Post('search')
  async search(@Body() searchDto: SearchDto): Promise<Product[]> {
    this.logger.log(`Received search request for: ${searchDto.query}`);
    
    try {
      const results = await this.scraperService.searchAndRecommend(searchDto.query);
      this.logger.log(`Returning ${results.length} products`);
      return results;
    } catch (error) {
      this.logger.error(`Search failed: ${error.message}`);
      throw error;
    }
  }
}
