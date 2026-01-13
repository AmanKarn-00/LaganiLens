from pymongo import MongoClient
import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA

client = MongoClient("mongodb://localhost:27017")
db = client["laganiLens"]
collection = db["nepsestocks"]

symbol = "NABIL"

cursor = collection.find(
    {"symbol": symbol},
    {"_id": 0, "date": 1, "close": 1}
)

df = pd.DataFrame(list(cursor))




df["date"] = pd.to_datetime(df["date"])
df["close"] = pd.to_numeric(df["close"], errors="coerce")
df = df.dropna()

# sort & index
df = df.sort_values("date")
df.set_index("date", inplace=True)
# if multiple rows exist per date, keep the LAST price of that day
df = df.groupby(df.index).last()

df = df.asfreq("D")            # daily timeline
df["close"] = df["close"].ffill()
df["log"] = np.log(df["close"])
df["diff"] = df["log"].diff()
df = df.dropna()
series = df["diff"]

model = ARIMA(series, order=(5,1,0))
model_fit = model.fit()

# Forecast next 30 days
forecast = model_fit.forecast(steps=30)

# Convert back to prices
last_price = df["close"].iloc[-1]
future_prices = np.exp(forecast.cumsum()) * last_price

print("\nNext 30-day Forecast:")
print(future_prices)