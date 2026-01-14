# PollyScanner

PollyScanner is a next-generation probability intelligence desk for prediction markets.
It provides real-time market scanning, probability insights, and crowd sentiment analytics — designed to compete with Polymarket.com.

Unlike traditional prediction platforms, PollyScanner operates as a non-custodial intelligence engine:

✅ **Explores market inefficiencies and probability arbitrage**

✅ **Generates actionable signals from decentralized event markets**

✅ **Aggregates crowd conviction and trends for informed forecasting**

✅ **Built for Polygon + USDC-compatible markets**

✅ **Black + Orange professional UI, optimized for high-performance analytics**

## Key Features

### Prediction Market Intelligence
- Tracks Yes/No market probabilities
- Computes confidence deltas & trend signals
- Identifies arbitrage and informational latency opportunities

### Intelligence Hub
- **LEO AI: The PollyScanner Architect**
- Automated analytics without exposing users to gambling
- Modular and extendable probability engines

### Screeners & Dashboards
- Real-time probability screeners
- Event filtering by market type or outcome likelihood
- Live updates powered by decentralized data feeds

### Professional UI/UX
- Dark + orange Postman-style theme
- Animated loading bars & responsive dashboards
- Sidebar + header panels, toggleable intelligence modules

## Architecture Overview
- **Frontend**: Next.js + React, fully black + orange theme
- **Backend (optional)**: FastAPI / Node for probability aggregation
- **Storage**: Non-destructive local storage (`pollyscanner_*`)
- **Deployment**: GitHub + Vercel (https://pollyscanner.vercel.app)
- **AI Integration**: LEO AI Architect for market intelligence

## Setup Instructions
```bash
git clone https://github.com/opendev-labs/pollyscanner.git
cd pollyscanner
npm install
npx vercel
```

## Design Philosophy
- **Non-destructive**: Works independently without affecting other projects
- **Additive upgrades**: Future features can be integrated without refactoring
- **Competitor-grade**: Built to rival Polymarket.com in speed, insights, and UX
- **Safe**: No direct betting or custodial execution — analytics only
