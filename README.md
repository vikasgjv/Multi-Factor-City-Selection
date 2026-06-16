# LocateIQ — City Expansion Decision Platform

> **Problem Statement :** A growing brand wants to open in a new city but must choose among several candidates with differing demographics, spending patterns, infrastructure, and local competition. The decision feels risky, and there is disagreement about what should matter most.

LocateIQ turns that uncertainty into a clear, data-driven recommendation. It is an interactive site selection dashboard where decision-makers can explore candidate cities, tune their own priority weights, and arrive at a confident expansion choice — all in one place.

---

## The Problem

Expanding to a new city is one of the riskiest calls a growing brand makes:

- Multiple cities look attractive on paper
- Different stakeholders prioritize different things — some care about population size, others about competition levels or logistics
- No single view exists to weigh all factors together objectively
- The final call often comes down to opinion rather than evidence

---

## The Solution

LocateIQ provides a four-page intelligence platform:

1. **Overview** — KPI summary (5 cities, 20 data points, ₹924B combined market, 89M population) and clickable city cards showing population, GDP, and spending score
2. **Map Analysis** — Live Google Maps satellite view of the selected city, a radar chart profiling all 4 metrics, a diagnostics panel with raw scores, and real-time weight sliders that re-rank cities instantly
3. **Comparison Matrix** — All 5 cities ranked side-by-side across every metric with animated score bars and a "Top Pick" badge on the winner
4. **Strategic Report** — Composite score winner hero, 5 strategic recommendations, per-city market entry risk levels (Low / Medium / High), and a final weighted ranking chart

---

## Scoring Engine

Every city gets a composite score calculated as:

```
totalScore =
  (demographics  × weight_demographics)  +
  ((100 - competition) × weight_competition) +
  (infrastructure × weight_infrastructure) +
  (spending       × weight_spending)
```

Weights are normalized so they always sum to 100%, meaning adjusting one slider proportionally affects all others. Rankings update live across all pages simultaneously.

---

## Candidate Cities

| City | State | Tag | Population | Est. GDP | Demographics | Competition | Infrastructure | Spending |
|------|-------|-----|-----------|---------|-------------|------------|---------------|---------|
| Bengaluru | Karnataka | Tech Hub | 13.6M | ₹110B | 85 | 60 | 90 | 95 |
| Hyderabad | Telangana | Emerging Market | 10.5M | ₹75B | 80 | 50 | 75 | 88 |
| Chennai | Tamil Nadu | Industrial Leader | 11.2M | ₹78B | 90 | 75 | 85 | 92 |
| Delhi | Delhi NCR | Capital Market | 32.9M | ₹293B | 82 | 45 | 80 | 85 |
| Mumbai | Maharashtra | Financial Capital | 21.3M | ₹368B | 78 | 85 | 70 | 95 |

> Competition score is inverse — a lower number means less competition, which is better.

---

## Pages Breakdown

### 🏠 Overview
- Hero section with animated gradient headline
- 4 KPI cards: candidate cities, data points, combined market size, total population
- City cards grid — each card shows name, state, tag, description, population, GDP, and spending score
- Clicking any city card jumps directly to Map Analysis with that city selected

### 🗺️ Map Analysis
- Left panel: 4 priority weight sliders (Demographics, Competition, Infrastructure, Spending) + live leaderboard with gold/silver/bronze ranks
- Center: Google Maps satellite embed that updates when city changes
- Floating radar chart showing the selected city's 4-metric profile index
- Floating diagnostics panel with raw scores for all 4 metrics
- City banner at the top showing name, state, and tag

### 📊 Comparison Matrix
- Full-width table with all 5 cities
- Animated score bars for each metric
- Competition column shows inverted score (market gap) for fair comparison
- Overall score column with gradient bar and color-coded value
- Top Pick badge on the current #1 ranked city

### 📋 Strategic Report
- Winner hero card with city name, description, and composite score
- 5 strategic recommendations (e.g., first-mover advantage cities, premium positioning, deferred entry)
- Market entry risk assessment per city: Low ✅ / Medium ⚠️ / High 🔴 with reasoning
- Final weighted rankings with animated progress bars

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Charts | Recharts (RadarChart) |
| Maps | Google Maps Embed API |
| Styling | Pure CSS with custom properties — no UI library |
| Icons | Emoji-based (no icon library dependency) |
| Linting | ESLint 9 with react-hooks and react-refresh plugins |

---

## Project Structure

```
next-city-expansion/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   ├── logo.png
│   └── slide-bg.png
├── src/
│   ├── data/
│   │   └── cities.js        # All city data + metricConfig array
│   ├── pages/
│   │   ├── Overview.jsx     # Landing page with KPIs and city cards
│   │   ├── Analysis.jsx     # Map + radar chart + weight sliders
│   │   ├── Comparison.jsx   # Side-by-side comparison table
│   │   └── Report.jsx       # Strategic report and risk assessment
│   ├── App.jsx              # Root layout, sidebar, navigation state, scoring engine
│   ├── index.css            # All styles — design tokens, animations, component styles
│   └── main.jsx             # React entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## Getting Started

**Prerequisites:** Node.js 18+ installed on your machine.

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/next-city-expansion.git

# 2. Navigate into the project folder
cd next-city-expansion

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

### Other commands

```bash
npm run build    # Build for production (outputs to /dist)
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

---

## How to Use

1. Open the app — the **Overview** page loads with all 5 cities
2. Click any city card to jump to **Map Analysis**
3. Use the sliders on the left to adjust what matters most to your brand
4. Watch the leaderboard re-rank in real time
5. Switch to **Comparison** to see all cities side by side
6. Go to **Report** for the final recommendation, risk levels, and strategic advice
7. Use the sidebar's **Quick Select City** buttons to switch cities from anywhere

---
# Contact
* Vikas G J
* Email: vikasgjv@gmail.com
* LinkedIn: linkedin.com/in/vikas-gj-979251296


⭐ Star this repo if you find it useful!

## License

MIT
