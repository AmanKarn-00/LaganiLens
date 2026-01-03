import hero from '../Assets/hero.png'
import hero2 from '../Assets/hero2.png'
import { useNavigate } from 'react-router'
export default function Body(){
    const navigate=useNavigate();

    const handlebutton = () =>{
        navigate('/signup')
    }
    return(
        <>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden min-h-screen"> 
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
            
            <div className='max-w-7xl flex flex-col md:flex-row items-center min-h-screen px-4 sm:px-6 lg:px-8 py-12 md:py-0 justify-between mx-auto gap-8 relative z-10'>  
                {/* Text Content */}
                <div className='flex-1 space-y-6 md:space-y-8 animate-slide-in-left'>
                    <div className="inline-block mb-4">
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent text-sm font-semibold uppercase tracking-wider">
                            Academic AI/ML Project
                        </span>
                    </div>
                    <h1 className='font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-tight'>
                        LaganiLens: AI-Powered <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse">NEPSE Market Analysis</span>
                    </h1>
                    <p className='text-gray-700 text-lg md:text-xl leading-relaxed max-w-2xl'>
                        An academic AI/ML project focused on acquiring historical NEPSE (Nepal Stock Exchange) data, preprocessing it, and applying machine learning techniques to analyze trends and make predictions.
                    </p>
                    <p className='text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl'>
                        Explore the end-to-end pipeline of a real-world data science project with Nepali stock market data.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button 
                            onClick={handlebutton} 
                            className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Get Started Now 
                                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                            <div className="absolute inset-0 shimmer"></div>
                        </button>
                        <button 
                            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
                {/* Hero Image */}
                <div className="flex-1 flex justify-center items-center animate-slide-in-right">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-30 animate-pulse-glow"></div>
                        <img 
                            src={hero} 
                            alt='hero image' 
                            className='relative max-w-full h-auto max-h-[500px] md:max-h-[600px] object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500' 
                        />
                    </div>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section className='bg-gradient-to-b from-white to-gray-50 py-20 md:py-32 relative overflow-hidden'>
            <div className="absolute inset-0 bg-grid-pattern opacity-3"></div>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
                <div className='text-center mb-16'>
                    <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
                        Project <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Objectives</span>
                    </h2>
                    <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
                        Comprehensive learning objectives for mastering data science with NEPSE market data
                    </p>
                </div>
                
                <div className='grid md:grid-cols-2 gap-12 items-center'>
                    {/* Image */}
                    <div className='order-2 md:order-1 animate-fade-in'>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                            <img 
                                src={hero2} 
                                className='relative max-w-full h-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500' 
                                alt="NEPSE Data Analysis"
                            />
                        </div>
                    </div>
                    
                    {/* Features Card */}
                    <div className='order-1 md:order-2 space-y-6'>
                        <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:border-blue-200'>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform">
                                    📊
                                </div>
                                <div className="flex-1">
                                    <h3 className='font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors'>
                                        Data Acquisition
                                    </h3>
                                    <p className='text-gray-600 leading-relaxed'>
                                        Learn web scraping and API-based data acquisition for historical NEPSE stock market data.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:border-blue-200'>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform">
                                    💾
                                </div>
                                <div className="flex-1">
                                    <h3 className='font-bold text-xl text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors'>
                                        Data Management
                                    </h3>
                                    <p className='text-gray-600 leading-relaxed'>
                                        Store and manage historical NEPSE stock market data efficiently for analysis and modeling.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:border-blue-200'>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform">
                                    🔍
                                </div>
                                <div className="flex-1">
                                    <h3 className='font-bold text-xl text-gray-900 mb-2 group-hover:text-purple-600 transition-colors'>
                                        Data Preprocessing & EDA
                                    </h3>
                                    <p className='text-gray-600 leading-relaxed'>
                                        Perform comprehensive data cleaning, preprocessing, and exploratory data analysis to understand market patterns.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:border-blue-200'>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform">
                                    🤖
                                </div>
                                <div className="flex-1">
                                    <h3 className='font-bold text-xl text-gray-900 mb-2 group-hover:text-pink-600 transition-colors'>
                                        Machine Learning Models
                                    </h3>
                                    <p className='text-gray-600 leading-relaxed'>
                                        Apply advanced ML techniques for trend analysis and price prediction on NEPSE market data.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className='bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:border-blue-200'>
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform">
                                    ⚠️
                                </div>
                                <div className="flex-1">
                                    <h3 className='font-bold text-xl text-gray-900 mb-2 group-hover:text-amber-600 transition-colors'>
                                        Understanding Limitations
                                    </h3>
                                    <p className='text-gray-600 leading-relaxed'>
                                        Explore the challenges and limitations of predicting stock markets, especially in the context of NEPSE.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}