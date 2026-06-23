// ============================================================
// API Docs — Add Score: HORSE RACE game type (unique steps 0–3)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  add("asslide-horse_race-0", "apis", "Horse Race — Game Setup", `POST /api/v1/horse-race/setup
Authorization: Bearer {token}

Body:
  {
    "game_id":         1,
    "organization_id": 1,
    "number_of_teams": 2,   // 2 | 3 | 4
    "holes":           18,  // 9 | 18 | 27
    "bet_amount":      50.00
  }

Response: { "status": true, "message": "Game setup saved." }

GET /api/v1/horse-race/config
Query: game_id
Response 200:
  { "status": true, "data": { "number_of_teams":2, "holes":18, "bet_amount":50.00 } }`);

  add("asslide-horse_race-1", "apis", "Horse Race — Across Foursome Teams", `GET /api/v1/horse-race/teams
Authorization: Bearer {token}   Query: game_id  organization_id

Response 200:
  { "status": true, "number_of_teams": 2,
    "data": [{ "id":1, "team_no":1, "players":[{ "id":1, "name":"...", "handicap":10 }] }] }`);

  add("asslide-horse_race-2", "apis", "Horse Race — Assign Teams", `GET /api/v1/horse-race/game-players
Authorization: Bearer {token}   Query: game_id  organization_id

Response 200:
  { "status": true, "data": [{ "id":1, "name":"...", "handicap":10 }] }

POST /api/v1/horse-race/team-assignments
Body:
  {
    "game_id": 1, "organization_id": 1,
    "assignments": [
      { "player_id": 1, "team": 1 },
      { "player_id": 2, "team": 2 }
    ]
  }

Response: { "status": true, "message": "Team assignments saved." }`);

  add("asslide-horse_race-3", "apis", "Horse Race — Team Review / Confirm", `GET /api/v1/horse-race/final-assignments
Authorization: Bearer {token}   Query: game_id  organization_id

Response 200:
  { "status": true, "data": [
      { "team_number":1, "players":[{ "id":1, "name":"..." }] }
  ]}

POST /api/v1/horse-race/confirm-teams
Body:  { "game_id":1, "organization_id":1 }
Response: { "status": true, "message": "Teams confirmed. Ready to score." }`);

})();
