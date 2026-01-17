import express from "express";
import UserPortfolio from "../models/Users.js";

const router = express.Router();

// GET portfolio for a user
router.get("/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await UserPortfolio.findOne({ firebaseUid: uid });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Map stocks to include calculated fields
    const stocksWithCalc = (user.stocks || []).map(stock => {
      const totalInvested = stock.quantity * stock.purchasePrice;
      const avgPurchasePrice = totalInvested / stock.quantity;
      return { ...stock.toObject(), totalInvested, avgPurchasePrice };
    });

    res.json({ stocks: stocksWithCalc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// POST add a new stock
router.post("/:uid/stock", async (req, res) => {
  try {
    const { uid } = req.params;
    const { symbol, quantity, purchasePrice, avgPurchasePrice, totalInvested, addedAt } = req.body;

    const user = await UserPortfolio.findOne({ firebaseUid: uid });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.stocks.push({ symbol, quantity, purchasePrice, avgPurchasePrice, totalInvested, addedAt });
    await user.save();

    res.status(201).json({ message: "Stock added successfully", stocks: user.stocks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update existing stock
router.put("/:uid/stock/:symbol", async (req, res) => {
  try {
    const { uid, symbol } = req.params;
    const updatedData = req.body;

    const user = await UserPortfolio.findOne({ firebaseUid: uid });
    if (!user) return res.status(404).json({ message: "User not found" });

    const stockIndex = user.stocks.findIndex(s => s.symbol === symbol);
    if (stockIndex === -1) return res.status(404).json({ message: "Stock not found" });

    user.stocks[stockIndex] = updatedData;
    await user.save();

    res.json({ message: "Stock updated successfully", stock: user.stocks[stockIndex] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a stock
router.delete("/:uid/stock/:symbol", async (req, res) => {
  try {
    const { uid, symbol } = req.params;

    const user = await UserPortfolio.findOne({ firebaseUid: uid });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.stocks = user.stocks.filter(s => s.symbol !== symbol);
    await user.save();

    res.json({ message: "Stock removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
