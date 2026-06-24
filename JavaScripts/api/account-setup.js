// ============================================================
// API Docs — Account Setup (sslide-0 … sslide-3)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

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
})();
