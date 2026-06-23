// ============================================================
// API Docs — Quick Start Wizard (wslide-0 … wslide-9)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  // ── wslide-0 — Welcome Screen ─────────────────────────────
  add("wslide-0", "apis", "Welcome Screen", `// No API call — static welcome / onboarding screen.
// Navigation only: taps "Get Started" → wslide-1 (Sign Up).`);

  // ── wslide-1 — Sign Up ────────────────────────────────────
  add("wslide-1", "apis", "registerUser", `POST {{baseUrl}}/api/register
Content-Type: application/json

Request Body:
  {
    "name":                  "John Doe",
    "email":                 "john@example.com",
    "password":              "secret123",
    "password_confirmation": "secret123",
    "phone":                 "+1-555-0100"
  }

Response 201:
  {
    "error":   false,
    "message": "Registration successful.",
    "data": {
      "id":           1,
      "name":         "John Doe",
      "email":        "john@example.com",
      "access_token": "eyJ..."
    }
  }

Error 422 (Validation):
  { "error": true, "message": "The email has already been taken." }`);

  // ── wslide-2 — Course Selection ───────────────────────────
  add("wslide-2", "apis", "getCourses", `GET {{baseUrl}}/api/v1/courses
Authorization: Bearer {token}
X-Organization-Id: all

Query Parameters:
  search   (optional) string  — filter by name
  page     (optional) integer — pagination (default 1)

Response 200:
  {
    "error": false,
    "data": {
      "current_page": 1,
      "data": [
        {
          "id":        1,
          "name":      "Pebble Beach Golf Links",
          "city":      "Pebble Beach",
          "state":     "CA",
          "par":       72,
          "holes":     18,
          "tee_boxes": ["Black","Blue","White","Red"]
        }
      ],
      "total": 42,
      "last_page": 3
    }
  }`);

  // ── wslide-3 — Home Dashboard ─────────────────────────────
  add("wslide-3", "apis", "getGames", `GET {{baseUrl}}/api/v1/games
Authorization: Bearer {token}
X-Organization-Id: all

Query Parameters:
  status  (optional) string  — upcoming | active | completed
  page    (optional) integer

Response 200:
  {
    "error": false,
    "data": {
      "data": [
        {
          "id":         1,
          "name":       "Saturday Scramble",
          "game_type":  "scramble",
          "status":     "upcoming",
          "start_date": "2025-07-01",
          "players":    [{ "id": 1, "name": "Player A" }]
        }
      ]
    }
  }`);

  add("wslide-3", "apis", "getEvents", `GET {{baseUrl}}/api/v1/events
Authorization: Bearer {token}
X-Organization-Id: all

Query Parameters:
  page (optional) integer

Response 200:
  {
    "error": false,
    "data": {
      "data": [
        {
          "id":         1,
          "name":       "Club Championship 2025",
          "start_date": "2025-08-15",
          "end_date":   "2025-08-17",
          "location":   "Augusta National"
        }
      ]
    }
  }`);

  // ── wslide-4 — Create Game ────────────────────────────────
  add("wslide-4", "apis", "createGame", `POST {{baseUrl}}/api/v1/games
Authorization: Bearer {token}
X-Organization-Id: all
Content-Type: application/json

Request Body:
  {
    "event_id":       1,
    "tee_sheet_id":   1,
    "name":           "Saturday 321 Milo",
    "game_type":      "3_2_1",
    "play_type":      "COD",
    "start_datetime": "2025-07-05T08:00:00",
    "handicap_method":"WHS",
    "holes":          18,
    "buy_in":         20.00,
    "player_ids":     [1, 2, 3, 4],
    "thumbnail":      "thumbnail_1.png"
  }

game_type options:
  "3_2_1" | "vegas" | "scramble" | "progressive_skins" | "regular_skins"
  "stroke_play" | "stableford" | "wolf" | "horse_race" | "ryder_cup" | "calcutta"

Response 201:
  {
    "error":   false,
    "message": "Game created successfully.",
    "data": { "id": 42, "name": "Saturday 321 Milo", ... }
  }`);

  // ── wslide-5 — Game Created ───────────────────────────────
  add("wslide-5", "apis", "Game Created Success", `// Success screen — no additional API call.
// Uses the game object returned by POST /api/v1/games (see wslide-4).
// Displays: game name, game type, start date.
// CTA: "View Game" → navigates to game_details_screen (wslide-6).`);

  // ── wslide-6 — Game Overview / View Game ─────────────────
  add("wslide-6", "apis", "getGameDetails", `GET {{baseUrl}}/api/v1/games/{game_id}
Authorization: Bearer {token}
X-Organization-Id: all

Path:  game_id (required) integer

Response 200:
  {
    "error": false,
    "data": {
      "id":          42,
      "name":        "Saturday 321 Milo",
      "game_type":   "3_2_1",
      "status":      "upcoming",
      "start_date":  "2025-07-05",
      "course":      { "id": 1, "name": "Pebble Beach Golf Links" },
      "players":     [{ "id": 1, "name": "Player A", "handicap": 12 }],
      "foursomes":   [],
      "scores":      []
    }
  }`);

  // ── wslide-7 — Add Bets ───────────────────────────────────
  add("wslide-7", "apis", "getBets", `GET {{baseUrl}}/api/v1/bets
Authorization: Bearer {token}
X-Organization-Id: all

Query:  game_id (required) integer

Response 200:
  {
    "error": false,
    "data": [
      {
        "id":           1,
        "bet_type":     "skins",
        "amount":       10.00,
        "status":       "open",
        "participants": [{ "id": 1, "name": "Player A" }]
      }
    ]
  }`);

  add("wslide-7", "apis", "storeBet", `POST {{baseUrl}}/api/v1/bets
Authorization: Bearer {token}
X-Organization-Id: all
Content-Type: application/json

Request Body:
  {
    "game_id":       42,
    "bet_type":      "skins",
    "amount":        10.00,
    "participants":  [1, 2, 3, 4]
  }

bet_type options: "win_lose" | "over_under" | "skins"

Response 201:
  {
    "error":   false,
    "message": "Bet created.",
    "data": { "id": 7, "bet_type": "skins", "amount": 10.00 }
  }`);

  // ── wslide-8 — Select Foursome ────────────────────────────
  add("wslide-8", "apis", "getGamePlayers", `GET {{baseUrl}}/api/v1/games/{game_id}/players
Authorization: Bearer {token}
X-Organization-Id: all

Path: game_id (required) integer

Response 200:
  {
    "error": false,
    "data": [
      { "id": 1, "name": "Player A", "handicap": 12 }
    ]
  }`);

  add("wslide-8", "apis", "storeFoursome", `POST {{baseUrl}}/api/v1/foursomes
Authorization: Bearer {token}
X-Organization-Id: all
Content-Type: application/json

Request Body:
  {
    "game_id":    42,
    "player_ids": [1, 2, 3, 4]
  }

Response 201:
  {
    "error":   false,
    "message": "Foursome created.",
    "data": {
      "id":      1,
      "players": [{ "id": 1, "name": "Player A" }]
    }
  }`);

  // ── wslide-9 — Scoring ────────────────────────────────────
  add("wslide-9", "apis", "storeScore", `POST {{baseUrl}}/api/v1/scores
Authorization: Bearer {token}
X-Organization-Id: all
Content-Type: application/json

Request Body:
  {
    "game_id":     42,
    "player_id":   1,
    "hole_number": 1,
    "score":       4,
    "putts":       2,
    "fairway_hit": true
  }

Response 201:
  {
    "error":   false,
    "message": "Score saved.",
    "data": { "id": 101, "hole_number": 1, "score": 4 }
  }`);

  add("wslide-9", "apis", "getGameScores", `GET {{baseUrl}}/api/v1/games/{game_id}/scores
Authorization: Bearer {token}
X-Organization-Id: all

Path: game_id (required) integer

Response 200:
  {
    "error": false,
    "data": [
      {
        "player_id":   1,
        "player_name": "Player A",
        "scores": [
          { "hole": 1, "score": 4, "putts": 2 }
        ],
        "total": 72
      }
    ]
  }`);

})();
