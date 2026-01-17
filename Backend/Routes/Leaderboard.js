import express from "express";
import UserPortfolio from "../models/Users.js";
import fetch from "node-fetch"; // or axios

const router = express.Router();

// Replace with your API or database that gives latest stock prices
const getTodayPrice = async (symbol) => {
  try {
    const res = await fetch(`http://localhost:5000/api/stocks/price/${symbol}`);
    const data = await res.json();
    return data.price; // assuming backend returns { price: 500 }
  } catch (err) {
    console.error("Error fetching price for", symbol, err);
    return 0; // fallback to 0 if error
  }
};

router.get("/", async (req, res) => {
  try {
    const users = await UserPortfolio.find({}); // all users

    const leaderboard = await Promise.all(
      users.map(async (user) => {
        let netProfit = 0;

        for (let stock of user.stocks || []) {
          const todayPrice = await getTodayPrice(stock.symbol);
          netProfit += stock.quantity * (todayPrice - stock.purchasePrice);
        }

        return {
          firebaseUid: user.firebaseUid,
          name: user.name,
          email: user.email,
          netProfit,
        };
      })
    );

    // Sort descending by netProfit
    leaderboard.sort((a, b) => b.netProfit - a.netProfit);

    res.json({ leaderboard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
