import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { image1Base64, image2Base64, image1Type, image2Type } = req.body

    if (!image1Base64 || !image2Base64) {
      return res.status(400).json({ error: 'Both images are required' })
    }

    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured on server' })
    }

    const prompt = `You are an expert Call of Duty Mobile stats analyzer. Analyze the provided screenshots and extract ALL visible statistics with precision.

⚠️ CRITICAL VALIDATION - MUST CHECK FIRST:
1. VERIFY both images are Call of Duty Mobile screenshots
2. VERIFY first image shows player profile/home page (username, level, UID visible)
3. VERIFY second image shows stats page (K/D, kills, games, accuracy visible)
4. IF images are NOT CODM screenshots, return: {"error": "Invalid screenshots. Please upload Call of Duty Mobile screenshots showing profile and stats pages."}
5. IF required stats are not visible, return: {"error": "Cannot read stats from screenshots. Please upload clearer images."}

EXTRACTION RULES (BE DETERMINISTIC, NOT ESTIMATIVE):
1. Extract ONLY visible numbers - DO NOT estimate or guess
2. Username: Extract as plain text, remove special characters, emojis, clan tags (e.g., "[CLAN]Player★" → "Player")
3. K/D Ratio: Extract EXACT value shown (e.g., 1.97, 2.34, 0.89)
4. Kills: Extract EXACT total kills shown
5. Games: Extract EXACT total games played
6. MVPs: Extract EXACT MVP count if visible
7. Accuracy: Extract EXACT accuracy percentage if visible
8. Headshot %: Extract EXACT headshot percentage if visible, otherwise estimate 18-25% based on K/D (higher K/D = higher headshot %)
9. Level: Extract EXACT level number
10. UID: Extract EXACT UID number

NOTE: Headshot % is often NOT shown in standard CODM stats. If not visible:
- For K/D > 2.0: Use 22-25%
- For K/D 1.5-2.0: Use 19-22%
- For K/D 1.0-1.5: Use 16-19%
- For K/D < 1.0: Use 12-16%

CALCULATION RULES (ONLY IF BASE STATS ARE VISIBLE):
- Deaths = Kills / K/D Ratio (round to nearest integer)
- MVP Rate = (MVPs / Games) × 100 (round to 1 decimal)
- Kills per Match = Kills / Games (round to 1 decimal)
- Top 3 finishes = Estimate as Games × 0.45 to 0.50 based on K/D

AI RATING CALCULATION (DETERMINISTIC):
- Compare player stats to the reference player (K/D: 1.97, Kills: 178,448, Games: 9,981)
- Survival Score = (Player K/D / 1.97) × 100, capped at 100
- Slayer Score = Based on kills per match vs 17.8 reference
- Overall Score = Average of all category scores
- Tier: 90-100 = S-TIER, 80-89 = A-TIER, 70-79 = B-TIER, 60-69 = C-TIER

FORMATTING RULES:
1. Numbers with commas: "178,448" not "178448"
2. Decimals: Use 1-2 decimal places (1.97, 19.48)
3. Percentages: Include % symbol in value (e.g., "21.5%")
4. Username: Plain text only, no special characters
5. Return ONLY valid JSON, no markdown, no code blocks

HERE IS A PERFECT EXAMPLE (REFERENCE PLAYER WITH K/D 1.97, 178K KILLS):

{
  "header": {
    "subtitle": "2025 Combat Report",
    "title": "Player",
    "titleHighlight": "Statistics",
    "metadata": "Generated: November 2024 • ID: #NG-9982",
    "exportButton": "Share Stats"
  },
  "profile": {
    "username": "Nether God",
    "level": 400,
    "uid": "6754504858071990273",
    "avatarUrl": "https://ui-avatars.com/api/?name=Nether+God&background=111&color=FFD700&font-size=0.35",
    "stars": 3,
    "badges": [
      {"icon": "fa-crown", "text": "Legendary", "color": "purple"},
      {"icon": "fa-crosshairs", "text": "Sniper Main", "color": "blue"},
      {"icon": "fa-code", "text": "Code Warrior", "color": "green"}
    ]
  },
  "combatRecord": {
    "title": "Combat Record",
    "mainStats": [
      {"icon": "fa-skull", "iconColor": "green", "label": "K/D Ratio", "value": "1.97", "hoverColor": "green"},
      {"icon": "fa-bullseye", "iconColor": "orange", "label": "Accuracy", "value": "19.48", "suffix": "%", "hoverColor": "orange"},
      {"icon": "fa-trophy", "iconColor": "gold", "label": "MVP Rate", "value": "25.9", "suffix": "%", "hoverColor": "yellow"}
    ],
    "gridStats": [
      {"label": "MVPs", "value": "2,585"},
      {"label": "Games", "value": "9,981"},
      {"label": "Top 3", "value": "4,653"},
      {"label": "Kills", "value": "178,448", "highlight": true}
    ]
  },
  "hiddenStats": {
    "title": "Hidden Stats",
    "stats": [
      {"icon": "fa-skull-crossbones", "label": "Est. Deaths", "value": "90,582", "color": "red"},
      {"icon": "fa-person-rifle", "label": "Kills/Match", "value": "17.8", "color": "blue"},
      {"icon": "fa-head-side-virus", "label": "Headshot %", "value": "21.5%", "subtitle": "Sniper Avg", "color": "yellow"}
    ]
  },
  "aiRating": {
    "title": "AI Rating",
    "overallScore": 89,
    "tier": "S-TIER",
    "categories": [
      {"icon": "fa-shield-heart", "label": "Survival", "score": 92, "color": "green"},
      {"icon": "fa-skull", "label": "Slayer", "score": 88, "color": "yellow"},
      {"icon": "fa-flag", "label": "Objective", "score": 65, "color": "red"},
      {"icon": "fa-microchip", "label": "Mechanics", "score": 78, "color": "blue"}
    ]
  },
  "playstyleDNA": {
    "title": "Playstyle DNA",
    "traits": [
      {"leftLabel": "Passive", "rightLabel": "Aggressive", "value": 85, "color": "yellow"},
      {"leftLabel": "Roamer", "rightLabel": "Sentinel", "value": 40, "color": "blue"},
      {"leftLabel": "Panic", "rightLabel": "Ice Cold", "value": 75, "color": "green"}
    ]
  },
  "objectives": {
    "title": "Current Objectives",
    "goals": [
      {"title": "200K KILLS", "current": 178448, "target": 200000, "icon": "fa-clock", "info": "ETA: ~1,210 Matches", "color": "pink", "gradient": "from-purple-900 via-purple-600 to-pink-500"},
      {"title": "30% MVP RATE", "current": 25.9, "target": 30, "icon": "fa-trophy", "info": "+4.1% Needed", "color": "yellow", "gradient": "from-yellow-900 via-cod-gold to-orange-500", "isPercentage": true}
    ]
  },
  "radarChart": {
    "title": "Performance Matrix",
    "labels": ["LETHALITY", "AGGRESSION", "DOMINANCE", "PRECISION", "EXPERIENCE"],
    "values": [90, 85, 60, 55, 99]
  },
  "tacticalBriefing": {
    "title": "Tactical Briefing",
    "sections": [
      {"icon": "fa-shield-halved", "title": "The Immortal Slayer", "color": "green", "points": ["Elite survivability (<strong>1.97 K/D</strong>).", "Effectively denies enemy scorestreaks.", "High-volume impact (<strong>17.8 kills</strong>)."]},
      {"icon": "fa-triangle-exclamation", "title": "The 'Top 3' Trap", "color": "red", "points": ["Top 3 in <strong>46%</strong> games, but MVP only <strong>26%</strong>.", "Objective players stealing your MVP spot.", "Kill volume alone isn't closing the score gap."]},
      {"icon": "fa-crosshairs", "title": "Win Condition Update", "color": "yellow", "points": ["Sacrifice 2-3 kills to hold <strong>Hardpoint</strong> for 30s.", "Boost Score Per Minute (SPM) to secure MVP.", "Convert Top 3 finishes into Victories."]}
    ]
  }
}

NOW ANALYZE THE PROVIDED SCREENSHOTS:

STEP 1: VALIDATE
- Check if images are CODM screenshots
- Check if required stats are visible
- If validation fails, return error JSON

STEP 2: EXTRACT (BE EXACT, NOT ESTIMATIVE)
- Extract username (plain text, no special chars)
- Extract ALL visible numbers exactly as shown
- DO NOT guess or estimate visible stats

STEP 3: CALCULATE
- Use extracted stats to calculate derived values
- Compare to reference player (K/D 1.97, 178K kills, 9,981 games)
- Calculate AI ratings deterministically based on comparison

STEP 4: ANALYZE
- Write insightful tactical briefing based on actual stats
- Identify real strengths (high K/D, high kills/match, etc.)
- Identify real weaknesses (low objective score, low MVP rate, etc.)
- Provide actionable improvements

RETURN: Valid JSON with exact same structure as example above. Username must be plain text without special characters.`

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: image1Type,
                    data: image1Base64,
                  },
                },
                {
                  inline_data: {
                    mime_type: image2Type,
                    data: image2Base64,
                  },
                },
              ],
            },
          ],
        }),
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Gemini API error:', errorData)
      return res.status(response.status).json({ 
        error: `API Error: ${response.status}`,
        details: errorData 
      })
    }

    const result = await response.json()
    const generatedText = result.candidates[0].content.parts[0].text

    // Clean the response - remove markdown code blocks if present
    let jsonText = generatedText.trim()
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '')
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '')
    }

    const analysisData = JSON.parse(jsonText)

    // Check for validation errors from AI
    if (analysisData.error) {
      return res.status(400).json({ error: analysisData.error })
    }

    // Validate required fields exist
    if (!analysisData.profile || !analysisData.combatRecord) {
      return res.status(400).json({ 
        error: 'Invalid analysis result. Please ensure screenshots show CODM stats clearly.' 
      })
    }

    return res.status(200).json(analysisData)
  } catch (error: any) {
    console.error('Analysis error:', error)
    return res.status(500).json({ 
      error: 'Analysis failed',
      message: error.message 
    })
  }
}
