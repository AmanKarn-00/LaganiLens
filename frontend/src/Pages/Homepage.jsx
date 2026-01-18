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
            <Badge variant="secondary" className="text-sm">
              NEPSE Analytics
            </Badge>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Points</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">--</div>
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
        <div className="grid gap-6 md:grid-cols-2">
          
          {/* NEPSE Data Analysis */}
          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>NEPSE Data Analysis</CardTitle>
                  <CardDescription>
                    Access historical NEPSE data and analytics
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Explore historical NEPSE data, perform analysis, and track market trends with comprehensive data visualization.
              </p>
              <Button className="w-full sm:w-auto">
                View Data
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* ML Predictions */}
          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Brain className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <CardTitle>ML Predictions</CardTitle>
                  <CardDescription>
                    AI-powered stock price forecasts
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Explore machine learning model predictions and trend analysis for NEPSE stocks using ARIMA forecasting.
              </p>
              <Button 
                onClick={() => navigate("/predictstock")}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                View Predictions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Compare Stocks */}
          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <GitCompare className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <CardTitle>Compare Stocks</CardTitle>
                  <CardDescription>
                    Side-by-side stock comparison
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Compare NEPSE stocks using key financial metrics like price, volume, P/E ratio, and 52-week performance. 
              </p>
              <Button 
                onClick={() => navigate("/comparestocks")}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Compare Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Trophy className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <CardTitle>Leaderboard</CardTitle>
                  <CardDescription>
                    Top performing users
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View the most successful investors ranked by portfolio performance and net profit.
              </p>
              <Button 
                onClick={() => navigate("/leaderboard")}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                View Leaderboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}

export default Homepage