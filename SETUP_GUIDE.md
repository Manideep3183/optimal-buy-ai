# PriceCompare Pro - Complete Setup Guide

This guide will help you set up and run both the frontend and backend of PriceCompare Pro.

## 🏗️ Project Architecture

```
price-compare-pro/
├── backend/              # NestJS Backend (Port 3001)
│   ├── src/
│   │   ├── scraper/     # Scraping logic with Playwright & Cheerio
│   │   ├── dto/         # Data Transfer Objects
│   │   ├── interfaces/  # TypeScript interfaces
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
│
└── src/                 # React Frontend (Port 5173)
    ├── components/      # UI Components
    ├── pages/           # Page components
    └── data/            # Mock data utilities
```

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🚀 Quick Start

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
npx playwright install chromium
```

### Step 2: Start the Backend Server

```bash
# From the backend directory
npm run start:dev
```

The backend will start on `http://localhost:3001`

You should see:
```
🚀 PriceCompare Pro Backend is running on: http://localhost:3001
📡 API endpoint: POST http://localhost:3001/search
```

### Step 3: Start the Frontend

Open a new terminal:

```bash
# From the root directory
npm run dev
```

The frontend will start on `http://localhost:5173`

### Step 4: Test the Application

1. Open your browser and navigate to `http://localhost:5173`
2. Enter a product name (e.g., "iPhone 14", "Samsung TV", "MacBook Pro")
3. Click "Compare Prices"
4. View real-time scraped results from Amazon and Flipkart with AI recommendations!

## 🧪 Testing the API Directly

You can test the backend API using curl:

```bash
curl -X POST http://localhost:3001/search \
  -H "Content-Type: application/json" \
  -d '{"query": "iPhone 14"}'
```

## 🧠 How It Works

### Backend Flow

1. **Request Reception**: POST /search receives a query
2. **Browser Launch**: Playwright launches headless Chromium
3. **Concurrent Scraping**: Amazon and Flipkart scraped simultaneously
4. **HTML Parsing**: Cheerio extracts product data
5. **Recommendation Engine**: Calculates scores based on:
   - Price Score (70% weight)
   - Review Score (30% weight)
6. **Response**: Returns sorted products with recommendations

### Recommendation Algorithm

```typescript
Price Score = (maxPrice - currentPrice) / priceRange * 70
Review Score = (rating / 5.0) * 30
Final Score = Price Score + Review Score

Recommendations:
- 80-100: "Excellent Deal! Buy Now"
- 60-79:  "Good Deal"
- 40-59:  "Fair Price"
- 0-39:   "Consider Waiting"
```

## 📁 Key Files

### Backend

- `src/scraper/scraper.service.ts` - Main scraping and recommendation logic
- `src/app.controller.ts` - API endpoint definition
- `src/dto/search.dto.ts` - Request validation
- `src/interfaces/product.interface.ts` - TypeScript interfaces

### Frontend

- `src/pages/Index.tsx` - Main page with API integration
- `src/components/ProductCard.tsx` - Product display component
- `src/components/ProductSearch.tsx` - Search input component

## 🛠️ Development Commands

### Backend

```bash
cd backend

# Development with hot reload
npm run start:dev

# Build for production
npm run build

# Run production build
npm run start:prod

# Format code
npm run format

# Lint code
npm run lint
```

### Frontend

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=3001
NODE_ENV=development
```

### CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Alternative port)
- `http://localhost:8080` (Alternative port)

To add more origins, edit `backend/src/main.ts`:

```typescript
app.enableCors({
  origin: ['http://localhost:5173', 'http://your-custom-origin'],
  // ...
});
```

## 🐛 Troubleshooting

### Backend won't start

1. Ensure all dependencies are installed: `cd backend && npm install`
2. Check if port 3001 is available: `lsof -i :3001`
3. Verify Playwright is installed: `npx playwright install chromium`

### Frontend shows "Using Demo Data"

1. Ensure backend is running on port 3001
2. Check browser console for CORS errors
3. Verify the backend API is accessible: `curl http://localhost:3001`

### No products returned

1. Check backend logs for scraping errors
2. Amazon/Flipkart may have changed their HTML structure
3. Try different search queries (e.g., "laptop", "phone", "headphones")

### Playwright browser issues

```bash
# Reinstall Playwright browsers
cd backend
npx playwright install chromium --force
```

## 📊 Performance Notes

- **Concurrent Scraping**: Both platforms are scraped simultaneously for speed
- **Headless Browser**: Chromium runs in headless mode for efficiency
- **Limited Results**: Max 10 products per platform to ensure fast response times
- **Timeout**: 30-second timeout per platform to prevent hanging

## 🚧 Known Limitations

1. **Web Scraping Fragility**: E-commerce sites frequently change their HTML structure
2. **Rate Limiting**: Excessive requests may trigger anti-bot measures
3. **Dynamic Content**: Some products may not load properly in headless mode
4. **Regional Variations**: Scrapers are configured for Indian versions (.in domains)

## 🔒 Best Practices

1. **Rate Limiting**: Consider implementing rate limiting for production
2. **Caching**: Add Redis caching to reduce scraping frequency
3. **Proxy Rotation**: Use proxy services for production scraping
4. **Error Monitoring**: Implement Sentry or similar for error tracking
5. **Database**: Add PostgreSQL/MongoDB for storing historical price data

## 📝 Next Steps

- [ ] Add Redis caching layer
- [ ] Implement rate limiting
- [ ] Add more e-commerce platforms
- [ ] Store historical price data
- [ ] Add user authentication
- [ ] Implement price alerts
- [ ] Add GraphQL API option
- [ ] Deploy to production (Docker + Kubernetes)

## 🎯 Production Deployment

### Using Docker

Create `backend/Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx playwright install-deps
RUN npx playwright install chromium
COPY . .
RUN npm run build
CMD ["npm", "run", "start:prod"]
EXPOSE 3001
```

Build and run:
```bash
docker build -t pricecompare-backend ./backend
docker run -p 3001:3001 pricecompare-backend
```

## 📞 Support

For issues or questions, please check the logs:
- Backend logs: Console output from `npm run start:dev`
- Frontend logs: Browser console (F12 > Console)

---

**Happy Price Hunting! 🎉**
