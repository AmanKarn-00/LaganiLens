import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  quantity: { type: Number, required: true },
  purchasePrice: { type: Number, required: true },
});

const userPortfolioSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  stocks: [stockSchema],
  createdAt: { type: Date, default: Date.now },
});

// ✅ Check if model already exists before creating it
const UserPortfolio = mongoose.models.UserPortfolio || mongoose.model("UserPortfolio", userPortfolioSchema);

export default UserPortfolio;
