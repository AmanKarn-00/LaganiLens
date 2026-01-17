import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Models/db.js";
import { importCSVData } from "./Historicaldata.js";
import stockRoutes from "./Routes/stockRoutes.js";
import predictionRoutes from "./Routes/predictionRoutes.js";
import usersRoute from "./Routes/userRoute.js"
import portfolioRoute from "./Routes/Portfolio.js"
import todayprice from "./Routes/TodayPrice.js"
import Leaderboard from "./Routes/Leaderboard.js"

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/predictions", predictionRoutes);  // Changed path
app.use("/api/stocks", stockRoutes);
app.use("/api/users", usersRoute);
app.use("/api/portfolio", portfolioRoute);
app.use("/api/stocks/price", todayprice);
app.use("/api/leaderboard",Leaderboard)

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


