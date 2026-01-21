import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StockSelect from "../Components/StockSelect";
import PredictionChart from "../Components/PredictionChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Brain, TrendingUp, TrendingDown, Calendar, AlertCircle } from "lucide-react";

export default function StockPredictionPage() {
  const [stock, setStock] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const chartData = prediction
    ? prediction.predicted_prices.map((price, index) => ({
        day: index + 1,
        price: price,
      }))
    : [];

  useEffect(() => {
    if (! stock) {
      setPrediction(null);
      setError(null);
      return;
    }

    const fetchPrediction = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/predictions?symbol=${stock}`);
        if (!res.ok) throw new Error(`Failed to fetch prediction: ${res. status}`);
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

  // Calculate trend
  const getTrend = () => {
    if (!prediction || prediction.predicted_prices.length < 2) return null;
    const first = prediction.predicted_prices[0];
    const last = prediction. predicted_prices[prediction.predicted_prices.length - 1];
    const change = ((last - first) / first) * 100;
    return { isUp: change >= 0, change: Math.abs(change).toFixed(2) };
  };

  const trend = getTrend();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4 -ml-2" onClick={() => navigate("/homepage")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">Stock Prediction</h1>
              <p className="text-muted-foreground">
                AI-powered 30-day price forecasts using ARIMA model
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-indigo-500" />
              <Badge variant="secondary">ML Predictions</Badge>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Stock Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Select Stock</CardTitle>
            <CardDescription>Choose a stock to view its 30-day price prediction</CardDescription>
          </CardHeader>
          <CardContent>
            <StockSelect value={stock} onChange={setStock} className="max-w-md" />
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card>
            <CardContent className="py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
                <p className="text-muted-foreground">Loading predictions...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {error && ! loading && (
          <Card className="border-destructive/50">
            <CardContent className="py-6">
              <div className="flex items-center gap-3 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <div>
                  <p className="font-medium">Error loading prediction</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Prediction Results */}
        {prediction && !loading && ! error && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Last Price</p>
                      <p className="text-2xl font-bold">Rs. {prediction.last_price.toFixed(2)}</p>
                    </div>
                    <div className="p-3 rounded-full bg-indigo-500/10">
                      <TrendingUp className="h-5 w-5 text-indigo-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">30-Day Trend</p>
                      <p className={`text-2xl font-bold ${trend?. isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                        {trend?.isUp ? '+' : '-'}{trend?.change}%
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${trend?.isUp ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                      {trend?.isUp ? (
                        <TrendingUp className="h-5 w-5 text-emerald-500" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Forecast Period</p>
                      <p className="text-2xl font-bold">{prediction.forecast_days} Days</p>
                    </div>
                    <div className="p-3 rounded-full bg-amber-500/10">
                      <Calendar className="h-5 w-5 text-amber-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Prediction Chart */}
            <Card>
              <CardHeader>
                <CardTitle>{prediction.symbol} - Price Forecast</CardTitle>
                <CardDescription>
                  Generated at:  {new Date(prediction.generated_at).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PredictionChart data={chartData} lastPrice={prediction.last_price} />
              </CardContent>
            </Card>

            {/* Prediction Table */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Predictions</CardTitle>
                <CardDescription>Forecasted prices for the next 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                    {prediction.predicted_prices.map((price, idx) => {
                      const prevPrice = idx > 0 ? prediction.predicted_prices[idx - 1] : prediction.last_price;
                      const isUp = price >= prevPrice;
                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-lg border text-center ${
                            isUp ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'
                          }`}
                        >
                          <p className="text-xs text-muted-foreground mb-1">Day {idx + 1}</p>
                          <p className={`font-semibold ${isUp ? 'text-emerald-400' :  'text-red-400'}`}>
                            {price.toFixed(0)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {!stock && !loading && !error && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Select a stock to view predictions</p>
                <p className="text-sm mt-1">Choose from the dropdown above to see AI-generated forecasts</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}