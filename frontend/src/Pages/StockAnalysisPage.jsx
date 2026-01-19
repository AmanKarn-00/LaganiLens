import { useState } from 'react';
import StockSelect from '../Components/StockSelect';
import CandlestickChart from '../Components/CandlestickChart';
import WormChart from '../Components/WormChart';
import VolumeChart from '../Components/VolumeChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function StockAnalysisPage() {
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedDays, setSelectedDays] = useState(365);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const timeRanges = [
    { label: '30D', days: 30 },
    { label: '90D', days: 90 },
    { label: '180D', days: 180 },
    { label: '1Y', days: 365 },
    { label: '2Y', days: 730 },
  ];

  const fetchStockData = async (symbol, days) => {
    if (!symbol) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/stocks/history/${symbol}?days=${days}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      // API response format: { symbol: string, data: array }
      const result = await response.json();
      
      if (result.data && result.data.length > 0) {
        setChartData(result.data);
      } else {
        setError('No historical data available for this stock');
        setChartData(null);
      }
    } catch (err) {
      console.error('Error fetching stock data:', err);
      setError(err.message || 'Failed to fetch stock data');
      setChartData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleStockChange = (symbol) => {
    setSelectedStock(symbol);
    if (symbol) {
      fetchStockData(symbol, selectedDays);
    } else {
      setChartData(null);
      setError(null);
    }
  };

  const handleTimeRangeChange = (days) => {
    setSelectedDays(days);
    if (selectedStock) {
      fetchStockData(selectedStock, days);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Stock Analysis</h1>
        <p className="text-muted-foreground">
          Analyze NEPSE stock trends with professional candlestick charts and technical indicators
        </p>
      </div>

      {/* Stock Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Stock</CardTitle>
          <CardDescription>Choose a stock symbol to view its historical data</CardDescription>
        </CardHeader>
        <CardContent>
          <StockSelect
            value={selectedStock}
            onChange={handleStockChange}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      {/* Time Range Selector */}
      {selectedStock && (
        <div className="flex gap-2 flex-wrap">
          {timeRanges.map((range) => (
            <Button
              key={range.days}
              variant={selectedDays === range.days ? 'default' : 'outline'}
              onClick={() => handleTimeRangeChange(range.days)}
              disabled={loading}
            >
              {range.label}
            </Button>
          ))}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-muted-foreground">Loading chart data...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && !loading && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center text-destructive">
              <p className="font-semibold">Error Loading Data</p>
              <p className="text-sm mt-2">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts */}
      {chartData && !loading && !error && (
        <div className="space-y-6">
          {/* Candlestick Chart with Volume */}
          <Card>
            <CardHeader>
              <CardTitle>Candlestick Chart</CardTitle>
              <CardDescription>
                OHLC data with volume and moving averages (120 & 180 day)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CandlestickChart data={chartData} />
            </CardContent>
          </Card>

          {/* Worm/Area Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Price Trend</CardTitle>
              <CardDescription>Closing price trend over time</CardDescription>
            </CardHeader>
            <CardContent>
              <WormChart data={chartData} />
            </CardContent>
          </Card>

          {/* Volume Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Trading Volume</CardTitle>
              <CardDescription>Daily trading volume with color-coded bars</CardDescription>
            </CardHeader>
            <CardContent>
              <VolumeChart data={chartData} />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Empty State */}
      {!selectedStock && !loading && !error && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center text-muted-foreground">
              <p className="text-lg font-semibold">No Stock Selected</p>
              <p className="text-sm mt-2">Select a stock symbol above to view its analysis</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
