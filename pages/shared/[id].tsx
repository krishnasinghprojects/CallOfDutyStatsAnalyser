import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import dynamic from 'next/dynamic'

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

export default function SharedDashboard() {
  const router = useRouter()
  const { id } = router.query
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchSharedData = async () => {
      try {
        const response = await fetch(`/api/share?id=${id}`)
        
        if (!response.ok) {
          throw new Error('Dashboard not found')
        }

        const result = await response.json()
        const dashboardData = result.data || result
        setData(dashboardData)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSharedData()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-cod-gold text-4xl mb-4">
            <i className="fa-solid fa-spinner fa-spin"></i>
          </div>
          <div className="text-white text-xl">Loading shared dashboard...</div>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-panel rounded-xl p-8 max-w-md text-center">
          <div className="text-red-500 text-4xl mb-4">
            <i className="fa-solid fa-exclamation-triangle"></i>
          </div>
          <h2 className="text-white text-2xl font-heading mb-2">Dashboard Not Found</h2>
          <p className="text-gray-400 mb-6">This shared link may have expired or is invalid.</p>
          <button
            onClick={() => router.push('/form')}
            className="px-6 py-3 bg-cod-gold text-black font-heading rounded-lg hover:bg-yellow-500 transition"
          >
            Create Your Own Dashboard
          </button>
        </div>
      </div>
    )
  }

  const isSeasonal = data.type === 'seasonal' || data.seasonal_data

  return (
    <>
      <Head>
        <title>
          {isSeasonal 
            ? `${data.player_info?.username} | Shared Seasonal Stats` 
            : `${data.profile?.username} | Shared Stats`}
        </title>
      </Head>

      <div className="p-4 md:p-8 min-h-screen flex flex-col">
        <div className="max-w-[1600px] mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 animate-entry gap-4">
            <div className="flex items-center gap-4">
              <div>
                <div className="text-[10px] font-mono text-cyan-400 tracking-[0.3em] uppercase mb-1 text-glow-cyan">
                  {isSeasonal ? 'Seasonal Analysis Report' : data.header?.subtitle} • Shared Dashboard
                </div>
                <h1 className="text-3xl md:text-5xl font-heading text-white uppercase tracking-wider drop-shadow-lg">
                  {isSeasonal ? (
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
                  {isSeasonal ? `Season: ${data.seasonal_data?.season}` : data.header?.metadata}
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push('/form')}
              className="group relative px-6 py-3 bg-gradient-to-r from-cod-gold/10 to-orange-500/10 border border-cod-gold/50 hover:border-cod-gold transition-all rounded-lg overflow-hidden shadow-lg"
            >
              <span className="relative font-heading text-sm text-cod-gold group-hover:text-white tracking-widest uppercase flex items-center justify-center gap-2">
                <i className="fa-solid fa-plus"></i> Create Your Own
              </span>
            </button>
          </div>

          {/* Dashboard Content */}
          {isSeasonal ? (
            <SeasonalDashboard data={data} />
          ) : (
            <OverallDashboard data={data} />
          )}
        </div>
      </div>
    </>
  )
}

// Overall Dashboard Component
function OverallDashboard({ data }: { data: DashboardData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {data?.combatRecord && <CombatRecord data={data.combatRecord} />}
      
      <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col gap-6 animate-entry delay-100">
        {data?.profile && <ProfileCard profile={data.profile} />}
        {data?.hiddenStats && <HiddenStats stats={data.hiddenStats} />}
      </div>

      {data?.aiRating && <AIRating rating={data.aiRating} />}
      {data?.playstyleDNA && <PlaystyleDNA traits={data.playstyleDNA} />}
      {data?.objectives && <Objectives objectives={data.objectives} />}

      {data?.radarChart && (
        <div className="glass-panel rounded-xl p-4 col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center animate-entry delay-300 border-t-2 border-t-cod-gold/50">
          <div className="flex items-center gap-2 mb-2 self-start px-2">
            <div className="w-1.5 h-1.5 bg-cod-gold rounded-full animate-pulse"></div>
            <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              {data.radarChart.title}
            </h3>
          </div>
          <div className="relative w-full h-[200px]">
            <RadarChart data={data.radarChart} username={data.profile?.username || 'Player'} />
          </div>
        </div>
      )}

      {data?.tacticalBriefing && <TacticalBriefing briefing={data.tacticalBriefing} />}
    </div>
  )
}

// Seasonal Dashboard Component
function SeasonalDashboard({ data }: { data: DashboardData }) {
  const { player_info, seasonal_data, weapon_usage_stats, ai_insights } = data

  const seasonalCombatRecord = {
    mainStats: [
      { label: 'K/D Ratio', value: seasonal_data?.kd_ratio || '0.00', icon: 'fa-crosshairs', iconColor: 'green', hoverColor: 'green' },
      { label: 'Win Rate', value: seasonal_data?.win_rate || '0%', icon: 'fa-trophy', iconColor: 'orange', hoverColor: 'orange' },
      { label: 'Avg Score', value: seasonal_data?.average_score || '0', icon: 'fa-chart-line', iconColor: 'yellow', hoverColor: 'yellow' }
    ],
    gridStats: [
      { label: 'Matches', value: seasonal_data?.matches_played || '0', highlight: false },
      { label: 'Wins', value: seasonal_data?.matches_won || '0', highlight: true },
      { label: 'MVP Final', value: seasonal_data?.mvp_title_earned_final || '0', highlight: false },
      { label: 'MVP Defeat', value: seasonal_data?.mvp_title_earned_defeat || '0', highlight: false }
    ]
  }

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
      { label: 'Combat', score: Math.round(kdScore), icon: 'fa-crosshairs' },
      { label: 'Victory', score: Math.round(winRateScore), icon: 'fa-trophy' },
      { label: 'MVP Rate', score: Math.round(mvpScore), icon: 'fa-star' },
      { label: 'Consistency', score: Math.min(100, (seasonal_data?.consecutive_wins || 0) * 10), icon: 'fa-chart-line' }
    ]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <CombatRecord data={seasonalCombatRecord} />
      
      <SeasonalRankCard 
        username={player_info?.username}
        season={seasonal_data?.season}
        rank={seasonal_data?.rank}
        rankPoints={seasonal_data?.rank_points}
        consecutiveWins={seasonal_data?.consecutive_wins}
      />

      <AIRating rating={seasonalAIRating} />
      <WeaponAnalysisCard weaponAnalysis={ai_insights?.weapon_analysis} />

      {(weapon_usage_stats || []).map((weapon: any, idx: number) => (
        <WeaponDetailCard key={idx} weapon={weapon} index={idx} />
      ))}

      {ai_insights?.rank_performance && (
        <RankPerformanceCard rankPerformance={ai_insights.rank_performance} />
      )}

      {ai_insights?.tactical_recommendations && (
        <TacticalBriefing briefing={{ sections: ai_insights.tactical_recommendations }} />
      )}
    </div>
  )
}


// All component functions copied from dashboard.tsx
// These are needed for both Overall and Seasonal dashboards to render properly

function CombatRecord({ data }: { data: any }) {
  if (!data || !data.mainStats) return null
  return (
    <div className="glass-panel rounded-xl p-6 col-span-1 flex flex-col animate-entry h-full border-t-2 border-t-cod-gold/50">
      <h2 className="text-cod-gold text-sm font-heading mb-5 tracking-widest uppercase border-b border-gray-800 pb-3 flex items-center justify-between">
        <span><i className="fa-solid fa-crosshairs mr-2"></i>Combat Record</span>
        <i className="fa-solid fa-signal text-xs animate-pulse"></i>
      </h2>
      <div className="space-y-5 flex-grow">
        {(data.mainStats || []).map((stat: any, idx: number) => {
           const borderColor = stat.iconColor === 'green' ? 'hover:border-green-500/30' : stat.iconColor === 'orange' ? 'hover:border-orange-500/30' : 'hover:border-yellow-500/30';
           const textColor = stat.iconColor === 'green' ? 'text-green-500' : stat.iconColor === 'orange' ? 'text-orange-500' : 'text-yellow-500';
           const groupHoverColor = stat.hoverColor === 'green' ? 'group-hover:text-green-400' : stat.hoverColor === 'orange' ? 'group-hover:text-orange-400' : 'group-hover:text-yellow-400';
           return (
            <div key={idx} className={`group bg-black/20 p-3 rounded-lg border border-gray-800/50 transition ${borderColor}`}>
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
                <div key={idx} className="bg-black/40 p-3 rounded-lg border border-gray-800 hover:border-gray-700 transition group">
                    <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-1 font-bold">{stat.label}</div>
                    <div className={`text-lg font-bold ${highlightClass} font-mono ${hoverClass} transition`}>{stat.value}</div>
                </div>
        )})}
      </div>
    </div>
  )
}

function ProfileCard({ profile }: { profile: any }) {
  if (!profile) return null
  return (
    <div className="glass-panel rounded-xl p-20 flex flex-col items-center text-center relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-yellow-500/20 to-black/50 z-0"></div>
      <div className="w-full flex justify-between items-start absolute top-4 px-6 z-10">
        <span className="text-[10px] font-mono text-cyan-500 tracking-widest opacity-80 bg-cyan-900/20 px-2 py-1 rounded border border-cyan-500/30">
          UID : {profile.uid}
        </span>
      </div>
      <div className="relative z-10 mt-2">
        <div className="relative group cursor-pointer mb-4 inline-block">
          <div className="absolute -inset-3 bg-gradient-to-r from-cod-gold to-orange-600 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse"></div>
          <div className="w-32 h-32 rounded-full border-2 border-cod-gold p-1.5 bg-black relative shadow-[0_0_35px_rgba(255,215,0,0.7)]">
            <img src={profile.avatarUrl} className="w-full h-full rounded-full object-cover opacity-90 group-hover:opacity-100 transition" alt={profile.username} />
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
            let bgClass = 'bg-gray-900/40', textClass = 'text-gray-300', borderClass = 'border-gray-500/40';
            if(badge.color === 'purple') { bgClass='bg-purple-900/40'; textClass='text-purple-300'; borderClass='border-purple-500/40'; }
            if(badge.color === 'blue') { bgClass='bg-blue-900/40'; textClass='text-blue-300'; borderClass='border-blue-500/40'; }
            if(badge.color === 'green') { bgClass='bg-green-900/40'; textClass='text-green-300'; borderClass='border-green-500/40'; }
            return (
            <span key={idx} className={`px-3 py-1 ${bgClass} ${textClass} border ${borderClass} text-[10px] font-bold uppercase tracking-widest rounded-sm hover:brightness-125 transition flex items-center gap-2`}>
              <i className={`fa-solid ${badge.icon}`}></i> {badge.text}
            </span>
          )})}
        </div>
      </div>
    </div>
  )
}

function HiddenStats({ stats }: { stats: any }) {
  if (!stats || !stats.stats) return null
  return (
    <div className="glass-panel rounded-xl p-6 flex flex-col justify-center border-t-2 border-t-gray-700">
      <div className="grid grid-cols-3 gap-5 text-center h-full">
        {(stats.stats || []).map((stat: any, idx: number) => (
          <div key={idx} className="group bg-black/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-col p-5 border border-gray-800/50 transition-all duration-300">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 transition font-bold">
              <i className={`fa-solid ${stat.icon} mr-1`}></i> {stat.label}
            </p>
            {stat.subtitle ? (
              <div className="flex flex-col items-center">
                <p className={`text-3xl font-bold ${stat.color === 'yellow' ? 'text-cod-gold' : 'text-white'} transition font-heading`}>{stat.value}</p>
                <span className="text-[9px] text-gray-500 uppercase transition mt-1">{stat.subtitle}</span>
              </div>
            ) : (
              <p className="text-3xl font-bold text-white transition font-heading">{stat.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

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
          <span className="text-xs text-cod-gold font-sans font-black px-2 py-1 bg-cod-gold/20 rounded border border-cod-gold/50">{rating.tier}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 flex-grow relative z-10">
        {(rating.categories || []).map((cat: any, idx: number) => (
          <div key={idx} className="bg-black/50 p-3 rounded border border-gray-800 transition-all duration-300 group shadow-lg relative overflow-hidden">
            <div className="text-[9px] text-gray-400 uppercase tracking-widest mb-1 relative z-10 transition">
              <i className={`fa-solid fa-circle mr-1`}></i> {cat.label}
            </div>
            <div className="text-3xl font-heading text-white relative z-10 transition">{cat.score}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PlaystyleDNA({ traits }: { traits: any }) {
  if (!traits || !traits.traits) return null
  return (
    <div className="glass-panel rounded-xl p-6 col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-center space-y-5 animate-entry delay-300 border-t-2 border-t-cod-gold/50">
      <h3 className="text-gray-500 text-[10px] font-bold uppercase tracking-widest border-b border-gray-800 pb-2 flex items-center gap-2">
        <i className="fa-solid fa-dna text-purple-500"></i> {traits.title}
      </h3>
      <div className="space-y-4">
        {(traits.traits || []).map((trait: any, idx: number) => (
          <div key={idx} className="group bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-gray-800/50 transition-all duration-300">
            <div className="flex justify-between text-[10px] font-bold uppercase mb-2 text-gray-500 tracking-widest">
              <span>{trait.leftLabel}</span>
              <span className="transition">{trait.rightLabel} ({trait.value})</span>
            </div>
            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-gray-700/50">
              <div className="h-full shadow-[0_0_10px_rgba(255,215,0,0.4)]" style={{ width: `${trait.value}%`, background: 'linear-gradient(to right, #713f12, var(--cod-gold))' }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Objectives({ objectives }: { objectives: any }) {
  if (!objectives || !objectives.goals) return null
  return (
    <div className="glass-panel rounded-xl p-6 col-span-1 md:col-span-2 lg:col-span-2 relative overflow-hidden animate-entry delay-300 border-t-2 border-t-cod-gold/50">
      <h3 className="text-cod-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-6 animate-pulse font-heading text-center">
        <i className="fa-solid fa-location-dot mr-1"></i> {objectives.title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(objectives.goals || []).map((goal: any, idx: number) => {
          const percentage = ((goal.current / goal.target) * 100).toFixed(1)
          const currentDisplay = goal.isPercentage ? `${goal.current}%` : goal.current.toLocaleString()
          const targetDisplay = goal.isPercentage ? `${goal.target}%` : goal.target.toLocaleString()
          return (
            <div key={idx} className="flex flex-col items-center text-center bg-black/20 backdrop-blur-sm rounded-lg p-5 border border-gray-800/50 transition-all duration-300">
              <div className="text-2xl md:text-3xl font-heading text-white mb-2 tracking-tight drop-shadow-lg">{goal.title}</div>
              <div className="flex items-end gap-2 text-gray-400 text-sm mb-3 font-mono">
                <span className="text-white font-bold text-lg">{currentDisplay}</span>
                <span className="mb-1">/ {targetDisplay}</span>
              </div>
              <div className="w-full bg-black/40 rounded-full h-3 mb-2 border border-gray-700/50 overflow-hidden">
                <div className="h-full rounded-full relative transition-all duration-500" style={{ width: `${percentage}%`, background: goal.gradient || 'linear-gradient(to right, #713f12, var(--cod-gold))' }}>
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

function TacticalBriefing({ briefing }: { briefing: any }) {
  if (!briefing || !briefing.sections) return null
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6 animate-entry delay-300">
      {(briefing.sections || []).map((section: any, idx: number) => {
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
          <div key={idx} className={`glass-panel rounded-lg p-5 ${bgClass} group transition border border-gray-700/50`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg ${iconBg} backdrop-blur-md border flex items-center justify-center group-hover:scale-110 transition`}>
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

// OLD SEASONAL COMPONENTS REMOVED - Using enhanced versions at end of file

function WeaponAnalysisCard_OLD({ weaponAnalysis }: any) {
  if (!weaponAnalysis) return null
  return (
    <div className="glass-panel rounded-xl p-6 col-span-1 md:col-span-2 animate-entry delay-200 border-t-2 border-t-purple-500/50">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
        <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{weaponAnalysis.title}</h3>
      </div>
      {weaponAnalysis.primary_weapon && (
        <div className="bg-black/30 rounded-lg p-4 border border-purple-500/30 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <i className="fa-solid fa-star text-cod-gold"></i>
            <h4 className="text-white font-heading text-lg">{weaponAnalysis.primary_weapon.name}</h4>
          </div>
          <p className="text-gray-400 text-sm mb-2">{weaponAnalysis.primary_weapon.assessment}</p>
          <p className="text-gray-500 text-xs mb-2">{weaponAnalysis.primary_weapon.stats_summary}</p>
          <p className="text-purple-400 text-xs">
            <i className="fa-solid fa-lightbulb mr-1"></i>
            {weaponAnalysis.primary_weapon.recommendation}
          </p>
        </div>
      )}
      {weaponAnalysis.weapon_diversity && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/30 rounded-lg p-4 border border-gray-700">
            <div className="text-gray-400 text-xs mb-2 uppercase tracking-wider">Diversity Score</div>
            <div className="text-white font-heading text-3xl mb-1">{weaponAnalysis.weapon_diversity.score}</div>
            <p className="text-gray-500 text-xs">{weaponAnalysis.weapon_diversity.comment}</p>
          </div>
          {weaponAnalysis.best_performer && (
            <div className="bg-black/30 rounded-lg p-4 border border-green-500/30">
              <div className="text-green-400 text-xs mb-2 uppercase tracking-wider flex items-center gap-1">
                <i className="fa-solid fa-trophy"></i> Best Performer
              </div>
              <div className="text-white font-heading text-lg mb-1">{weaponAnalysis.best_performer.weapon}</div>
              <p className="text-gray-500 text-xs">{weaponAnalysis.best_performer.reason}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function WeaponDetailCard_OLD({ weapon, index }: any) {
  if (!weapon) return null
  const colors = ['purple', 'blue', 'green']
  const color = colors[index % 3]
  return (
    <div className={`glass-panel rounded-xl p-6 animate-entry border-t-2 border-t-${color}-500/50`} style={{ animationDelay: `${(index + 3) * 100}ms` }}>
      <div className="flex items-center gap-2 mb-4">
        <i className={`fa-solid fa-gun text-${color}-400`}></i>
        <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{weapon.usage_rank}</h3>
      </div>
      <h4 className="text-white font-heading text-2xl mb-4">{weapon.weapon_name}</h4>
      <div className="space-y-3">
        <div className="bg-black/30 rounded p-3 border border-gray-800">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-400 text-xs">Use Time</span>
            <span className="text-white font-mono text-sm">{weapon.use_time}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-xs">Total Kills</span>
            <span className="text-white font-mono text-sm font-bold">{weapon.total_kills}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-black/30 rounded p-2 border border-gray-800 text-center">
            <div className="text-gray-400 text-[10px] mb-1">Win Rate</div>
            <div className="text-green-400 font-mono text-sm font-bold">{weapon.win_rate}</div>
          </div>
          <div className="bg-black/30 rounded p-2 border border-gray-800 text-center">
            <div className="text-gray-400 text-[10px] mb-1">K/D</div>
            <div className="text-cod-gold font-mono text-sm font-bold">{weapon.kd_ratio}</div>
          </div>
          <div className="bg-black/30 rounded p-2 border border-gray-800 text-center">
            <div className="text-gray-400 text-[10px] mb-1">Hit Rate</div>
            <div className="text-blue-400 font-mono text-sm font-bold">{weapon.hit_rate}</div>
          </div>
          <div className="bg-black/30 rounded p-2 border border-gray-800 text-center">
            <div className="text-gray-400 text-[10px] mb-1">Used</div>
            <div className="text-white font-mono text-sm font-bold">{weapon.total_used}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RankPerformanceCard({ rankPerformance }: any) {
  if (!rankPerformance) return null
  return (
    <div className="glass-panel rounded-xl p-6 col-span-1 md:col-span-2 lg:col-span-4 animate-entry delay-300 border-t-2 border-t-cod-gold/50">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 bg-cod-gold rounded-full animate-pulse"></div>
        <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{rankPerformance.title}</h3>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <span className="inline-block px-4 py-2 bg-cod-gold/20 border border-cod-gold/50 rounded text-cod-gold font-heading text-lg">
          {rankPerformance.rating}
        </span>
        <p className="text-gray-300 text-sm flex-1">{rankPerformance.summary}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/30 rounded-lg p-5 border border-green-500/30">
          <h4 className="text-green-400 font-heading text-sm mb-3 flex items-center gap-2">
            <i className="fa-solid fa-check-circle"></i> Strengths
          </h4>
          <ul className="space-y-2">
            {(rankPerformance.strengths || []).map((strength: string, i: number) => (
              <li key={i} className="text-gray-400 text-xs flex items-start gap-2">
                <i className="fa-solid fa-plus text-green-400 mt-0.5"></i>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-black/30 rounded-lg p-5 border border-orange-500/30">
          <h4 className="text-orange-400 font-heading text-sm mb-3 flex items-center gap-2">
            <i className="fa-solid fa-arrow-trend-up"></i> Areas for Improvement
          </h4>
          <ul className="space-y-2">
            {(rankPerformance.improvements || []).map((improvement: string, i: number) => (
              <li key={i} className="text-gray-400 text-xs flex items-start gap-2">
                <i className="fa-solid fa-arrow-up text-orange-400 mt-0.5"></i>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

// Enhanced Seasonal Components with Hover Effects

function SeasonalRankCard({ username, season, rank, rankPoints, consecutiveWins }: any) {
  if (!season) return null
  return (
    <div className="glass-panel rounded-xl p-6 col-span-1 md:col-span-2 animate-entry delay-100 border-t-2 border-t-purple-500/50 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
          <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest group-hover:text-purple-400 transition">Seasonal Rank</h3>
        </div>
        <div className="text-center mb-4">
          <h2 className="text-4xl font-heading text-white mb-2 group-hover:text-purple-300 transition drop-shadow-lg">{username || 'Player'}</h2>
          <p className="text-purple-400 text-sm font-mono group-hover:text-purple-300 transition">{season}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/30 rounded-lg p-4 border border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] group/item">
            <div className="text-purple-400 text-xs mb-1 uppercase tracking-wider group-hover/item:text-purple-300 transition">Rank</div>
            <div className="text-white font-heading text-2xl group-hover/item:text-purple-200 transition">{rank}</div>
          </div>
          <div className="bg-black/30 rounded-lg p-4 border border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] group/item">
            <div className="text-purple-400 text-xs mb-1 uppercase tracking-wider group-hover/item:text-purple-300 transition">Win Streak</div>
            <div className="text-white font-heading text-2xl flex items-center gap-1 group-hover/item:text-purple-200 transition">
              {consecutiveWins} <i className="fa-solid fa-fire text-orange-500 text-lg group-hover/item:animate-pulse"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WeaponAnalysisCard({ weaponAnalysis }: any) {
  if (!weaponAnalysis) return null
  return (
    <div className="glass-panel rounded-xl p-6 col-span-1 md:col-span-2 animate-entry delay-200 border-t-2 border-t-purple-500/50 group">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
        <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest group-hover:text-purple-400 transition">{weaponAnalysis.title}</h3>
      </div>
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

function RankPerformanceCard_OLD({ rankPerformance }: any) {
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
