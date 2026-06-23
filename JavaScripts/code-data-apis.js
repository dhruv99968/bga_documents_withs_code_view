// ============================================================
// CODE DATA - APIs
// ============================================================
// Contains all APIs code samples for the code preview viewer.
//
// FORMAT: add("slide-key", "apis", "filename", `code`)
//   slide-key : slide identifier (e.g. "sslide-0")
//   stack     : "apis"
//   filename  : displayed in file tab
//   code      : source in backtick literal
//
// TO EDIT: Find the section, edit code between backticks.
// Escape inside backticks: backtick as \`  backslash as \\
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function(){
  function add(k,s,n,c){
    window.CODE_DATA[k]=window.CODE_DATA[k]||{};
    window.CODE_DATA[k][s]=window.CODE_DATA[k][s]||[];
    window.CODE_DATA[k][s].push({name:n,code:c});
  }

  // -- addbets-detail : Add Bets Screen -- (4 files)
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

  // -- agenda-detail : Agenda Tab -- (9 files)
  add("agenda-detail", "apis", "deleteEvent", `// DELETE {{baseUrl}}/api/event/$id/delete
// Controller: home_controller.dart â†’ apiService.deleteEvent()

Dart Method:
  apiService.deleteEvent({
    id: String,
    organizationId: String
  }) â†’ Future&lt;DefaultModel&gt;

HTTP Request:
  DELETE {{baseUrl}}/api/event/$id/delete
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("agenda-detail", "apis", "deleteGame", `// DELETE {{baseUrl}}/api/games/$id/delete
// Controller: home_controller.dart â†’ apiService.deleteGame()

Dart Method:
  apiService.deleteGame({
    id: String,
    organizationId: String
  }) â†’ Future&lt;DefaultModel&gt;

HTTP Request:
  DELETE {{baseUrl}}/api/games/$id/delete
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("agenda-detail", "apis", "eventList", `// GET {{baseUrl}}/api/v2/event/list
// Controller: home_controller.dart â†’ apiService.eventList()

Dart Method:
  apiService.eventList(()) â†’ Future&lt;EventListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/event/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (EventListModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("agenda-detail", "apis", "getMyEventList", `// GET {{baseUrl}}/api/v2/event/joined/list
// Controller: home_controller.dart â†’ apiService.getMyEventList()

Dart Method:
  apiService.getMyEventList(()) â†’ Future&lt;MyEventList&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/event/joined/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (MyEventList):
  {
    "error":   false,
    "message": "..."
  }`);
  add("agenda-detail", "apis", "getMyGameList", `// GET {{baseUrl}}/api/v2/games/my
// Controller: home_controller.dart â†’ apiService.getMyGameList()

Dart Method:
  apiService.getMyGameList(()) â†’ Future&lt;UpcomingAndPastModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/games/my
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (UpcomingAndPastModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("agenda-detail", "apis", "getPreference", `// GET {{baseUrl}}/api/setting/preferences
// Controller: home_controller.dart â†’ apiService.getPreference()

Dart Method:
  apiService.getPreference(()) â†’ Future&lt;GetPreferenceModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/setting/preferences
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GetPreferenceModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("agenda-detail", "apis", "getUpcomingAgenda", `// GET {{baseUrl}}/api/v2/agenda/my/list/saas
// Controller: home_controller.dart â†’ apiService.getUpcomingAgenda()

Dart Method:
  apiService.getUpcomingAgenda(()) â†’ Future&lt;MyAgenda&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/agenda/my/list/saas
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (MyAgenda):
  {
    "error":   false,
    "message": "..."
  }`);
  add("agenda-detail", "apis", "getUpcomingGameList", `// GET {{baseUrl}}/api/v2/games/upcoming
// Controller: home_controller.dart â†’ apiService.getUpcomingGameList()

Dart Method:
  apiService.getUpcomingGameList(()) â†’ Future&lt;UpcomingAndPastModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/games/upcoming
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (UpcomingAndPastModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("agenda-detail", "apis", "upcomingEventList", `// GET {{baseUrl}}/api/v2/event/upcoming/list
// Controller: home_controller.dart â†’ apiService.upcomingEventList()

Dart Method:
  apiService.upcomingEventList(()) â†’ Future&lt;UpcomingPastEventModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/event/upcoming/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (UpcomingPastEventModel):
  {
    "error":   false,
    "message": "..."
  }`);

  // -- home-detail : Home Screen (General Tab) -- (9 files)
  add("home-detail", "apis", "deleteEvent", `// DELETE {{baseUrl}}/api/event/$id/delete
// Controller: home_controller.dart â†’ apiService.deleteEvent()

Dart Method:
  apiService.deleteEvent({
    id: String,
    organizationId: String
  }) â†’ Future&lt;DefaultModel&gt;

HTTP Request:
  DELETE {{baseUrl}}/api/event/$id/delete
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("home-detail", "apis", "deleteGame", `// DELETE {{baseUrl}}/api/games/$id/delete
// Controller: home_controller.dart â†’ apiService.deleteGame()

Dart Method:
  apiService.deleteGame({
    id: String,
    organizationId: String
  }) â†’ Future&lt;DefaultModel&gt;

HTTP Request:
  DELETE {{baseUrl}}/api/games/$id/delete
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("home-detail", "apis", "eventList", `// GET {{baseUrl}}/api/v2/event/list
// Controller: home_controller.dart â†’ apiService.eventList()

Dart Method:
  apiService.eventList(()) â†’ Future&lt;EventListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/event/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (EventListModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("home-detail", "apis", "getMyEventList", `// GET {{baseUrl}}/api/v2/event/joined/list
// Controller: home_controller.dart â†’ apiService.getMyEventList()

Dart Method:
  apiService.getMyEventList(()) â†’ Future&lt;MyEventList&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/event/joined/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (MyEventList):
  {
    "error":   false,
    "message": "..."
  }`);
  add("home-detail", "apis", "getMyGameList", `// GET {{baseUrl}}/api/v2/games/my
// Controller: home_controller.dart â†’ apiService.getMyGameList()

Dart Method:
  apiService.getMyGameList(()) â†’ Future&lt;UpcomingAndPastModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/games/my
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (UpcomingAndPastModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("home-detail", "apis", "getPreference", `// GET {{baseUrl}}/api/setting/preferences
// Controller: home_controller.dart â†’ apiService.getPreference()

Dart Method:
  apiService.getPreference(()) â†’ Future&lt;GetPreferenceModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/setting/preferences
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GetPreferenceModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("home-detail", "apis", "getUpcomingAgenda", `// GET {{baseUrl}}/api/v2/agenda/my/list/saas
// Controller: home_controller.dart â†’ apiService.getUpcomingAgenda()

Dart Method:
  apiService.getUpcomingAgenda(()) â†’ Future&lt;MyAgenda&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/agenda/my/list/saas
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (MyAgenda):
  {
    "error":   false,
    "message": "..."
  }`);
  add("home-detail", "apis", "getUpcomingGameList", `// GET {{baseUrl}}/api/v2/games/upcoming
// Controller: home_controller.dart â†’ apiService.getUpcomingGameList()

Dart Method:
  apiService.getUpcomingGameList(()) â†’ Future&lt;UpcomingAndPastModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/games/upcoming
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (UpcomingAndPastModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("home-detail", "apis", "upcomingEventList", `// GET {{baseUrl}}/api/v2/event/upcoming/list
// Controller: home_controller.dart â†’ apiService.upcomingEventList()

Dart Method:
  apiService.upcomingEventList(()) â†’ Future&lt;UpcomingPastEventModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/v2/event/upcoming/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (UpcomingPastEventModel):
  {
    "error":   false,
    "message": "..."
  }`);

  // -- sslide-0 : Account Details -- (2 files)
  add("sslide-0", "apis", "userRegister", `// POST {{baseUrl}}/api/register
// Controller: signup_controller.dart â†’ apiService.userRegister()

Dart Method:
  apiService.userRegister({
    fullName: String,
    email: String,
    password: String,
    role: String,
    phone: String
  }) â†’ Future&lt;DefaultModel&gt;

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
  }`);
  add("sslide-0", "apis", "createPassword", `// POST {{baseUrl}}/api/password/create
// Controller: signup_controller.dart â†’ apiService.createPassword()

Dart Method:
  apiService.createPassword({
    email: String,
    password: String
  }) â†’ Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/password/create
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "email": "..."
    "password": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }`);

  // -- sslide-1 : OTP Verify -- (2 files)
  add("sslide-1", "apis", "verifyEmail", `// POST {{baseUrl}}/api/email_verify
// Controller: otp_controller.dart â†’ apiService.verifyEmail()

Dart Method:
  apiService.verifyEmail({
    email: String,
    otp: String
  }) â†’ Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/email_verify
  Content-Type: application/json

Request Body:
  {
    "email": "..."
    "otp": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("sslide-1", "apis", "resendOtp", `// POST {{baseUrl}}/api/email_verify/resend
// Controller: otp_controller.dart â†’ apiService.resendOtp()

Dart Method:
  apiService.resendOtp({
    email: String
  }) â†’ Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/email_verify/resend
  Content-Type: application/json

Request Body:
  {
    "email": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }`);

  // -- sslide-2 : Set Password -- (4 files)
  add("sslide-2", "apis", "createPassword", `// POST {{baseUrl}}/api/password/create
// Controller: change_password_controller.dart â†’ apiService.createPassword()

Dart Method:
  apiService.createPassword({
    email: String,
    password: String
  }) â†’ Future&lt;DefaultModel&gt;

HTTP Request:
  POST {{baseUrl}}/api/password/create
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Request Body:
  {
    "email": "..."
    "password": "..."
  }

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("sslide-2", "apis", "loginUser", `// POST {{baseUrl}}/\${StaticData.apiLoginUrl}/realms/users/protocol/openid-connect/token
// Controller: change_password_controller.dart â†’ apiService.loginUser()

Dart Method:
  apiService.loginUser({
    email: String,
    password: String
  }) â†’ Future&lt;LoginModel?&gt;

HTTP Request:
  POST {{baseUrl}}/\${StaticData.apiLoginUrl}/realms/users/protocol/openid-connect/token
  Content-Type: application/json

Request Body:
  {
    "username": "..."
    "password": "..."
    "client_id": "..."
    "grant_type": "..."
  }

Response (LoginModel?):
  {
    "error":   false,
    "message": "..."
  }`);
  add("sslide-2", "apis", "getUserProfile", `// GET {{baseUrl}}/api/profile
// Controller: change_password_controller.dart â†’ apiService.getUserProfile()

Dart Method:
  apiService.getUserProfile(()) â†’ Future&lt;ProfileData&gt;

HTTP Request:
  GET {{baseUrl}}/api/profile
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (ProfileData):
  {
    "error":   false,
    "message": "..."
  }`);
  add("sslide-2", "apis", "getBio", `// GET {{baseUrl}}/api/profile/bio
// Controller: change_password_controller.dart â†’ apiService.getBio()

Dart Method:
  apiService.getBio(()) â†’ Future&lt;GetBioModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/profile/bio
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GetBioModel):
  {
    "error":   false,
    "message": "..."
  }`);

  // -- sslide-3 : Home Course -- (5 files)
  add("sslide-3", "apis", "getCourseList", `// GET {{baseUrl}}/api/course
// Controller: course_controller.dart â†’ apiService.getCourseList()

Dart Method:
  apiService.getCourseList(()) â†’ Future&lt;CourseListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/course
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CourseListModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("sslide-3", "apis", "addPlayerCourse", `// POST {{baseUrl}}/api/new-user/create/ecg
// Controller: course_controller.dart â†’ apiService.addPlayerCourse()

Dart Method:
  apiService.addPlayerCourse({
    courseId: String
  }) â†’ Future&lt;DefaultModel&gt;

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
  }`);
  add("sslide-3", "apis", "courseProShopDetails", `// POST {{baseUrl}}/api/course/contact-details/update
// Controller: course_controller.dart â†’ apiService.courseProShopDetails()

Dart Method:
  apiService.courseProShopDetails({
    courseId: String,
    directorOfGolf: String?,
    headPro: String?,
    golfCoach: String?,
    proShoeEmail: String?
  }) â†’ Future&lt;DefaultModel&gt;

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
  }`);
  add("sslide-3", "apis", "deleteCourse", `// DELETE {{baseUrl}}/api/course/$id/delete
// Controller: course_controller.dart â†’ apiService.deleteCourse()

Dart Method:
  apiService.deleteCourse({
    id: String
  }) â†’ Future&lt;DefaultModel&gt;

HTTP Request:
  DELETE {{baseUrl}}/api/course/$id/delete
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("sslide-3", "apis", "getFilterCourseList", `// GET {{baseUrl}}/api/course?city=$city&state=$state&country=$countryCode
// Controller: course_controller.dart â†’ apiService.getFilterCourseList()

Dart Method:
  apiService.getFilterCourseList({
    city: String,
    state: String,
    countryCode: String
  }) â†’ Future&lt;CourseListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/course?city=$city&state=$state&country=$countryCode
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CourseListModel):
  {
    "error":   false,
    "message": "..."
  }`);

  // -- viewgame-detail : Game Overview / View Game -- (50 files)
  add("viewgame-detail", "apis", "addFoursomeTeeTime", `// POST {{baseUrl}}/api/foursome/change/tee-time
// Controller: game_details_controller.dart â†’ apiService.addFoursomeTeeTime()

Dart Method:
  apiService.addFoursomeTeeTime({
    foursomeId: String,
    teeTime: String,
    teePosition: String
  }) â†’ Future&lt;DefaultModel&gt;

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
  }`);
  add("viewgame-detail", "apis", "deleteGame", `// DELETE {{baseUrl}}/api/games/$id/delete
// Controller: game_details_controller.dart â†’ apiService.deleteGame()

Dart Method:
  apiService.deleteGame({
    id: String,
    organizationId: String
  }) â†’ Future&lt;DefaultModel&gt;

HTTP Request:
  DELETE {{baseUrl}}/api/games/$id/delete
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "endGame", `// GET {{baseUrl}}/api/games/$gameId/end
// Controller: game_details_controller.dart â†’ apiService.endGame()

Dart Method:
  apiService.endGame({
    gameId: int
  }) â†’ Future&lt;DefaultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameId/end
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "executePayment", `// POST {{baseUrl}}/v1/payments/payment/$paymentId/execute
// Controller: game_details_controller.dart â†’ apiService.executePayment()

Dart Method:
  apiService.executePayment({
    token: String,
    paymentId: String,
    payerID: String
  }) â†’ Future&lt;ExecutePaymentModel&gt;

HTTP Request:
  POST {{baseUrl}}/v1/payments/payment/$paymentId/execute
  Authorization: Bearer {{accessToken}}
  Content-Type: application/json

Response (ExecutePaymentModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "get2v2Summary", `// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/2v2
// Controller: game_details_controller.dart â†’ apiService.get2v2Summary()

Dart Method:
  apiService.get2v2Summary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) â†’ Future&lt;CodSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/2v2
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CodSummaryModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "get6HoleSummary2v2", `// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/2v2
// Controller: game_details_controller.dart â†’ apiService.get6HoleSummary2v2()

Dart Method:
  apiService.get6HoleSummary2v2({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) â†’ Future&lt;SixHoleTwoVTwoSummaryMode&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/2v2
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (SixHoleTwoVTwoSummaryMode):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "get6HolesCodSummary", `// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/2v2
// Controller: game_details_controller.dart â†’ apiService.get6HolesCodSummary()

Dart Method:
  apiService.get6HolesCodSummary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) â†’ Future&lt;NewScramblCodSummary&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/2v2
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (NewScramblCodSummary):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getAcrossIndividualSummary", `// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/across
// Controller: game_details_controller.dart â†’ apiService.getAcrossIndividualSummary()

Dart Method:
  apiService.getAcrossIndividualSummary({
    gameId: int,
    foursomeId: int
  }) â†’ Future&lt;AcrossIndividualSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/across
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (AcrossIndividualSummaryModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getAcrossWinner", `// GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/accross/winner
// Controller: game_details_controller.dart â†’ apiService.getAcrossWinner()

Dart Method:
  apiService.getAcrossWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) â†’ Future&lt;AcrossWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/accross/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (AcrossWinnerModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getAllPlayersResult", `// GET {{baseUrl}}/api/result/game/\${gameId}/all-foursome
// Controller: game_details_controller.dart â†’ apiService.getAllPlayersResult()

Dart Method:
  apiService.getAllPlayersResult({
    gameId: int,
    organizationId: String
  }) â†’ Future&lt;GameResultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/\${gameId}/all-foursome
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameResultModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getBasementSummary", `// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/basement
// Controller: game_details_controller.dart â†’ apiService.getBasementSummary()

Dart Method:
  apiService.getBasementSummary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) â†’ Future&lt;BasementSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/basement
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (BasementSummaryModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getBetTeeSheetPlayer", `// GET {{baseUrl}}/api/teesheet/course/$courseId/groups/details?game_type=$gameType
// Controller: game_details_controller.dart â†’ apiService.getBetTeeSheetPlayer()

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
  add("viewgame-detail", "apis", "getCalcuttaSummary", `// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/individual
// Controller: game_details_controller.dart â†’ apiService.getCalcuttaSummary()

Dart Method:
  apiService.getCalcuttaSummary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) â†’ Future&lt;CalcuttaSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/individual
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaSummaryModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getDotsGameSummary", `// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/dots_game
// Controller: game_details_controller.dart â†’ apiService.getDotsGameSummary()

Dart Method:
  apiService.getDotsGameSummary({
    gameId: int,
    foursomeId: int
  }) â†’ Future&lt;DotsGameWinnerSummary&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/dots_game
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DotsGameWinnerSummary):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getDotsGameWinner", `// GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/dots_game/winner
// Controller: game_details_controller.dart â†’ apiService.getDotsGameWinner()

Dart Method:
  apiService.getDotsGameWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) â†’ Future&lt;DotsGameWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/dots_game/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DotsGameWinnerModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getFoursome", `// GET {{baseUrl}}/api/games/$gameID/foursomes/list
// Controller: game_details_controller.dart â†’ apiService.getFoursome()

Dart Method:
  apiService.getFoursome({
    gameID: String,
    organizationId: String
  }) â†’ Future&lt;CalcuttaFoursomeModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameID/foursomes/list
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaFoursomeModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getFoursomeOverride", `// GET {{baseUrl}}/api/games/$gameID/foursome/$foursomeId/override
// Controller: game_details_controller.dart â†’ apiService.getFoursomeOverride()

Dart Method:
  apiService.getFoursomeOverride({
    gameID: String,
    foursomeId,
    organizationId: String
  }) â†’ Future&lt;GetFoursomeOverrideModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameID/foursome/$foursomeId/override
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GetFoursomeOverrideModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getFoursomeTeam", `// GET {{baseUrl}}/api/result/game/$gameID/foursome/$foursomeId/team/points
// Controller: game_details_controller.dart â†’ apiService.getFoursomeTeam()

Dart Method:
  apiService.getFoursomeTeam({
    gameID: int,
    foursomeId: int
  }) â†’ Future&lt;FoursomeTeamModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameID/foursome/$foursomeId/team/points
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (FoursomeTeamModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getGameDetails", `// GET {{baseUrl}}/api/games/$gameId/details
// Controller: game_details_controller.dart â†’ apiService.getGameDetails()

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
  add("viewgame-detail", "apis", "getHorseRaceAcrosswinner", `// GET {{baseUrl}}/api/result/game/$gameId/foursome/0/accross/winner
// Controller: game_details_controller.dart â†’ apiService.getHorseRaceAcrosswinner()

Dart Method:
  apiService.getHorseRaceAcrosswinner({
    gameId: int
  }) â†’ Future&lt;HorseRaceWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/foursome/0/accross/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (HorseRaceWinnerModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getHorseRaceSummary", `// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/individual
// Controller: game_details_controller.dart â†’ apiService.getHorseRaceSummary()

Dart Method:
  apiService.getHorseRaceSummary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) â†’ Future&lt;HorseRaceSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/individual
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (HorseRaceSummaryModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getIndividualSummary", `// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/individual
// Controller: game_details_controller.dart â†’ apiService.getIndividualSummary()

Dart Method:
  apiService.getIndividualSummary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) â†’ Future&lt;RabbitChickenSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/individual
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (RabbitChickenSummaryModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getJunkSummary", `// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/junk-summary
// Controller: game_details_controller.dart â†’ apiService.getJunkSummary()

Dart Method:
  apiService.getJunkSummary({
    gameId: int,
    foursomeId: int
  }) â†’ Future&lt;JunkSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/junk-summary
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (JunkSummaryModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getMedalPlayAcrossWinner", `// GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/accross/winner
// Controller: game_details_controller.dart â†’ apiService.getMedalPlayAcrossWinner()

Dart Method:
  apiService.getMedalPlayAcrossWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) â†’ Future&lt;MedalPlayAcrossWinner&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/accross/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (MedalPlayAcrossWinner):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getModifiedStableFordWinner", `// GET {{baseUrl}}/api/result/game/$gameId/foursome/0/accross/winner
// Controller: game_details_controller.dart â†’ apiService.getModifiedStableFordWinner()

Dart Method:
  apiService.getModifiedStableFordWinner({
    gameId: int,
    organizationId: String
  }) â†’ Future&lt;ModifiedStableFordAcrossWinner&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/foursome/0/accross/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (ModifiedStableFordAcrossWinner):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getNewLedgerDate", `// GET {{baseUrl}}/api/ledger/game/$gameId
// Controller: game_details_controller.dart â†’ apiService.getNewLedgerDate()

Dart Method:
  apiService.getNewLedgerDate({
    gameId: int,
    userId: String,
    organizationId: String
  }) â†’ Future&lt;DemoLedgerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/ledger/game/$gameId
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DemoLedgerModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getPayPalAccessToken", `// POST {{baseUrl}}/v1/oauth2/token
// Controller: game_details_controller.dart â†’ apiService.getPayPalAccessToken()

Dart Method:
  apiService.getPayPalAccessToken(()) â†’ Future&lt;AccessTokenModel&gt;

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
  }`);
  add("viewgame-detail", "apis", "getPaypalCredential", `// GET {{baseUrl}}/api/paypal/client-id
// Controller: game_details_controller.dart â†’ apiService.getPaypalCredential()

Dart Method:
  apiService.getPaypalCredential(()) â†’ Future&lt;PaypalCredentialModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/paypal/client-id
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (PaypalCredentialModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getPlayerResult", `// GET {{baseUrl}}/api/result/game/$gameId/player/$playerId
// Controller: game_details_controller.dart â†’ apiService.getPlayerResult()

Dart Method:
  apiService.getPlayerResult({
    gameId: String,
    playerId: String
  }) â†’ Future&lt;PlayerResultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/player/$playerId
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (PlayerResultModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getProgassiveFoursomeWinner", `// GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/winner
// Controller: game_details_controller.dart â†’ apiService.getProgassiveFoursomeWinner()

Dart Method:
  apiService.getProgassiveFoursomeWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) â†’ Future&lt;GameWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameWinnerModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getQrLink", `// GET {{baseUrl}}/api/games/$gameId/onsite-register/qr/link
// Controller: game_details_controller.dart â†’ apiService.getQrLink()

Dart Method:
  apiService.getQrLink({
    gameId: int,
    organizationId: String
  }) â†’ Future&lt;QrModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameId/onsite-register/qr/link
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (QrModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getRabbitChickenSummary", `// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/rabbitchicken
// Controller: game_details_controller.dart â†’ apiService.getRabbitChickenSummary()

Dart Method:
  apiService.getRabbitChickenSummary({
    gameId: int,
    foursomeId: int
  }) â†’ Future&lt;RabbitChickenSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/rabbitchicken
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (RabbitChickenSummaryModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getRabitAndChickenWinner", `// GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/rabbitchicken/winner
// Controller: game_details_controller.dart â†’ apiService.getRabitAndChickenWinner()

Dart Method:
  apiService.getRabitAndChickenWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) â†’ Future&lt;GameWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/rabbitchicken/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameWinnerModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getRegularIndividualAcrossWinner", `// GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/accross/winner
// Controller: game_details_controller.dart â†’ apiService.getRegularIndividualAcrossWinner()

Dart Method:
  apiService.getRegularIndividualAcrossWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) â†’ Future&lt;RegularIndividualAcrossWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/accross/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (RegularIndividualAcrossWinnerModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getResult", `// GET {{baseUrl}}/api/result/game/$gameId?foursome_id=$foursomeId
// Controller: game_details_controller.dart â†’ apiService.getResult()

Dart Method:
  apiService.getResult({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) â†’ Future&lt;GameResultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId?foursome_id=$foursomeId
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameResultModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getScramble4man6HolesSummary", `// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/individual
// Controller: game_details_controller.dart â†’ apiService.getScramble4man6HolesSummary()

Dart Method:
  apiService.getScramble4man6HolesSummary({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) â†’ Future&lt;Scramble4Man6HolesSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/individual
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (Scramble4Man6HolesSummaryModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getScrambleCodSummary", `// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/2v2
// Controller: game_details_controller.dart â†’ apiService.getScrambleCodSummary()

Dart Method:
  apiService.getScrambleCodSummary({
    gameId: int,
    foursomeId: int
  }) â†’ Future&lt;ScrambleCodModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/2v2
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (ScrambleCodModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getShotLedger", `// GET {{baseUrl}}/api/scorecard/game/$gameId/shot-ledger
// Controller: game_details_controller.dart â†’ apiService.getShotLedger()

Dart Method:
  apiService.getShotLedger({
    gameId: String,
    organizationId: String
  }) â†’ Future&lt;ShotLedgerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/$gameId/shot-ledger
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (ShotLedgerModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getSkodeJunkWinner", `// GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/junk-skode/winners
// Controller: game_details_controller.dart â†’ apiService.getSkodeJunkWinner()

Dart Method:
  apiService.getSkodeJunkWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) â†’ Future&lt;SkodeJunkWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/junk-skode/winners
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (SkodeJunkWinnerModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getSkodeSummary", `// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/skode-summary
// Controller: game_details_controller.dart â†’ apiService.getSkodeSummary()

Dart Method:
  apiService.getSkodeSummary({
    gameId: int,
    foursomeId: int
  }) â†’ Future&lt;SkodeSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/skode-summary
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (SkodeSummaryModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getSummary2v2", `// GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/2v2
// Controller: game_details_controller.dart â†’ apiService.getSummary2v2()

Dart Method:
  apiService.getSummary2v2({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) â†’ Future&lt;TwoVTwoSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameId/foursome/$foursomeId/2v2
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (TwoVTwoSummaryModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "getVegasFoursomeWinner", `// GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/winner
// Controller: game_details_controller.dart â†’ apiService.getVegasFoursomeWinner()

Dart Method:
  apiService.getVegasFoursomeWinner({
    gameId: int,
    fourSomeId: int,
    organizationId: String
  }) â†’ Future&lt;VegasWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameId/foursome/$fourSomeId/winner
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (VegasWinnerModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "reminderApi", `// POST {{baseUrl}}/api/bank/pending/payment/reminder
// Controller: game_details_controller.dart â†’ apiService.reminderApi()

Dart Method:
  apiService.reminderApi({
    playerId: String,
    gameId: String,
    foursomeId: String,
    amount: String,
    organizationId: String
  }) â†’ Future&lt;DefaultModel&gt;

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
  }`);
  add("viewgame-detail", "apis", "ryderCaptainsSummary", `// GET {{baseUrl}}/api/summary/game/$gameID/rydercup/winning-captain/summary
// Controller: game_details_controller.dart â†’ apiService.ryderCaptainsSummary()

Dart Method:
  apiService.ryderCaptainsSummary({
    gameID: String
  }) â†’ Future&lt;RyderCaptainsSummaryModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/summary/game/$gameID/rydercup/winning-captain/summary
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (RyderCaptainsSummaryModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "ryderCaptainsWinner", `// GET {{baseUrl}}/api/result/game/$gameID/rydercup/winner/captain
// Controller: game_details_controller.dart â†’ apiService.ryderCaptainsWinner()

Dart Method:
  apiService.ryderCaptainsWinner({
    gameID: String,
    organizationId: String
  }) â†’ Future&lt;RyderCaptainWinnerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/result/game/$gameID/rydercup/winner/captain
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (RyderCaptainWinnerModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "setOnsitePlayerLimit", `// POST {{baseUrl}}/api/games/onsite-register/qr/limit
// Controller: game_details_controller.dart â†’ apiService.setOnsitePlayerLimit()

Dart Method:
  apiService.setOnsitePlayerLimit({
    gameId: String,
    playerLimits: String,
    organizationId: String
  }) â†’ Future&lt;DefaultModel&gt;

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
  }`);
  add("viewgame-detail", "apis", "shareScorecardPdf", `// POST {{baseUrl}}/\${StaticData.apiUrl}api/groupme/posts/pdf
// Controller: game_details_controller.dart â†’ apiService.shareScorecardPdf()

Dart Method:
  apiService.shareScorecardPdf({
    //  String playerId,
    gameId: String,
    foursomeId: String?,
    pdfName: String,
    //  String type,
    Pdf: String?
  }) â†’ Future&lt;DefaultModel&gt;

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
  }`);
  add("viewgame-detail", "apis", "shareWinnerAndScorecard", `// POST {{baseUrl}}/\${StaticData.apiUrl}api/groupme/posts
// Controller: game_details_controller.dart â†’ apiService.shareWinnerAndScorecard()

Dart Method:
  apiService.shareWinnerAndScorecard({
    playerId: String,
    gameId: String,
    foursomeId: String?,
    imageName: String,
    type: String,
    winnerImage: String?
  }) â†’ Future&lt;DefaultModel&gt;

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
  }`);
  add("viewgame-detail", "apis", "startGame", `// GET {{baseUrl}}/api/games/$gameId/start
// Controller: game_details_controller.dart â†’ apiService.startGame()

Dart Method:
  apiService.startGame({
    gameId: int
  }) â†’ Future&lt;DefaultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/$gameId/start
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }`);
  add("viewgame-detail", "apis", "storePayPal", `// POST {{baseUrl}}/api/transactions/details/store
// Controller: game_details_controller.dart â†’ apiService.storePayPal()

Dart Method:
  apiService.storePayPal({
    gameId: String,
    List<String> ledgerId,
    //  String fromPlayerId,
    paymentType: String,
    paymentDetails: dynamic,
    transactionId: String
  }) â†’ Future&lt;DefaultModel&gt;

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
  }`);


  // vlslide-* (View Ledger) and vrslide-* (View Results) are now in:
  //   JavaScripts/api/view-ledger.js
  //   JavaScripts/api/view-results.js



  // Game-type-specific steps (calcutta, ryder_cup, horse_race) are now in:
  //   JavaScripts/api/add-score-calcutta.js
  //   JavaScripts/api/add-score-ryder-cup.js
  //   JavaScripts/api/add-score-horse-race.js

})();
