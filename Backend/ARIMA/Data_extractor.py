from pymongo import MongoClient
import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
from datetime import datetime

# MongoDB connection
client = MongoClient("mongodb://localhost:27017")
db = client["laganiLens"]
collection = db["nepsestocks"]
pred_collection = db["predictedStocks"]

# Clear existing predictions
pred_collection.delete_many({})  # <-- removes all documents

# Get all unique stock symbols
symbols = collection.distinct("symbol")

# Number of days to forecast
forecast_days = 30

for symbol in symbols:
    print(f"Processing {symbol}...")
    cursor = collection.find(
        {"symbol": symbol},
        {"_id": 0, "date": 1, "close": 1}
    )
    
    df = pd.DataFrame(list(cursor))
    if df.empty:
        print(f"No data for {symbol}, skipping.")
        continue

    # Prepare the data
    df["date"] = pd.to_datetime(df["date"])
    df["close"] = pd.to_numeric(df["close"], errors="coerce")
    df = df.dropna()
    df = df.sort_values("date")
    df.set_index("date", inplace=True)
    df = df.groupby(df.index).last()  # last price per day
    df = df.asfreq("D")              # daily timeline
    df["close"] = df["close"].ffill()
    df["log"] = np.log(df["close"])
    df["diff"] = df["log"].diff()
    df = df.dropna()
    
    series = df["diff"]

    # Fit ARIMA model
    try:
        model = ARIMA(series, order=(5,1,0))
        model_fit = model.fit()
    except Exception as e:
        print(f"ARIMA failed for {symbol}: {e}")
        continue

    # Forecast
    forecast = model_fit.forecast(steps=forecast_days)
    last_price = df["close"].iloc[-1]
    future_prices = np.exp(forecast.cumsum()) * last_price

    # Prepare document for MongoDB
    doc = {
        "symbol": symbol,
        "last_price": float(last_price),
        "forecast_days": forecast_days,
        "predicted_prices": [float(p) for p in future_prices],
        "generated_at": datetime.utcnow()
    }

    # Insert new document
    pred_collection.insert_one(doc)

print("All predictions stored successfully.")
