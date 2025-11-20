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
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'POST') {
    // Save dashboard data and return shareable ID
    try {
      let db
      try {
        db = getAdminDb()
      } catch (initError: any) {
        console.error('Firebase initialization failed:', initError)
        return res.status(500).json({ 
          error: 'Database initialization failed',
          details: initError.message 
        })
      }

      const { dashboardData, userId } = req.body

      if (!dashboardData) {
        return res.status(400).json({ error: 'Invalid dashboard data' })
      }

      // Validate data structure (either overall or seasonal)
      const isOverall = dashboardData.profile !== undefined
      const isSeasonal = dashboardData.seasonal_data !== undefined
      
      if (!isOverall && !isSeasonal) {
        return res.status(400).json({ error: 'Invalid dashboard data structure' })
      }

      // Generate unique ID
      const shareId = randomBytes(8).toString('hex')

      // Determine analysis type
      const analysisType = dashboardData.type || (isSeasonal ? 'seasonal' : 'overall')

      // Store in Firestore
      await db.collection('sharedDashboards').doc(shareId).set({
        data: dashboardData,
        userId: userId || null,
        type: analysisType,
        createdAt: FieldValue.serverTimestamp(),
      })

      return res.status(200).json({ shareId })
    } catch (error: any) {
      console.error('Share error:', error)
      return res.status(500).json({ error: 'Failed to create shareable link' })
    }
  } else if (req.method === 'GET') {
    // Retrieve dashboard data by ID
    const { id } = req.query

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid share ID' })
    }

    try {
      const db = getAdminDb()
      
      // Try sharedDashboards first
      let doc = await db.collection('sharedDashboards').doc(id).get()
      
      // If not found, try userAnalyses
      if (!doc.exists) {
        doc = await db.collection('userAnalyses').doc(id).get()
      }

      if (!doc.exists) {
        return res.status(404).json({ error: 'Dashboard not found' })
      }

      const docData = doc.data()
      return res.status(200).json({ data: docData?.data })
    } catch (error) {
      console.error('Fetch error:', error)
      return res.status(500).json({ error: 'Failed to fetch dashboard' })
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}
