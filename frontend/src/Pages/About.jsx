import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Database,
  LineChart,
  Brain,
  Search,
  AlertTriangle,
  Cpu,
  Server,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"

const About = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="mb-4 -ml-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="text-center">
            <Badge className="mb-4">Academic AI / ML Project</Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              About <span className="text-primary">LaganiLens</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              An academic project exploring the Nepal Stock Exchange using modern
              data science and machine learning techniques. 
            </p>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              LaganiLens focuses on acquiring historical NEPSE (Nepal Stock
              Exchange) data, preprocessing it, and applying machine learning
              techniques to analyze trends and patterns. 
            </p>
            <p>
              The goal is to understand the complete pipeline of a real-world
              data science project — from data collection and cleaning to
              exploratory analysis and predictive modeling — using Nepali stock
              market data.
            </p>
          </CardContent>
        </Card>

        {/* Objectives */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">What This Project Covers</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <ObjectiveCard
              icon={<Database className="h-5 w-5" />}
              title="Data Acquisition"
              desc="Collect historical NEPSE data using web scraping and APIs."
            />
            <ObjectiveCard
              icon={<Search className="h-5 w-5" />}
              title="Data Cleaning & EDA"
              desc="Preprocess data and perform exploratory analysis to uncover patterns."
            />
            <ObjectiveCard
              icon={<LineChart className="h-5 w-5" />}
              title="Market Analysis"
              desc="Analyze trends, volatility, and stock behavior in NEPSE."
            />
            <ObjectiveCard
              icon={<Brain className="h-5 w-5" />}
              title="Machine Learning"
              desc="Apply ML models for trend analysis and price prediction."
            />
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Cpu className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Frontend</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  React, Tailwind CSS, shadcn/ui, Firebase Authentication
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Server className="h-5 w-5 text-purple-500" />
                </div>
                <CardTitle className="text-lg">Backend</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Node.js, Express, MongoDB, Mongoose
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Brain className="h-5 w-5 text-emerald-500" />
                </div>
                <CardTitle className="text-lg">Data Science</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Python, ARIMA, Pandas, NumPy, Statsmodels
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Database className="h-5 w-5 text-amber-500" />
                </div>
                <CardTitle className="text-lg">Data Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Scrapy, Web Scraping, ShareSansar API
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Disclaimer */}
        <Card className="border-amber-500/50 bg-amber-500/5">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <CardTitle>Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed">
            <strong>Important: </strong> This is an academic project intended
            solely for educational purposes. Stock market predictions are
            inherently uncertain and should not be used as the sole basis for
            investment decisions. 
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Button size="lg" onClick={() => navigate("/signup")}>
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

function ObjectiveCard({ icon, title, desc }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{desc}</p>
      </CardContent>
    </Card>
  )
}

export default About