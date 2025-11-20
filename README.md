# CODM Stats Analyzer - AI-Powered Dashboard

A beautiful, AI-powered Call of Duty Mobile statistics analyzer that uses Google's Gemini AI to extract and analyze player stats from screenshots.

## 🎮 Features

- **AI-Powered Analysis**: Upload screenshots and let Gemini AI extract all stats automatically
- **Beautiful Dashboard**: Premium glassmorphic design with CODM theme
- **Fully Dynamic**: All data rendered from JSON (easily customizable)
- **Interactive Charts**: Radar chart for performance visualization
- **Export Functionality**: Download your stats as a high-quality PNG
- **Responsive Design**: Works perfectly on desktop and mobile

## 🚀 How to Use

### 1. Get Your Gemini API Key
- Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
- Create a new API key (it's free!)
- Copy the key

### 2. Prepare Your Screenshots
Take two screenshots from Call of Duty Mobile:
- **Screenshot 1**: Your home page/profile (showing username, level, UID)
- **Screenshot 2**: Your stats page (showing K/D, accuracy, kills, games, etc.)

### 3. Run the Application
```bash
# Option 1: Using Python
python3 -m http.server 8000

# Option 2: Using Node.js
npx http-server

# Option 3: Using PHP
php -S localhost:8000
```

### 4. Open in Browser
- Navigate to `http://localhost:8000/form.html`
- Enter your Gemini API key
- Upload both screenshots
- Click "Analyze with AI"
- Wait for the analysis (usually 10-30 seconds)
- View your beautiful dashboard!

## 📁 File Structure

```
├── form.html          # Upload form with AI integration
├── dashboard.html     # Stats dashboard (dynamic rendering)
├── data.json         # Sample data structure (for testing)
├── test.html         # Test file for data loading
└── README.md         # This file
```

## 🎨 Customization

### Using Custom Data (Without AI)

If you want to use custom data without AI analysis:

1. Edit `data.json` with your stats
2. Open `dashboard.html` directly
3. The dashboard will load from `data.json` as fallback

### Data Structure

The JSON structure includes:
- **Header**: Title, subtitle, metadata
- **Profile**: Username, level, UID, badges
- **Combat Record**: K/D, accuracy, MVP rate, kills, games
- **Hidden Stats**: Deaths, kills/match, headshot %
- **AI Rating**: Overall score, tier, 4 categories
- **Playstyle DNA**: 3 personality traits
- **Objectives**: 2 progress goals
- **Radar Chart**: 5 performance metrics
- **Tactical Briefing**: Strengths, weaknesses, improvements

## 🔧 Technical Details

### Technologies Used
- **Frontend**: HTML, CSS (Tailwind), JavaScript
- **AI**: Google Gemini 2.0 Flash
- **Charts**: Chart.js
- **Export**: html2canvas
- **Icons**: Font Awesome

### How It Works

1. **Form Submission**: User uploads screenshots and API key
2. **Image Processing**: Screenshots converted to base64
3. **AI Analysis**: Gemini AI analyzes images and extracts stats
4. **JSON Generation**: AI returns structured JSON data
5. **Data Storage**: JSON saved to localStorage
6. **Dashboard Rendering**: All sections dynamically rendered from JSON
7. **Export**: html2canvas captures dashboard as PNG

## 🎯 Features Breakdown

### Form Page (`form.html`)
- ✅ API key input with validation
- ✅ Drag & drop file upload
- ✅ Image preview
- ✅ CODM-themed loading screen
- ✅ Progress bar with status messages
- ✅ Error handling

### Dashboard Page (`dashboard.html`)
- ✅ Dynamic header rendering
- ✅ Profile with badges
- ✅ Combat record stats
- ✅ Hidden stats with glassmorphic cards
- ✅ AI rating with 4 categories
- ✅ Playstyle DNA progress bars
- ✅ Objectives with progress tracking
- ✅ Radar chart (performance matrix)
- ✅ Tactical briefing (3 sections)
- ✅ Back button (return to form)
- ✅ Export button (download PNG)

## 🐛 Troubleshooting

### "Failed to load data.json"
- Make sure you're running a local server (not opening file:// directly)
- Check that data.json exists in the same directory

### "API Error: 400"
- Verify your API key is correct
- Check that images are valid (PNG/JPG)
- Ensure images are under 10MB

### "Analysis failed"
- Check your internet connection
- Verify API key has quota remaining
- Try with different screenshots

### Dashboard shows old data
- Clear localStorage: `localStorage.clear()` in browser console
- Or use incognito/private browsing mode

## 📝 Notes

- **API Key**: Never commit your API key to version control
- **Rate Limits**: Gemini API has free tier limits
- **Image Quality**: Higher quality screenshots = better analysis
- **Browser Support**: Works best in Chrome, Firefox, Safari

## 🎉 Credits

Created with ❤️ for the CODM community

## 📄 License

MIT License - Feel free to use and modify!
