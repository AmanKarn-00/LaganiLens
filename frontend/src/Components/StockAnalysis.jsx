// frontend/src/components/StockChart.jsx
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const StockChart = ({ symbol }) => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [options] = useState({
    chart: {
      type: "candlestick",
      height: 350,
      zoom: {
        enabled: true, // ✅ User can zoom into specific months/weeks
        type: 'x',
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    },
    title: {
      text: symbol ? `${symbol} - Historical Trends` : "Select a Stock",
      align: "left",
    },
    xaxis: {
      type: "datetime",
      tooltip: { enabled: true },
      labels: {
        // Smart formatting: Shows "Jan '23" when zoomed out, "15 Jan" when zoomed in
        datetimeFormatter: {
          year: 'yyyy',
          month: "MMM 'yy",
          day: 'dd MMM',
        }
      }
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: {
        formatter: (value) => { return "Rs. " + value.toFixed(0) }
      }
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#00E396",
          downward: "#FF4560"
        }
      }
    },
    noData: {
      text: "Loading or No Data...",
      align: 'center',
      verticalAlign: 'middle',
      style: { color: "#888", fontSize: '16px' }
    }
  });

  useEffect(() => {
    const fetchStockData = async () => {
      if (!symbol) return;
      
      setLoading(true);
      setError(null);

      try {
        // Make sure this matches your backend URL
        const response = await axios.get(`http://localhost:5000/api/stocks/${symbol}`);
        const data = response.data;

        if (!data || data.length === 0) {
            setError("No data available.");
            setSeries([]); 
            setLoading(false);
            return;
        }

        // Format data for ApexCharts: { x: Date, y: [Open, High, Low, Close] }
        const formattedData = data.map((item) => ({
          x: new Date(item.date), 
          y: [item.open, item.high, item.low, item.close],
        }));

        setSeries([{ name: symbol, data: formattedData }]);
      } catch (err) {
        console.error("Error loading chart:", err);
        setError("Failed to load chart data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbol]);

  if (!symbol) return <div className="p-4 text-gray-500">Please select a stock to view the graph.</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="stock-chart-container p-4 bg-white shadow rounded-lg">
      {/* The Chart Component */}
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={400}
        width="100%"
      />
      
      {/* Helper text */}
      <div className="text-center text-xs text-gray-400 mt-2">
        {loading ? "Loading data..." : "Scroll or pinch to zoom. Click 'Reset' to view full history."}
      </div>
    </div>
  );
};

export default StockChart;