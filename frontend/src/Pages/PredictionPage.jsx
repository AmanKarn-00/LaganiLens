import { useState, useEffect } from "react";
import StockSelect from "../components/StockSelect";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";


export default function StockPredictionPage() {
  const [stock, setStock] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chartData = prediction
    ? prediction.predicted_prices.map((price, index) => ({
      day: index + 1,
      price: price,
    }))
    : [];


  useEffect(() => {
    if (!stock) {
      setPrediction(null);
      setError(null);
      return;
    }

    const fetchPrediction = async () => {
      setLoading(true);
      setError(null);

      try {

        const res = await fetch(`http://localhost:5000/api/predictions?symbol=${stock}`);
        if (!res.ok) throw new Error(`Failed to fetch prediction: ${res.status}`);
        const data = await res.json();


        setPrediction(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setPrediction(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [stock]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Stock Prediction</h1>

      <StockSelect
        label="Select a Stock"
        value={stock}
        onChange={setStock}
      />

      {loading && (
        <div className="mt-4 p-4 text-center text-gray-600">
          Loading predictions...
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}

      {prediction && (
        <Card className="mt-6 p-4">
          <h2 className="text-xl font-medium mb-2">{prediction.symbol} Prediction</h2>
          {/* Prediction Graph */}
          <div className="mt-6 h-[320px]">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />

        {/* Last Price Reference */}
        <ReferenceLine
          y={prediction.last_price}
          stroke="#ef4444"  
          strokeDasharray="4 4"
          label="Last Price"
        />

        <Tooltip
          formatter={(value) => `Rs. ${value.toFixed(2)}`}
          labelFormatter={(label) => `Day ${label}`}
        />

        <Line
          type="monotone"
          dataKey="price"
          stroke="#2563eb"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>

          <p className="text-sm text-gray-500 mb-4">
            Last price: <strong>{prediction.last_price.toFixed(2)}</strong> | Forecast generated at: {new Date(prediction.generated_at).toLocaleString()}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-3 py-2 text-left">Day</th>
                  <th className="border border-gray-200 px-3 py-2 text-left">Predicted Price</th>
                </tr>
              </thead>
              <tbody>
                {prediction.predicted_prices.map((price, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-3 py-2">{idx + 1}</td>
                    <td className="border border-gray-200 px-3 py-2">{price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
