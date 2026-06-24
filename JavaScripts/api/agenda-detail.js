// ============================================================
// API Docs — Agenda Detail (agenda-detail)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

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
})();
