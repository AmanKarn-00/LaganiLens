import { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

export default function CandlestickChart({ data }) {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef({});

  useEffect(() => {
    if (!chartContainerRef.current || !data || data.length === 0) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#0a0a0a' },
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: { color: '#1f2937' },
        horzLines: { color: '#1f2937' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
      timeScale: {
        timeVisible: true,
        borderColor: '#374151',
      },
      rightPriceScale: {
        borderColor: '#374151',
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: '#6b7280',
          width: 1,
          style: 2,
        },
        horzLine: {
          color: '#6b7280',
          width: 1,
          style: 2,
        },
      },
    });

    chartRef.current = chart;

    // Add candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#10b981',
      downColor: '#ef4444',
      borderUpColor: '#10b981',
      borderDownColor: '#ef4444',
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    });

    seriesRef.current.candlestick = candlestickSeries;

    // Format data for candlestick
    const candlestickData = data.map(item => ({
      time: item.time,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));
    candlestickSeries.setData(candlestickData);

    // Add volume series
    const volumeSeries = chart.addHistogramSeries({
      color: '#26a69a',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
    });

    seriesRef.current.volume = volumeSeries;
    
    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    // Format data for volume with color coding
    const volumeData = data.map(item => ({
      time: item.time,
      value: item.volume,
      color: item.close >= item.open ? '#10b98180' : '#ef444480',
    }));
    volumeSeries.setData(volumeData);

    // Add MA120 line
    const ma120Data = data
      .filter(item => item.ma120 !== null && item.ma120 !== undefined)
      .map(item => ({
        time: item.time,
        value: item.ma120,
      }));

    if (ma120Data.length > 0) {
      const ma120Series = chart.addLineSeries({
        color: '#3b82f6',
        lineWidth: 2,
        title: 'MA 120',
      });
      seriesRef.current.ma120 = ma120Series;
      ma120Series.setData(ma120Data);
    }

    // Add MA180 line
    const ma180Data = data
      .filter(item => item.ma180 !== null && item.ma180 !== undefined)
      .map(item => ({
        time: item.time,
        value: item.ma180,
      }));

    if (ma180Data.length > 0) {
      const ma180Series = chart.addLineSeries({
        color: '#f59e0b',
        lineWidth: 2,
        title: 'MA 180',
      });
      seriesRef.current.ma180 = ma180Series;
      ma180Series.setData(ma180Data);
    }

    // Fit content
    chart.timeScale().fitContent();

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [data]);

  return (
    <div className="space-y-4">
      <div ref={chartContainerRef} className="w-full" />
      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-blue-500"></div>
          <span className="text-gray-400">MA 120</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-amber-500"></div>
          <span className="text-gray-400">MA 180</span>
        </div>
      </div>
    </div>
  );
}
