// ============================================================
// Flutter — Welcome Detail (welcome-detail)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  add("welcome-detail", "flutter", "welcome_screen.dart", `
`);

  add("welcome-detail", "flutter", "welcome_controller.dart", `
`);
})();
