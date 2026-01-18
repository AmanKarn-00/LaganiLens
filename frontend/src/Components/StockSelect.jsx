import { useEffect, useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function StockSelect({ label, value, onChange, exclude, className }) {
  const [query, setQuery] = useState(value || "")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)
  const cacheRef = useRef({})
  const abortControllerRef = useRef(null)

  // Parse excluded stocks (can be comma-separated string or array)
  const excludedSymbols = Array.isArray(exclude) 
    ? exclude 
    : (exclude ?  exclude.split(",").map(s => s.trim()).filter(Boolean) : [])

  // Sync query with value prop when it changes externally
  useEffect(() => {
    if (value) {
      setQuery(value)
    } else {
      setQuery("")
    }
  }, [value])

  useEffect(() => {
    const trimmedQuery = query.trim()

    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // If query is empty, clear results and close dropdown
    if (!trimmedQuery) {
      setResults([])
      setIsOpen(false)
      setLoading(false)
      return
    }

    // Don't search if query matches current value (user just selected)
    if (trimmedQuery === value) {
      setResults([])
      setIsOpen(false)
      setLoading(false)
      return
    }

    // Check cache first
    if (cacheRef.current[trimmedQuery]) {
      const filtered = cacheRef.current[trimmedQuery].filter(
        (s) => !excludedSymbols.includes(s.symbol)
      )
      setResults(filtered)
      setIsOpen(filtered.length > 0)
      setHighlightedIndex(0)
      setLoading(false)
      return
    }

    const debounceTimer = setTimeout(async () => {
      const controller = new AbortController()
      abortControllerRef.current = controller

      setLoading(true)
      setError(null)

      try {
        const apiUrl = `/api/stocks/search?q=${encodeURIComponent(trimmedQuery)}`
        const res = await fetch(apiUrl, { signal: controller.signal })

        if (!res.ok) throw new Error(`Search failed: ${res.status}`)

        const data = await res.json()
        let stockList = Array.isArray(data) ? data : data.stocks || []

        // Cache the results
        cacheRef.current[trimmedQuery] = stockList

        // Filter excluded stocks
        const filtered = stockList. filter((s) => !excludedSymbols.includes(s. symbol))

        if (!controller.signal.aborted) {
          setResults(filtered)
          setIsOpen(filtered. length > 0)
          setHighlightedIndex(0)
        }
      } catch (err) {
        if (err.name === "AbortError") return
        console.error(`[StockSelect] Search error:`, err)

        if (!controller.signal.aborted) {
          setError(err.message)
          setResults([])
          setIsOpen(false)
        }
      } finally {
        if (!controller. signal.aborted) {
          setLoading(false)
        }
      }
    }, 300)

    return () => {
      clearTimeout(debounceTimer)
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [query, exclude, value])

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current. contains(e.target) &&
        !inputRef.current?.contains(e.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (symbol) => {
    console.log(`[StockSelect] Selected: `, symbol)
    onChange(symbol)
    setQuery(symbol)
    setIsOpen(false)
    setResults([])
  }

  const handleClear = () => {
    onChange(null)
    setQuery("")
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        )
        break
      case "ArrowUp": 
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        break
      case "Enter":
        e.preventDefault()
        if (results[highlightedIndex]) {
          handleSelect(results[highlightedIndex]. symbol)
        }
        break
      case "Escape": 
        e.preventDefault()
        setIsOpen(false)
        break
    }
  }

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Type stock symbol (e.g., NABIL)..."
          value={query}
          onChange={(e) => setQuery(e.target.value. toUpperCase())}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.length > 0 && ! value) setIsOpen(true)
          }}
          autoComplete="off"
        />

        {/* Loading spinner */}
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Clear button when value is selected */}
        {value && ! loading && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}

        {/* Dropdown results */}
        {isOpen && results.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-64 overflow-y-auto"
          >
            {results.map((stock, index) => (
              <div
                key={stock.symbol}
                onClick={() => handleSelect(stock.symbol)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={cn(
                  "px-3 py-2 cursor-pointer flex items-center justify-between text-sm",
                  index === highlightedIndex
                    ? "bg-accent text-accent-foreground"
                    :  "hover:bg-muted"
                )}
              >
                <span className="font-mono font-medium">{stock. symbol}</span>
              </div>
            ))}
          </div>
        )}

        {/* No results message */}
        {isOpen && query && query !== value && results.length === 0 && !loading && (
          <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg p-4 text-center text-sm text-muted-foreground">
            No stocks found matching "{query}"
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-2 text-xs text-destructive bg-destructive/10 p-2 rounded">
          {error}
        </div>
      )}

      {/* Selected stock indicator */}
      {value && (
        <div className="mt-2 text-xs text-muted-foreground">
          Selected: <span className="font-mono font-semibold text-foreground">{value}</span>
        </div>
      )}
    </div>
  )
}