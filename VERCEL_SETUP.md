# Quick Vercel Setup Steps

## Step 1: Clean Up Git History (One-time)
```bash
# Remove Firebase credentials from git history
git rm --cached lib/call-of-duty-mobile-analyser-firebase-adminsdk-fbsvc-0c3da29058.json
git commit -m "Remove Firebase Admin SDK credentials"
git push
```

## Step 2: Verify Local Build Works
```bash
npm run build
npm run start
# Test at http://localhost:3000
```

## Step 3: Deploy to Vercel

### Via CLI (Easiest):
```bash
npm i -g vercel
vercel
```
Follow the prompts and add environment variables when asked.

### Via GitHub:
1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Select your repository
4. Click "Deploy"
5. Go to Settings → Environment Variables
6. Add these variables:

| Variable | Value |
|----------|-------|
| `GEMINI_API_KEY` | Your actual Gemini API key |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | AIzaSyAdaKVPnf8cDX476t5AIHMp2bps2ozT7as |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | call-of-duty-mobile-analyser.firebaseapp.com |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | call-of-duty-mobile-analyser |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | call-of-duty-mobile-analyser.firebasestorage.app |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | 1026259831830 |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | 1:1026259831830:web:a188c93b121bbe68b3b937 |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | G-P46PY1G9SJ |

## Step 4: Redeploy After Adding Environment Variables
```bash
vercel --prod
```

## What's Already Good ✅
- Next.js 14 configured correctly
- TypeScript setup is solid
- Tailwind CSS configured
- API routes properly structured
- Firebase Web SDK integration
- Image handling with proper size limits

## What Needs Attention ⚠️
- Remove exposed API keys from `.env` (done)
- Set environment variables in Vercel
- Firebase Admin SDK may not be needed (check if used in API routes)

## Troubleshooting

**Build fails?**
```bash
npm run build  # Test locally first
```

**API routes not working?**
- Check Vercel logs: `vercel logs`
- Verify environment variables are set
- Check browser DevTools Network tab

**Firebase auth not working?**
- Verify `NEXT_PUBLIC_FIREBASE_*` variables match your Firebase project
- Check Firebase console for security rules

## After Deployment
- Test all features on the live URL
- Monitor Vercel Analytics dashboard
- Set up error tracking (optional: Sentry, LogRocket)
