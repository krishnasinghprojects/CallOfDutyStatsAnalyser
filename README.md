# 🎮 CODM Stats Analyzer

<div align="center">

![CODM Stats Analyzer](https://ik.imagekit.io/krishnasingh/ProjectsSS/CODMSS.jpg)

**AI-Powered Call of Duty Mobile Statistics Analyzer**

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.6-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Live Demo](https://codm.krishnasingh.live/) • [Report Bug](https://github.com/krishnasinghprojects/codm-stats-analyzer/issues) • [Request Feature](https://github.com/krishnasinghprojects/codm-stats-analyzer/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Firebase Configuration](#firebase-configuration)
- [Project Structure](#-project-structure)
- [Usage Guide](#-usage-guide)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)
- [Acknowledgments](#-acknowledgments)

---

## 🌟 Overview

**CODM Stats Analyzer** is a modern, AI-powered web application that analyzes Call of Duty Mobile gameplay statistics from screenshots. Built with Next.js and powered by Google's Gemini AI, it provides detailed performance insights, tactical recommendations, and beautiful visualizations of player stats.

### Why CODM Stats Analyzer?

- 🤖 **AI-Powered**: Uses Google Gemini 2.5 Flash for accurate stat extraction
- 📊 **Comprehensive Analysis**: Two analysis modes (Overall & Seasonal)
- 🎨 **Beautiful UI**: Military-themed glassmorphic design with smooth animations
- 🔒 **Secure**: Firebase authentication and secure data storage
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile
- 🚀 **Fast**: Optimized Next.js with server-side rendering
- 💾 **Persistent**: Save and share your analysis dashboards
- 🆓 **Free & Open Source**: MIT licensed

---

## ✨ Features

### 🎯 Core Features

- **AI Screenshot Analysis**: Upload CODM screenshots and let AI extract all stats automatically
- **Two Analysis Modes**:
  - **Overall Analysis**: Profile + Stats (2 screenshots)
  - **Seasonal Analysis**: Rank + Top 3 Weapons (4 screenshots)
- **Detailed Metrics**:
  - K/D Ratio, Accuracy, MVP Rate
  - Kills, Deaths, Games Played
  - Headshot Percentage
  - Weapon Performance Stats
- **AI Performance Rating**: Get rated across 4 categories (Survival, Lethality, Objective, Tactical)
- **Playstyle DNA**: Discover your unique gaming personality traits
- **Radar Chart**: Visual performance matrix
- **Tactical Briefing**: Strengths, weaknesses, and improvement suggestions

### 🔐 User Features

- **Google Authentication**: Secure sign-in with Firebase
- **Dashboard Management**: View all your saved analyses
- **Share Functionality**: Generate shareable links for your stats
- **Export Dashboard**: Download your stats as PNG image
- **Persistent Storage**: All analyses saved to Firebase Firestore

### 🎨 Design Features

- **Glassmorphic UI**: Modern glass-panel design with backdrop blur
- **Smooth Animations**: Entry animations, hover effects, and transitions
- **Military Theme**: CODM-inspired gold and black color scheme
- **Responsive Layout**: Optimized for all screen sizes
- **Loading States**: Beautiful loading screens with progress indicators
- **Font Awesome Icons**: 500+ icons for visual enhancement

---

## 🎬 Demo

### Live Application
🔗 **[https://codm.krishnasingh.live/](https://codm.krishnasingh.live/)**

### Screenshots

<details>
<summary>Click to view screenshots</summary>

#### Landing Page
![Landing Page](https://via.placeholder.com/800x400?text=Landing+Page)

#### Upload Form
![Upload Form](https://via.placeholder.com/800x400?text=Upload+Form)

#### Analysis Dashboard
![Dashboard](https://via.placeholder.com/800x400?text=Analysis+Dashboard)

#### Seasonal Analysis
![Seasonal](https://via.placeholder.com/800x400?text=Seasonal+Analysis)

</details>

---

## 🛠 Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with SSR
- **[React 18](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS
- **[Chart.js](https://www.chartjs.org/)** - Data visualization
- **[React Chart.js 2](https://react-chartjs-2.js.org/)** - React wrapper for Chart.js

### Backend & Services
- **[Firebase Authentication](https://firebase.google.com/docs/auth)** - User authentication
- **[Firebase Firestore](https://firebase.google.com/docs/firestore)** - NoSQL database
- **[Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)** - Server-side Firebase
- **[Google Gemini AI](https://ai.google.dev/)** - AI-powered image analysis

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** - CSS vendor prefixes

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0 or higher)
- **npm** or **yarn** or **pnpm**
- **Git**
- **Google Gemini API Key** ([Get it here](https://aistudio.google.com/app/apikey))
- **Firebase Project** ([Create one here](https://console.firebase.google.com/))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/krishnasinghprojects/codm-stats-analyzer.git
cd codm-stats-analyzer
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

4. **Configure environment variables** (see [Environment Setup](#environment-setup))

5. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔧 Environment Setup

### Required Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Google Gemini AI API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Client Configuration (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK (Server-side - Keep Secret!)
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Private_Key_Here\n-----END PRIVATE KEY-----\n"
```

### Getting API Keys

#### 1. Google Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to `.env` as `GEMINI_API_KEY`

#### 2. Firebase Configuration

See the detailed [Firebase Configuration](#firebase-configuration) section below.

---

## 🔥 Firebase Configuration

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name (e.g., "codm-stats-analyzer")
4. Disable Google Analytics (optional)
5. Click "Create Project"

### Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication**
2. Click "Get Started"
3. Enable **Google** sign-in provider
4. Add your domain to authorized domains

### Step 3: Create Firestore Database

1. Go to **Firestore Database**
2. Click "Create Database"
3. Start in **Production Mode**
4. Choose a location (closest to your users)
5. Click "Enable"

### Step 4: Set Firestore Rules

Go to **Firestore Database > Rules** and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to shared dashboards
    match /sharedDashboards/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow users to read/write their own analyses
    match /analyses/{docId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      allow write: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

### Step 5: Get Firebase Client Config

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps"
3. Click the **Web** icon (`</>`)
4. Register your app
5. Copy the config values to `.env`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Step 6: Get Firebase Admin SDK

1. Go to **Project Settings > Service Accounts**
2. Click "Generate New Private Key"
3. Download the JSON file
4. Extract these values to `.env`:

```env
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**⚠️ Important**: Keep the private key secret! Never commit it to Git.

---

## 📁 Project Structure

```
codm-stats-analyzer/
├── components/              # React components
│   └── RadarChart.tsx      # Radar chart component
├── contexts/               # React contexts
│   └── AuthContext.tsx     # Authentication context
├── lib/                    # Utility libraries
│   ├── firebase.ts         # Firebase client config
│   └── firebase-admin.ts   # Firebase admin config
├── pages/                  # Next.js pages
│   ├── api/               # API routes
│   │   ├── analyze.ts     # Overall analysis endpoint
│   │   ├── analyze-seasonal.ts  # Seasonal analysis endpoint
│   │   ├── save-analysis.ts     # Save dashboard endpoint
│   │   ├── share.ts       # Share dashboard endpoint
│   │   └── user-dashboards.ts  # Get user dashboards
│   ├── shared/            # Shared dashboard pages
│   │   └── [id].tsx       # Dynamic shared dashboard
│   ├── _app.tsx           # App wrapper
│   ├── _document.tsx      # Document wrapper
│   ├── index.tsx          # Landing page
│   ├── form.tsx           # Upload form
│   ├── dashboard.tsx      # Analysis dashboard
│   └── my-dashboards.tsx  # User's saved dashboards
├── public/                # Static files
│   └── favicon.png        # Favicon
├── styles/                # Global styles
│   └── globals.css        # Global CSS with Tailwind
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore rules
├── next.config.js        # Next.js configuration
├── package.json          # Dependencies
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

---

## 📖 Usage Guide

### For Users

#### 1. **Access the Application**
Visit [https://codm.krishnasingh.live/](https://codm.krishnasingh.live/)

#### 2. **Sign In**
Click "Sign in with Google" to authenticate

#### 3. **Choose Analysis Type**

**Overall Analysis** (2 screenshots):
- Screenshot 1: CODM Home/Profile page (username, level, UID)
- Screenshot 2: Stats page (K/D, accuracy, kills, games)

**Seasonal Analysis** (4 screenshots):
- Screenshot 1: Seasonal rank stats page
- Screenshot 2-4: Top 3 most used weapons

#### 4. **Upload Screenshots**
- Drag and drop or click to upload
- Supported formats: PNG, JPG, JPEG
- Max size: 10MB per image

#### 5. **Analyze**
- Click "Analyze with AI"
- Wait 10-30 seconds for processing
- View your detailed dashboard

#### 6. **Share or Export**
- Click "Share Link" to generate a shareable URL
- Click "Export" to download as PNG (if available)

### For Developers

#### Running Locally

```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

#### Testing API Endpoints

```bash
# Test overall analysis
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "image1Base64": "base64_string_here",
    "image2Base64": "base64_string_here",
    "image1Type": "image/png",
    "image2Type": "image/png"
  }'

# Test seasonal analysis
curl -X POST http://localhost:3000/api/analyze-seasonal \
  -H "Content-Type: application/json" \
  -d '{
    "images": ["base64_1", "base64_2", "base64_3", "base64_4"],
    "imageTypes": ["image/png", "image/png", "image/png", "image/png"]
  }'
```

---

## 🔌 API Documentation

### POST `/api/analyze`

Analyzes overall CODM stats from 2 screenshots.

**Request Body:**
```typescript
{
  image1Base64: string;      // Base64 encoded image (without data:image prefix)
  image2Base64: string;      // Base64 encoded image
  image1Type: string;        // MIME type (e.g., "image/png")
  image2Type: string;        // MIME type
}
```

**Response:**
```typescript
{
  type: "overall";
  header: { title, subtitle, metadata };
  profile: { username, level, uid, avatarUrl, badges };
  combatRecord: { mainStats, gridStats };
  hiddenStats: { stats };
  aiRating: { overallScore, tier, categories };
  playstyleDNA: { traits };
  objectives: { objectives };
  radarChart: { title, data };
  tacticalBriefing: { strengths, weaknesses, improvements };
}
```

### POST `/api/analyze-seasonal`

Analyzes seasonal CODM stats from 4 screenshots.

**Request Body:**
```typescript
{
  images: string[];          // Array of 4 base64 encoded images
  imageTypes: string[];      // Array of 4 MIME types
}
```

**Response:**
```typescript
{
  type: "seasonal";
  player_info: { username, uid };
  seasonal_data: { season, rank, matches, wins, kd, accuracy };
  weapon_usage_stats: { weapons: [{ name, kills, accuracy, headshots }] };
  ai_insights: { performance_summary, strengths, improvements };
}
```

### POST `/api/save-analysis`

Saves analysis dashboard to Firestore.

**Request Body:**
```typescript
{
  dashboardData: object;     // Complete dashboard data
  userId: string;            // Firebase user ID
}
```

**Response:**
```typescript
{
  success: true;
  analysisId: string;        // Firestore document ID
}
```

### GET/POST `/api/share`

**GET**: Retrieves shared dashboard by ID
```
GET /api/share?id=dashboard_id
```

**POST**: Creates shareable dashboard
```typescript
{
  dashboardData: object;
  userId?: string;
}
```

**Response:**
```typescript
{
  shareId: string;           // Unique share ID
}
```

### GET `/api/user-dashboards`

Gets all dashboards for a user.

```
GET /api/user-dashboards?userId=firebase_user_id
```

**Response:**
```typescript
{
  dashboards: [
    {
      id: string;
      type: "overall" | "seasonal";
      createdAt: Timestamp;
    }
  ]
}
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Add environment variables from `.env`
   - Click "Deploy"

3. **Configure Domain** (Optional)
   - Go to Project Settings > Domains
   - Add your custom domain
   - Update DNS records

### Deploy to Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Add environment variables** in Netlify dashboard

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:
- AWS Amplify
- Google Cloud Run
- DigitalOcean App Platform
- Railway
- Render

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Bugs

1. Check if the bug is already reported in [Issues](https://github.com/krishnasinghprojects/codm-stats-analyzer/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details

### Suggesting Features

1. Open an issue with the `enhancement` label
2. Describe the feature and its benefits
3. Provide examples or mockups if possible

### Pull Requests

1. **Fork the repository**
```bash
git clone https://github.com/YOUR_USERNAME/codm-stats-analyzer.git
```

2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
```bash
npm run dev
npm run build
```

5. **Commit your changes**
```bash
git commit -m "Add amazing feature"
```

6. **Push to your fork**
```bash
git push origin feature/amazing-feature
```

7. **Open a Pull Request**
   - Describe your changes
   - Link related issues
   - Add screenshots for UI changes

### Development Guidelines

- Use TypeScript for type safety
- Follow React best practices
- Use Tailwind CSS for styling
- Keep components small and reusable
- Write meaningful commit messages
- Test on multiple screen sizes

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Krishna Singh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Contact

**Krishna Singh**

- 🌐 Website: [krishnasingh.live](https://krishnasingh.live)
- 📧 Email: [krishnasinghprojects@gmail.com](mailto:krishnasinghprojects@gmail.com)
- 💼 LinkedIn: [krishnasinghprojects](https://www.linkedin.com/in/krishnasinghprojects)
- 🐙 GitHub: [krishnasinghprojects](https://github.com/krishnasinghprojects)
- 📸 Instagram: [krishnasinghprojects](https://www.instagram.com/krishnasinghprojects)

---

## 🙏 Acknowledgments

- **[Google Gemini AI](https://ai.google.dev/)** - For powerful image analysis capabilities
- **[Firebase](https://firebase.google.com/)** - For authentication and database services
- **[Next.js](https://nextjs.org/)** - For the amazing React framework
- **[Tailwind CSS](https://tailwindcss.com/)** - For utility-first CSS framework
- **[Chart.js](https://www.chartjs.org/)** - For beautiful data visualizations
- **[Font Awesome](https://fontawesome.com/)** - For comprehensive icon library
- **[Vercel](https://vercel.com/)** - For seamless deployment platform
- **CODM Community** - For inspiration and feedback

---

## 🌟 Star History

If you find this project useful, please consider giving it a ⭐️!

[![Star History Chart](https://api.star-history.com/svg?repos=krishnasinghprojects/codm-stats-analyzer&type=Date)](https://star-history.com/#krishnasinghprojects/codm-stats-analyzer&Date)

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/krishnasinghprojects/codm-stats-analyzer?style=social)
![GitHub forks](https://img.shields.io/github/forks/krishnasinghprojects/codm-stats-analyzer?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/krishnasinghprojects/codm-stats-analyzer?style=social)

---

<div align="center">

**Made with ❤️ by [Krishna Singh](https://github.com/krishnasinghprojects)**

If you found this project helpful, please give it a ⭐️!

[⬆ Back to Top](#-codm-stats-analyzer)

</div>
