// server.js (or whatever your main server file is)
import express from 'express';
import cors from 'cors';
import connectDB from './Models/db.js';

// Import your existing routes
import { importCSVData } from './historical.js';
// import dailyData from './dailydata.js'; // if you have this

// Import NEW routes
import stockRoutes from './routes/stockRoutes.js';
import predictionRoutes from './routes/predictionRoutes.js';

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Your existing routes (keep them)
// app.use('/api/daily', dailyData);

// NEW API routes
app.use('/api/stocks', stockRoutes);
app.use('/api/predictions', predictionRoutes);

// Import CSV endpoint (keep if you need it)
app.post('/api/import-csv', async (req, res) => {
  try {
    await importCSVData();
    res.json({ success: true, message: 'CSV data imported' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});