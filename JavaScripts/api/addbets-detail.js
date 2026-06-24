// ============================================================
// API Docs — Add Bets (addbets-detail)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  add("addbets-detail", "apis", "addBet", `// POST {{baseUrl}}/api/bets/create
// Controller: add_bet_bottom_sheet_controller.dart â†’ apiService.addBet()

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
  }) â†’ Future&lt;DefaultModel&gt;

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
  }`);

  add("addbets-detail", "apis", "getBetTeeSheetPlayer", `// GET {{baseUrl}}/api/teesheet/course/$courseId/groups/details?game_type=$gameType
// Controller: add_bet_bottom_sheet_controller.dart â†’ apiService.getBetTeeSheetPlayer()

Dart Method:
  apiService.getBetTeeSheetPlayer({
    teeSheetId: String?
  }) â†’ Future&lt;BetsTeesheetPlayerListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/teesheet/course/$courseId/groups/details?game_type=$gameType
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (BetsTeesheetPlayerListModel):
  {
    "error":   false,
    "message": "..."
  }`);

  add("addbets-detail", "apis", "getGameDetails", `// GET {{baseUrl}}/api/games/$gameId/details
// Controller: add_bet_bottom_sheet_controller.dart â†’ apiService.getGameDetails()

Dart Method:
  apiService.getGameDetails({
    gameId: int,
    organizationId: String?
  }) â†’ Future&lt;GameDetails&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameId/details
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameDetails):
  {
    "error":   false,
    "message": "..."
  }`);

  add("addbets-detail", "apis", "notStartedGameList", `// GET {{baseUrl}}/api/games/not-started
// Controller: add_bet_bottom_sheet_controller.dart â†’ apiService.notStartedGameList()

Dart Method:
  apiService.notStartedGameList(()) â†’ Future&lt;NotStartedGameModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/not-started
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (NotStartedGameModel):
  {
    "error":   false,
    "message": "..."
  }`);
})();
