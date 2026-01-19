import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function WormChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        No data available
      </div>
    );
  }

  // Format data for recharts
  const chartData = data.map(item => ({
    date: item.date,
    close: item.close,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis 
          dataKey="date" 
          stroke="#9ca3af"
          tick={{ fill: '#9ca3af' }}
          tickFormatter={(value) => {
            const date = new Date(value);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }}
        />
        <YAxis 
          stroke="#9ca3af"
          tick={{ fill: '#9ca3af' }}
          domain={['auto', 'auto']}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            borderRadius: '0.5rem',
            color: '#f3f4f6',
          }}
          labelStyle={{ color: '#f3f4f6' }}
          formatter={(value) => [`Rs ${value.toFixed(2)}`, 'Close Price']}
        />
        <Area
          type="monotone"
          dataKey="close"
          stroke="#3b82f6"
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorClose)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
