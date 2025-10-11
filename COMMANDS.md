# PriceCompare Pro - Command Reference

Quick reference for all commands needed to set up and run the application.

## 🎯 Step 1: NestJS Project Setup Commands

These are the commands that would traditionally be used to create a NestJS project from scratch:

```bash
# Create new NestJS project (ALREADY DONE FOR YOU)
npx @nestjs/cli new price-compare-pro-backend

# Generate a module (ALREADY DONE FOR YOU)
nest generate module scraper

# Generate a service (ALREADY DONE FOR YOU)
nest generate service scraper

# Generate a controller (ALREADY DONE FOR YOU)
nest generate controller app
```

**✅ These have been pre-configured in your `/workspace/backend` directory!**

## 📦 Step 2: Install Dependencies

### Backend Dependencies

```bash
cd backend
npm install
```

This installs:
- `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express` - NestJS framework
- `playwright` - Browser automation for web scraping
- `cheerio` - Fast HTML parsing (server-side jQuery)
- `class-validator`, `class-transformer` - DTO validation
- `typescript`, `ts-node` - TypeScript support

### Install Playwright Browsers

```bash
# From backend directory
npx playwright install chromium
```

## 🚀 Step 3: Running the Application

### Start Backend (Terminal 1)

```bash
cd backend

# Development mode with hot reload (recommended)
npm run start:dev

# OR Production mode
npm run build
npm run start:prod
```

Backend runs on: `http://localhost:3001`

### Start Frontend (Terminal 2)

```bash
# From root directory
npm run dev
```

Frontend runs on: `http://localhost:5173`

## 🧪 Testing Commands

### Test Backend API

```bash
# Test with curl
curl -X POST http://localhost:3001/search \
  -H "Content-Type: application/json" \
  -d '{"query": "iPhone 14"}'

# Test with httpie (if installed)
http POST http://localhost:3001/search query="Samsung TV"
```

### Check if servers are running

```bash
# Check backend (should show port 3001)
lsof -i :3001

# Check frontend (should show port 5173)
lsof -i :5173
```

## 🛠️ Development Commands

### Backend

```bash
cd backend

# Start development server with watch mode
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start:prod

# Format code with Prettier
npm run format

# Lint code
npm run lint
```

### Frontend

```bash
# Start development server (from root)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔍 Debugging Commands

### Check Node/npm versions

```bash
node --version  # Should be v18 or higher
npm --version   # Should be 9 or higher
```

### View backend logs

```bash
# Backend logs are shown in the terminal where you ran npm run start:dev
# No additional command needed
```

### Clear Playwright cache

```bash
cd backend
npx playwright install chromium --force
```

### Reinstall all dependencies

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd ..
rm -rf node_modules package-lock.json
npm install
```

## 📊 Project Structure Commands

### View backend structure

```bash
cd backend
tree src -I 'node_modules'
```

### Count lines of code

```bash
# Backend TypeScript files
find backend/src -name '*.ts' | xargs wc -l

# Frontend TypeScript/TSX files
find src -name '*.ts*' | xargs wc -l
```

## 🐳 Docker Commands (Optional)

### Build Docker image

```bash
cd backend
docker build -t pricecompare-backend .
```

### Run Docker container

```bash
docker run -p 3001:3001 pricecompare-backend
```

## 🔧 Useful npm scripts

### Backend (backend/package.json)

```json
{
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "format": "prettier --write \"src/**/*.ts\"",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix"
  }
}
```

### Frontend (package.json)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  }
}
```

## 🚨 Common Issues & Solutions

### Issue: Port already in use

```bash
# Find and kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Find and kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Issue: Playwright browser not found

```bash
cd backend
npx playwright install chromium
```

### Issue: Module not found

```bash
# Backend
cd backend && npm install

# Frontend
npm install
```

## 📝 Quick Start (Copy-Paste Ready)

```bash
# Terminal 1: Start Backend
cd backend && npm install && npx playwright install chromium && npm run start:dev

# Terminal 2: Start Frontend (from root)
npm run dev
```

Then open `http://localhost:5173` in your browser!

---

**That's it! You're ready to go! 🎉**
