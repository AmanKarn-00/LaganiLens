import React from 'react'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            About <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">LaganiLens</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            An academic AI/ML project exploring the Nepal Stock Exchange through data science
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 space-y-10 border border-white/20 animate-fade-in">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              LaganiLens is an academic AI/ML project focused on acquiring historical NEPSE (Nepal Stock Exchange) data, 
              preprocessing it, and applying machine learning techniques to analyze trends and make predictions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The primary objective of this project is to understand the end-to-end pipeline of a real-world data science 
              project, including data acquisition (web scraping / APIs), data cleaning, exploratory analysis, and model 
              building using Nepali stock market data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">🚀</span>
              <span>Objectives</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200 hover:shadow-lg transition-all group">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <p className="text-gray-700 leading-relaxed">Learn web scraping and API-based data acquisition for NEPSE data</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 rounded-xl border border-indigo-200 hover:shadow-lg transition-all group">
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                  </div>
                  <p className="text-gray-700 leading-relaxed">Store and manage historical NEPSE stock market data</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200 hover:shadow-lg transition-all group">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 leading-relaxed">Perform data preprocessing and exploratory data analysis (EDA)</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-5 rounded-xl border border-pink-200 hover:shadow-lg transition-all group">
                <div className="flex items-start gap-3">
                  <div className="bg-pink-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 leading-relaxed">Apply machine learning models for trend analysis and price prediction</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-xl border border-amber-200 hover:shadow-lg transition-all group md:col-span-2">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-gray-700 leading-relaxed">Understand challenges and limitations of predicting stock markets, especially in the context of NEPSE</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">💻</span>
              <span>Technology Stack</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-white">
                <h3 className="font-bold text-xl mb-3">Frontend</h3>
                <p className="text-blue-50">React, Tailwind CSS, Firebase Authentication</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-white">
                <h3 className="font-bold text-xl mb-3">Data Science</h3>
                <p className="text-indigo-50">Python, Machine Learning, Data Analysis</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">⚠️</span>
              <span>Disclaimer</span>
            </h2>
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500 p-6 rounded-xl shadow-md">
              <p className="text-gray-800 leading-relaxed">
                <strong className="text-yellow-800">Important:</strong> This is an academic project for educational purposes. Stock market predictions 
                are inherently uncertain and should not be used as the sole basis for investment decisions. Always consult 
                with financial advisors and conduct your own research before making any investment decisions.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default About
