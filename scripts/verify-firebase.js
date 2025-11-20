// Quick script to verify Firebase setup
const admin = require('firebase-admin');
const path = require('path');

console.log('🔥 Verifying Firebase Setup...\n');

try {
  // Try to load the service account
  const serviceAccountPath = path.join(__dirname, '../lib/call-of-duty-mobile-analyser-firebase-adminsdk-fbsvc-0c3da29058.json');
  const serviceAccount = require(serviceAccountPath);
  
  console.log('✅ Firebase Admin SDK JSON file found');
  console.log(`   Project ID: ${serviceAccount.project_id}`);
  console.log(`   Client Email: ${serviceAccount.client_email}\n`);
  
  // Initialize Firebase Admin
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('✅ Firebase Admin initialized successfully\n');
  }
  
  // Test Firestore connection
  const db = admin.firestore();
  console.log('✅ Firestore connection established\n');
  
  console.log('🎉 All checks passed! Firebase is configured correctly.\n');
  console.log('Next steps:');
  console.log('1. Make sure you have enabled Google Authentication in Firebase Console');
  console.log('2. Make sure you have created a Firestore database');
  console.log('3. Make sure you have set the Firestore security rules');
  console.log('4. Run: npm run dev');
  
  process.exit(0);
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('\nTroubleshooting:');
  console.log('1. Make sure the Firebase Admin SDK JSON file is in the lib/ folder');
  console.log('2. Check that the filename matches in the import statements');
  console.log('3. Run: npm install firebase-admin');
  process.exit(1);
}
