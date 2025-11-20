# CODM Stats Analyzer - Next.js Version

A beautiful, AI-powered Call of Duty Mobile statistics analyzer built with Next.js, TypeScript, and Google's Gemini AI. This version features secure backend API calls with environment variables.

## 🎮 Features

- **AI-Powered Analysis**: Upload screenshots and let Gemini AI extract all stats automatically
- **Google Authentication**: Secure sign-in with Google (no password needed)
- **Persistent Storage**: All analyses saved to Firebase Firestore
- **User Dashboard**: View and manage all your saved analyses
- **Secure Backend**: API key stored in environment variables, not exposed to frontend
- **Beautiful Dashboard**: Premium glassmorphic design with CODM theme
- **Shareable Links**: Generate unique URLs to share your stats with anyone (stored forever)
- **Fully Dynamic**: All data rendered from JSON (easily customizable)
- **Interactive Charts**: Radar chart for performance visualization using Chart.js
- **Export Functionality**: Download your stats as a high-quality PNG
- **Smooth Animations**: Enhanced hover effects and transitions throughout
- **Responsive Design**: Works perfectly on desktop and mobile
- **TypeScript**: Full type safety throughout the application
- **Next.js 14**: Latest features including App Router support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Gemini API key (free from Google AI Studio)

### Installation

1. **Clone or navigate to the project directory**

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Edit `.env` and add your Gemini API key:
```
GEMINI_API_KEY=your_actual_api_key_here
```

Get your API key from: https://aistudio.google.com/app/apikey

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**

Navigate to `http://localhost:3000`

## 📁 Project Structure

```
├── pages/
│   ├── _app.tsx           # App wrapper with global styles
│   ├── _document.tsx      # HTML document structure
│   ├── index.tsx          # Home page (redirects to form)
│   ├── form.tsx           # Upload form page
│   ├── dashboard.tsx      # Stats dashboard page
│   └── api/
│       └── analyze.ts     # Backend API route for Gemini AI
├── components/
│   └── RadarChart.tsx     # Radar chart component
├── styles/
│   └── globals.css        # Global styles and animations
├── public/                # Static assets
├── .env                   # Environment variables (create this)
├── .env.example           # Example environment file
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🔧 How It Works

### 1. User Flow
1. User visits `/form` page
2. Uploads two CODM screenshots (profile + stats)
3. Clicks "Analyze with AI"
4. Frontend sends images to `/api/analyze` endpoint
5. Backend calls Gemini AI with API key from environment
6. AI analyzes images and returns structured JSON
7. Data saved to localStorage
8. User redirected to `/dashboard` with results

### 2. Backend API Route (`/api/analyze`)
- Receives base64 encoded images from frontend
- Uses `GEMINI_API_KEY` from environment variables
- Calls Gemini AI API with detailed prompt
- Returns structured JSON data
- Handles errors gracefully

### 3. Security
- ✅ API key stored in `.env` file (never committed to git)
- ✅ API calls made from backend only
- ✅ Frontend never sees the API key
- ✅ `.gitignore` configured to exclude `.env`

## 📝 Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🎨 Customization

### Changing AI Model

Edit `pages/api/analyze.ts`:
```typescript
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
  // Change model name here ^^^
)
```

### Modifying Styles

- Global styles: `styles/globals.css`
- Tailwind config: `tailwind.config.js`
- Component styles: Inline Tailwind classes

### Adding New Stats

Modify the prompt in `pages/api/analyze.ts` to extract additional statistics from screenshots.

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variable:
   - Key: `GEMINI_API_KEY`
   - Value: Your API key
4. Deploy!

### Other Platforms

Works on any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify
- Self-hosted

**Important**: Always set the `GEMINI_API_KEY` environment variable in your deployment platform.

## 🐛 Troubleshooting

### "API key not configured on server"
- Make sure `.env` file exists in root directory
- Verify `GEMINI_API_KEY` is set correctly
- Restart the development server after adding `.env`

### "Analysis failed"
- Check your internet connection
- Verify API key is valid and has quota
- Ensure screenshots are clear CODM images
- Check browser console for detailed errors

### Dashboard shows no data
- Make sure you completed the analysis on `/form` page
- Check localStorage in browser dev tools
- Try clearing localStorage and analyzing again

### Chart not rendering
- Chart.js loads dynamically to avoid SSR issues
- Wait a moment for the chart to initialize
- Check browser console for errors

## 📦 Dependencies

### Core
- `next` - React framework
- `react` - UI library
- `typescript` - Type safety

### UI & Styling
- `tailwindcss` - Utility-first CSS
- `@fortawesome/fontawesome-free` - Icons (via CDN)

### Charts & Export
- `chart.js` - Chart library
- `react-chartjs-2` - React wrapper for Chart.js
- `html2canvas` - Export dashboard as image

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Your Google Gemini API key | Yes |

## 📄 License

MIT License - Feel free to use and modify!

## 🙏 Credits

- Built with Next.js and TypeScript
- Powered by Google Gemini AI
- Designed for the CODM community

## 🆘 Support

If you encounter issues:
1. Check this README thoroughly
2. Verify your `.env` file is configured
3. Check browser console for errors
4. Ensure Node.js version is 18+

## 🎯 Features Comparison: HTML vs Next.js

| Feature | HTML Version | Next.js Version |
|---------|-------------|-----------------|
| API Key Security | ❌ Exposed in frontend | ✅ Secure in backend |
| Type Safety | ❌ No types | ✅ Full TypeScript |
| Routing | ❌ Manual redirects | ✅ Next.js Router |
| Build Process | ❌ None | ✅ Optimized builds |
| SEO | ⚠️ Basic | ✅ Enhanced |
| Performance | ⚠️ Good | ✅ Excellent |
| Deployment | ⚠️ Static hosting | ✅ Full-stack platforms |

## 🚀 What's New in Next.js Version

1. **Secure API Calls**: API key never exposed to client
2. **TypeScript**: Full type safety and better DX
3. **Better Routing**: Next.js file-based routing
4. **Optimized Images**: Next.js Image component ready
5. **Better Performance**: Automatic code splitting
6. **Production Ready**: Built-in optimization
7. **Easy Deployment**: One-click deploy to Vercel

---

Made with ❤️ for CODM players
