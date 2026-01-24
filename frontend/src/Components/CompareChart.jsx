import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0f172a] border border-[#1e293b] rounded-md p-4 shadow-2xl">
        <p className="text-white font-bold text-xs uppercase tracking-widest mb-3 border-b border-slate-700 pb-2">
          {label}
        </p>
        <div className="space-y-2">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-10">
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-tighter">
                {entry.name}
              </span>
              <span className="text-white font-mono font-bold text-sm">
                {entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function CompareChart({ data, stockA, stockB }) {
  // 1. Remove Market Cap and handle empty states
  const filteredData = data?.filter(
    (item) => item.metric.toLowerCase() !== "market cap"
  );

  if (!filteredData || filteredData.length === 0) return null;

  return (
    <div className="w-full bg-[#020617] rounded-2xl border border-slate-800 p-8">
      {/* Header with high-contrast identifiers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h3 className="text-white text-xl font-black tracking-tight">Comparison</h3>
          <p className="text-slate-500 text-xs font-medium italic">Excluding Market Capitalization</p>
        </div>
        
        <div className="flex gap-6">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded bg-[#6366f1]" />
            <span className="text-white text-sm font-bold tracking-tight">{stockA}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded bg-[#22d3ee]" />
            <span className="text-white text-sm font-bold tracking-tight">{stockB}</span>
          </div>
        </div>
      </div>

      {/* Chart - Height set to 500 for maximum clarity */}
      <div className="h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={filteredData} 
            margin={{ top: 0, right: 10, left: -10, bottom: 80 }} 
            barGap={12}
          >
            <CartesianGrid 
              vertical={false} 
              stroke="#1e293b" 
              strokeDasharray="0" 
            />
            
            <XAxis 
              dataKey="metric" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 700 }}
              interval={0}
              angle={-45} // Slanted for long metric names
              textAnchor="end"
              dy={20}
            />
            
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }}
            />

            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ fill: '#1e293b', opacity: 0.4 }} 
            />

            <Bar 
              dataKey="stockA" 
              name={stockA} 
              fill="#6366f1" // Electric Indigo
              radius={[4, 4, 0, 0]} 
              maxBarSize={60}
            />
            
            <Bar 
              dataKey="stockB" 
              name={stockB} 
              fill="#22d3ee" // Bright Cyan
              radius={[4, 4, 0, 0]} 
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}