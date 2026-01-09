import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'

const Homepage = () => {
  const user = auth.currentUser
  const [stats, setStats] = useState({
    dataPoints: "--",
    mlModels: "--",
    predictions: "--"
  })

  // Algorithm to "fill the empty boxes"
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        // In a real scenario, you would fetch from your Python/Node backend 
        // that scrapes MeroLagani or NEPSE
        // const response = await fetch('https://your-api.com/scrape/stats');
        // const data = await response.json();
        
        // Simulating the data arrival
        setStats({
          dataPoints: "54.2k",
          mlModels: "12",
          predictions: "850"
        })
      } catch (error) {
        console.error("Failed to fetch market stats", error)
      }
    }

    fetchMarketData()
  }, [])

  // Helper to extract username from email
  const getUsername = (email) => {
    if (!email) return "Investor"
    return email.split('@')[0]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:to-slate-900 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Welcome Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20 dark:border-gray-700 animate-fade-in">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome, {getUsername(user?.email)}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {user?.email}
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
              NEPSE Analytics
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            label="Data Points" 
            value={stats.dataPoints} 
            sub="Historical records" 
            icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            color="from-blue-500 to-blue-600"
          />
          <StatCard 
            label="ML Models" 
            value={stats.mlModels} 
            sub="Active models" 
            icon="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            color="from-indigo-500 to-indigo-600"
            delay="0.1s"
          />
          <StatCard 
            label="Predictions" 
            value={stats.predictions} 
            sub="Forecasts generated" 
            icon="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            color="from-purple-500 to-purple-600"
            delay="0.2s"
          />
        </div>

        {/* ... Rest of Main Content Area (View Data / View Predictions) ... */}
      </div>
    </div>
  )
}

// Sub-component for clean code
const StatCard = ({ label, value, sub, icon, color, delay }) => (
  <div style={{animationDelay: delay}} className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{label}</p>
        <p className={`text-4xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent transition-all`}>
          {value}
        </p>
        <p className="text-xs text-gray-500 mt-1">{sub}</p>
      </div>
      <div className={`bg-gradient-to-br ${color} p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
        </svg>
      </div>
    </div>
  </div>
)

export default Homepage