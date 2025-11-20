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
    const { images, imageTypes } = req.body

    if (!images || images.length !== 4) {
      return res.status(400).json({ error: 'All 4 images are required' })
    }

    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured on server' })
    }

    const prompt = `You are an expert Call of Duty Mobile seasonal stats analyzer. Analyze the provided 4 screenshots and extract ALL visible statistics with precision.

⚠️ CRITICAL VALIDATION - MUST CHECK FIRST:
1. VERIFY all 4 images are Call of Duty Mobile seasonal/ranked screenshots
2. VERIFY first image shows seasonal rank data (matches played, wins, K/D, etc.)
3. VERIFY images 2-4 show weapon usage stats (most used, 2nd most used, 3rd most used)
4. IF images are NOT CODM seasonal screenshots, return: {"error": "Invalid screenshots. Please upload Call of Duty Mobile seasonal rank and weapon stats screenshots."}

EXTRACTION RULES (BE EXACT, NOT ESTIMATIVE):
1. Extract ONLY visible numbers - DO NOT estimate or guess
2. Username: Extract as plain text, remove special characters, emojis, clan tags
3. Season: Extract season name and date range (e.g., "S4 (10/2025 - 12/2025)")
4. Rank: Extract rank name (e.g., "Legendary", "Grand Master", "Master")
5. Rank Points: Extract exact rank points
6. Matches Played: Extract exact number
7. Matches Won: Extract exact number
8. MVP Title Earned (Final): Extract exact number
9. MVP Title Earned (Defeat): Extract exact number
10. Consecutive Wins: Extract exact number
11. Average Score: Extract exact score
12. K/D Ratio: Extract exact seasonal K/D

WEAPON STATS EXTRACTION (for each of 3 weapons):
1. Weapon Name: Extract exact weapon name
2. Usage Rank: "Most Used", "Second Most Used", "Third Most Used"
3. Use Time: Extract time in format "Xh Ym"
4. Total Kills: Extract exact number
5. Total Used: Extract exact number of times used
6. Win Rate: Extract exact percentage
7. K/D Ratio: Extract exact weapon K/D
8. Hit Rate: Extract exact accuracy percentage

RETURN FORMAT - EXACT JSON STRUCTURE:

{
  "type": "seasonal",
  "player_info": {
    "username": "NetherGod",
    "game": "Call of Duty: Mobile"
  },
  "seasonal_data": {
    "season": "S4 (10/2025 - 12/2025)",
    "rank": "Legendary",
    "rank_points": 10013,
    "matches_played": 204,
    "matches_won": 103,
    "win_rate": "50.5%",
    "mvp_title_earned_final": 59,
    "mvp_title_earned_defeat": 51,
    "consecutive_wins": 7,
    "average_score": 1145,
    "kd_ratio": 1.48
  },
  "weapon_usage_stats": [
    {
      "weapon_name": "VMP",
      "usage_rank": "Most Used",
      "use_time": "10h 56m",
      "total_kills": 1058,
      "total_used": 169,
      "win_rate": "49.0%",
      "kd_ratio": 1.65,
      "hit_rate": "19.2%"
    },
    {
      "weapon_name": "RAM-7",
      "usage_rank": "Second Most Used",
      "use_time": "5h 4m",
      "total_kills": 459,
      "total_used": 109,
      "win_rate": "50.6%",
      "kd_ratio": 1.42,
      "hit_rate": "17.8%"
    },
    {
      "weapon_name": "Sten",
      "usage_rank": "Third Most Used",
      "use_time": "1h 43m",
      "total_kills": 129,
      "total_used": 38,
      "win_rate": "66.7%",
      "kd_ratio": 1.57,
      "hit_rate": "19.6%"
    }
  ],
  "ai_insights": {
    "rank_performance": {
      "title": "Legendary Rank Performance",
      "rating": "A-Tier",
      "summary": "Solid performance in Legendary rank with positive K/D and consistent MVP titles.",
      "strengths": [
        "Positive K/D ratio (1.48) in Legendary rank",
        "High MVP count (59 final + 51 defeat = 110 total)",
        "Balanced win rate around 50%"
      ],
      "improvements": [
        "Focus on increasing win rate above 55%",
        "Work on consecutive win streaks",
        "Improve average score per match"
      ]
    },
    "weapon_analysis": {
      "title": "Weapon Mastery Analysis",
      "primary_weapon": {
        "name": "VMP",
        "assessment": "Your go-to weapon with solid performance",
        "stats_summary": "1058 kills over 10h 56m with 1.65 K/D",
        "recommendation": "Continue using but work on improving win rate from 49%"
      },
      "weapon_diversity": {
        "score": 85,
        "comment": "Good weapon variety with 3 different weapons in rotation",
        "suggestion": "Sten shows highest win rate (66.7%) - consider using more often"
      },
      "best_performer": {
        "weapon": "Sten",
        "reason": "Highest win rate (66.7%) and solid K/D (1.57)",
        "recommendation": "Increase usage time - currently only 1h 43m"
      }
    },
    "tactical_recommendations": [
      {
        "title": "Weapon Strategy",
        "icon": "fa-gun",
        "color": "blue",
        "points": [
          "Use Sten more often - it has your highest win rate (66.7%)",
          "VMP is reliable but win rate needs improvement (49%)",
          "RAM-7 shows balanced performance - good secondary choice"
        ]
      },
      {
        "title": "Rank Progression",
        "icon": "fa-trophy",
        "color": "gold",
        "points": [
          "Maintain K/D above 1.5 to climb faster",
          "Focus on objective play to increase win rate",
          "Build longer win streaks - current best is 7"
        ]
      },
      {
        "title": "Performance Goals",
        "icon": "fa-target",
        "color": "green",
        "points": [
          "Target 55%+ win rate for consistent rank gains",
          "Aim for 1200+ average score per match",
          "Increase MVP rate to 30%+ of matches"
        ]
      }
    ]
  }
}

IMPORTANT:
- Extract EXACT values from screenshots
- DO NOT make up data
- If a stat is not visible, use null
- Return ONLY valid JSON, no markdown, no code blocks
- Username must be plain text without special characters`

    // Build the request with all 4 images
    const imageParts = images.map((imageBase64: string, index: number) => ({
      inline_data: {
        mime_type: imageTypes[index],
        data: imageBase64,
      },
    }))

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
              parts: [{ text: prompt }, ...imageParts],
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
        details: errorData,
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
    if (!analysisData.player_info || !analysisData.seasonal_data) {
      return res.status(400).json({
        error: 'Invalid analysis result. Please ensure screenshots show CODM seasonal stats clearly.',
      })
    }

    return res.status(200).json(analysisData)
  } catch (error: any) {
    console.error('Analysis error:', error)
    return res.status(500).json({
      error: 'Analysis failed',
      message: error.message,
    })
  }
}
