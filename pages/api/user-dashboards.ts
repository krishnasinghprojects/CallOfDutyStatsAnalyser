import type { NextApiRequest, NextApiResponse } from 'next'
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

// Initialize Firebase Admin with environment variables
if (!getApps().length) {
  try {
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
  if (req.method === 'GET') {
    // Get all dashboards for a user
    const { userId } = req.query

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'Invalid user ID' })
    }

    try {
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

      return res.status(200).json({ dashboards })
    } catch (error) {
      console.error('Fetch error:', error)
      return res.status(500).json({ error: 'Failed to fetch dashboards' })
    }
  } else if (req.method === 'DELETE') {
    // Delete a dashboard
    const { id, userId } = req.body

    if (!id || !userId) {
      return res.status(400).json({ error: 'Invalid request' })
    }

    try {
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
