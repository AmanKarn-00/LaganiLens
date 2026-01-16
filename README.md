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