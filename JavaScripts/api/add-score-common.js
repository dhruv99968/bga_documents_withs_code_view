// ============================================================
// API Docs — Add Score: Common steps (asslide-0 … asslide-11)
// Applies to all game types via the asslide-{type}-N fallback.
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  // ── asslide-0 — Select Foursome ───────────────────────────
  add("asslide-0", "apis", "getGamePlayers", `GET {{baseUrl}}/api/v1/games/{game_id}/players
Authorization: Bearer {token}
X-Organization-Id: all

Path:  game_id (required) integer

Response 200:
  {
    "error": false,
    "data": [
      { "id": 1, "name": "Player A", "handicap": 12 }
    ]
  }`);

  add("asslide-0", "apis", "storeFoursome", `POST {{baseUrl}}/api/v1/foursomes
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

  // ── asslide-1 — Generate Matches ──────────────────────────
  add("asslide-1", "apis", "generateMatches", `POST {{baseUrl}}/api/v1/games/{game_id}/generate-matches
Authorization: Bearer {token}
X-Organization-Id: all
Content-Type: application/json

Path:   game_id (required) integer
Body:   { "foursome_ids": [1, 2] }

Response 200:
  {
    "error": false,
    "data": [
      {
        "id":       1,
        "team1":    "Player A / Player B",
        "team2":    "Player C / Player D",
        "hole":     1
      }
    ]
  }`);

  // ── asslide-2 — Match Configuration ──────────────────────
  add("asslide-2", "apis", "saveMatchConfig", `POST {{baseUrl}}/api/v1/games/{game_id}/match-config
Authorization: Bearer {token}
X-Organization-Id: all
Content-Type: application/json

Body:
  {
    "play_type":       "COD",
    "holes_per_match": "6 Holes",
    "handicap_method": "WHS"
  }

play_type: "COD" | "2v2 Teams" | "Individual" | "Random"

Response 200:
  { "error": false, "message": "Match config saved." }`);

  // ── asslide-3 — Add Foursome Setting ─────────────────────
  add("asslide-3", "apis", "updateFoursomeSetting", `PATCH {{baseUrl}}/api/v1/foursomes/{foursome_id}
Authorization: Bearer {token}
X-Organization-Id: all
Content-Type: application/json

Path: foursome_id (required) integer
Body:
  {
    "game_id":   42,
    "tee_box":   "Blue",
    "start_hole": 1
  }

Response 200:
  { "error": false, "message": "Foursome setting updated." }`);

  // ── asslide-4 — Foursome Settings / Rule Toggles ─────────
  add("asslide-4", "apis", "saveFoursomeBets", `POST {{baseUrl}}/api/v1/foursomes/{foursome_id}/bets
Authorization: Bearer {token}
X-Organization-Id: all
Content-Type: application/json

Body:
  {
    "game_id":      42,
    "rebit":        true,
    "cheken":       false,
    "dot_game":     true,
    "newt":         false,
    "towfer":       true,
    "bet_amount":   5.00
  }

Response 200:
  { "error": false, "message": "Foursome bets saved." }`);

  add("asslide-4", "apis", "saveWolfBets", `POST {{baseUrl}}/api/v1/foursomes/{foursome_id}/wolf-bets
Authorization: Bearer {token}
X-Organization-Id: all
Content-Type: application/json

Body:
  {
    "game_id":       42,
    "wolf_enabled":  true,
    "wolf_amount":   10.00,
    "blind_wolf":    false
  }

Note: Used only when game_type = "wolf".

Response 200:
  { "error": false, "message": "Wolf bets saved." }`);

  // ── asslide-5 — Add Score CTA ─────────────────────────────
  add("asslide-5", "apis", "getGameFoursomes", `GET {{baseUrl}}/api/v1/games/{game_id}/foursomes
Authorization: Bearer {token}
X-Organization-Id: all

Path: game_id (required) integer

Response 200:
  {
    "error": false,
    "data": [
      {
        "id":      1,
        "players": [{ "id": 1, "name": "Player A", "handicap": 12 }],
        "scored":  false,
        "tee_box": "Blue"
      }
    ]
  }`);

  // ── asslide-6 — 18-Hole Score Grid ───────────────────────
  add("asslide-6", "apis", "getHoles", `GET {{baseUrl}}/api/v1/courses/{course_id}/holes
Authorization: Bearer {token}
X-Organization-Id: all

Path:  course_id (required) integer
Query: tee_box  (optional)  string — filter by tee box

Response 200:
  {
    "error": false,
    "data": [
      { "hole_number": 1, "par": 4, "handicap_index": 11, "distance_yards": 420 }
    ]
  }`);

  add("asslide-6", "apis", "getFoursomeScores", `GET {{baseUrl}}/api/v1/foursomes/{foursome_id}/scores
Authorization: Bearer {token}
X-Organization-Id: all

Path: foursome_id (required) integer

Response 200:
  {
    "error": false,
    "data": [
      {
        "player_id":   1,
        "player_name": "Player A",
        "scores": [
          { "hole": 1, "score": null }
        ]
      }
    ]
  }`);

  // ── asslide-7 — Scorecard (per-hole entry) ────────────────
  add("asslide-7", "apis", "storeScore", `POST {{baseUrl}}/api/v1/scores
Authorization: Bearer {token}
X-Organization-Id: all
Content-Type: application/json

Request Body:
  {
    "game_id":      42,
    "foursome_id":  1,
    "player_id":    1,
    "hole_number":  5,
    "score":        4,
    "putts":        2,
    "fairway_hit":  true,
    "gir":          false
  }

Response 201:
  {
    "error":   false,
    "message": "Score saved.",
    "data": { "id": 55, "hole_number": 5, "score": 4 }
  }`);

  add("asslide-7", "apis", "updateScore", `PUT {{baseUrl}}/api/v1/scores/{score_id}
Authorization: Bearer {token}
X-Organization-Id: all
Content-Type: application/json

Path: score_id (required) integer
Body: { "score": 3, "putts": 1, "fairway_hit": true }

Response 200:
  { "error": false, "message": "Score updated.", "data": { "id": 55, "score": 3 } }`);

  // ── asslide-8 — Skode & Junk Rewards ─────────────────────
  add("asslide-8", "apis", "getSkodeOptions", `GET {{baseUrl}}/api/v1/games/{game_id}/junk-options
Authorization: Bearer {token}
X-Organization-Id: all

Response 200:
  {
    "error": false,
    "data": [
      { "id": 1, "name": "Birdie",   "type": "EARNED", "amount": 5.00 },
      { "id": 2, "name": "Sand Save","type": "EARNED", "amount": 2.00 },
      { "id": 3, "name": "3-Putt",   "type": "MISSED", "amount": 3.00 }
    ]
  }`);

  add("asslide-8", "apis", "storeSkodeReward", `POST {{baseUrl}}/api/v1/scores/{score_id}/junk
Authorization: Bearer {token}
X-Organization-Id: all
Content-Type: application/json

Body:
  {
    "game_id":       42,
    "junk_option_id": 1,
    "type":          "EARNED"
  }

type: "MADE" | "MISSED" | "EARNED"

Response 201:
  { "error": false, "message": "Junk reward recorded." }`);

  // ── asslide-9 — Leaderboard ───────────────────────────────
  add("asslide-9", "apis", "getLeaderboard", `GET {{baseUrl}}/api/v1/games/{game_id}/leaderboard
Authorization: Bearer {token}
X-Organization-Id: all

Path:  game_id (required) integer
Query: holes_completed (optional) integer — filter by holes played

Response 200:
  {
    "error": false,
    "data": [
      {
        "rank":        1,
        "player_id":   1,
        "player_name": "Player A",
        "total_score": -3,
        "net_score":   -5,
        "thru":        9
      }
    ]
  }`);

  // ── asslide-10 — View Results Tab ─────────────────────────
  add("asslide-10", "apis", "getGameResults", `GET {{baseUrl}}/api/v1/games/{game_id}/results
Authorization: Bearer {token}
X-Organization-Id: all

Path:  game_id (required) integer

Response 200:
  {
    "error": false,
    "data": {
      "winner":  { "id": 1, "name": "Player A" },
      "players": [
        {
          "id":          1,
          "name":        "Player A",
          "gross":       72,
          "net":         65,
          "points":      36,
          "winnings":    45.00
        }
      ],
      "skins": [
        { "hole": 3, "winner": "Player B", "amount": 20.00 }
      ]
    }
  }`);

  // ── asslide-11 — All Holes Done / Finish ─────────────────
  add("asslide-11", "apis", "completeFoursome", `POST {{baseUrl}}/api/v1/foursomes/{foursome_id}/complete
Authorization: Bearer {token}
X-Organization-Id: all
Content-Type: application/json

Body:  { "game_id": 42 }

Response 200:
  {
    "error":   false,
    "message": "Foursome scoring complete.",
    "data": {
      "all_foursomes_complete": true,
      "game_status": "completed"
    }
  }`);

  add("asslide-11", "apis", "finalizeGame", `POST {{baseUrl}}/api/v1/games/{game_id}/finalize
Authorization: Bearer {token}
X-Organization-Id: all
Content-Type: application/json

Body:  { "confirm": true }

Response 200:
  {
    "error":   false,
    "message": "Game finalized. Results and ledger are available.",
    "data": {
      "game_id": 42,
      "status":  "completed"
    }
  }`);

})();
