import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import StockSelect from "../components/StockSelect"
import CompareTable from "../components/CompareTable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, GitCompare, AlertCircle } from "lucide-react"

export default function CompareStocksPage() {
  const [stockA, setStockA] = useState(null)
  const [stockB, setStockB] = useState(null)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!stockA || !stockB || stockA === stockB) {
      setData([])
      setError(null)
      return
    }

    const controller = new AbortController()

    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(
          `http://localhost:5000/api/stocks/compare?symbols=${stockA},${stockB}`,
          { signal: controller.signal }
        )

        if (!res.ok) {
          const contentType = res.headers.get("content-type")
          if (contentType?. includes("application/json")) {
            const errorData = await res.json()
            throw new Error(errorData.message || "Failed to fetch stock data")
          } else {
            throw new Error(`Server error: ${res.status} ${res.statusText}`)
          }
        }

        const json = await res.json()

        if (! json.stocks || ! Array.isArray(json.stocks) || json.stocks.length !== 2) {
          throw new Error("Invalid response format from server")
        }

        setData(json.stocks)
        setError(null)
      } catch (err) {
        if (err.name === "AbortError") return
        console.error("Fetch failed:", err)
        setError(err.message || "Failed to load comparison data")
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [stockA, stockB])

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="mb-4 -ml-2"
            onClick={() => navigate("/homepage")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">Compare Stocks</h1>
              <p className="text-muted-foreground">
                Side-by-side comparison of NEPSE stocks
              </p>
            </div>
            <div className="flex items-center gap-2">
              <GitCompare className="h-5 w-5 text-emerald-500" />
              <Badge variant="secondary">Comparison Tool</Badge>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Stock Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Select Stocks to Compare</CardTitle>
            <CardDescription>Choose two different stocks to see their comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Stock A</label>
                <StockSelect
                  value={stockA}
                  onChange={setStockA}
                  exclude={stockB}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Stock B</label>
                <StockSelect
                  value={stockB}
                  onChange={setStockB}
                  exclude={stockA}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <GitCompare className="h-8 w-8 mx-auto mb-4 animate-pulse" />
                <p>Loading comparison... </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {error && (
          <Card className="border-destructive/50">
            <CardContent className="py-6">
              <div className="flex items-center gap-3 text-destructive">
                <AlertCircle className="h-5 w-5" />
                <div>
                  <p className="font-medium">Error loading comparison</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Same Stock Warning */}
        {stockA && stockB && stockA === stockB && (
          <Card className="border-amber-500/50 bg-amber-500/5">
            <CardContent className="py-6">
              <div className="flex items-center gap-3 text-amber-600">
                <AlertCircle className="h-5 w-5" />
                <p>Please select two different stocks to compare</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* No Data State */}
        {!loading && !error && stockA && stockB && stockA !== stockB && data.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              <p>No comparison data available for the selected stocks.</p>
            </CardContent>
          </Card>
        )}

        {/* Comparison Results */}
        {! loading && data.length === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Comparison Results</CardTitle>
              <CardDescription>
                Showing key metrics for {stockA} vs {stockB}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CompareTable stocks={data} />
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!stockA && !stockB && !loading && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <GitCompare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Select stocks to compare</p>
                <p className="text-sm mt-1">Choose two stocks from the dropdowns above</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}