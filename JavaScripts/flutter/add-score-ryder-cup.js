// ============================================================
// Flutter — Add Score: RYDER CUP game type (unique steps 0–9)
// ============================================================
// Keys: asslide-ryder_cup-0 … asslide-ryder_cup-9
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  // ── Step 0 — Captain Selection ────────────────────────────
  add("asslide-ryder_cup-0", "flutter", "add_score.dart",
    '// Ryder Cup — Captain Selection\n// Reuses add_score.dart — see asslide-0 for full source.\n// The screen shows two team panels; captain is highlighted with a crown icon.\n');
  add("asslide-ryder_cup-0", "flutter", "add_score_controller.dart",
    '// Ryder Cup Controller — Captain Selection\n// Reuses add_score_controller.dart — see asslide-0 for full source.\n');

  // ── Step 1 — Pick Players (Draft) ─────────────────────────
  add("asslide-ryder_cup-1", "flutter", "add_score.dart",
    '// Ryder Cup — Pick Players (draft)\n// Reuses add_score.dart — see asslide-0 for full source.\n// Captains alternate picks; screen shows remaining pool and drafted lists.\n');
  add("asslide-ryder_cup-1", "flutter", "add_score_controller.dart",
    '// Ryder Cup Controller — Pick Players\n// Reuses add_score_controller.dart — see asslide-0 for full source.\n');

  // ── Step 2 — Select Players (final confirmation) ──────────
  add("asslide-ryder_cup-2", "flutter", "pick_player_bottom_sheet.dart", `
`);
  add("asslide-ryder_cup-2", "flutter", "pick_bottom_sheet_controller.dart", `
`);

  // ── Step 3 — Tee Time (reuses pick_player_bottom_sheet) ───
  add("asslide-ryder_cup-3", "flutter", "pick_player_bottom_sheet.dart",
    '// Ryder Cup — Tee Time\n// Reuses PickPlayerBottomSheet layout — see asslide-ryder_cup-2 for full source.\n// Each foursome row shows a time-picker instead of a captain icon.\n');
  add("asslide-ryder_cup-3", "flutter", "pick_bottom_sheet_controller.dart",
    '// Ryder Cup Controller — Tee Time\n// Extends PickBottomSheetController with tee-time saving.\n// See asslide-ryder_cup-2 for full controller source.\n');

  // ── Step 4 — Player Selection (Foursomes) ─────────────────
  add("asslide-ryder_cup-4", "flutter", "select_single_player_bottom_sheet.dart", `
`);
  add("asslide-ryder_cup-4", "flutter", "single_player_select_bottom_controller.dart", `
`);

  // ── Step 5 — All Foursomes Done (reuses step-4) ───────────
  add("asslide-ryder_cup-5", "flutter", "pick_player_bottom_sheet.dart",
    '// Ryder Cup — All Foursomes Done\n// Reuses PickPlayerBottomSheet for summary view — see asslide-ryder_cup-2.\n// Read-only; button navigates to Generate Match step.\n');
  add("asslide-ryder_cup-5", "flutter", "pick_bottom_sheet_controller.dart",
    '// Ryder Cup Controller — All Foursomes Done\n// Reuses PickBottomSheetController — see asslide-ryder_cup-2 for full source.\n');

  // ── Step 6 — Generate Match ───────────────────────────────
  add("asslide-ryder_cup-6", "flutter", "add_score.dart",
    '// Ryder Cup — Generate Match\n// Reuses add_score.dart — see asslide-0 for full source.\n// Calls generateRyderCupMatches() on load.\n');
  add("asslide-ryder_cup-6", "flutter", "add_score_controller.dart",
    '// Ryder Cup Controller — Generate Match\n// Reuses add_score_controller.dart — see asslide-0 for full source.\n');

  // ── Step 7 — Confirm ──────────────────────────────────────
  add("asslide-ryder_cup-7", "flutter", "add_score.dart",
    '// Ryder Cup — Confirm Matches\n// Reuses add_score.dart — see asslide-0 for full source.\n// Shows generated match pairs; confirm button locks in the draw.\n');
  add("asslide-ryder_cup-7", "flutter", "add_score_controller.dart",
    '// Ryder Cup Controller — Confirm\n// Reuses add_score_controller.dart — see asslide-0 for full source.\n');

  // ── Step 8 — Match Config ─────────────────────────────────
  add("asslide-ryder_cup-8", "flutter", "ryder_cup_custom_match_bottom.dart", `
`);
  add("asslide-ryder_cup-8", "flutter", "ryder_custom_match_bottom_controller.dart", `
`);

  // ── Step 9 — Add Score Entry (shared) ────────────────────
  add("asslide-ryder_cup-9", "flutter", "add_score.dart",
    '// Ryder Cup — Add Score Entry\n// Reuses add_score.dart — see asslide-0 for full source.\n');
  add("asslide-ryder_cup-9", "flutter", "add_score_controller.dart",
    '// Ryder Cup Controller — Add Score Entry\n// Reuses add_score_controller.dart — see asslide-0 for full source.\n');

})();
