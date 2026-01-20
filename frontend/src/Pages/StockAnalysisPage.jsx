import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StockSelect from '../Components/StockSelect';
import CandlestickChart from '../Components/CandlestickChart';
import WormChart from '../Components/WormChart';
import VolumeChart from '../Components/VolumeChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CandlestickChart as CandlestickIcon, TrendingUp, BarChart3, AlertCircle } from 'lucide-react';

export default function StockAnalysisPage() {
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedDays, setSelectedDays] = useState(365);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const timeRanges = [
    { label: '30D', days: 30 },
    { label: '90D', days:  90 },
    { label: '180D', days: 180 },
    { label:  '1Y', days: 365 },
    { label: '2Y', days: 730 },
  ];

  const fetchStockData = async (symbol, days) => {
    if (! symbol) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/stocks/history/${symbol}?days=${days}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response. status}`);
      }

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
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4 -ml-2" onClick={() => navigate("/homepage")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">Stock Analysis</h1>
              <p className="text-muted-foreground">
                Professional charts with technical indicators for NEPSE stocks
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CandlestickIcon className="h-5 w-5 text-emerald-500" />
              <Badge variant="secondary">Technical Analysis</Badge>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Stock Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Select Stock</CardTitle>
            <CardDescription>Choose a stock symbol to view its historical data and charts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <StockSelect
              value={selectedStock}
              onChange={handleStockChange}
              className="max-w-md"
            />
            
            {/* Time Range Selector */}
            {selectedStock && (
              <div className="flex gap-2 flex-wrap pt-2">
                {timeRanges.map((range) => (
                  <Button
                    key={range.days}
                    variant={selectedDays === range.days ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleTimeRangeChange(range.days)}
                    disabled={loading}
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card>
            <CardContent className="py-12">
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                <p className="text-muted-foreground">Loading chart data...</p>
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
                  <p className="font-medium">Error Loading Data</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Charts */}
        {chartData && ! loading && !error && (
          <div className="space-y-6">
            {/* Candlestick Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10">
                    <CandlestickIcon className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <CardTitle>{selectedStock} - Candlestick Chart</CardTitle>
                    <CardDescription>OHLC data with volume and moving averages (MA 120 & MA 180)</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CandlestickChart data={chartData} />
              </CardContent>
            </Card>

            {/* Price Trend Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10">
                    <TrendingUp className="h-5 w-5 text-cyan-500" />
                  </div>
                  <div>
                    <CardTitle>Price Trend</CardTitle>
                    <CardDescription>Closing price movement over time</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <WormChart data={chartData} />
              </CardContent>
            </Card>

            {/* Volume Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10">
                    <BarChart3 className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div>
                    <CardTitle>Trading Volume</CardTitle>
                    <CardDescription>Daily trading volume with bullish/bearish color coding</CardDescription>
                  </div>
                </div>
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
                <CandlestickIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No Stock Selected</p>
                <p className="text-sm mt-1">Select a stock symbol above to view its technical analysis</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}