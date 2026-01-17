import mongoose from "mongoose";

const historicalDataSchema = new mongoose.Schema({
  symbol: { type: String, required: true, index: true },
  date: { type: Date, required: true, index: true },
  
  // Basic Price Data
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  volume: Number,
  
  // Advanced Data (Added based on your importer)
  conf: String,                 // "Conf." field (not cleaned in your code, so String)
  ltp: Number,                  // Last Traded Price
  closeLTPDiff: Number,         // "Close - LTP"
  closeLTPDiffPercent: Number,  // "Close - LTP %"
  vwap: Number,                 // Volume Weighted Average Price
  prevClose: Number,            // "Prev. Close"
  turnover: Number,             // "Turnover"
  transactions: Number,         // "Trans."
  
  // Statistics & Moving Averages
  diff: Number,
  range: Number,
  diffPercent: Number,          // "Diff %"
  rangePercent: Number,         // "Range %"
  vwapPercent: Number,          // "VWAP %"
  movingAvg120: Number,         // "120 Days"
  movingAvg180: Number,         // "180 Days"
  high52Weeks: Number,          // "52 Weeks High"
  low52Weeks: Number            // "52 Weeks Low"
});

// Create a compound index to ensure one record per symbol per date
// This prevents duplicate entries if you run the importer twice
historicalDataSchema.index({ symbol: 1, date: 1 }, { unique: true });

const HistoricalData = mongoose.models.HistoricalData || mongoose.model("HistoricalData", historicalDataSchema);

export default HistoricalData;