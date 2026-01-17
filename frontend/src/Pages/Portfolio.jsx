import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StockSelect from "@/components/StockSelect";
import { Plus, Trash2, TrendingUp, Wallet } from "lucide-react";
import { auth } from "@/firebase";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState("");

  const user = auth.currentUser;

  // Load portfolio from backend on mount
  useEffect(() => {
    if (user) loadPortfolio();
  }, [user]);

  const loadPortfolio = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/portfolio/${user.uid}`);
      if (response.ok) {
        const data = await response.json();
        // Filter out invalid entries
        setPortfolio((data.stocks || []).filter(s => s && s.symbol));
      } else {
        console.error("Failed to load portfolio");
      }
    } catch (err) {
      console.error("Error loading portfolio:", err);
    }
  };

  const handleAddStock = async () => {
    if (!selectedStock || !quantity || !purchasePrice) {
      setError("Please fill in all fields");
      return;
    }

    const qty = parseInt(quantity);
    const price = parseFloat(purchasePrice);

    if (qty <= 0 || price <= 0) {
      setError("Quantity and price must be positive numbers");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const stockPayload = { symbol: selectedStock, quantity: qty, purchasePrice: price };

      const exists = portfolio.find(s => s.symbol === selectedStock);
      const method = exists ? "PUT" : "POST";
      const url = exists
        ? `http://localhost:5000/api/portfolio/${user.uid}/stock/${selectedStock}`
        : `http://localhost:5000/api/portfolio/${user.uid}/stock`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stockPayload),
      });

      if (!response.ok) throw new Error(exists ? "Failed to update stock" : "Failed to add stock");

      // Reload portfolio to get updated backend values
      await loadPortfolio();

      setSelectedStock(null);
      setQuantity("");
      setPurchasePrice("");
      setShowAddForm(false);
    } catch (err) {
      console.error("Error adding/updating stock:", err);
      setError(err.message || "Failed to add/update stock");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveStock = async (symbol) => {
    if (!window.confirm(`Are you sure you want to remove ${symbol}?`)) return;

    try {
      const response = await fetch(`http://localhost:5000/api/portfolio/${user.uid}/stock/${symbol}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to remove stock");

      setPortfolio(prev => prev.filter(s => s.symbol !== symbol));
    } catch (err) {
      console.error("Error removing stock:", err);
      setError(err.message || "Failed to remove stock");
    }
  };

  const calculateTotalInvestment = () => {
    return portfolio.reduce((sum, s) => sum + (s.totalInvested || 0), 0);
  };

  const excludedStocks = portfolio.map(s => s.symbol).join(",");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Portfolio</h1>
          <p className="text-gray-600">Manage your stock holdings and track your investments</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Stocks</p>
                <p className="text-2xl font-bold text-gray-900">{portfolio.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Investment</p>
                <p className="text-2xl font-bold text-gray-900">
                  Rs. {calculateTotalInvestment().toLocaleString("en-NP", { maximumFractionDigits: 2 })}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Wallet className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Shares</p>
                <p className="text-2xl font-bold text-gray-900">
                  {portfolio.reduce((sum, s) => sum + (s.quantity || 0), 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Plus className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Add Stock Section */}
        {!showAddForm ? (
          <Button onClick={() => setShowAddForm(true)} className="mb-6 w-full md:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Add New Stock
          </Button>
        ) : (
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Add Stock to Portfolio</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <StockSelect
                label="Select Stock"
                value={selectedStock}
                onChange={setSelectedStock}
                exclude={excludedStocks}
              />

              <Card className="p-4">
                <label className="text-sm mb-2 font-medium block">Quantity</label>
                <input
                  type="number"
                  placeholder="Enter number of shares"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </Card>

              <Card className="p-4">
                <label className="text-sm mb-2 font-medium block">Purchase Price</label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={purchasePrice}
                  onChange={e => setPurchasePrice(e.target.value)}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </Card>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleAddStock}
                disabled={loading || !selectedStock || !quantity || !purchasePrice}
                className="flex-1"
              >
                {loading ? "Saving..." : "Add to Portfolio"}
              </Button>
              <Button
                onClick={() => {
                  setShowAddForm(false);
                  setSelectedStock(null);
                  setQuantity("");
                  setPurchasePrice("");
                  setError("");
                }}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </Card>
        )}

        {/* Portfolio Holdings */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Holdings</h2>
          {portfolio.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No stocks in your portfolio yet. Add your first stock to get started!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Symbol</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Quantity</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Avg. Price</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Total Invested</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map((stock, index) =>
                    stock ? (
                      <tr key={stock.symbol + index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4 font-mono font-semibold text-gray-900">{stock.symbol}</td>
                        <td className="text-right py-4 px-4 text-gray-700">{stock.quantity?.toLocaleString()}</td>
                        <td className="text-right py-4 px-4 text-gray-700">
                          Rs. {stock.avgPurchasePrice?.toFixed(2) || 0}
                        </td>
                        <td className="text-right py-4 px-4 font-semibold text-gray-900">
                          Rs. {(stock.totalInvested || 0).toLocaleString("en-NP", { maximumFractionDigits: 2 })}
                        </td>
                        <td className="text-center py-4 px-4">
                          <button
                            onClick={() => handleRemoveStock(stock.symbol)}
                            className="text-red-600 hover:text-red-800 p-2 rounded-md hover:bg-red-50 transition-colors"
                            title="Remove stock"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;
