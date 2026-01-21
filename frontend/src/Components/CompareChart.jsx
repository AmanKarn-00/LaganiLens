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
      <div className="bg-slate-950/98 backdrop-blur-md border border-purple-500/50 rounded-xl p-4 shadow-2xl">
        <p className="text-purple-300 font-bold mb-3 text-sm">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <p style={{ color: entry.color }} className="font-semibold text-sm">
              {entry.name}: <span className="text-white">{typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function CompareChart({ data, stockA, stockB }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
        <div className="text-center">
          <div className="text-slate-500 text-4xl mb-2">📊</div>
          <p className="text-slate-400 font-medium">No comparison data available</p>
          <p className="text-slate-500 text-sm mt-1">Select two stocks to see metrics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Chart Container */}
      <div className="relative rounded-2xl overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-cyan-600/5 to-transparent pointer-events-none" />
        
        {/* Glass Effect Card */}
        <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart 
              data={data} 
              margin={{ top: 30, right: 40, left: 40, bottom: 40 }}
              radius={[12, 12, 0, 0]}
            >
              <defs>
                {/* Gradient for Stock A */}
                <linearGradient id="stockAGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.95} />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.85} />
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity={0.5} />
                </linearGradient>

                {/* Gradient for Stock B */}
                <linearGradient id="stockBGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.95} />
                  <stop offset="50%" stopColor="#0891b2" stopOpacity={0.85} />
                  <stop offset="100%" stopColor="#0e7490" stopOpacity={0.5} />
                </linearGradient>
              </defs>

              <CartesianGrid 
                strokeDasharray="4 4" 
                stroke="rgba(139, 92, 246, 0.15)" 
                vertical={false}
                horizontalPoints={[0, 0.25, 0.5, 0.75, 1]}
              />
              
              <XAxis 
                dataKey="metric" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#cbd5e1', fontSize: 12, fontWeight: 500 }}
                angle={-15}
                textAnchor="end"
                height={80}
              />
              
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#cbd5e1', fontSize: 12 }}
                gridLineType="dashed"
              />

              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: 'rgba(168, 85, 247, 0.08)', radius: 8 }}
                wrapperStyle={{ outline: 'none' }}
              />
              
              <Legend 
                wrapperStyle={{ paddingTop: '30px' }}
                iconType="circle"
                formatter={(value) => <span className="text-slate-200 font-medium">{value}</span>}
                verticalAlign="bottom"
                height={40}
              />

              <Bar 
                dataKey="stockA" 
                name={stockA} 
                fill="url(#stockAGradient)" 
                radius={[8, 8, 0, 0]}
                isAnimationActive={true}
              />
              <Bar 
                dataKey="stockB" 
                name={stockB} 
                fill="url(#stockBGradient)" 
                radius={[8, 8, 0, 0]}
                isAnimationActive={true}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Enhanced Legend */}
      <div className="grid grid-cols-2 gap-4">
        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
          <div className="relative flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-br from-violet-900/20 to-purple-900/20 border border-violet-500/30 hover:border-violet-500/60 transition-all duration-300 backdrop-blur-sm">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 shadow-lg shadow-violet-500/40"></div>
            <div>
              <p className="text-violet-300 font-bold text-sm">{stockA}</p>
              <p className="text-violet-400/60 text-xs">Stock A</p>
            </div>
          </div>
        </div>

        <div className="group relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
          <div className="relative flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 backdrop-blur-sm">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/40"></div>
            <div>
              <p className="text-cyan-300 font-bold text-sm">{stockB}</p>
              <p className="text-cyan-400/60 text-xs">Stock B</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}