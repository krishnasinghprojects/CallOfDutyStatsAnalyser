import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function LandingPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleGetStarted = () => {
    router.push('/form')
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Primary Meta Tags */}
        <title>CODM Stats Analyzer - AI-Powered Call of Duty Mobile Stats Analysis</title>
        <meta name="title" content="CODM Stats Analyzer - AI-Powered Call of Duty Mobile Stats Analysis" />
        <meta name="description" content="Analyze your Call of Duty Mobile gameplay with AI. Upload screenshots and get detailed stats, performance ratings, and tactical insights instantly." />
        <meta name="keywords" content="CODM, Call of Duty Mobile, stats analyzer, gaming stats, AI analysis, gameplay analysis, K/D ratio, CODM tracker" />
        <meta name="author" content="Krishna Singh" />
        
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="shortcut icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codm.krishnasingh.live/" />
        <meta property="og:title" content="CODM Stats Analyzer - AI-Powered Call of Duty Mobile Stats Analysis" />
        <meta property="og:description" content="Analyze your Call of Duty Mobile gameplay with AI. Upload screenshots and get detailed stats, performance ratings, and tactical insights instantly." />
        <meta property="og:image" content="https://ik.imagekit.io/krishnasingh/ProjectsSS/CODMSS.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="CODM Stats Analyzer" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://codm.krishnasingh.live/" />
        <meta property="twitter:title" content="CODM Stats Analyzer - AI-Powered Call of Duty Mobile Stats Analysis" />
        <meta property="twitter:description" content="Analyze your Call of Duty Mobile gameplay with AI. Upload screenshots and get detailed stats, performance ratings, and tactical insights instantly." />
        <meta property="twitter:image" content="https://ik.imagekit.io/krishnasingh/ProjectsSS/CODMSS.jpg" />
        
        {/* WhatsApp */}
        <meta property="og:image:alt" content="CODM Stats Analyzer - AI-Powered Gaming Analytics" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#FFD700" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://codm.krishnasingh.live/" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Black+Ops+One&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      <div className="min-h-screen relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cod-gold/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cod-gold/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8">
          <div className={`max-w-7xl w-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Main Content */}
            <div className="text-center mb-16">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cod-gold/10 border border-cod-gold/30 rounded-full mb-8 animate-entry">
                <div className="w-2 h-2 bg-cod-gold rounded-full animate-pulse"></div>
                <span className="text-cod-gold text-xs font-bold uppercase tracking-widest">AI-Powered Analysis</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading text-white uppercase tracking-wider mb-6 animate-entry delay-100">
                CODM <span className="text-cod-gold text-glow">Stats</span>
                <br />
                <span className="text-cod-gold text-glow">Analyzer</span>
              </h1>

              {/* Subheading */}
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 animate-entry delay-200 leading-relaxed">
                Upload your Call of Duty Mobile screenshots and get instant AI-powered analysis of your gameplay performance, stats, and tactical recommendations
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-entry delay-300">
                <button
                  onClick={handleGetStarted}
                  className="group relative px-8 py-4 bg-gradient-to-r from-cod-gold to-yellow-600 text-black font-heading text-lg uppercase tracking-wider rounded-lg overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:shadow-[0_0_50px_rgba(255,215,0,0.6)] transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-cod-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center gap-3">
                    <i className="fa-solid fa-rocket"></i>
                    Try It Now - Free
                    <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                  </span>
                </button>

                <button
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-black/60 border-2 border-cod-gold/50 text-cod-gold font-heading text-lg uppercase tracking-wider rounded-lg hover:bg-cod-gold/10 hover:border-cod-gold transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center gap-3">
                    <i className="fa-solid fa-circle-info"></i>
                    Learn More
                  </span>
                </button>
              </div>

              {/* Stats Counter */}
              <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20 animate-entry delay-300">
                <div className="glass-panel rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-heading text-cod-gold mb-2">AI</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Powered</div>
                </div>
                <div className="glass-panel rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-heading text-cod-gold mb-2">2</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Analysis Types</div>
                </div>
                <div className="glass-panel rounded-xl p-6 hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl font-heading text-cod-gold mb-2">Free</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">To Use</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <i className="fa-solid fa-chevron-down text-cod-gold text-2xl"></i>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cod-gold/10 border border-cod-gold/30 rounded-full mb-6">
                <i className="fa-solid fa-star text-cod-gold"></i>
                <span className="text-cod-gold text-xs font-bold uppercase tracking-widest">Features</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-heading text-white uppercase tracking-wider mb-4">
                Why Choose <span className="text-cod-gold text-glow">Our Analyzer</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Advanced AI technology meets gaming analytics
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="glass-panel rounded-xl p-8 hover:scale-105 transition-all duration-300 group border-t-2 border-t-cod-gold/50">
                <div className="w-16 h-16 bg-cod-gold/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cod-gold/30 transition-colors">
                  <i className="fa-solid fa-brain text-3xl text-cod-gold"></i>
                </div>
                <h3 className="text-xl font-heading text-white uppercase mb-3 group-hover:text-cod-gold transition-colors">
                  AI-Powered Analysis
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Advanced Google Gemini AI extracts and analyzes your stats with incredible accuracy from screenshots
                </p>
              </div>

              {/* Feature 2 */}
              <div className="glass-panel rounded-xl p-8 hover:scale-105 transition-all duration-300 group border-t-2 border-t-cod-gold/50">
                <div className="w-16 h-16 bg-cod-gold/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cod-gold/30 transition-colors">
                  <i className="fa-solid fa-chart-line text-3xl text-cod-gold"></i>
                </div>
                <h3 className="text-xl font-heading text-white uppercase mb-3 group-hover:text-cod-gold transition-colors">
                  Detailed Insights
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Get comprehensive breakdowns of K/D ratio, accuracy, MVP rate, and hidden performance metrics
                </p>
              </div>

              {/* Feature 3 */}
              <div className="glass-panel rounded-xl p-8 hover:scale-105 transition-all duration-300 group border-t-2 border-t-cod-gold/50">
                <div className="w-16 h-16 bg-cod-gold/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cod-gold/30 transition-colors">
                  <i className="fa-solid fa-trophy text-3xl text-cod-gold"></i>
                </div>
                <h3 className="text-xl font-heading text-white uppercase mb-3 group-hover:text-cod-gold transition-colors">
                  Seasonal Analysis
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Track your seasonal rank progress and weapon performance with dedicated seasonal analysis mode
                </p>
              </div>

              {/* Feature 4 */}
              <div className="glass-panel rounded-xl p-8 hover:scale-105 transition-all duration-300 group border-t-2 border-t-cod-gold/50">
                <div className="w-16 h-16 bg-cod-gold/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cod-gold/30 transition-colors">
                  <i className="fa-solid fa-dna text-3xl text-cod-gold"></i>
                </div>
                <h3 className="text-xl font-heading text-white uppercase mb-3 group-hover:text-cod-gold transition-colors">
                  Playstyle DNA
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Discover your unique playstyle personality with AI-generated traits and recommendations
                </p>
              </div>

              {/* Feature 5 */}
              <div className="glass-panel rounded-xl p-8 hover:scale-105 transition-all duration-300 group border-t-2 border-t-cod-gold/50">
                <div className="w-16 h-16 bg-cod-gold/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cod-gold/30 transition-colors">
                  <i className="fa-solid fa-share-nodes text-3xl text-cod-gold"></i>
                </div>
                <h3 className="text-xl font-heading text-white uppercase mb-3 group-hover:text-cod-gold transition-colors">
                  Share Results
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Generate shareable links to show off your stats and achievements with friends and clan members
                </p>
              </div>

              {/* Feature 6 */}
              <div className="glass-panel rounded-xl p-8 hover:scale-105 transition-all duration-300 group border-t-2 border-t-cod-gold/50">
                <div className="w-16 h-16 bg-cod-gold/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-cod-gold/30 transition-colors">
                  <i className="fa-solid fa-shield-halved text-3xl text-cod-gold"></i>
                </div>
                <h3 className="text-xl font-heading text-white uppercase mb-3 group-hover:text-cod-gold transition-colors">
                  Secure & Private
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Your data is processed securely with Firebase authentication and never shared with third parties
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="relative py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cod-gold/10 border border-cod-gold/30 rounded-full mb-6">
                <i className="fa-solid fa-lightbulb text-cod-gold"></i>
                <span className="text-cod-gold text-xs font-bold uppercase tracking-widest">How It Works</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-heading text-white uppercase tracking-wider mb-4">
                Get Started in <span className="text-cod-gold text-glow">3 Steps</span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Simple, fast, and powerful analysis in minutes
              </p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="relative overflow-visible">
                <div className="glass-panel rounded-xl p-8 hover:scale-105 transition-all duration-300 border-t-2 border-t-cod-gold/50">
                  <div className="absolute -top-6 z-50 left-8 w-12 h-12 bg-cod-gold rounded-full flex items-center justify-center font-heading text-2xl text-black shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                    1
                  </div>
                  <div className="mt-8">
                    <div className="w-16 h-16 bg-cod-gold/20 rounded-lg flex items-center justify-center mb-6">
                      <i className="fa-solid fa-camera text-3xl text-cod-gold"></i>
                    </div>
                    <h3 className="text-2xl font-heading text-white uppercase mb-3">
                      Upload Screenshots
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      Take screenshots of your CODM profile and stats pages, then upload them to our analyzer
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="glass-panel rounded-xl p-8 hover:scale-105 transition-all duration-300 border-t-2 border-t-cod-gold/50">
                  <div className="absolute -top-6 left-8 w-12 h-12 bg-cod-gold rounded-full flex items-center justify-center font-heading text-2xl text-black shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                    2
                  </div>
                  <div className="mt-8">
                    <div className="w-16 h-16 bg-cod-gold/20 rounded-lg flex items-center justify-center mb-6">
                      <i className="fa-solid fa-wand-magic-sparkles text-3xl text-cod-gold"></i>
                    </div>
                    <h3 className="text-2xl font-heading text-white uppercase mb-3">
                      AI Analysis
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      Our AI processes your images and extracts all stats, performance metrics, and insights
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="glass-panel rounded-xl p-8 hover:scale-105 transition-all duration-300 border-t-2 border-t-cod-gold/50">
                  <div className="absolute -top-6 left-8 w-12 h-12 bg-cod-gold rounded-full flex items-center justify-center font-heading text-2xl text-black shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                    3
                  </div>
                  <div className="mt-8">
                    <div className="w-16 h-16 bg-cod-gold/20 rounded-lg flex items-center justify-center mb-6">
                      <i className="fa-solid fa-chart-pie text-3xl text-cod-gold"></i>
                    </div>
                    <h3 className="text-2xl font-heading text-white uppercase mb-3">
                      View Dashboard
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      Get your personalized dashboard with detailed stats, ratings, and tactical recommendations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Analysis Types Section */}
        <section className="relative py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-cod-gold/10 border border-cod-gold/30 rounded-full mb-6">
                <i className="fa-solid fa-layer-group text-cod-gold"></i>
                <span className="text-cod-gold text-xs font-bold uppercase tracking-widest">Analysis Types</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-heading text-white uppercase tracking-wider mb-4">
                Choose Your <span className="text-cod-gold text-glow">Analysis</span>
              </h2>
            </div>

            {/* Analysis Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Overall Analysis */}
              <div className="glass-panel rounded-xl p-8 hover:scale-105 transition-all duration-300 border-t-4 border-t-cod-gold group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-cod-gold/20 rounded-lg flex items-center justify-center group-hover:bg-cod-gold/30 transition-colors">
                    <i className="fa-solid fa-chart-line text-3xl text-cod-gold"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading text-white uppercase group-hover:text-cod-gold transition-colors">
                      Overall Analysis
                    </h3>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">2 Screenshots</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3 text-gray-400">
                    <i className="fa-solid fa-check text-cod-gold mt-1"></i>
                    <span>Complete profile and stats analysis</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-400">
                    <i className="fa-solid fa-check text-cod-gold mt-1"></i>
                    <span>K/D ratio, accuracy, and MVP rate</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-400">
                    <i className="fa-solid fa-check text-cod-gold mt-1"></i>
                    <span>AI performance rating and playstyle DNA</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-400">
                    <i className="fa-solid fa-check text-cod-gold mt-1"></i>
                    <span>Tactical briefing with recommendations</span>
                  </li>
                </ul>
                <div className="text-sm text-gray-500 italic">
                  Upload: Profile page + Stats page
                </div>
              </div>

              {/* Seasonal Analysis */}
              <div className="glass-panel rounded-xl p-8 hover:scale-105 transition-all duration-300 border-t-4 border-t-purple-500 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                    <i className="fa-solid fa-trophy text-3xl text-purple-400"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading text-white uppercase group-hover:text-purple-400 transition-colors">
                      Seasonal Analysis
                    </h3>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">4 Screenshots</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3 text-gray-400">
                    <i className="fa-solid fa-check text-purple-400 mt-1"></i>
                    <span>Seasonal rank and progression tracking</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-400">
                    <i className="fa-solid fa-check text-purple-400 mt-1"></i>
                    <span>Top 3 weapon performance analysis</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-400">
                    <i className="fa-solid fa-check text-purple-400 mt-1"></i>
                    <span>Matches played, wins, and K/D per season</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-400">
                    <i className="fa-solid fa-check text-purple-400 mt-1"></i>
                    <span>Weapon usage statistics and insights</span>
                  </li>
                </ul>
                <div className="text-sm text-gray-500 italic">
                  Upload: Rank page + 3 weapon pages
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel rounded-2xl p-12 md:p-16 text-center border-t-4 border-t-cod-gold relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cod-gold/10 to-transparent pointer-events-none"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-heading text-white uppercase tracking-wider mb-6">
                  Ready to <span className="text-cod-gold text-glow">Analyze</span>?
                </h2>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                  Join thousands of CODM players who have discovered their true potential with AI-powered stats analysis
                </p>
                <button
                  onClick={handleGetStarted}
                  className="group relative px-10 py-5 bg-gradient-to-r from-cod-gold to-yellow-600 text-black font-heading text-xl uppercase tracking-wider rounded-lg overflow-hidden shadow-[0_0_40px_rgba(255,215,0,0.4)] hover:shadow-[0_0_60px_rgba(255,215,0,0.7)] transition-all duration-300 hover:scale-110"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-cod-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center gap-3">
                    <i className="fa-solid fa-rocket"></i>
                    Start Analyzing Now
                    <i className="fa-solid fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
                  </span>
                </button>
                <p className="text-sm text-gray-500 mt-6">
                  <i className="fa-solid fa-lock mr-2"></i>
                  100% Free • No Credit Card Required • Secure & Private
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative py-12 px-4 md:px-8 border-t border-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Brand */}
              <div>
                <h3 className="text-2xl font-heading text-cod-gold uppercase mb-4">
                  CODM Analyzer
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  AI-powered Call of Duty Mobile stats analyzer providing detailed performance insights and tactical recommendations.
                </p>
              </div>

              {/* Quick Links */}
              <div>
               
              </div>

              {/* Developer */}
              <div>
                <h4 className="text-white font-heading uppercase mb-4 text-sm tracking-wider">
                  Developer
                </h4>
                <p className="text-gray-400 text-sm mb-3">
                  Created by <span className="text-white font-semibold">Krishna Singh</span>
                </p>
                <div className="flex gap-4">
                  <a href="https://github.com/krishnasinghprojects" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cod-gold transition text-xl">
                    <i className="fa-brands fa-github"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/krishnasinghprojects" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cod-gold transition text-xl">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://www.instagram.com/krishnasinghprojects" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cod-gold transition text-xl">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                  <a href="mailto:krishnasinghprojects@gmail.com" className="text-gray-400 hover:text-cod-gold transition text-xl">
                    <i className="fa-solid fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="pt-8 border-t border-gray-800 text-center">
              <p className="text-gray-500 text-xs font-mono">
                © 2025 CODM Stats Analyzer. All rights reserved. | Made by Krishna Singh
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
