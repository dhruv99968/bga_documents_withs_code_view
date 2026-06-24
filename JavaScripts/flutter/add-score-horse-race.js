// ============================================================
// Flutter — Add Score: HORSE RACE game type (unique steps 0–3)
// ============================================================
// Keys: asslide-horse_race-0 … asslide-horse_race-3
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  // ── Step 0 — Game Setup ───────────────────────────────────
  add("asslide-horse_race-0", "flutter", "add_score.dart",
    '// Horse Race — Game Setup\n// Reuses add_score.dart — see asslide-0 for full source.\n// Shows number-of-teams, holes, and bet-amount config fields.\n');
  add("asslide-horse_race-0", "flutter", "add_score_controller.dart",
    '// Horse Race Controller — Game Setup\n// Reuses add_score_controller.dart — see asslide-0 for full source.\n');

  // ── Step 1 — Across Foursome Teams ───────────────────────
  add("asslide-horse_race-1", "flutter", "horse_acrrosse_select_team_bottom.dart", `
`);
  add("asslide-horse_race-1", "flutter", "horse_across_select_bottom_controller.dart", `
`);

  // ── Step 2 — Assign Teams ─────────────────────────────────
  add("asslide-horse_race-2", "flutter", "horse_race_group_team_bottom.dart", `
`);
  add("asslide-horse_race-2", "flutter", "horse_race_group_team_bottom_controller.dart", `
`);

  // ── Step 3 — Team Selection / Review ─────────────────────
  // Reuses HorseAcrosseSelectTeamBottom for the final summary + confirm
  add("asslide-horse_race-3", "flutter", "horse_acrrosse_select_team_bottom.dart",
    '// Horse Race — Team Selection Review\n// Reuses HorseAcrosseSelectTeamBottom — see asslide-horse_race-1 for full source.\n// Read-only summary; "Confirm" button locks teams before scoring starts.\n');
  add("asslide-horse_race-3", "flutter", "horse_across_select_bottom_controller.dart",
    '// Horse Race Controller — Team Review / Confirm\n// Reuses HorseAcrossSelectBottomController — see asslide-horse_race-1 for full source.\n// onNext() calls confirmTeams() API instead of simple back().\n');

})();
