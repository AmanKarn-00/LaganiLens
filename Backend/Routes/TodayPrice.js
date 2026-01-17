import express from "express";
import NepseStock from "../models/NEPSEdata.js";

const router = express.Router();

// GET today's price for a given stock symbol
// Example: GET /api/stocks/price/ADBL
router.get("/:symbol", async (req, res) => {
  const { symbol } = req.params;

  try {
    // Find the latest stock document for the symbol
    const stock = await NepseStock.findOne({ symbol })
      .sort({ date: -1 }) // latest date first
      .lean();

    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    // Return today's price (using LTP)
    res.json({
      symbol: stock.symbol,
      date: stock.date,
      price: stock.ltp,
      close: stock.close,
      high: stock.high,
      low: stock.low,
    });
  } catch (err) {
    console.error("Error fetching stock price:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
