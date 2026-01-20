import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-sm border border-indigo-500/30 rounded-lg p-3 shadow-xl">
        <p className="text-indigo-400 font-medium mb-1">Day {label}</p>
        <p className="text-white text-lg font-bold">
          Rs. {payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

export default function PredictionChart({ data, lastPrice }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 rounded-xl bg-slate-900/50 border border-white/10">
        <p className="text-gray-400">No prediction data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5" />
        
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-xl border border-white/10">
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data} margin={{ top: 20, right: 30, left:  20, bottom: 20 }}>
              <defs>
                <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" vertical={false} />
              
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
              />
              
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickFormatter={(value) => `Rs.${value}`}
                domain={['dataMin - 10', 'dataMax + 10']}
              />

              {lastPrice && (
                <ReferenceLine
                  y={lastPrice}
                  stroke="#f43f5e"
                  strokeDasharray="8 4"
                  strokeWidth={2}
                  label={{
                    value: `Last:  Rs.${lastPrice.toFixed(2)}`,
                    fill: '#f43f5e',
                    fontSize: 11,
                    position: 'right',
                  }}
                />
              )}

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="price"
                stroke="#6366f1"
                strokeWidth={3}
                fill="url(#predictionGradient)"
                activeDot={{ 
                  r: 6, 
                  fill: '#6366f1', 
                  stroke: '#fff',
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
          <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50"></div>
          <span className="text-indigo-400 font-medium">Predicted Price</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20">
          <div className="w-6 h-0.5 border-t-2 border-dashed border-rose-500"></div>
          <span className="text-rose-400 font-medium">Last Price</span>
        </div>
      </div>
    </div>
  );
}