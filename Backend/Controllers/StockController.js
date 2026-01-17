import HistoricalData from "../Historicaldata.js"; // Your Live Data Model
import NepseStock from "../Models/NEPSEdata.js";   // Your 2-Year Archive Model

// ✅ 1. Get List of All Available Stocks (For Dropdown)
export const getAllStocks = async (req, res) => {
  try {
    // Fetch unique symbols from both Archives and Live data to ensure we don't miss new IPOs
    const archiveSymbols = await NepseStock.distinct("symbol");
    const liveSymbols = await HistoricalData.distinct("symbol");

    // Merge them into a single unique list and sort alphabetically
    const uniqueSymbols = [...new Set([...archiveSymbols, ...liveSymbols])].sort();

    res.status(200).json(uniqueSymbols);
  } catch (error) {
    console.error("Error fetching stock list:", error);
    res.status(500).json({ message: "Failed to fetch stock list" });
  }
};

// ✅ 2. Get FULL unified history (Archive + Live)
export const getStockHistory = async (req, res) => {
  const { symbol } = req.params;
  const upperSymbol = symbol.toUpperCase();

  try {
    // Run both queries in parallel for speed
    const [archiveData, liveData] = await Promise.all([
      NepseStock.find({ symbol: upperSymbol }).lean(),    // 2 Years Data
      HistoricalData.find({ symbol: upperSymbol }).lean() // Daily Scraped Data
    ]);

    if ((!archiveData || archiveData.length === 0) && (!liveData || liveData.length === 0)) {
      return res.status(404).json({ message: "No data found for this stock" });
    }

    // MERGE STRATEGY: Use a Map to deduplicate by Date
    const dataMap = new Map();

    // A. Load Archive Data first
    archiveData.forEach((item) => {
      const dateKey = new Date(item.date).toDateString();
      dataMap.set(dateKey, {
        date: item.date,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        volume: item.volume
      });
    });

    // B. Load Live Data second (Overwrites Archive if date overlaps)
    liveData.forEach((item) => {
      const dateKey = new Date(item.date).toDateString();
      dataMap.set(dateKey, {
        date: item.date,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        volume: item.volume
      });
    });

    // C. Sort by Date (Oldest -> Newest)
    const unifiedData = Array.from(dataMap.values()).sort((a, b) => new Date(a.date) - new Date(b.date));

    res.status(200).json(unifiedData);

  } catch (error) {
    console.error(`Error fetching merged history for ${symbol}:`, error);
    res.status(500).json({ message: "Failed to fetch historical data" });
  }
};