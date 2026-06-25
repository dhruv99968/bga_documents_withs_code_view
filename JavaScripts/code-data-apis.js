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


  add("sslide-0", "apis", "userRegister", `
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

  add("sslide-1", "apis", "resendOtp", `
// POST {{baseUrl}}/api/email_verify/resend
// Controller: otp_controller.dart → apiService.resendOtp()

Dart Method:
  apiService.resendOtp({
    email: String
  }) → Future&lt;DefaultModel&gt;

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
  }
`);

  add("sslide-1", "apis", "verifyEmail", `
// POST {{baseUrl}}/api/email_verify
// Controller: otp_controller.dart → apiService.verifyEmail()

Dart Method:
  apiService.verifyEmail({
    email: String,
    otp: String
  }) → Future&lt;DefaultModel&gt;

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
  }
`);

  add("sslide-2", "apis", "createPassword", `
// POST {{baseUrl}}/api/password/create
// Controller: change_password_controller.dart → apiService.createPassword()

Dart Method:
  apiService.createPassword({
    email: String,
    password: String
  }) → Future&lt;DefaultModel&gt;

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
  }
`);

  add("sslide-2", "apis", "getBio", `
// GET {{baseUrl}}/api/profile/bio
// Controller: change_password_controller.dart → apiService.getBio()

Dart Method:
  apiService.getBio(()) → Future&lt;GetBioModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/profile/bio
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GetBioModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("sslide-2", "apis", "getUserProfile", `
// GET {{baseUrl}}/api/profile
// Controller: change_password_controller.dart → apiService.getUserProfile()

Dart Method:
  apiService.getUserProfile(()) → Future&lt;ProfileData&gt;

HTTP Request:
  GET {{baseUrl}}/api/profile
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (ProfileData):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("sslide-2", "apis", "loginUser", `
// POST {{baseUrl}}/\${StaticData.apiLoginUrl}/realms/users/protocol/openid-connect/token
// Controller: change_password_controller.dart → apiService.loginUser()

Dart Method:
  apiService.loginUser({
    email: String,
    password: String
  }) → Future&lt;LoginModel?&gt;

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
  }
`);

  add("sslide-3", "apis", "addPlayerCourse", `
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

  add("sslide-3", "apis", "courseProShopDetails", `
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

  add("sslide-3", "apis", "deleteCourse", `
// DELETE {{baseUrl}}/api/course/\$id/delete
// Controller: course_controller.dart → apiService.deleteCourse()

Dart Method:
  apiService.deleteCourse({
    id: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  DELETE {{baseUrl}}/api/course/\$id/delete
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("sslide-3", "apis", "getCourseList", `
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

  add("sslide-3", "apis", "getFilterCourseList", `
// GET {{baseUrl}}/api/course?city=\$city&state=\$state&country=\$countryCode
// Controller: course_controller.dart → apiService.getFilterCourseList()

Dart Method:
  apiService.getFilterCourseList({
    city: String,
    state: String,
    countryCode: String
  }) → Future&lt;CourseListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/course?city=\$city&state=\$state&country=\$countryCode
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CourseListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("agenda-detail", "apis", "deleteEvent", `
// DELETE {{baseUrl}}/api/event/\$id/delete
// Controller: home_controller.dart → apiService.deleteEvent()

Dart Method:
  apiService.deleteEvent({
    id: String,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  DELETE {{baseUrl}}/api/event/\$id/delete
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("agenda-detail", "apis", "deleteGame", `
// DELETE {{baseUrl}}/api/games/\$id/delete
// Controller: home_controller.dart → apiService.deleteGame()

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

  add("agenda-detail", "apis", "eventList", `
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

  add("agenda-detail", "apis", "getMyEventList", `
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

  add("agenda-detail", "apis", "getMyGameList", `
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

  add("agenda-detail", "apis", "getPreference", `
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

  add("agenda-detail", "apis", "getUpcomingAgenda", `
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

  add("agenda-detail", "apis", "getUpcomingGameList", `
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

  add("agenda-detail", "apis", "upcomingEventList", `
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

  add("home-detail", "apis", "deleteEvent", `
// DELETE {{baseUrl}}/api/event/\$id/delete
// Controller: home_controller.dart → apiService.deleteEvent()

Dart Method:
  apiService.deleteEvent({
    id: String,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  DELETE {{baseUrl}}/api/event/\$id/delete
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("home-detail", "apis", "deleteGame", `
// DELETE {{baseUrl}}/api/games/\$id/delete
// Controller: home_controller.dart → apiService.deleteGame()

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

  add("home-detail", "apis", "eventList", `
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

  add("home-detail", "apis", "getMyEventList", `
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

  add("home-detail", "apis", "getMyGameList", `
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

  add("home-detail", "apis", "getPreference", `
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

  add("home-detail", "apis", "getUpcomingAgenda", `
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

  add("home-detail", "apis", "getUpcomingGameList", `
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

  add("home-detail", "apis", "upcomingEventList", `
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

  add("addbets-detail", "apis", "addBet", `
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

  add("addbets-detail", "apis", "getBetTeeSheetPlayer", `
// GET {{baseUrl}}/api/teesheet/course/\$courseId/groups/details?game_type=\$gameType
// Controller: add_bet_bottom_sheet_controller.dart → apiService.getBetTeeSheetPlayer()

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

  add("addbets-detail", "apis", "getGameDetails", `
// GET {{baseUrl}}/api/games/\$gameId/details
// Controller: add_bet_bottom_sheet_controller.dart → apiService.getGameDetails()

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

  add("addbets-detail", "apis", "notStartedGameList", `
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

  add("vrslide-0", "apis", "addFoursomeTeeTime", `
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

  add("vrslide-0", "apis", "deleteGame", `
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

  add("vrslide-0", "apis", "endGame", `
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

  add("vrslide-0", "apis", "executePayment", `
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

  add("vrslide-0", "apis", "get2v2Summary", `
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

  add("vrslide-0", "apis", "get6HoleSummary2v2", `
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

  add("vrslide-0", "apis", "get6HolesCodSummary", `
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

  add("vrslide-0", "apis", "getAcrossIndividualSummary", `
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

  add("vrslide-0", "apis", "getAcrossWinner", `
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

  add("vrslide-0", "apis", "getAllPlayersResult", `
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

  add("vrslide-0", "apis", "getBasementSummary", `
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

  add("vrslide-0", "apis", "getBetTeeSheetPlayer", `
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

  add("vrslide-0", "apis", "getCalcuttaSummary", `
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

  add("vrslide-0", "apis", "getDotsGameSummary", `
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

  add("vrslide-0", "apis", "getDotsGameWinner", `
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

  add("vrslide-0", "apis", "getFoursome", `
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

  add("vrslide-0", "apis", "getFoursomeOverride", `
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

  add("vrslide-0", "apis", "getFoursomeTeam", `
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

  add("vrslide-0", "apis", "getGameDetails", `
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

  add("vrslide-0", "apis", "getHorseRaceAcrosswinner", `
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

  add("vrslide-0", "apis", "getHorseRaceSummary", `
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

  add("vrslide-0", "apis", "getIndividualSummary", `
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

  add("vrslide-0", "apis", "getJunkSummary", `
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

  add("vrslide-0", "apis", "getMedalPlayAcrossWinner", `
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

  add("vrslide-0", "apis", "getModifiedStableFordWinner", `
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

  add("vrslide-0", "apis", "getNewLedgerDate", `
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

  add("vrslide-0", "apis", "getPayPalAccessToken", `
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

  add("vrslide-0", "apis", "getPaypalCredential", `
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

  add("vrslide-0", "apis", "getPlayerResult", `
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

  add("vrslide-0", "apis", "getProgassiveFoursomeWinner", `
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

  add("vrslide-0", "apis", "getQrLink", `
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

  add("vrslide-0", "apis", "getRabbitChickenSummary", `
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

  add("vrslide-0", "apis", "getRabitAndChickenWinner", `
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

  add("vrslide-0", "apis", "getRegularIndividualAcrossWinner", `
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

  add("vrslide-0", "apis", "getResult", `
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

  add("vrslide-0", "apis", "getScramble4man6HolesSummary", `
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

  add("vrslide-0", "apis", "getScrambleCodSummary", `
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

  add("vrslide-0", "apis", "getShotLedger", `
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

  add("vrslide-0", "apis", "getSkodeJunkWinner", `
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

  add("vrslide-0", "apis", "getSkodeSummary", `
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

  add("vrslide-0", "apis", "getSummary2v2", `
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

  add("vrslide-0", "apis", "getVegasFoursomeWinner", `
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

  add("vrslide-0", "apis", "reminderApi", `
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

  add("vrslide-0", "apis", "ryderCaptainsSummary", `
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

  add("vrslide-0", "apis", "ryderCaptainsWinner", `
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

  add("vrslide-0", "apis", "setOnsitePlayerLimit", `
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

  add("vrslide-0", "apis", "shareScorecardPdf", `
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

  add("vrslide-0", "apis", "shareWinnerAndScorecard", `
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

  add("vrslide-0", "apis", "startGame", `
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

  add("vrslide-0", "apis", "storePayPal", `
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

  add("vrslide-1", "apis", "addFoursomeTeeTime", `
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

  add("vrslide-1", "apis", "deleteGame", `
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

  add("vrslide-1", "apis", "endGame", `
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

  add("vrslide-1", "apis", "executePayment", `
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

  add("vrslide-1", "apis", "get2v2Summary", `
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

  add("vrslide-1", "apis", "get6HoleSummary2v2", `
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

  add("vrslide-1", "apis", "get6HolesCodSummary", `
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

  add("vrslide-1", "apis", "getAcrossIndividualSummary", `
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

  add("vrslide-1", "apis", "getAcrossWinner", `
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

  add("vrslide-1", "apis", "getAllPlayersResult", `
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

  add("vrslide-1", "apis", "getBasementSummary", `
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

  add("vrslide-1", "apis", "getBetTeeSheetPlayer", `
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

  add("vrslide-1", "apis", "getCalcuttaSummary", `
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

  add("vrslide-1", "apis", "getDotsGameSummary", `
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

  add("vrslide-1", "apis", "getDotsGameWinner", `
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

  add("vrslide-1", "apis", "getFoursome", `
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

  add("vrslide-1", "apis", "getFoursomeOverride", `
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

  add("vrslide-1", "apis", "getFoursomeTeam", `
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

  add("vrslide-1", "apis", "getGameDetails", `
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

  add("vrslide-1", "apis", "getHorseRaceAcrosswinner", `
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

  add("vrslide-1", "apis", "getHorseRaceSummary", `
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

  add("vrslide-1", "apis", "getIndividualSummary", `
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

  add("vrslide-1", "apis", "getJunkSummary", `
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

  add("vrslide-1", "apis", "getMedalPlayAcrossWinner", `
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

  add("vrslide-1", "apis", "getModifiedStableFordWinner", `
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

  add("vrslide-1", "apis", "getNewLedgerDate", `
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

  add("vrslide-1", "apis", "getPayPalAccessToken", `
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

  add("vrslide-1", "apis", "getPaypalCredential", `
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

  add("vrslide-1", "apis", "getPlayerResult", `
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

  add("vrslide-1", "apis", "getProgassiveFoursomeWinner", `
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

  add("vrslide-1", "apis", "getQrLink", `
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

  add("vrslide-1", "apis", "getRabbitChickenSummary", `
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

  add("vrslide-1", "apis", "getRabitAndChickenWinner", `
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

  add("vrslide-1", "apis", "getRegularIndividualAcrossWinner", `
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

  add("vrslide-1", "apis", "getResult", `
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

  add("vrslide-1", "apis", "getScramble4man6HolesSummary", `
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

  add("vrslide-1", "apis", "getScrambleCodSummary", `
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

  add("vrslide-1", "apis", "getShotLedger", `
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

  add("vrslide-1", "apis", "getSkodeJunkWinner", `
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

  add("vrslide-1", "apis", "getSkodeSummary", `
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

  add("vrslide-1", "apis", "getSummary2v2", `
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

  add("vrslide-1", "apis", "getVegasFoursomeWinner", `
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

  add("vrslide-1", "apis", "reminderApi", `
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

  add("vrslide-1", "apis", "ryderCaptainsSummary", `
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

  add("vrslide-1", "apis", "ryderCaptainsWinner", `
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

  add("vrslide-1", "apis", "setOnsitePlayerLimit", `
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

  add("vrslide-1", "apis", "shareScorecardPdf", `
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

  add("vrslide-1", "apis", "shareWinnerAndScorecard", `
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

  add("vrslide-1", "apis", "startGame", `
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

  add("vrslide-1", "apis", "storePayPal", `
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

  add("vrslide-2", "apis", "addFoursomeTeeTime", `
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

  add("vrslide-2", "apis", "deleteGame", `
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

  add("vrslide-2", "apis", "endGame", `
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

  add("vrslide-2", "apis", "executePayment", `
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

  add("vrslide-2", "apis", "get2v2Summary", `
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

  add("vrslide-2", "apis", "get6HoleSummary2v2", `
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

  add("vrslide-2", "apis", "get6HolesCodSummary", `
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

  add("vrslide-2", "apis", "getAcrossIndividualSummary", `
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

  add("vrslide-2", "apis", "getAcrossWinner", `
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

  add("vrslide-2", "apis", "getAllPlayersResult", `
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

  add("vrslide-2", "apis", "getBasementSummary", `
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

  add("vrslide-2", "apis", "getBetTeeSheetPlayer", `
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

  add("vrslide-2", "apis", "getCalcuttaSummary", `
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

  add("vrslide-2", "apis", "getDotsGameSummary", `
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

  add("vrslide-2", "apis", "getDotsGameWinner", `
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

  add("vrslide-2", "apis", "getFoursome", `
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

  add("vrslide-2", "apis", "getFoursomeOverride", `
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

  add("vrslide-2", "apis", "getFoursomeTeam", `
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

  add("vrslide-2", "apis", "getGameDetails", `
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

  add("vrslide-2", "apis", "getHorseRaceAcrosswinner", `
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

  add("vrslide-2", "apis", "getHorseRaceSummary", `
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

  add("vrslide-2", "apis", "getIndividualSummary", `
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

  add("vrslide-2", "apis", "getJunkSummary", `
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

  add("vrslide-2", "apis", "getMedalPlayAcrossWinner", `
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

  add("vrslide-2", "apis", "getModifiedStableFordWinner", `
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

  add("vrslide-2", "apis", "getNewLedgerDate", `
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

  add("vrslide-2", "apis", "getPayPalAccessToken", `
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

  add("vrslide-2", "apis", "getPaypalCredential", `
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

  add("vrslide-2", "apis", "getPlayerResult", `
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

  add("vrslide-2", "apis", "getProgassiveFoursomeWinner", `
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

  add("vrslide-2", "apis", "getQrLink", `
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

  add("vrslide-2", "apis", "getRabbitChickenSummary", `
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

  add("vrslide-2", "apis", "getRabitAndChickenWinner", `
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

  add("vrslide-2", "apis", "getRegularIndividualAcrossWinner", `
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

  add("vrslide-2", "apis", "getResult", `
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

  add("vrslide-2", "apis", "getScramble4man6HolesSummary", `
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

  add("vrslide-2", "apis", "getScrambleCodSummary", `
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

  add("vrslide-2", "apis", "getShotLedger", `
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

  add("vrslide-2", "apis", "getSkodeJunkWinner", `
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

  add("vrslide-2", "apis", "getSkodeSummary", `
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

  add("vrslide-2", "apis", "getSummary2v2", `
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

  add("vrslide-2", "apis", "getVegasFoursomeWinner", `
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

  add("vrslide-2", "apis", "reminderApi", `
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

  add("vrslide-2", "apis", "ryderCaptainsSummary", `
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

  add("vrslide-2", "apis", "ryderCaptainsWinner", `
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

  add("vrslide-2", "apis", "setOnsitePlayerLimit", `
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

  add("vrslide-2", "apis", "shareScorecardPdf", `
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

  add("vrslide-2", "apis", "shareWinnerAndScorecard", `
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

  add("vrslide-2", "apis", "startGame", `
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

  add("vrslide-2", "apis", "storePayPal", `
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

  add("vrslide-3", "apis", "addFoursomeTeeTime", `
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

  add("vrslide-3", "apis", "deleteGame", `
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

  add("vrslide-3", "apis", "endGame", `
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

  add("vrslide-3", "apis", "executePayment", `
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

  add("vrslide-3", "apis", "get2v2Summary", `
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

  add("vrslide-3", "apis", "get6HoleSummary2v2", `
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

  add("vrslide-3", "apis", "get6HolesCodSummary", `
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

  add("vrslide-3", "apis", "getAcrossIndividualSummary", `
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

  add("vrslide-3", "apis", "getAcrossWinner", `
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

  add("vrslide-3", "apis", "getAllPlayersResult", `
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

  add("vrslide-3", "apis", "getBasementSummary", `
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

  add("vrslide-3", "apis", "getBetTeeSheetPlayer", `
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

  add("vrslide-3", "apis", "getCalcuttaSummary", `
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

  add("vrslide-3", "apis", "getDotsGameSummary", `
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

  add("vrslide-3", "apis", "getDotsGameWinner", `
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

  add("vrslide-3", "apis", "getFoursome", `
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

  add("vrslide-3", "apis", "getFoursomeOverride", `
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

  add("vrslide-3", "apis", "getFoursomeTeam", `
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

  add("vrslide-3", "apis", "getGameDetails", `
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

  add("vrslide-3", "apis", "getHorseRaceAcrosswinner", `
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

  add("vrslide-3", "apis", "getHorseRaceSummary", `
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

  add("vrslide-3", "apis", "getIndividualSummary", `
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

  add("vrslide-3", "apis", "getJunkSummary", `
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

  add("vrslide-3", "apis", "getMedalPlayAcrossWinner", `
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

  add("vrslide-3", "apis", "getModifiedStableFordWinner", `
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

  add("vrslide-3", "apis", "getNewLedgerDate", `
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

  add("vrslide-3", "apis", "getPayPalAccessToken", `
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

  add("vrslide-3", "apis", "getPaypalCredential", `
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

  add("vrslide-3", "apis", "getPlayerResult", `
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

  add("vrslide-3", "apis", "getProgassiveFoursomeWinner", `
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

  add("vrslide-3", "apis", "getQrLink", `
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

  add("vrslide-3", "apis", "getRabbitChickenSummary", `
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

  add("vrslide-3", "apis", "getRabitAndChickenWinner", `
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

  add("vrslide-3", "apis", "getRegularIndividualAcrossWinner", `
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

  add("vrslide-3", "apis", "getResult", `
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

  add("vrslide-3", "apis", "getScramble4man6HolesSummary", `
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

  add("vrslide-3", "apis", "getScrambleCodSummary", `
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

  add("vrslide-3", "apis", "getShotLedger", `
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

  add("vrslide-3", "apis", "getSkodeJunkWinner", `
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

  add("vrslide-3", "apis", "getSkodeSummary", `
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

  add("vrslide-3", "apis", "getSummary2v2", `
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

  add("vrslide-3", "apis", "getVegasFoursomeWinner", `
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

  add("vrslide-3", "apis", "reminderApi", `
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

  add("vrslide-3", "apis", "ryderCaptainsSummary", `
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

  add("vrslide-3", "apis", "ryderCaptainsWinner", `
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

  add("vrslide-3", "apis", "setOnsitePlayerLimit", `
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

  add("vrslide-3", "apis", "shareScorecardPdf", `
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

  add("vrslide-3", "apis", "shareWinnerAndScorecard", `
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

  add("vrslide-3", "apis", "startGame", `
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

  add("vrslide-3", "apis", "storePayPal", `
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

  add("vlslide-0", "apis", "addFoursomeTeeTime", `
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

  add("vlslide-0", "apis", "deleteGame", `
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

  add("vlslide-0", "apis", "endGame", `
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

  add("vlslide-0", "apis", "executePayment", `
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

  add("vlslide-0", "apis", "get2v2Summary", `
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

  add("vlslide-0", "apis", "get6HoleSummary2v2", `
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

  add("vlslide-0", "apis", "get6HolesCodSummary", `
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

  add("vlslide-0", "apis", "getAcrossIndividualSummary", `
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

  add("vlslide-0", "apis", "getAcrossWinner", `
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

  add("vlslide-0", "apis", "getAllPlayersResult", `
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

  add("vlslide-0", "apis", "getBasementSummary", `
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

  add("vlslide-0", "apis", "getBetTeeSheetPlayer", `
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

  add("vlslide-0", "apis", "getCalcuttaSummary", `
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

  add("vlslide-0", "apis", "getDotsGameSummary", `
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

  add("vlslide-0", "apis", "getDotsGameWinner", `
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

  add("vlslide-0", "apis", "getFoursome", `
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

  add("vlslide-0", "apis", "getFoursomeOverride", `
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

  add("vlslide-0", "apis", "getFoursomeTeam", `
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

  add("vlslide-0", "apis", "getGameDetails", `
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

  add("vlslide-0", "apis", "getHorseRaceAcrosswinner", `
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

  add("vlslide-0", "apis", "getHorseRaceSummary", `
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

  add("vlslide-0", "apis", "getIndividualSummary", `
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

  add("vlslide-0", "apis", "getJunkSummary", `
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

  add("vlslide-0", "apis", "getMedalPlayAcrossWinner", `
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

  add("vlslide-0", "apis", "getModifiedStableFordWinner", `
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

  add("vlslide-0", "apis", "getNewLedgerDate", `
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

  add("vlslide-0", "apis", "getPayPalAccessToken", `
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

  add("vlslide-0", "apis", "getPaypalCredential", `
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

  add("vlslide-0", "apis", "getPlayerResult", `
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

  add("vlslide-0", "apis", "getProgassiveFoursomeWinner", `
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

  add("vlslide-0", "apis", "getQrLink", `
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

  add("vlslide-0", "apis", "getRabbitChickenSummary", `
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

  add("vlslide-0", "apis", "getRabitAndChickenWinner", `
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

  add("vlslide-0", "apis", "getRegularIndividualAcrossWinner", `
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

  add("vlslide-0", "apis", "getResult", `
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

  add("vlslide-0", "apis", "getScramble4man6HolesSummary", `
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

  add("vlslide-0", "apis", "getScrambleCodSummary", `
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

  add("vlslide-0", "apis", "getShotLedger", `
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

  add("vlslide-0", "apis", "getSkodeJunkWinner", `
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

  add("vlslide-0", "apis", "getSkodeSummary", `
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

  add("vlslide-0", "apis", "getSummary2v2", `
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

  add("vlslide-0", "apis", "getVegasFoursomeWinner", `
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

  add("vlslide-0", "apis", "reminderApi", `
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

  add("vlslide-0", "apis", "ryderCaptainsSummary", `
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

  add("vlslide-0", "apis", "ryderCaptainsWinner", `
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

  add("vlslide-0", "apis", "setOnsitePlayerLimit", `
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

  add("vlslide-0", "apis", "shareScorecardPdf", `
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

  add("vlslide-0", "apis", "shareWinnerAndScorecard", `
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

  add("vlslide-0", "apis", "startGame", `
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

  add("vlslide-0", "apis", "storePayPal", `
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

  add("vlslide-1", "apis", "addFoursomeTeeTime", `
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

  add("vlslide-1", "apis", "deleteGame", `
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

  add("vlslide-1", "apis", "endGame", `
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

  add("vlslide-1", "apis", "executePayment", `
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

  add("vlslide-1", "apis", "get2v2Summary", `
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

  add("vlslide-1", "apis", "get6HoleSummary2v2", `
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

  add("vlslide-1", "apis", "get6HolesCodSummary", `
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

  add("vlslide-1", "apis", "getAcrossIndividualSummary", `
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

  add("vlslide-1", "apis", "getAcrossWinner", `
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

  add("vlslide-1", "apis", "getAllPlayersResult", `
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

  add("vlslide-1", "apis", "getBasementSummary", `
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

  add("vlslide-1", "apis", "getBetTeeSheetPlayer", `
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

  add("vlslide-1", "apis", "getCalcuttaSummary", `
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

  add("vlslide-1", "apis", "getDotsGameSummary", `
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

  add("vlslide-1", "apis", "getDotsGameWinner", `
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

  add("vlslide-1", "apis", "getFoursome", `
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

  add("vlslide-1", "apis", "getFoursomeOverride", `
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

  add("vlslide-1", "apis", "getFoursomeTeam", `
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

  add("vlslide-1", "apis", "getGameDetails", `
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

  add("vlslide-1", "apis", "getHorseRaceAcrosswinner", `
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

  add("vlslide-1", "apis", "getHorseRaceSummary", `
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

  add("vlslide-1", "apis", "getIndividualSummary", `
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

  add("vlslide-1", "apis", "getJunkSummary", `
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

  add("vlslide-1", "apis", "getMedalPlayAcrossWinner", `
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

  add("vlslide-1", "apis", "getModifiedStableFordWinner", `
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

  add("vlslide-1", "apis", "getNewLedgerDate", `
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

  add("vlslide-1", "apis", "getPayPalAccessToken", `
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

  add("vlslide-1", "apis", "getPaypalCredential", `
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

  add("vlslide-1", "apis", "getPlayerResult", `
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

  add("vlslide-1", "apis", "getProgassiveFoursomeWinner", `
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

  add("vlslide-1", "apis", "getQrLink", `
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

  add("vlslide-1", "apis", "getRabbitChickenSummary", `
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

  add("vlslide-1", "apis", "getRabitAndChickenWinner", `
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

  add("vlslide-1", "apis", "getRegularIndividualAcrossWinner", `
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

  add("vlslide-1", "apis", "getResult", `
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

  add("vlslide-1", "apis", "getScramble4man6HolesSummary", `
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

  add("vlslide-1", "apis", "getScrambleCodSummary", `
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

  add("vlslide-1", "apis", "getShotLedger", `
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

  add("vlslide-1", "apis", "getSkodeJunkWinner", `
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

  add("vlslide-1", "apis", "getSkodeSummary", `
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

  add("vlslide-1", "apis", "getSummary2v2", `
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

  add("vlslide-1", "apis", "getVegasFoursomeWinner", `
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

  add("vlslide-1", "apis", "reminderApi", `
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

  add("vlslide-1", "apis", "ryderCaptainsSummary", `
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

  add("vlslide-1", "apis", "ryderCaptainsWinner", `
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

  add("vlslide-1", "apis", "setOnsitePlayerLimit", `
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

  add("vlslide-1", "apis", "shareScorecardPdf", `
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

  add("vlslide-1", "apis", "shareWinnerAndScorecard", `
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

  add("vlslide-1", "apis", "startGame", `
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

  add("vlslide-1", "apis", "storePayPal", `
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

  add("vlslide-2", "apis", "addFoursomeTeeTime", `
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

  add("vlslide-2", "apis", "deleteGame", `
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

  add("vlslide-2", "apis", "endGame", `
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

  add("vlslide-2", "apis", "executePayment", `
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

  add("vlslide-2", "apis", "get2v2Summary", `
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

  add("vlslide-2", "apis", "get6HoleSummary2v2", `
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

  add("vlslide-2", "apis", "get6HolesCodSummary", `
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

  add("vlslide-2", "apis", "getAcrossIndividualSummary", `
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

  add("vlslide-2", "apis", "getAcrossWinner", `
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

  add("vlslide-2", "apis", "getAllPlayersResult", `
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

  add("vlslide-2", "apis", "getBasementSummary", `
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

  add("vlslide-2", "apis", "getBetTeeSheetPlayer", `
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

  add("vlslide-2", "apis", "getCalcuttaSummary", `
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

  add("vlslide-2", "apis", "getDotsGameSummary", `
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

  add("vlslide-2", "apis", "getDotsGameWinner", `
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

  add("vlslide-2", "apis", "getFoursome", `
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

  add("vlslide-2", "apis", "getFoursomeOverride", `
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

  add("vlslide-2", "apis", "getFoursomeTeam", `
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

  add("vlslide-2", "apis", "getGameDetails", `
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

  add("vlslide-2", "apis", "getHorseRaceAcrosswinner", `
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

  add("vlslide-2", "apis", "getHorseRaceSummary", `
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

  add("vlslide-2", "apis", "getIndividualSummary", `
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

  add("vlslide-2", "apis", "getJunkSummary", `
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

  add("vlslide-2", "apis", "getMedalPlayAcrossWinner", `
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

  add("vlslide-2", "apis", "getModifiedStableFordWinner", `
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

  add("vlslide-2", "apis", "getNewLedgerDate", `
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

  add("vlslide-2", "apis", "getPayPalAccessToken", `
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

  add("vlslide-2", "apis", "getPaypalCredential", `
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

  add("vlslide-2", "apis", "getPlayerResult", `
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

  add("vlslide-2", "apis", "getProgassiveFoursomeWinner", `
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

  add("vlslide-2", "apis", "getQrLink", `
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

  add("vlslide-2", "apis", "getRabbitChickenSummary", `
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

  add("vlslide-2", "apis", "getRabitAndChickenWinner", `
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

  add("vlslide-2", "apis", "getRegularIndividualAcrossWinner", `
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

  add("vlslide-2", "apis", "getResult", `
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

  add("vlslide-2", "apis", "getScramble4man6HolesSummary", `
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

  add("vlslide-2", "apis", "getScrambleCodSummary", `
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

  add("vlslide-2", "apis", "getShotLedger", `
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

  add("vlslide-2", "apis", "getSkodeJunkWinner", `
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

  add("vlslide-2", "apis", "getSkodeSummary", `
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

  add("vlslide-2", "apis", "getSummary2v2", `
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

  add("vlslide-2", "apis", "getVegasFoursomeWinner", `
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

  add("vlslide-2", "apis", "reminderApi", `
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

  add("vlslide-2", "apis", "ryderCaptainsSummary", `
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

  add("vlslide-2", "apis", "ryderCaptainsWinner", `
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

  add("vlslide-2", "apis", "setOnsitePlayerLimit", `
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

  add("vlslide-2", "apis", "shareScorecardPdf", `
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

  add("vlslide-2", "apis", "shareWinnerAndScorecard", `
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

  add("vlslide-2", "apis", "startGame", `
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

  add("vlslide-2", "apis", "storePayPal", `
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

  add("vlslide-3", "apis", "executePayment", `
// POST {{baseUrl}}/v1/payments/payment/\$paymentId/execute
// Controller: organizer_ledger_bottom_controller.dart → apiService.executePayment()

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

  add("vlslide-3", "apis", "getPayPalAccessToken", `
// POST {{baseUrl}}/v1/oauth2/token
// Controller: organizer_ledger_bottom_controller.dart → apiService.getPayPalAccessToken()

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

  add("vlslide-3", "apis", "getPaypalCredential", `
// GET {{baseUrl}}/api/paypal/client-id
// Controller: organizer_ledger_bottom_controller.dart → apiService.getPaypalCredential()

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

  add("vlslide-3", "apis", "reminderApi", `
// POST {{baseUrl}}/api/bank/pending/payment/reminder
// Controller: organizer_ledger_bottom_controller.dart → apiService.reminderApi()

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

  add("vlslide-3", "apis", "storePayPal", `
// POST {{baseUrl}}/api/transactions/details/store
// Controller: organizer_ledger_bottom_controller.dart → apiService.storePayPal()

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

  add("vlslide-4", "apis", "addFoursomeTeeTime", `
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

  add("vlslide-4", "apis", "deleteGame", `
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

  add("vlslide-4", "apis", "endGame", `
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

  add("vlslide-4", "apis", "executePayment", `
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

  add("vlslide-4", "apis", "get2v2Summary", `
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

  add("vlslide-4", "apis", "get6HoleSummary2v2", `
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

  add("vlslide-4", "apis", "get6HolesCodSummary", `
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

  add("vlslide-4", "apis", "getAcrossIndividualSummary", `
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

  add("vlslide-4", "apis", "getAcrossWinner", `
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

  add("vlslide-4", "apis", "getAllPlayersResult", `
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

  add("vlslide-4", "apis", "getBasementSummary", `
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

  add("vlslide-4", "apis", "getBetTeeSheetPlayer", `
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

  add("vlslide-4", "apis", "getCalcuttaSummary", `
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

  add("vlslide-4", "apis", "getDotsGameSummary", `
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

  add("vlslide-4", "apis", "getDotsGameWinner", `
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

  add("vlslide-4", "apis", "getFoursome", `
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

  add("vlslide-4", "apis", "getFoursomeOverride", `
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

  add("vlslide-4", "apis", "getFoursomeTeam", `
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

  add("vlslide-4", "apis", "getGameDetails", `
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

  add("vlslide-4", "apis", "getHorseRaceAcrosswinner", `
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

  add("vlslide-4", "apis", "getHorseRaceSummary", `
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

  add("vlslide-4", "apis", "getIndividualSummary", `
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

  add("vlslide-4", "apis", "getJunkSummary", `
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

  add("vlslide-4", "apis", "getMedalPlayAcrossWinner", `
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

  add("vlslide-4", "apis", "getModifiedStableFordWinner", `
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

  add("vlslide-4", "apis", "getNewLedgerDate", `
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

  add("vlslide-4", "apis", "getPayPalAccessToken", `
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

  add("vlslide-4", "apis", "getPaypalCredential", `
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

  add("vlslide-4", "apis", "getPlayerResult", `
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

  add("vlslide-4", "apis", "getProgassiveFoursomeWinner", `
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

  add("vlslide-4", "apis", "getQrLink", `
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

  add("vlslide-4", "apis", "getRabbitChickenSummary", `
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

  add("vlslide-4", "apis", "getRabitAndChickenWinner", `
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

  add("vlslide-4", "apis", "getRegularIndividualAcrossWinner", `
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

  add("vlslide-4", "apis", "getResult", `
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

  add("vlslide-4", "apis", "getScramble4man6HolesSummary", `
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

  add("vlslide-4", "apis", "getScrambleCodSummary", `
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

  add("vlslide-4", "apis", "getShotLedger", `
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

  add("vlslide-4", "apis", "getSkodeJunkWinner", `
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

  add("vlslide-4", "apis", "getSkodeSummary", `
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

  add("vlslide-4", "apis", "getSummary2v2", `
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

  add("vlslide-4", "apis", "getVegasFoursomeWinner", `
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

  add("vlslide-4", "apis", "reminderApi", `
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

  add("vlslide-4", "apis", "ryderCaptainsSummary", `
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

  add("vlslide-4", "apis", "ryderCaptainsWinner", `
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

  add("vlslide-4", "apis", "setOnsitePlayerLimit", `
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

  add("vlslide-4", "apis", "shareScorecardPdf", `
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

  add("vlslide-4", "apis", "shareWinnerAndScorecard", `
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

  add("vlslide-4", "apis", "startGame", `
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

  add("vlslide-4", "apis", "storePayPal", `
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
// DELETE {{baseUrl}}/api/course/\$id/delete
// Controller: course_controller.dart → apiService.deleteCourse()

Dart Method:
  apiService.deleteCourse({
    id: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  DELETE {{baseUrl}}/api/course/\$id/delete
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

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

  add("wslide-2", "apis", "getFilterCourseList", `
// GET {{baseUrl}}/api/course?city=\$city&state=\$state&country=\$countryCode
// Controller: course_controller.dart → apiService.getFilterCourseList()

Dart Method:
  apiService.getFilterCourseList({
    city: String,
    state: String,
    countryCode: String
  }) → Future&lt;CourseListModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/course?city=\$city&state=\$state&country=\$countryCode
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CourseListModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-3", "apis", "deleteEvent", `
// DELETE {{baseUrl}}/api/event/\$id/delete
// Controller: home_controller.dart → apiService.deleteEvent()

Dart Method:
  apiService.deleteEvent({
    id: String,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  DELETE {{baseUrl}}/api/event/\$id/delete
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-3", "apis", "deleteGame", `
// DELETE {{baseUrl}}/api/games/\$id/delete
// Controller: home_controller.dart → apiService.deleteGame()

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
// DELETE {{baseUrl}}/api/event/\$id/delete
// Controller: games_and_events_controller.dart → apiService.deleteEvent()

Dart Method:
  apiService.deleteEvent({
    id: String,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  DELETE {{baseUrl}}/api/event/\$id/delete
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-4", "apis", "deleteGame", `
// DELETE {{baseUrl}}/api/games/\$id/delete
// Controller: games_and_events_controller.dart → apiService.deleteGame()

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

  add("wslide-5", "apis", "createGame", `
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

  add("wslide-5", "apis", "getCourseTeesPositions", `
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

  add("wslide-6", "apis", "endGame", `
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

  add("wslide-6", "apis", "executePayment", `
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

  add("wslide-6", "apis", "get2v2Summary", `
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

  add("wslide-6", "apis", "get6HoleSummary2v2", `
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

  add("wslide-6", "apis", "get6HolesCodSummary", `
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

  add("wslide-6", "apis", "getAcrossIndividualSummary", `
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

  add("wslide-6", "apis", "getAcrossWinner", `
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

  add("wslide-6", "apis", "getAllPlayersResult", `
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

  add("wslide-6", "apis", "getBasementSummary", `
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

  add("wslide-6", "apis", "getBetTeeSheetPlayer", `
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

  add("wslide-6", "apis", "getCalcuttaSummary", `
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

  add("wslide-6", "apis", "getDotsGameSummary", `
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

  add("wslide-6", "apis", "getDotsGameWinner", `
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

  add("wslide-6", "apis", "getFoursome", `
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

  add("wslide-6", "apis", "getFoursomeOverride", `
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

  add("wslide-6", "apis", "getFoursomeTeam", `
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

  add("wslide-6", "apis", "getGameDetails", `
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

  add("wslide-6", "apis", "getHorseRaceAcrosswinner", `
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

  add("wslide-6", "apis", "getHorseRaceSummary", `
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

  add("wslide-6", "apis", "getIndividualSummary", `
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

  add("wslide-6", "apis", "getJunkSummary", `
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

  add("wslide-6", "apis", "getMedalPlayAcrossWinner", `
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

  add("wslide-6", "apis", "getModifiedStableFordWinner", `
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

  add("wslide-6", "apis", "getNewLedgerDate", `
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

  add("wslide-6", "apis", "getProgassiveFoursomeWinner", `
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

  add("wslide-6", "apis", "getQrLink", `
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

  add("wslide-6", "apis", "getRabbitChickenSummary", `
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

  add("wslide-6", "apis", "getRabitAndChickenWinner", `
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

  add("wslide-6", "apis", "getRegularIndividualAcrossWinner", `
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

  add("wslide-6", "apis", "getResult", `
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

  add("wslide-6", "apis", "getScramble4man6HolesSummary", `
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

  add("wslide-6", "apis", "getScrambleCodSummary", `
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

  add("wslide-6", "apis", "getShotLedger", `
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

  add("wslide-6", "apis", "getSkodeJunkWinner", `
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

  add("wslide-6", "apis", "getSkodeSummary", `
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

  add("wslide-6", "apis", "getSummary2v2", `
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

  add("wslide-6", "apis", "getVegasFoursomeWinner", `
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

  add("wslide-6", "apis", "ryderCaptainsWinner", `
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

  add("wslide-6", "apis", "shareWinnerAndScorecard", `
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

  add("wslide-6", "apis", "startGame", `
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

  add("wslide-7", "apis", "getBetTeeSheetPlayer", `
// GET {{baseUrl}}/api/teesheet/course/\$courseId/groups/details?game_type=\$gameType
// Controller: add_bet_bottom_sheet_controller.dart → apiService.getBetTeeSheetPlayer()

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

  add("wslide-7", "apis", "getGameDetails", `
// GET {{baseUrl}}/api/games/\$gameId/details
// Controller: add_bet_bottom_sheet_controller.dart → apiService.getGameDetails()

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
// GET {{baseUrl}}/api/foursome/\$foursomeId/game/end
// Controller: add_score_controller.dart → apiService.endFourSome()

Dart Method:
  apiService.endFourSome({
    foursomeId: int,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/foursome/\$foursomeId/game/end
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-8", "apis", "getCalcuttaRounds", `
// GET {{baseUrl}}/api/games/calcutta/game/\$gameId/round/players
// Controller: add_score_controller.dart → apiService.getCalcuttaRounds()

Dart Method:
  apiService.getCalcuttaRounds({
    gameId: String
  }) → Future&lt;CalcuttaRoundsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/calcutta/game/\$gameId/round/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaRoundsModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-8", "apis", "getCompletedHoles", `
// GET {{baseUrl}}/api/scorecard/game/\$gameId/completed/holes
// Controller: add_score_controller.dart → apiService.getCompletedHoles()

Dart Method:
  apiService.getCompletedHoles({
    gameId: int,
    organizationId: String
  }) → Future&lt;CompletedHolesModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/\$gameId/completed/holes
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CompletedHolesModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-8", "apis", "getFoursome", `
// GET {{baseUrl}}/api/games/\$gameID/foursomes/list
// Controller: add_score_controller.dart → apiService.getFoursome()

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
// GET {{baseUrl}}/api/scorecard/game/\$gameId/hole/\$holeNo/foursome/\$foursomeId/bet/details
// Controller: input_score_controller.dart → apiService.getBetDetails()

Dart Method:
  apiService.getBetDetails({
    gameId: int,
    holeNo: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;BetDetailsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/\$gameId/hole/\$holeNo/foursome/\$foursomeId/bet/details
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (BetDetailsModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-9", "apis", "getFoursomeOverride", `
// GET {{baseUrl}}/api/games/\$gameID/foursome/\$foursomeId/override
// Controller: input_score_controller.dart → apiService.getFoursomeOverride()

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

  add("wslide-9", "apis", "getFoursomeTeam", `
// GET {{baseUrl}}/api/result/game/\$gameID/foursome/\$foursomeId/team/points
// Controller: input_score_controller.dart → apiService.getFoursomeTeam()

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

  add("wslide-9", "apis", "getGameDetails", `
// GET {{baseUrl}}/api/games/\$gameId/details
// Controller: input_score_controller.dart → apiService.getGameDetails()

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

  add("wslide-9", "apis", "getHoleData", `
// GET {{baseUrl}}/api/scorecard/game/\$gameId/hole/\$holeId/list?foursome_id=\$fourSomeId
// Controller: input_score_controller.dart → apiService.getHoleData()

Dart Method:
  apiService.getHoleData({
    gameId: int,
    holeId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;HoleDetailsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/\$gameId/hole/\$holeId/list?foursome_id=\$fourSomeId
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
// GET {{baseUrl}}/api/personal-game/\$gameId/hole/\${int.tryParse(holeNo.toString())?.toString()}/scorecard
// Controller: input_score_controller.dart → apiService.getPersonalGameHoleData()

Dart Method:
  apiService.getPersonalGameHoleData({
    gameId: int,
    holeNo: String
  }) → Future&lt;PersonalGameHoleDataModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/personal-game/\$gameId/hole/\${int.tryParse(holeNo.toString())?.toString()}/scorecard
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (PersonalGameHoleDataModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-9", "apis", "getPersonalGameResult", `
// GET {{baseUrl}}/api/personal-game/\$gameId/result
// Controller: input_score_controller.dart → apiService.getPersonalGameResult()

Dart Method:
  apiService.getPersonalGameResult({
    gameId: int
  }) → Future&lt;GameResultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/personal-game/\$gameId/result
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameResultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("wslide-9", "apis", "getResult", `
// GET {{baseUrl}}/api/result/game/\$gameId?foursome_id=\$foursomeId
// Controller: input_score_controller.dart → apiService.getResult()

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
// GET {{baseUrl}}/api/scorecard/game/\$gameId/foursome/\$foursomeId/bet/details
// Controller: input_score_controller.dart → apiService.getSkodeJunkHoleDetails()

Dart Method:
  apiService.getSkodeJunkHoleDetails({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;SkodejunkHoleModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/\$gameId/foursome/\$foursomeId/bet/details
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

  add("asslide-0", "apis", "endFourSome", `
// GET {{baseUrl}}/api/foursome/\$foursomeId/game/end
// Controller: add_score_controller.dart → apiService.endFourSome()

Dart Method:
  apiService.endFourSome({
    foursomeId: int,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/foursome/\$foursomeId/game/end
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-0", "apis", "getCalcuttaRounds", `
// GET {{baseUrl}}/api/games/calcutta/game/\$gameId/round/players
// Controller: add_score_controller.dart → apiService.getCalcuttaRounds()

Dart Method:
  apiService.getCalcuttaRounds({
    gameId: String
  }) → Future&lt;CalcuttaRoundsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/calcutta/game/\$gameId/round/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaRoundsModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-0", "apis", "getCompletedHoles", `
// GET {{baseUrl}}/api/scorecard/game/\$gameId/completed/holes
// Controller: add_score_controller.dart → apiService.getCompletedHoles()

Dart Method:
  apiService.getCompletedHoles({
    gameId: int,
    organizationId: String
  }) → Future&lt;CompletedHolesModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/\$gameId/completed/holes
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CompletedHolesModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-0", "apis", "getFoursome", `
// GET {{baseUrl}}/api/games/\$gameID/foursomes/list
// Controller: add_score_controller.dart → apiService.getFoursome()

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
// GET {{baseUrl}}/api/foursome/\$foursomeId/players
// Controller: foursome_bottom_controller.dart → apiService.getFourSomePlayer()

Dart Method:
  apiService.getFourSomePlayer({
    foursomeId: String?
  }) → Future&lt;TeesheetOnlyPlayerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/foursome/\$foursomeId/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (TeesheetOnlyPlayerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-2", "apis", "getVegasCodMatches", `
// GET {{baseUrl}}/api/games/\$gameID/foursome/\$foursomeId/generate/matches
// Controller: vegas_match_config_bottom_controller.dart → apiService.getVegasCodMatches()

Dart Method:
  apiService.getVegasCodMatches({
    gameID: String,
    foursomeId
  }) → Future&lt;VegasCodModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/\$gameID/foursome/\$foursomeId/generate/matches
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (VegasCodModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-3", "apis", "endFourSome", `
// GET {{baseUrl}}/api/foursome/\$foursomeId/game/end
// Controller: add_score_controller.dart → apiService.endFourSome()

Dart Method:
  apiService.endFourSome({
    foursomeId: int,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/foursome/\$foursomeId/game/end
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-3", "apis", "getCalcuttaRounds", `
// GET {{baseUrl}}/api/games/calcutta/game/\$gameId/round/players
// Controller: add_score_controller.dart → apiService.getCalcuttaRounds()

Dart Method:
  apiService.getCalcuttaRounds({
    gameId: String
  }) → Future&lt;CalcuttaRoundsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/calcutta/game/\$gameId/round/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaRoundsModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-3", "apis", "getCompletedHoles", `
// GET {{baseUrl}}/api/scorecard/game/\$gameId/completed/holes
// Controller: add_score_controller.dart → apiService.getCompletedHoles()

Dart Method:
  apiService.getCompletedHoles({
    gameId: int,
    organizationId: String
  }) → Future&lt;CompletedHolesModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/\$gameId/completed/holes
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CompletedHolesModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-3", "apis", "getFoursome", `
// GET {{baseUrl}}/api/games/\$gameID/foursomes/list
// Controller: add_score_controller.dart → apiService.getFoursome()

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
// GET {{baseUrl}}/api/foursome/\$foursomeId/players
// Controller: foursome_bet_bottom_controller.dart → apiService.getFourSomePlayer()

Dart Method:
  apiService.getFourSomePlayer({
    foursomeId: String?
  }) → Future&lt;TeesheetOnlyPlayerModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/foursome/\$foursomeId/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (TeesheetOnlyPlayerModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-4", "apis", "getFoursomeOverride", `
// GET {{baseUrl}}/api/games/\$gameID/foursome/\$foursomeId/override
// Controller: foursome_bet_bottom_controller.dart → apiService.getFoursomeOverride()

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

  add("asslide-5", "apis", "endFourSome", `
// GET {{baseUrl}}/api/foursome/\$foursomeId/game/end
// Controller: add_score_controller.dart → apiService.endFourSome()

Dart Method:
  apiService.endFourSome({
    foursomeId: int,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/foursome/\$foursomeId/game/end
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-5", "apis", "getCalcuttaRounds", `
// GET {{baseUrl}}/api/games/calcutta/game/\$gameId/round/players
// Controller: add_score_controller.dart → apiService.getCalcuttaRounds()

Dart Method:
  apiService.getCalcuttaRounds({
    gameId: String
  }) → Future&lt;CalcuttaRoundsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/calcutta/game/\$gameId/round/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaRoundsModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-5", "apis", "getCompletedHoles", `
// GET {{baseUrl}}/api/scorecard/game/\$gameId/completed/holes
// Controller: add_score_controller.dart → apiService.getCompletedHoles()

Dart Method:
  apiService.getCompletedHoles({
    gameId: int,
    organizationId: String
  }) → Future&lt;CompletedHolesModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/\$gameId/completed/holes
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CompletedHolesModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-5", "apis", "getFoursome", `
// GET {{baseUrl}}/api/games/\$gameID/foursomes/list
// Controller: add_score_controller.dart → apiService.getFoursome()

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
// GET {{baseUrl}}/api/foursome/\$foursomeId/game/end
// Controller: add_score_controller.dart → apiService.endFourSome()

Dart Method:
  apiService.endFourSome({
    foursomeId: int,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/foursome/\$foursomeId/game/end
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-6", "apis", "getCalcuttaRounds", `
// GET {{baseUrl}}/api/games/calcutta/game/\$gameId/round/players
// Controller: add_score_controller.dart → apiService.getCalcuttaRounds()

Dart Method:
  apiService.getCalcuttaRounds({
    gameId: String
  }) → Future&lt;CalcuttaRoundsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/calcutta/game/\$gameId/round/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaRoundsModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-6", "apis", "getCompletedHoles", `
// GET {{baseUrl}}/api/scorecard/game/\$gameId/completed/holes
// Controller: add_score_controller.dart → apiService.getCompletedHoles()

Dart Method:
  apiService.getCompletedHoles({
    gameId: int,
    organizationId: String
  }) → Future&lt;CompletedHolesModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/\$gameId/completed/holes
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CompletedHolesModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-6", "apis", "getFoursome", `
// GET {{baseUrl}}/api/games/\$gameID/foursomes/list
// Controller: add_score_controller.dart → apiService.getFoursome()

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
// GET {{baseUrl}}/api/scorecard/game/\$gameId/hole/\$holeNo/foursome/\$foursomeId/bet/details
// Controller: input_score_controller.dart → apiService.getBetDetails()

Dart Method:
  apiService.getBetDetails({
    gameId: int,
    holeNo: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;BetDetailsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/\$gameId/hole/\$holeNo/foursome/\$foursomeId/bet/details
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (BetDetailsModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "getFoursomeOverride", `
// GET {{baseUrl}}/api/games/\$gameID/foursome/\$foursomeId/override
// Controller: input_score_controller.dart → apiService.getFoursomeOverride()

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

  add("asslide-7", "apis", "getFoursomeTeam", `
// GET {{baseUrl}}/api/result/game/\$gameID/foursome/\$foursomeId/team/points
// Controller: input_score_controller.dart → apiService.getFoursomeTeam()

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

  add("asslide-7", "apis", "getGameDetails", `
// GET {{baseUrl}}/api/games/\$gameId/details
// Controller: input_score_controller.dart → apiService.getGameDetails()

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

  add("asslide-7", "apis", "getHoleData", `
// GET {{baseUrl}}/api/scorecard/game/\$gameId/hole/\$holeId/list?foursome_id=\$fourSomeId
// Controller: input_score_controller.dart → apiService.getHoleData()

Dart Method:
  apiService.getHoleData({
    gameId: int,
    holeId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;HoleDetailsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/\$gameId/hole/\$holeId/list?foursome_id=\$fourSomeId
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
// GET {{baseUrl}}/api/personal-game/\$gameId/hole/\${int.tryParse(holeNo.toString())?.toString()}/scorecard
// Controller: input_score_controller.dart → apiService.getPersonalGameHoleData()

Dart Method:
  apiService.getPersonalGameHoleData({
    gameId: int,
    holeNo: String
  }) → Future&lt;PersonalGameHoleDataModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/personal-game/\$gameId/hole/\${int.tryParse(holeNo.toString())?.toString()}/scorecard
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (PersonalGameHoleDataModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "getPersonalGameResult", `
// GET {{baseUrl}}/api/personal-game/\$gameId/result
// Controller: input_score_controller.dart → apiService.getPersonalGameResult()

Dart Method:
  apiService.getPersonalGameResult({
    gameId: int
  }) → Future&lt;GameResultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/personal-game/\$gameId/result
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameResultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-7", "apis", "getResult", `
// GET {{baseUrl}}/api/result/game/\$gameId?foursome_id=\$foursomeId
// Controller: input_score_controller.dart → apiService.getResult()

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
// GET {{baseUrl}}/api/scorecard/game/\$gameId/foursome/\$foursomeId/bet/details
// Controller: input_score_controller.dart → apiService.getSkodeJunkHoleDetails()

Dart Method:
  apiService.getSkodeJunkHoleDetails({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;SkodejunkHoleModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/\$gameId/foursome/\$foursomeId/bet/details
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
// GET {{baseUrl}}/api/scorecard/game/\$gameId/hole/\$holeNo/foursome/\$foursomeId/bet/details
// Controller: input_score_controller.dart → apiService.getBetDetails()

Dart Method:
  apiService.getBetDetails({
    gameId: int,
    holeNo: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;BetDetailsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/\$gameId/hole/\$holeNo/foursome/\$foursomeId/bet/details
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (BetDetailsModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "getFoursomeOverride", `
// GET {{baseUrl}}/api/games/\$gameID/foursome/\$foursomeId/override
// Controller: input_score_controller.dart → apiService.getFoursomeOverride()

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

  add("asslide-8", "apis", "getFoursomeTeam", `
// GET {{baseUrl}}/api/result/game/\$gameID/foursome/\$foursomeId/team/points
// Controller: input_score_controller.dart → apiService.getFoursomeTeam()

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

  add("asslide-8", "apis", "getGameDetails", `
// GET {{baseUrl}}/api/games/\$gameId/details
// Controller: input_score_controller.dart → apiService.getGameDetails()

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

  add("asslide-8", "apis", "getHoleData", `
// GET {{baseUrl}}/api/scorecard/game/\$gameId/hole/\$holeId/list?foursome_id=\$fourSomeId
// Controller: input_score_controller.dart → apiService.getHoleData()

Dart Method:
  apiService.getHoleData({
    gameId: int,
    holeId: int,
    fourSomeId: int,
    organizationId: String
  }) → Future&lt;HoleDetailsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/\$gameId/hole/\$holeId/list?foursome_id=\$fourSomeId
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
// GET {{baseUrl}}/api/personal-game/\$gameId/hole/\${int.tryParse(holeNo.toString())?.toString()}/scorecard
// Controller: input_score_controller.dart → apiService.getPersonalGameHoleData()

Dart Method:
  apiService.getPersonalGameHoleData({
    gameId: int,
    holeNo: String
  }) → Future&lt;PersonalGameHoleDataModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/personal-game/\$gameId/hole/\${int.tryParse(holeNo.toString())?.toString()}/scorecard
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (PersonalGameHoleDataModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "getPersonalGameResult", `
// GET {{baseUrl}}/api/personal-game/\$gameId/result
// Controller: input_score_controller.dart → apiService.getPersonalGameResult()

Dart Method:
  apiService.getPersonalGameResult({
    gameId: int
  }) → Future&lt;GameResultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/personal-game/\$gameId/result
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (GameResultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-8", "apis", "getResult", `
// GET {{baseUrl}}/api/result/game/\$gameId?foursome_id=\$foursomeId
// Controller: input_score_controller.dart → apiService.getResult()

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
// GET {{baseUrl}}/api/scorecard/game/\$gameId/foursome/\$foursomeId/bet/details
// Controller: input_score_controller.dart → apiService.getSkodeJunkHoleDetails()

Dart Method:
  apiService.getSkodeJunkHoleDetails({
    gameId: int,
    foursomeId: int,
    organizationId: String
  }) → Future&lt;SkodejunkHoleModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/\$gameId/foursome/\$foursomeId/bet/details
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
// GET {{baseUrl}}/api/foursome/\$foursomeId/game/end
// Controller: add_score_controller.dart → apiService.endFourSome()

Dart Method:
  apiService.endFourSome({
    foursomeId: int,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/foursome/\$foursomeId/game/end
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-10", "apis", "getCalcuttaRounds", `
// GET {{baseUrl}}/api/games/calcutta/game/\$gameId/round/players
// Controller: add_score_controller.dart → apiService.getCalcuttaRounds()

Dart Method:
  apiService.getCalcuttaRounds({
    gameId: String
  }) → Future&lt;CalcuttaRoundsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/calcutta/game/\$gameId/round/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaRoundsModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-10", "apis", "getCompletedHoles", `
// GET {{baseUrl}}/api/scorecard/game/\$gameId/completed/holes
// Controller: add_score_controller.dart → apiService.getCompletedHoles()

Dart Method:
  apiService.getCompletedHoles({
    gameId: int,
    organizationId: String
  }) → Future&lt;CompletedHolesModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/\$gameId/completed/holes
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CompletedHolesModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-10", "apis", "getFoursome", `
// GET {{baseUrl}}/api/games/\$gameID/foursomes/list
// Controller: add_score_controller.dart → apiService.getFoursome()

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
// GET {{baseUrl}}/api/foursome/\$foursomeId/game/end
// Controller: add_score_controller.dart → apiService.endFourSome()

Dart Method:
  apiService.endFourSome({
    foursomeId: int,
    organizationId: String
  }) → Future&lt;DefaultModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/foursome/\$foursomeId/game/end
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (DefaultModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-11", "apis", "getCalcuttaRounds", `
// GET {{baseUrl}}/api/games/calcutta/game/\$gameId/round/players
// Controller: add_score_controller.dart → apiService.getCalcuttaRounds()

Dart Method:
  apiService.getCalcuttaRounds({
    gameId: String
  }) → Future&lt;CalcuttaRoundsModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/games/calcutta/game/\$gameId/round/players
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CalcuttaRoundsModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-11", "apis", "getCompletedHoles", `
// GET {{baseUrl}}/api/scorecard/game/\$gameId/completed/holes
// Controller: add_score_controller.dart → apiService.getCompletedHoles()

Dart Method:
  apiService.getCompletedHoles({
    gameId: int,
    organizationId: String
  }) → Future&lt;CompletedHolesModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/scorecard/game/\$gameId/completed/holes
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (CompletedHolesModel):
  {
    "error":   false,
    "message": "..."
  }
`);

  add("asslide-11", "apis", "getFoursome", `
// GET {{baseUrl}}/api/games/\$gameID/foursomes/list
// Controller: add_score_controller.dart → apiService.getFoursome()

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

  // ── Leaderboard screens — all game types ──
  var _leaderboardLive = `
// GET {{baseUrl}}/api/leaderboard/game/\${gameId}/foursome/\${foursomeId}
// Controller: leader_board_screen_controller.dart → ApiServices().liveLeaderboard()

Dart Method:
  ApiServices().liveLeaderboard({
    gameId: String,
    foursomeId: String,
    organizationId: String
  }) → Future&lt;LiveLeaderBoardModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/leaderboard/game/\${gameId}/foursome/\${foursomeId}
  X-Organization-Id: \${organizationId}
  Authorization: Bearer {{accessToken}}

Response (LiveLeaderBoardModel):
  {
    "error":   false,
    "message": "...",
    "allover_leaderboard": [...],
    "foursome_leaderboard": [...],
    "skin_leaderboard": [...],
    "greenie_leaderboard": [...],
    "ld_leaderboard": [...],
    "ctp_leaderboard": [...]
  }
`;
  var _leaderboardAcross = `
// GET {{baseUrl}}/api/leaderboard/game/\${gameId}/across
// Controller: leader_board_screen_controller.dart → ApiServices().getAcrossLeadrboard()

Dart Method:
  ApiServices().getAcrossLeadrboard({
    gameId: String
  }) → Future&lt;AcrossLeaderboardModel&gt;

HTTP Request:
  GET {{baseUrl}}/api/leaderboard/game/\${gameId}/across
  X-Organization-Id: all
  Authorization: Bearer {{accessToken}}

Response (AcrossLeaderboardModel):
  {
    "error":   false,
    "message": "...",
    "across_leaderboard": [...]
  }
`;
  // asslide-9 is the base key; all game-type-specific leaderboard keys
  // (asslide-321milo-9, asslide-vegas-9, etc.) fall back to this entry
  // via asslideBaseKey() in script.js when they have no entries of their own.
  add("asslide-9", "apis", "liveLeaderboard", _leaderboardLive);
  add("asslide-9", "apis", "getAcrossLeadrboard", _leaderboardAcross);

})();
