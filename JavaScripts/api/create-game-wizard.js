// ============================================================
// API Docs — Create Game Wizard (cgslide-0 … cgslide-9)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  // ── cgslide-0 — Create or Select Event ───────────────────
  add("cgslide-0", "apis", "getEvents", `GET {{baseUrl}}/api/v1/events
Authorization: Bearer {token}
X-Organization-Id: all

Query Parameters:
  page   (optional) integer — pagination (default 1)
  search (optional) string  — filter by name

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
      ],
      "total": 5,
      "current_page": 1
    }
  }`);

  add("cgslide-0", "apis", "createEvent", `POST {{baseUrl}}/api/v1/events
Authorization: Bearer {token}
X-Organization-Id: all
Content-Type: application/json

Request Body:
  {
    "name":       "Club Championship 2025",
    "start_date": "2025-08-15",
    "end_date":   "2025-08-17",
    "location":   "Augusta National"
  }

Response 201:
  {
    "error":   false,
    "message": "Event created.",
    "data": { "id": 1, "name": "Club Championship 2025" }
  }`);

  // ── cgslide-1 — Create or Select Tee Sheet ────────────────
  add("cgslide-1", "apis", "getTeeSheets", `GET {{baseUrl}}/api/v1/tee-sheets
Authorization: Bearer {token}
X-Organization-Id: all

Query Parameters:
  event_id (optional) integer — filter by event
  page     (optional) integer

Response 200:
  {
    "error": false,
    "data": {
      "data": [
        {
          "id":         1,
          "name":       "Morning Wave",
          "event_id":   1,
          "tee_time":   "08:00",
          "max_groups": 10
        }
      ]
    }
  }`);

  add("cgslide-1", "apis", "createTeeSheet", `POST {{baseUrl}}/api/v1/tee-sheets
Authorization: Bearer {token}
X-Organization-Id: all
Content-Type: application/json

Request Body:
  {
    "event_id":   1,
    "name":       "Morning Wave",
    "tee_time":   "08:00",
    "max_groups": 10
  }

Response 201:
  {
    "error":   false,
    "message": "Tee sheet created.",
    "data": { "id": 1, "name": "Morning Wave" }
  }`);

  // ── cgslide-2 — Set Game Name & Game Type ─────────────────
  add("cgslide-2", "apis", "Game Name & Type", `// No standalone API call for this step.
// game_name and game_type are collected in the wizard
// and submitted together in the final POST /api/v1/games
// (see cgslide-9 — Game Created).

// Supported game_type values:
//   "3_2_1"            — 321 Milo
//   "calcutta"         — Calcutta
//   "progressive_skins"— Progressive Skins
//   "regular_skins"    — Regular Skins
//   "ryder_cup"        — Ryder Cup
//   "vegas"            — Vegas
//   "horse_race"       — Horse Race
//   "wolf"             — Wolf
//   "scramble"         — Scramble
//   "stableford"       — Stableford
//   "stroke_play"      — Stroke Play`);

  // ── cgslide-3 — Set Match Details ─────────────────────────
  add("cgslide-3", "apis", "Match Details", `// No standalone API call for this step.
// Match detail fields collected here:
//
//   play_type        string  — "COD" | "2v2 Teams" | "Individual" | "Random"
//   handicap_method  string  — "WHS" | "None" | "Custom"
//   match_format     string  — "strokeplay" | "matchplay" | "stableford"
//
// All values are bundled into the final POST /api/v1/games payload.

// Preview of relevant body fields:
// {
//   "play_type":       "COD",
//   "handicap_method": "WHS",
//   "match_format":    "strokeplay"
// }`);

  // ── cgslide-4 — Select Start Date & Time ─────────────────
  add("cgslide-4", "apis", "Start Date & Time", `// No standalone API call for this step.
// start_datetime is collected here (ISO 8601 format)
// and included in the final POST /api/v1/games payload.

// Preview of relevant body field:
// {
//   "start_datetime": "2025-07-05T08:00:00"
// }

// Note: The datetime picker lets the admin set the
// round start time; players see this on the game overview.`);

  // ── cgslide-5 — Set Per Match Holes ───────────────────────
  add("cgslide-5", "apis", "Per Match Holes", `// No standalone API call for this step.
// holes_per_match is collected here and bundled into
// the final POST /api/v1/games payload.

// Preview of relevant body field:
// {
//   "holes_per_match": 18   // options: 9 | 18
// }

// Note: For multi-match game types (e.g., 321 Milo),
// the number of holes per individual match is set here.`);

  // ── cgslide-6 — Set Amount for Each ───────────────────────
  add("cgslide-6", "apis", "Set Amounts", `// No standalone API call for this step.
// Amount fields collected here are bundled into
// the final POST /api/v1/games payload.

// Preview of relevant body fields:
// {
//   "buy_in":        20.00,  // per-player entry fee
//   "match_amount":  5.00,   // amount per match/hole
//   "skin_amount":   2.00    // (skins game types only)
// }`);

  // ── cgslide-7 — Set Points ────────────────────────────────
  add("cgslide-7", "apis", "Set Points", `// No standalone API call for this step.
// Points configuration collected here is bundled into
// the final POST /api/v1/games payload.

// Preview of relevant body fields:
// {
//   "points_win":     3,
//   "points_halve":   1,
//   "points_loss":    0
// }

// Note: Used primarily in match-play and Ryder Cup
// formats where wins/halves/losses earn points.`);

  // ── cgslide-8 — Choose Game Thumbnail ────────────────────
  add("cgslide-8", "apis", "Upload Thumbnail", `POST {{baseUrl}}/api/v1/media/upload
Authorization: Bearer {token}
X-Organization-Id: all
Content-Type: multipart/form-data

Form Fields:
  file       (required) image file — JPEG or PNG, max 5 MB
  context    (optional) string     — "game_thumbnail"

Response 200:
  {
    "error": false,
    "data": {
      "url":      "https://cdn.example.com/thumbnails/abc123.jpg",
      "filename": "abc123.jpg"
    }
  }

// The returned filename is passed as "thumbnail"
// in the final POST /api/v1/games body.`);

  // ── cgslide-9 — Game Created Successfully ────────────────
  add("cgslide-9", "apis", "createGame", `POST {{baseUrl}}/api/v1/games
Authorization: Bearer {token}
X-Organization-Id: all
Content-Type: application/json

// This is the final wizard submission — all fields
// collected across cgslide-0..8 are sent here.

Request Body:
  {
    "event_id":        1,
    "tee_sheet_id":    1,
    "name":            "Saturday 321 Milo",
    "game_type":       "3_2_1",
    "play_type":       "COD",
    "handicap_method": "WHS",
    "match_format":    "strokeplay",
    "start_datetime":  "2025-07-05T08:00:00",
    "holes_per_match": 18,
    "buy_in":          20.00,
    "match_amount":    5.00,
    "points_win":      3,
    "points_halve":    1,
    "points_loss":     0,
    "player_ids":      [1, 2, 3, 4],
    "thumbnail":       "abc123.jpg"
  }

game_type options:
  "3_2_1" | "calcutta" | "progressive_skins" | "regular_skins"
  "ryder_cup" | "vegas" | "horse_race" | "wolf"
  "scramble" | "stableford" | "stroke_play"

Response 201:
  {
    "error":   false,
    "message": "Game created successfully.",
    "data": {
      "id":         42,
      "name":       "Saturday 321 Milo",
      "game_type":  "3_2_1",
      "status":     "upcoming",
      "start_date": "2025-07-05",
      "course":     { "id": 1, "name": "Pebble Beach Golf Links" },
      "players":    [{ "id": 1, "name": "Player A" }]
    }
  }

Error 422 (Validation):
  { "error": true, "message": "The event_id field is required." }`);

  add("cgslide-9", "apis", "getGameDetails", `GET {{baseUrl}}/api/v1/games/{game_id}
Authorization: Bearer {token}
X-Organization-Id: all

// Called after creation to load the Game Overview screen.
Path:  game_id (required) integer — returned by POST /api/v1/games

Response 200:
  {
    "error": false,
    "data": {
      "id":           42,
      "name":         "Saturday 321 Milo",
      "game_type":    "3_2_1",
      "status":       "upcoming",
      "start_date":   "2025-07-05",
      "course":       { "id": 1, "name": "Pebble Beach Golf Links" },
      "players":      [{ "id": 1, "name": "Player A", "handicap": 12 }],
      "foursomes":    [],
      "scores":       []
    }
  }`);

})();
