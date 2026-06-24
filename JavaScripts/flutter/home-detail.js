// ============================================================
// Flutter — Home Dashboard (home-detail)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  add("home-detail", "flutter", "home_screen.dart", `
`);

  add("home-detail", "flutter", "home_general_item.dart", `
`);

  add("home-detail", "flutter", "home_controller.dart", `
`);
})();
