import { useEffect, useState, useCallback } from "react";
import StockSelect from "../components/StockSelect";
import CompareTable from "../components/CompareTable";

export default function CompareStocksPage() {
  const [stockA, setStockA] = useState(null);
  const [stockB, setStockB] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 useEffect(() => {
  if (!stockA || !stockB || stockA === stockB) {
    setData([]);
    setError(null);
    return;
  }

  const controller = new AbortController();

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `http://localhost:5000/api/stocks/compare?symbols=${stockA},${stockB}`,
        { signal: controller.signal }
      );

      if (!res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to fetch stock data");
        } else {
          throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }
      }

      const json = await res.json();

      if (!json.stocks || !Array.isArray(json.stocks) || json.stocks.length !== 2) {
        throw new Error("Invalid response format from server");
      }

      setData(json.stocks);
      setError(null);
    } catch (err) {
      if (err.name === "AbortError") return;
      console.error("Fetch failed:", err);
      setError(err.message || "Failed to load comparison data");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  fetchData();

  // ✅ Synchronous cleanup function
  return () => {
    controller.abort();
  };
}, [stockA, stockB]);


  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Compare Stocks</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <StockSelect
          label="Stock A"
          value={stockA}
          onChange={setStockA}
          exclude={stockB}
        />
        <StockSelect
          label="Stock B"
          value={stockB}
          onChange={setStockB}
          exclude={stockA}
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center p-8">
          <div className="text-sm opacity-70">Loading comparison...</div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-medium">Error loading comparison</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      )}

      {!loading && !error && stockA && stockB && stockA !== stockB && data.length === 0 && (
        <div className="text-center p-8 text-gray-500">
          No comparison data available for the selected stocks.
        </div>
      )}

      {!loading && data.length === 2 && <CompareTable stocks={data} />}
      
      {stockA && stockB && stockA === stockB && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded">
          Please select two different stocks to compare.
        </div>
      )}
    </div>
  );
}