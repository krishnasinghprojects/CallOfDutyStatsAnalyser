import type { NextApiRequest, NextApiResponse } from 'next'
import { getAdminDb } from '@/lib/firebase-admin'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'GET') {
    // Get all dashboards for a user
    const { userId } = req.query

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'Invalid user ID' })
    }

    console.log('📋 Fetching dashboards for user:', userId)

    try {
      let db
      try {
        db = getAdminDb()
        console.log('✅ Database connection established')
      } catch (initError: any) {
        console.error('❌ Firebase initialization failed:', initError)
        return res.status(500).json({ 
          error: 'Database not configured',
          message: 'Firebase Admin credentials are missing. Please configure environment variables in Vercel.',
          details: initError.message 
        })
      }
      // Try userAnalyses collection first (new structure)
      let snapshot = await db
        .collection('userAnalyses')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get()

      // If no results, try sharedDashboards (legacy)
      if (snapshot.empty) {
        snapshot = await db
          .collection('sharedDashboards')
          .where('userId', '==', userId)
          .orderBy('createdAt', 'desc')
          .limit(50)
          .get()
      }

      const dashboards = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))

      console.log(`✅ Found ${dashboards.length} dashboards`)
      return res.status(200).json({ dashboards })
    } catch (error: any) {
      console.error('❌ Fetch error:', error)
      return res.status(500).json({ 
        error: 'Failed to fetch dashboards',
        message: error.message 
      })
    }
  } else if (req.method === 'DELETE') {
    // Delete a dashboard
    const { id, userId } = req.body

    if (!id || !userId) {
      return res.status(400).json({ error: 'Invalid request' })
    }

    try {
      const db = getAdminDb()
      
      // Try userAnalyses first
      let doc = await db.collection('userAnalyses').doc(id).get()
      let collection = 'userAnalyses'

      // If not found, try sharedDashboards
      if (!doc.exists) {
        doc = await db.collection('sharedDashboards').doc(id).get()
        collection = 'sharedDashboards'
      }

      if (!doc.exists) {
        return res.status(404).json({ error: 'Dashboard not found' })
      }

      const data = doc.data()
      if (data?.userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized' })
      }

      // Delete from both collections if exists
      await db.collection(collection).doc(id).delete()
      
      // Also try to delete from the other collection (cleanup)
      try {
        if (collection === 'userAnalyses') {
          await db.collection('sharedDashboards').doc(id).delete()
        } else {
          await db.collection('userAnalyses').doc(id).delete()
        }
      } catch (e) {
        // Ignore if doesn't exist in other collection
      }

      return res.status(200).json({ success: true })
    } catch (error) {
      console.error('Delete error:', error)
      return res.status(500).json({ error: 'Failed to delete dashboard' })
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' })
  }
}
