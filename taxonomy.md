# 📊 Polyscan Screeners Taxonomy

This document defines the categorization and metric logic for Polyscan's probability intelligence layers.

## 1. Probability Trend Screeners
*Analyze the direction and velocity of market consensus.*
- **Velocity**: Rate of change in "YES" price per hour.
- **Support Zones**: Price levels where liquidity is concentrated.
- **Momentum Flipping**: Detecting when consensus shifts from "NO" to "YES" (or vice versa).

## 2. Confidence Delta Metrics
*Measure the gap between prediction platforms and external data.*
- **Platform Delta**: Price differences between Polymarket, Kalshi, and PredictIt.
- **Oracle Delta**: Discrepancy between current market price and UMA/Reality.eth optimistic states.
- **Expert vs. Crowd**: Comparing prediction market odds against specialist forecasts (e.g., FiveThirtyEight, Silver Bulletin).

## 3. Crowd Conviction Heatmaps
*Visualize the concentration of capital and positioning.*
- **Volume Heat**: Identifying "Hot Events" with sudden liquidity spikes.
- **Concentration Index**: Analyzing whether the price is driven by a few "whales" or a broad crowd.
- **Position Duration**: Average time positions are held (identifying speculative vs. conviction holding).

## 4. Time-Weighted Probability Shifts
*Smoothing noise to identify institutional-grade signals.*
- **7D Momentum**: Rolling 7-day probability average.
- **Volatility Bands**: Standard deviation of price shifts over 24h.
- **Event Proximity Weight**: Increasing signal sensitivity as the resolution date approaches.

## 5. Cross-Market Correlation Signals
*Identifying systemic dependencies between unrelated events.*
- **Political Contagion**: How a shift in one election market affects global macro outcomes.
- **Crypto-Event Coupling**: Correlation between Bitcoin price and regulatory outcome probabilities.
- **Sentiment Clusters**: Grouping markets that react synchronously to news events.

---

## 🛠️ Screener Data Model (Draft)
```ts
type ScreenerMetric = {
  type: "probability" | "delta" | "conviction" | "correlation";
  value: number; // Normalized 0-1 or percentage
  trend: "up" | "down" | "neutral";
  confidenceScore: number; // 0-100 based on volume and liquidity
};

type PollyScannerScreener = {
  marketId: string;
  category: string;
  metrics: ScreenerMetric[];
  signals: string[]; // e.g., "Whale Accumulation", "Arbitrage Alert"
};
```
