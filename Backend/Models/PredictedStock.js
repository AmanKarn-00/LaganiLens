// File: Models/PredictedStock.js
import mongoose from "mongoose";

const predictedStockSchema = new mongoose.Schema({
  symbol: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  last_price: { 
    type: Number, 
    required: true 
  },
  forecast_days: { 
    type: Number, 
    required: true 
  },
  predicted_prices: { 
    type: [Number],  // Array of numbers
    required: true 
  },
  generated_at: { 
    type: Date, 
    default: Date.now 
  }
}, {
  collection: "predictedStocks" // explicitly set collection name
});

// Export the model
export default mongoose.model("PredictedStock", predictedStockSchema);
