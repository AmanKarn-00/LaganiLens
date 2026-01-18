import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import StockSelect from "@/components/StockSelect"
import { Plus, Trash2, TrendingUp, Wallet, Package, ArrowLeft } from "lucide-react"
import { auth } from "@/firebase"

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([])
  const [selectedStock, setSelectedStock] = useState(null)
  const [quantity, setQuantity] = useState("")
  const [purchasePrice, setPurchasePrice] = useState("")
  const [loading, setLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [error, setError] = useState("")

  const user = auth.currentUser
  const navigate = useNavigate()

  useEffect(() => {
    if (user) loadPortfolio()
  }, [user])

  const loadPortfolio = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/portfolio/${user. uid}`)
      if (response.ok) {
        const data = await response.json()
        setPortfolio((data.stocks || []).filter(s => s && s.symbol))
      }
    } catch (err) {
      console.error("Error loading portfolio:", err)
    }
  }

  const handleAddStock = async () => {
    if (!selectedStock || !quantity || !purchasePrice) {
      setError("Please fill in all fields")
      return
    }

    const qty = parseInt(quantity)
    const price = parseFloat(purchasePrice)

    if (qty <= 0 || price <= 0) {
      setError("Quantity and price must be positive numbers")
      return
    }

    setLoading(true)
    setError("")

    try {
      const stockPayload = { symbol: selectedStock, quantity: qty, purchasePrice:  price }
      const exists = portfolio.find(s => s.symbol === selectedStock)
      const method = exists ? "PUT" : "POST"
      const url = exists
        ? `http://localhost:5000/api/portfolio/${user. uid}/stock/${selectedStock}`
        : `http://localhost:5000/api/portfolio/${user.uid}/stock`

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stockPayload),
      })

      if (!response.ok) throw new Error(exists ? "Failed to update stock" : "Failed to add stock")

      await loadPortfolio()
      setSelectedStock(null)
      setQuantity("")
      setPurchasePrice("")
      setShowAddForm(false)
    } catch (err) {
      setError(err.message || "Failed to add/update stock")
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveStock = async (symbol) => {
    if (!window.confirm(`Are you sure you want to remove ${symbol}?`)) return

    try {
      const response = await fetch(`http://localhost:5000/api/portfolio/${user.uid}/stock/${symbol}`, {
        method: "DELETE",
      })
      if (! response.ok) throw new Error("Failed to remove stock")
      setPortfolio(prev => prev.filter(s => s.symbol !== symbol))
    } catch (err) {
      setError(err.message || "Failed to remove stock")
    }
  }

  const calculateTotalInvestment = () => {
    return portfolio.reduce((sum, s) => sum + (s.totalInvested || 0), 0)
  }

  const excludedStocks = portfolio.map(s => s.symbol).join(",")

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
              <h1 className="text-3xl font-bold tracking-tight">My Portfolio</h1>
              <p className="text-muted-foreground">
                Manage your stock holdings and track investments
              </p>
            </div>
            <Badge variant="outline" className="text-sm px-4 py-1">
              {portfolio.length} Holdings
            </Badge>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Summary Cards */}
        <div className="grid gap-4 md: grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Stocks</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolio.length}</div>
              <p className="text-xs text-muted-foreground">Different holdings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                Rs. {calculateTotalInvestment().toLocaleString("en-NP", { maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">Amount invested</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {portfolio.reduce((sum, s) => sum + (s.quantity || 0), 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">Units owned</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Stock Section */}
        {! showAddForm ?  (
          <Button onClick={() => setShowAddForm(true)} className="mb-6">
            <Plus className="w-4 h-4 mr-2" />
            Add New Stock
          </Button>
        ) : (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add Stock to Portfolio</CardTitle>
              <CardDescription>Enter the details of your stock purchase</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
                  {error}
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-3 mb-4">
                <div className="space-y-2">
                  <Label>Select Stock</Label>
                  <StockSelect
                    value={selectedStock}
                    onChange={setSelectedStock}
                    exclude={excludedStocks}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Number of shares"
                    value={quantity}
                    onChange={e => setQuantity(e. target.value)}
                    min="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Purchase Price (Rs.)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Price per share"
                    value={purchasePrice}
                    onChange={e => setPurchasePrice(e. target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddStock}
                  disabled={loading || !selectedStock || !quantity || ! purchasePrice}
                >
                  {loading ? "Saving..." : "Add to Portfolio"}
                </Button>
                <Button
                  onClick={() => {
                    setShowAddForm(false)
                    setSelectedStock(null)
                    setQuantity("")
                    setPurchasePrice("")
                    setError("")
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Portfolio Holdings */}
        <Card>
          <CardHeader>
            <CardTitle>Holdings</CardTitle>
            <CardDescription>Your current stock positions</CardDescription>
          </CardHeader>
          <CardContent>
            {portfolio.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No stocks in your portfolio yet. </p>
                <p className="text-sm text-muted-foreground">Add your first stock to get started!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Symbol</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Quantity</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Avg.  Price</th>
                      <th className="text-right py-3 px-4 font-medium text-muted-foreground">Total Invested</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolio.map((stock, index) =>
                      stock ?  (
                        <tr key={stock.symbol + index} className="border-b hover:bg-muted/50 transition-colors">
                          <td className="py-4 px-4">
                            <Badge variant="outline" className="font-mono font-semibold">
                              {stock.symbol}
                            </Badge>
                          </td>
                          <td className="text-right py-4 px-4">{stock.quantity?. toLocaleString()}</td>
                          <td className="text-right py-4 px-4">
                            Rs. {stock.avgPurchasePrice?.toFixed(2) || stock.purchasePrice?.toFixed(2) || "0.00"}
                          </td>
                          <td className="text-right py-4 px-4 font-semibold">
                            Rs. {(stock.totalInvested || 0).toLocaleString("en-NP", { maximumFractionDigits: 2 })}
                          </td>
                          <td className="text-center py-4 px-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveStock(stock.symbol)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ) : null
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Portfolio