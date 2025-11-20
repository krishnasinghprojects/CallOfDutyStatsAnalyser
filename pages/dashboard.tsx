import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { auth } from '@/lib/firebase'

// Dynamically import Chart component to avoid SSR issues
const RadarChart = dynamic(() => import('@/components/RadarChart'), { ssr: false })

interface DashboardData {
  type?: 'overall' | 'seasonal'
  header?: any
  profile?: any
  combatRecord?: any
  hiddenStats?: any
  aiRating?: any
  playstyleDNA?: any
  objectives?: any
  radarChart?: any
  tacticalBriefing?: any
  // Seasonal data
  player_info?: any
  seasonal_data?: any
  weapon_usage_stats?: any
  ai_insights?: any
}

export default function DashboardPage() {
  const router = useRouter()
  const [data, setData] = useState<DashboardData | null>(null)
  const [shareUrl, setShareUrl] = useState<string>('')
  const [showCopied, setShowCopied] = useState(false)
  const dashboardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedData = localStorage.getItem('analysisData')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setData(parsedData)
    } else {
      router.push('/form')
    }
  }, [router])

  // Generate share URL on mount
  useEffect(() => {
    const generateShareUrl = async () => {
      if (!data) return
      try {
        const userId = auth.currentUser?.uid || null
        const response = await fetch('/api/share', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dashboardData: data, userId }),
        })
        if (response.ok) {
          const { shareId } = await response.json()
          setShareUrl(`${window.location.origin}/shared/${shareId}`)
        }
      } catch (err) {
        console.error('Share error:', err)
      }
    }
    generateShareUrl()
  }, [data])

  const handleBack = () => {
    router.push('/form')
  }

  const copyShareLink = async () => {
    if (!shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
      setShowCopied(true)
      setTimeout(() => setShowCopied(false), 2000)
    } catch (err) {
      console.error('Copy error:', err)
    }
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="text-white font-mono">Loading Tactical Data...</div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>
          {data.type === 'seasonal' || data.seasonal_data 
            ? `${data.player_info?.username} | SEASONAL_DASHBOARD` 
            : `${data.profile?.username} | TACTICAL_DASHBOARD`}
        </title>
        {/* Import Fonts directly */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Black+Ops+One&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      {/* Inject Custom CSS for Glassmorphism and Hovers */}
      <style jsx global>{`
        :root {
            --cod-gold: #FFD700;
            --cod-black: #0a0a0a;
            --tech-cyan: #00FFFF;
        }
        
        body {
            background-color: #050505;
            background-image: 
                linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                radial-gradient(circle at 50% 0%, rgba(255, 215, 0, 0.15), transparent 60%),
                linear-gradient(0deg, rgba(5, 5, 5, 1) 0%, rgba(5, 5, 5, 0.85) 100%);
            background-size: 40px 40px, 40px 40px, cover, cover;
            background-attachment: fixed;
            font-family: 'Rajdhani', sans-serif;
        }

        .glass-panel {
            background: rgba(13, 13, 16, 0.85);
            backdrop-filter: blur(24px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.6), 0 0 1px rgba(255, 215, 0, 0.1);
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .glass-panel::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 1px;
            background: linear-gradient(90deg, transparent, var(--cod-gold), transparent);
            opacity: 0.4;
            transition: opacity 0.3s;
        }

        .glass-panel:hover {
            border-color: rgba(255, 215, 0, 0.5);
            transform: translateY(-2px);
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.7);
        }
        
        .glass-panel:hover::before {
            opacity: 1;
        }

        .font-heading { font-family: 'Black Ops One', cursive; }
        
        .text-cod-gold { color: var(--cod-gold); }
        .bg-cod-gold { background-color: var(--cod-gold); }
        .border-cod-gold { border-color: var(--cod-gold); }

        .text-glow { text-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.4); }
        .text-glow-cyan { text-shadow: 0 0 20px rgba(0, 255, 255, 0.6), 0 0 35px rgba(0, 255, 255, 0.3); }

        .animate-entry {
            animation: fadeInUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            opacity: 0;
            transform: translateY(20px);
        }
        @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
        
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        
        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--cod-gold); }
      `}</style>

      <div className="p-4 md:p-8 min-h-screen flex flex-col text-slate-200">
        <div ref={dashboardRef} className="max-w-[1600px] mx-auto w-full">
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 animate-entry gap-4">
            <div className="flex items-center gap-4">
              <div>
                <div className="text-[10px] font-mono text-cyan-400 tracking-[0.3em] uppercase mb-1 text-glow-cyan">
                  {data.type === 'seasonal' || data.seasonal_data ? 'Seasonal Analysis Report' : data.header?.subtitle}
                </div>
                <h1 className="text-3xl md:text-5xl font-heading text-white uppercase tracking-wider drop-shadow-lg">
                  {data.type === 'seasonal' || data.seasonal_data ? (
                    <>
                      {data.player_info?.username} <span className="text-purple-500 text-glow">Seasonal</span>
                    </>
                  ) : (
                    <>
                      {data.header?.title} <span className="text-cod-gold text-glow">{data.header?.titleHighlight}</span>
                    </>
                  )}
                </h1>
                <div className="text-[9px] text-gray-500 font-mono mt-1">
                  {data.type === 'seasonal' || data.seasonal_data ? `Season: ${data.seasonal_data?.season}` : data.header?.metadata}
                </div>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto flex-wrap">
              <button
                onClick={handleBack}
                className="group relative px-6 py-3 bg-black/60 border border-gray-600 hover:border-cod-gold transition-all rounded-lg overflow-hidden shadow-lg"
              >
                <span className="relative font-heading text-sm text-gray-300 group-hover:text-cod-gold tracking-widest uppercase flex items-center justify-center gap-2">
                  <i className="fa-solid fa-arrow-left"></i> Back
                </span>
              </button>
              <button
                onClick={copyShareLink}
                disabled={!shareUrl}
                className={`group relative px-6 py-3 rounded-lg overflow-hidden shadow-lg transition-all duration-300 flex-1 md:flex-none ${
                  showCopied
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500 shadow-[0_0_25px_rgba(34,197,94,0.4)]'
                    : 'bg-gradient-to-r from-cod-gold/10 to-orange-500/10 border-2 border-cod-gold/50 hover:border-cod-gold hover:shadow-[0_0_25px_rgba(255,215,0,0.4)]'
                }`}
              >
                <div className={`absolute inset-0 transition-transform duration-300 ${
                  showCopied 
                    ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30' 
                    : 'bg-gradient-to-r translate-y-full '
                }`}></div>
                <span className={`relative font-heading text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-colors duration-300 ${
                  showCopied 
                    ? 'text-green-400' 
                    : 'text-cod-gold group-hover:text-white'
                }`}>
                  {showCopied ? (
                    <>
                      <i className="fa-solid fa-check animate-bounce"></i> Copied!
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-share-nodes"></i> Share Link
                      <i className="fa-solid fa-copy text-xs"></i>
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* MAIN GRID - Conditional Rendering based on analysis type */}
          {data.type === 'seasonal' || data.seasonal_data ? (
            <SeasonalDashboard data={data} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 1. Combat Record */}
              <CombatRecord data={data.combatRecord} />

              {/* 2. Profile & Hidden Stats */}
              <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col gap-6 animate-entry delay-100">
                <ProfileCard profile={data.profile} />
                <HiddenStats stats={data.hiddenStats} />
              </div>

              {/* 3. AI Ratings */}
              <AIRating rating={data.aiRating} />

              {/* 4. Playstyle DNA */}
              <PlaystyleDNA traits={data.playstyleDNA} />

              {/* 5. Objectives */}
              <Objectives objectives={data.objectives} />

              {/* 6. Radar Chart */}
              <div className="glass-panel rounded-xl p-4 col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center animate-entry delay-300 border-t-2 border-t-cod-gold/50">
                <div className="flex items-center gap-2 mb-2 self-start px-2">
                  <div className="w-1.5 h-1.5 bg-cod-gold rounded-full animate-pulse"></div>
                  <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                    {data.radarChart.title}
                  </h3>
                </div>
                <div className="relative w-full h-[200px]">
                  <RadarChart data={data.radarChart} username={data.profile.username} />
                </div>
              </div>

              {/* 7. Tactical Briefing */}
              <TacticalBriefing briefing={data.tacticalBriefing} />
            </div>
          )}

          {/* Footer */}
          <footer className="mt-16 mb-8">
            <div className="glass-panel rounded-xl p-8 border-t-2 border-t-cod-gold/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* About Section */}
                <div>
                  <h3 className="text-cod-gold text-sm font-heading mb-4 tracking-widest uppercase flex items-center gap-2">
                    <i className="fa-solid fa-info-circle"></i>
                    <span>About CODM Analyzer</span>
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    CODM Stats Analyzer is an AI-powered platform designed to provide detailed analysis of your Call of Duty Mobile gameplay. Upload your screenshots and get instant insights, performance ratings, and tactical recommendations.
                  </p>
                </div>

                {/* Contact & Connect Section */}
                <div>
                  <h3 className="text-cod-gold text-sm font-heading mb-4 tracking-widest uppercase flex items-center gap-2">
                    <i className="fa-solid fa-user-circle"></i>
                    <span>Developer</span>
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-300">
                      <span className="text-gray-500">Created by:</span> <span className="text-white font-semibold">Krishna Singh</span>
                    </p>
                    <p className="text-gray-400">
                      <i className="fa-solid fa-envelope mr-2"></i>
                      <a href="mailto:krishnasinghprojects@gmail.com" className="text-gray-400 hover:text-cod-gold transition no-underline">
                        krishnasinghprojects@gmail.com
                      </a>
                    </p>
                    <p className="text-gray-400">
                      <i className="fa-brands fa-github mr-2"></i>
                      <a href="https://github.com/krishnasinghprojects" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cod-gold transition no-underline">
                        GitHub.com/krishnasinghprojects
                      </a>
                    </p>
                    <div className="flex gap-3 mt-4">
                      <a href="https://www.linkedin.com/in/krishnasinghprojects" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cod-gold transition text-lg">
                        <i className="fa-brands fa-linkedin"></i>
                      </a>
                      <a href="https://www.instagram.com/krishnasinghprojects" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cod-gold transition text-lg">
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                      <a href="https://github.com/krishnasinghprojects" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cod-gold transition text-lg">
                        <i className="fa-brands fa-github"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                <p className="text-gray-500 text-xs font-mono">
                  © 2025 CODM Stats Analyzer. All rights reserved. | Made by Krishna Singh
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

// NOTE: In Tailwind JIT, dynamic classes like `text-${color}-500` often fail because the compiler 
// cannot see them. For production, you should safelist these or use inline styles.
// The styling below relies on standard Tailwind colors.

// Component: Combat Record
function CombatRecord({ data }: { data: any }) {
  if (!data || !data.mainStats) return null
  
  return (
    <div className="glass-panel rounded-xl p-6 col-span-1 flex flex-col animate-entry h-full border-t-2 border-t-cod-gold/50">
      <h2 className="text-cod-gold text-sm font-heading mb-5 tracking-widest uppercase border-b border-gray-800 pb-3 flex items-center justify-between">
        <span>
          <i className="fa-solid fa-crosshairs mr-2"></i>Combat Record
        </span>
        <i className="fa-solid fa-signal text-xs animate-pulse"></i>
      </h2>

      <div className="space-y-5 flex-grow">
        {(data.mainStats || []).map((stat: any, idx: number) => {
           // Mapping dynamic colors for JIT safety
           const borderColor = stat.iconColor === 'green' ? 'hover:border-green-500/30' : stat.iconColor === 'orange' ? 'hover:border-orange-500/30' : 'hover:border-yellow-500/30';
           const textColor = stat.iconColor === 'green' ? 'text-green-500' : stat.iconColor === 'orange' ? 'text-orange-500' : 'text-yellow-500';
           const groupHoverColor = stat.hoverColor === 'green' ? 'group-hover:text-green-400' : stat.hoverColor === 'orange' ? 'group-hover:text-orange-400' : 'group-hover:text-yellow-400';
           
           return (
            <div
                key={idx}
                className={`group bg-black/20 p-3 rounded-lg border border-gray-800/50 transition ${borderColor}`}
            >
                <div className="text-[10px] uppercase text-gray-500 font-bold mb-2 tracking-wider flex items-center gap-1">
                <i className={`fa-solid ${stat.icon} ${textColor}`}></i>
                <span>{stat.label}</span>
                </div>
                <div className={`text-4xl font-heading text-white ${groupHoverColor} transition duration-300 drop-shadow-lg`}>
                {stat.value}
                {stat.suffix && <span className="text-lg text-gray-500">{stat.suffix}</span>}
                </div>
            </div>
        )})}
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-gray-800 pt-4">
        {(data.gridStats || []).map((stat: any, idx: number) => {
             const highlightClass = stat.highlight ? 'text-cod-gold' : 'text-white';
             const hoverClass = stat.highlight ? 'group-hover:text-white' : 'group-hover:text-cod-gold';
             return (
                <div
                    key={idx}
                    className="bg-black/40 p-3 rounded-lg border border-gray-800 hover:border-gray-700 transition group"
                >
                    <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-1 font-bold">{stat.label}</div>
                    <div
                    className={`text-lg font-bold ${highlightClass} font-mono ${hoverClass} transition`}
                    >
                    {stat.value}
                    </div>
                </div>
        )})}
      </div>
    </div>
  )
}

// Component: Profile Card
function ProfileCard({ profile }: { profile: any }) {
  if (!profile) return null
  
  return (
    <div className="glass-panel rounded-xl p-20 flex flex-col items-center text-center relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-yellow-500/20 to-black/50 z-0"></div>

      <div className="w-full flex justify-between items-start absolute top-4 px-6 z-10">
        <span className="text-[10px] font-mono text-cyan-500 tracking-widest opacity-80 bg-cyan-900/20 px-2 py-1 rounded border border-cyan-500/30">
          UID : {profile.uid}
        </span>
        <div className="flex gap-1 text-cod-gold text-xs drop-shadow-md">
          <i className="fa-brands fa-battle-net text-6xl text-gray-700"></i>
        </div>
      </div>

      <div className="relative z-10 mt-2">
        <div className="relative group cursor-pointer mb-4 inline-block">
          <div className="absolute -inset-3 bg-gradient-to-r from-cod-gold to-orange-600 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse"></div>
          <div className="w-32 h-32 rounded-full border-2 border-cod-gold p-1.5 bg-black relative shadow-[0_0_35px_rgba(255,215,0,0.7)]">
            <img
              src={profile.avatarUrl}
              className="w-full h-full rounded-full object-cover opacity-90 group-hover:opacity-100 transition"
              alt={profile.username}
            />
            <div className="absolute bottom-0 right-0 bg-gradient-to-r from-yellow-400 via-cod-gold to-yellow-600 text-black text-[10px] font-black px-3 py-1 rounded shadow-[0_0_20px_rgba(255,215,0,1)] border-2 border-yellow-200">
              LVL {profile.level}
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl text-white font-heading uppercase tracking-tight drop-shadow-2xl mb-2 flex items-center justify-center gap-3">
          {profile.username.split(' ')[0]} <span className="text-cod-gold text-glow">{profile.username.split(' ')[1] || ''}</span>
        </h1>

        <div className="flex flex-wrap gap-3 justify-center mt-4">
          {(profile.badges || []).map((badge: any, idx: number) => {
            // Static mapping for Tailwind classes
            let bgClass = 'bg-gray-900/40', textClass = 'text-gray-300', borderClass = 'border-gray-500/40';
            if(badge.color === 'purple') { bgClass='bg-purple-900/40'; textClass='text-purple-300'; borderClass='border-purple-500/40'; }
            if(badge.color === 'blue') { bgClass='bg-blue-900/40'; textClass='text-blue-300'; borderClass='border-blue-500/40'; }
            if(badge.color === 'green') { bgClass='bg-green-900/40'; textClass='text-green-300'; borderClass='border-green-500/40'; }

            return (
            <span
              key={idx}
              className={`px-3 py-1 ${bgClass} ${textClass} border ${borderClass} text-[10px] font-bold uppercase tracking-widest rounded-sm hover:brightness-125 transition flex items-center gap-2`}
            >
              <i className={`fa-solid ${badge.icon}`}></i> {badge.text}
            </span>
          )})}
        </div>
      </div>
    </div>
  )
}

// Component: Hidden Stats
function HiddenStats({ stats }: { stats: any }) {
  if (!stats || !stats.stats) return null
  
  return (
    <div className="glass-panel rounded-xl p-6 flex flex-col justify-center border-t-2 border-t-gray-700">
      <div className="grid grid-cols-3 gap-5 text-center h-full">
        {(stats.stats || []).map((stat: any, idx: number) => {
          const rgbaColor = stat.color === 'red' ? '239,68,68' : stat.color === 'blue' ? '59,130,246' : '234,179,8';
          // Dynamic Tailwind mapping
          const hoverBorder = stat.color === 'red' ? 'hover:border-red-500/40' : stat.color === 'blue' ? 'hover:border-blue-500/40' : 'hover:border-yellow-500/40';
          const hoverBg = stat.color === 'red' ? 'hover:bg-red-500/10' : stat.color === 'blue' ? 'hover:bg-blue-500/10' : 'hover:bg-yellow-500/10';
          const groupHoverText = stat.color === 'red' ? 'group-hover:text-red-400' : stat.color === 'blue' ? 'group-hover:text-blue-400' : 'group-hover:text-yellow-400';
          const groupHoverVal = stat.color === 'red' ? 'group-hover:text-red-500' : stat.color === 'blue' ? 'group-hover:text-blue-500' : 'group-hover:text-yellow-500';

          return (
            <div
              key={idx}
              className={`group bg-black/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-col p-5 border border-gray-800/50 ${hoverBorder} ${hoverBg} transition-all duration-300 hover:shadow-[0_0_20px_rgba(${rgbaColor},0.2)]`}
            >
              <p className={`text-[10px] text-gray-500 uppercase tracking-widest mb-3 ${groupHoverText} transition font-bold`}>
                <i className={`fa-solid ${stat.icon} mr-1 group-hover:drop-shadow-[0_0_8px_rgba(${rgbaColor},0.6)]`}></i> {stat.label}
              </p>
              {stat.subtitle ? (
                <div className="flex flex-col items-center">
                  <p className={`text-3xl font-bold ${stat.color === 'yellow' ? 'text-cod-gold' : 'text-white'} ${groupHoverVal} transition font-heading group-hover:drop-shadow-[0_0_15px_rgba(${rgbaColor},0.5)]`}>
                    {stat.value}
                  </p>
                  <span className="text-[9px] text-gray-500 uppercase group-hover:text-gray-400 transition mt-1">
                    {stat.subtitle}
                  </span>
                </div>
              ) : (
                <p className={`text-3xl font-bold text-white ${groupHoverVal} transition font-heading group-hover:drop-shadow-[0_0_15px_rgba(${rgbaColor},0.5)]`}>
                  {stat.value}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Component: AI Rating
function AIRating({ rating }: { rating: any }) {
  if (!rating || !rating.categories) return null
  
  return (
    <div className="glass-panel rounded-xl p-6 col-span-1 flex flex-col animate-entry delay-200 relative h-full">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/20 rounded-full blur-[60px] opacity-30"></div>

      <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4 relative z-10">
        <h2 className="text-white text-sm font-heading tracking-widest uppercase">
          <i className="fa-solid fa-robot mr-2 text-green-500"></i>AI Rating
        </h2>
        <div className="flex items-center gap-2">
          <div className="text-5xl font-heading text-white">{rating.overallScore}</div>
          <span className="text-xs text-cod-gold font-sans font-black px-2 py-1 bg-cod-gold/20 rounded border border-cod-gold/50">
            {rating.tier}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 flex-grow relative z-10">
        {(rating.categories || []).map((cat: any, idx: number) => {
          const iconMap: any = {
            'fa-shield-heart': 'heart-pulse',
            'fa-skull': 'crosshairs',
            'fa-flag': 'flag-checkered',
            'fa-microchip': 'gamepad',
          }
          const smallIcon = iconMap[cat.icon] || 'circle'
          const rgbaColor = cat.color === 'green' ? '34,197,94' : cat.color === 'yellow' ? '234,179,8' : cat.color === 'red' ? '239,68,68' : '59,130,246'

          // Manual mapping for React + Tailwind to avoid dynamic class purging issues
          let hoverBorder = 'hover:border-blue-500/50', hoverBg = 'hover:bg-blue-500/10', groupText = 'group-hover:text-blue-400', iconColor = 'text-blue-500', baseText = 'text-blue-500/5', groupBaseText = 'group-hover:text-blue-500/10';
          if(cat.color === 'green') { hoverBorder='hover:border-green-500/50'; hoverBg='hover:bg-green-500/10'; groupText='group-hover:text-green-400'; iconColor='text-green-500'; baseText='text-green-500/5'; groupBaseText='group-hover:text-green-500/10'; }
          if(cat.color === 'yellow') { hoverBorder='hover:border-yellow-500/50'; hoverBg='hover:bg-yellow-500/10'; groupText='group-hover:text-yellow-400'; iconColor='text-yellow-500'; baseText='text-yellow-500/5'; groupBaseText='group-hover:text-yellow-500/10'; }
          if(cat.color === 'red') { hoverBorder='hover:border-red-500/50'; hoverBg='hover:bg-red-500/10'; groupText='group-hover:text-red-400'; iconColor='text-red-500'; baseText='text-red-500/5'; groupBaseText='group-hover:text-red-500/10'; }

          return (
            <div
              key={idx}
              className={`bg-black/50 p-3 rounded border border-gray-800 ${hoverBorder} ${hoverBg} transition-all duration-300 group shadow-lg relative overflow-hidden hover:shadow-[0_0_20px_rgba(${rgbaColor},0.3)]`}
            >
              <div className={`absolute inset-0 flex items-center justify-center ${baseText} ${groupBaseText} text-6xl pointer-events-none transition-all`}>
                <i className={`fa-solid ${cat.icon}`}></i>
              </div>
              <div className={`text-[9px] text-gray-400 uppercase tracking-widest mb-1 relative z-10 ${groupText} transition`}>
                <i className={`fa-solid fa-${smallIcon} ${iconColor} mr-1 group-hover:drop-shadow-[0_0_8px_rgba(${rgbaColor},0.6)]`}></i> {cat.label}
              </div>
              <div className={`text-3xl font-heading text-white relative z-10 ${groupText} group-hover:drop-shadow-[0_0_15px_rgba(${rgbaColor},0.6)] transition`}>
                {cat.score}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Component: Playstyle DNA
function PlaystyleDNA({ traits }: { traits: any }) {
  if (!traits || !traits.traits) return null
  
  return (
    <div className="glass-panel rounded-xl p-6 col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-center space-y-5 animate-entry delay-300 border-t-2 border-t-cod-gold/50">
      <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest border-b border-gray-800 pb-2 flex items-center gap-2">
        <i className="fa-solid fa-dna text-purple-500"></i> {traits.title}
      </h3>

      <div className="space-y-4">
        {(traits.traits || []).map((trait: any, idx: number) => {
          const gradientEnd = trait.color === 'yellow' ? 'var(--cod-gold)' : trait.color === 'green' ? '#4ade80' : '#60a5fa';
          const gradientStart = trait.color === 'yellow' ? '#713f12' : trait.color === 'green' ? '#14532d' : '#1e3a8a'; // Approximate 900 colors
          const textColorClass = trait.color === 'yellow' ? 'text-cod-gold' : `text-${trait.color}-400`;
          
          // Mapping for borders and bgs
          let hoverClass = 'hover:border-blue-500/30 hover:bg-blue-500/5';
          if (trait.color === 'yellow') hoverClass = 'hover:border-yellow-500/30 hover:bg-yellow-500/5';
          if (trait.color === 'green') hoverClass = 'hover:border-green-500/30 hover:bg-green-500/5';

          return (
            <div
              key={idx}
              className={`group bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-gray-800/50 ${hoverClass} transition-all duration-300`}
            >
              <div className="flex justify-between text-[10px] font-bold uppercase mb-2 text-gray-500 tracking-widest">
                <span>{trait.leftLabel}</span>
                <span className={`${textColorClass} group-hover:text-white transition`}>
                  {trait.rightLabel} ({trait.value})
                </span>
              </div>
              <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-gray-700/50">
                <div
                  className={`h-full shadow-[0_0_10px_rgba(255,215,0,0.4)]`}
                  style={{ 
                      width: `${trait.value}%`,
                      background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})`
                  }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Component: Objectives
function Objectives({ objectives }: { objectives: any }) {
  if (!objectives || !objectives.goals) return null
  
  return (
    <div className="glass-panel rounded-xl p-6 col-span-1 md:col-span-2 lg:col-span-2 relative overflow-hidden animate-entry delay-300 border-t-2 border-t-cod-gold/50">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>

      <h3 className="text-cod-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-6 animate-pulse font-heading text-center">
        <i className="fa-solid fa-location-dot mr-1"></i> {objectives.title}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(objectives.goals || []).map((goal: any, idx: number) => {
          const percentage = goal.isPercentage
            ? ((goal.current / goal.target) * 100).toFixed(1)
            : ((goal.current / goal.target) * 100).toFixed(1)
          const currentDisplay = goal.isPercentage ? `${goal.current}%` : goal.current.toLocaleString()
          const targetDisplay = goal.isPercentage ? `${goal.target}%` : goal.target.toLocaleString()
          
          // Safer mapping
          let hoverClass = 'hover:border-pink-500/30 hover:bg-pink-500/5';
          if(goal.color === 'yellow') hoverClass = 'hover:border-yellow-500/30 hover:bg-yellow-500/5';

          return (
            <div
              key={idx}
              className={`flex flex-col items-center text-center bg-black/20 backdrop-blur-sm rounded-lg p-5 border border-gray-800/50 ${hoverClass} transition-all duration-300`}
            >
              <div className="text-2xl md:text-3xl font-heading text-white mb-2 tracking-tight drop-shadow-lg">
                {goal.title}
              </div>
              <div className="flex items-end gap-2 text-gray-400 text-sm mb-3 font-mono">
                <span className="text-white font-bold text-lg">{currentDisplay}</span>
                <span className="mb-1">/ {targetDisplay}</span>
              </div>
              <div className="w-full bg-black/40 rounded-full h-3 mb-2 border border-gray-700/50 overflow-hidden">
                <div
                  className="h-full rounded-full relative transition-all duration-500 bg-white"
                  style={{ 
                      width: `${percentage}%`,
                      background: 'linear-gradient(to right, #713f12, var(--cod-gold))'
                   }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg animate-pulse"></div>
                </div>
              </div>
              <div className="inline-flex items-center mt-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded border border-gray-700/50 shadow-inner">
                <i className={`fa-solid ${goal.icon} mr-2 text-cod-gold text-xs`}></i>
                <span className="text-[10px] text-gray-300 font-mono uppercase tracking-wider">{goal.info}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Component: Tactical Briefing
function TacticalBriefing({ briefing }: { briefing: any }) {
  if (!briefing || !briefing.sections) return null
  
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6 animate-entry delay-300">
      {(briefing.sections || []).map((section: any, idx: number) => {
        const rgbaColor =
          section.color === 'green' ? '34,197,94' : section.color === 'red' ? '239,68,68' : section.color === 'blue' ? '59,130,246' : '234,179,8'
        
        // Manual Mapping for proper Tailwind classes
        let bgClass = 'bg-gradient-to-b from-yellow-900/10 to-transparent hover:bg-yellow-900/20';
        let iconBg = 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400 group-hover:bg-yellow-500/20';
        let pointColor = 'text-yellow-500';
        
        if(section.color === 'green') {
            bgClass = 'bg-gradient-to-b from-green-900/10 to-transparent hover:bg-green-900/20';
            iconBg = 'bg-green-500/10 border-green-500/30 text-green-400 group-hover:bg-green-500/20';
            pointColor = 'text-green-500';
        } else if(section.color === 'red') {
            bgClass = 'bg-gradient-to-b from-red-900/10 to-transparent hover:bg-red-900/20';
            iconBg = 'bg-red-500/10 border-red-500/30 text-red-400 group-hover:bg-red-500/20';
            pointColor = 'text-red-500';
        } else if(section.color === 'blue') {
            bgClass = 'bg-gradient-to-b from-blue-900/10 to-transparent hover:bg-blue-900/20';
            iconBg = 'bg-blue-500/10 border-blue-500/30 text-blue-400 group-hover:bg-blue-500/20';
            pointColor = 'text-blue-500';
        } else if(section.color === 'gold') {
            bgClass = 'bg-gradient-to-b from-yellow-900/10 to-transparent hover:bg-yellow-900/20';
            iconBg = 'bg-yellow-500/10 border-yellow-500/30 text-cod-gold group-hover:bg-yellow-500/20';
            pointColor = 'text-cod-gold';
        }

        return (
          <div
            key={idx}
            className={`glass-panel rounded-lg p-5 ${bgClass} group transition border border-gray-700/50`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-lg ${iconBg} backdrop-blur-md border flex items-center justify-center group-hover:scale-110 transition shadow-[0_0_15px_rgba(${rgbaColor},0.3)]`}
              >
                <i className={`fa-solid ${section.icon} text-lg`}></i>
              </div>
              <h4 className="font-heading text-lg text-white">{section.title}</h4>
            </div>
            <ul className="space-y-2">
              {(section.points || []).map((point: string, pidx: number) => (
                <li key={pidx} className="flex gap-2 text-xs text-gray-400">
                  <span className={`${pointColor}`}>▶</span>
                  <span dangerouslySetInnerHTML={{ __html: point }}></span>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

// Component: Seasonal Dashboard
function SeasonalDashboard({ data }: { data: DashboardData }) {
  const { player_info, seasonal_data, weapon_usage_stats, ai_insights } = data

  // Transform seasonal data for Combat Record
  const seasonalCombatRecord = {
    mainStats: [
      {
        label: 'K/D Ratio',
        value: seasonal_data?.kd_ratio || '0.00',
        icon: 'fa-crosshairs',
        iconColor: 'green',
        hoverColor: 'green'
      },
      {
        label: 'Win Rate',
        value: seasonal_data?.win_rate || '0%',
        icon: 'fa-trophy',
        iconColor: 'orange',
        hoverColor: 'orange'
      },
      {
        label: 'Avg Score',
        value: seasonal_data?.average_score || '0',
        icon: 'fa-chart-line',
        iconColor: 'yellow',
        hoverColor: 'yellow'
      }
    ],
    gridStats: [
      { label: 'Matches', value: seasonal_data?.matches_played || '0', highlight: false },
      { label: 'Wins', value: seasonal_data?.matches_won || '0', highlight: true },
      { label: 'MVP Final', value: seasonal_data?.mvp_title_earned_final || '0', highlight: false },
      { label: 'MVP Defeat', value: seasonal_data?.mvp_title_earned_defeat || '0', highlight: false }
    ]
  }

  // Calculate AI rating from seasonal data
  const kdScore = Math.min(100, (parseFloat(seasonal_data?.kd_ratio || '0') / 3) * 100)
  const winRateScore = parseFloat(seasonal_data?.win_rate?.replace('%', '') || '0')
  const mvpScore = Math.min(100, ((seasonal_data?.mvp_title_earned_final || 0) / (seasonal_data?.matches_played || 1)) * 100 * 2)
  const overallScore = Math.round((kdScore + winRateScore + mvpScore) / 3)
  
  const getTier = (score: number) => {
    if (score >= 90) return 'S+'
    if (score >= 80) return 'S'
    if (score >= 70) return 'A'
    if (score >= 60) return 'B'
    if (score >= 50) return 'C'
    return 'D'
  }

  const seasonalAIRating = {
    overallScore,
    tier: getTier(overallScore),
    categories: [
      { label: 'Combat', score: Math.round(kdScore), icon: 'fa-crosshairs', color: 'green' },
      { label: 'Victory', score: Math.round(winRateScore), icon: 'fa-trophy', color: 'yellow' },
      { label: 'MVP Rate', score: Math.round(mvpScore), icon: 'fa-star', color: 'yellow' },
      { label: 'Consistency', score: Math.min(100, (seasonal_data?.consecutive_wins || 0) * 10), icon: 'fa-chart-line', color: 'blue' }
    ]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* 1. Seasonal Combat Record */}
      <CombatRecord data={seasonalCombatRecord} />

      {/* 2. Rank Progress Card */}
      <SeasonalRankCard 
        username={player_info?.username}
        season={seasonal_data?.season}
        rank={seasonal_data?.rank}
        kd={seasonal_data?.kd_ratio}
        consecutiveWins={seasonal_data?.consecutive_wins}
        favoriteWeapon={weapon_usage_stats?.[0]?.weapon_name}
      />

      {/* 3. AI Rating */}
      <AIRating rating={seasonalAIRating} />

      {/* 4. Weapon Analysis Summary */}
      <WeaponAnalysisCard weaponAnalysis={ai_insights?.weapon_analysis} />

      {/* 5-7. Individual Weapon Cards */}
      {(weapon_usage_stats || []).map((weapon: any, idx: number) => (
        <WeaponDetailCard key={idx} weapon={weapon} index={idx} />
      ))}

      {/* 8. Rank Performance Insights */}
      {ai_insights?.rank_performance && (
        <RankPerformanceCard rankPerformance={ai_insights.rank_performance} />
      )}

      {/* 9. Tactical Recommendations */}
      {ai_insights?.tactical_recommendations && (
        <TacticalBriefing briefing={{ sections: ai_insights.tactical_recommendations }} />
      )}
    </div>
  )
}

// Seasonal-Specific Components

// Component: Seasonal Rank Card
function SeasonalRankCard({ username, season, rank, kd, consecutiveWins, favoriteWeapon }: any) {
  if (!season) return null
  
  return (
    <div className="glass-panel rounded-xl p-6 col-span-1 md:col-span-2 animate-entry delay-100 border-t-2 border-t-purple-500/50 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
          <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest group-hover:text-purple-400 transition">Seasonal Rank</h3>
        </div>
        
        {/* Player Name and Season */}
        <div className="text-center mb-4 pb-4 border-b border-purple-500/20">
          <h2 className="text-3xl font-heading text-white mb-2 group-hover:text-purple-300 transition drop-shadow-lg">{username || 'Player'}</h2>
          <p className="text-purple-400 text-xs font-mono group-hover:text-purple-300 transition">{season}</p>
        </div>

        {/* Rank */}
        <div className="bg-black/30 rounded-lg p-10 mb-3 border border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] group/rank">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-purple-400 text-xs mb-1 uppercase tracking-wider group-hover/rank:text-purple-300 transition">Current Rank</div>
              <div className="text-white font-heading text-2xl group-hover/rank:text-purple-200 transition">{rank}</div>
            </div>
            <i className="fa-solid fa-crown text-cod-gold text-3xl group-hover/rank:animate-pulse"></i>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* K/D Ratio */}
          <div className="bg-black/30 rounded-lg p-8 border border-green-500/30 hover:border-green-500 hover:bg-green-500/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] group/kd">
            <div className="text-green-400 text-[10px] mb-1 uppercase tracking-wider group-hover/kd:text-green-300 transition">K/D Ratio</div>
            <div className="text-white font-heading text-xl group-hover/kd:text-green-200 transition flex items-center gap-1">
              {kd || '0.00'} <i className="fa-solid fa-crosshairs text-green-500 text-sm"></i>
            </div>
          </div>

          {/* Win Streak */}
          <div className="bg-black/30 rounded-lg p-8 border border-orange-500/30 hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)] group/streak">
            <div className="text-orange-400 text-[10px] mb-1 uppercase tracking-wider group-hover/streak:text-orange-300 transition">Win Streak</div>
            <div className="text-white font-heading text-xl flex items-center gap-1 group-hover/streak:text-orange-200 transition">
              {consecutiveWins} <i className="fa-solid fa-fire text-orange-500 text-sm group-hover/streak:animate-pulse"></i>
            </div>
          </div>
        </div>

        {/* Favorite Weapon */}
        {favoriteWeapon && (
          <div className="bg-black/30 rounded-lg p-10 mt-3 border border-blue-500/30 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] group/weapon">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-blue-400 text-[10px] mb-1 uppercase tracking-wider group-hover/weapon:text-blue-300 transition">Favorite Weapon</div>
                <div className="text-white font-heading text-lg group-hover/weapon:text-blue-200 transition">{favoriteWeapon}</div>
              </div>
              <i className="fa-solid fa-gun text-blue-400/50 text-2xl group-hover/weapon:text-blue-400 transition"></i>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Component: Weapon Analysis Card
function WeaponAnalysisCard({ weaponAnalysis }: any) {
  if (!weaponAnalysis) return null
  
  return (
    <div className="glass-panel rounded-xl p-6 col-span-1 md:col-span-1 animate-entry delay-200 border-t-2 border-t-purple-500/50 group">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
        <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest group-hover:text-purple-400 transition">{weaponAnalysis.title}</h3>
      </div>
      
      {/* Primary Weapon */}
      {weaponAnalysis.primary_weapon && (
        <div className="bg-black/30 rounded-lg p-4 border border-purple-500/30 mb-4 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] group/primary">
          <div className="flex items-center gap-2 mb-2">
            <i className="fa-solid fa-star text-cod-gold group-hover/primary:animate-pulse"></i>
            <h4 className="text-white font-heading text-lg group-hover/primary:text-purple-200 transition">{weaponAnalysis.primary_weapon.name}</h4>
          </div>
          <p className="text-gray-400 text-sm mb-2 group-hover/primary:text-gray-300 transition">{weaponAnalysis.primary_weapon.assessment}</p>
          <p className="text-gray-500 text-xs mb-2">{weaponAnalysis.primary_weapon.stats_summary}</p>
          <p className="text-purple-400 text-xs group-hover/primary:text-purple-300 transition">
            <i className="fa-solid fa-lightbulb mr-1"></i>
            {weaponAnalysis.primary_weapon.recommendation}
          </p>
        </div>
      )}
      
      {/* Weapon Diversity */}
      {weaponAnalysis.weapon_diversity && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/30 rounded-lg p-4 border border-gray-700 hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 group/div">
            <div className="text-gray-400 text-xs mb-2 uppercase tracking-wider group-hover/div:text-purple-400 transition">Diversity Score</div>
            <div className="text-white font-heading text-3xl mb-1 group-hover/div:text-purple-200 transition">{weaponAnalysis.weapon_diversity.score}</div>
            <p className="text-gray-500 text-xs group-hover/div:text-gray-400 transition">{weaponAnalysis.weapon_diversity.comment}</p>
          </div>
          
          {weaponAnalysis.best_performer && (
            <div className="bg-black/30 rounded-lg p-4 border border-green-500/30 hover:border-green-500 hover:bg-green-500/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] group/best">
              <div className="text-green-400 text-xs mb-2 uppercase tracking-wider flex items-center gap-1 group-hover/best:text-green-300 transition">
                <i className="fa-solid fa-trophy group-hover/best:animate-bounce"></i> Best Performer
              </div>
              <div className="text-white font-heading text-lg mb-1 group-hover/best:text-green-200 transition">{weaponAnalysis.best_performer.weapon}</div>
              <p className="text-gray-500 text-xs group-hover/best:text-gray-400 transition">{weaponAnalysis.best_performer.reason}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Component: Weapon Detail Card
function WeaponDetailCard({ weapon, index }: any) {
  if (!weapon) return null
  
  const colors = ['purple', 'blue', 'green']
  const color = colors[index % 3]
  
  return (
    <div className={`glass-panel rounded-xl p-6 animate-entry border-t-2 border-t-${color}-500/50 group hover:border-t-${color}-500 transition-all duration-300`} style={{ animationDelay: `${(index + 3) * 100}ms` }}>
      <div className="flex items-center gap-2 mb-4">
        <i className={`fa-solid fa-gun text-${color}-400 group-hover:text-${color}-300 transition group-hover:animate-pulse`}></i>
        <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest group-hover:text-${color}-400 transition">{weapon.usage_rank}</h3>
      </div>
      
      <h4 className="text-white font-heading text-2xl mb-4 group-hover:text-${color}-200 transition drop-shadow-lg">{weapon.weapon_name}</h4>
      
      <div className="space-y-3">
        <div className="bg-black/30 rounded p-3 border border-gray-800 hover:border-${color}-500/50 hover:bg-${color}-500/5 transition-all duration-300 group/time">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-400 text-xs group-hover/time:text-gray-300 transition">Use Time</span>
            <span className="text-white font-mono text-sm group-hover/time:text-${color}-200 transition">{weapon.use_time}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-xs group-hover/time:text-gray-300 transition">Total Kills</span>
            <span className="text-white font-mono text-sm font-bold group-hover/time:text-${color}-200 transition">{weapon.total_kills}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-black/30 rounded p-2 border border-gray-800 text-center hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-300 group/wr">
            <div className="text-gray-400 text-[10px] mb-1 group-hover/wr:text-green-400 transition">Win Rate</div>
            <div className="text-green-400 font-mono text-sm font-bold group-hover/wr:text-green-300 transition">{weapon.win_rate}</div>
          </div>
          <div className="bg-black/30 rounded p-2 border border-gray-800 text-center hover:border-cod-gold/50 hover:bg-yellow-500/10 transition-all duration-300 group/kd">
            <div className="text-gray-400 text-[10px] mb-1 group-hover/kd:text-cod-gold transition">K/D</div>
            <div className="text-cod-gold font-mono text-sm font-bold group-hover/kd:text-yellow-300 transition">{weapon.kd_ratio}</div>
          </div>
          <div className="bg-black/30 rounded p-2 border border-gray-800 text-center hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 group/hit">
            <div className="text-gray-400 text-[10px] mb-1 group-hover/hit:text-blue-400 transition">Hit Rate</div>
            <div className="text-blue-400 font-mono text-sm font-bold group-hover/hit:text-blue-300 transition">{weapon.hit_rate}</div>
          </div>
          <div className="bg-black/30 rounded p-2 border border-gray-800 text-center hover:border-gray-600 hover:bg-gray-500/10 transition-all duration-300 group/used">
            <div className="text-gray-400 text-[10px] mb-1 group-hover/used:text-gray-300 transition">Used</div>
            <div className="text-white font-mono text-sm font-bold group-hover/used:text-gray-200 transition">{weapon.total_used}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component: Rank Performance Card
function RankPerformanceCard({ rankPerformance }: any) {
  if (!rankPerformance) return null
  
  return (
    <div className="glass-panel rounded-xl p-6 col-span-1 md:col-span-2 lg:col-span-4 animate-entry delay-300 border-t-2 border-t-cod-gold/50 group">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 bg-cod-gold rounded-full animate-pulse"></div>
        <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest group-hover:text-cod-gold transition">{rankPerformance.title}</h3>
      </div>
      
      <div className="flex items-center gap-4 mb-4">
        <span className="inline-block px-4 py-2 bg-cod-gold/20 border border-cod-gold/50 rounded text-cod-gold font-heading text-lg hover:bg-cod-gold/30 hover:border-cod-gold hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all duration-300">
          {rankPerformance.rating}
        </span>
        <p className="text-gray-300 text-sm flex-1 group-hover:text-gray-200 transition">{rankPerformance.summary}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-black/30 rounded-lg p-5 border border-green-500/30 hover:border-green-500 hover:bg-green-500/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] group/strengths">
          <h4 className="text-green-400 font-heading text-sm mb-3 flex items-center gap-2 group-hover/strengths:text-green-300 transition">
            <i className="fa-solid fa-check-circle group-hover/strengths:animate-pulse"></i> Strengths
          </h4>
          <ul className="space-y-2">
            {(rankPerformance.strengths || []).map((strength: string, i: number) => (
              <li key={i} className="text-gray-400 text-xs flex items-start gap-2 group-hover/strengths:text-gray-300 transition">
                <i className="fa-solid fa-plus text-green-400 mt-0.5 group-hover/strengths:text-green-300"></i>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Areas for Improvement */}
        <div className="bg-black/30 rounded-lg p-5 border border-orange-500/30 hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] group/improvements">
          <h4 className="text-orange-400 font-heading text-sm mb-3 flex items-center gap-2 group-hover/improvements:text-orange-300 transition">
            <i className="fa-solid fa-arrow-trend-up group-hover/improvements:animate-bounce"></i> Areas for Improvement
          </h4>
          <ul className="space-y-2">
            {(rankPerformance.improvements || []).map((improvement: string, i: number) => (
              <li key={i} className="text-gray-400 text-xs flex items-start gap-2 group-hover/improvements:text-gray-300 transition">
                <i className="fa-solid fa-arrow-up text-orange-400 mt-0.5 group-hover/improvements:text-orange-300"></i>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
