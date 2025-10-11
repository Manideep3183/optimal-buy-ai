# PriceCompare Pro Backend

High-performance NestJS backend for PriceCompare Pro - Web scraping and intelligent price comparison.

## Features

- 🚀 **Fast Concurrent Scraping**: Uses Playwright to scrape Amazon and Flipkart simultaneously
- 🧠 **Smart Recommendation Algorithm**: Weighted scoring system (70% price, 30% reviews)
- 🎯 **Single API Endpoint**: Simple POST /search endpoint
- 📊 **TypeScript**: Fully typed for better developer experience
- ⚡ **Cheerio HTML Parsing**: Server-side jQuery for efficient HTML parsing

## Tech Stack

- **Framework**: NestJS with TypeScript
- **Web Scraping**: Playwright + Cheerio
- **Validation**: class-validator + class-transformer

## Installation

```bash
cd backend
npm install

# Install Playwright browsers
npx playwright install chromium
```

## Running the Application

```bash
# Development mode with watch
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The server will start on `http://localhost:3001`

## API Usage

### Search Endpoint

**POST** `/search`

Request body:
```json
{
  "query": "iPhone 14"
}
```

Response:
```json
[
  {
    "id": "amazon-0",
    "name": "iPhone 14 (128GB) - Blue",
    "image": "https://...",
    "platform": "amazon",
    "price": 65999,
    "originalPrice": 79900,
    "rating": 4.5,
    "reviewCount": 1234,
    "discount": 17,
    "deliveryTime": "1-2 days",
    "inStock": true,
    "url": "https://amazon.in/...",
    "recommendationScore": 85.3,
    "recommendationText": "Excellent Deal! Buy Now"
  }
]
```

## Recommendation Algorithm

The backend uses a heuristic scoring model:

1. **Price Score (70% weight)**
   - Normalized relative to the lowest price found
   - Lower price = higher score

2. **Review Score (30% weight)**
   - Based on 5-star rating system
   - rating/5 * 30

3. **Final Score & Recommendation**
   - 80-100: "Excellent Deal! Buy Now"
   - 60-79: "Good Deal"
   - 40-59: "Fair Price"
   - 0-39: "Consider Waiting"

Products are sorted by recommendation score (highest first).

## Project Structure

```
backend/
├── src/
│   ├── scraper/
│   │   ├── scraper.service.ts    # Core scraping logic
│   │   └── scraper.module.ts     # Scraper module
│   ├── dto/
│   │   └── search.dto.ts         # Data transfer objects
│   ├── interfaces/
│   │   └── product.interface.ts  # TypeScript interfaces
│   ├── app.controller.ts         # Main API controller
│   ├── app.module.ts             # Root module
│   └── main.ts                   # Application entry point
├── package.json
└── tsconfig.json
```

## Notes

- The scraper is configured to run in headless mode for performance
- Maximum 10 products per platform to ensure fast response times
- Implements error handling and logging for debugging
- Uses concurrent scraping with Promise.all for optimal speed
