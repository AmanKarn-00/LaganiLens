import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";

export default function StockSelect({ label, value, onChange, exclude }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
const cacheRef = useRef({});

useEffect(() => {
  // Trimmed query
  const trimmedQuery = query.trim();

  // If query is empty, clear results and close dropdown
  if (!trimmedQuery) {
    setResults([]);
    setIsOpen(false);
    return;
  }

  const controller = new AbortController();
  const currentQuery = trimmedQuery; // capture query for this fetch

  const debounce = setTimeout(async () => {
    setLoading(true);
    setError(null);

    try {
      const apiBase = import.meta.env.VITE_API_URL || "";
      const apiUrl = `${apiBase}/api/stocks/search?q=${encodeURIComponent(currentQuery)}`;
      const res = await fetch(apiUrl, { signal: controller.signal });

      if (!res.ok) throw new Error(`Search failed: ${res.status}`);

      const data = await res.json();
      let stockList = Array.isArray(data) ? data : data.stocks || [];

      // Filter excluded stock
      const filtered = stockList.filter((s) => s.symbol !== exclude);

      // ✅ Only update state if query hasn’t changed
      if (query.trim() === currentQuery) {
        setResults(filtered);
        setIsOpen(filtered.length > 0);
        setHighlightedIndex(0);
      }
    } catch (err) {
      if (err.name === "AbortError") return; // ignore cancelled requests
      console.error(`[${label}] Search error:`, err);

      // Only clear error/results if query hasn’t changed
      if (query.trim() === currentQuery) {
        setError(err.message);
        setResults([]);
        setIsOpen(false);
      }
    } finally {
      if (query.trim() === currentQuery) setLoading(false);
    }
  }, 200); // debounce 200ms

  return () => {
    clearTimeout(debounce);
    controller.abort(); // cancel stale fetch
  };
}, [query, label, exclude]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !inputRef.current?.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (symbol) => {
    console.log(`[${label}] Selected:`, symbol);
    onChange(symbol);
    setQuery("");
    setIsOpen(false);
    setResults([]);
  };

  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (results[highlightedIndex]) {
          handleSelect(results[highlightedIndex].symbol);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  return (
    <Card className="p-4">
      <label className="text-sm mb-2 font-medium block">{label}</label>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type stock symbol (e.g., NABIL)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
        )}

        {isOpen && results.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-64 overflow-y-auto"
          >
            {results.map((stock, index) => (
              <div
                key={stock.symbol}
                onClick={() => handleSelect(stock.symbol)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`px-3 py-2 cursor-pointer flex items-center justify-between ${
                  index === highlightedIndex
                    ? "bg-blue-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <span className="font-mono font-medium">{stock.symbol}</span>
                {stock.lastTradeDate && (
                  <span className="text-xs text-gray-500">
                    {new Date(stock.lastTradeDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {isOpen && query && results.length === 0 && !loading && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-4 text-center text-sm text-gray-500">
            No stocks found matching "{query}"
          </div>
        )}
      </div>

      {error && (
        <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      {value ? (
        <div className="mt-3 p-2 bg-green-50 rounded border border-green-200">
          <p className="text-xs text-green-700 flex items-center justify-between">
            <span>
              Selected: <strong className="font-mono">{value}</strong>
            </span>
            <button
              onClick={() => {
                onChange(null);
                setQuery("");
              }}
              className="text-green-600 hover:text-green-800 underline text-xs"
            >
              Clear
            </button>
          </p>
        </div>
      ) : (
        <div className="mt-3 p-2 bg-gray-50 rounded border border-gray-200">
          <p className="text-xs text-gray-500">No stock selected</p>
        </div>
      )}
    </Card>
  );
}