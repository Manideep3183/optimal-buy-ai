# 🚀 PriceCompare Pro - Quick Start Guide

## ⚡ Fastest Way to Get Running

### Step 1: Open 2 Terminals

### Step 2: Terminal 1 - Start Backend

```bash
cd backend
npm run start:dev
```

Wait until you see:
```
🚀 PriceCompare Pro Backend is running on: http://localhost:3001
```

### Step 3: Terminal 2 - Start Frontend

```bash
npm run dev
```

Wait until you see:
```
  ➜  Local:   http://localhost:5173/
```

### Step 4: Open Browser

Go to: **http://localhost:5173**

### Step 5: Search!

Enter a product name like:
- iPhone 14
- Samsung TV
- MacBook Pro
- Headphones

Click "Compare Prices" and watch the magic happen! ✨

---

## 🎯 What You'll See

1. **Search Bar** - Enter any product name
2. **Loading Animation** - Real-time scraping in progress
3. **AI Recommendation** - "Excellent Deal! Buy Now" or similar
4. **Product Cards** - Sorted by recommendation score
5. **Price Trends** - Historical price charts
6. **Sentiment Analysis** - Customer review analysis

---

## 🔧 First Time Setup

If this is your first time, run these commands first:

```bash
# Backend setup
cd backend
npm install
npx playwright install chromium

# Frontend setup
cd ..
npm install
```

Then follow the steps above!

---

## ✅ Verify Everything Works

### Test Backend API Directly

```bash
curl -X POST http://localhost:3001/search \
  -H "Content-Type: application/json" \
  -d '{"query": "iPhone"}'
```

You should see JSON with product data!

---

## 🆘 Troubleshooting

### Backend won't start?

```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npx playwright install chromium
npm run start:dev
```

### Frontend won't start?

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Port already in use?

```bash
# Kill process on port 3001 (backend)
lsof -ti:3001 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

---

## 📖 Need More Help?

Read the detailed guides:
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Complete setup
- [COMMANDS.md](./COMMANDS.md) - All commands
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Implementation details

---

## 🎉 That's It!

You're now running a full-stack price comparison app with:
- Real-time web scraping
- AI-powered recommendations
- Beautiful UI
- TypeScript everywhere

Happy price hunting! 🛍️
