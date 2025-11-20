# API Documentation

Complete API reference for CODM Stats Analyzer backend endpoints.

## 📋 Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [POST /api/analyze](#post-apianalyze)
  - [POST /api/analyze-seasonal](#post-apianalyze-seasonal)
  - [POST /api/save-analysis](#post-apisave-analysis)
  - [GET /api/share](#get-apishare)
  - [POST /api/share](#post-apishare)
  - [GET /api/user-dashboards](#get-apiuser-dashboards)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Rate Limits](#rate-limits)

---

## Overview

All API endpoints are serverless functions deployed on Vercel. They use Next.js API routes and are located in the `/pages/api` directory.

**Base URL**: `https://codm.krishnasingh.live/api`

**Content-Type**: `application/json`

---

## Authentication

Most endpoints require Firebase authentication. Include the user's Firebase ID token in requests that need authentication.

### Getting User Token (Client-side)

```typescript
import { auth } from '@/lib/firebase';

const user = auth.currentUser;
if (user) {
  const token = await user.getIdToken();
  // Use token in API requests
}
```

---

## Endpoints

### POST /api/analyze

Analyzes overall CODM stats from 2 screenshots using Google Gemini AI.

#### Request

```http
POST /api/analyze
Content-Type: application/json
```

**Body Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `image1Base64` | string | Yes | Base64 encoded first image (without `data:image/` prefix) |
| `image2Base64` | string | Yes | Base64 encoded second image |
| `image1Type` | string | Yes | MIME type of first image (e.g., `image/png`) |
| `image2Type` | string | Yes | MIME type of second image |

**Example Request:**

```typescript
const response = await fetch('/api/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    image1Base64: 'iVBORw0KGgoAAAANSUhEUgAA...',
    image2Base64: 'iVBORw0KGgoAAAANSUhEUgAA...',
    image1Type: 'image/png',
    image2Type: 'image/png',
  }),
});

const data = await response.json();
```

#### Response

**Success (200 OK):**

```json
{
  "type": "overall",
  "header": {
    "title": "TACTICAL",
    "titleHighlight": "DASHBOARD",
    "subtitle": "AI-POWERED STATS ANALYSIS",
    "metadata": "CLASSIFIED : CODM_STATS_v2.5"
  },
  "profile": {
    "username": "PlayerName",
    "level": 150,
    "uid": "1234567890",
    "avatarUrl": "https://ui-avatars.com/api/?name=PlayerName",
    "badges": [
      { "text": "VETERAN", "color": "purple", "icon": "fa-medal" },
      { "text": "ELITE", "color": "blue", "icon": "fa-star" }
    ]
  },
  "combatRecord": {
    "mainStats": [
      {
        "label": "K/D Ratio",
        "value": "2.45",
        "icon": "fa-crosshairs",
        "iconColor": "green",
        "hoverColor": "green"
      }
    ],
    "gridStats": [
      { "label": "Total Kills", "value": "45,230", "highlight": false },
      { "label": "Total Games", "value": "3,456", "highlight": false }
    ]
  },
  "hiddenStats": {
    "title": "Hidden Stats",
    "stats": [
      {
        "label": "Deaths",
        "value": "18,461",
        "icon": "fa-skull",
        "color": "red"
      }
    ]
  },
  "aiRating": {
    "overallScore": "87",
    "tier": "S-TIER",
    "categories": [
      {
        "label": "Survival",
        "score": "85",
        "icon": "fa-shield-heart",
        "color": "green"
      }
    ]
  },
  "playstyleDNA": {
    "title": "Playstyle DNA",
    "traits": [
      {
        "label": "Aggressive",
        "percentage": 85,
        "color": "yellow"
      }
    ]
  },
  "objectives": {
    "title": "Objectives",
    "objectives": [
      {
        "label": "Reach 50K Kills",
        "current": 45230,
        "target": 50000,
        "icon": "fa-crosshairs"
      }
    ]
  },
  "radarChart": {
    "title": "Performance Matrix",
    "data": {
      "labels": ["Accuracy", "K/D", "MVP", "Survival", "Aggression"],
      "datasets": [{
        "data": [75, 85, 65, 80, 90]
      }]
    }
  },
  "tacticalBriefing": {
    "title": "Tactical Briefing",
    "strengths": [
      "Exceptional K/D ratio of 2.45",
      "High accuracy of 24.5%"
    ],
    "weaknesses": [
      "MVP rate could be improved"
    ],
    "improvements": [
      "Focus on objective-based gameplay",
      "Practice with different weapon types"
    ]
  }
}
```

**Error (400 Bad Request):**

```json
{
  "error": "Missing required fields: image1Base64, image2Base64"
}
```

**Error (500 Internal Server Error):**

```json
{
  "error": "AI analysis failed: [error message]"
}
```

---

### POST /api/analyze-seasonal

Analyzes seasonal CODM stats from 4 screenshots (rank + 3 weapons).

#### Request

```http
POST /api/analyze-seasonal
Content-Type: application/json
```

**Body Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `images` | string[] | Yes | Array of 4 base64 encoded images |
| `imageTypes` | string[] | Yes | Array of 4 MIME types |

**Example Request:**

```typescript
const response = await fetch('/api/analyze-seasonal', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    images: [
      'iVBORw0KGgoAAAANSUhEUgAA...',  // Rank screenshot
      'iVBORw0KGgoAAAANSUhEUgAA...',  // Weapon 1
      'iVBORw0KGgoAAAANSUhEUgAA...',  // Weapon 2
      'iVBORw0KGgoAAAANSUhEUgAA...',  // Weapon 3
    ],
    imageTypes: [
      'image/png',
      'image/png',
      'image/png',
      'image/png',
    ],
  }),
});

const data = await response.json();
```

#### Response

**Success (200 OK):**

```json
{
  "type": "seasonal",
  "player_info": {
    "username": "PlayerName",
    "uid": "1234567890"
  },
  "seasonal_data": {
    "season": "Season 1 2025",
    "rank": "Legendary",
    "rank_points": 8500,
    "matches_played": 245,
    "wins": 156,
    "win_rate": 63.67,
    "kd_ratio": 2.34,
    "accuracy": 23.5,
    "mvp_count": 89
  },
  "weapon_usage_stats": {
    "weapons": [
      {
        "name": "AK-47",
        "kills": 3456,
        "accuracy": 25.3,
        "headshots": 456,
        "headshot_percentage": 13.2,
        "games_used": 123
      },
      {
        "name": "M4",
        "kills": 2890,
        "accuracy": 28.1,
        "headshots": 398,
        "headshot_percentage": 13.8,
        "games_used": 98
      },
      {
        "name": "DL Q33",
        "kills": 2345,
        "accuracy": 45.6,
        "headshots": 1234,
        "headshot_percentage": 52.6,
        "games_used": 87
      }
    ]
  },
  "ai_insights": {
    "performance_summary": "Strong seasonal performance with consistent win rate",
    "strengths": [
      "Excellent sniper accuracy with DL Q33",
      "Consistent K/D ratio above 2.0"
    ],
    "improvements": [
      "Diversify weapon usage",
      "Focus on increasing MVP rate"
    ]
  }
}
```

---

### POST /api/save-analysis

Saves analysis dashboard to Firebase Firestore.

#### Request

```http
POST /api/save-analysis
Content-Type: application/json
```

**Body Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dashboardData` | object | Yes | Complete dashboard data object |
| `userId` | string | Yes | Firebase user ID |

**Example Request:**

```typescript
const response = await fetch('/api/save-analysis', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    dashboardData: analysisData,
    userId: user.uid,
  }),
});

const { analysisId } = await response.json();
```

#### Response

**Success (200 OK):**

```json
{
  "success": true,
  "analysisId": "abc123xyz789"
}
```

**Error (400 Bad Request):**

```json
{
  "error": "Missing required fields"
}
```

---

### GET /api/share

Retrieves a shared dashboard by ID.

#### Request

```http
GET /api/share?id={shareId}
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | string | Yes | Unique share ID |

**Example Request:**

```typescript
const response = await fetch(`/api/share?id=${shareId}`);
const { data } = await response.json();
```

#### Response

**Success (200 OK):**

```json
{
  "data": {
    // Complete dashboard data object
  }
}
```

**Error (404 Not Found):**

```json
{
  "error": "Dashboard not found"
}
```

---

### POST /api/share

Creates a shareable dashboard link.

#### Request

```http
POST /api/share
Content-Type: application/json
```

**Body Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dashboardData` | object | Yes | Complete dashboard data |
| `userId` | string | No | Firebase user ID (optional) |

**Example Request:**

```typescript
const response = await fetch('/api/share', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    dashboardData: data,
    userId: user?.uid,
  }),
});

const { shareId } = await response.json();
const shareUrl = `${window.location.origin}/shared/${shareId}`;
```

#### Response

**Success (200 OK):**

```json
{
  "shareId": "abc123xyz789"
}
```

---

### GET /api/user-dashboards

Gets all saved dashboards for a user.

#### Request

```http
GET /api/user-dashboards?userId={userId}
```

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `userId` | string | Yes | Firebase user ID |

**Example Request:**

```typescript
const response = await fetch(`/api/user-dashboards?userId=${user.uid}`);
const { dashboards } = await response.json();
```

#### Response

**Success (200 OK):**

```json
{
  "dashboards": [
    {
      "id": "abc123",
      "type": "overall",
      "createdAt": {
        "_seconds": 1704067200,
        "_nanoseconds": 0
      }
    },
    {
      "id": "xyz789",
      "type": "seasonal",
      "createdAt": {
        "_seconds": 1704153600,
        "_nanoseconds": 0
      }
    }
  ]
}
```

---

## Data Models

### DashboardData (Overall)

```typescript
interface DashboardData {
  type: 'overall';
  header: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    metadata: string;
  };
  profile: {
    username: string;
    level: number;
    uid: string;
    avatarUrl: string;
    badges: Array<{
      text: string;
      color: string;
      icon: string;
    }>;
  };
  combatRecord: {
    mainStats: Array<{
      label: string;
      value: string;
      suffix?: string;
      icon: string;
      iconColor: string;
      hoverColor: string;
    }>;
    gridStats: Array<{
      label: string;
      value: string;
      highlight: boolean;
    }>;
  };
  hiddenStats: {
    title: string;
    stats: Array<{
      label: string;
      value: string;
      subtitle?: string;
      icon: string;
      color: string;
    }>;
  };
  aiRating: {
    overallScore: string;
    tier: string;
    categories: Array<{
      label: string;
      score: string;
      icon: string;
      color: string;
    }>;
  };
  playstyleDNA: {
    title: string;
    traits: Array<{
      label: string;
      percentage: number;
      color: string;
    }>;
  };
  objectives: {
    title: string;
    objectives: Array<{
      label: string;
      current: number;
      target: number;
      icon: string;
    }>;
  };
  radarChart: {
    title: string;
    data: {
      labels: string[];
      datasets: Array<{
        data: number[];
      }>;
    };
  };
  tacticalBriefing: {
    title: string;
    strengths: string[];
    weaknesses: string[];
    improvements: string[];
  };
}
```

### DashboardData (Seasonal)

```typescript
interface SeasonalDashboardData {
  type: 'seasonal';
  player_info: {
    username: string;
    uid: string;
  };
  seasonal_data: {
    season: string;
    rank: string;
    rank_points: number;
    matches_played: number;
    wins: number;
    win_rate: number;
    kd_ratio: number;
    accuracy: number;
    mvp_count: number;
  };
  weapon_usage_stats: {
    weapons: Array<{
      name: string;
      kills: number;
      accuracy: number;
      headshots: number;
      headshot_percentage: number;
      games_used: number;
    }>;
  };
  ai_insights: {
    performance_summary: string;
    strengths: string[];
    improvements: string[];
  };
}
```

---

## Error Handling

All endpoints return errors in the following format:

```json
{
  "error": "Error message description"
}
```

### Common HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Authentication required |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error - Server-side error |

### Error Examples

**Missing Parameters:**
```json
{
  "error": "Missing required fields: image1Base64, image2Base64"
}
```

**AI Analysis Failed:**
```json
{
  "error": "AI analysis failed: Invalid image format"
}
```

**Database Error:**
```json
{
  "error": "Failed to save analysis to database"
}
```

---

## Rate Limits

### Google Gemini API
- **Free Tier**: 60 requests per minute
- **Quota**: Check your [Google AI Studio](https://aistudio.google.com/) dashboard

### Firebase Firestore
- **Free Tier**: 
  - 50,000 reads/day
  - 20,000 writes/day
  - 20,000 deletes/day

### Recommendations
- Implement client-side caching
- Debounce API calls
- Show loading states
- Handle rate limit errors gracefully

---

## Best Practices

### Image Upload
- Compress images before upload (max 10MB)
- Use PNG or JPG format
- Ensure good image quality for better AI analysis
- Validate file size and type on client-side

### Error Handling
```typescript
try {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Analysis failed');
  }

  const result = await response.json();
  return result;
} catch (error) {
  console.error('API Error:', error);
  // Show user-friendly error message
}
```

### Caching
```typescript
// Cache analysis results in localStorage
localStorage.setItem('analysisData', JSON.stringify(data));

// Retrieve cached data
const cachedData = localStorage.getItem('analysisData');
if (cachedData) {
  return JSON.parse(cachedData);
}
```

---

## Support

For API issues or questions:
- GitHub Issues: [Report an issue](https://github.com/krishnasinghprojects/codm-stats-analyzer/issues)
- Email: [krishnasinghprojects@gmail.com](mailto:krishnasinghprojects@gmail.com)

---

**Last Updated**: January 2025
