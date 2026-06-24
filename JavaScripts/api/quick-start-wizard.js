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
  add("wslide-2", "apis", "getCourseList", `
// GET {{baseUrl}}/api/course
// Controller: course_controller.dart → apiService.getCourseList()

Dart Method:
  apiService.getCourseList(()) → Future&lt;CourseListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/course
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CourseListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

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
  add("wslide-5", "apis", "createGame", `
// POST {{baseUrl}}/${StaticData.apiUrl}api/games/create
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
  POST {{baseUrl}}/${StaticData.apiUrl}api/games/create
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

  // -- wslide-6 : View Game Details --
  add("wslide-6", "apis", "getGameDetails", `
// GET {{baseUrl}}/api/games/$gameId/details
// Controller: game_details_controller.dart → apiService.getGameDetails()

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

  // -- wslide-7 : Add Bets --
  add("wslide-7", "apis", "addBet", `
// POST {{baseUrl}}/api/bets/create
// Controller: add_bet_bottom_sheet_controller.dart → apiService.addBet()

Dart Method:
  apiService.addBet({
    gameId: String,
    category: String,
    type: String,
    betOn: String,
    amount: String,
    betPrediction: String,
    maxBets: String,
    organizationId: String,
    holeNo: String?,
    gameMatchId: String?,
    playerId: String?,
    thresholdLine: String?,
    teamNo: String?
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/bets/create
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "category": "..."
    "type": "..."
    "hole_no": "..."
    "bet_on": "..."
    "game_match_id": "..."
    "player_id": "..."
    "threshold_line": "..."
    "amount": "..."
    "bet_prediction": "..."
    "max_bets": "..."
    "team_no": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

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


  add("wslide-1", "apis", "userRegister", `
// POST {{baseUrl}}/api/register
// Controller: signup_controller.dart → apiService.userRegister()

Dart Method:
  apiService.userRegister({
    fullName: String,
    email: String,
    password: String,
    role: String,
    phone: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/register
  Content-Type: application/json

Request Body:
  {
    "full_name": "..."
    "email": "..."
    "password": "..."
    "role": "..."
    "phone": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-2", "apis", "addPlayerCourse", `
// POST {{baseUrl}}/api/new-user/create/ecg
// Controller: course_controller.dart → apiService.addPlayerCourse()

Dart Method:
  apiService.addPlayerCourse({
    courseId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/new-user/create/ecg
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "course_id": "..."
    "limit": "..."
    "selected_game_team_id": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-2", "apis", "courseProShopDetails", `
// POST {{baseUrl}}/api/course/contact-details/update
// Controller: course_controller.dart → apiService.courseProShopDetails()

Dart Method:
  apiService.courseProShopDetails({
    courseId: String,
    directorOfGolf: String?,
    headPro: String?,
    golfCoach: String?,
    proShoeEmail: String?
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/course/contact-details/update
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "course_id": "..."
    "director_of_golf": "..."
    "had_pro": "..."
    "golf_coach": "..."
    "pro_shop_email": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-2", "apis", "deleteCourse", `
// DELETE {{baseUrl}}/api/course/$id/delete
// Controller: course_controller.dart → apiService.deleteCourse()

Dart Method:
  apiService.deleteCourse({
    id: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  DELETE {{baseUrl}}/api/course/$id/delete
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-2", "apis", "getFilterCourseList", `
// GET {{baseUrl}}/api/course?city=$city&state=$state&country=$countryCode
// Controller: course_controller.dart → apiService.getFilterCourseList()

Dart Method:
  apiService.getFilterCourseList({
    city: String,
    state: String,
    countryCode: String
  }) → Future&lt;CourseListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/course?city=$city&state=$state&country=$countryCode
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CourseListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-3", "apis", "deleteEvent", `
// DELETE {{baseUrl}}/api/event/$id/delete
// Controller: home_controller.dart → apiService.deleteEvent()

Dart Method:
  apiService.deleteEvent({
    id: String,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  DELETE {{baseUrl}}/api/event/$id/delete
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-3", "apis", "deleteGame", `
// DELETE {{baseUrl}}/api/games/$id/delete
// Controller: home_controller.dart → apiService.deleteGame()

Dart Method:
  apiService.deleteGame({
    id: String,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  DELETE {{baseUrl}}/api/games/$id/delete
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-3", "apis", "eventList", `
// GET {{baseUrl}}/api/v2/event/list
// Controller: home_controller.dart → apiService.eventList()

Dart Method:
  apiService.eventList(()) → Future&lt;EventListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/event/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (EventListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-3", "apis", "getMyEventList", `
// GET {{baseUrl}}/api/v2/event/joined/list
// Controller: home_controller.dart → apiService.getMyEventList()

Dart Method:
  apiService.getMyEventList(()) → Future&lt;MyEventList&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/event/joined/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (MyEventList):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-3", "apis", "getMyGameList", `
// GET {{baseUrl}}/api/v2/games/my
// Controller: home_controller.dart → apiService.getMyGameList()

Dart Method:
  apiService.getMyGameList(()) → Future&lt;UpcomingAndPastModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/games/my
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (UpcomingAndPastModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-3", "apis", "getPreference", `
// GET {{baseUrl}}/api/setting/preferences
// Controller: home_controller.dart → apiService.getPreference()

Dart Method:
  apiService.getPreference(()) → Future&lt;GetPreferenceModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/setting/preferences
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GetPreferenceModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-3", "apis", "getUpcomingAgenda", `
// GET {{baseUrl}}/api/v2/agenda/my/list/saas
// Controller: home_controller.dart → apiService.getUpcomingAgenda()

Dart Method:
  apiService.getUpcomingAgenda(()) → Future&lt;MyAgenda&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/agenda/my/list/saas
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (MyAgenda):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-3", "apis", "getUpcomingGameList", `
// GET {{baseUrl}}/api/v2/games/upcoming
// Controller: home_controller.dart → apiService.getUpcomingGameList()

Dart Method:
  apiService.getUpcomingGameList(()) → Future&lt;UpcomingAndPastModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/games/upcoming
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (UpcomingAndPastModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-3", "apis", "upcomingEventList", `
// GET {{baseUrl}}/api/v2/event/upcoming/list
// Controller: home_controller.dart → apiService.upcomingEventList()

Dart Method:
  apiService.upcomingEventList(()) → Future&lt;UpcomingPastEventModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/event/upcoming/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (UpcomingPastEventModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-4", "apis", "deleteEvent", `
// DELETE {{baseUrl}}/api/event/$id/delete
// Controller: games_and_events_controller.dart → apiService.deleteEvent()

Dart Method:
  apiService.deleteEvent({
    id: String,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  DELETE {{baseUrl}}/api/event/$id/delete
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-4", "apis", "deleteGame", `
// DELETE {{baseUrl}}/api/games/$id/delete
// Controller: games_and_events_controller.dart → apiService.deleteGame()

Dart Method:
  apiService.deleteGame({
    id: String,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  DELETE {{baseUrl}}/api/games/$id/delete
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-4", "apis", "getMyEventList", `
// GET {{baseUrl}}/api/v2/event/joined/list
// Controller: games_and_events_controller.dart → apiService.getMyEventList()

Dart Method:
  apiService.getMyEventList(()) → Future&lt;MyEventList&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/event/joined/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (MyEventList):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-4", "apis", "getMyGameList", `
// GET {{baseUrl}}/api/v2/games/my
// Controller: games_and_events_controller.dart → apiService.getMyGameList()

Dart Method:
  apiService.getMyGameList(()) → Future&lt;UpcomingAndPastModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/games/my
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (UpcomingAndPastModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-4", "apis", "getUpcomingGameList", `
// GET {{baseUrl}}/api/v2/games/upcoming
// Controller: games_and_events_controller.dart → apiService.getUpcomingGameList()

Dart Method:
  apiService.getUpcomingGameList(()) → Future&lt;UpcomingAndPastModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/games/upcoming
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (UpcomingAndPastModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-4", "apis", "upcomingEventList", `
// GET {{baseUrl}}/api/v2/event/upcoming/list
// Controller: games_and_events_controller.dart → apiService.upcomingEventList()

Dart Method:
  apiService.upcomingEventList(()) → Future&lt;UpcomingPastEventModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/event/upcoming/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (UpcomingPastEventModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-5", "apis", "getCourseTeesPositions", `
// GET {{baseUrl}}/api/course/${courseId}/tee/list
// Controller: create_game_controller.dart → apiService.getCourseTeesPositions()

Dart Method:
  apiService.getCourseTeesPositions({
    courseId: String
  }) → Future&lt;TeePositionModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/course/${courseId}/tee/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (TeePositionModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-5", "apis", "getTeeList", `
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

  add("wslide-5", "apis", "minimizeEventList", `
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

  add("wslide-5", "apis", "validateGameName", `
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

  add("wslide-6", "apis", "addFoursomeTeeTime", `
// POST {{baseUrl}}/api/foursome/change/tee-time
// Controller: game_details_controller.dart → apiService.addFoursomeTeeTime()

Dart Method:
  apiService.addFoursomeTeeTime({
    foursomeId: String,
    teeTime: String,
    teePosition: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/foursome/change/tee-time
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "foursome_id": "..."
    "tee_time": "..."
    "tee_position": "..."
    "limit": "..."
    "selected_game_team_id": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "deleteGame", `
// DELETE {{baseUrl}}/api/games/$id/delete
// Controller: game_details_controller.dart → apiService.deleteGame()

Dart Method:
  apiService.deleteGame({
    id: String,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  DELETE {{baseUrl}}/api/games/$id/delete
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "endGame", `
// GET {{baseUrl}}/api/games/$gameId/end
// Controller: game_details_controller.dart → apiService.endGame()

Dart Method:
  apiService.endGame({
    gameId: int
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameId/end
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "executePayment", `
// POST {{baseUrl}}/v1/payments/payment/$paymentId/execute
// Controller: game_details_controller.dart → apiService.executePayment()

Dart Method:
  apiService.executePayment({
    token: String,
    paymentId: String,
    payerID: String
  }) → Future&lt;ExecutePaymentModel&gt;

HTTP Request:
  POST {{baseUrl}}/v1/payments/payment/$paymentId/execute
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Response (ExecutePaymentModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "get2v2Summary", `
// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/2v2
// Controller: game_details_controller.dart → apiService.get2v2Summary()

Dart Method:
  apiService.get2v2Summary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;CodSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/2v2
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CodSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "get6HoleSummary2v2", `
// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/2v2
// Controller: game_details_controller.dart → apiService.get6HoleSummary2v2()

Dart Method:
  apiService.get6HoleSummary2v2({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;SixHoleTwoVTwoSummaryMode&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/2v2
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (SixHoleTwoVTwoSummaryMode):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "get6HolesCodSummary", `
// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/2v2
// Controller: game_details_controller.dart → apiService.get6HolesCodSummary()

Dart Method:
  apiService.get6HolesCodSummary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;NewScramblCodSummary&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/2v2
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (NewScramblCodSummary):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getAcrossIndividualSummary", `
// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/across
// Controller: game_details_controller.dart → apiService.getAcrossIndividualSummary()

Dart Method:
  apiService.getAcrossIndividualSummary({
    gameId: int,
    foursomeId: int
  }) → Future&lt;AcrossIndividualSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/across
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (AcrossIndividualSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getAcrossWinner", `
// GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/accross/winner
// Controller: game_details_controller.dart → apiService.getAcrossWinner()

Dart Method:
  apiService.getAcrossWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;AcrossWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/accross/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (AcrossWinnerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getAllPlayersResult", `
// GET {{baseUrl}}/api/result/game/${gameId}/all-foursome
// Controller: game_details_controller.dart → apiService.getAllPlayersResult()

Dart Method:
  apiService.getAllPlayersResult({
    gameId: int,
    organizationId: String
  }) → Future&lt;GameResultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/${gameId}/all-foursome
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameResultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getBasementSummary", `
// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/basement
// Controller: game_details_controller.dart → apiService.getBasementSummary()

Dart Method:
  apiService.getBasementSummary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;BasementSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/basement
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (BasementSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getBetTeeSheetPlayer", `
// GET {{baseUrl}}/api/teesheet/course/$courseId/groups/details?game_type=$gameType
// Controller: game_details_controller.dart → apiService.getBetTeeSheetPlayer()

Dart Method:
  apiService.getBetTeeSheetPlayer({
    teeSheetId: String?
  }) → Future&lt;BetsTeesheetPlayerListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/teesheet/course/$courseId/groups/details?game_type=$gameType
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (BetsTeesheetPlayerListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getCalcuttaSummary", `
// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/individual
// Controller: game_details_controller.dart → apiService.getCalcuttaSummary()

Dart Method:
  apiService.getCalcuttaSummary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;CalcuttaSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/individual
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getDotsGameSummary", `
// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/dots_game
// Controller: game_details_controller.dart → apiService.getDotsGameSummary()

Dart Method:
  apiService.getDotsGameSummary({
    gameId: int,
    foursomeId: int
  }) → Future&lt;DotsGameWinnerSummary&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/dots_game
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DotsGameWinnerSummary):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getDotsGameWinner", `
// GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/dots_game/winner
// Controller: game_details_controller.dart → apiService.getDotsGameWinner()

Dart Method:
  apiService.getDotsGameWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;DotsGameWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/dots_game/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DotsGameWinnerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getFoursome", `
// GET {{baseUrl}}/api/games/$gameID/foursomes/list
// Controller: game_details_controller.dart → apiService.getFoursome()

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

  add("wslide-6", "apis", "getFoursomeOverride", `
// GET {{baseUrl}}/api/games/$gameID/foursome/$foursomeId/override
// Controller: game_details_controller.dart → apiService.getFoursomeOverride()

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

  add("wslide-6", "apis", "getFoursomeTeam", `
// GET {{baseUrl}}/api/result/game/$gameID/foursome/$foursomeId/team/points
// Controller: game_details_controller.dart → apiService.getFoursomeTeam()

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

  add("wslide-6", "apis", "getHorseRaceAcrosswinner", `
// GET {{baseUrl}}/api/result/game/$gameId/foursome/0/accross/winner
// Controller: game_details_controller.dart → apiService.getHorseRaceAcrosswinner()

Dart Method:
  apiService.getHorseRaceAcrosswinner({
    gameId: int
  }) → Future&lt;HorseRaceWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/foursome/0/accross/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (HorseRaceWinnerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getHorseRaceSummary", `
// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/individual
// Controller: game_details_controller.dart → apiService.getHorseRaceSummary()

Dart Method:
  apiService.getHorseRaceSummary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;HorseRaceSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/individual
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (HorseRaceSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getIndividualSummary", `
// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/individual
// Controller: game_details_controller.dart → apiService.getIndividualSummary()

Dart Method:
  apiService.getIndividualSummary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;RabbitChickenSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/individual
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (RabbitChickenSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getJunkSummary", `
// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/junk-summary
// Controller: game_details_controller.dart → apiService.getJunkSummary()

Dart Method:
  apiService.getJunkSummary({
    gameId: int,
    foursomeId: int
  }) → Future&lt;JunkSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/junk-summary
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (JunkSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getMedalPlayAcrossWinner", `
// GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/accross/winner
// Controller: game_details_controller.dart → apiService.getMedalPlayAcrossWinner()

Dart Method:
  apiService.getMedalPlayAcrossWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;MedalPlayAcrossWinner&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/accross/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (MedalPlayAcrossWinner):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getModifiedStableFordWinner", `
// GET {{baseUrl}}/api/result/game/$gameId/foursome/0/accross/winner
// Controller: game_details_controller.dart → apiService.getModifiedStableFordWinner()

Dart Method:
  apiService.getModifiedStableFordWinner({
    gameId: int,
    organizationId: String
  }) → Future&lt;ModifiedStableFordAcrossWinner&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/foursome/0/accross/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (ModifiedStableFordAcrossWinner):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getNewLedgerDate", `
// GET {{baseUrl}}/api/ledger/game/$gameId
// Controller: game_details_controller.dart → apiService.getNewLedgerDate()

Dart Method:
  apiService.getNewLedgerDate({
    gameId: int,
    userId: String,
    organizationId: String
  }) → Future&lt;DemoLedgerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/ledger/game/$gameId
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DemoLedgerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getPayPalAccessToken", `
// POST {{baseUrl}}/v1/oauth2/token
// Controller: game_details_controller.dart → apiService.getPayPalAccessToken()

Dart Method:
  apiService.getPayPalAccessToken(()) → Future&lt;AccessTokenModel&gt;

HTTP Request:
  POST {{baseUrl}}/v1/oauth2/token
  Authorization: Bearer {{accessToken}}
  Content-Type: application/x-www-form-urlencoded

Request Body:
  {
    "grant_type": "..."
  }

Response (AccessTokenModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getPaypalCredential", `
// GET {{baseUrl}}/api/paypal/client-id
// Controller: game_details_controller.dart → apiService.getPaypalCredential()

Dart Method:
  apiService.getPaypalCredential(()) → Future&lt;PaypalCredentialModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/paypal/client-id
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (PaypalCredentialModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getPlayerResult", `
// GET {{baseUrl}}/api/result/game/$gameId/player/$playerId
// Controller: game_details_controller.dart → apiService.getPlayerResult()

Dart Method:
  apiService.getPlayerResult({
    gameId: String,
    playerId: String
  }) → Future&lt;PlayerResultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/player/$playerId
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (PlayerResultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getProgassiveFoursomeWinner", `
// GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/winner
// Controller: game_details_controller.dart → apiService.getProgassiveFoursomeWinner()

Dart Method:
  apiService.getProgassiveFoursomeWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;GameWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameWinnerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getQrLink", `
// GET {{baseUrl}}/api/games/$gameId/onsite-register/qr/link
// Controller: game_details_controller.dart → apiService.getQrLink()

Dart Method:
  apiService.getQrLink({
    gameId: int,
    organizationId: String
  }) → Future&lt;QrModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameId/onsite-register/qr/link
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (QrModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getRabbitChickenSummary", `
// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/rabbitchicken
// Controller: game_details_controller.dart → apiService.getRabbitChickenSummary()

Dart Method:
  apiService.getRabbitChickenSummary({
    gameId: int,
    foursomeId: int
  }) → Future&lt;RabbitChickenSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/rabbitchicken
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (RabbitChickenSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getRabitAndChickenWinner", `
// GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/rabbitchicken/winner
// Controller: game_details_controller.dart → apiService.getRabitAndChickenWinner()

Dart Method:
  apiService.getRabitAndChickenWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;GameWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/rabbitchicken/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameWinnerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getRegularIndividualAcrossWinner", `
// GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/accross/winner
// Controller: game_details_controller.dart → apiService.getRegularIndividualAcrossWinner()

Dart Method:
  apiService.getRegularIndividualAcrossWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;RegularIndividualAcrossWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/accross/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (RegularIndividualAcrossWinnerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getResult", `
// GET {{baseUrl}}/api/result/game/$gameId?foursome_id=$foursomeId
// Controller: game_details_controller.dart → apiService.getResult()

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

  add("wslide-6", "apis", "getScramble4man6HolesSummary", `
// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/individual
// Controller: game_details_controller.dart → apiService.getScramble4man6HolesSummary()

Dart Method:
  apiService.getScramble4man6HolesSummary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;Scramble4Man6HolesSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/individual
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (Scramble4Man6HolesSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getScrambleCodSummary", `
// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/2v2
// Controller: game_details_controller.dart → apiService.getScrambleCodSummary()

Dart Method:
  apiService.getScrambleCodSummary({
    gameId: int,
    foursomeId: int
  }) → Future&lt;ScrambleCodModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/2v2
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (ScrambleCodModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getShotLedger", `
// GET {{baseUrl}}/api/scorecard/game/$gameId/shot-ledger
// Controller: game_details_controller.dart → apiService.getShotLedger()

Dart Method:
  apiService.getShotLedger({
    gameId: String,
    organizationId: String
  }) → Future&lt;ShotLedgerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/$gameId/shot-ledger
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (ShotLedgerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getSkodeJunkWinner", `
// GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/junk-skode/winners
// Controller: game_details_controller.dart → apiService.getSkodeJunkWinner()

Dart Method:
  apiService.getSkodeJunkWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;SkodeJunkWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/junk-skode/winners
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (SkodeJunkWinnerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getSkodeSummary", `
// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/skode-summary
// Controller: game_details_controller.dart → apiService.getSkodeSummary()

Dart Method:
  apiService.getSkodeSummary({
    gameId: int,
    foursomeId: int
  }) → Future&lt;SkodeSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/skode-summary
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (SkodeSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getSummary2v2", `
// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/2v2
// Controller: game_details_controller.dart → apiService.getSummary2v2()

Dart Method:
  apiService.getSummary2v2({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;TwoVTwoSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/2v2
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (TwoVTwoSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "getVegasFoursomeWinner", `
// GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/winner
// Controller: game_details_controller.dart → apiService.getVegasFoursomeWinner()

Dart Method:
  apiService.getVegasFoursomeWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;VegasWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (VegasWinnerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "reminderApi", `
// POST {{baseUrl}}/api/bank/pending/payment/reminder
// Controller: game_details_controller.dart → apiService.reminderApi()

Dart Method:
  apiService.reminderApi({
    playerId: String,
    gameId: String,
    foursomeId: String,
    amount: String,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/bank/pending/payment/reminder
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "player_id": "..."
    "game_id": "..."
    "foursome_id": "..."
    "amount": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "ryderCaptainsSummary", `
// GET {{baseUrl}}/api/summary/game/$gameID/rydercup/winning-captain/summary
// Controller: game_details_controller.dart → apiService.ryderCaptainsSummary()

Dart Method:
  apiService.ryderCaptainsSummary({
    gameID: String
  }) → Future&lt;RyderCaptainsSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameID/rydercup/winning-captain/summary
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (RyderCaptainsSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "ryderCaptainsWinner", `
// GET {{baseUrl}}/api/result/game/$gameID/rydercup/winner/captain
// Controller: game_details_controller.dart → apiService.ryderCaptainsWinner()

Dart Method:
  apiService.ryderCaptainsWinner({
    gameID: String,
    organizationId: String
  }) → Future&lt;RyderCaptainWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameID/rydercup/winner/captain
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (RyderCaptainWinnerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "setOnsitePlayerLimit", `
// POST {{baseUrl}}/api/games/onsite-register/qr/limit
// Controller: game_details_controller.dart → apiService.setOnsitePlayerLimit()

Dart Method:
  apiService.setOnsitePlayerLimit({
    gameId: String,
    playerLimits: String,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/games/onsite-register/qr/limit
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "limit": "..."
    "selected_game_team_id": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "shareScorecardPdf", `
// POST {{baseUrl}}/${StaticData.apiUrl}api/groupme/posts/pdf
// Controller: game_details_controller.dart → apiService.shareScorecardPdf()

Dart Method:
  apiService.shareScorecardPdf({
    //  String playerId,
    gameId: String,
    foursomeId: String?,
    pdfName: String,
    //  String type,
    Pdf: String?
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/${StaticData.apiUrl}api/groupme/posts/pdf
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "post_by": "..."
    "type": "..."
    "group_id": "..."
    "game_id": "..."
    "foursome_id": "..."
    "attachment": "..."
    "attachment_name": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "shareWinnerAndScorecard", `
// POST {{baseUrl}}/${StaticData.apiUrl}api/groupme/posts
// Controller: game_details_controller.dart → apiService.shareWinnerAndScorecard()

Dart Method:
  apiService.shareWinnerAndScorecard({
    playerId: String,
    gameId: String,
    foursomeId: String?,
    imageName: String,
    type: String,
    winnerImage: String?
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/${StaticData.apiUrl}api/groupme/posts
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "post_by": "..."
    "type": "..."
    "group_id": "..."
    "game_id": "..."
    "foursome_id": "..."
    "attachment": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "startGame", `
// GET {{baseUrl}}/api/games/$gameId/start
// Controller: game_details_controller.dart → apiService.startGame()

Dart Method:
  apiService.startGame({
    gameId: int
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameId/start
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-6", "apis", "storePayPal", `
// POST {{baseUrl}}/api/transactions/details/store
// Controller: game_details_controller.dart → apiService.storePayPal()

Dart Method:
  apiService.storePayPal({
    gameId: String,
    List<String> ledgerId,
    //  String fromPlayerId,
    paymentType: String,
    paymentDetails: dynamic,
    transactionId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/transactions/details/store
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "game_id": "..."
    "ledger_ids": "..."
    "from_player_id": "..."
    "payment_type": "..."
    "payment_details": "..."
    "transaction_id": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-7", "apis", "getBetTeeSheetPlayer", `
// GET {{baseUrl}}/api/teesheet/course/$courseId/groups/details?game_type=$gameType
// Controller: add_bet_bottom_sheet_controller.dart → apiService.getBetTeeSheetPlayer()

Dart Method:
  apiService.getBetTeeSheetPlayer({
    teeSheetId: String?
  }) → Future&lt;BetsTeesheetPlayerListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/teesheet/course/$courseId/groups/details?game_type=$gameType
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (BetsTeesheetPlayerListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-7", "apis", "getGameDetails", `
// GET {{baseUrl}}/api/games/$gameId/details
// Controller: add_bet_bottom_sheet_controller.dart → apiService.getGameDetails()

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

  add("wslide-7", "apis", "notStartedGameList", `
// GET {{baseUrl}}/api/games/not-started
// Controller: add_bet_bottom_sheet_controller.dart → apiService.notStartedGameList()

Dart Method:
  apiService.notStartedGameList(()) → Future&lt;NotStartedGameModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/not-started
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (NotStartedGameModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-8", "apis", "endFourSome", `
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

  add("wslide-8", "apis", "getCalcuttaRounds", `
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

  add("wslide-8", "apis", "getCompletedHoles", `
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

  add("wslide-8", "apis", "getFoursome", `
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

  add("wslide-8", "apis", "getMemberList", `
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

  add("wslide-8", "apis", "ryderCupGenerateMatch", `
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

  add("wslide-8", "apis", "updateCaptain", `
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

  add("wslide-9", "apis", "addLdCtp", `
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

  add("wslide-9", "apis", "addPersonalGameScore", `
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

  add("wslide-9", "apis", "autoUpdateScoreCard", `
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

  add("wslide-9", "apis", "getBetDetails", `
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

  add("wslide-9", "apis", "getFoursomeOverride", `
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

  add("wslide-9", "apis", "getFoursomeTeam", `
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

  add("wslide-9", "apis", "getGameDetails", `
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

  add("wslide-9", "apis", "getHoleData", `
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

  add("wslide-9", "apis", "getJunk", `
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

  add("wslide-9", "apis", "getPersonalGameHoleData", `
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

  add("wslide-9", "apis", "getPersonalGameResult", `
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

  add("wslide-9", "apis", "getResult", `
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

  add("wslide-9", "apis", "getSkode", `
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

  add("wslide-9", "apis", "getSkodeJunkHoleDetails", `
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

  add("wslide-9", "apis", "getWolfConfig", `
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

  add("wslide-9", "apis", "junkUpdate", `
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

  add("wslide-9", "apis", "removeJunkSkode", `
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

  add("wslide-9", "apis", "setWolfConfi", `
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

  add("wslide-9", "apis", "updateFairwaysByHole", `
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

  add("wslide-9", "apis", "updateScoreCard", `
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
})();