import express from "express";
import {
  searchStock,
  compareStock
} from "../Controllers/compareStock";
import NepseStock from "../Models/NEPSEdata.js";

const router = express.Router();

router.get("/search", searchStock);
router.get("/compare", compareStock);

// GET historical OHLC data for charting
// Example: GET /api/stocks/history/NABIL?days=90
router.get("/history/:symbol", async (req, res) => {
  const { symbol } = req.params;
  const days = parseInt(req.query.days) || 365;

  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const data = await NepseStock.find({
      symbol: symbol.toUpperCase(),
      date: { $gte: cutoffDate }
    })
      .sort({ date: 1 })
      .select('date open high low close volume movingAvg120 movingAvg180')
      .lean();

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No historical data found for this stock" });
    }

    const formattedData = data.map(item => ({
      date: item.date,
      time: Math.floor(new Date(item.date).getTime() / 1000),
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.volume,
      ma120: item.movingAvg120,
      ma180: item.movingAvg180
    }));

    res.json({
      symbol: symbol.toUpperCase(),
      data: formattedData
    });
  } catch (err) {
    console.error("Error fetching historical data:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
