# 🔭 LaganiLens

**A tool made to predict NEPSE trends** - An end-to-end AI/ML project for Nepal Stock Exchange data analysis and prediction.

![JavaScript](https://img.shields.io/badge/JavaScript-77.2%25-yellow)
![HTML](https://img.shields.io/badge/HTML-10.6%25-orange)
![CSS](https://img.shields.io/badge/CSS-7.7%25-blue)
![Python](https://img.shields.io/badge/Python-4.5%25-green)

---

## 📌 Overview

LaganiLens is an academic AI/ML project focused on acquiring historical **NEPSE (Nepal Stock Exchange)** data, preprocessing it, and applying machine learning techniques to analyze trends and make predictions. 

The project demonstrates a complete data science pipeline:
- **Data Acquisition** → Web scraping NEPSE data from ShareSansar
- **Data Storage** → MongoDB database for historical stock data
- **ML Predictions** → ARIMA model for 30-day price forecasting
- **Web Interface** → React frontend with portfolio management

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📊 **Stock Predictions** | 30-day price forecasts using ARIMA model |
| 📈 **Stock Comparison** | Compare multiple NEPSE stocks side-by-side |
| 💼 **Portfolio Management** | Track your investments and holdings |
| 🏆 **Leaderboard** | Compare portfolio performance with others |
| 🔐 **Authentication** | Firebase-based user authentication |
| 📉 **Historical Data** | Access historical NEPSE market data |

---

## 🏗️ Project Structure

```
LaganiLens/
├── Backend/
│   ├── ARIMA/
│   │   └── Data_extractor.py      # ARIMA prediction model
│   ├── Controllers/
│   │   └── compareStock           # Stock comparison logic
│   ├── Models/
│   │   ├── db. js                  # MongoDB connection
│   │   ├── NEPSEdata.js           # Stock data schema
│   │   ├── PredictedStock. js      # Prediction schema
│   │   └── UserPortfolio.js       # Portfolio schema
│   ├── Routes/
│   │   ├── stockRoutes.js         # Stock API routes
│   │   ├── predictionRoutes.js    # Prediction API routes
│   │   ├── Portfolio.js           # Portfolio routes
│   │   ├── TodayPrice.js          # Current price routes
│   │   └── Leaderboard.js         # Leaderboard routes
│   ├── Historicaldata. js          # Bulk CSV import
│   ├── Dailydata.js               # Daily CSV import
│   ├── server. js                  # Express server entry
│   ├── combined_csv/              # CSV data files (you need to add these)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Navbar. jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── StockSelect.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── Pages/
│   │   │   ├── Body.jsx           # Landing page
│   │   │   ├── Homepage.jsx       # Dashboard
│   │   │   ├── PredictionPage.jsx # ML predictions
│   │   │   ├── Comparstocks.jsx   # Stock comparison
│   │   │   ├── Portfolio.jsx      # Portfolio management
│   │   │   ├── Leaderboard.jsx    # Rankings
│   │   │   ├── Login.jsx          # Authentication
│   │   │   ├── Signup.jsx
│   │   │   └── About.jsx
│   │   ├── firebase.js            # Firebase config
│   │   └── main.jsx               # App entry point
│   └── package.json
│
├── Scraper/                       # ⚠️ NOT INCLUDED - Clone separately! 
│
└── README.md
```

---

## ⚠️ Important:  Scraper Not Included

The `Scraper/` folder is **NOT included** in this repository. You must clone it separately from the original source: 

```bash
# Clone the scraper repository separately
git clone https://github.com/OmitNomis/ShareSansarScraper. git Scraper
```

Or download pre-scraped data directly from:  [ShareSansarScraper Data Archive](https://omitnomis.github.io/ShareSansarScraper/download. html)

See [Data Setup](#-data-setup) section for detailed instructions.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **shadcn/ui** components
- **Recharts** for data visualization
- **Firebase** for authentication

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **Python** for ML (ARIMA model)

### Data Pipeline
- **Scrapy** (ShareSansarScraper) for data collection
- **Pandas** for data processing
- **statsmodels** for ARIMA forecasting

---

## 📝 Implementation Details

### Frontend Implementation

- **React 19** is used as the core UI library, bootstrapped with **Vite** for fast development and optimized production builds.
- **React Router v7** handles client-side routing with the following pages: Landing (`/`), Login (`/login`), Signup (`/signup`), Homepage (`/homepage`), Compare Stocks (`/comparestocks`), Predict Stock (`/predictstock`), Portfolio (`/portfolio`), Leaderboard (`/leaderboard`), and Stock Analysis (`/analysis`).
- **Tailwind CSS 4** with the `@tailwindcss/vite` plugin provides utility-first styling across all components.
- **shadcn/ui** (built on Radix UI primitives) is used for accessible, reusable UI components such as buttons, cards, dialogs, and form elements.
- **Lucide React** provides a consistent icon set throughout the application.
- **Recharts** renders line and area charts for stock prediction visualizations on the Prediction page.
- **Lightweight Charts** (by TradingView) powers interactive OHLCV candlestick charts on the Homepage and Analysis pages.
- **Firebase Authentication** manages user sign-up and login using email/password, with each user identified by a unique Firebase UID.
- A `ProtectedRoute` wrapper component guards authenticated routes, redirecting unauthenticated users to the login page.
- State management is handled at the component level using React's built-in `useState` and `useEffect` hooks—no external state management library is used.
- The **React Compiler** (via Babel plugin) is enabled for automatic performance optimizations such as memoization.
- API calls to the backend are made using the native `fetch` API, with the backend base URL configured via Vite environment variables.
- The `StockSelect` component provides a searchable dropdown for stock symbol selection, fetching matching symbols from the backend search endpoint.
- The `CompareChart` and `CompareTable` components enable side-by-side multi-stock comparisons with tabular and visual data.

### Backend Implementation

- **Node.js** with **Express 5** serves as the REST API server, handling all data and business logic requests.
- **Mongoose 9** is used as the ODM (Object Data Modeling) library for MongoDB, defining schemas and managing database operations.
- **CORS** middleware is enabled to allow cross-origin requests from the React frontend running on a different port.
- **dotenv** loads environment variables (MongoDB connection string, port) from a `.env` file.
- API routes are modularized into separate files under the `Routes/` directory:
  - `stockRoutes.js` — search stocks, compare stocks, and fetch historical OHLCV data.
  - `predictionRoutes.js` — retrieve ARIMA-generated 30-day price forecasts.
  - `Portfolio.js` — full CRUD operations for user portfolio management (add, view, update, delete holdings).
  - `TodayPrice.js` — fetch the latest traded price (LTP) for a given stock symbol.
  - `Leaderboard.js` — rank users by portfolio profit/performance.
- The `Controllers/compareStock.js` controller uses MongoDB aggregation pipelines for stock search (regex-based symbol matching) and multi-stock comparison queries.
- `Historicaldata.js` is a bulk data import script that reads all CSV files from the `combined_csv/` directory using **csv-parser**, transforms and validates each row, and performs MongoDB bulk upsert operations to prevent duplicate records.
- `Dailydata.js` handles incremental daily CSV imports for keeping the database up to date with the latest market data.
- The server entry point (`server.js`) registers all route handlers and starts listening on the configured port (default 5000).
- Error handling is implemented at the route level, returning appropriate HTTP status codes and error messages to the client.

### Database Implementation

- **MongoDB** is used as the primary database, accessed via **Mongoose** ODM from the Node.js backend.
- The database connection is established in `Models/db.js` using the `MONGO_CONN` environment variable, supporting both local MongoDB instances and MongoDB Atlas cloud clusters.
- Three main collections are used:
  - **`nepsestocks`** — stores historical NEPSE stock data with fields for symbol, date, OHLC prices, LTP, volume, turnover, transactions, VWAP, previous close, percentage changes, 120-day and 180-day moving averages, and 52-week high/low values.
  - **`predictedstocks`** — stores ARIMA model output with fields for symbol (unique), last known price, number of forecast days (30), an array of predicted prices, and the generation timestamp.
  - **`userportfolios`** — stores user investment data with fields for Firebase UID (unique), user name, email (unique), an embedded array of stock holdings (each with symbol, quantity, and purchase price), and a creation timestamp.
- A **compound unique index** on `{ symbol: 1, date: 1 }` in the `nepsestocks` collection ensures one record per stock per trading day, preventing duplicate entries during data imports.
- The `predictedstocks` collection uses a **unique index** on `symbol` so each stock has exactly one prediction document that gets overwritten when predictions are regenerated.
- The `userportfolios` collection uses **unique indexes** on both `firebaseUid` and `email` to ensure one portfolio per user.
- The portfolio schema uses an **embedded document pattern** — each user's stock holdings are stored as a sub-document array within the portfolio document, enabling atomic updates to individual holdings.
- Bulk write operations with `upsert: true` are used during CSV data imports to efficiently insert new records or update existing ones without failing on duplicates.

### ARIMA Implementation

- The ARIMA (AutoRegressive Integrated Moving Average) model is implemented in **Python** in the `Backend/ARIMA/Data_extractor.py` script.
- **Key libraries used:** `statsmodels` for the ARIMA model, `pandas` for data manipulation, `numpy` for numerical operations, and `pymongo` for direct MongoDB access.
- The model uses **ARIMA(5, 1, 0)** configuration:
  - **p = 5** — five autoregressive lag terms, meaning the model uses the previous 5 data points to predict the next value.
  - **d = 1** — first-order differencing to make the time series stationary by removing trends.
  - **q = 0** — no moving average terms are used.
- **Data preprocessing steps:**
  1. Historical closing prices for each stock symbol are fetched from the `nepsestocks` MongoDB collection, sorted by date.
  2. A **log transformation** (`numpy.log`) is applied to stabilize variance in the price data.
  3. **First-order differencing** is applied to the log-transformed series to achieve stationarity.
- **Model fitting and forecasting:**
  1. The ARIMA model is fitted on the preprocessed (log-differenced) data with a maximum of 500 iterations for convergence.
  2. A **30-step-ahead forecast** is generated, producing 30 predicted values in log-differenced space.
  3. The predictions are **reversed** back to actual price space by applying cumulative sum (`cumsum`) to undo differencing, then exponential (`exp`) to undo the log transformation.
  4. The last known actual price is used as the base for reconstructing the forecasted price series.
- The script iterates through **all unique stock symbols** in the database, generating individual 30-day forecasts for each.
- Results are stored in the `predictedstocks` MongoDB collection, with each document containing the stock symbol, last known price, forecast horizon (30 days), the array of predicted prices, and a generation timestamp.
- The script connects directly to MongoDB (default: `mongodb://localhost:27017`) using `pymongo`, independent of the Node.js backend.
- This is a **batch process** meant to be run periodically (e.g., daily after market close) to regenerate predictions with the latest available data.

---

## ⚙️ Installation

### Prerequisites
- Node.js v18+
- Python 3.8+
- MongoDB (local or Atlas)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/AmanKarn-00/LaganiLens.git
cd LaganiLens
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file in Backend folder:
```env
MONGO_CONN=mongodb://localhost:27017/laganiLens
PORT=5000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in frontend folder:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Python Dependencies (for ARIMA)

```bash
pip install pymongo pandas numpy statsmodels
```

---

## 📊 Data Setup

> ⚠️ **The Scraper folder is NOT included in this repository. ** You need to set it up separately.

### Option A: Download Pre-scraped Data (Recommended for Quick Start)

1. Visit [ShareSansarScraper Data Archive](https://omitnomis.github.io/ShareSansarScraper/download.html)
2. Download all CSV files (or the ZIP archive)
3. Extract/copy CSV files to `Backend/combined_csv/`

```bash
# Create the folder if it doesn't exist
mkdir -p Backend/combined_csv

# Copy your downloaded CSV files there
cp ~/Downloads/*. csv Backend/combined_csv/
```

### Option B: Clone and Run Scraper Yourself

Since the Scraper is not included in this repo, clone it separately:

```bash
# From the LaganiLens root directory
git clone https://github.com/OmitNomis/ShareSansarScraper.git Scraper

# Navigate to scraper
cd Scraper

# Install Python dependencies
pip install scrapy pandas openpyxl

# Run the scraper (fetches today's NEPSE data)
scrapy crawl market

# Copy the CSV files to Backend
cp docs/Data/*. csv ../Backend/combined_csv/
```

**Run the scraper daily** to get fresh market data, or download the historical archive for bulk data.

### Import Data to MongoDB

After getting CSV files:

```bash
cd Backend
node Historicaldata.js
```

> **Note:** The import script uses `upsert` to handle duplicate records gracefully.  You can run it multiple times without issues.

---

## ▶️ Running the Application

### Start Backend Server

```bash
cd Backend
npm run dev
```

Server runs at: `http://localhost:5000`

### Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs at: `http://localhost:5173`

### Generate ML Predictions

```bash
cd Backend/ARIMA
python Data_extractor. py
```

This processes all stock symbols and generates 30-day ARIMA forecasts.

---

## 🗄️ Database Schema

### Collections

| Collection | Description |
|------------|-------------|
| `nepsestocks` | Historical NEPSE stock data |
| `predictedStocks` | ARIMA model predictions |
| `userportfolios` | User portfolio holdings |

### nepsestocks Schema

```javascript
{
  symbol: String,        // Stock symbol (e.g., "NABIL")
  date: Date,            // Trading date
  open: Number,          // Opening price
  high: Number,          // Day's high
  low: Number,           // Day's low
  close:  Number,         // Closing price
  ltp: Number,           // Last traded price
  volume: Number,        // Trading volume
  turnover: Number,      // Total turnover
  // ... more fields
}
```

**Unique Index:** `{ symbol: 1, date: 1 }` - One record per stock per day. 

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stocks/search?q=` | Search stocks by symbol |
| GET | `/api/stocks/compare?symbols=` | Compare multiple stocks |
| GET | `/api/stocks/price/:symbol` | Get latest price for stock |
| GET | `/api/predictions?symbol=` | Get ARIMA predictions |
| GET | `/api/portfolio` | Get user portfolio |
| POST | `/api/portfolio` | Add stock to portfolio |
| GET | `/api/leaderboard` | Get portfolio rankings |

---

## 🧠 Machine Learning Model

LaganiLens uses **ARIMA (AutoRegressive Integrated Moving Average)** for stock price prediction: 

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Historical     │     │  ARIMA Model    │     │  30-Day         │
│  Close Prices   │ ──► │  (5,1,0)        │ ──► │  Forecast       │
│  from MongoDB   │     │                 │     │  stored in DB   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

**Process:**
1. Fetches historical closing prices from MongoDB
2. Applies log transformation and differencing
3. Fits ARIMA(5,1,0) model
4. Generates 30-day price forecast
5. Stores predictions in `predictedStocks` collection

---

## ⚠️ Limitations

> **Disclaimer:** This is an **academic project** for learning purposes.

- Stock market prediction is inherently uncertain
- NEPSE is an emerging market with high volatility
- Limited historical data availability
- Model does not account for: 
  - Market sentiment
  - Political/economic events
  - Company fundamentals
  - Global market influences

**🚫 Do NOT use these predictions for actual investment decisions.**

---

## 🔮 Future Improvements

- [ ] Add more ML models (LSTM, Prophet)
- [ ] Real-time data scraping
- [ ] Technical indicators (RSI, MACD, Bollinger Bands)
- [ ] News sentiment analysis
- [ ] Mobile app version
- [ ] Email alerts for price movements

---

## 👥 Contributors

| Contributor | GitHub |
|-------------|--------|
| **Aman Karn** | [@AmanKarn-00](https://github.com/AmanKarn-00) |
| **Prajwal** | [@prazzx](https://github.com/prazzx) |
| **Coderag** | [@coderag10](https://github.com/coderag10) |
| **Solta** | [@Solta420](https://github.com/Solta420) |

### Special Thanks

- [OmitNomis](https://github.com/OmitNomis) - Creator of [ShareSansarScraper](https://github.com/OmitNomis/ShareSansarScraper) used for data collection

---

## 📜 License

This project is for educational purposes.  Data is sourced from ShareSansar (unofficial archive).

---

## 🙏 Acknowledgments

- [ShareSansar](https://www.sharesansar.com/) for NEPSE data
- [OmitNomis/ShareSansarScraper](https://github.com/OmitNomis/ShareSansarScraper) for the data scraping tool
- Nepal Stock Exchange (NEPSE)

---

<p align="center">
  Made with ❤️ for Nepal's stock market enthusiasts
</p>