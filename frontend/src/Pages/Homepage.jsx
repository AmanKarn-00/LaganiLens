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
  Wallet,
  Briefcase,
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
              {user?.email && (
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
        <div className="grid gap-4 md:grid-cols-3 mb-8">
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* My Portfolio - NEW */}
          <Card className="group hover:shadow-lg transition-all duration-200 border-primary/20 hover:border-primary/40">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">My Portfolio</CardTitle>
                  <CardDescription>
                    Manage your investments
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Track your stock holdings, monitor investments, and manage your NEPSE portfolio in one place.
              </p>
              <Button 
                onClick={() => navigate("/portfolio")}
                className="w-full"
              >
                View Portfolio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* ML Predictions */}
          <Card className="group hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Brain className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">ML Predictions</CardTitle>
                  <CardDescription>
                    AI-powered forecasts
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Explore machine learning predictions and trend analysis for NEPSE stocks using ARIMA forecasting.
              </p>
              <Button 
                onClick={() => navigate("/predictstock")}
                variant="secondary"
                className="w-full"
              >
                View Predictions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Compare Stocks */}
          <Card className="group hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <GitCompare className="h-5 w-5 text-emerald-500" />
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
                Compare NEPSE stocks using key metrics like price, volume, and 52-week performance.
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

          {/* NEPSE Data Analysis */}
          <Card className="group hover:shadow-lg transition-all duration-200">
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
                Access historical NEPSE data and perform comprehensive market analysis.
              </p>
              <Button 
                variant="secondary"
                className="w-full"
              >
                View Data
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="group hover:shadow-lg transition-all duration-200">
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
                View the most successful investors ranked by portfolio performance.
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

          {/* Quick Stats */}
          <Card className="group hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-rose-500/10">
                  <Wallet className="h-5 w-5 text-rose-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Investment Tips</CardTitle>
                  <CardDescription>
                    Learn & grow
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Get insights and tips for better investment decisions in the NEPSE market.
              </p>
              <Button 
                onClick={() => navigate("/about")}
                variant="outline"
                className="w-full"
              >
                Learn More
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