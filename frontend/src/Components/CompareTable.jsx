import { TrendingUp, TrendingDown } from "lucide-react";

const metrics = [
  { key: "price", label: "Current Price", format: v => `Rs. ${v?.toFixed(2) || 'N/A'}` },
  { key: "changePercent", label: "Change %", format: v => `${v || 0}%` },
  { key: "high52w", label: "52W High", format: v => `Rs. ${v?.toFixed(2) || 'N/A'}` },
  { key: "low52w", label: "52W Low", format: v => `Rs. ${v?.toFixed(2) || 'N/A'}` },
  { key: "volume", label: "Volume", format: v => `${v ? (v / 1000).toFixed(1) : 'N/A'}K` },
];

export default function CompareTable({ stocks }) {
  const [a, b] = stocks;

  const isBetter = (x, y) => {
    if (x === undefined || y === undefined || x === null || y === null) return null;
    return x > y ? "better" : x < y ? "worse" : "equal";
  };

  const getValueColor = (result) => {
    if (result === "better") return "text-emerald-400 font-semibold";
    if (result === "worse") return "text-red-400 font-semibold";
    return "text-slate-300";
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border border-border bg-slate-950/50">
        <table className="w-full text-sm">
          {/* Header */}
          <thead>
            <tr className="border-b border-border bg-slate-900/50">
              <th className="text-left px-4 py-3 text-slate-400 font-semibold">Metric</th>
              <th className="px-4 py-3 text-slate-400 font-semibold text-center">{a.symbol}</th>
              <th className="px-4 py-3 text-slate-400 font-semibold text-center">{b.symbol}</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {metrics.map((m, idx) => {
              const resultA = isBetter(a[m.key], b[m.key]);
              const resultB = isBetter(b[m.key], a[m.key]);

              return (
                <tr 
                  key={m.key} 
                  className="border-b border-border/50 hover:bg-slate-900/30 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-slate-200">
                    {m.label}
                  </td>

                  <td className={`px-4 py-3 text-center ${getValueColor(resultA)}`}>
                    <div className="flex items-center justify-center gap-2">
                      {m.format(a[m.key])}
                      {resultA === "better" && (
                        <TrendingUp className="h-4 w-4 text-emerald-400" />
                      )}
                      {resultA === "worse" && (
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                  </td>

                  <td className={`px-4 py-3 text-center ${getValueColor(resultB)}`}>
                    <div className="flex items-center justify-center gap-2">
                      {m.format(b[m.key])}
                      {resultB === "better" && (
                        <TrendingUp className="h-4 w-4 text-emerald-400" />
                      )}
                      {resultB === "worse" && (
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}