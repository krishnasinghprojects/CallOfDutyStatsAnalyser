import { useState, useRef, DragEvent, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useAuth } from '@/contexts/AuthContext'

interface ExistingDashboard {
  id: string
  type: 'overall' | 'seasonal'
  createdAt: any
}

export default function FormPage() {
  const router = useRouter()
  const { user, loading: authLoading, signInWithGoogle, signOut } = useAuth()
  
  // Analysis type selection
  const [analysisType, setAnalysisType] = useState<'overall' | 'seasonal'>('overall')
  
  // Overall analysis (2 images)
  const [screenshot1, setScreenshot1] = useState<File | null>(null)
  const [screenshot2, setScreenshot2] = useState<File | null>(null)
  const [preview1, setPreview1] = useState<string>('')
  const [preview2, setPreview2] = useState<string>('')
  
  // Seasonal analysis (4 images)
  const [seasonalScreenshots, setSeasonalScreenshots] = useState<(File | null)[]>([null, null, null, null])
  const [seasonalPreviews, setSeasonalPreviews] = useState<string[]>(['', '', '', ''])
  
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Processing your screenshots...')

  const fileInput1 = useRef<HTMLInputElement>(null)
  const fileInput2 = useRef<HTMLInputElement>(null)
  const seasonalFileInputs = useRef<(HTMLInputElement | null)[]>([null, null, null, null])

  // Show login prompt if not authenticated
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  // Existing dashboards
  const [existingDashboards, setExistingDashboards] = useState<ExistingDashboard[]>([])
  const [hasOverallDashboard, setHasOverallDashboard] = useState(false)
  const [hasSeasonalDashboard, setHasSeasonalDashboard] = useState(false)
  const [latestOverallId, setLatestOverallId] = useState<string | null>(null)
  const [latestSeasonalId, setLatestSeasonalId] = useState<string | null>(null)

  // Fetch existing dashboards when user logs in
  useEffect(() => {
    if (user) {
      fetchExistingDashboards()
    } else {
      setExistingDashboards([])
      setHasOverallDashboard(false)
      setHasSeasonalDashboard(false)
      setLatestOverallId(null)
      setLatestSeasonalId(null)
    }
  }, [user])

  const fetchExistingDashboards = async () => {
    if (!user) return

    try {
      const response = await fetch(`/api/user-dashboards?userId=${user.uid}`)
      if (response.ok) {
        const { dashboards } = await response.json()
        setExistingDashboards(dashboards)
        
        // Find latest overall and seasonal dashboards
        const overallDashboards = dashboards.filter((d: ExistingDashboard) => d.type === 'overall' || !d.type)
        const seasonalDashboards = dashboards.filter((d: ExistingDashboard) => d.type === 'seasonal')
        
        if (overallDashboards.length > 0) {
          setHasOverallDashboard(true)
          setLatestOverallId(overallDashboards[0].id) // Already sorted by createdAt desc
        }
        
        if (seasonalDashboards.length > 0) {
          setHasSeasonalDashboard(true)
          setLatestSeasonalId(seasonalDashboards[0].id)
        }
      }
    } catch (error) {
      console.error('Failed to fetch dashboards:', error)
    }
  }

  const viewDashboard = async (dashboardId: string) => {
    try {
      // Fetch the dashboard data
      const response = await fetch(`/api/share?id=${dashboardId}`)
      if (response.ok) {
        const { data } = await response.json()
        // Save to localStorage and navigate
        localStorage.setItem('analysisData', JSON.stringify(data))
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Failed to load dashboard:', error)
      alert('Failed to load dashboard')
    }
  }

  const handleFileSelect = (file: File, screenshotNum: 1 | 2) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (screenshotNum === 1) {
          setScreenshot1(file)
          setPreview1(result)
        } else {
          setScreenshot2(file)
          setPreview2(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSeasonalFileSelect = (file: File, index: number) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        const newScreenshots = [...seasonalScreenshots]
        newScreenshots[index] = file
        setSeasonalScreenshots(newScreenshots)
        
        const newPreviews = [...seasonalPreviews]
        newPreviews[index] = result
        setSeasonalPreviews(newPreviews)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.classList.add('dragover')
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('dragover')
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>, screenshotNum: 1 | 2) => {
    e.preventDefault()
    e.currentTarget.classList.remove('dragover')
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file, screenshotNum)
    }
  }

  const clearFile = (screenshotNum: 1 | 2) => {
    if (screenshotNum === 1) {
      setScreenshot1(null)
      setPreview1('')
      if (fileInput1.current) fileInput1.current.value = ''
    } else {
      setScreenshot2(null)
      setPreview2('')
      if (fileInput2.current) fileInput2.current.value = ''
    }
  }

  const clearSeasonalFile = (index: number) => {
    const newScreenshots = [...seasonalScreenshots]
    newScreenshots[index] = null
    setSeasonalScreenshots(newScreenshots)
    
    const newPreviews = [...seasonalPreviews]
    newPreviews[index] = ''
    setSeasonalPreviews(newPreviews)
    
    if (seasonalFileInputs.current[index]) {
      seasonalFileInputs.current[index]!.value = ''
    }
  }

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const result = reader.result as string
        resolve(result.split(',')[1])
      }
      reader.onerror = error => reject(error)
    })
  }

  const updateProgress = (value: number, message?: string) => {
    setProgress(value)
    if (message) setLoadingText(message)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Check if user is logged in
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    if (analysisType === 'overall') {
      // Overall analysis validation
      if (!screenshot1 || !screenshot2) {
        alert('Please upload both screenshots')
        return
      }

      setLoading(true)
      updateProgress(10, 'Converting images...')

      try {
        updateProgress(20, 'Processing first screenshot...')
        const image1Base64 = await toBase64(screenshot1)

        updateProgress(35, 'Processing second screenshot...')
        const image2Base64 = await toBase64(screenshot2)

        updateProgress(50, 'Sending to AI for analysis...')

        // Simulate AI thinking with progress updates
        setTimeout(() => updateProgress(60, 'AI analyzing gameplay patterns...'), 1000)
        setTimeout(() => updateProgress(70, 'Extracting statistics...'), 2000)
        setTimeout(() => updateProgress(80, 'Calculating performance metrics...'), 3000)

        // Call our API route instead of directly calling Gemini
        const response = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image1Base64,
            image2Base64,
            image1Type: screenshot1.type,
            image2Type: screenshot2.type,
          }),
        })

        updateProgress(95, 'Finalizing report...')

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `API Error: ${response.status}`)
        }

        const analysisData = await response.json()

        updateProgress(98, 'Processing results...')

        // Save to localStorage
        localStorage.setItem('analysisData', JSON.stringify(analysisData))

        // Save to Firebase
        updateProgress(99, 'Saving to your account...')
        
        try {
          const saveResponse = await fetch('/api/save-analysis', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              dashboardData: analysisData,
              userId: user?.uid,
            }),
          })

          if (saveResponse.ok) {
            const { analysisId } = await saveResponse.json()
            console.log('Analysis saved with ID:', analysisId)
          }
        } catch (saveError) {
          console.error('Failed to save to Firebase:', saveError)
          // Continue anyway - user can still see results
        }

        updateProgress(100, 'Complete! Redirecting...')

        setTimeout(() => {
          router.push('/dashboard')
        }, 800)
      } catch (error: any) {
        console.error('Error:', error)
        alert('Analysis failed: ' + error.message + '\n\nPlease try again.')
        setLoading(false)
        setProgress(0)
      }
    } else {
      // Seasonal analysis validation
      const allUploaded = seasonalScreenshots.every(s => s !== null)
      if (!allUploaded) {
        alert('Please upload all 4 screenshots for seasonal analysis')
        return
      }

      setLoading(true)
      updateProgress(10, 'Converting images...')

      try {
        updateProgress(20, 'Processing seasonal screenshots...')
        const images = await Promise.all(
          seasonalScreenshots.map(screenshot => toBase64(screenshot!))
        )
        const imageTypes = seasonalScreenshots.map(screenshot => screenshot!.type)

        updateProgress(50, 'Sending to AI for seasonal analysis...')

        // Simulate AI thinking
        setTimeout(() => updateProgress(60, 'AI analyzing seasonal stats...'), 1000)
        setTimeout(() => updateProgress(70, 'Extracting weapon data...'), 2000)
        setTimeout(() => updateProgress(80, 'Calculating performance metrics...'), 3000)

        const response = await fetch('/api/analyze-seasonal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            images,
            imageTypes,
          }),
        })

        updateProgress(95, 'Finalizing seasonal report...')

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `API Error: ${response.status}`)
        }

        const analysisData = await response.json()

        updateProgress(98, 'Processing results...')

        // Save to localStorage
        localStorage.setItem('analysisData', JSON.stringify(analysisData))

        // Save to Firebase
        updateProgress(99, 'Saving to your account...')
        
        try {
          const saveResponse = await fetch('/api/save-analysis', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              dashboardData: analysisData,
              userId: user?.uid,
            }),
          })

          if (saveResponse.ok) {
            const { analysisId } = await saveResponse.json()
            console.log('Seasonal analysis saved with ID:', analysisId)
          }
        } catch (saveError) {
          console.error('Failed to save to Firebase:', saveError)
        }

        updateProgress(100, 'Complete! Redirecting...')

        setTimeout(() => {
          router.push('/dashboard')
        }, 800)
      } catch (error: any) {
        console.error('Error:', error)
        alert('Seasonal analysis failed: ' + error.message + '\n\nPlease try again.')
        setLoading(false)
        setProgress(0)
      }
    }
  }

  return (
    <>
      <Head>
        <title>CODM Stats Analyzer | AI-Powered</title>
      </Head>

      <div className="p-4 md:p-8 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-[10px] font-mono tracking-[0.3em] uppercase mb-2 text-glow-cyan">
              AI-Powered Stats Analysis
            </div>
            <h1 className="text-4xl md:text-6xl font-heading text-white uppercase tracking-wider drop-shadow-lg mb-2">
              CODM <span className="text-cod-gold text-glow">Analyzer</span>
            </h1>
            <p className="text-gray-400 text-sm">Upload your screenshots and let AI analyze your gameplay</p>
            
            {/* User Info / Login Button */}
            {!authLoading && (
              <div className="mt-4">
                {user ? (
                  <div className="flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-gray-700">
                      {user.photoURL && (
                        <img src={user.photoURL} alt={user.displayName || 'User'} className="w-8 h-8 rounded-full" />
                      )}
                      <span className="text-white text-sm">{user.displayName || user.email}</span>
                    </div>
                    <button
                      onClick={signOut}
                      className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition text-sm"
                    >
                      <i className="fa-solid fa-sign-out mr-2"></i>Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={signInWithGoogle}
                    className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition flex items-center gap-3 mx-auto"
                  >
                    <i className="fa-brands fa-google text-xl"></i>
                    Sign in with Google to Continue
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Form */}
          {!loading && (
            <div className="glass-panel rounded-xl p-8 border-t-2 border-t-cod-gold/50 animate-entry">
              <form onSubmit={handleSubmit}>
                {/* Analysis Type Toggle */}
                <div className="mb-8">
                  <div className="text-center mb-4">
                    <h3 className="text-white font-heading text-lg mb-2">Choose Analysis Type</h3>
                    <p className="text-gray-500 text-xs">Select the type of analysis you want to perform</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setAnalysisType('overall')}
                      className={`px-6 py-6 rounded-lg font-heading uppercase tracking-wider transition-all duration-300 ${
                        analysisType === 'overall'
                          ? 'bg-cod-gold text-black border-2 border-cod-gold shadow-[0_0_20px_rgba(255,215,0,0.4)]'
                          : 'bg-black/40 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <i className="fa-solid fa-chart-line text-2xl mb-2 block"></i>
                      <div className="text-base">Overall Analysis</div>
                      <div className="text-xs mt-1 opacity-75 normal-case">2 Images: Profile + Stats</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAnalysisType('seasonal')}
                      className={`px-6 py-6 rounded-lg font-heading uppercase tracking-wider transition-all duration-300 ${
                        analysisType === 'seasonal'
                          ? 'bg-purple-500 text-white border-2 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                          : 'bg-black/40 text-gray-400 border-2 border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <i className="fa-solid fa-trophy text-2xl mb-2 block"></i>
                      <div className="text-base">Seasonal Analysis</div>
                      <div className="text-xs mt-1 opacity-75 normal-case">4 Images: Rank + 3 Weapons</div>
                    </button>
                  </div>
                </div>

                {/* Conditional Upload Sections */}
                {analysisType === 'overall' ? (
                  <>
                    {/* Screenshot 1 Upload */}
                    <div className="mb-6">
                      <label className="block text-cod-gold text-sm font-heading mb-3 tracking-widest uppercase flex items-center gap-2">
                        <i className="fa-solid fa-image"></i>
                        <span>Home Page Screenshot</span>
                        <span className="text-[10px] text-gray-500 font-mono normal-case">(Profile/Level)</span>
                  </label>
                  <div
                    className="upload-box rounded-lg overflow-hidden border border-gray-700 hover:border-cod-gold/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 1)}
                    onClick={() => !preview1 && fileInput1.current?.click()}
                  >
                    {!preview1 ? (
                      <div className="upload-content p-20 text-center cursor-pointer">
                        <i className="fa-solid fa-cloud-arrow-up text-5xl text-cod-gold mb-3 animate-bounce"></i>
                        <p className="text-gray-300 text-base font-semibold mb-1">Click to upload or drag & drop</p>
                        <p className="text-gray-500 text-xs">PNG, JPG up to 10MB</p>
                        <input
                          ref={fileInput1}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0], 1)}
                          required
                        />
                      </div>
                    ) : (
                      <div className="preview-container active fade-in">
                        <img src={preview1} className="preview-image mb-4" alt="Screenshot 1" />
                        <button
                          type="button"
                          className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300 text-sm font-semibold hover:scale-105"
                          onClick={(e) => {
                            e.stopPropagation()
                            clearFile(1)
                          }}
                        >
                          <i className="fa-solid fa-trash mr-2"></i>Remove Image
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Screenshot 2 Upload */}
                <div className="mb-6">
                  <label className="block text-cod-gold text-sm font-heading mb-3 tracking-widest uppercase flex items-center gap-2">
                    <i className="fa-solid fa-chart-simple"></i>
                    <span>Stats Page Screenshot</span>
                    <span className="text-[10px] text-gray-500 font-mono normal-case">(K/D, Accuracy, etc.)</span>
                  </label>
                  <div
                    className="upload-box rounded-lg overflow-hidden border border-gray-700 hover:border-cod-gold/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.2)]"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, 2)}
                    onClick={() => !preview2 && fileInput2.current?.click()}
                  >
                    {!preview2 ? (
                      <div className="upload-content p-20 text-center cursor-pointer">
                        <i className="fa-solid fa-cloud-arrow-up text-5xl text-cod-gold mb-3 animate-bounce"></i>
                        <p className="text-gray-300 text-base font-semibold mb-1">Click to upload or drag & drop</p>
                        <p className="text-gray-500 text-xs">PNG, JPG up to 10MB</p>
                        <input
                          ref={fileInput2}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0], 2)}
                          required
                        />
                      </div>
                    ) : (
                      <div className="preview-container active fade-in">
                        <img src={preview2} className="preview-image mb-4" alt="Screenshot 2" />
                        <button
                          type="button"
                          className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300 text-sm font-semibold hover:scale-105"
                          onClick={(e) => {
                            e.stopPropagation()
                            clearFile(2)
                          }}
                        >
                          <i className="fa-solid fa-trash mr-2"></i>Remove Image
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                  </>
                ) : (
                  <>
                    {/* Seasonal Analysis - 4 Images */}
                    <div className="mb-6">
                      <label className="block text-purple-400 text-sm font-heading mb-3 tracking-widest uppercase flex items-center gap-2">
                        <i className="fa-solid fa-trophy"></i>
                        <span>Seasonal Rank Stats</span>
                        <span className="text-[10px] text-gray-500 font-mono normal-case">(Matches, K/D, Wins)</span>
                      </label>
                      <div
                        className="upload-box rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                        onClick={() => !seasonalPreviews[0] && seasonalFileInputs.current[0]?.click()}
                      >
                        {!seasonalPreviews[0] ? (
                          <div className="upload-content p-20 text-center cursor-pointer">
                            <i className="fa-solid fa-cloud-arrow-up text-5xl text-purple-400 mb-3 animate-bounce"></i>
                            <p className="text-gray-300 text-base font-semibold mb-1">Upload Seasonal Rank Screenshot</p>
                            <p className="text-gray-500 text-xs">PNG, JPG up to 10MB</p>
                            <input
                              ref={(el) => { seasonalFileInputs.current[0] = el }}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => e.target.files?.[0] && handleSeasonalFileSelect(e.target.files[0], 0)}
                              required
                            />
                          </div>
                        ) : (
                          <div className="preview-container active fade-in">
                            <img src={seasonalPreviews[0]} className="preview-image mb-4" alt="Seasonal Rank" />
                            <button
                              type="button"
                              className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300 text-sm font-semibold hover:scale-105"
                              onClick={(e) => {
                                e.stopPropagation()
                                clearSeasonalFile(0)
                              }}
                            >
                              <i className="fa-solid fa-trash mr-2"></i>Remove Image
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {/* Weapon 1 */}
                      <div>
                        <label className="block text-purple-400 text-sm font-heading mb-3 tracking-widest uppercase flex items-center gap-2">
                          <i className="fa-solid fa-gun"></i>
                          <span>Most Used Weapon</span>
                        </label>
                        <div
                          className="upload-box rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                          onClick={() => !seasonalPreviews[1] && seasonalFileInputs.current[1]?.click()}
                        >
                          {!seasonalPreviews[1] ? (
                            <div className="upload-content flex flex-col mt-10 p-12 text-center cursor-pointer">
                              <i className="fa-solid fa-cloud-arrow-up text-3xl text-purple-400 mb-2"></i>
                              <p className="text-gray-300 text-sm font-semibold">Weapon #1</p>
                              <input
                                ref={(el) => { seasonalFileInputs.current[1] = el }}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => e.target.files?.[0] && handleSeasonalFileSelect(e.target.files[0], 1)}
                                required
                              />
                            </div>
                          ) : (
                            <div className="preview-container active fade-in">
                              <img src={seasonalPreviews[1]} className="preview-image mb-2" alt="Weapon 1" />
                              <button
                                type="button"
                                className="px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-400 rounded text-xs hover:bg-red-500/30 transition"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  clearSeasonalFile(1)
                                }}
                              >
                                <i className="fa-solid fa-trash mr-1"></i>Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Weapon 2 */}
                      <div>
                        <label className="block text-purple-400 text-sm font-heading mb-3 tracking-widest uppercase flex items-center gap-2">
                          <i className="fa-solid fa-gun"></i>
                          <span>2nd Most Used</span>
                        </label>
                        <div
                          className="upload-box rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                          onClick={() => !seasonalPreviews[2] && seasonalFileInputs.current[2]?.click()}
                        >
                          {!seasonalPreviews[2] ? (
                            <div className="upload-content mt-10 p-12 text-center cursor-pointer">
                              <i className="fa-solid fa-cloud-arrow-up text-3xl text-purple-400 mb-2"></i>
                              <p className="text-gray-300 text-sm font-semibold">Weapon #2</p>
                              <input
                                ref={(el) => { seasonalFileInputs.current[2] = el }}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => e.target.files?.[0] && handleSeasonalFileSelect(e.target.files[0], 2)}
                                required
                              />
                            </div>
                          ) : (
                            <div className="preview-container active fade-in">
                              <img src={seasonalPreviews[2]} className="preview-image mb-2" alt="Weapon 2" />
                              <button
                                type="button"
                                className="px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-400 rounded text-xs hover:bg-red-500/30 transition"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  clearSeasonalFile(2)
                                }}
                              >
                                <i className="fa-solid fa-trash mr-1"></i>Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Weapon 3 */}
                      <div>
                        <label className="block text-purple-400 text-sm font-heading mb-3 tracking-widest uppercase flex items-center gap-2">
                          <i className="fa-solid fa-gun"></i>
                          <span>3rd Most Used</span>
                        </label>
                        <div
                          className="upload-box rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                          onClick={() => !seasonalPreviews[3] && seasonalFileInputs.current[3]?.click()}
                        >
                          {!seasonalPreviews[3] ? (
                            <div className="upload-content mt-10 p-12 text-center cursor-pointer">
                              <i className="fa-solid fa-cloud-arrow-up text-3xl text-purple-400 mb-2"></i>
                              <p className="text-gray-300 text-sm font-semibold">Weapon #3</p>
                              <input
                                ref={(el) => { seasonalFileInputs.current[3] = el }}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => e.target.files?.[0] && handleSeasonalFileSelect(e.target.files[0], 3)}
                                required
                              />
                            </div>
                          ) : (
                            <div className="preview-container active fade-in">
                              <img src={seasonalPreviews[3]} className="preview-image mb-2" alt="Weapon 3" />
                              <button
                                type="button"
                                className="px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-400 rounded text-xs hover:bg-red-500/30 transition"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  clearSeasonalFile(3)
                                }}
                              >
                                <i className="fa-solid fa-trash mr-1"></i>Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="group relative w-full bg-gradient-to-r from-cod-gold/20 to-orange-500/20 border-2 border-cod-gold hover:border-orange-500 text-cod-gold hover:text-white font-heading text-xl py-5 rounded-lg transition-all duration-300 uppercase tracking-widest overflow-hidden hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] animate-pulse-glow"
                >

                  <span className="relative flex items-center justify-center gap-3">
                    <i className="fa-solid fa-brain text-2xl group-hover:animate-pulse"></i>
                    <span>Analyze with AI</span>
                    <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
                  </span>
                </button>
              </form>

              {/* View Existing Dashboard Buttons */}
              {user && (hasOverallDashboard || hasSeasonalDashboard) && (
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <p className="text-gray-400 text-sm mb-4 text-center">
                    <i className="fa-solid fa-history mr-2"></i>
                    You have existing analyses
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hasOverallDashboard && latestOverallId && (
                      <button
                        onClick={() => viewDashboard(latestOverallId)}
                        className="group relative px-6 py-4 bg-gradient-to-r from-cod-gold/10 to-orange-500/10 border-2 border-cod-gold/50 text-cod-gold rounded-lg hover:border-cod-gold transition-all duration-300 font-heading uppercase tracking-wider text-sm hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] overflow-hidden"
                      >
                        <span className="relative flex items-center justify-center gap-2">
                          <i className="fa-solid fa-chart-line"></i>
                          View Overall Dashboard
                          <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
                        </span>
                      </button>
                    )}
                    {hasSeasonalDashboard && latestSeasonalId && (
                      <button
                        onClick={() => viewDashboard(latestSeasonalId)}
                        className="group relative px-6 py-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-500/50 text-purple-400 rounded-lg hover:border-purple-500 transition-all duration-300 font-heading uppercase tracking-wider text-sm hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative flex items-center justify-center gap-2">
                          <i className="fa-solid fa-trophy"></i>
                          View Seasonal Dashboard
                          <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
                        </span>
                      </button>
                    )}
                  </div>
                  <div className="mt-3 text-center">
                    <button
                      onClick={() => router.push('/my-dashboards')}
                      className="text-gray-500 hover:text-gray-300 text-xs transition-colors duration-300"
                    >
                      <i className="fa-solid fa-list mr-1"></i>
                      View all saved analyses
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Loading Screen */}
          {loading && (
            <div className="glass-panel rounded-xl p-8 border-t-2 border-t-cod-gold/50 fade-in">
              <div className="text-center">
                <div className="text-cod-gold text-4xl mb-4">
                  <i className="fa-solid fa-brain fa-beat"></i>
                </div>
                <h3 className="font-heading text-2xl text-white mb-2">ANALYZING...</h3>
                <p className="text-gray-400 text-sm mb-6">{loadingText}</p>

                {/* Progress Bar */}
                <div className="w-full bg-black/40 rounded-full h-3 mb-4 border border-gray-700 overflow-hidden">
                  <div
                    className="loading-bar bg-gradient-to-r from-cod-gold via-orange-500 to-cod-gold h-full rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="text-xs text-gray-500 font-mono">
                  <span>{Math.floor(progress)}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Login Prompt Modal */}
          {showLoginPrompt && !user && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="glass-panel rounded-xl p-8 max-w-md w-full border-t-2 border-t-cod-gold/50 animate-entry">
                <div className="text-center">
                  <div className="text-cod-gold text-4xl mb-4">
                    <i className="fa-solid fa-lock"></i>
                  </div>
                  <h3 className="font-heading text-2xl text-white mb-2">AUTHENTICATION REQUIRED</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Please sign in with Google to analyze your stats and save your results
                  </p>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={signInWithGoogle}
                      className="w-full px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition flex items-center justify-center gap-3"
                    >
                      <i className="fa-brands fa-google text-xl"></i>
                      Sign in with Google
                    </button>
                    <button
                      onClick={() => setShowLoginPrompt(false)}
                      className="w-full px-6 py-3 bg-gray-700/50 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
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
                      <i className="fa-solid fa-envelope mr-2 "></i>
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
