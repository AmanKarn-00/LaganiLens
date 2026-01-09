import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Models/db.js";
//import { importCSVData } from "./Historicaldata.js"; //Only use when data is to be imported
//import { removeDuplicates } from "./scripts/removeDuplicate.js"; //Only use when duplicates need to be removed

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("LaganiLens API is running ");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

//Only use this when you have to import data manually
// importCSVData().then(() => {
//   console.log("CSV data imported successfully");
// }).catch(err => {
//   console.error("Error importing CSV data:", err);
// });

//Only use this when you need to remove duplicates from the database
// removeDuplicates().then(() => {
//   console.log("Duplicates removed successfully");
// }).catch(err => {
//   console.error("Error removing duplicates:", err);
// });