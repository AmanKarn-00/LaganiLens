import express from "express";
import {
  searchStock,
  compareStock,
  getStockHistory
} from "../Controllers/compareStock";

const router = express.Router();

router.get("/search", searchStock);
router.get("/compare", compareStock);
router.get("/history/:symbol", getStockHistory);

export default router;
