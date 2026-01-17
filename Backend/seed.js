import mongoose from "mongoose";
import dotenv from "dotenv";
import { importCSVData } from "./importer.js";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Try loading .env from the backend folder
dotenv.config({ path: path.join(__dirname, ".env") });

// 2. If MONGO_URI is still not found, try the root folder (one level up)
if (!process.env.MONGO_URI) {
  console.log("⚠️ .env not found in backend. Checking root folder...");
  dotenv.config({ path: path.join(__dirname, "../.env") });
}

const runSeed = async () => {
  try {
    const uri = process.env.MONGO_CONN;

    // 3. Final Check
    if (!uri) {
      throw new Error("❌ CRITICAL ERROR: 'MONGO_URI' is not defined. \n   - Check your .env file.\n   - Ensure it contains: MONGO_URI=your_connection_string");
    }

    console.log("Connecting to DB...");
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");

    console.log("Starting CSV Import...");
    
    // Adjust this path if your 'combined_csv' folder is somewhere else
    // Use "../combined_csv" if it is in the project root
    await importCSVData("./combined_csv"); 

    console.log("✅ Database Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error(error.message || error);
    process.exit(1);
  }
};

runSeed();