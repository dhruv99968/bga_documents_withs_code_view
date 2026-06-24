// ============================================================
// Flutter — View Game Detail (viewgame-detail)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  add("viewgame-detail", "flutter", "game_details_screen.dart", `
`);

  add("viewgame-detail", "flutter", "game_details_controller.dart", `
`);
})();
