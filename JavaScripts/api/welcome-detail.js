// ============================================================
// API Docs — Welcome Detail (welcome-detail)
// Auto-updated by inject_code.py — do not edit manually.
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  // -- welcome-detail : Welcome Screen --
  add("welcome-detail", "apis", "checkAuthStatus", `// GET {{baseUrl}}/api/v1/auth/me
// Controller: welcome_controller.dart -> apiService.checkAuthStatus()

Dart Method:
  apiService.checkAuthStatus() -> Future<ApiResponse>

HTTP Request:
  GET {{baseUrl}}/api/v1/auth/me
  Authorization: Bearer {{accessToken}}

Response (ApiResponse):
  {
    "error": false,
    "data": {
      "id":    1,
      "name":  "John Doe",
      "email": "john@example.com",
      "role":  "organizer"
    }
  }

Note: Called on app launch to determine whether to show the
Welcome screen or redirect the authenticated user to Home.`);

  add("welcome-detail", "apis", "getOrganizationList", `// GET {{baseUrl}}/api/v1/organizations
// Controller: welcome_controller.dart -> apiService.getOrganizationList()

Dart Method:
  apiService.getOrganizationList() -> Future<ApiResponse>

HTTP Request:
  GET {{baseUrl}}/api/v1/organizations
  Authorization: Bearer {{accessToken}}

Response (ApiResponse):
  {
    "error": false,
    "data": [
      { "id": 1, "name": "BGA Golf Club", "logo": "https://cdn.example.com/logo.png" }
    ]
  }

Note: Loads the list of organizations the user belongs to
so the correct X-Organization-Id can be set globally.`);

})();