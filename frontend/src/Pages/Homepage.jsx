import { auth } from '../firebase'
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import {
  BarChart3,
  Brain,
  GitCompare,
  Trophy,
  TrendingUp,
  Database,
  ArrowRight,
  User,
  Briefcase,
  CandlestickChart,
  LineChart,
} from "lucide-react"

const Homepage = () => {
  const user = auth.currentUser
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">
                Dashboard
              </h1>
              {user?. email && (
                <p className="text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user.email}
                </p>
              )}
            </div>
            <Badge variant="secondary" className="text-sm px-4 py-1">
              NEPSE Analytics
            </Badge>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Stats Grid */}
        <div className="grid gap-4 md: grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Points</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3+ Years</div>
              <p className="text-xs text-muted-foreground">Historical records</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ML Models</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">ARIMA</div>
              <p className="text-xs text-muted-foreground">Active prediction model</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Predictions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">30 Days</div>
              <p className="text-xs text-muted-foreground">Forecast horizon</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Grid */}
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Stock Analysis - Candlestick Charts */}
          <Card className="group hover:shadow-lg transition-all duration-200 border-emerald-500/20 hover:border-emerald-500/40">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <CandlestickChart className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Stock Analysis</CardTitle>
                  <CardDescription>
                    Technical charts & indicators
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Professional candlestick charts with volume, MA 120 & MA 180 indicators for NEPSE stocks. 
              </p>
              <Button 
                onClick={() => navigate("/analysis")}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                View Charts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* AI Predictions */}
          <Card className="group hover:shadow-lg transition-all duration-200 border-indigo-500/20 hover: border-indigo-500/40">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10">
                  <Brain className="h-5 w-5 text-indigo-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI Predictions</CardTitle>
                  <CardDescription>
                    30-day price forecasts
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Machine learning powered price predictions using ARIMA model for any NEPSE stock.
              </p>
              <Button 
                onClick={() => navigate("/predictstock")}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                Get Predictions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Compare Stocks */}
          <Card className="group hover:shadow-lg transition-all duration-200 border-cyan-500/20 hover:border-cyan-500/40">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10">
                  <GitCompare className="h-5 w-5 text-cyan-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Compare Stocks</CardTitle>
                  <CardDescription>
                    Side-by-side analysis
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Compare two NEPSE stocks using key metrics like price, volume, and 52-week performance.
              </p>
              <Button 
                onClick={() => navigate("/comparestocks")}
                variant="secondary"
                className="w-full"
              >
                Compare Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* My Portfolio */}
          <Card className="group hover:shadow-lg transition-all duration-200 border-violet-500/20 hover:border-violet-500/40">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-violet-500/10">
                  <Briefcase className="h-5 w-5 text-violet-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">My Portfolio</CardTitle>
                  <CardDescription>
                    Track your investments
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Manage your stock holdings, track performance, and calculate profit/loss in real-time.
              </p>
              <Button 
                onClick={() => navigate("/portfolio")}
                variant="secondary"
                className="w-full"
              >
                View Portfolio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="group hover: shadow-lg transition-all duration-200 border-amber-500/20 hover:border-amber-500/40">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Trophy className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Leaderboard</CardTitle>
                  <CardDescription>
                    Top performers
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                See how your portfolio ranks against other investors based on net profit. 
              </p>
              <Button 
                onClick={() => navigate("/leaderboard")}
                variant="secondary"
                className="w-full"
              >
                View Rankings
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Market Data */}
          <Card className="group hover:shadow-lg transition-all duration-200 border-blue-500/20 hover:border-blue-500/40">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <BarChart3 className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Market Data</CardTitle>
                  <CardDescription>
                    Historical analytics
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Access 3+ years of historical NEPSE data with price trends and volume analysis.
              </p>
              <Button 
                onClick={() => navigate("/analysis")}
                variant="secondary"
                className="w-full"
              >
                Explore Data
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
          <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
            ⚠️ <strong>Disclaimer:</strong> This is an educational project.  Predictions are for learning purposes only. 
            Do NOT use for actual investment decisions. 
          </p>
        </div>
      </div>
    </div>
  )
}

export default Homepage