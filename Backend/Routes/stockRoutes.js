import express from "express";

// FIX 1: Add .js extension here (Required for "type": "module")
import {
  searchStock,
  compareStock
} from "../Controllers/compareStock.js"; 

// FIX 2: Change filename to match what you created (stockAnalysisController.js)
import {
  getAllStocks,
  getStockHistory
} from "../Controllers/StockController.js"; 

const router = express.Router();

router.get("/search", searchStock);
router.get("/compare", compareStock);
router.get("/list", getAllStocks);
router.get("/:symbol/history", getStockHistory);

export default router;