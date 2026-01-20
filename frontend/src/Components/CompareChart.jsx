import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 shadow-xl">
        <p className="text-purple-400 font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="font-medium">
            {entry. name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function CompareChart({ data, stockA, stockB }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 rounded-xl bg-slate-900/50 border border-white/10">
        <p className="text-gray-400">No comparison data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-rose-500/5" />
        
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-xl border border-white/10">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="stockAGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.4} />
                </linearGradient>
                <linearGradient id="stockBGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.4} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" vertical={false} />
              
              <XAxis 
                dataKey="metric" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize:  11 }}
              />
              
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
              />

              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
              
              <Legend 
                wrapperStyle={{ paddingTop:  '20px' }}
                formatter={(value) => <span className="text-slate-300">{value}</span>}
              />

              <Bar dataKey="stockA" name={stockA} fill="url(#stockAGradient)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="stockB" name={stockB} fill="url(#stockBGradient)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20">
          <div className="w-3 h-3 rounded-full bg-violet-500 shadow-lg shadow-violet-500/50"></div>
          <span className="text-violet-400 font-medium">{stockA}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50"></div>
          <span className="text-cyan-400 font-medium">{stockB}</span>
        </div>
      </div>
    </div>
  );
}