import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { ArrowLeft, Loader2, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NepseAnalysis = () => {
  const navigate = useNavigate();
  
  // State
  const [stocks, setStocks] = useState([]); 
  const [selectedStock, setSelectedStock] = useState("");
  
  // ✅ STATE 1: Stores the FULL history (Do not modify this after fetch)
  const [fullData, setFullData] = useState([]);
  // ✅ STATE 2: Stores only the subset currently shown on graph
  const [chartData, setChartData] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL"); // Tracks active button

  // 1. Fetch Stock List on Mount
  useEffect(() => {
    fetch("http://localhost:5000/api/stocks/list") 
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStocks(data);
          if (data.length > 0) handleStockSelect(data[0]); 
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setListLoading(false));
  }, []);

  // 2. Handle Stock Selection & Fetch History
  const handleStockSelect = async (symbol) => {
    if (!symbol) return;
    setSelectedStock(symbol);
    setLoading(true);
    setActiveFilter("ALL"); // Reset filter on new stock select
    
    try {
      const response = await fetch(`http://localhost:5000/api/stocks/${symbol}/history`);
      if (!response.ok) throw new Error("Failed");
      
      const rawData = await response.json();

      const formattedData = rawData.map((item) => ({
        x: new Date(item.date), 
        y: [
          parseFloat(item.open), 
          parseFloat(item.high), 
          parseFloat(item.low), 
          parseFloat(item.close)
        ]
      })).sort((a, b) => a.x - b.x);

      // Save to both states initially
      setFullData([{ name: symbol, data: formattedData }]);
      setChartData([{ name: symbol, data: formattedData }]);

    } catch (error) {
      console.error("Error fetching history:", error);
      setChartData([]);
    }
    setLoading(false);
  };

  // ✅ 3. Timeframe Filter Logic
  const handleTimeFilter = (days) => {
    setActiveFilter(days);

    // Guard clause: if no data exists, do nothing
    if (!fullData.length || !fullData[0].data.length) return;

    const originalSeries = fullData[0].data; // Access raw data points

    if (days === "ALL") {
      setChartData(fullData);
      return;
    }

    // 1. Find the LAST date in the dataset (most recent data point)
    const lastDate = new Date(originalSeries[originalSeries.length - 1].x);
    
    // 2. Calculate Cutoff Date (Last Date - X Days)
    const cutoffDate = new Date(lastDate);
    cutoffDate.setDate(cutoffDate.getDate() - days);

    // 3. Filter data points strictly after cutoff
    const filteredSeries = originalSeries.filter(point => point.x >= cutoffDate);

    setChartData([{ name: selectedStock, data: filteredSeries }]);
  };

  const chartOptions = {
    chart: {
      type: "candlestick",
      height: 350,
      fontFamily: "Inter, sans-serif",
      zoom: { enabled: true, type: 'x', autoScaleYaxis: true },
      toolbar: { show: false } // Hiding default toolbar to use our custom buttons
    },
    title: {
      text: selectedStock ? `${selectedStock} - Market Trends` : "Select a Stock",
      align: "left",
      style: { fontSize: "18px", fontWeight: 600, color: "#374151" }
    },
    xaxis: {
      type: "datetime",
      tooltip: { enabled: true },
      labels: {
        datetimeFormatter: {
          year: 'yyyy',
          month: "MMM 'yy",
          day: 'dd MMM',
        }
      }
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: { formatter: (value) => `Rs. ${value.toFixed(0)}` }
    },
    plotOptions: {
      candlestick: {
        colors: { upward: "#10B981", downward: "#EF4444" }
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate('/homepage')} className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar */}
        <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-1 h-fit border border-gray-100">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Select Stock</h2>
          <div className="relative">
            {listLoading ? (
               <div className="flex items-center text-gray-400 space-x-2"><Loader2 className="animate-spin w-4 h-4"/><span>Loading list...</span></div>
            ) : (
              <div className="relative">
                <select
                  value={selectedStock}
                  onChange={(e) => handleStockSelect(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition-all cursor-pointer"
                >
                  <option value="" disabled>Choose a company...</option>
                  {stocks.map((stock) => <option key={stock} value={stock}>{stock}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"><ChevronDown className="h-4 w-4" /></div>
              </div>
            )}
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[450px] relative">
            
            {loading ? (
              <div className="h-[400px] flex flex-col items-center justify-center text-gray-400">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-2" />
                <p>Loading market data...</p>
              </div>
            ) : chartData.length > 0 ? (
              <>
                <Chart options={chartOptions} series={chartData} type="candlestick" height={400} />
                
                {/* ✅ TIMEFRAME BUTTONS */}
                <div className="flex justify-end items-center gap-2 mt-4 border-t pt-4">
                    <span className="text-xs text-gray-400 font-medium mr-2">Zoom:</span>
                    {[3, 7, 15, 30, 90, "ALL"].map((period) => (
                        <button
                            key={period}
                            onClick={() => handleTimeFilter(period)}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                                activeFilter === period
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {period === "ALL" ? "All" : `${period}D`}
                        </button>
                    ))}
                </div>
              </>
            ) : (
              <div className="h-[400px] flex items-center justify-center text-gray-400">Select a stock to view analysis</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NepseAnalysis;