import express from "express";
import {
  searchStock,
  compareStock
} from "../Controllers/compareStock";

const router = express.Router();

router.get("/search", searchStock);
router.get("/compare", compareStock);

export default router;
