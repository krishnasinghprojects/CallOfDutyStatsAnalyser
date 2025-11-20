import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/form')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-white">Redirecting to CODM Stats Analyzer...</p>
    </div>
  )
}
