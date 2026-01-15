import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Models/db.js";
import { importCSVData } from "./Historicaldata.js";
import stockRoutes from "./Routes/stockRoutes.js";
import predictionRoutes from "./Routes/predictionRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/predictions", predictionRoutes);  // Changed path
app.use("/api/stocks", stockRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("LaganiLens API is running ");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

//Only use this when you have to import data manually
/*importCSVData().then(() => {
  console.log("CSV data imported successfully");
}).catch(err => {
  console.error("Error importing CSV data:", err);
});*/


