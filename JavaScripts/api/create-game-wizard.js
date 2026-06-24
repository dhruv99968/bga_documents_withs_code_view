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
  add("cgslide-9", "apis", "createGame", `
// POST {{baseUrl}}/\${StaticData.apiUrl}api/games/create
// Controller: create_game_controller.dart → apiService.createGame()

Dart Method:
  apiService.createGame({
    gameName: String,
    eventId: String?,
    courseId: num,
    gameType: String,
    playType: String,
    type: String,
    teaTime: String,
    betPerGame: String,
    totalTeams: String,
    skodePoolPrize: String,
    junkPoolPrize: String,
    pointPerHoleWin: String,
    bonusPointPerGameWin: int,
    amountPerPoint: String,
    isUltraVegas: int,
    isModifiedStableFord: int,
    pointPerMatchWin: String,
    pointForUnchallenged: String,
    pointForChallenged: String,
    maxWolfPoints: String,
    List<String> holePerMatch,
    isWithHandicap: String,
    isPlayerRestrict: int,
    List<MatchConfigModel> playerList,
    List<TeesheetGroupData>? groupList,
    List<TeamListItem>? courseTeamList,
    totalPlayers: String,
    logo: Uint8List?,
    logoName: String?,
    teeSheetId: String?,
    calcuttaPlayerId: String?,
    teamHcpPreference: String?,
    hcpPercentage: String?,
    skinPool: String?,
    greeniePool: String?,
    prizingPool: String?,
    teePosition: String?,
    isProshopeEmail: int?,
    isSkinsGame: int?,
    isGreenieGame: int?,
    greenieType: String?,
    isSkinsCarry: int?,
    IsSkinsPaid: int?,
    isPlacedPaid: int?,
    placesPaid: String?,
    List<String>? placesPaidPercentages
  }) → Future&lt;GamCreateModel&gt;

HTTP Request:
  POST {{baseUrl}}/\${StaticData.apiUrl}api/games/create
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_name": "..."
    "event_id": "..."
    "course_id": "..."
    "game_type": "..."
    "tee_time": "..."
    "total_teams": "..."
    "skode_pool_prize": "..."
    "junk_pool_prize": "..."
    "point_per_hole_win": "..."
    "bonus_point_per_game_win": "..."
    "points_per_match_win": "..."
    "teesheet_id": "..."
    "score_edit_policy": "..."
    "is_auto_newt_twofer_enabled": "..."
    "mail_to_proshop": "..."
    "handicap_percentage": "..."
    "prizing_pool": "..."
    "is_skin_game_enabled": "..."
    "is_greenie_game_enabled": "..."
    "skin_pool": "..."
    "greenie_pool": "..."
    "tee_position": "..."
    "is_greenie_game_enabled": "..."
    "skin_pool": "..."
    "greenie_pool": "..."
    "greenie_type": "..."
    "carry_skin": "..."
    "is_places_paid": "..."
    "places_paid": "..."
    "places_paid_percentages": "..."
    "Is_skins_paid": "..."
    "bet_per_game": "..."
    "is_with_handicap": "..."
    "total_players": "..."
    "play_type": "..."
    "player_ids": "..."
    "total_players": "..."
    "play_type": "..."
    "player_ids": "..."
    "is_ultravegas": "..."
    "play_type": "..."
    "play_type": "..."
    "play_type": "..."
    "team_hcp_preference": "..."
    "play_type": "..."
    "amount_per_point": "..."
    "team_hcp_preference": "..."
    "play_type": "..."
    "point_per_hole_win": "..."
    "point_for_challenged": "..."
    "max_wolf_points": "..."
    "play_type": "..."
    "is_modified_stableford": "..."
    "amount_per_point": "..."
    "selected_game_team_id": "..."
    "total_players": "..."
    "play_type": "..."
    "play_type": "..."
    "selected_group_id": "..."
    "selected_group_id": "..."
  }

Response (GamCreateModel):
  {
    "error":   false,
    "message": "..."
  }
`);

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


  add("cgslide-0", "apis", "createGame", `
// POST {{baseUrl}}/\${StaticData.apiUrl}api/games/create
// Controller: create_game_controller.dart → apiService.createGame()

Dart Method:
  apiService.createGame({
    gameName: String,
    eventId: String?,
    courseId: num,
    gameType: String,
    playType: String,
    type: String,
    teaTime: String,
    betPerGame: String,
    totalTeams: String,
    skodePoolPrize: String,
    junkPoolPrize: String,
    pointPerHoleWin: String,
    bonusPointPerGameWin: int,
    amountPerPoint: String,
    isUltraVegas: int,
    isModifiedStableFord: int,
    pointPerMatchWin: String,
    pointForUnchallenged: String,
    pointForChallenged: String,
    maxWolfPoints: String,
    List<String> holePerMatch,
    isWithHandicap: String,
    isPlayerRestrict: int,
    List<MatchConfigModel> playerList,
    List<TeesheetGroupData>? groupList,
    List<TeamListItem>? courseTeamList,
    totalPlayers: String,
    logo: Uint8List?,
    logoName: String?,
    teeSheetId: String?,
    calcuttaPlayerId: String?,
    teamHcpPreference: String?,
    hcpPercentage: String?,
    skinPool: String?,
    greeniePool: String?,
    prizingPool: String?,
    teePosition: String?,
    isProshopeEmail: int?,
    isSkinsGame: int?,
    isGreenieGame: int?,
    greenieType: String?,
    isSkinsCarry: int?,
    IsSkinsPaid: int?,
    isPlacedPaid: int?,
    placesPaid: String?,
    List<String>? placesPaidPercentages
  }) → Future&lt;GamCreateModel&gt;

HTTP Request:
  POST {{baseUrl}}/\${StaticData.apiUrl}api/games/create
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_name": "..."
    "event_id": "..."
    "course_id": "..."
    "game_type": "..."
    "tee_time": "..."
    "total_teams": "..."
    "skode_pool_prize": "..."
    "junk_pool_prize": "..."
    "point_per_hole_win": "..."
    "bonus_point_per_game_win": "..."
    "points_per_match_win": "..."
    "teesheet_id": "..."
    "score_edit_policy": "..."
    "is_auto_newt_twofer_enabled": "..."
    "mail_to_proshop": "..."
    "handicap_percentage": "..."
    "prizing_pool": "..."
    "is_skin_game_enabled": "..."
    "is_greenie_game_enabled": "..."
    "skin_pool": "..."
    "greenie_pool": "..."
    "tee_position": "..."
    "is_greenie_game_enabled": "..."
    "skin_pool": "..."
    "greenie_pool": "..."
    "greenie_type": "..."
    "carry_skin": "..."
    "is_places_paid": "..."
    "places_paid": "..."
    "places_paid_percentages": "..."
    "Is_skins_paid": "..."
    "bet_per_game": "..."
    "is_with_handicap": "..."
    "total_players": "..."
    "play_type": "..."
    "player_ids": "..."
    "total_players": "..."
    "play_type": "..."
    "player_ids": "..."
    "is_ultravegas": "..."
    "play_type": "..."
    "play_type": "..."
    "play_type": "..."
    "team_hcp_preference": "..."
    "play_type": "..."
    "amount_per_point": "..."
    "team_hcp_preference": "..."
    "play_type": "..."
    "point_per_hole_win": "..."
    "point_for_challenged": "..."
    "max_wolf_points": "..."
    "play_type": "..."
    "is_modified_stableford": "..."
    "amount_per_point": "..."
    "selected_game_team_id": "..."
    "total_players": "..."
    "play_type": "..."
    "play_type": "..."
    "selected_group_id": "..."
    "selected_group_id": "..."
  }

Response (GamCreateModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-0", "apis", "getCourseTeesPositions", `
// GET {{baseUrl}}/api/course/\${courseId}/tee/list
// Controller: create_game_controller.dart → apiService.getCourseTeesPositions()

Dart Method:
  apiService.getCourseTeesPositions({
    courseId: String
  }) → Future&lt;TeePositionModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/course/\${courseId}/tee/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (TeePositionModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-0", "apis", "getTeeList", `
// GET {{baseUrl}}/api/v2/teesheet/groups/list
// Controller: create_game_controller.dart → apiService.getTeeList()

Dart Method:
  apiService.getTeeList(()) → Future&lt;NewTeeSheetModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/teesheet/groups/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (NewTeeSheetModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-0", "apis", "minimizeEventList", `
// GET {{baseUrl}}/api/event/list/mini
// Controller: create_game_controller.dart → apiService.minimizeEventList()

Dart Method:
  apiService.minimizeEventList(()) → Future&lt;EventListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/event/list/mini
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (EventListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-0", "apis", "validateGameName", `
// POST {{baseUrl}}/api/games/name/validate
// Controller: create_game_controller.dart → apiService.validateGameName()

Dart Method:
  apiService.validateGameName({
    name: String
  }) → Future&lt;GameNameValidateModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/name/validate
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "name": "..."
  }

Response (GameNameValidateModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-1", "apis", "createGame", `
// POST {{baseUrl}}/\${StaticData.apiUrl}api/games/create
// Controller: create_game_controller.dart → apiService.createGame()

Dart Method:
  apiService.createGame({
    gameName: String,
    eventId: String?,
    courseId: num,
    gameType: String,
    playType: String,
    type: String,
    teaTime: String,
    betPerGame: String,
    totalTeams: String,
    skodePoolPrize: String,
    junkPoolPrize: String,
    pointPerHoleWin: String,
    bonusPointPerGameWin: int,
    amountPerPoint: String,
    isUltraVegas: int,
    isModifiedStableFord: int,
    pointPerMatchWin: String,
    pointForUnchallenged: String,
    pointForChallenged: String,
    maxWolfPoints: String,
    List<String> holePerMatch,
    isWithHandicap: String,
    isPlayerRestrict: int,
    List<MatchConfigModel> playerList,
    List<TeesheetGroupData>? groupList,
    List<TeamListItem>? courseTeamList,
    totalPlayers: String,
    logo: Uint8List?,
    logoName: String?,
    teeSheetId: String?,
    calcuttaPlayerId: String?,
    teamHcpPreference: String?,
    hcpPercentage: String?,
    skinPool: String?,
    greeniePool: String?,
    prizingPool: String?,
    teePosition: String?,
    isProshopeEmail: int?,
    isSkinsGame: int?,
    isGreenieGame: int?,
    greenieType: String?,
    isSkinsCarry: int?,
    IsSkinsPaid: int?,
    isPlacedPaid: int?,
    placesPaid: String?,
    List<String>? placesPaidPercentages
  }) → Future&lt;GamCreateModel&gt;

HTTP Request:
  POST {{baseUrl}}/\${StaticData.apiUrl}api/games/create
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_name": "..."
    "event_id": "..."
    "course_id": "..."
    "game_type": "..."
    "tee_time": "..."
    "total_teams": "..."
    "skode_pool_prize": "..."
    "junk_pool_prize": "..."
    "point_per_hole_win": "..."
    "bonus_point_per_game_win": "..."
    "points_per_match_win": "..."
    "teesheet_id": "..."
    "score_edit_policy": "..."
    "is_auto_newt_twofer_enabled": "..."
    "mail_to_proshop": "..."
    "handicap_percentage": "..."
    "prizing_pool": "..."
    "is_skin_game_enabled": "..."
    "is_greenie_game_enabled": "..."
    "skin_pool": "..."
    "greenie_pool": "..."
    "tee_position": "..."
    "is_greenie_game_enabled": "..."
    "skin_pool": "..."
    "greenie_pool": "..."
    "greenie_type": "..."
    "carry_skin": "..."
    "is_places_paid": "..."
    "places_paid": "..."
    "places_paid_percentages": "..."
    "Is_skins_paid": "..."
    "bet_per_game": "..."
    "is_with_handicap": "..."
    "total_players": "..."
    "play_type": "..."
    "player_ids": "..."
    "total_players": "..."
    "play_type": "..."
    "player_ids": "..."
    "is_ultravegas": "..."
    "play_type": "..."
    "play_type": "..."
    "play_type": "..."
    "team_hcp_preference": "..."
    "play_type": "..."
    "amount_per_point": "..."
    "team_hcp_preference": "..."
    "play_type": "..."
    "point_per_hole_win": "..."
    "point_for_challenged": "..."
    "max_wolf_points": "..."
    "play_type": "..."
    "is_modified_stableford": "..."
    "amount_per_point": "..."
    "selected_game_team_id": "..."
    "total_players": "..."
    "play_type": "..."
    "play_type": "..."
    "selected_group_id": "..."
    "selected_group_id": "..."
  }

Response (GamCreateModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-1", "apis", "getCourseTeesPositions", `
// GET {{baseUrl}}/api/course/\${courseId}/tee/list
// Controller: create_game_controller.dart → apiService.getCourseTeesPositions()

Dart Method:
  apiService.getCourseTeesPositions({
    courseId: String
  }) → Future&lt;TeePositionModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/course/\${courseId}/tee/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (TeePositionModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-1", "apis", "getTeeList", `
// GET {{baseUrl}}/api/v2/teesheet/groups/list
// Controller: create_game_controller.dart → apiService.getTeeList()

Dart Method:
  apiService.getTeeList(()) → Future&lt;NewTeeSheetModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/teesheet/groups/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (NewTeeSheetModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-1", "apis", "minimizeEventList", `
// GET {{baseUrl}}/api/event/list/mini
// Controller: create_game_controller.dart → apiService.minimizeEventList()

Dart Method:
  apiService.minimizeEventList(()) → Future&lt;EventListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/event/list/mini
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (EventListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-1", "apis", "validateGameName", `
// POST {{baseUrl}}/api/games/name/validate
// Controller: create_game_controller.dart → apiService.validateGameName()

Dart Method:
  apiService.validateGameName({
    name: String
  }) → Future&lt;GameNameValidateModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/name/validate
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "name": "..."
  }

Response (GameNameValidateModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-2", "apis", "createGame", `
// POST {{baseUrl}}/\${StaticData.apiUrl}api/games/create
// Controller: create_game_controller.dart → apiService.createGame()

Dart Method:
  apiService.createGame({
    gameName: String,
    eventId: String?,
    courseId: num,
    gameType: String,
    playType: String,
    type: String,
    teaTime: String,
    betPerGame: String,
    totalTeams: String,
    skodePoolPrize: String,
    junkPoolPrize: String,
    pointPerHoleWin: String,
    bonusPointPerGameWin: int,
    amountPerPoint: String,
    isUltraVegas: int,
    isModifiedStableFord: int,
    pointPerMatchWin: String,
    pointForUnchallenged: String,
    pointForChallenged: String,
    maxWolfPoints: String,
    List<String> holePerMatch,
    isWithHandicap: String,
    isPlayerRestrict: int,
    List<MatchConfigModel> playerList,
    List<TeesheetGroupData>? groupList,
    List<TeamListItem>? courseTeamList,
    totalPlayers: String,
    logo: Uint8List?,
    logoName: String?,
    teeSheetId: String?,
    calcuttaPlayerId: String?,
    teamHcpPreference: String?,
    hcpPercentage: String?,
    skinPool: String?,
    greeniePool: String?,
    prizingPool: String?,
    teePosition: String?,
    isProshopeEmail: int?,
    isSkinsGame: int?,
    isGreenieGame: int?,
    greenieType: String?,
    isSkinsCarry: int?,
    IsSkinsPaid: int?,
    isPlacedPaid: int?,
    placesPaid: String?,
    List<String>? placesPaidPercentages
  }) → Future&lt;GamCreateModel&gt;

HTTP Request:
  POST {{baseUrl}}/\${StaticData.apiUrl}api/games/create
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_name": "..."
    "event_id": "..."
    "course_id": "..."
    "game_type": "..."
    "tee_time": "..."
    "total_teams": "..."
    "skode_pool_prize": "..."
    "junk_pool_prize": "..."
    "point_per_hole_win": "..."
    "bonus_point_per_game_win": "..."
    "points_per_match_win": "..."
    "teesheet_id": "..."
    "score_edit_policy": "..."
    "is_auto_newt_twofer_enabled": "..."
    "mail_to_proshop": "..."
    "handicap_percentage": "..."
    "prizing_pool": "..."
    "is_skin_game_enabled": "..."
    "is_greenie_game_enabled": "..."
    "skin_pool": "..."
    "greenie_pool": "..."
    "tee_position": "..."
    "is_greenie_game_enabled": "..."
    "skin_pool": "..."
    "greenie_pool": "..."
    "greenie_type": "..."
    "carry_skin": "..."
    "is_places_paid": "..."
    "places_paid": "..."
    "places_paid_percentages": "..."
    "Is_skins_paid": "..."
    "bet_per_game": "..."
    "is_with_handicap": "..."
    "total_players": "..."
    "play_type": "..."
    "player_ids": "..."
    "total_players": "..."
    "play_type": "..."
    "player_ids": "..."
    "is_ultravegas": "..."
    "play_type": "..."
    "play_type": "..."
    "play_type": "..."
    "team_hcp_preference": "..."
    "play_type": "..."
    "amount_per_point": "..."
    "team_hcp_preference": "..."
    "play_type": "..."
    "point_per_hole_win": "..."
    "point_for_challenged": "..."
    "max_wolf_points": "..."
    "play_type": "..."
    "is_modified_stableford": "..."
    "amount_per_point": "..."
    "selected_game_team_id": "..."
    "total_players": "..."
    "play_type": "..."
    "play_type": "..."
    "selected_group_id": "..."
    "selected_group_id": "..."
  }

Response (GamCreateModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-2", "apis", "getCourseTeesPositions", `
// GET {{baseUrl}}/api/course/\${courseId}/tee/list
// Controller: create_game_controller.dart → apiService.getCourseTeesPositions()

Dart Method:
  apiService.getCourseTeesPositions({
    courseId: String
  }) → Future&lt;TeePositionModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/course/\${courseId}/tee/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (TeePositionModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-2", "apis", "getTeeList", `
// GET {{baseUrl}}/api/v2/teesheet/groups/list
// Controller: create_game_controller.dart → apiService.getTeeList()

Dart Method:
  apiService.getTeeList(()) → Future&lt;NewTeeSheetModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/teesheet/groups/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (NewTeeSheetModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-2", "apis", "minimizeEventList", `
// GET {{baseUrl}}/api/event/list/mini
// Controller: create_game_controller.dart → apiService.minimizeEventList()

Dart Method:
  apiService.minimizeEventList(()) → Future&lt;EventListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/event/list/mini
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (EventListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-2", "apis", "validateGameName", `
// POST {{baseUrl}}/api/games/name/validate
// Controller: create_game_controller.dart → apiService.validateGameName()

Dart Method:
  apiService.validateGameName({
    name: String
  }) → Future&lt;GameNameValidateModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/name/validate
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "name": "..."
  }

Response (GameNameValidateModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-3", "apis", "createGame", `
// POST {{baseUrl}}/\${StaticData.apiUrl}api/games/create
// Controller: create_game_controller.dart → apiService.createGame()

Dart Method:
  apiService.createGame({
    gameName: String,
    eventId: String?,
    courseId: num,
    gameType: String,
    playType: String,
    type: String,
    teaTime: String,
    betPerGame: String,
    totalTeams: String,
    skodePoolPrize: String,
    junkPoolPrize: String,
    pointPerHoleWin: String,
    bonusPointPerGameWin: int,
    amountPerPoint: String,
    isUltraVegas: int,
    isModifiedStableFord: int,
    pointPerMatchWin: String,
    pointForUnchallenged: String,
    pointForChallenged: String,
    maxWolfPoints: String,
    List<String> holePerMatch,
    isWithHandicap: String,
    isPlayerRestrict: int,
    List<MatchConfigModel> playerList,
    List<TeesheetGroupData>? groupList,
    List<TeamListItem>? courseTeamList,
    totalPlayers: String,
    logo: Uint8List?,
    logoName: String?,
    teeSheetId: String?,
    calcuttaPlayerId: String?,
    teamHcpPreference: String?,
    hcpPercentage: String?,
    skinPool: String?,
    greeniePool: String?,
    prizingPool: String?,
    teePosition: String?,
    isProshopeEmail: int?,
    isSkinsGame: int?,
    isGreenieGame: int?,
    greenieType: String?,
    isSkinsCarry: int?,
    IsSkinsPaid: int?,
    isPlacedPaid: int?,
    placesPaid: String?,
    List<String>? placesPaidPercentages
  }) → Future&lt;GamCreateModel&gt;

HTTP Request:
  POST {{baseUrl}}/\${StaticData.apiUrl}api/games/create
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_name": "..."
    "event_id": "..."
    "course_id": "..."
    "game_type": "..."
    "tee_time": "..."
    "total_teams": "..."
    "skode_pool_prize": "..."
    "junk_pool_prize": "..."
    "point_per_hole_win": "..."
    "bonus_point_per_game_win": "..."
    "points_per_match_win": "..."
    "teesheet_id": "..."
    "score_edit_policy": "..."
    "is_auto_newt_twofer_enabled": "..."
    "mail_to_proshop": "..."
    "handicap_percentage": "..."
    "prizing_pool": "..."
    "is_skin_game_enabled": "..."
    "is_greenie_game_enabled": "..."
    "skin_pool": "..."
    "greenie_pool": "..."
    "tee_position": "..."
    "is_greenie_game_enabled": "..."
    "skin_pool": "..."
    "greenie_pool": "..."
    "greenie_type": "..."
    "carry_skin": "..."
    "is_places_paid": "..."
    "places_paid": "..."
    "places_paid_percentages": "..."
    "Is_skins_paid": "..."
    "bet_per_game": "..."
    "is_with_handicap": "..."
    "total_players": "..."
    "play_type": "..."
    "player_ids": "..."
    "total_players": "..."
    "play_type": "..."
    "player_ids": "..."
    "is_ultravegas": "..."
    "play_type": "..."
    "play_type": "..."
    "play_type": "..."
    "team_hcp_preference": "..."
    "play_type": "..."
    "amount_per_point": "..."
    "team_hcp_preference": "..."
    "play_type": "..."
    "point_per_hole_win": "..."
    "point_for_challenged": "..."
    "max_wolf_points": "..."
    "play_type": "..."
    "is_modified_stableford": "..."
    "amount_per_point": "..."
    "selected_game_team_id": "..."
    "total_players": "..."
    "play_type": "..."
    "play_type": "..."
    "selected_group_id": "..."
    "selected_group_id": "..."
  }

Response (GamCreateModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-3", "apis", "getCourseTeesPositions", `
// GET {{baseUrl}}/api/course/\${courseId}/tee/list
// Controller: create_game_controller.dart → apiService.getCourseTeesPositions()

Dart Method:
  apiService.getCourseTeesPositions({
    courseId: String
  }) → Future&lt;TeePositionModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/course/\${courseId}/tee/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (TeePositionModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-3", "apis", "getTeeList", `
// GET {{baseUrl}}/api/v2/teesheet/groups/list
// Controller: create_game_controller.dart → apiService.getTeeList()

Dart Method:
  apiService.getTeeList(()) → Future&lt;NewTeeSheetModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/teesheet/groups/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (NewTeeSheetModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-3", "apis", "minimizeEventList", `
// GET {{baseUrl}}/api/event/list/mini
// Controller: create_game_controller.dart → apiService.minimizeEventList()

Dart Method:
  apiService.minimizeEventList(()) → Future&lt;EventListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/event/list/mini
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (EventListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-3", "apis", "validateGameName", `
// POST {{baseUrl}}/api/games/name/validate
// Controller: create_game_controller.dart → apiService.validateGameName()

Dart Method:
  apiService.validateGameName({
    name: String
  }) → Future&lt;GameNameValidateModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/name/validate
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "name": "..."
  }

Response (GameNameValidateModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-4", "apis", "createGame", `
// POST {{baseUrl}}/\${StaticData.apiUrl}api/games/create
// Controller: create_game_controller.dart → apiService.createGame()

Dart Method:
  apiService.createGame({
    gameName: String,
    eventId: String?,
    courseId: num,
    gameType: String,
    playType: String,
    type: String,
    teaTime: String,
    betPerGame: String,
    totalTeams: String,
    skodePoolPrize: String,
    junkPoolPrize: String,
    pointPerHoleWin: String,
    bonusPointPerGameWin: int,
    amountPerPoint: String,
    isUltraVegas: int,
    isModifiedStableFord: int,
    pointPerMatchWin: String,
    pointForUnchallenged: String,
    pointForChallenged: String,
    maxWolfPoints: String,
    List<String> holePerMatch,
    isWithHandicap: String,
    isPlayerRestrict: int,
    List<MatchConfigModel> playerList,
    List<TeesheetGroupData>? groupList,
    List<TeamListItem>? courseTeamList,
    totalPlayers: String,
    logo: Uint8List?,
    logoName: String?,
    teeSheetId: String?,
    calcuttaPlayerId: String?,
    teamHcpPreference: String?,
    hcpPercentage: String?,
    skinPool: String?,
    greeniePool: String?,
    prizingPool: String?,
    teePosition: String?,
    isProshopeEmail: int?,
    isSkinsGame: int?,
    isGreenieGame: int?,
    greenieType: String?,
    isSkinsCarry: int?,
    IsSkinsPaid: int?,
    isPlacedPaid: int?,
    placesPaid: String?,
    List<String>? placesPaidPercentages
  }) → Future&lt;GamCreateModel&gt;

HTTP Request:
  POST {{baseUrl}}/\${StaticData.apiUrl}api/games/create
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_name": "..."
    "event_id": "..."
    "course_id": "..."
    "game_type": "..."
    "tee_time": "..."
    "total_teams": "..."
    "skode_pool_prize": "..."
    "junk_pool_prize": "..."
    "point_per_hole_win": "..."
    "bonus_point_per_game_win": "..."
    "points_per_match_win": "..."
    "teesheet_id": "..."
    "score_edit_policy": "..."
    "is_auto_newt_twofer_enabled": "..."
    "mail_to_proshop": "..."
    "handicap_percentage": "..."
    "prizing_pool": "..."
    "is_skin_game_enabled": "..."
    "is_greenie_game_enabled": "..."
    "skin_pool": "..."
    "greenie_pool": "..."
    "tee_position": "..."
    "is_greenie_game_enabled": "..."
    "skin_pool": "..."
    "greenie_pool": "..."
    "greenie_type": "..."
    "carry_skin": "..."
    "is_places_paid": "..."
    "places_paid": "..."
    "places_paid_percentages": "..."
    "Is_skins_paid": "..."
    "bet_per_game": "..."
    "is_with_handicap": "..."
    "total_players": "..."
    "play_type": "..."
    "player_ids": "..."
    "total_players": "..."
    "play_type": "..."
    "player_ids": "..."
    "is_ultravegas": "..."
    "play_type": "..."
    "play_type": "..."
    "play_type": "..."
    "team_hcp_preference": "..."
    "play_type": "..."
    "amount_per_point": "..."
    "team_hcp_preference": "..."
    "play_type": "..."
    "point_per_hole_win": "..."
    "point_for_challenged": "..."
    "max_wolf_points": "..."
    "play_type": "..."
    "is_modified_stableford": "..."
    "amount_per_point": "..."
    "selected_game_team_id": "..."
    "total_players": "..."
    "play_type": "..."
    "play_type": "..."
    "selected_group_id": "..."
    "selected_group_id": "..."
  }

Response (GamCreateModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-4", "apis", "getCourseTeesPositions", `
// GET {{baseUrl}}/api/course/\${courseId}/tee/list
// Controller: create_game_controller.dart → apiService.getCourseTeesPositions()

Dart Method:
  apiService.getCourseTeesPositions({
    courseId: String
  }) → Future&lt;TeePositionModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/course/\${courseId}/tee/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (TeePositionModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-4", "apis", "getTeeList", `
// GET {{baseUrl}}/api/v2/teesheet/groups/list
// Controller: create_game_controller.dart → apiService.getTeeList()

Dart Method:
  apiService.getTeeList(()) → Future&lt;NewTeeSheetModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/teesheet/groups/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (NewTeeSheetModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-4", "apis", "minimizeEventList", `
// GET {{baseUrl}}/api/event/list/mini
// Controller: create_game_controller.dart → apiService.minimizeEventList()

Dart Method:
  apiService.minimizeEventList(()) → Future&lt;EventListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/event/list/mini
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (EventListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-4", "apis", "validateGameName", `
// POST {{baseUrl}}/api/games/name/validate
// Controller: create_game_controller.dart → apiService.validateGameName()

Dart Method:
  apiService.validateGameName({
    name: String
  }) → Future&lt;GameNameValidateModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/name/validate
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "name": "..."
  }

Response (GameNameValidateModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-5", "apis", "createGame", `
// POST {{baseUrl}}/\${StaticData.apiUrl}api/games/create
// Controller: create_game_controller.dart → apiService.createGame()

Dart Method:
  apiService.createGame({
    gameName: String,
    eventId: String?,
    courseId: num,
    gameType: String,
    playType: String,
    type: String,
    teaTime: String,
    betPerGame: String,
    totalTeams: String,
    skodePoolPrize: String,
    junkPoolPrize: String,
    pointPerHoleWin: String,
    bonusPointPerGameWin: int,
    amountPerPoint: String,
    isUltraVegas: int,
    isModifiedStableFord: int,
    pointPerMatchWin: String,
    pointForUnchallenged: String,
    pointForChallenged: String,
    maxWolfPoints: String,
    List<String> holePerMatch,
    isWithHandicap: String,
    isPlayerRestrict: int,
    List<MatchConfigModel> playerList,
    List<TeesheetGroupData>? groupList,
    List<TeamListItem>? courseTeamList,
    totalPlayers: String,
    logo: Uint8List?,
    logoName: String?,
    teeSheetId: String?,
    calcuttaPlayerId: String?,
    teamHcpPreference: String?,
    hcpPercentage: String?,
    skinPool: String?,
    greeniePool: String?,
    prizingPool: String?,
    teePosition: String?,
    isProshopeEmail: int?,
    isSkinsGame: int?,
    isGreenieGame: int?,
    greenieType: String?,
    isSkinsCarry: int?,
    IsSkinsPaid: int?,
    isPlacedPaid: int?,
    placesPaid: String?,
    List<String>? placesPaidPercentages
  }) → Future&lt;GamCreateModel&gt;

HTTP Request:
  POST {{baseUrl}}/\${StaticData.apiUrl}api/games/create
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_name": "..."
    "event_id": "..."
    "course_id": "..."
    "game_type": "..."
    "tee_time": "..."
    "total_teams": "..."
    "skode_pool_prize": "..."
    "junk_pool_prize": "..."
    "point_per_hole_win": "..."
    "bonus_point_per_game_win": "..."
    "points_per_match_win": "..."
    "teesheet_id": "..."
    "score_edit_policy": "..."
    "is_auto_newt_twofer_enabled": "..."
    "mail_to_proshop": "..."
    "handicap_percentage": "..."
    "prizing_pool": "..."
    "is_skin_game_enabled": "..."
    "is_greenie_game_enabled": "..."
    "skin_pool": "..."
    "greenie_pool": "..."
    "tee_position": "..."
    "is_greenie_game_enabled": "..."
    "skin_pool": "..."
    "greenie_pool": "..."
    "greenie_type": "..."
    "carry_skin": "..."
    "is_places_paid": "..."
    "places_paid": "..."
    "places_paid_percentages": "..."
    "Is_skins_paid": "..."
    "bet_per_game": "..."
    "is_with_handicap": "..."
    "total_players": "..."
    "play_type": "..."
    "player_ids": "..."
    "total_players": "..."
    "play_type": "..."
    "player_ids": "..."
    "is_ultravegas": "..."
    "play_type": "..."
    "play_type": "..."
    "play_type": "..."
    "team_hcp_preference": "..."
    "play_type": "..."
    "amount_per_point": "..."
    "team_hcp_preference": "..."
    "play_type": "..."
    "point_per_hole_win": "..."
    "point_for_challenged": "..."
    "max_wolf_points": "..."
    "play_type": "..."
    "is_modified_stableford": "..."
    "amount_per_point": "..."
    "selected_game_team_id": "..."
    "total_players": "..."
    "play_type": "..."
    "play_type": "..."
    "selected_group_id": "..."
    "selected_group_id": "..."
  }

Response (GamCreateModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-5", "apis", "getCourseTeesPositions", `
// GET {{baseUrl}}/api/course/\${courseId}/tee/list
// Controller: create_game_controller.dart → apiService.getCourseTeesPositions()

Dart Method:
  apiService.getCourseTeesPositions({
    courseId: String
  }) → Future&lt;TeePositionModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/course/\${courseId}/tee/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (TeePositionModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-5", "apis", "getTeeList", `
// GET {{baseUrl}}/api/v2/teesheet/groups/list
// Controller: create_game_controller.dart → apiService.getTeeList()

Dart Method:
  apiService.getTeeList(()) → Future&lt;NewTeeSheetModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/teesheet/groups/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (NewTeeSheetModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-5", "apis", "minimizeEventList", `
// GET {{baseUrl}}/api/event/list/mini
// Controller: create_game_controller.dart → apiService.minimizeEventList()

Dart Method:
  apiService.minimizeEventList(()) → Future&lt;EventListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/event/list/mini
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (EventListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-5", "apis", "validateGameName", `
// POST {{baseUrl}}/api/games/name/validate
// Controller: create_game_controller.dart → apiService.validateGameName()

Dart Method:
  apiService.validateGameName({
    name: String
  }) → Future&lt;GameNameValidateModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/name/validate
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "name": "..."
  }

Response (GameNameValidateModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-6", "apis", "createGame", `
// POST {{baseUrl}}/\${StaticData.apiUrl}api/games/create
// Controller: create_game_controller.dart → apiService.createGame()

Dart Method:
  apiService.createGame({
    gameName: String,
    eventId: String?,
    courseId: num,
    gameType: String,
    playType: String,
    type: String,
    teaTime: String,
    betPerGame: String,
    totalTeams: String,
    skodePoolPrize: String,
    junkPoolPrize: String,
    pointPerHoleWin: String,
    bonusPointPerGameWin: int,
    amountPerPoint: String,
    isUltraVegas: int,
    isModifiedStableFord: int,
    pointPerMatchWin: String,
    pointForUnchallenged: String,
    pointForChallenged: String,
    maxWolfPoints: String,
    List<String> holePerMatch,
    isWithHandicap: String,
    isPlayerRestrict: int,
    List<MatchConfigModel> playerList,
    List<TeesheetGroupData>? groupList,
    List<TeamListItem>? courseTeamList,
    totalPlayers: String,
    logo: Uint8List?,
    logoName: String?,
    teeSheetId: String?,
    calcuttaPlayerId: String?,
    teamHcpPreference: String?,
    hcpPercentage: String?,
    skinPool: String?,
    greeniePool: String?,
    prizingPool: String?,
    teePosition: String?,
    isProshopeEmail: int?,
    isSkinsGame: int?,
    isGreenieGame: int?,
    greenieType: String?,
    isSkinsCarry: int?,
    IsSkinsPaid: int?,
    isPlacedPaid: int?,
    placesPaid: String?,
    List<String>? placesPaidPercentages
  }) → Future&lt;GamCreateModel&gt;

HTTP Request:
  POST {{baseUrl}}/\${StaticData.apiUrl}api/games/create
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_name": "..."
    "event_id": "..."
    "course_id": "..."
    "game_type": "..."
    "tee_time": "..."
    "total_teams": "..."
    "skode_pool_prize": "..."
    "junk_pool_prize": "..."
    "point_per_hole_win": "..."
    "bonus_point_per_game_win": "..."
    "points_per_match_win": "..."
    "teesheet_id": "..."
    "score_edit_policy": "..."
    "is_auto_newt_twofer_enabled": "..."
    "mail_to_proshop": "..."
    "handicap_percentage": "..."
    "prizing_pool": "..."
    "is_skin_game_enabled": "..."
    "is_greenie_game_enabled": "..."
    "skin_pool": "..."
    "greenie_pool": "..."
    "tee_position": "..."
    "is_greenie_game_enabled": "..."
    "skin_pool": "..."
    "greenie_pool": "..."
    "greenie_type": "..."
    "carry_skin": "..."
    "is_places_paid": "..."
    "places_paid": "..."
    "places_paid_percentages": "..."
    "Is_skins_paid": "..."
    "bet_per_game": "..."
    "is_with_handicap": "..."
    "total_players": "..."
    "play_type": "..."
    "player_ids": "..."
    "total_players": "..."
    "play_type": "..."
    "player_ids": "..."
    "is_ultravegas": "..."
    "play_type": "..."
    "play_type": "..."
    "play_type": "..."
    "team_hcp_preference": "..."
    "play_type": "..."
    "amount_per_point": "..."
    "team_hcp_preference": "..."
    "play_type": "..."
    "point_per_hole_win": "..."
    "point_for_challenged": "..."
    "max_wolf_points": "..."
    "play_type": "..."
    "is_modified_stableford": "..."
    "amount_per_point": "..."
    "selected_game_team_id": "..."
    "total_players": "..."
    "play_type": "..."
    "play_type": "..."
    "selected_group_id": "..."
    "selected_group_id": "..."
  }

Response (GamCreateModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-6", "apis", "getCourseTeesPositions", `
// GET {{baseUrl}}/api/course/\${courseId}/tee/list
// Controller: create_game_controller.dart → apiService.getCourseTeesPositions()

Dart Method:
  apiService.getCourseTeesPositions({
    courseId: String
  }) → Future&lt;TeePositionModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/course/\${courseId}/tee/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (TeePositionModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-6", "apis", "getTeeList", `
// GET {{baseUrl}}/api/v2/teesheet/groups/list
// Controller: create_game_controller.dart → apiService.getTeeList()

Dart Method:
  apiService.getTeeList(()) → Future&lt;NewTeeSheetModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/teesheet/groups/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (NewTeeSheetModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-6", "apis", "minimizeEventList", `
// GET {{baseUrl}}/api/event/list/mini
// Controller: create_game_controller.dart → apiService.minimizeEventList()

Dart Method:
  apiService.minimizeEventList(()) → Future&lt;EventListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/event/list/mini
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (EventListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-6", "apis", "validateGameName", `
// POST {{baseUrl}}/api/games/name/validate
// Controller: create_game_controller.dart → apiService.validateGameName()

Dart Method:
  apiService.validateGameName({
    name: String
  }) → Future&lt;GameNameValidateModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/name/validate
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "name": "..."
  }

Response (GameNameValidateModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-7", "apis", "createGame", `
// POST {{baseUrl}}/\${StaticData.apiUrl}api/games/create
// Controller: create_game_controller.dart → apiService.createGame()

Dart Method:
  apiService.createGame({
    gameName: String,
    eventId: String?,
    courseId: num,
    gameType: String,
    playType: String,
    type: String,
    teaTime: String,
    betPerGame: String,
    totalTeams: String,
    skodePoolPrize: String,
    junkPoolPrize: String,
    pointPerHoleWin: String,
    bonusPointPerGameWin: int,
    amountPerPoint: String,
    isUltraVegas: int,
    isModifiedStableFord: int,
    pointPerMatchWin: String,
    pointForUnchallenged: String,
    pointForChallenged: String,
    maxWolfPoints: String,
    List<String> holePerMatch,
    isWithHandicap: String,
    isPlayerRestrict: int,
    List<MatchConfigModel> playerList,
    List<TeesheetGroupData>? groupList,
    List<TeamListItem>? courseTeamList,
    totalPlayers: String,
    logo: Uint8List?,
    logoName: String?,
    teeSheetId: String?,
    calcuttaPlayerId: String?,
    teamHcpPreference: String?,
    hcpPercentage: String?,
    skinPool: String?,
    greeniePool: String?,
    prizingPool: String?,
    teePosition: String?,
    isProshopeEmail: int?,
    isSkinsGame: int?,
    isGreenieGame: int?,
    greenieType: String?,
    isSkinsCarry: int?,
    IsSkinsPaid: int?,
    isPlacedPaid: int?,
    placesPaid: String?,
    List<String>? placesPaidPercentages
  }) → Future&lt;GamCreateModel&gt;

HTTP Request:
  POST {{baseUrl}}/\${StaticData.apiUrl}api/games/create
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_name": "..."
    "event_id": "..."
    "course_id": "..."
    "game_type": "..."
    "tee_time": "..."
    "total_teams": "..."
    "skode_pool_prize": "..."
    "junk_pool_prize": "..."
    "point_per_hole_win": "..."
    "bonus_point_per_game_win": "..."
    "points_per_match_win": "..."
    "teesheet_id": "..."
    "score_edit_policy": "..."
    "is_auto_newt_twofer_enabled": "..."
    "mail_to_proshop": "..."
    "handicap_percentage": "..."
    "prizing_pool": "..."
    "is_skin_game_enabled": "..."
    "is_greenie_game_enabled": "..."
    "skin_pool": "..."
    "greenie_pool": "..."
    "tee_position": "..."
    "is_greenie_game_enabled": "..."
    "skin_pool": "..."
    "greenie_pool": "..."
    "greenie_type": "..."
    "carry_skin": "..."
    "is_places_paid": "..."
    "places_paid": "..."
    "places_paid_percentages": "..."
    "Is_skins_paid": "..."
    "bet_per_game": "..."
    "is_with_handicap": "..."
    "total_players": "..."
    "play_type": "..."
    "player_ids": "..."
    "total_players": "..."
    "play_type": "..."
    "player_ids": "..."
    "is_ultravegas": "..."
    "play_type": "..."
    "play_type": "..."
    "play_type": "..."
    "team_hcp_preference": "..."
    "play_type": "..."
    "amount_per_point": "..."
    "team_hcp_preference": "..."
    "play_type": "..."
    "point_per_hole_win": "..."
    "point_for_challenged": "..."
    "max_wolf_points": "..."
    "play_type": "..."
    "is_modified_stableford": "..."
    "amount_per_point": "..."
    "selected_game_team_id": "..."
    "total_players": "..."
    "play_type": "..."
    "play_type": "..."
    "selected_group_id": "..."
    "selected_group_id": "..."
  }

Response (GamCreateModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-7", "apis", "getCourseTeesPositions", `
// GET {{baseUrl}}/api/course/\${courseId}/tee/list
// Controller: create_game_controller.dart → apiService.getCourseTeesPositions()

Dart Method:
  apiService.getCourseTeesPositions({
    courseId: String
  }) → Future&lt;TeePositionModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/course/\${courseId}/tee/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (TeePositionModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-7", "apis", "getTeeList", `
// GET {{baseUrl}}/api/v2/teesheet/groups/list
// Controller: create_game_controller.dart → apiService.getTeeList()

Dart Method:
  apiService.getTeeList(()) → Future&lt;NewTeeSheetModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/teesheet/groups/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (NewTeeSheetModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-7", "apis", "minimizeEventList", `
// GET {{baseUrl}}/api/event/list/mini
// Controller: create_game_controller.dart → apiService.minimizeEventList()

Dart Method:
  apiService.minimizeEventList(()) → Future&lt;EventListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/event/list/mini
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (EventListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-7", "apis", "validateGameName", `
// POST {{baseUrl}}/api/games/name/validate
// Controller: create_game_controller.dart → apiService.validateGameName()

Dart Method:
  apiService.validateGameName({
    name: String
  }) → Future&lt;GameNameValidateModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/name/validate
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "name": "..."
  }

Response (GameNameValidateModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-8", "apis", "createGame", `
// POST {{baseUrl}}/\${StaticData.apiUrl}api/games/create
// Controller: create_game_controller.dart → apiService.createGame()

Dart Method:
  apiService.createGame({
    gameName: String,
    eventId: String?,
    courseId: num,
    gameType: String,
    playType: String,
    type: String,
    teaTime: String,
    betPerGame: String,
    totalTeams: String,
    skodePoolPrize: String,
    junkPoolPrize: String,
    pointPerHoleWin: String,
    bonusPointPerGameWin: int,
    amountPerPoint: String,
    isUltraVegas: int,
    isModifiedStableFord: int,
    pointPerMatchWin: String,
    pointForUnchallenged: String,
    pointForChallenged: String,
    maxWolfPoints: String,
    List<String> holePerMatch,
    isWithHandicap: String,
    isPlayerRestrict: int,
    List<MatchConfigModel> playerList,
    List<TeesheetGroupData>? groupList,
    List<TeamListItem>? courseTeamList,
    totalPlayers: String,
    logo: Uint8List?,
    logoName: String?,
    teeSheetId: String?,
    calcuttaPlayerId: String?,
    teamHcpPreference: String?,
    hcpPercentage: String?,
    skinPool: String?,
    greeniePool: String?,
    prizingPool: String?,
    teePosition: String?,
    isProshopeEmail: int?,
    isSkinsGame: int?,
    isGreenieGame: int?,
    greenieType: String?,
    isSkinsCarry: int?,
    IsSkinsPaid: int?,
    isPlacedPaid: int?,
    placesPaid: String?,
    List<String>? placesPaidPercentages
  }) → Future&lt;GamCreateModel&gt;

HTTP Request:
  POST {{baseUrl}}/\${StaticData.apiUrl}api/games/create
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_name": "..."
    "event_id": "..."
    "course_id": "..."
    "game_type": "..."
    "tee_time": "..."
    "total_teams": "..."
    "skode_pool_prize": "..."
    "junk_pool_prize": "..."
    "point_per_hole_win": "..."
    "bonus_point_per_game_win": "..."
    "points_per_match_win": "..."
    "teesheet_id": "..."
    "score_edit_policy": "..."
    "is_auto_newt_twofer_enabled": "..."
    "mail_to_proshop": "..."
    "handicap_percentage": "..."
    "prizing_pool": "..."
    "is_skin_game_enabled": "..."
    "is_greenie_game_enabled": "..."
    "skin_pool": "..."
    "greenie_pool": "..."
    "tee_position": "..."
    "is_greenie_game_enabled": "..."
    "skin_pool": "..."
    "greenie_pool": "..."
    "greenie_type": "..."
    "carry_skin": "..."
    "is_places_paid": "..."
    "places_paid": "..."
    "places_paid_percentages": "..."
    "Is_skins_paid": "..."
    "bet_per_game": "..."
    "is_with_handicap": "..."
    "total_players": "..."
    "play_type": "..."
    "player_ids": "..."
    "total_players": "..."
    "play_type": "..."
    "player_ids": "..."
    "is_ultravegas": "..."
    "play_type": "..."
    "play_type": "..."
    "play_type": "..."
    "team_hcp_preference": "..."
    "play_type": "..."
    "amount_per_point": "..."
    "team_hcp_preference": "..."
    "play_type": "..."
    "point_per_hole_win": "..."
    "point_for_challenged": "..."
    "max_wolf_points": "..."
    "play_type": "..."
    "is_modified_stableford": "..."
    "amount_per_point": "..."
    "selected_game_team_id": "..."
    "total_players": "..."
    "play_type": "..."
    "play_type": "..."
    "selected_group_id": "..."
    "selected_group_id": "..."
  }

Response (GamCreateModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-8", "apis", "getCourseTeesPositions", `
// GET {{baseUrl}}/api/course/\${courseId}/tee/list
// Controller: create_game_controller.dart → apiService.getCourseTeesPositions()

Dart Method:
  apiService.getCourseTeesPositions({
    courseId: String
  }) → Future&lt;TeePositionModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/course/\${courseId}/tee/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (TeePositionModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-8", "apis", "getTeeList", `
// GET {{baseUrl}}/api/v2/teesheet/groups/list
// Controller: create_game_controller.dart → apiService.getTeeList()

Dart Method:
  apiService.getTeeList(()) → Future&lt;NewTeeSheetModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/teesheet/groups/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (NewTeeSheetModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-8", "apis", "minimizeEventList", `
// GET {{baseUrl}}/api/event/list/mini
// Controller: create_game_controller.dart → apiService.minimizeEventList()

Dart Method:
  apiService.minimizeEventList(()) → Future&lt;EventListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/event/list/mini
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (EventListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-8", "apis", "validateGameName", `
// POST {{baseUrl}}/api/games/name/validate
// Controller: create_game_controller.dart → apiService.validateGameName()

Dart Method:
  apiService.validateGameName({
    name: String
  }) → Future&lt;GameNameValidateModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/name/validate
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "name": "..."
  }

Response (GameNameValidateModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-9", "apis", "getCourseTeesPositions", `
// GET {{baseUrl}}/api/course/\${courseId}/tee/list
// Controller: create_game_controller.dart → apiService.getCourseTeesPositions()

Dart Method:
  apiService.getCourseTeesPositions({
    courseId: String
  }) → Future&lt;TeePositionModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/course/\${courseId}/tee/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (TeePositionModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-9", "apis", "getTeeList", `
// GET {{baseUrl}}/api/v2/teesheet/groups/list
// Controller: create_game_controller.dart → apiService.getTeeList()

Dart Method:
  apiService.getTeeList(()) → Future&lt;NewTeeSheetModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/teesheet/groups/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (NewTeeSheetModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-9", "apis", "minimizeEventList", `
// GET {{baseUrl}}/api/event/list/mini
// Controller: create_game_controller.dart → apiService.minimizeEventList()

Dart Method:
  apiService.minimizeEventList(()) → Future&lt;EventListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/event/list/mini
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (EventListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("cgslide-9", "apis", "validateGameName", `
// POST {{baseUrl}}/api/games/name/validate
// Controller: create_game_controller.dart → apiService.validateGameName()

Dart Method:
  apiService.validateGameName({
    name: String
  }) → Future&lt;GameNameValidateModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/name/validate
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "name": "..."
  }

Response (GameNameValidateModel):
  {
    "error":   false,
    "message": "..."
  }
`);
})();
