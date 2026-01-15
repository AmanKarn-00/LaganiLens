import express from "express";
import PredictedStock from "../Models/PredictedStock.js"; 
const router = express.Router();

router.get("/", async (req, res) => {
  const { symbol } = req.query;

  if (!symbol) {
    return res.status(400).json({ message: "Symbol query parameter is required" });
  }

  try {
    const prediction = await PredictedStock.findOne({ symbol });

    if (!prediction) {
      return res.status(404).json({ message: `No prediction found for symbol: ${symbol}` });
    }

    // Send back only relevant fields
    res.json({
      symbol: prediction.symbol,
      last_price: prediction.last_price,
      forecast_days: prediction.forecast_days,
      predicted_prices: prediction.predicted_prices,
      generated_at: prediction.generated_at
    });
  } catch (err) {
    console.error("Error fetching prediction:", err);
    res.status(500).json({ message: "Server error while fetching prediction" });
  }
});

export default router;
