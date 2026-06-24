// ============================================================
// Flutter — Add Bets (addbets-detail)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  add("addbets-detail", "flutter", "add_bet_bottom_sheet.dart", `
`);

  add("addbets-detail", "flutter", "add_bet_bottom_sheet_controller.dart", `
`);
})();
