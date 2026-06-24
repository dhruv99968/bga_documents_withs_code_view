// ============================================================
// Flutter — Account Setup (sslide-0 … sslide-3)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  add("sslide-0", "flutter", "signup_screen.dart", `
`);

  add("sslide-0", "flutter", "signup_controller.dart", `
`);

  add("sslide-1", "flutter", "otp_screen.dart", `
`);

  add("sslide-1", "flutter", "otp_controller.dart", `
`);

  add("sslide-2", "flutter", "change_password_screen.dart", `
`);

  add("sslide-2", "flutter", "change_password_controller.dart", `
`);

  add("sslide-3", "flutter", "course_screen.dart", `
`);

  add("sslide-3", "flutter", "course_controller.dart", `
`);
})();
