# 🛒 PriceCompare Pro

**Smart Price Comparison with AI-Powered Recommendations**

A full-stack application that scrapes Amazon and Flipkart in real-time, analyzes prices, and provides intelligent buying recommendations.

## 🚀 Quick Start

### Prerequisites
- Node.js v18 or higher
- npm

### Installation & Running

**Option 1: Automatic (Linux/Mac)**
```bash
./start-dev.sh
```

**Option 2: Manual (2 Terminals Required)**

Terminal 1 - Backend:
```bash
cd backend
npm install
npx playwright install chromium
npm run start:dev
```

Terminal 2 - Frontend:
```bash
npm install  # if not already done
npm run dev
```

Then open `http://localhost:5173` in your browser!

## 📚 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup and usage guide
- **[COMMANDS.md](./COMMANDS.md)** - All CLI commands reference
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Implementation overview
- **[backend/README.md](./backend/README.md)** - Backend-specific documentation

## 🏗️ Architecture

```
Frontend (React + Vite)  →  Backend (NestJS)  →  Playwright + Cheerio  →  Amazon & Flipkart
     Port 5173                  Port 3001              Web Scraping
```

## ✨ Features

- ✅ Real-time web scraping of Amazon & Flipkart
- ✅ Concurrent scraping for optimal performance
- ✅ Smart recommendation algorithm (70% price, 30% reviews)
- ✅ Beautiful, responsive UI with shadcn/ui
- ✅ TypeScript throughout
- ✅ Error handling with graceful fallbacks

## 🛠️ Tech Stack

**Frontend:**
- React + TypeScript
- Vite
- shadcn-ui + Tailwind CSS

**Backend:**
- NestJS + TypeScript
- Playwright (browser automation)
- Cheerio (HTML parsing)
- class-validator (DTO validation)

## 🎯 API Endpoint

```bash
POST http://localhost:3001/search
Content-Type: application/json

{
  "query": "iPhone 14"
}
```

## 📦 Project Structure

```
├── backend/              # NestJS Backend
│   ├── src/
│   │   ├── scraper/     # Web scraping logic
│   │   ├── dto/         # Data validation
│   │   └── interfaces/  # TypeScript types
│   └── package.json
├── src/                 # React Frontend
│   ├── components/      # UI components
│   ├── pages/           # Page components
│   └── data/            # Mock data utilities
└── Documentation files
```

---

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/e8ad68b1-d30b-4456-913f-1d4a25f12b65

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/e8ad68b1-d30b-4456-913f-1d4a25f12b65) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e8ad68b1-d30b-4456-913f-1d4a25f12b65) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
