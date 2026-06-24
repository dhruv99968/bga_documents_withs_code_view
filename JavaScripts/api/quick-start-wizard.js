// ============================================================
// API Docs — Quick Start Wizard (wslide-0 … wslide-9)
// Auto-updated by inject_code.py — do not edit manually.
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  // -- wslide-0 : Welcome Screen --
  add("wslide-0", "apis", "checkAuthStatus", `// GET {{baseUrl}}/api/v1/auth/me
// Controller: welcome_controller.dart -> apiService.checkAuthStatus()

Dart Method:
  apiService.checkAuthStatus() -> Future<ApiResponse>

HTTP Request:
  GET {{baseUrl}}/api/v1/auth/me
  Authorization: Bearer {{accessToken}}

Response (ApiResponse):
  {
    "error":   false,
    "data": { "id": 1, "name": "John Doe", "email": "john@example.com", "role": "organizer" }
  }`);

  // -- wslide-1 : Sign Up --
  add("wslide-1", "apis", "signup", `// POST {{baseUrl}}/api/v1/auth/signup
// Controller: signup_controller.dart -> apiService.signup()

Dart Method:
  apiService.signup({
    name, email, password, confirm_password
  }) -> Future<ApiResponse>

HTTP Request:
  POST {{baseUrl}}/api/v1/auth/signup
  Content-Type: application/json

Request Body:
  {
    "name":             "John Doe",
    "email":            "john@example.com",
    "password":         "........",
    "confirm_password": "........"
  }

Response (ApiResponse):
  {
    "error":   false,
    "message": "Registration successful.",
    "data": { "token": "eyJ...", "user": { "id": 1, "name": "John Doe" } }
  }`);

  add("wslide-1", "apis", "checkEmail", `// POST {{baseUrl}}/api/v1/auth/check-email
// Controller: signup_controller.dart -> apiService.checkEmail()

Dart Method:
  apiService.checkEmail({ email }) -> Future<ApiResponse>

HTTP Request:
  POST {{baseUrl}}/api/v1/auth/check-email
  Content-Type: application/json

Request Body:
  { "email": "john@example.com" }

Response (ApiResponse):
  { "error": false, "message": "Email is available." }`);

  // -- wslide-2 : Select Course --
  add("wslide-2", "apis", "getCourseList", `// GET {{baseUrl}}/api/v1/courses
// Controller: course_controller.dart -> apiService.getCourseList()

Dart Method:
  apiService.getCourseList({ search, page }) -> Future<ApiResponse>

HTTP Request:
  GET {{baseUrl}}/api/v1/courses
  Authorization: Bearer {{accessToken}}
  X-Organization-Id: all

Query Parameters:
  search  (optional) string  — filter by course name
  page    (optional) integer — pagination (default 1)

Response (ApiResponse):
  {
    "error": false,
    "data": {
      "data": [ { "id": 1, "name": "Pebble Beach", "holes": 18, "par": 72 } ],
      "total": 42, "current_page": 1
    }
  }`);

  // -- wslide-3 : Home / Dashboard --
  add("wslide-3", "apis", "getHomeData", `// GET {{baseUrl}}/api/v1/home
// Controller: home_controller.dart -> apiService.getHomeData()

Dart Method:
  apiService.getHomeData() -> Future<ApiResponse>

HTTP Request:
  GET {{baseUrl}}/api/v1/home
  Authorization: Bearer {{accessToken}}
  X-Organization-Id: all

Response (ApiResponse):
  {
    "error": false,
    "data": {
      "upcoming_games": [...],
      "recent_scores":  [...],
      "announcements":  [...]
    }
  }`);

  add("wslide-3", "apis", "getGeneralItems", `// GET {{baseUrl}}/api/v1/home/general
// Controller: home_controller.dart -> apiService.getGeneralItems()

Dart Method:
  apiService.getGeneralItems() -> Future<ApiResponse>

HTTP Request:
  GET {{baseUrl}}/api/v1/home/general
  Authorization: Bearer {{accessToken}}
  X-Organization-Id: all

Response (ApiResponse):
  { "error": false, "data": [ { "id": 1, "title": "Club Championship", "type": "event" } ] }`);

  // -- wslide-4 : Games & Events --
  add("wslide-4", "apis", "getGamesAndEvents", `// GET {{baseUrl}}/api/v1/games
// Controller: games_and_events_controller.dart -> apiService.getGamesAndEvents()

Dart Method:
  apiService.getGamesAndEvents({ page, status, event_id }) -> Future<ApiResponse>

HTTP Request:
  GET {{baseUrl}}/api/v1/games
  Authorization: Bearer {{accessToken}}
  X-Organization-Id: all

Query Parameters:
  page     (optional) integer
  status   (optional) string  — "upcoming" | "active" | "completed"
  event_id (optional) integer — filter by event

Response (ApiResponse):
  {
    "error": false,
    "data": {
      "data": [ { "id": 1, "name": "Saturday 321 Milo", "status": "upcoming" } ],
      "total": 10, "current_page": 1
    }
  }`);

  // -- wslide-5 : Create Game --
  add("wslide-5", "apis", "createGame", `// POST {{baseUrl}}/api/v1/games
// Controller: create_game_controller.dart -> apiService.createGame()

Dart Method:
  apiService.createGame({
    event_id, tee_sheet_id, name, game_type, play_type,
    handicap_method, start_datetime, holes_per_match,
    buy_in, match_amount, player_ids
  }) -> Future<ApiResponse>

HTTP Request:
  POST {{baseUrl}}/api/v1/games
  Authorization: Bearer {{accessToken}}
  X-Organization-Id: all
  Content-Type: application/json

Request Body:
  {
    "event_id": 1, "tee_sheet_id": 1,
    "name": "Saturday 321 Milo", "game_type": "3_2_1",
    "play_type": "COD", "handicap_method": "WHS",
    "start_datetime": "2025-07-05T08:00:00",
    "holes_per_match": 18, "buy_in": 20.00,
    "match_amount": 5.00, "player_ids": [1,2,3,4]
  }

Response (ApiResponse):
  {
    "error":   false,
    "message": "Game created successfully.",
    "data": { "id": 42, "name": "Saturday 321 Milo", "status": "upcoming" }
  }`);

  // -- wslide-6 : View Game Details --
  add("wslide-6", "apis", "getGameDetails", `// GET {{baseUrl}}/api/v1/games/{game_id}
// Controller: game_details_controller.dart -> apiService.getGameDetails()

Dart Method:
  apiService.getGameDetails({ game_id }) -> Future<ApiResponse>

HTTP Request:
  GET {{baseUrl}}/api/v1/games/{game_id}
  Authorization: Bearer {{accessToken}}
  X-Organization-Id: all

Path:  game_id (required) integer

Response (ApiResponse):
  {
    "error": false,
    "data": {
      "id": 42, "name": "Saturday 321 Milo",
      "game_type": "3_2_1", "status": "upcoming",
      "players": [...], "foursomes": []
    }
  }`);

  // -- wslide-7 : Add Bets --
  add("wslide-7", "apis", "addBet", `// POST {{baseUrl}}/api/v1/bets
// Controller: add_bet_bottom_sheet_controller.dart -> apiService.addBet()

Dart Method:
  apiService.addBet({ game_id, foursome_id, bet_type, amount }) -> Future<ApiResponse>

HTTP Request:
  POST {{baseUrl}}/api/v1/bets
  Authorization: Bearer {{accessToken}}
  X-Organization-Id: all
  Content-Type: application/json

Request Body:
  { "game_id": 42, "foursome_id": 1, "bet_type": "match", "amount": 10.00 }

Response (ApiResponse):
  {
    "error":   false,
    "message": "Bet added successfully.",
    "data": { "id": 7, "amount": 10.00, "status": "pending" }
  }`);

  // -- wslide-8 : Add Score (Select Hole) --
  add("wslide-8", "apis", "getFoursomeList", `// GET {{baseUrl}}/api/v1/games/{game_id}/foursomes
// Controller: add_score_controller.dart -> apiService.getFoursomeList()

Dart Method:
  apiService.getFoursomeList({ game_id }) -> Future<ApiResponse>

HTTP Request:
  GET {{baseUrl}}/api/v1/games/{game_id}/foursomes
  Authorization: Bearer {{accessToken}}
  X-Organization-Id: all

Response (ApiResponse):
  { "error": false, "data": [ { "id": 1, "name": "Group A", "players": [...] } ] }`);

  // -- wslide-9 : Input Score --
  add("wslide-9", "apis", "saveHoleScore", `// POST {{baseUrl}}/api/v1/scores
// Controller: input_score_controller.dart -> apiService.saveHoleScore()

Dart Method:
  apiService.saveHoleScore({
    foursomeId, hole, scores, organizationId
  }) -> Future<ApiResponse>

HTTP Request:
  POST {{baseUrl}}/api/v1/scores
  Authorization: Bearer {{accessToken}}
  X-Organization-Id: all
  Content-Type: application/json

Request Body:
  {
    "foursomeId": 1, "hole": 5, "organizationId": "all",
    "scores": [
      { "playerId": 1, "score": 4 },
      { "playerId": 2, "score": 5 }
    ]
  }

Response (ApiResponse):
  { "error": false, "message": "Score saved.", "data": { "hole": 5, "completed": true } }`);

})();