import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const MILLION = 1000000;
const THOUSAND = 1000;

export default function VolumeChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        No data available
      </div>
    );
  }

  // Format data for recharts with color coding
  const chartData = data.map(item => ({
    date: item.date,
    volume: item.volume,
    isUp: item.close >= item.open,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
          tickFormatter={(value) => {
            if (value >= MILLION) return `${(value / MILLION).toFixed(1)}M`;
            if (value >= THOUSAND) return `${(value / THOUSAND).toFixed(0)}K`;
            return value;
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
            borderRadius: '0.5rem',
            color: '#f3f4f6',
          }}
          labelStyle={{ color: '#f3f4f6' }}
          formatter={(value) => [value.toLocaleString(), 'Volume']}
        />
        <Bar dataKey="volume" radius={[4, 4, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.isUp ? '#10b981' : '#ef4444'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
