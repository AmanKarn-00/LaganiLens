import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/95 backdrop-blur-sm border border-emerald-500/30 rounded-lg p-3 shadow-xl">
        <p className="text-emerald-400 font-medium text-xs mb-1">
          {new Date(label).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
        <p className="text-white text-lg font-bold">
          Rs. {payload[0].value. toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

export default function WormChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 rounded-xl bg-slate-900/50 border border-white/10">
        <p className="text-gray-400">No data available</p>
      </div>
    );
  }

  const chartData = data.map(item => ({
    date: item.date,
    close: item.close,
  }));

  // Determine if overall trend is positive
  const isPositive = chartData.length > 1 && chartData[chartData.length - 1].close >= chartData[0].close;
  const primaryColor = isPositive ? '#10b981' : '#ef4444';

  return (
    <div className="space-y-4">
      <div className="relative rounded-xl overflow-hidden">
        <div className={`absolute inset-0 ${isPositive ? 'bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5' : 'bg-gradient-to-r from-red-500/5 via-rose-500/5 to-pink-500/5'}`} />
        
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-xl border border-white/10">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left:  0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={primaryColor} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={primaryColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.1)" vertical={false} />
              
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
              
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize:  11 }}
                domain={['dataMin - 20', 'dataMax + 20']}
                tickFormatter={(value) => `Rs. ${value}`}
              />
              
              <Tooltip content={<CustomTooltip />} />
              
              <Area
                type="monotone"
                dataKey="close"
                stroke={primaryColor}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorClose)"
                activeDot={{ 
                  r: 6, 
                  fill: primaryColor, 
                  stroke: '#fff',
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trend Indicator */}
      <div className="flex justify-center">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${isPositive ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
          <div className={`w-2 h-2 rounded-full ${isPositive ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`}></div>
          <span className={`text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPositive ?  '📈 Uptrend' : '📉 Downtrend'}
          </span>
        </div>
      </div>
    </div>
  );
}