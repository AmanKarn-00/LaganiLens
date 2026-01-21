import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function CompareTable({ stocks }) {
  if (!stocks || stocks.length < 2) return null;

  const [a, b] = stocks;

  /* ---------- Helpers ---------- */

  const safeFormat = (value, formatter) => {
    if (value === null || value === undefined || isNaN(value)) return "-";
    return formatter(value);
  };

  const isBetter = (x, y, lowerBetter) => {
    if (x == null || y == null) return false;
    return lowerBetter ? x < y : x > y;
  };

  /* ---------- Metrics ---------- */

  const metrics = [
    {
      key: "price",
      label: "Current Price",
      format: v => `Rs. ${v.toFixed(2)}`,
      lowerBetter: false,
    },
    {
      key: "changePercent",
      label: "Change %",
      format: v => `${v > 0 ? "+" : ""}${v.toFixed(2)}%`,
      lowerBetter: false,
    },
    {
      key: "high52w",
      label: "52W High",
      format: v => `Rs. ${v.toFixed(2)}`,
      lowerBetter: false,
    },
    {
      key: "low52w",
      label: "52W Low",
      format: v => `Rs. ${v.toFixed(2)}`,
      lowerBetter: false,
    },
    {
      key: "marketCap",
      label: "Market Cap",
      format: v => `${v}M`,
      lowerBetter: false,
    },
    {
      key: "peRatio",
      label: "P/E Ratio",
      format: v => v.toFixed(1),
      lowerBetter: true,
    },
    {
      key: "volume",
      label: "Volume",
      format: v => v.toLocaleString(),
      lowerBetter: false,
    },
  ];

  /* ---------- UI ---------- */

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-gradient-to-r from-purple-500/5 to-cyan-500/5">
                <th className="text-left p-6 font-semibold text-slate-300">
                  Metric
                </th>
                <th className="p-6 font-semibold text-white text-center">
                  {a.symbol}
                </th>
                <th className="p-6 font-semibold text-white text-center">
                  {b.symbol}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {metrics.map(m => {
                const aVal = a[m.key];
                const bVal = b[m.key];

                const aWins = isBetter(aVal, bVal, m.lowerBetter);
                const bWins = isBetter(bVal, aVal, m.lowerBetter);

                return (
                  <tr
                    key={m.key}
                    className="hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="p-6 font-medium text-slate-300">
                      {m.label}
                    </td>

                    <td
                      className={`p-6 font-semibold text-center transition-colors duration-200 ${
                        aWins
                          ? "text-emerald-400 bg-emerald-500/5"
                          : "text-slate-300"
                      }`}
                    >
                      {safeFormat(aVal, m.format)}
                    </td>

                    <td
                      className={`p-6 font-semibold text-center transition-colors duration-200 ${
                        bWins
                          ? "text-emerald-400 bg-emerald-500/5"
                          : "text-slate-300"
                      }`}
                    >
                      {safeFormat(bVal, m.format)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
