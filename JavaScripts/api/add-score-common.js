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


  add("asslide-0", "apis", "endFourSome", `
// GET {{baseUrl}}/api/foursome/$foursomeId/game/end
// Controller: add_score_controller.dart → apiService.endFourSome()

Dart Method:
  apiService.endFourSome({
    foursomeId: int,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/foursome/$foursomeId/game/end
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-0", "apis", "getCalcuttaRounds", `
// GET {{baseUrl}}/api/games/calcutta/game/$gameId/round/players
// Controller: add_score_controller.dart → apiService.getCalcuttaRounds()

Dart Method:
  apiService.getCalcuttaRounds({
    gameId: String
  }) → Future&lt;CalcuttaRoundsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/calcutta/game/$gameId/round/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaRoundsModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-0", "apis", "getCompletedHoles", `
// GET {{baseUrl}}/api/scorecard/game/$gameId/completed/holes
// Controller: add_score_controller.dart → apiService.getCompletedHoles()

Dart Method:
  apiService.getCompletedHoles({
    gameId: int,
    organizationId: String
  }) → Future&lt;CompletedHolesModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/$gameId/completed/holes
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CompletedHolesModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-0", "apis", "getFoursome", `
// GET {{baseUrl}}/api/games/$gameID/foursomes/list
// Controller: add_score_controller.dart → apiService.getFoursome()

Dart Method:
  apiService.getFoursome({
    gameID: String,
    organizationId: String
  }) → Future&lt;CalcuttaFoursomeModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameID/foursomes/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaFoursomeModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-0", "apis", "getMemberList", `
// GET {{baseUrl}}/api/user/member/list
// Controller: add_score_controller.dart → apiService.getMemberList()

Dart Method:
  apiService.getMemberList(()) → Future&lt;ParticipantsListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/user/member/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (ParticipantsListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-0", "apis", "ryderCupGenerateMatch", `
// POST {{baseUrl}}/api/games/rydercup/pick/players
// Controller: add_score_controller.dart → apiService.ryderCupGenerateMatch()

Dart Method:
  apiService.ryderCupGenerateMatch({
    gameId: String,
    List<PickPlayerModel> playerList,
    Map<int,
    String> foursomeTeeTimeMap,
    // ADD THIS
  }) → Future&lt;RydercupGenerateMatch&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/rydercup/pick/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
  }

Response (RydercupGenerateMatch):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-0", "apis", "updateCaptain", `
// POST {{baseUrl}}/api/games/rydercup-set-capitans
// Controller: add_score_controller.dart → apiService.updateCaptain()

Dart Method:
  apiService.updateCaptain({
    gameId: String,
    captainA: String,
    captainB: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/rydercup-set-capitans
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "captain_a": "..."
    "captain_b": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-1", "apis", "getFourSomePlayer", `
// GET {{baseUrl}}/api/foursome/$foursomeId/players
// Controller: foursome_bottom_controller.dart → apiService.getFourSomePlayer()

Dart Method:
  apiService.getFourSomePlayer({
    foursomeId: String?
  }) → Future&lt;TeesheetOnlyPlayerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/foursome/$foursomeId/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (TeesheetOnlyPlayerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-2", "apis", "getVegasCodMatches", `
// GET {{baseUrl}}/api/games/$gameID/foursome/$foursomeId/generate/matches
// Controller: vegas_match_config_bottom_controller.dart → apiService.getVegasCodMatches()

Dart Method:
  apiService.getVegasCodMatches({
    gameID: String,
    foursomeId
  }) → Future&lt;VegasCodModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameID/foursome/$foursomeId/generate/matches
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (VegasCodModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-3", "apis", "endFourSome", `
// GET {{baseUrl}}/api/foursome/$foursomeId/game/end
// Controller: add_score_controller.dart → apiService.endFourSome()

Dart Method:
  apiService.endFourSome({
    foursomeId: int,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/foursome/$foursomeId/game/end
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-3", "apis", "getCalcuttaRounds", `
// GET {{baseUrl}}/api/games/calcutta/game/$gameId/round/players
// Controller: add_score_controller.dart → apiService.getCalcuttaRounds()

Dart Method:
  apiService.getCalcuttaRounds({
    gameId: String
  }) → Future&lt;CalcuttaRoundsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/calcutta/game/$gameId/round/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaRoundsModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-3", "apis", "getCompletedHoles", `
// GET {{baseUrl}}/api/scorecard/game/$gameId/completed/holes
// Controller: add_score_controller.dart → apiService.getCompletedHoles()

Dart Method:
  apiService.getCompletedHoles({
    gameId: int,
    organizationId: String
  }) → Future&lt;CompletedHolesModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/$gameId/completed/holes
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CompletedHolesModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-3", "apis", "getFoursome", `
// GET {{baseUrl}}/api/games/$gameID/foursomes/list
// Controller: add_score_controller.dart → apiService.getFoursome()

Dart Method:
  apiService.getFoursome({
    gameID: String,
    organizationId: String
  }) → Future&lt;CalcuttaFoursomeModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameID/foursomes/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaFoursomeModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-3", "apis", "getMemberList", `
// GET {{baseUrl}}/api/user/member/list
// Controller: add_score_controller.dart → apiService.getMemberList()

Dart Method:
  apiService.getMemberList(()) → Future&lt;ParticipantsListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/user/member/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (ParticipantsListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-3", "apis", "ryderCupGenerateMatch", `
// POST {{baseUrl}}/api/games/rydercup/pick/players
// Controller: add_score_controller.dart → apiService.ryderCupGenerateMatch()

Dart Method:
  apiService.ryderCupGenerateMatch({
    gameId: String,
    List<PickPlayerModel> playerList,
    Map<int,
    String> foursomeTeeTimeMap,
    // ADD THIS
  }) → Future&lt;RydercupGenerateMatch&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/rydercup/pick/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
  }

Response (RydercupGenerateMatch):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-3", "apis", "updateCaptain", `
// POST {{baseUrl}}/api/games/rydercup-set-capitans
// Controller: add_score_controller.dart → apiService.updateCaptain()

Dart Method:
  apiService.updateCaptain({
    gameId: String,
    captainA: String,
    captainB: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/rydercup-set-capitans
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "captain_a": "..."
    "captain_b": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-4", "apis", "getFourSomePlayer", `
// GET {{baseUrl}}/api/foursome/$foursomeId/players
// Controller: foursome_bet_bottom_controller.dart → apiService.getFourSomePlayer()

Dart Method:
  apiService.getFourSomePlayer({
    foursomeId: String?
  }) → Future&lt;TeesheetOnlyPlayerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/foursome/$foursomeId/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (TeesheetOnlyPlayerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-4", "apis", "getFoursomeOverride", `
// GET {{baseUrl}}/api/games/$gameID/foursome/$foursomeId/override
// Controller: foursome_bet_bottom_controller.dart → apiService.getFoursomeOverride()

Dart Method:
  apiService.getFoursomeOverride({
    gameID: String,
    foursomeId,
    organizationId: String
  }) → Future&lt;GetFoursomeOverrideModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameID/foursome/$foursomeId/override
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GetFoursomeOverrideModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-5", "apis", "endFourSome", `
// GET {{baseUrl}}/api/foursome/$foursomeId/game/end
// Controller: add_score_controller.dart → apiService.endFourSome()

Dart Method:
  apiService.endFourSome({
    foursomeId: int,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/foursome/$foursomeId/game/end
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-5", "apis", "getCalcuttaRounds", `
// GET {{baseUrl}}/api/games/calcutta/game/$gameId/round/players
// Controller: add_score_controller.dart → apiService.getCalcuttaRounds()

Dart Method:
  apiService.getCalcuttaRounds({
    gameId: String
  }) → Future&lt;CalcuttaRoundsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/calcutta/game/$gameId/round/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaRoundsModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-5", "apis", "getCompletedHoles", `
// GET {{baseUrl}}/api/scorecard/game/$gameId/completed/holes
// Controller: add_score_controller.dart → apiService.getCompletedHoles()

Dart Method:
  apiService.getCompletedHoles({
    gameId: int,
    organizationId: String
  }) → Future&lt;CompletedHolesModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/$gameId/completed/holes
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CompletedHolesModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-5", "apis", "getFoursome", `
// GET {{baseUrl}}/api/games/$gameID/foursomes/list
// Controller: add_score_controller.dart → apiService.getFoursome()

Dart Method:
  apiService.getFoursome({
    gameID: String,
    organizationId: String
  }) → Future&lt;CalcuttaFoursomeModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameID/foursomes/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaFoursomeModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-5", "apis", "getMemberList", `
// GET {{baseUrl}}/api/user/member/list
// Controller: add_score_controller.dart → apiService.getMemberList()

Dart Method:
  apiService.getMemberList(()) → Future&lt;ParticipantsListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/user/member/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (ParticipantsListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-5", "apis", "ryderCupGenerateMatch", `
// POST {{baseUrl}}/api/games/rydercup/pick/players
// Controller: add_score_controller.dart → apiService.ryderCupGenerateMatch()

Dart Method:
  apiService.ryderCupGenerateMatch({
    gameId: String,
    List<PickPlayerModel> playerList,
    Map<int,
    String> foursomeTeeTimeMap,
    // ADD THIS
  }) → Future&lt;RydercupGenerateMatch&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/rydercup/pick/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
  }

Response (RydercupGenerateMatch):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-5", "apis", "updateCaptain", `
// POST {{baseUrl}}/api/games/rydercup-set-capitans
// Controller: add_score_controller.dart → apiService.updateCaptain()

Dart Method:
  apiService.updateCaptain({
    gameId: String,
    captainA: String,
    captainB: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/rydercup-set-capitans
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "captain_a": "..."
    "captain_b": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-6", "apis", "endFourSome", `
// GET {{baseUrl}}/api/foursome/$foursomeId/game/end
// Controller: add_score_controller.dart → apiService.endFourSome()

Dart Method:
  apiService.endFourSome({
    foursomeId: int,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/foursome/$foursomeId/game/end
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-6", "apis", "getCalcuttaRounds", `
// GET {{baseUrl}}/api/games/calcutta/game/$gameId/round/players
// Controller: add_score_controller.dart → apiService.getCalcuttaRounds()

Dart Method:
  apiService.getCalcuttaRounds({
    gameId: String
  }) → Future&lt;CalcuttaRoundsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/calcutta/game/$gameId/round/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaRoundsModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-6", "apis", "getCompletedHoles", `
// GET {{baseUrl}}/api/scorecard/game/$gameId/completed/holes
// Controller: add_score_controller.dart → apiService.getCompletedHoles()

Dart Method:
  apiService.getCompletedHoles({
    gameId: int,
    organizationId: String
  }) → Future&lt;CompletedHolesModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/$gameId/completed/holes
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CompletedHolesModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-6", "apis", "getFoursome", `
// GET {{baseUrl}}/api/games/$gameID/foursomes/list
// Controller: add_score_controller.dart → apiService.getFoursome()

Dart Method:
  apiService.getFoursome({
    gameID: String,
    organizationId: String
  }) → Future&lt;CalcuttaFoursomeModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameID/foursomes/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaFoursomeModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-6", "apis", "getMemberList", `
// GET {{baseUrl}}/api/user/member/list
// Controller: add_score_controller.dart → apiService.getMemberList()

Dart Method:
  apiService.getMemberList(()) → Future&lt;ParticipantsListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/user/member/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (ParticipantsListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-6", "apis", "ryderCupGenerateMatch", `
// POST {{baseUrl}}/api/games/rydercup/pick/players
// Controller: add_score_controller.dart → apiService.ryderCupGenerateMatch()

Dart Method:
  apiService.ryderCupGenerateMatch({
    gameId: String,
    List<PickPlayerModel> playerList,
    Map<int,
    String> foursomeTeeTimeMap,
    // ADD THIS
  }) → Future&lt;RydercupGenerateMatch&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/rydercup/pick/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
  }

Response (RydercupGenerateMatch):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-6", "apis", "updateCaptain", `
// POST {{baseUrl}}/api/games/rydercup-set-capitans
// Controller: add_score_controller.dart → apiService.updateCaptain()

Dart Method:
  apiService.updateCaptain({
    gameId: String,
    captainA: String,
    captainB: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/rydercup-set-capitans
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "captain_a": "..."
    "captain_b": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "addLdCtp", `
// POST {{baseUrl}}/api/scorecard/claim/ld-ctp
// Controller: input_score_controller.dart → apiService.addLdCtp()

Dart Method:
  apiService.addLdCtp({
    gameId: String,
    foursomeId: String,
    holeNo: String,
    type: String,
    distance: String,
    playerId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/scorecard/claim/ld-ctp
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "foursome_id": "..."
    "game_id": "..."
    "hole_no": "..."
    "player_id": "..."
    "type": "..."
    "distance": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "addPersonalGameScore", `
// POST {{baseUrl}}/api/personal-game/score/update
// Controller: input_score_controller.dart → apiService.addPersonalGameScore()

Dart Method:
  apiService.addPersonalGameScore({
    gameId: String?,
    holeNo: String?,
    holeScore: String?,
    holePutt: String?,
    holeFairway: String?,
    isHcp: String?,
    isCtp: String?,
    isCtpDistance: String?,
    isLd: String?,
    isLdDistance: String?
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/personal-game/score/update
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "personal_game_id": "..."
    "hole_no": "..."
    "score": "..."
    "is_hcp": "..."
    "putt": "..."
    "fairway": "..."
    "is_ctp": "..."
    "ctp_distance": "..."
    "is_ld": "..."
    "ld_distance": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "autoUpdateScoreCard", `
// POST {{baseUrl}}/api/scorecard/update
// Controller: input_score_controller.dart → apiService.autoUpdateScoreCard()

Dart Method:
  apiService.autoUpdateScoreCard({
    gameId: int,
    holeNumber: int,
    accelerator: bool,
    List<PlayerScorecardModel> playerScorecard,
    List<String> usedPlayerId
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/scorecard/update
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "used_player_id": "..."
    "hole_no": "..."
    "is_accelerator_on": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "getBetDetails", `
// GET {{baseUrl}}/api/scorecard/game/$gameId/hole/$holeNo/foursome/$foursomeId/bet/details
// Controller: input_score_controller.dart → apiService.getBetDetails()

Dart Method:
  apiService.getBetDetails({
    gameId: int,
    holeNo: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;BetDetailsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/$gameId/hole/$holeNo/foursome/$foursomeId/bet/details
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (BetDetailsModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "getFoursomeOverride", `
// GET {{baseUrl}}/api/games/$gameID/foursome/$foursomeId/override
// Controller: input_score_controller.dart → apiService.getFoursomeOverride()

Dart Method:
  apiService.getFoursomeOverride({
    gameID: String,
    foursomeId,
    organizationId: String
  }) → Future&lt;GetFoursomeOverrideModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameID/foursome/$foursomeId/override
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GetFoursomeOverrideModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "getFoursomeTeam", `
// GET {{baseUrl}}/api/result/game/$gameID/foursome/$foursomeId/team/points
// Controller: input_score_controller.dart → apiService.getFoursomeTeam()

Dart Method:
  apiService.getFoursomeTeam({
    gameID: int,
    foursomeId: int
  }) → Future&lt;FoursomeTeamModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameID/foursome/$foursomeId/team/points
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (FoursomeTeamModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "getGameDetails", `
// GET {{baseUrl}}/api/games/$gameId/details
// Controller: input_score_controller.dart → apiService.getGameDetails()

Dart Method:
  apiService.getGameDetails({
    gameId: int,
    organizationId: String?
  }) → Future&lt;GameDetails&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameId/details
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameDetails):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "getHoleData", `
// GET {{baseUrl}}/api/scorecard/game/$gameId/hole/$holeId/list?foursome_id=$fourSomeId
// Controller: input_score_controller.dart → apiService.getHoleData()

Dart Method:
  apiService.getHoleData({
    gameId: int,
    holeId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;HoleDetailsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/$gameId/hole/$holeId/list?foursome_id=$fourSomeId
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (HoleDetailsModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "getJunk", `
// GET {{baseUrl}}/api/games/junk/list
// Controller: input_score_controller.dart → apiService.getJunk()

Dart Method:
  apiService.getJunk(()) → Future&lt;SkodeJunkModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/junk/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (SkodeJunkModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "getPersonalGameHoleData", `
// GET {{baseUrl}}/api/personal-game/$gameId/hole/${int.tryParse(holeNo.toString())?.toString()}/scorecard
// Controller: input_score_controller.dart → apiService.getPersonalGameHoleData()

Dart Method:
  apiService.getPersonalGameHoleData({
    gameId: int,
    holeNo: String
  }) → Future&lt;PersonalGameHoleDataModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/personal-game/$gameId/hole/${int.tryParse(holeNo.toString())?.toString()}/scorecard
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (PersonalGameHoleDataModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "getPersonalGameResult", `
// GET {{baseUrl}}/api/personal-game/$gameId/result
// Controller: input_score_controller.dart → apiService.getPersonalGameResult()

Dart Method:
  apiService.getPersonalGameResult({
    gameId: int
  }) → Future&lt;GameResultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/personal-game/$gameId/result
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameResultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "getResult", `
// GET {{baseUrl}}/api/result/game/$gameId?foursome_id=$foursomeId
// Controller: input_score_controller.dart → apiService.getResult()

Dart Method:
  apiService.getResult({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;GameResultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId?foursome_id=$foursomeId
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameResultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "getSkode", `
// GET {{baseUrl}}/api/games/skode/list
// Controller: input_score_controller.dart → apiService.getSkode()

Dart Method:
  apiService.getSkode(()) → Future&lt;SkodeJunkModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/skode/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (SkodeJunkModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "getSkodeJunkHoleDetails", `
// GET {{baseUrl}}/api/scorecard/game/$gameId/foursome/$foursomeId/bet/details
// Controller: input_score_controller.dart → apiService.getSkodeJunkHoleDetails()

Dart Method:
  apiService.getSkodeJunkHoleDetails({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;SkodejunkHoleModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/$gameId/foursome/$foursomeId/bet/details
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (SkodejunkHoleModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "getWolfConfig", `
// POST {{baseUrl}}/api/games/wolf-hole-config/get
// Controller: input_score_controller.dart → apiService.getWolfConfig()

Dart Method:
  apiService.getWolfConfig({
    gameId: String,
    holeNo: String,
    foursomeId: String
  }) → Future&lt;WolfConfigModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/wolf-hole-config/get
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "hole_no": "..."
    "foursome_id": "..."
  }

Response (WolfConfigModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "junkUpdate", `
// POST {{baseUrl}}/api/scorecard/sidebet/entry
// Controller: input_score_controller.dart → apiService.junkUpdate()

Dart Method:
  apiService.junkUpdate({
    gameId: String,
    holeNo: String,
    playerId: String,
    bet: String,
    betType: String,
    isMade: String,
    organizationId: String,
    isAutoCall: bool,
    isMissed: String?,
    totalMadeCount: String?,
    totalMissedCount: String?,
    calledBy: String?
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/scorecard/sidebet/entry
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "hole_no": "..."
    "player_id": "..."
    "bet": "..."
    "bet_type": "..."
    "is_made": "..."
    "is_missed": "..."
    "total_made_count": "..."
    "total_missed_count": "..."
    "is_auto_call": "..."
    "called_by": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "removeJunkSkode", `
// POST {{baseUrl}}/api/scorecard/sidebet/remove
// Controller: input_score_controller.dart → apiService.removeJunkSkode()

Dart Method:
  apiService.removeJunkSkode({
    gameId: String,
    holeNo: String,
    playerId: String,
    bet: String,
    betType: String,
    totalMadeCount: String?,
    totalMissedCount: String?
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/scorecard/sidebet/remove
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "hole_no": "..."
    "player_id": "..."
    "bet": "..."
    "bet_type": "..."
    "total_made_count": "..."
    "total_missed_count": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "setWolfConfi", `
// POST {{baseUrl}}/api/games/wolf-hole-config
// Controller: input_score_controller.dart → apiService.setWolfConfi()

Dart Method:
  apiService.setWolfConfi({
    gameId: String,
    holeNo: String,
    foursomeId: String,
    isWolf: String,
    wolfPlayerId: String,
    partnerId: String,
    isChallenged: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/wolf-hole-config
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "hole_no": "..."
    "foursome_id": "..."
    "is_wolf": "..."
    "wolf_player_id": "..."
    "partner": "..."
    "is_challenged": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "updateFairwaysByHole", `
// POST {{baseUrl}}/api/scorecard/fairway/update
// Controller: input_score_controller.dart → apiService.updateFairwaysByHole()

Dart Method:
  apiService.updateFairwaysByHole({
    gameId: String,
    holeNo: String,
    fairway: String,
    playerId: String,
    foursomeId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/scorecard/fairway/update
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "hole_no": "..."
    "player_id": "..."
    "fairways": "..."
    "foursome_id": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "updateScoreCard", `
// POST {{baseUrl}}/api/scorecard/update
// Controller: input_score_controller.dart → apiService.updateScoreCard()

Dart Method:
  apiService.updateScoreCard({
    gameId: int,
    holeNumber: int,
    accelerator: bool,
    List<PlayerScorecardModel> playerScorecard,
    List<String> usedPlayerId,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/scorecard/update
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "used_player_id": "..."
    "hole_no": "..."
    "is_accelerator_on": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "addLdCtp", `
// POST {{baseUrl}}/api/scorecard/claim/ld-ctp
// Controller: input_score_controller.dart → apiService.addLdCtp()

Dart Method:
  apiService.addLdCtp({
    gameId: String,
    foursomeId: String,
    holeNo: String,
    type: String,
    distance: String,
    playerId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/scorecard/claim/ld-ctp
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "foursome_id": "..."
    "game_id": "..."
    "hole_no": "..."
    "player_id": "..."
    "type": "..."
    "distance": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "addPersonalGameScore", `
// POST {{baseUrl}}/api/personal-game/score/update
// Controller: input_score_controller.dart → apiService.addPersonalGameScore()

Dart Method:
  apiService.addPersonalGameScore({
    gameId: String?,
    holeNo: String?,
    holeScore: String?,
    holePutt: String?,
    holeFairway: String?,
    isHcp: String?,
    isCtp: String?,
    isCtpDistance: String?,
    isLd: String?,
    isLdDistance: String?
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/personal-game/score/update
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "personal_game_id": "..."
    "hole_no": "..."
    "score": "..."
    "is_hcp": "..."
    "putt": "..."
    "fairway": "..."
    "is_ctp": "..."
    "ctp_distance": "..."
    "is_ld": "..."
    "ld_distance": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "autoUpdateScoreCard", `
// POST {{baseUrl}}/api/scorecard/update
// Controller: input_score_controller.dart → apiService.autoUpdateScoreCard()

Dart Method:
  apiService.autoUpdateScoreCard({
    gameId: int,
    holeNumber: int,
    accelerator: bool,
    List<PlayerScorecardModel> playerScorecard,
    List<String> usedPlayerId
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/scorecard/update
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "used_player_id": "..."
    "hole_no": "..."
    "is_accelerator_on": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "getBetDetails", `
// GET {{baseUrl}}/api/scorecard/game/$gameId/hole/$holeNo/foursome/$foursomeId/bet/details
// Controller: input_score_controller.dart → apiService.getBetDetails()

Dart Method:
  apiService.getBetDetails({
    gameId: int,
    holeNo: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;BetDetailsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/$gameId/hole/$holeNo/foursome/$foursomeId/bet/details
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (BetDetailsModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "getFoursomeOverride", `
// GET {{baseUrl}}/api/games/$gameID/foursome/$foursomeId/override
// Controller: input_score_controller.dart → apiService.getFoursomeOverride()

Dart Method:
  apiService.getFoursomeOverride({
    gameID: String,
    foursomeId,
    organizationId: String
  }) → Future&lt;GetFoursomeOverrideModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameID/foursome/$foursomeId/override
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GetFoursomeOverrideModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "getFoursomeTeam", `
// GET {{baseUrl}}/api/result/game/$gameID/foursome/$foursomeId/team/points
// Controller: input_score_controller.dart → apiService.getFoursomeTeam()

Dart Method:
  apiService.getFoursomeTeam({
    gameID: int,
    foursomeId: int
  }) → Future&lt;FoursomeTeamModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameID/foursome/$foursomeId/team/points
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (FoursomeTeamModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "getGameDetails", `
// GET {{baseUrl}}/api/games/$gameId/details
// Controller: input_score_controller.dart → apiService.getGameDetails()

Dart Method:
  apiService.getGameDetails({
    gameId: int,
    organizationId: String?
  }) → Future&lt;GameDetails&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameId/details
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameDetails):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "getHoleData", `
// GET {{baseUrl}}/api/scorecard/game/$gameId/hole/$holeId/list?foursome_id=$fourSomeId
// Controller: input_score_controller.dart → apiService.getHoleData()

Dart Method:
  apiService.getHoleData({
    gameId: int,
    holeId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;HoleDetailsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/$gameId/hole/$holeId/list?foursome_id=$fourSomeId
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (HoleDetailsModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "getJunk", `
// GET {{baseUrl}}/api/games/junk/list
// Controller: input_score_controller.dart → apiService.getJunk()

Dart Method:
  apiService.getJunk(()) → Future&lt;SkodeJunkModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/junk/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (SkodeJunkModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "getPersonalGameHoleData", `
// GET {{baseUrl}}/api/personal-game/$gameId/hole/${int.tryParse(holeNo.toString())?.toString()}/scorecard
// Controller: input_score_controller.dart → apiService.getPersonalGameHoleData()

Dart Method:
  apiService.getPersonalGameHoleData({
    gameId: int,
    holeNo: String
  }) → Future&lt;PersonalGameHoleDataModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/personal-game/$gameId/hole/${int.tryParse(holeNo.toString())?.toString()}/scorecard
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (PersonalGameHoleDataModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "getPersonalGameResult", `
// GET {{baseUrl}}/api/personal-game/$gameId/result
// Controller: input_score_controller.dart → apiService.getPersonalGameResult()

Dart Method:
  apiService.getPersonalGameResult({
    gameId: int
  }) → Future&lt;GameResultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/personal-game/$gameId/result
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameResultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "getResult", `
// GET {{baseUrl}}/api/result/game/$gameId?foursome_id=$foursomeId
// Controller: input_score_controller.dart → apiService.getResult()

Dart Method:
  apiService.getResult({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;GameResultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId?foursome_id=$foursomeId
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameResultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "getSkode", `
// GET {{baseUrl}}/api/games/skode/list
// Controller: input_score_controller.dart → apiService.getSkode()

Dart Method:
  apiService.getSkode(()) → Future&lt;SkodeJunkModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/skode/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (SkodeJunkModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "getSkodeJunkHoleDetails", `
// GET {{baseUrl}}/api/scorecard/game/$gameId/foursome/$foursomeId/bet/details
// Controller: input_score_controller.dart → apiService.getSkodeJunkHoleDetails()

Dart Method:
  apiService.getSkodeJunkHoleDetails({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;SkodejunkHoleModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/$gameId/foursome/$foursomeId/bet/details
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (SkodejunkHoleModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "getWolfConfig", `
// POST {{baseUrl}}/api/games/wolf-hole-config/get
// Controller: input_score_controller.dart → apiService.getWolfConfig()

Dart Method:
  apiService.getWolfConfig({
    gameId: String,
    holeNo: String,
    foursomeId: String
  }) → Future&lt;WolfConfigModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/wolf-hole-config/get
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "hole_no": "..."
    "foursome_id": "..."
  }

Response (WolfConfigModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "junkUpdate", `
// POST {{baseUrl}}/api/scorecard/sidebet/entry
// Controller: input_score_controller.dart → apiService.junkUpdate()

Dart Method:
  apiService.junkUpdate({
    gameId: String,
    holeNo: String,
    playerId: String,
    bet: String,
    betType: String,
    isMade: String,
    organizationId: String,
    isAutoCall: bool,
    isMissed: String?,
    totalMadeCount: String?,
    totalMissedCount: String?,
    calledBy: String?
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/scorecard/sidebet/entry
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "hole_no": "..."
    "player_id": "..."
    "bet": "..."
    "bet_type": "..."
    "is_made": "..."
    "is_missed": "..."
    "total_made_count": "..."
    "total_missed_count": "..."
    "is_auto_call": "..."
    "called_by": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "removeJunkSkode", `
// POST {{baseUrl}}/api/scorecard/sidebet/remove
// Controller: input_score_controller.dart → apiService.removeJunkSkode()

Dart Method:
  apiService.removeJunkSkode({
    gameId: String,
    holeNo: String,
    playerId: String,
    bet: String,
    betType: String,
    totalMadeCount: String?,
    totalMissedCount: String?
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/scorecard/sidebet/remove
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "hole_no": "..."
    "player_id": "..."
    "bet": "..."
    "bet_type": "..."
    "total_made_count": "..."
    "total_missed_count": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "setWolfConfi", `
// POST {{baseUrl}}/api/games/wolf-hole-config
// Controller: input_score_controller.dart → apiService.setWolfConfi()

Dart Method:
  apiService.setWolfConfi({
    gameId: String,
    holeNo: String,
    foursomeId: String,
    isWolf: String,
    wolfPlayerId: String,
    partnerId: String,
    isChallenged: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/wolf-hole-config
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "hole_no": "..."
    "foursome_id": "..."
    "is_wolf": "..."
    "wolf_player_id": "..."
    "partner": "..."
    "is_challenged": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "updateFairwaysByHole", `
// POST {{baseUrl}}/api/scorecard/fairway/update
// Controller: input_score_controller.dart → apiService.updateFairwaysByHole()

Dart Method:
  apiService.updateFairwaysByHole({
    gameId: String,
    holeNo: String,
    fairway: String,
    playerId: String,
    foursomeId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/scorecard/fairway/update
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "hole_no": "..."
    "player_id": "..."
    "fairways": "..."
    "foursome_id": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "updateScoreCard", `
// POST {{baseUrl}}/api/scorecard/update
// Controller: input_score_controller.dart → apiService.updateScoreCard()

Dart Method:
  apiService.updateScoreCard({
    gameId: int,
    holeNumber: int,
    accelerator: bool,
    List<PlayerScorecardModel> playerScorecard,
    List<String> usedPlayerId,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/scorecard/update
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "used_player_id": "..."
    "hole_no": "..."
    "is_accelerator_on": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-10", "apis", "endFourSome", `
// GET {{baseUrl}}/api/foursome/$foursomeId/game/end
// Controller: add_score_controller.dart → apiService.endFourSome()

Dart Method:
  apiService.endFourSome({
    foursomeId: int,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/foursome/$foursomeId/game/end
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-10", "apis", "getCalcuttaRounds", `
// GET {{baseUrl}}/api/games/calcutta/game/$gameId/round/players
// Controller: add_score_controller.dart → apiService.getCalcuttaRounds()

Dart Method:
  apiService.getCalcuttaRounds({
    gameId: String
  }) → Future&lt;CalcuttaRoundsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/calcutta/game/$gameId/round/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaRoundsModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-10", "apis", "getCompletedHoles", `
// GET {{baseUrl}}/api/scorecard/game/$gameId/completed/holes
// Controller: add_score_controller.dart → apiService.getCompletedHoles()

Dart Method:
  apiService.getCompletedHoles({
    gameId: int,
    organizationId: String
  }) → Future&lt;CompletedHolesModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/$gameId/completed/holes
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CompletedHolesModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-10", "apis", "getFoursome", `
// GET {{baseUrl}}/api/games/$gameID/foursomes/list
// Controller: add_score_controller.dart → apiService.getFoursome()

Dart Method:
  apiService.getFoursome({
    gameID: String,
    organizationId: String
  }) → Future&lt;CalcuttaFoursomeModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameID/foursomes/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaFoursomeModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-10", "apis", "getMemberList", `
// GET {{baseUrl}}/api/user/member/list
// Controller: add_score_controller.dart → apiService.getMemberList()

Dart Method:
  apiService.getMemberList(()) → Future&lt;ParticipantsListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/user/member/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (ParticipantsListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-10", "apis", "ryderCupGenerateMatch", `
// POST {{baseUrl}}/api/games/rydercup/pick/players
// Controller: add_score_controller.dart → apiService.ryderCupGenerateMatch()

Dart Method:
  apiService.ryderCupGenerateMatch({
    gameId: String,
    List<PickPlayerModel> playerList,
    Map<int,
    String> foursomeTeeTimeMap,
    // ADD THIS
  }) → Future&lt;RydercupGenerateMatch&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/rydercup/pick/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
  }

Response (RydercupGenerateMatch):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-10", "apis", "updateCaptain", `
// POST {{baseUrl}}/api/games/rydercup-set-capitans
// Controller: add_score_controller.dart → apiService.updateCaptain()

Dart Method:
  apiService.updateCaptain({
    gameId: String,
    captainA: String,
    captainB: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/rydercup-set-capitans
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "captain_a": "..."
    "captain_b": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-11", "apis", "endFourSome", `
// GET {{baseUrl}}/api/foursome/$foursomeId/game/end
// Controller: add_score_controller.dart → apiService.endFourSome()

Dart Method:
  apiService.endFourSome({
    foursomeId: int,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/foursome/$foursomeId/game/end
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-11", "apis", "getCalcuttaRounds", `
// GET {{baseUrl}}/api/games/calcutta/game/$gameId/round/players
// Controller: add_score_controller.dart → apiService.getCalcuttaRounds()

Dart Method:
  apiService.getCalcuttaRounds({
    gameId: String
  }) → Future&lt;CalcuttaRoundsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/calcutta/game/$gameId/round/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaRoundsModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-11", "apis", "getCompletedHoles", `
// GET {{baseUrl}}/api/scorecard/game/$gameId/completed/holes
// Controller: add_score_controller.dart → apiService.getCompletedHoles()

Dart Method:
  apiService.getCompletedHoles({
    gameId: int,
    organizationId: String
  }) → Future&lt;CompletedHolesModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/$gameId/completed/holes
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CompletedHolesModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-11", "apis", "getFoursome", `
// GET {{baseUrl}}/api/games/$gameID/foursomes/list
// Controller: add_score_controller.dart → apiService.getFoursome()

Dart Method:
  apiService.getFoursome({
    gameID: String,
    organizationId: String
  }) → Future&lt;CalcuttaFoursomeModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameID/foursomes/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaFoursomeModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-11", "apis", "getMemberList", `
// GET {{baseUrl}}/api/user/member/list
// Controller: add_score_controller.dart → apiService.getMemberList()

Dart Method:
  apiService.getMemberList(()) → Future&lt;ParticipantsListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/user/member/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (ParticipantsListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-11", "apis", "ryderCupGenerateMatch", `
// POST {{baseUrl}}/api/games/rydercup/pick/players
// Controller: add_score_controller.dart → apiService.ryderCupGenerateMatch()

Dart Method:
  apiService.ryderCupGenerateMatch({
    gameId: String,
    List<PickPlayerModel> playerList,
    Map<int,
    String> foursomeTeeTimeMap,
    // ADD THIS
  }) → Future&lt;RydercupGenerateMatch&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/rydercup/pick/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
  }

Response (RydercupGenerateMatch):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-11", "apis", "updateCaptain", `
// POST {{baseUrl}}/api/games/rydercup-set-capitans
// Controller: add_score_controller.dart → apiService.updateCaptain()

Dart Method:
  apiService.updateCaptain({
    gameId: String,
    captainA: String,
    captainB: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/rydercup-set-capitans
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "captain_a": "..."
    "captain_b": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);
})();
