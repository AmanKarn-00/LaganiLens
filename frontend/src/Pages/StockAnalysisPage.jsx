import { useState, useEffect } from "react";
import StockSelect from "../Components/StockSelect";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Bar,
  BarChart,
  Legend,
} from "recharts";
import { BarChart3, TrendingUp, TrendingDown, Activity } from "lucide-react";

const TIME_RANGES = [
  { label: "30D", days: 30 },
  { label: "90D", days: 90 },
  { label: "180D", days: 180 },
  { label: "1Y", days: 365 },
  { label: "2Y", days: 730 },
];

export default function StockAnalysisPage() {
  const [stock, setStock] = useState(null);
  const [days, setDays] = useState(90);
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!stock) {
      setHistoryData(null);
      setError(null);
      return;
    }

    const fetchHistory = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `http://localhost:5000/api/stocks/history/${stock}?days=${days}`
        );
        if (!res.ok) throw new Error(`Failed to fetch history: ${res.status}`);
        const data = await res.json();
        setHistoryData(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setHistoryData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [stock, days]);

  // Format data for charts
  const chartData = historyData?.data?.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    close: item.close,
    open: item.open,
    high: item.high,
    low: item.low,
    volume: item.volume,
    ma120: item.ma120,
    ma180: item.ma180,
  })) || [];

  // Calculate summary stats
  const getStats = () => {
    if (!chartData.length) return null;
    
    const prices = chartData.map(d => d.close).filter(Boolean);
    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];
    const change = lastPrice - firstPrice;
    const changePercent = ((change / firstPrice) * 100).toFixed(2);
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    
    return {
      lastPrice: lastPrice?.toFixed(2),
      change: change?.toFixed(2),
      changePercent,
      maxPrice: maxPrice?.toFixed(2),
      minPrice: minPrice?.toFixed(2),
      isPositive: change >= 0,
    };
  };

  const stats = getStats();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            Stock Analysis
          </h1>
          <p className="text-muted-foreground mt-1">
            Analyze historical price trends for NEPSE stocks
          </p>
        </div>
        {stock && (
          <Badge variant="secondary" className="text-lg px-4 py-1">
            {stock}
          </Badge>
        )}
      </div>

      {/* Stock Selection and Time Range */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <StockSelect
            label="Select a Stock"
            value={stock}
            onChange={setStock}
          />
        </div>
        <div className="flex gap-2 items-end">
          {TIME_RANGES.map((range) => (
            <Button
              key={range.label}
              variant={days === range.days ? "default" : "outline"}
              size="sm"
              onClick={() => setDays(range.days)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-muted-foreground">Loading chart data...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="text-destructive">{error}</div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      {stats && !loading && (
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Price</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rs. {stats.lastPrice}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Change</CardTitle>
              {stats.isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stats.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {stats.isPositive ? '+' : ''}{stats.changePercent}%
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.isPositive ? '+' : ''}Rs. {stats.change}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Period High</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rs. {stats.maxPrice}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Period Low</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rs. {stats.minPrice}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Price Chart */}
      {historyData && chartData.length > 0 && !loading && (
        <>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Price Trend</CardTitle>
              <CardDescription>
                Closing price with 120-day and 180-day moving averages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      domain={['auto', 'auto']}
                    />
                    <Tooltip
                      formatter={(value) => [`Rs. ${value?.toFixed(2)}`, '']}
                      labelStyle={{ fontWeight: 'bold' }}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="close"
                      stroke="#2563eb"
                      fillOpacity={1}
                      fill="url(#colorClose)"
                      name="Close Price"
                    />
                    <Line
                      type="monotone"
                      dataKey="ma120"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={false}
                      name="MA 120"
                    />
                    <Line
                      type="monotone"
                      dataKey="ma180"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                      name="MA 180"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Volume Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Trading Volume</CardTitle>
              <CardDescription>
                Daily trading volume over the selected period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value) => [value?.toLocaleString(), 'Volume']}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--popover))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                      }}
                    />
                    <Bar 
                      dataKey="volume" 
                      fill="#6366f1" 
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Empty State */}
      {!stock && !loading && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Select a Stock to Analyze</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Choose a stock symbol from the dropdown above to view historical price trends, 
              volume data, and moving averages.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
