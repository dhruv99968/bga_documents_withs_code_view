// ============================================================
// API Docs — Add Score: RYDER CUP game type (unique steps 0–9)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  add("asslide-ryder_cup-0", "apis", "Ryder Cup — Captain Selection", `GET /api/v1/ryder-cup/teams
Authorization: Bearer {token}   Query: game_id  organization_id

Response 200:
  { "status": true, "data": {
      "teamA": [{ "id":1, "name":"...", "handicap":10, "is_captain":false }],
      "teamB": [{ "id":5, "name":"...", "handicap":8,  "is_captain":false }]
  }}

POST /api/v1/ryder-cup/set-captains
Body:  { "game_id":1, "organization_id":1, "team_a_captain_id":1, "team_b_captain_id":5 }
Response: { "status": true, "message": "Captains set successfully." }`);

  add("asslide-ryder_cup-1", "apis", "Ryder Cup — Pick Players", `GET /api/v1/ryder-cup/draft-pool
Authorization: Bearer {token}   Query: game_id  organization_id

Response 200:
  { "status": true, "data": [{ "id":3, "name":"...", "handicap":6 }] }

POST /api/v1/ryder-cup/draft-pick
Body:  { "game_id":1, "organization_id":1, "player_id":3, "team":"A" }
       team: "A" | "B"
Response: { "status": true, "message": "Player drafted." }`);

  add("asslide-ryder_cup-2", "apis", "Ryder Cup — Select Players", `GET /api/v1/ryder-cup/selected-players
Authorization: Bearer {token}   Query: game_id  organization_id

Response 200:
  { "status": true, "data": {
      "teamA": [{ "id":1, "name":"...", "handicap":10, "is_captain":true }],
      "teamB": [{ "id":5, "name":"...", "handicap":8,  "is_captain":true }]
  }}

POST /api/v1/ryder-cup/confirm-players
Body:  { "game_id":1, "organization_id":1 }
Response: { "status": true, "message": "Player selection confirmed." }`);

  add("asslide-ryder_cup-3", "apis", "Ryder Cup — Tee Time", `GET /api/v1/ryder-cup/tee-time-foursomes
Authorization: Bearer {token}   Query: game_id  organization_id

Response 200:
  { "status": true, "data": [{ "id":1, "tee_time":null, "players":[{ "id":1, "name":"..." }] }] }

POST /api/v1/ryder-cup/tee-times
Body:
  { "game_id":1, "organization_id":1,
    "tee_times": [{ "foursome_id":1, "tee_time":"8:00 AM" }] }
Response: { "status": true, "message": "Tee times saved." }`);

  add("asslide-ryder_cup-4", "apis", "Ryder Cup — Player Selection / Foursomes", `GET /api/v1/ryder-cup/foursomes
Authorization: Bearer {token}   Query: game_id  organization_id

Response 200:
  { "status": true, "data": [{ "id":1, "players":[{ "id":1, "name":"...", "team":"A" }] }] }

POST /api/v1/ryder-cup/assign-player-foursome
Body:  { "game_id":1, "organization_id":1, "foursome_id":1, "player_id":3 }
Response: { "status": true, "message": "Player assigned." }

POST /api/v1/ryder-cup/confirm-foursomes
Body:  { "game_id":1, "organization_id":1 }
Response: { "status": true, "message": "Foursomes confirmed." }`);

  add("asslide-ryder_cup-5", "apis", "Ryder Cup — All Foursomes Done", `GET /api/v1/ryder-cup/foursomes
Authorization: Bearer {token}   Query: game_id  organization_id

Response 200: (same as step 4 — read-only summary view)
  { "status": true, "data": [{ "id":1, "players":[{ "id":1, "name":"...", "team":"A" }] }] }`);

  add("asslide-ryder_cup-6", "apis", "Ryder Cup — Generate Match", `POST /api/v1/ryder-cup/generate-matches
Authorization: Bearer {token}

Body:  { "game_id":1, "organization_id":1 }

Response 200:
  { "status": true, "data": [
      { "id":1, "team_a_player":"Player A", "team_b_player":"Player B", "format":"Singles", "holes":18 }
  ]}

GET /api/v1/ryder-cup/matches
Query: game_id  organization_id
Response 200: { "status": true, "data": [...matches] }`);

  add("asslide-ryder_cup-7", "apis", "Ryder Cup — Confirm Matches", `POST /api/v1/ryder-cup/confirm-matches
Authorization: Bearer {token}

Body:  { "game_id":1, "organization_id":1 }

Response: { "status": true, "message": "Matches confirmed." }`);

  add("asslide-ryder_cup-8", "apis", "Ryder Cup — Match Config", `POST /api/v1/ryder-cup/match-config
Authorization: Bearer {token}

Body:
  {
    "game_id":         1,
    "organization_id": 1,
    "format":          "Foursomes",   // Foursomes | Fourball | Singles
    "holes":           "18"           // "9" | "18"
  }

Response: { "status": true, "message": "Match config saved." }`);

  add("asslide-ryder_cup-9", "apis", "Ryder Cup — Add Score Entry", `GET /api/v1/ryder-cup/scoring-foursomes
Authorization: Bearer {token}   Query: game_id  organization_id

Response 200:
  { "status": true, "data": [{ "id":1, "players":[{ "id":1, "name":"..." }], "scored":false }] }`);

})();
