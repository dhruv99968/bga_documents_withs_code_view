// ============================================================
// Flutter — Add Score: CALCUTTA game type (unique steps 0–17)
// ============================================================
// Keys: asslide-calcutta-0 … asslide-calcutta-17
//
// Shared screens (add_score.dart / add_score_controller.dart)
// are referenced with a note pointing to asslide-0 for the
// full source — no duplicate code stored here.
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }

  // ── Shared note helper ─────────────────────────────────────
  function sharedNote(filename, refKey) {
    return (
      '// This step reuses ' + filename + '\n' +
      '// Full source: see "' + refKey + '" (asslide-0 / asslide-1 entries)\n' +
      '// The screen and controller are identical; only the step title differs.\n'
    );
  }

  // ── Step 0 — Round-1 Select ────────────────────────────────
  // Uses add_score.dart + add_score_controller.dart (shared)
  add("asslide-calcutta-0", "flutter", "add_score.dart",
    sharedNote("add_score.dart", "asslide-0"));
  add("asslide-calcutta-0", "flutter", "add_score_controller.dart",
    sharedNote("add_score_controller.dart", "asslide-0"));

  // ── Step 1 — Player Sheet (Round-1) ───────────────────────
  add("asslide-calcutta-1", "flutter", "calcutta_round_one_bottom_sheet.dart", `
`);
  add("asslide-calcutta-1", "flutter", "calcutta_round_one_bottom_sheet_controller.dart", `
`);

  // ── Step 2 — Select & Bid ──────────────────────────────────
  add("asslide-calcutta-2", "flutter", "calcutta_round_select_player_bottom_sheet.dart", `
`);
  add("asslide-calcutta-2", "flutter", "calcutta_round_select_player_bottom_sheet_controller.dart", `
`);

  // ── Step 3 — Round-1 Done (reuses round-1 sheet screens) ──
  add("asslide-calcutta-3", "flutter", "calcutta_round_one_bottom_sheet.dart",
    '// Round-1 Done reuses CalcuttaRoundOneBottomSheet for the summary view.\n' +
    '// See asslide-calcutta-1 for the full source.\n' +
    '// The controller loads results with status=complete instead of open bids.\n');
  add("asslide-calcutta-3", "flutter", "calcutta_round_one_bottom_sheet_controller.dart",
    sharedNote("calcutta_round_one_bottom_sheet_controller.dart", "asslide-calcutta-1"));

  // ── Step 4 — Match Config ──────────────────────────────────
  // Uses add_score.dart (shared — config section rendered inline)
  add("asslide-calcutta-4", "flutter", "add_score.dart",
    sharedNote("add_score.dart", "asslide-0"));
  add("asslide-calcutta-4", "flutter", "add_score_controller.dart",
    sharedNote("add_score_controller.dart", "asslide-0"));

  // ── Step 5 — Player Selection ──────────────────────────────
  add("asslide-calcutta-5", "flutter", "caluctta_select_player_bottom_sheet.dart", `
`);
  add("asslide-calcutta-5", "flutter", "calcutta_player_select_bottom_controller.dart", `
`);

  // ── Step 6 — Card Distribution ────────────────────────────
  add("asslide-calcutta-6", "flutter", "shuffle_cards_bottom_sheet.dart", `
`);
  add("asslide-calcutta-6", "flutter", "shuffle_cards_bottom_controller.dart", `
`);

  // ── Step 7 — Foursomes ────────────────────────────────────
  add("asslide-calcutta-7", "flutter", "Calcutta_foursome_match_config_bottom_sheet.dart", `
`);
  add("asslide-calcutta-7", "flutter", "Calcutta_foursome_match_config_bottom_sheet_controller.dart", `
`);

  // ── Step 8 — Generate Matches ─────────────────────────────
  add("asslide-calcutta-8", "flutter", "calcutta_genrate_match_config_bottom_sheet.dart", `
`);
  add("asslide-calcutta-8", "flutter", "calcutta_generate_match_config_bottom_controller.dart", `
`);

  // ── Steps 9–17 — Round-2 / Round-3 / Add Score ────────────
  // Steps 9, 13 (Round-X Select) reuse add_score.dart
  add("asslide-calcutta-9",  "flutter", "add_score.dart",
    sharedNote("add_score.dart", "asslide-0"));
  add("asslide-calcutta-9",  "flutter", "add_score_controller.dart",
    sharedNote("add_score_controller.dart", "asslide-0"));

  // Step 10 — Round-2 Sheet (reuses step-1 screen)
  add("asslide-calcutta-10", "flutter", "calcutta_round_one_bottom_sheet.dart",
    '// Round-2 Sheet reuses CalcuttaRoundOneBottomSheet.\n' +
    '// See asslide-calcutta-1 for full source.\n');
  add("asslide-calcutta-10", "flutter", "calcutta_round_one_bottom_sheet_controller.dart",
    sharedNote("calcutta_round_one_bottom_sheet_controller.dart", "asslide-calcutta-1"));

  // Step 11 — Select Player Round-2 (reuses step-2 screen)
  add("asslide-calcutta-11", "flutter", "calcutta_round_select_player_bottom_sheet.dart",
    '// Select Player (Round-2) reuses CalcuttaRoundSelectPlayerBottomSheet.\n' +
    '// See asslide-calcutta-2 for full source.\n');
  add("asslide-calcutta-11", "flutter", "calcutta_round_select_player_bottom_sheet_controller.dart",
    sharedNote("calcutta_round_select_player_bottom_sheet_controller.dart", "asslide-calcutta-2"));

  // Step 12 — Round-2 Done (reuses step-1 summary)
  add("asslide-calcutta-12", "flutter", "calcutta_round_one_bottom_sheet.dart",
    sharedNote("calcutta_round_one_bottom_sheet.dart", "asslide-calcutta-1"));
  add("asslide-calcutta-12", "flutter", "calcutta_round_one_bottom_sheet_controller.dart",
    sharedNote("calcutta_round_one_bottom_sheet_controller.dart", "asslide-calcutta-1"));

  // Step 13 — Round-3 Select
  add("asslide-calcutta-13", "flutter", "add_score.dart",
    sharedNote("add_score.dart", "asslide-0"));
  add("asslide-calcutta-13", "flutter", "add_score_controller.dart",
    sharedNote("add_score_controller.dart", "asslide-0"));

  // Step 14 — Round-3 Sheet
  add("asslide-calcutta-14", "flutter", "calcutta_round_one_bottom_sheet.dart",
    '// Round-3 Sheet reuses CalcuttaRoundOneBottomSheet.\n' +
    '// See asslide-calcutta-1 for full source.\n');
  add("asslide-calcutta-14", "flutter", "calcutta_round_one_bottom_sheet_controller.dart",
    sharedNote("calcutta_round_one_bottom_sheet_controller.dart", "asslide-calcutta-1"));

  // Step 15 — Select Player Round-3
  add("asslide-calcutta-15", "flutter", "calcutta_round_select_player_bottom_sheet.dart",
    '// Select Player (Round-3) reuses CalcuttaRoundSelectPlayerBottomSheet.\n' +
    '// See asslide-calcutta-2 for full source.\n');
  add("asslide-calcutta-15", "flutter", "calcutta_round_select_player_bottom_sheet_controller.dart",
    sharedNote("calcutta_round_select_player_bottom_sheet_controller.dart", "asslide-calcutta-2"));

  // Step 16 — Round-3 Done
  add("asslide-calcutta-16", "flutter", "calcutta_round_one_bottom_sheet.dart",
    sharedNote("calcutta_round_one_bottom_sheet.dart", "asslide-calcutta-1"));
  add("asslide-calcutta-16", "flutter", "calcutta_round_one_bottom_sheet_controller.dart",
    sharedNote("calcutta_round_one_bottom_sheet_controller.dart", "asslide-calcutta-1"));

  // Step 17 — Add Score Entry (shared screen)
  add("asslide-calcutta-17", "flutter", "add_score.dart",
    sharedNote("add_score.dart", "asslide-0"));
  add("asslide-calcutta-17", "flutter", "add_score_controller.dart",
    sharedNote("add_score_controller.dart", "asslide-0"));

})();
