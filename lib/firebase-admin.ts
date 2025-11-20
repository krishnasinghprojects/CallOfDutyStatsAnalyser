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
      console.log('✅ Firebase Admin already initialized')
      return { app: adminApp, db: adminDb }
    }

    // Get credentials from environment
    const privateKey = process.env.FIREBASE_PRIVATE_KEY
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
    const projectId = process.env.FIREBASE_PROJECT_ID

    console.log('🔍 Checking Firebase Admin credentials:', {
      hasPrivateKey: !!privateKey,
      privateKeyLength: privateKey?.length || 0,
      hasClientEmail: !!clientEmail,
      clientEmail: clientEmail ? clientEmail.substring(0, 20) + '...' : 'missing',
      hasProjectId: !!projectId,
      projectId: projectId || 'missing',
    })

    if (!privateKey || !clientEmail || !projectId) {
      const missingVars = []
      if (!privateKey) missingVars.push('FIREBASE_PRIVATE_KEY')
      if (!clientEmail) missingVars.push('FIREBASE_CLIENT_EMAIL')
      if (!projectId) missingVars.push('FIREBASE_PROJECT_ID')
      
      throw new Error(`Missing Firebase Admin environment variables: ${missingVars.join(', ')}. Please add them in Vercel Dashboard → Settings → Environment Variables`)
    }

    // Initialize Firebase Admin
    console.log('🚀 Initializing Firebase Admin...')
    adminApp = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        // Handle both escaped and unescaped newlines
        privateKey: privateKey.replace(/\\n/g, '\n'),
      }),
    })

    adminDb = getFirestore(adminApp)
    
    console.log('✅ Firebase Admin initialized successfully')
    return { app: adminApp, db: adminDb }
  } catch (error: any) {
    console.error('❌ Firebase Admin initialization error:', {
      message: error.message,
      stack: error.stack,
    })
    throw error
  }
}

export function getAdminDb(): Firestore {
  const { db } = getFirebaseAdmin()
  return db
}
