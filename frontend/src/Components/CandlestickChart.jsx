import { useEffect, useRef } from 'react';
import { createChart, CandlestickSeries, LineSeries, HistogramSeries } from 'lightweight-charts';

export default function CandlestickChart({ data }) {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef({});

  useEffect(() => {
    if (!chartContainerRef. current) {
      console.error('Chart container is not available');
      return;
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
      console.error('Invalid or missing data for chart:', data);
      return;
    }

    // ✨ Modern Clean Theme
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { 
          type: 'gradient',
          topColor: '#1a1a2e',
          bottomColor: '#16213e',
        },
        textColor: '#a0aec0',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      },
      grid: {
        vertLines: { 
          color: 'rgba(99, 102, 241, 0.1)',
          style: 1,
        },
        horzLines: { 
          color:  'rgba(99, 102, 241, 0.1)',
          style: 1,
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
      timeScale:  {
        timeVisible: true,
        borderColor: 'rgba(99, 102, 241, 0.3)',
        rightOffset: 5,
        barSpacing: 12,
        fixLeftEdge: true,
        lockVisibleTimeRangeOnResize: true,
      },
      rightPriceScale: {
        borderColor: 'rgba(99, 102, 241, 0.3)',
        scaleMargins: {
          top: 0.1,
          bottom: 0.2,
        },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: 'rgba(167, 139, 250, 0.5)',
          width: 1,
          style: 2,
          labelBackgroundColor: '#7c3aed',
        },
        horzLine: {
          color: 'rgba(167, 139, 250, 0.5)',
          width: 1,
          style:  2,
          labelBackgroundColor: '#7c3aed',
        },
      },
      handleScroll: {
        vertTouchDrag: true,
      },
    });

    chartRef.current = chart;

    // ✨ Beautiful Candlesticks - Gradient-like colors
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981',
      downColor:  '#ef4444',
      borderVisible: true,
      borderUpColor: '#34d399',
      borderDownColor: '#f87171',
      wickUpColor:  '#34d399',
      wickDownColor: '#f87171',
    });

    seriesRef.current.candlestick = candlestickSeries;

    const candlestickData = data. map(item => ({
      time: item.time,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));
    candlestickSeries.setData(candlestickData);

    // ✨ Stylish Volume Bars
    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: 'volume' },
      priceScaleId: 'volume',
    });

    seriesRef.current.volume = volumeSeries;

    volumeSeries.priceScale().applyOptions({
      scaleMargins: {
        top: 0.85,
        bottom: 0,
      },
    });

    const volumeData = data.map(item => ({
      time:  item.time,
      value: item.volume,
      color: item.close >= item.open 
        ? 'rgba(16, 185, 129, 0.4)'  // Green with transparency
        : 'rgba(239, 68, 68, 0.4)',  // Red with transparency
    }));
    volumeSeries.setData(volumeData);

    // ✨ Glowing MA Lines
    const ma120Data = [];
    const ma180Data = [];

    data.forEach(item => {
      if (item.ma120 !== null && item.ma120 !== undefined) {
        ma120Data.push({ time: item.time, value: item.ma120 });
      }
      if (item. ma180 !== null && item. ma180 !== undefined) {
        ma180Data.push({ time: item.time, value: item.ma180 });
      }
    });

    if (ma120Data.length > 0) {
      const ma120Series = chart.addSeries(LineSeries, {
        color: '#06b6d4',  // Cyan
        lineWidth: 2,
        lineStyle: 0,
        crosshairMarkerVisible: true,
        crosshairMarkerRadius: 4,
        crosshairMarkerBackgroundColor: '#06b6d4',
      });
      seriesRef.current.ma120 = ma120Series;
      ma120Series.setData(ma120Data);
    }

    if (ma180Data.length > 0) {
      const ma180Series = chart. addSeries(LineSeries, {
        color: '#f59e0b',  // Amber
        lineWidth: 2,
        lineStyle: 0,
        crosshairMarkerVisible: true,
        crosshairMarkerRadius: 4,
        crosshairMarkerBackgroundColor: '#f59e0b',
      });
      seriesRef.current.ma180 = ma180Series;
      ma180Series.setData(ma180Data);
    }

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current. clientWidth,
        });
      }
    };

    window. addEventListener('resize', handleResize);

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
      {/* Chart Container with Glass Effect */}
      <div className="relative rounded-xl overflow-hidden shadow-2xl">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-xl" />
        
        {/* Chart */}
        <div 
          ref={chartContainerRef} 
          className="relative w-full rounded-xl border border-white/10"
        />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50"></div>
          <span className="text-cyan-400 font-medium">MA 120</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
          <div className="w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50"></div>
          <span className="text-amber-400 font-medium">MA 180</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-2 h-4 rounded-sm bg-emerald-500"></div>
          <span className="text-emerald-400 font-medium">Bullish</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
          <div className="w-2 h-4 rounded-sm bg-red-500"></div>
          <span className="text-red-400 font-medium">Bearish</span>
        </div>
      </div>
    </div>
  );
}