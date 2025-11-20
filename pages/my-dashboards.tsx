import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useAuth } from '@/contexts/AuthContext'

interface SavedDashboard {
  id: string
  data: any
  createdAt: any
}

export default function MyDashboards() {
  const router = useRouter()
  const { user, loading: authLoading, signInWithGoogle } = useAuth()
  const [dashboards, setDashboards] = useState<SavedDashboard[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/form')
    } else if (user) {
      fetchDashboards()
    }
  }, [user, authLoading, router])

  const fetchDashboards = async () => {
    if (!user) return

    try {
      const response = await fetch(`/api/user-dashboards?userId=${user.uid}`)
      if (response.ok) {
        const data = await response.json()
        setDashboards(data.dashboards)
      }
    } catch (error) {
      console.error('Error fetching dashboards:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this dashboard?')) return

    try {
      const response = await fetch('/api/user-dashboards', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, userId: user?.uid }),
      })

      if (response.ok) {
        setDashboards(dashboards.filter(d => d.id !== id))
      }
    } catch (error) {
      console.error('Error deleting dashboard:', error)
      alert('Failed to delete dashboard')
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-cod-gold text-4xl mb-4">
            <i className="fa-solid fa-spinner fa-spin"></i>
          </div>
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>My Dashboards | CODM Stats Analyzer</title>
      </Head>

      <div className="p-4 md:p-8 min-h-screen hidden">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <div className="text-[10px] font-mono tracking-[0.3em] uppercase mb-1 text-glow-cyan">
                Your Saved Analyses
              </div>
              <h1 className="text-3xl md:text-5xl font-heading text-white uppercase tracking-wider drop-shadow-lg">
                My <span className="text-cod-gold text-glow">Dashboards</span>
              </h1>
            </div>
            <button
              onClick={() => router.push('/form')}
              className="px-6 py-3 bg-gradient-to-r from-cod-gold/20 to-orange-500/20 border-2 border-cod-gold hover:border-orange-500 text-cod-gold hover:text-white font-heading rounded-lg transition-all duration-300 uppercase tracking-widest"
            >
              <i className="fa-solid fa-plus mr-2"></i>New Analysis
            </button>
          </div>

          {/* Dashboards Grid */}
          {dashboards.length === 0 ? (
            <div className="glass-panel rounded-xl p-12 text-center">
              <div className="text-gray-500 text-6xl mb-4">
                <i className="fa-solid fa-folder-open"></i>
              </div>
              <h3 className="text-white text-2xl font-heading mb-2">No Dashboards Yet</h3>
              <p className="text-gray-400 mb-6">Create your first analysis to see it here</p>
              <button
                onClick={() => router.push('/form')}
                className="px-6 py-3 bg-cod-gold text-black font-heading rounded-lg hover:bg-yellow-500 transition"
              >
                Create First Dashboard
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboards.map((dashboard) => (
                <div
                  key={dashboard.id}
                  className="glass-panel rounded-xl p-6 hover:border-cod-gold/50 transition-all duration-300 group cursor-pointer"
                  onClick={() => router.push(`/shared/${dashboard.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-cod-gold/20 flex items-center justify-center">
                        <i className="fa-solid fa-chart-line text-cod-gold text-xl"></i>
                      </div>
                      <div>
                        <h3 className="text-white font-heading text-lg group-hover:text-cod-gold transition">
                          {dashboard.data?.profile?.username || 'Unknown Player'}
                        </h3>
                        <p className="text-gray-500 text-xs">
                          {dashboard.createdAt?.toDate?.()?.toLocaleDateString() || 'Recently'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-black/40 p-2 rounded">
                      <div className="text-[9px] text-gray-500 uppercase">K/D</div>
                      <div className="text-white font-bold">
                        {dashboard.data?.combatRecord?.mainStats?.[0]?.value || 'N/A'}
                      </div>
                    </div>
                    <div className="bg-black/40 p-2 rounded">
                      <div className="text-[9px] text-gray-500 uppercase">Kills</div>
                      <div className="text-white font-bold">
                        {dashboard.data?.combatRecord?.gridStats?.[3]?.value || 'N/A'}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/shared/${dashboard.id}`)
                      }}
                      className="flex-1 px-4 py-2 bg-cod-gold/20 border border-cod-gold/50 text-cod-gold rounded hover:bg-cod-gold/30 transition text-sm font-semibold"
                    >
                      <i className="fa-solid fa-eye mr-2"></i>View
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(dashboard.id)
                      }}
                      className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded hover:bg-red-500/30 transition text-sm"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
