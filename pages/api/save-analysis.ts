import type { NextApiRequest, NextApiResponse } from 'next'
import { randomBytes } from 'crypto'
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore, FieldValue } from 'firebase-admin/firestore'

// Initialize Firebase Admin with environment variables
if (!getApps().length) {
  try {
    // Check if we have the required environment variables
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
    const projectId = process.env.FIREBASE_PROJECT_ID

    if (privateKey && clientEmail && projectId) {
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      })
    } else {
      console.error('Missing Firebase Admin credentials in environment variables')
    }
  } catch (error) {
    console.log('Firebase admin initialization error', error)
  }
}

const db = getFirestore()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
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
