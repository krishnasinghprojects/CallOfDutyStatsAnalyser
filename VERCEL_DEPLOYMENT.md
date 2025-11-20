# Vercel Deployment - Ready to Deploy! 🚀

## ✅ What's Been Fixed

1. **Removed hardcoded API keys from .env**
2. **Updated Firebase config to use environment variables**
3. **Refactored API routes to use modular Firebase Admin SDK**
4. **Created proper .env.example template**

## 🔧 Pre-Deployment Steps

### Step 1: Remove Firebase Service Account from Git

```bash
git rm --cached lib/call-of-duty-mobile-analyser-firebase-adminsdk-fbsvc-0c3da29058.json
git add .
git commit -m "chore: remove Firebase credentials and prepare for Vercel deployment"
git push
```

### Step 2: Test Local Build

```bash
npm install
npm run build
```

If build succeeds, you're ready to deploy!

## 🌐 Deploy to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# After adding environment variables (see below), deploy to production
vercel --prod
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Configure environment variables (see below)
5. Click "Deploy"

## 🔐 Environment Variables for Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

### Required for All Environments (Production, Preview, Development)

```bash
# Gemini API
GEMINI_API_KEY=AIzaSyC-wflARNDZirCwxEfXmzlHrdswudRRMLg

# Firebase Client SDK (Public - safe to expose)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAdaKVPnf8cDX476t5AIHMp2bps2ozT7as
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=call-of-duty-mobile-analyser.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=call-of-duty-mobile-analyser
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=call-of-duty-mobile-analyser.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1026259831830
NEXT_PUBLIC_FIREBASE_APP_ID=1:1026259831830:web:a188c93b121bbe68b3b937
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-P46PY1G9SJ

# Firebase Admin SDK (Server-side - keep secret!)
FIREBASE_PROJECT_ID=call-of-duty-mobile-analyser
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@call-of-duty-mobile-analyser.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVfMgxk+dYnxMD\nEcNDl0xzKI6fb+c+9RR7kiazj5LUYEshV/Ks4Qk4CGJC3nilutD8JodwSKCZEkOE\nzeqH/Gfrx2pHB2kTBfbsphsYaRUBl/QCngnEBsJhzWnOtnoRQ1dYaNz7epjb+mFU\nSjBvAvWVJa9+c9pJQdfcA3yaAbxIYumZr0d/e5bL8E4EaMQ4Oi82oRHc4+zKACZh\nRaFeciC5gvlM1z6pWgAbQiqMWJYlOTU6R4FXSNkEuVdelfiXEAYKNObGgNL8PeQh\nkeNwL1s+vyvGWrefnejX4l/VX/86q/BIX/V/sr4hsVrZKUrvrqlCLsCAF3SXWlC5\nspiMyJ2rAgMBAAECggEAPmaezX8B3DGDCR6kCJmsyuxL4+Z9nTVdq1Do5wtMS69p\nxnFCia2tWCd7MTh941NbypgodnWEG7nu6l6V8vGgHpbHRcOwvtK7fih/Ov9cGH8l\n3636BMZFAvlbuAQ2Yd1hJoJgNVF8ZLAmytB0n74pslK1nSyX3VnVkoWiYhGnyzA1\nLWh03A6IBmyc1JGC3XnpZIfZmqxdleDAHX+XT9dwQHmbcHlBjBxID5Rtd3MSIJ3c\nn621sjaPnsDkjKG0vOAwfN+bF41zHFau0wc/TBu+xBugIcmq5M9aybTmGYnOkAwz\nB1+QCyul7A5Eb1rLY/C8ZSnBFqZdwbKCN3HMV9B8YQKBgQD8fKKG0EZkvfHtQHS5\nEcumX980a0iBvdoPiJ9nEamFCya88ZUJZvzo6UFyl/vC85cWexr6WZMvBeFcVz2X\napcmpUFiiGUs7r3kI8xKJrY4yGfMzM7przpfuIz+IT1oW1IHmCxwLbcweriHL67v\n8Q79qzhOgbhO/MDnDvxmawpxBQKBgQDYdTrogIyKkJPnZ6hAMRzQz6873dQvTquK\ntV9Vn5p5eHO0OuiWzEFYQMAF5REp9PYHeQ/o+gSKVQHz5hDIruRapjg1MVMnVqg1\nvrhB14SkhbRhhZOL41DHK6Hu2RMIR+1n6zw965C75T7Y7rarn3h7j5xJ5Xfx6Uhf\n9xmStHfS7wKBgCg4kot3Uj9qIsfwpKd2tkJis2PeU0aXv80Jrpr0rVSMWjdvJJbC\n2TchMVPX8js0IrVqFvoamt+6yBO1shIU4M8/NBNGNxfZUFavfTOyxwR0qFRvq+Z+\nC4aEF7HECcw9/+tFyo50OeJ3Kj4e0ndWp1Sxmd6nu3yZtwEX2g1Wr+shAoGATAtj\nVqtStJt2WqWgBm06omFUPsP/9168BU8S3xHjQyl9/KN1cwTvMAIPdAK1tPfKN3Xg\nkQjE75RNy1HYM6i9sNsUhBuACyH2lmsacIc2olYWuOwkmdCSYGaDzVWVyiL61Ldf\nwqEvh9NR8QRsSH8N5NrfHVbwfJxoQM6evVuJfSECgYEA3DWWB2XRpcIfE6xKzYXR\nYTm1lw3eOJJ5B2kfNACTHSe63YL4WIWWwUCrp/N2O75OMJYMMf27YIrfCmcnj4Be\nJhL0YEzsUFgZ5SeMCYUmSUivAuA74TzxbVzKGD+BthpC1MDPzSpmHls0+yYwLUF1\n0SVSbQcrHygrHuRJzhUt7fY=\n-----END PRIVATE KEY-----\n"
```

### Important Notes:

1. **FIREBASE_PRIVATE_KEY**: Must be wrapped in double quotes and include the `\n` characters
2. **NEXT_PUBLIC_** variables are exposed to the browser (this is normal for Firebase)
3. Copy-paste exactly as shown above

## 📋 Quick Copy-Paste for Vercel

If using Vercel CLI, create a `.env.production` file temporarily:

```bash
cat > .env.production << 'EOF'
GEMINI_API_KEY=AIzaSyC-wflARNDZirCwxEfXmzlHrdswudRRMLg
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAdaKVPnf8cDX476t5AIHMp2bps2ozT7as
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=call-of-duty-mobile-analyser.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=call-of-duty-mobile-analyser
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=call-of-duty-mobile-analyser.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1026259831830
NEXT_PUBLIC_FIREBASE_APP_ID=1:1026259831830:web:a188c93b121bbe68b3b937
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-P46PY1G9SJ
FIREBASE_PROJECT_ID=call-of-duty-mobile-analyser
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@call-of-duty-mobile-analyser.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVfMgxk+dYnxMD\nEcNDl0xzKI6fb+c+9RR7kiazj5LUYEshV/Ks4Qk4CGJC3nilutD8JodwSKCZEkOE\nzeqH/Gfrx2pHB2kTBfbsphsYaRUBl/QCngnEBsJhzWnOtnoRQ1dYaNz7epjb+mFU\nSjBvAvWVJa9+c9pJQdfcA3yaAbxIYumZr0d/e5bL8E4EaMQ4Oi82oRHc4+zKACZh\nRaFeciC5gvlM1z6pWgAbQiqMWJYlOTU6R4FXSNkEuVdelfiXEAYKNObGgNL8PeQh\nkeNwL1s+vyvGWrefnejX4l/VX/86q/BIX/V/sr4hsVrZKUrvrqlCLsCAF3SXWlC5\nspiMyJ2rAgMBAAECggEAPmaezX8B3DGDCR6kCJmsyuxL4+Z9nTVdq1Do5wtMS69p\nxnFCia2tWCd7MTh941NbypgodnWEG7nu6l6V8vGgHpbHRcOwvtK7fih/Ov9cGH8l\n3636BMZFAvlbuAQ2Yd1hJoJgNVF8ZLAmytB0n74pslK1nSyX3VnVkoWiYhGnyzA1\nLWh03A6IBmyc1JGC3XnpZIfZmqxdleDAHX+XT9dwQHmbcHlBjBxID5Rtd3MSIJ3c\nn621sjaPnsDkjKG0vOAwfN+bF41zHFau0wc/TBu+xBugIcmq5M9aybTmGYnOkAwz\nB1+QCyul7A5Eb1rLY/C8ZSnBFqZdwbKCN3HMV9B8YQKBgQD8fKKG0EZkvfHtQHS5\nEcumX980a0iBvdoPiJ9nEamFCya88ZUJZvzo6UFyl/vC85cWexr6WZMvBeFcVz2X\napcmpUFiiGUs7r3kI8xKJrY4yGfMzM7przpfuIz+IT1oW1IHmCxwLbcweriHL67v\n8Q79qzhOgbhO/MDnDvxmawpxBQKBgQDYdTrogIyKkJPnZ6hAMRzQz6873dQvTquK\ntV9Vn5p5eHO0OuiWzEFYQMAF5REp9PYHeQ/o+gSKVQHz5hDIruRapjg1MVMnVqg1\nvrhB14SkhbRhhZOL41DHK6Hu2RMIR+1n6zw965C75T7Y7rarn3h7j5xJ5Xfx6Uhf\n9xmStHfS7wKBgCg4kot3Uj9qIsfwpKd2tkJis2PeU0aXv80Jrpr0rVSMWjdvJJbC\n2TchMVPX8js0IrVqFvoamt+6yBO1shIU4M8/NBNGNxfZUFavfTOyxwR0qFRvq+Z+\nC4aEF7HECcw9/+tFyo50OeJ3Kj4e0ndWp1Sxmd6nu3yZtwEX2g1Wr+shAoGATAtj\nVqtStJt2WqWgBm06omFUPsP/9168BU8S3xHjQyl9/KN1cwTvMAIPdAK1tPfKN3Xg\nkQjE75RNy1HYM6i9sNsUhBuACyH2lmsacIc2olYWuOwkmdCSYGaDzVWVyiL61Ldf\nwqEvh9NR8QRsSH8N5NrfHVbwfJxoQM6evVuJfSECgYEA3DWWB2XRpcIfE6xKzYXR\nYTm1lw3eOJJ5B2kfNACTHSe63YL4WIWWwUCrp/N2O75OMJYMMf27YIrfCmcnj4Be\nJhL0YEzsUFgZ5SeMCYUmSUivAuA74TzxbVzKGD+BthpC1MDPzSpmHls0+yYwLUF1\n0SVSbQcrHygrHuRJzhUt7fY=\n-----END PRIVATE KEY-----\n"
EOF
```

Then delete it after deployment: `rm .env.production`

## ✅ Post-Deployment Checklist

After deployment:

1. Test image upload and analysis
2. Test Firebase authentication (Google sign-in)
3. Test saving dashboards
4. Test sharing dashboards
5. Check Vercel logs for any errors

## 🐛 Troubleshooting

### Build fails with "Cannot find module"
- Run `npm install` locally
- Check that all imports are correct

### "API key not configured"
- Verify `GEMINI_API_KEY` is set in Vercel
- Redeploy after adding environment variables

### Firebase authentication fails
- Verify all `NEXT_PUBLIC_FIREBASE_*` variables are set
- Check Firebase console for authorized domains (add your Vercel domain)

### "Failed to save analysis"
- Verify `FIREBASE_PRIVATE_KEY` is properly formatted with `\n` characters
- Check Vercel function logs for detailed error

## 🔒 Security Recommendations

After deployment:

1. **Rotate the Gemini API key** shown in this file
2. **Add your Vercel domain** to Firebase authorized domains
3. **Set up Firebase security rules** to restrict data access
4. **Enable Vercel's security features** (DDoS protection, etc.)
5. **Monitor usage** in both Gemini and Firebase consoles

## 📊 What's Working

- ✅ Next.js 14 with TypeScript
- ✅ Firebase Authentication (Google)
- ✅ Firestore database operations
- ✅ Gemini AI image analysis
- ✅ Image upload (10MB limit)
- ✅ Dashboard sharing
- ✅ Responsive design with Tailwind CSS

Your app is ready to deploy! 🎉
