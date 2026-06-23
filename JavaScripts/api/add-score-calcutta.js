// ============================================================
// API Docs — Add Score: CALCUTTA game type (unique steps 0–17)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  add("asslide-calcutta-0", "apis", "Calcutta — Round-1 Select", `GET /api/v1/calcutta/round1-players
Authorization: Bearer {token}

Query:  game_id (required)  organization_id (required)

Response 200:
  { "status": true, "data": [{ "id": 1, "name": "...", "handicap": 12 }] }

POST /api/v1/calcutta/round1-select
Body:  { "game_id": 1, "organization_id": 1, "player_ids": [1,2,3] }
Response: { "status": true, "message": "Round 1 selection saved." }`);

  add("asslide-calcutta-1", "apis", "Calcutta — Player Sheet", `GET /api/v1/calcutta/round1-sheet
Authorization: Bearer {token}

Query:  game_id  organization_id

Response 200:
  { "status": true, "data": [{ "id":1, "name":"...", "handicap":12, "bid_amount":null, "buyer_id":null }] }`);

  add("asslide-calcutta-2", "apis", "Calcutta — Select & Bid", `POST /api/v1/calcutta/submit-bids
Authorization: Bearer {token}

Body:
  {
    "game_id": 1, "organization_id": 1,
    "bids": [{ "player_id": 1, "amount": 250 }]
  }

Response: { "status": true, "message": "Bids submitted successfully." }`);

  add("asslide-calcutta-3", "apis", "Calcutta — Round-1 Done", `GET /api/v1/calcutta/round1-results
Authorization: Bearer {token}

Query:  game_id  organization_id

Response 200:
  { "status": true, "data": [{ "player_name":"...", "buyer_name":"...", "final_bid":250 }] }`);

  add("asslide-calcutta-4", "apis", "Calcutta — Match Config", `POST /api/v1/calcutta/match-config
Authorization: Bearer {token}

Body:
  {
    "game_id": 1, "organization_id": 1,
    "play_type": "COD",          // COD | 2v2 Teams | Individual
    "holes_per_match": "6 Holes" // 3 Holes | 6 Holes | 9 Holes | 18 Holes
  }

Response: { "status": true, "message": "Match config saved." }`);

  add("asslide-calcutta-5", "apis", "Calcutta — Player Selection", `GET /api/v1/calcutta/available-players
Authorization: Bearer {token}

Query:  game_id  organization_id

Response 200:
  { "status": true, "data": [{ "id":1, "name":"...", "handicap":12 }] }

POST /api/v1/calcutta/player-groups
Body:
  {
    "game_id": 1, "organization_id": 1,
    "assignments": [{ "player_id": 1, "group": 1 }]
  }

Response: { "status": true, "message": "Player groups saved." }`);

  add("asslide-calcutta-6", "apis", "Calcutta — Card Distribution", `GET /api/v1/calcutta/card-groups
Authorization: Bearer {token}

Response 200:
  { "status": true, "data": [{ "players": [{ "id":1, "name":"...", "card_number":null }] }] }

POST /api/v1/calcutta/save-cards
Body:  { "game_id":1, "organization_id":1, "cards": [{ "player_id":1, "card_number":3 }] }
Response: { "status": true, "message": "Cards distributed." }`);

  add("asslide-calcutta-7", "apis", "Calcutta — Foursomes", `GET /api/v1/calcutta/foursomes
Authorization: Bearer {token}

Query:  game_id  organization_id

Response 200:
  { "status": true, "data": [{ "id":1, "players": [{ "id":1, "name":"...", "handicap":12 }] }] }`);

  add("asslide-calcutta-8", "apis", "Calcutta — Generate Matches", `POST /api/v1/calcutta/generate-matches
Authorization: Bearer {token}

Body:  { "game_id": 1, "organization_id": 1 }

Response 200:
  { "status": true, "data": [{ "id":1, "team1":"A / B", "team2":"C / D", "hole_start":1, "hole_end":6 }] }`);

  add("asslide-calcutta-9", "apis", "Calcutta — Round-2 Select", `GET /api/v1/calcutta/round2-players
Authorization: Bearer {token}

Query:  game_id  organization_id
Note:   Returns players NOT yet auctioned in Round 1.

Response 200:
  { "status": true, "data": [{ "id":5, "name":"...", "handicap":8 }] }`);

  add("asslide-calcutta-10", "apis", "Calcutta — Round-2 Sheet", `GET /api/v1/calcutta/round2-sheet
Authorization: Bearer {token}

Query:  game_id  organization_id

Response 200:
  { "status": true, "data": [{ "id":5, "name":"...", "handicap":8, "starting_bid":100 }] }`);

  add("asslide-calcutta-11", "apis", "Calcutta — Select Player Round-2", `GET /api/v1/calcutta/round2-auction-list
Authorization: Bearer {token}   Query: game_id  organization_id

Response 200:
  { "status": true, "data": [{ "id":5, "name":"..." }] }

POST /api/v1/calcutta/complete-round2
Body:  { "game_id":1, "player_id":5, "organization_id":1 }
Response: { "status": true, "message": "Round 2 player confirmed." }`);

  add("asslide-calcutta-12", "apis", "Calcutta — Round-2 Done", `GET /api/v1/calcutta/round2-results
Authorization: Bearer {token}   Query: game_id  organization_id

Response 200:
  { "status": true, "data": [{ "player_name":"...", "team_name":"...", "final_bid":175 }] }`);

  add("asslide-calcutta-13", "apis", "Calcutta — Round-3 Select", `GET /api/v1/calcutta/round3-players
Authorization: Bearer {token}

Query:  game_id  organization_id
Note:   Returns players NOT auctioned in Rounds 1 or 2.

Response 200:
  { "status": true, "data": [{ "id":9, "name":"...", "handicap":5 }] }`);

  add("asslide-calcutta-14", "apis", "Calcutta — Round-3 Sheet", `GET /api/v1/calcutta/round3-sheet
Authorization: Bearer {token}   Query: game_id  organization_id

Response 200:
  { "status": true, "data": [{ "id":9, "name":"...", "handicap":5, "starting_bid":75 }] }`);

  add("asslide-calcutta-15", "apis", "Calcutta — Select Player Round-3", `GET /api/v1/calcutta/round3-auction-list
Authorization: Bearer {token}   Query: game_id  organization_id
Response 200: { "status": true, "data": [{ "id":9, "name":"..." }] }

POST /api/v1/calcutta/complete-round3
Body:  { "game_id":1, "player_id":9, "organization_id":1 }
Response: { "status": true, "message": "Round 3 player confirmed." }`);

  add("asslide-calcutta-16", "apis", "Calcutta — Round-3 Done", `GET /api/v1/calcutta/round3-results
Authorization: Bearer {token}   Query: game_id  organization_id

Response 200:
  { "status": true, "data": [{ "player_name":"...", "team_name":"...", "final_bid":100 }] }`);

  add("asslide-calcutta-17", "apis", "Calcutta — Add Score Entry", `GET /api/v1/calcutta/score-foursomes
Authorization: Bearer {token}   Query: game_id  organization_id

Response 200:
  { "status": true, "data": [{ "id":1, "players": [{ "id":1, "name":"..." }], "scored": false }] }`);

})();
