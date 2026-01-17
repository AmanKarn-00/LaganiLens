import fs from "fs";
import path from "path";
import csv from "csv-parser";
import NepseStock from "./Historicaldata.js"; // Ensures we use the correct Model

function cleanNumber(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") {
    value = value.replace(/,/g, "").trim();
    if (value === "-" || value === "") return null;
  }
  return Number(value);
}

export const importCSVData = async (folderPath) => {
  // 1. Determine the correct folder path
  // If no path is provided, look for "combined_csv" one level up (project root)
  const targetFolder = folderPath || path.join(process.cwd(), "../combined_csv");

  console.log(`Looking for CSV files in: ${targetFolder}`);

  // 2. Check if folder exists
  if (!fs.existsSync(targetFolder)) {
    throw new Error(`Folder not found: ${targetFolder} \nMake sure your 'combined_csv' folder is in the project root.`);
  }

  // 3. Get all CSV files
  const files = fs.readdirSync(targetFolder).filter(f => path.extname(f) === ".csv");

  if (files.length === 0) {
    console.warn("No CSV files found in the folder.");
    return;
  }

  // 4. Process each file
  for (const file of files) {
    const results = [];
    
    // Extract date from filename (e.g., "2024_01_01.csv" -> Date Object)
    const filename = path.basename(file, ".csv");
    const normalizedDate = filename.replace(/_/g, "-");
    const [year, month, day] = normalizedDate.split("-");
    const fileDate = new Date(Date.UTC(year, month - 1, day));

    if (isNaN(fileDate)) {
      console.warn(`Skipping ${file}: invalid date format in filename`);
      continue;
    }

    // Read CSV file
    await new Promise((resolve, reject) => {
      fs.createReadStream(path.join(targetFolder, file))
        .pipe(csv())
        .on("data", row => {
          results.push({
            symbol: row["Symbol"],
            date: fileDate,
            open: cleanNumber(row["Open"]),
            high: cleanNumber(row["High"]),
            low: cleanNumber(row["Low"]),
            close: cleanNumber(row["Close"]),
            volume: cleanNumber(row["Vol"]),
            ltp: cleanNumber(row["LTP"]),
            closeLTPDiff: cleanNumber(row["Close - LTP"]),
            closeLTPDiffPercent: cleanNumber(row["Close - LTP %"]),
            vwap: cleanNumber(row["VWAP"]),
            prevClose: cleanNumber(row["Prev. Close"]),
            turnover: cleanNumber(row["Turnover"]),
            transactions: cleanNumber(row["Trans."]),
            diff: cleanNumber(row["Diff"]),
            range: cleanNumber(row["Range"]),
            diffPercent: cleanNumber(row["Diff %"]),
            rangePercent: cleanNumber(row["Range %"]),
            vwapPercent: cleanNumber(row["VWAP %"]),
            movingAvg120: cleanNumber(row["120 Days"]),
            movingAvg180: cleanNumber(row["180 Days"]),
            high52Weeks: cleanNumber(row["52 Weeks High"]),
            low52Weeks: cleanNumber(row["52 Weeks Low"])
          });
        })
        .on("end", async () => {
          try {
            // Bulk insert data, ignoring duplicates (ordered: false)
            if (results.length > 0) {
              await NepseStock.insertMany(results, { ordered: false });
              console.log(`Inserted ${results.length} rows from ${file}`);
            }
            resolve();
          } catch (err) {
            // Ignore duplicate error (code 11000), but report others
            if (err.code === 11000) {
               console.log(`Skipped duplicates in ${file}`);
               resolve(); 
            } else {
               reject(err);
            }
          }
        })
        .on("error", reject);
    });
  }
  console.log("✅ All CSV files processed.");
};