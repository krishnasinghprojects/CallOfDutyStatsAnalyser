import type { NextApiRequest, NextApiResponse } from 'next'
import { randomBytes } from 'crypto'
import { getAdminDb } from '@/lib/firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const db = getAdminDb()
    const { dashboardData, userId } = req.body

    if (!dashboardData) {
      return res.status(400).json({ error: 'Invalid dashboard data' })
    }

    if (!userId) {
      return res.status(401).json({ error: 'User ID required' })
    }

    // Determine analysis type from data structure
    const analysisType = dashboardData.type || (dashboardData.seasonal_data ? 'seasonal' : 'overall')

    // Generate unique ID for the analysis
    const analysisId = randomBytes(8).toString('hex')

    // Save to Firestore under user's collection
    await db.collection('userAnalyses').doc(analysisId).set({
      data: dashboardData,
      userId: userId,
      type: analysisType,
      createdAt: FieldValue.serverTimestamp(),
    })

    // Also save to shared dashboards for the shareable link
    await db.collection('sharedDashboards').doc(analysisId).set({
      data: dashboardData,
      userId: userId,
      type: analysisType,
      createdAt: FieldValue.serverTimestamp(),
    })

    return res.status(200).json({ 
      success: true, 
      analysisId,
      shareUrl: `/shared/${analysisId}`
    })
  } catch (error: any) {
    console.error('Save error:', error)
    return res.status(500).json({ error: 'Failed to save analysis' })
  }
}
