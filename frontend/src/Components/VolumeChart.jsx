import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const MILLION = 1000000;
const THOUSAND = 1000;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isUp = data.isUp;
    
    return (
      <div className="bg-slate-900/95 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3 shadow-xl">
        <p className="text-cyan-400 font-medium text-xs mb-2">
          {new Date(label).toLocaleDateString('en-US', { month:  'short', day: 'numeric', year: 'numeric' })}
        </p>
        <div className="space-y-1">
          <p className="text-white font-bold">
            Volume: {data.volume.toLocaleString()}
          </p>
          <p className={`text-sm ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
            {isUp ? '▲ Bullish Day' : '▼ Bearish Day'}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function VolumeChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 rounded-xl bg-slate-900/50 border border-white/10">
        <p className="text-gray-400">No data available</p>
      </div>
    );
  }

  const chartData = data.map(item => ({
    date: item. date,
    volume: item. volume,
    isUp: item.close >= item.open,
  }));

  return (
    <div className="space-y-4">
      <div className="relative rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-indigo-500/5" />
        
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-xl border border-white/10">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 10, right: 30, left:  0, bottom: 0 }}>
              <defs>
                <linearGradient id="volumeGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.3} />
                </linearGradient>
                <linearGradient id="volumeRed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.1)" vertical={false} />
              
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill:  '#94a3b8', fontSize: 11 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
              
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                tickFormatter={(value) => {
                  if (value >= MILLION) return `${(value / MILLION).toFixed(1)}M`;
                  if (value >= THOUSAND) return `${(value / THOUSAND).toFixed(0)}K`;
                  return value;
                }}
              />
              
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
              
              <Bar dataKey="volume" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isUp ? 'url(#volumeGreen)' : 'url(#volumeRed)'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <div className="w-3 h-4 rounded-sm bg-gradient-to-b from-emerald-500 to-emerald-500/30"></div>
          <span className="text-emerald-400 font-medium">Bullish Volume</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
          <div className="w-3 h-4 rounded-sm bg-gradient-to-b from-red-500 to-red-500/30"></div>
          <span className="text-red-400 font-medium">Bearish Volume</span>
        </div>
      </div>
    </div>
  );
}