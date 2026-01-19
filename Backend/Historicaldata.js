import fs from "fs";
import path from "path";
import csv from "csv-parser";

import connectDB from "./Models/db.js";
import NepseStock from "./Models/NEPSEdata.js";

function cleanNumber(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "string") {
    value = value.replace(/,/g, "").trim();
    if (value === "-" || value === "") return null;
  }
  return Number(value);
}

export const importCSVData = async (folderPath = "./combined_csv") => {
  await connectDB();

  const files = fs
    .readdirSync(folderPath)
    .filter(f => path.extname(f) === ".csv");

  console.log(`Found ${files.length} CSV files to import`);

  let totalInserted = 0;
  let totalModified = 0;

  for (const file of files) {
    const operations = [];

    const filename = path.basename(file, ". csv");
    const normalizedDate = filename.replace(/_/g, "-");

    const [year, month, day] = normalizedDate.split("-");
    const fileDate = new Date(Date.UTC(year, month - 1, day));

    if (isNaN(fileDate)) {
      console.warn(`Skipping ${file}:  invalid date format`);
      continue;
    }

    await new Promise((resolve, reject) => {
      fs.createReadStream(path.join(folderPath, file))
        .pipe(csv())
        .on("data", row => {
          operations.push({
            updateOne: {
              filter: {
                symbol: row["Symbol"],
                date: fileDate
              },
              update: {
                $set: {
                  symbol: row["Symbol"],
                  conf: row["Conf. "],
                  open: cleanNumber(row["Open"]),
                  high: cleanNumber(row["High"]),
                  low: cleanNumber(row["Low"]),
                  close: cleanNumber(row["Close"]),
                  ltp: cleanNumber(row["LTP"]),
                  closeLTPDiff: cleanNumber(row["Close - LTP"]),
                  closeLTPDiffPercent: cleanNumber(row["Close - LTP %"]),
                  vwap: cleanNumber(row["VWAP"]),
                  volume: cleanNumber(row["Vol"]),
                  prevClose: cleanNumber(row["Prev.  Close"]),
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
                  low52Weeks: cleanNumber(row["52 Weeks Low"]),
                  date: fileDate
                }
              },
              upsert: true  // This is the key - insert if not exists, update if exists
            }
          });
        })
        .on("end", resolve)
        .on("error", reject);
    });

    if (operations.length > 0) {
      const result = await NepseStock. bulkWrite(operations);
      totalInserted += result.upsertedCount;
      totalModified += result.modifiedCount;
      console.log(`Processed ${file}: ${result.upsertedCount} inserted, ${result.modifiedCount} updated`);
    }
  }

  console.log(`\n✅ Import complete! `);
  console.log(`Total inserted: ${totalInserted}`);
  console.log(`Total modified: ${totalModified}`);
};