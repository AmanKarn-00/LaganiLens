import mongoose from "mongoose";

const nepseSchema = new mongoose.Schema({
  symbol: { type: String, required: true, index: true },
  conf: { type: String },
  open: { type: Number },
  high: { type: Number },
  low: { type: Number },
  close: { type: Number },
  ltp: { type: Number },
  closeLTPDiff: { type: Number },      // Close - LTP
  closeLTPDiffPercent: { type: Number }, // Close - LTP %
  vwap: { type: Number },
  volume: { type: Number },
  prevClose: { type: Number },
  turnover: { type: Number },
  transactions: { type: Number },
  diff: { type: Number },
  range: { type: Number },
  diffPercent: { type: Number },
  rangePercent: { type: Number },
  vwapPercent: { type: Number },
  movingAvg120: { type: Number },
  movingAvg180: { type: Number },
  high52Weeks: { type: Number },
  low52Weeks: { type: Number },
  date: { type: Date },
}, { timestamps: true });

nepseSchema.index({ symbol: 1, date: 1 }, { unique: true });

export default mongoose.model("NepseStock", nepseSchema);
