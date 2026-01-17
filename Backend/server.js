import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Models/db.js";

import stockRoutes from "./Routes/stockRoutes.js";
import predictionRoutes from "./Routes/predictionRoutes.js";

// Optional: Import this only if you plan to run the manual import below
// import { importCSVData } from "./seeder.js"; // <--- CHANGE "seeder.js" to your actual filename

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/predictions", predictionRoutes);
app.use("/api/stocks", stockRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("LaganiLens API is running ");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

/* MANUAL DATA IMPORT SECTION
   --------------------------
   Only uncomment the lines below (and the import at the top) 
   if you need to re-upload your CSV data.
*/

// importCSVData().then(() => {
//   console.log("CSV data imported successfully");
// }).catch(err => {
//   console.error("Error importing CSV data:", err);
// });