# Deployment Guide

Complete guide for deploying CODM Stats Analyzer to various platforms.

## 📋 Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Deploy to Vercel](#deploy-to-vercel-recommended)
- [Deploy to Netlify](#deploy-to-netlify)
- [Deploy to AWS](#deploy-to-aws)
- [Deploy to DigitalOcean](#deploy-to-digitalocean)
- [Custom Domain Setup](#custom-domain-setup)
- [Environment Variables](#environment-variables)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

Before deploying, ensure you have:

- ✅ All code committed to Git
- ✅ `.env` file configured (but not committed)
- ✅ Firebase project set up
- ✅ Google Gemini API key obtained
- ✅ Production build tested locally
- ✅ All dependencies installed
- ✅ No console errors or warnings

### Test Production Build Locally

```bash
# Build the project
npm run build

# Start production server
npm start

# Test at http://localhost:3000
```

---

## Deploy to Vercel (Recommended)

Vercel is the recommended platform as it's built by the Next.js team and offers the best integration.

### Method 1: Deploy via GitHub (Recommended)

1. **Push to GitHub**

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

2. **Import to Vercel**

- Go to [vercel.com](https://vercel.com)
- Click "Add New" → "Project"
- Import your GitHub repository
- Vercel will auto-detect Next.js settings

3. **Configure Environment Variables**

Add all variables from your `.env` file:

```
GEMINI_API_KEY=your_key_here
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

4. **Deploy**

- Click "Deploy"
- Wait for build to complete (2-3 minutes)
- Your app will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**

```bash
npm install -g vercel
```

2. **Login to Vercel**

```bash
vercel login
```

3. **Deploy**

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

4. **Add Environment Variables**

```bash
vercel env add GEMINI_API_KEY
vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
# ... add all other variables
```

### Vercel Configuration

Create `vercel.json` (optional):

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

---

## Deploy to Netlify

### Method 1: Deploy via GitHub

1. **Push to GitHub**

```bash
git push origin main
```

2. **Import to Netlify**

- Go to [netlify.com](https://netlify.com)
- Click "Add new site" → "Import an existing project"
- Connect to GitHub and select your repository

3. **Build Settings**

```
Build command: npm run build
Publish directory: .next
```

4. **Environment Variables**

Add all variables from `.env` in Site Settings → Environment Variables

5. **Deploy**

Click "Deploy site"

### Method 2: Deploy via Netlify CLI

1. **Install Netlify CLI**

```bash
npm install -g netlify-cli
```

2. **Login**

```bash
netlify login
```

3. **Initialize**

```bash
netlify init
```

4. **Deploy**

```bash
# Deploy to preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Deploy to AWS

### Using AWS Amplify

1. **Install Amplify CLI**

```bash
npm install -g @aws-amplify/cli
amplify configure
```

2. **Initialize Amplify**

```bash
amplify init
```

3. **Add Hosting**

```bash
amplify add hosting
```

Select:
- Hosting with Amplify Console
- Continuous deployment

4. **Deploy**

```bash
amplify publish
```

### Using AWS Elastic Beanstalk

1. **Install EB CLI**

```bash
pip install awsebcli
```

2. **Initialize**

```bash
eb init
```

3. **Create Environment**

```bash
eb create production
```

4. **Set Environment Variables**

```bash
eb setenv GEMINI_API_KEY=your_key
eb setenv NEXT_PUBLIC_FIREBASE_API_KEY=your_key
# ... add all variables
```

5. **Deploy**

```bash
eb deploy
```

---

## Deploy to DigitalOcean

### Using App Platform

1. **Create App**

- Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
- Click "Create App"
- Connect to GitHub

2. **Configure**

```
Build Command: npm run build
Run Command: npm start
HTTP Port: 3000
```

3. **Environment Variables**

Add all variables from `.env`

4. **Deploy**

Click "Create Resources"

### Using Droplet (Manual)

1. **Create Droplet**

- Ubuntu 22.04 LTS
- At least 1GB RAM

2. **SSH into Droplet**

```bash
ssh root@your_droplet_ip
```

3. **Install Node.js**

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **Clone Repository**

```bash
git clone https://github.com/yourusername/codm-stats-analyzer.git
cd codm-stats-analyzer
```

5. **Install Dependencies**

```bash
npm install
```

6. **Set Environment Variables**

```bash
nano .env
# Add all variables
```

7. **Build**

```bash
npm run build
```

8. **Install PM2**

```bash
npm install -g pm2
```

9. **Start Application**

```bash
pm2 start npm --name "codm-analyzer" -- start
pm2 save
pm2 startup
```

10. **Configure Nginx**

```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/codm-analyzer
```

Add:

```nginx
server {
    listen 80;
    server_name your_domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/codm-analyzer /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Custom Domain Setup

### Vercel

1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Netlify

1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

### Cloudflare (Recommended for any platform)

1. Add site to Cloudflare
2. Update nameservers at your registrar
3. Add DNS records pointing to your deployment
4. Enable SSL/TLS (Full)
5. Enable caching and optimization

---

## Environment Variables

### Required Variables

```env
# Google Gemini AI
GEMINI_API_KEY=

# Firebase Client (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin (Secret)
FIREBASE_ADMIN_PROJECT_ID=
FIREBASE_ADMIN_CLIENT_EMAIL=
FIREBASE_ADMIN_PRIVATE_KEY=
```

### Security Notes

- ⚠️ Never commit `.env` to Git
- ⚠️ Keep `FIREBASE_ADMIN_PRIVATE_KEY` secret
- ⚠️ Use different Firebase projects for dev/prod
- ⚠️ Rotate API keys regularly
- ⚠️ Use environment-specific variables

---

## Post-Deployment

### 1. Update Firebase Authorized Domains

1. Go to Firebase Console → Authentication → Settings
2. Add your production domain to "Authorized domains"

```
your-domain.com
www.your-domain.com
your-project.vercel.app
```

### 2. Update Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sharedDashboards/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /analyses/{docId} {
      allow read: if request.auth != null && 
                     request.auth.uid == resource.data.userId;
      allow write: if request.auth != null && 
                      request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### 3. Set Up Monitoring

**Vercel Analytics:**
```bash
npm install @vercel/analytics
```

Add to `_app.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

**Google Analytics:**
Add to `_document.tsx`:
```typescript
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
/>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    `,
  }}
/>
```

### 4. Set Up Error Tracking

**Sentry:**
```bash
npm install @sentry/nextjs
```

Initialize:
```bash
npx @sentry/wizard -i nextjs
```

### 5. Enable HTTPS

All platforms enable HTTPS automatically. Ensure:
- SSL certificate is active
- HTTP redirects to HTTPS
- HSTS is enabled

### 6. Test Production

- ✅ Test all pages load correctly
- ✅ Test authentication flow
- ✅ Test image upload and analysis
- ✅ Test dashboard display
- ✅ Test share functionality
- ✅ Test on mobile devices
- ✅ Check console for errors
- ✅ Test performance (Lighthouse)

---

## Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Error: Out of memory**
```bash
# Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Runtime Errors

**Firebase Auth Error**
- Check authorized domains in Firebase Console
- Verify environment variables are set correctly

**API Key Error**
- Verify `GEMINI_API_KEY` is set
- Check API key quota in Google AI Studio

**Database Error**
- Check Firestore security rules
- Verify Firebase Admin credentials

### Performance Issues

**Slow Page Load**
- Enable caching in Vercel/Netlify
- Optimize images
- Use CDN for static assets

**API Timeout**
- Increase serverless function timeout
- Optimize AI prompts
- Compress images before upload

### Domain Issues

**Domain not working**
- Wait for DNS propagation (up to 48 hours)
- Check DNS records are correct
- Clear browser cache
- Try incognito mode

---

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          # Add other secrets
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Support

For deployment issues:
- GitHub Issues: [Report an issue](https://github.com/krishnasinghprojects/codm-stats-analyzer/issues)
- Email: [krishnasinghprojects@gmail.com](mailto:krishnasinghprojects@gmail.com)

---

**Happy Deploying! 🚀**
