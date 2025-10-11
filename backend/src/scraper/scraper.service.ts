import { Injectable, Logger } from '@nestjs/common';
import { chromium, Browser, Page } from 'playwright';
import * as cheerio from 'cheerio';
import { Product, ScrapedProduct } from '../interfaces/product.interface';

@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);

  /**
   * Main orchestrator method
   * Launches browser, scrapes both platforms concurrently, applies recommendation logic
   */
  async searchAndRecommend(query: string): Promise<Product[]> {
    this.logger.log(`Starting search for: ${query}`);
    let browser: Browser;

    try {
      // Launch Playwright browser
      browser = await chromium.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      // Scrape both platforms concurrently
      const [amazonProducts, flipkartProducts] = await Promise.all([
        this._scrapeAmazon(query, browser).catch((err) => {
          this.logger.error(`Amazon scraping failed: ${err.message}`);
          return [];
        }),
        this._scrapeFlipkart(query, browser).catch((err) => {
          this.logger.error(`Flipkart scraping failed: ${err.message}`);
          return [];
        }),
      ]);

      // Combine results
      const allProducts = [...amazonProducts, ...flipkartProducts];
      this.logger.log(`Total products scraped: ${allProducts.length}`);

      // Convert to Product format and calculate recommendations
      const products = this._convertToProducts(allProducts);
      
      // Calculate recommendation scores
      const productsWithScores = this._calculateRecommendation(products);

      // Sort by recommendation score (highest first)
      return productsWithScores.sort((a, b) => b.recommendationScore - a.recommendationScore);
    } catch (error) {
      this.logger.error(`Error in searchAndRecommend: ${error.message}`);
      throw error;
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  /**
   * Scrape Amazon for products
   */
  private async _scrapeAmazon(query: string, browser: Browser): Promise<ScrapedProduct[]> {
    this.logger.log(`Scraping Amazon for: ${query}`);
    const page: Page = await browser.newPage();
    const products: ScrapedProduct[] = [];

    try {
      const searchUrl = `https://www.amazon.in/s?k=${encodeURIComponent(query)}`;
      
      // Navigate and wait for content
      await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(2000); // Wait for dynamic content

      // Get page HTML
      const html = await page.content();
      const $ = cheerio.load(html);

      // Parse product listings
      $('div[data-component-type="s-search-result"]').each((index, element) => {
        if (index >= 10) return false; // Limit to 10 products

        try {
          const $element = $(element);
          
          // Extract product name
          const productName = $element.find('h2 a span').first().text().trim();
          if (!productName) return;

          // Extract price
          const priceWhole = $element.find('span.a-price-whole').first().text().replace(/,/g, '').trim();
          const price = priceWhole ? parseFloat(priceWhole) : 0;
          if (!price) return;

          // Extract original price for discount calculation
          const originalPriceText = $element.find('span.a-price.a-text-price span.a-offscreen').first().text();
          const originalPrice = originalPriceText ? parseFloat(originalPriceText.replace(/[₹,]/g, '')) : undefined;

          // Calculate discount
          const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : undefined;

          // Extract rating
          const ratingText = $element.find('span.a-icon-alt').first().text();
          const ratingMatch = ratingText.match(/(\d+\.?\d*)/);
          const rating = ratingMatch ? parseFloat(ratingMatch[1]) : 4.0;

          // Extract review count
          const reviewText = $element.find('span.a-size-base.s-underline-text').first().text();
          const reviewMatch = reviewText.replace(/,/g, '').match(/(\d+)/);
          const reviewCount = reviewMatch ? parseInt(reviewMatch[1]) : 100;

          // Extract product URL
          const relativeUrl = $element.find('h2 a').attr('href');
          const productUrl = relativeUrl ? `https://www.amazon.in${relativeUrl}` : searchUrl;

          // Extract image URL
          const imageUrl = $element.find('img.s-image').attr('src') || '/placeholder.svg';

          // Delivery time (Amazon typically offers fast delivery)
          const primeElement = $element.find('i.a-icon-prime');
          const deliveryTime = primeElement.length ? '1-2 days' : '3-5 days';

          products.push({
            productName,
            price,
            originalPrice,
            discount,
            rating,
            reviewCount,
            productUrl,
            imageUrl,
            retailer: 'amazon',
            deliveryTime,
            inStock: true,
          });
        } catch (err) {
          this.logger.warn(`Error parsing Amazon product: ${err.message}`);
        }
      });

      this.logger.log(`Scraped ${products.length} products from Amazon`);
    } catch (error) {
      this.logger.error(`Amazon scraping error: ${error.message}`);
    } finally {
      await page.close();
    }

    return products;
  }

  /**
   * Scrape Flipkart for products
   */
  private async _scrapeFlipkart(query: string, browser: Browser): Promise<ScrapedProduct[]> {
    this.logger.log(`Scraping Flipkart for: ${query}`);
    const page: Page = await browser.newPage();
    const products: ScrapedProduct[] = [];

    try {
      const searchUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`;
      
      // Navigate and wait for content
      await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(2000); // Wait for dynamic content

      // Get page HTML
      const html = await page.content();
      const $ = cheerio.load(html);

      // Parse product listings (Flipkart has different selectors)
      $('div._1AtVbE, div._13oc-S, div._2kHMtA').each((index, element) => {
        if (index >= 10) return false; // Limit to 10 products

        try {
          const $element = $(element);
          
          // Extract product name
          const productName = $element.find('div._4rR01T, a._1fQZEK, div.s1Q9rs').first().text().trim() ||
                             $element.find('a.IRpwTa').first().text().trim();
          if (!productName) return;

          // Extract price
          const priceText = $element.find('div._30jeq3, div._25b18c, div._30jeq3._1_WHN1').first().text();
          const price = priceText ? parseFloat(priceText.replace(/[₹,]/g, '')) : 0;
          if (!price) return;

          // Extract original price
          const originalPriceText = $element.find('div._3I9_wc, div._3auQ3N').first().text();
          const originalPrice = originalPriceText ? parseFloat(originalPriceText.replace(/[₹,]/g, '')) : undefined;

          // Calculate discount
          const discountText = $element.find('div._3Ay6Sb, div._3Ay6Sb._31Dcoz').first().text();
          const discountMatch = discountText.match(/(\d+)/);
          const discount = discountMatch ? parseInt(discountMatch[1]) : 
                          (originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : undefined);

          // Extract rating
          const ratingText = $element.find('div._3LWZlK, div._3LWZlK._1BLPMq').first().text();
          const rating = ratingText ? parseFloat(ratingText) : 4.0;

          // Extract review count
          const reviewText = $element.find('span._2_R_DZ, span._13vcmD').first().text();
          const reviewMatch = reviewText.replace(/,/g, '').match(/(\d+)/);
          const reviewCount = reviewMatch ? parseInt(reviewMatch[1]) : 100;

          // Extract product URL
          const relativeUrl = $element.find('a._1fQZEK, a.IRpwTa, a._2rpwqI').first().attr('href');
          const productUrl = relativeUrl ? `https://www.flipkart.com${relativeUrl}` : searchUrl;

          // Extract image URL
          const imageUrl = $element.find('img._396cs4, img._2r_T1I').first().attr('src') || '/placeholder.svg';

          // Delivery time
          const deliveryTime = '2-4 days';

          products.push({
            productName,
            price,
            originalPrice,
            discount,
            rating,
            reviewCount,
            productUrl,
            imageUrl,
            retailer: 'flipkart',
            deliveryTime,
            inStock: true,
          });
        } catch (err) {
          this.logger.warn(`Error parsing Flipkart product: ${err.message}`);
        }
      });

      this.logger.log(`Scraped ${products.length} products from Flipkart`);
    } catch (error) {
      this.logger.error(`Flipkart scraping error: ${error.message}`);
    } finally {
      await page.close();
    }

    return products;
  }

  /**
   * Convert scraped products to Product interface
   */
  private _convertToProducts(scrapedProducts: ScrapedProduct[]): Product[] {
    return scrapedProducts.map((scraped, index) => ({
      id: `${scraped.retailer}-${index}`,
      name: scraped.productName,
      image: scraped.imageUrl,
      platform: scraped.retailer,
      price: scraped.price,
      originalPrice: scraped.originalPrice,
      rating: scraped.rating,
      reviewCount: scraped.reviewCount,
      discount: scraped.discount,
      deliveryTime: scraped.deliveryTime || '3-5 days',
      inStock: scraped.inStock !== false,
      url: scraped.productUrl,
    }));
  }

  /**
   * Calculate recommendation scores using the heuristic model
   * Price Score (70% weight) + Review Score (30% weight)
   */
  private _calculateRecommendation(products: Product[]): Product[] {
    if (products.length === 0) return products;

    // Find min and max values for normalization
    const prices = products.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1; // Avoid division by zero

    return products.map(product => {
      // Price Score (70% weight): Lower price = higher score
      // Normalize: 1.0 for lowest price, 0.0 for highest price
      const normalizedPrice = (maxPrice - product.price) / priceRange;
      const priceScore = normalizedPrice * 70;

      // Review Score (30% weight): Based on 5-star rating
      // Normalize: rating/5 * 30
      const reviewScore = (product.rating / 5.0) * 30;

      // Final Score (0-100)
      const finalScore = priceScore + reviewScore;

      // Generate recommendation text
      let recommendationText: string;
      if (finalScore >= 80) {
        recommendationText = 'Excellent Deal! Buy Now';
      } else if (finalScore >= 60) {
        recommendationText = 'Good Deal';
      } else if (finalScore >= 40) {
        recommendationText = 'Fair Price';
      } else {
        recommendationText = 'Consider Waiting';
      }

      return {
        ...product,
        recommendationScore: Math.round(finalScore * 10) / 10, // Round to 1 decimal
        recommendationText,
      };
    });
  }
}
