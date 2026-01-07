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

export function csvFilePath(baseFolder = "./Scraper/docs/Data") {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const fileName = `${year}_${month}_${day}.csv`;

  return path.join(baseFolder, fileName);
}

const importSingleCSV = async (csvFilePath) => {
  if (!csvFilePath) {
    throw new Error("CSV file path is required");
  }

  await connectDB();

  const filename = path.basename(csvFilePath, ".csv");
  const normalizedDate = filename.replace(/_/g, "-");

  const [year, month, day] = normalizedDate.split("-");
  const fileDate = new Date(Date.UTC(year, month - 1, day));

  if (isNaN(fileDate)) {
    throw new Error("Invalid date format in CSV filename");
  }

  const operations = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
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
                conf: row["Conf."],
                open: cleanNumber(row["Open"]),
                high: cleanNumber(row["High"]),
                low: cleanNumber(row["Low"]),
                close: cleanNumber(row["Close"]),
                ltp: cleanNumber(row["LTP"]),
                closeLTPDiff: cleanNumber(row["Close - LTP"]),
                closeLTPDiffPercent: cleanNumber(row["Close - LTP %"]),
                vwap: cleanNumber(row["VWAP"]),
                volume: cleanNumber(row["Vol"]),
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
                low52Weeks: cleanNumber(row["52 Weeks Low"]),
                date: fileDate
              }
            },
            upsert: true
          }
        });
      })
      .on("end", resolve)
      .on("error", reject);
  });

  if (operations.length === 0) {
    console.log("No rows found in CSV");
    return;
  }

  const result = await NepseStock.bulkWrite(operations);

  console.log("CSV import completed:", {
    inserted: result.upsertedCount,
    modified: result.modifiedCount
  });
};
