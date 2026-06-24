// ============================================================
// API Docs — View Game Detail (viewgame-detail)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  add("viewgame-detail", "apis", "addFoursomeTeeTime", `
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

  add("viewgame-detail", "apis", "deleteGame", `
// DELETE {{baseUrl}}/api/games/\$id/delete
// Controller: game_details_controller.dart → apiService.deleteGame()

Dart Method:
  apiService.deleteGame({
    id: String,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  DELETE {{baseUrl}}/api/games/\$id/delete
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "endGame", `
// GET {{baseUrl}}/api/games/\$gameId/end
// Controller: game_details_controller.dart → apiService.endGame()

Dart Method:
  apiService.endGame({
    gameId: int
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/\$gameId/end
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "executePayment", `
// POST {{baseUrl}}/v1/payments/payment/\$paymentId/execute
// Controller: game_details_controller.dart → apiService.executePayment()

Dart Method:
  apiService.executePayment({
    token: String,
    paymentId: String,
    payerID: String
  }) → Future&lt;ExecutePaymentModel&gt;

HTTP Request:
  POST {{baseUrl}}/v1/payments/payment/\$paymentId/execute
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Response (ExecutePaymentModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "get2v2Summary", `
// GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/2v2
// Controller: game_details_controller.dart → apiService.get2v2Summary()

Dart Method:
  apiService.get2v2Summary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;CodSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/2v2
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CodSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "get6HoleSummary2v2", `
// GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/2v2
// Controller: game_details_controller.dart → apiService.get6HoleSummary2v2()

Dart Method:
  apiService.get6HoleSummary2v2({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;SixHoleTwoVTwoSummaryMode&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/2v2
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (SixHoleTwoVTwoSummaryMode):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "get6HolesCodSummary", `
// GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/2v2
// Controller: game_details_controller.dart → apiService.get6HolesCodSummary()

Dart Method:
  apiService.get6HolesCodSummary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;NewScramblCodSummary&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/2v2
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (NewScramblCodSummary):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getAcrossIndividualSummary", `
// GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/across
// Controller: game_details_controller.dart → apiService.getAcrossIndividualSummary()

Dart Method:
  apiService.getAcrossIndividualSummary({
    gameId: int,
    foursomeId: int
  }) → Future&lt;AcrossIndividualSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/across
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (AcrossIndividualSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getAcrossWinner", `
// GET {{baseUrl}}/api/result/game/\$gameId/foursome/\$fourSomeId/accross/winner
// Controller: game_details_controller.dart → apiService.getAcrossWinner()

Dart Method:
  apiService.getAcrossWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;AcrossWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/\$gameId/foursome/\$fourSomeId/accross/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (AcrossWinnerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getAllPlayersResult", `
// GET {{baseUrl}}/api/result/game/\${gameId}/all-foursome
// Controller: game_details_controller.dart → apiService.getAllPlayersResult()

Dart Method:
  apiService.getAllPlayersResult({
    gameId: int,
    organizationId: String
  }) → Future&lt;GameResultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/\${gameId}/all-foursome
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameResultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getBasementSummary", `
// GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/basement
// Controller: game_details_controller.dart → apiService.getBasementSummary()

Dart Method:
  apiService.getBasementSummary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;BasementSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/basement
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (BasementSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getBetTeeSheetPlayer", `
// GET {{baseUrl}}/api/teesheet/course/\$courseId/groups/details?game_type=\$gameType
// Controller: game_details_controller.dart → apiService.getBetTeeSheetPlayer()

Dart Method:
  apiService.getBetTeeSheetPlayer({
    teeSheetId: String?
  }) → Future&lt;BetsTeesheetPlayerListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/teesheet/course/\$courseId/groups/details?game_type=\$gameType
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (BetsTeesheetPlayerListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getCalcuttaSummary", `
// GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/individual
// Controller: game_details_controller.dart → apiService.getCalcuttaSummary()

Dart Method:
  apiService.getCalcuttaSummary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;CalcuttaSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/individual
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getDotsGameSummary", `
// GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/dots_game
// Controller: game_details_controller.dart → apiService.getDotsGameSummary()

Dart Method:
  apiService.getDotsGameSummary({
    gameId: int,
    foursomeId: int
  }) → Future&lt;DotsGameWinnerSummary&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/dots_game
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DotsGameWinnerSummary):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getDotsGameWinner", `
// GET {{baseUrl}}/api/result/game/\$gameId/foursome/\$fourSomeId/dots_game/winner
// Controller: game_details_controller.dart → apiService.getDotsGameWinner()

Dart Method:
  apiService.getDotsGameWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;DotsGameWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/\$gameId/foursome/\$fourSomeId/dots_game/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DotsGameWinnerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getFoursome", `
// GET {{baseUrl}}/api/games/\$gameID/foursomes/list
// Controller: game_details_controller.dart → apiService.getFoursome()

Dart Method:
  apiService.getFoursome({
    gameID: String,
    organizationId: String
  }) → Future&lt;CalcuttaFoursomeModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/\$gameID/foursomes/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaFoursomeModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getFoursomeOverride", `
// GET {{baseUrl}}/api/games/\$gameID/foursome/\$foursomeId/override
// Controller: game_details_controller.dart → apiService.getFoursomeOverride()

Dart Method:
  apiService.getFoursomeOverride({
    gameID: String,
    foursomeId,
    organizationId: String
  }) → Future&lt;GetFoursomeOverrideModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/\$gameID/foursome/\$foursomeId/override
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GetFoursomeOverrideModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getFoursomeTeam", `
// GET {{baseUrl}}/api/result/game/\$gameID/foursome/\$foursomeId/team/points
// Controller: game_details_controller.dart → apiService.getFoursomeTeam()

Dart Method:
  apiService.getFoursomeTeam({
    gameID: int,
    foursomeId: int
  }) → Future&lt;FoursomeTeamModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/\$gameID/foursome/\$foursomeId/team/points
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (FoursomeTeamModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getGameDetails", `
// GET {{baseUrl}}/api/games/\$gameId/details
// Controller: game_details_controller.dart → apiService.getGameDetails()

Dart Method:
  apiService.getGameDetails({
    gameId: int,
    organizationId: String?
  }) → Future&lt;GameDetails&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/\$gameId/details
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameDetails):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getHorseRaceAcrosswinner", `
// GET {{baseUrl}}/api/result/game/\$gameId/foursome/0/accross/winner
// Controller: game_details_controller.dart → apiService.getHorseRaceAcrosswinner()

Dart Method:
  apiService.getHorseRaceAcrosswinner({
    gameId: int
  }) → Future&lt;HorseRaceWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/\$gameId/foursome/0/accross/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (HorseRaceWinnerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getHorseRaceSummary", `
// GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/individual
// Controller: game_details_controller.dart → apiService.getHorseRaceSummary()

Dart Method:
  apiService.getHorseRaceSummary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;HorseRaceSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/individual
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (HorseRaceSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getIndividualSummary", `
// GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/individual
// Controller: game_details_controller.dart → apiService.getIndividualSummary()

Dart Method:
  apiService.getIndividualSummary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;RabbitChickenSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/individual
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (RabbitChickenSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getJunkSummary", `
// GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/junk-summary
// Controller: game_details_controller.dart → apiService.getJunkSummary()

Dart Method:
  apiService.getJunkSummary({
    gameId: int,
    foursomeId: int
  }) → Future&lt;JunkSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/junk-summary
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (JunkSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getMedalPlayAcrossWinner", `
// GET {{baseUrl}}/api/result/game/\$gameId/foursome/\$fourSomeId/accross/winner
// Controller: game_details_controller.dart → apiService.getMedalPlayAcrossWinner()

Dart Method:
  apiService.getMedalPlayAcrossWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;MedalPlayAcrossWinner&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/\$gameId/foursome/\$fourSomeId/accross/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (MedalPlayAcrossWinner):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getModifiedStableFordWinner", `
// GET {{baseUrl}}/api/result/game/\$gameId/foursome/0/accross/winner
// Controller: game_details_controller.dart → apiService.getModifiedStableFordWinner()

Dart Method:
  apiService.getModifiedStableFordWinner({
    gameId: int,
    organizationId: String
  }) → Future&lt;ModifiedStableFordAcrossWinner&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/\$gameId/foursome/0/accross/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (ModifiedStableFordAcrossWinner):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getNewLedgerDate", `
// GET {{baseUrl}}/api/ledger/game/\$gameId
// Controller: game_details_controller.dart → apiService.getNewLedgerDate()

Dart Method:
  apiService.getNewLedgerDate({
    gameId: int,
    userId: String,
    organizationId: String
  }) → Future&lt;DemoLedgerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/ledger/game/\$gameId
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DemoLedgerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getPayPalAccessToken", `
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

  add("viewgame-detail", "apis", "getPaypalCredential", `
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

  add("viewgame-detail", "apis", "getPlayerResult", `
// GET {{baseUrl}}/api/result/game/\$gameId/player/\$playerId
// Controller: game_details_controller.dart → apiService.getPlayerResult()

Dart Method:
  apiService.getPlayerResult({
    gameId: String,
    playerId: String
  }) → Future&lt;PlayerResultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/\$gameId/player/\$playerId
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (PlayerResultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getProgassiveFoursomeWinner", `
// GET {{baseUrl}}/api/result/game/\$gameId/foursome/\$fourSomeId/winner
// Controller: game_details_controller.dart → apiService.getProgassiveFoursomeWinner()

Dart Method:
  apiService.getProgassiveFoursomeWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;GameWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/\$gameId/foursome/\$fourSomeId/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameWinnerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getQrLink", `
// GET {{baseUrl}}/api/games/\$gameId/onsite-register/qr/link
// Controller: game_details_controller.dart → apiService.getQrLink()

Dart Method:
  apiService.getQrLink({
    gameId: int,
    organizationId: String
  }) → Future&lt;QrModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/\$gameId/onsite-register/qr/link
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (QrModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getRabbitChickenSummary", `
// GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/rabbitchicken
// Controller: game_details_controller.dart → apiService.getRabbitChickenSummary()

Dart Method:
  apiService.getRabbitChickenSummary({
    gameId: int,
    foursomeId: int
  }) → Future&lt;RabbitChickenSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/rabbitchicken
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (RabbitChickenSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getRabitAndChickenWinner", `
// GET {{baseUrl}}/api/result/game/\$gameId/foursome/\$fourSomeId/rabbitchicken/winner
// Controller: game_details_controller.dart → apiService.getRabitAndChickenWinner()

Dart Method:
  apiService.getRabitAndChickenWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;GameWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/\$gameId/foursome/\$fourSomeId/rabbitchicken/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameWinnerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getRegularIndividualAcrossWinner", `
// GET {{baseUrl}}/api/result/game/\$gameId/foursome/\$fourSomeId/accross/winner
// Controller: game_details_controller.dart → apiService.getRegularIndividualAcrossWinner()

Dart Method:
  apiService.getRegularIndividualAcrossWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;RegularIndividualAcrossWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/\$gameId/foursome/\$fourSomeId/accross/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (RegularIndividualAcrossWinnerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getResult", `
// GET {{baseUrl}}/api/result/game/\$gameId?foursome_id=\$foursomeId
// Controller: game_details_controller.dart → apiService.getResult()

Dart Method:
  apiService.getResult({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;GameResultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/\$gameId?foursome_id=\$foursomeId
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameResultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getScramble4man6HolesSummary", `
// GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/individual
// Controller: game_details_controller.dart → apiService.getScramble4man6HolesSummary()

Dart Method:
  apiService.getScramble4man6HolesSummary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;Scramble4Man6HolesSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/individual
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (Scramble4Man6HolesSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getScrambleCodSummary", `
// GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/2v2
// Controller: game_details_controller.dart → apiService.getScrambleCodSummary()

Dart Method:
  apiService.getScrambleCodSummary({
    gameId: int,
    foursomeId: int
  }) → Future&lt;ScrambleCodModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/2v2
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (ScrambleCodModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getShotLedger", `
// GET {{baseUrl}}/api/scorecard/game/\$gameId/shot-ledger
// Controller: game_details_controller.dart → apiService.getShotLedger()

Dart Method:
  apiService.getShotLedger({
    gameId: String,
    organizationId: String
  }) → Future&lt;ShotLedgerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/\$gameId/shot-ledger
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (ShotLedgerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getSkodeJunkWinner", `
// GET {{baseUrl}}/api/result/game/\$gameId/foursome/\$fourSomeId/junk-skode/winners
// Controller: game_details_controller.dart → apiService.getSkodeJunkWinner()

Dart Method:
  apiService.getSkodeJunkWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;SkodeJunkWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/\$gameId/foursome/\$fourSomeId/junk-skode/winners
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (SkodeJunkWinnerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getSkodeSummary", `
// GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/skode-summary
// Controller: game_details_controller.dart → apiService.getSkodeSummary()

Dart Method:
  apiService.getSkodeSummary({
    gameId: int,
    foursomeId: int
  }) → Future&lt;SkodeSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/skode-summary
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (SkodeSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getSummary2v2", `
// GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/2v2
// Controller: game_details_controller.dart → apiService.getSummary2v2()

Dart Method:
  apiService.getSummary2v2({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;TwoVTwoSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/\$gameId/foursome/\$foursomeId/2v2
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (TwoVTwoSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "getVegasFoursomeWinner", `
// GET {{baseUrl}}/api/result/game/\$gameId/foursome/\$fourSomeId/winner
// Controller: game_details_controller.dart → apiService.getVegasFoursomeWinner()

Dart Method:
  apiService.getVegasFoursomeWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;VegasWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/\$gameId/foursome/\$fourSomeId/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (VegasWinnerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "reminderApi", `
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

  add("viewgame-detail", "apis", "ryderCaptainsSummary", `
// GET {{baseUrl}}/api/summary/game/\$gameID/rydercup/winning-captain/summary
// Controller: game_details_controller.dart → apiService.ryderCaptainsSummary()

Dart Method:
  apiService.ryderCaptainsSummary({
    gameID: String
  }) → Future&lt;RyderCaptainsSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/\$gameID/rydercup/winning-captain/summary
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (RyderCaptainsSummaryModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "ryderCaptainsWinner", `
// GET {{baseUrl}}/api/result/game/\$gameID/rydercup/winner/captain
// Controller: game_details_controller.dart → apiService.ryderCaptainsWinner()

Dart Method:
  apiService.ryderCaptainsWinner({
    gameID: String,
    organizationId: String
  }) → Future&lt;RyderCaptainWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/\$gameID/rydercup/winner/captain
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (RyderCaptainWinnerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "setOnsitePlayerLimit", `
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

  add("viewgame-detail", "apis", "shareScorecardPdf", `
// POST {{baseUrl}}/\${StaticData.apiUrl}api/groupme/posts/pdf
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
  POST {{baseUrl}}/\${StaticData.apiUrl}api/groupme/posts/pdf
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

  add("viewgame-detail", "apis", "shareWinnerAndScorecard", `
// POST {{baseUrl}}/\${StaticData.apiUrl}api/groupme/posts
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
  POST {{baseUrl}}/\${StaticData.apiUrl}api/groupme/posts
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

  add("viewgame-detail", "apis", "startGame", `
// GET {{baseUrl}}/api/games/\$gameId/start
// Controller: game_details_controller.dart → apiService.startGame()

Dart Method:
  apiService.startGame({
    gameId: int
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/\$gameId/start
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("viewgame-detail", "apis", "storePayPal", `
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
})();
