import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getFirestore, Firestore } from 'firebase-admin/firestore'

let adminApp: App | null = null
let adminDb: Firestore | null = null

export function getFirebaseAdmin() {
  if (adminApp && adminDb) {
    return { app: adminApp, db: adminDb }
  }

  try {
    // Check if already initialized
    const apps = getApps()
    if (apps.length > 0) {
      adminApp = apps[0]
      adminDb = getFirestore(adminApp)
      return { app: adminApp, db: adminDb }
    }

    // Get credentials from environment
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
    const projectId = process.env.FIREBASE_PROJECT_ID

    if (!privateKey || !clientEmail || !projectId) {
      console.error('Missing Firebase Admin credentials:', {
        hasPrivateKey: !!privateKey,
        hasClientEmail: !!clientEmail,
        hasProjectId: !!projectId,
      })
      throw new Error('Firebase Admin credentials not configured')
    }

    // Initialize Firebase Admin
    adminApp = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        // Handle both escaped and unescaped newlines
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    })

    adminDb = getFirestore(adminApp)
    
    console.log('Firebase Admin initialized successfully')
    return { app: adminApp, db: adminDb }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error)
    throw error
  }
}

export function getAdminDb(): Firestore {
  const { db } = getFirebaseAdmin()
  return db
}
