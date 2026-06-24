// ============================================================
// Flutter — Add Score (asslide-0 … asslide-11)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }
  // -- asslide-0 : Step 1: Select Foursome (12-step: 321 Milo/Vegas/Scramble | 9-step: Skins/Stroke/Stableford/Wolf | 19-step: Ryder Cup | 13-step: Horse Race | 27-step: Calcutta) -- (2 files)
  add("asslide-0", "flutter", "add_score.dart", `
`);
  add("asslide-0", "flutter", "add_score_controller.dart", `
`);

  // -- asslide-1 : Step 2: Generate Matches (12-step: 321 Milo/Vegas/Scramble | 19-step: Ryder Cup) -- (2 files)
  add("asslide-1", "flutter", "foursome_bottom.dart", `
`);
  add("asslide-1", "flutter", "foursome_bottom_controller.dart", `
`);

  // -- asslide-10 : Step 11: Results â€” front 9 / all players (All game types) -- (2 files)
  add("asslide-10", "flutter", "add_score.dart", `
`);
  add("asslide-10", "flutter", "add_score_controller.dart", `
`);

  // -- asslide-11 : Step 12: All Holes Done â€” Finish Foursome (All game types) -- (2 files)
  add("asslide-11", "flutter", "add_score.dart", `
`);
  add("asslide-11", "flutter", "add_score_controller.dart", `
`);

  // -- asslide-2 : Step 3: Match Config (12-step: 321 Milo/Vegas/Scramble | 19-step: Ryder Cup | 27-step: Calcutta) -- (2 files)
  // -- ((gameType == "vegas" || gameType == "3_2_1" || gameType == "scramble") && playType == "cod")  ==>> vegas_match_config_bottom & vegas_match_config_bottom_controller
  add("asslide-2", "flutter", "vegas_match_config_bottom.dart", `
`);
  add("asslide-2", "flutter", "vegas_match_config_bottom_controller.dart", `
`);
  // -- ((gameType == "3_2_1" && playType == "random") || (gameType == "vegas" || gameType == "3_2_1" || gameType == "scramble") && playType == "2v2")  ==>>  foursome_override_2v2_bottom & foursome_override_2v2_bottom_controller
  add("asslide-2", "flutter", "foursome_override_2v2_bottom.dart", `
`);
  add("asslide-2", "flutter", "foursome_override_2v2_bottom_controller.dart", `
`);

  // -- asslide-3 : Step 4: Foursome Setting (12-step: 321 Milo/Vegas/Scramble) -- (2 files)
  add("asslide-3", "flutter", "add_score.dart", `
`);
  add("asslide-3", "flutter", "add_score_controller.dart", `
`);

  // -- asslide-4 : Step 5: Foursome Settings â€” Rule Toggles (All game types; Rebit & Cheken, Dot Game, Newt & Towfer) -- (2 files)
  // -- (gameType != "wolf") ==>> foursome_bet_bottom_sheet & foursome_bet_bottom_controller
  add("asslide-4", "flutter", "foursome_bet_bottom_sheet.dart", `
`);
  add("asslide-4", "flutter", "foursome_bet_bottom_controller.dart", `
`);
  // -- (gameType == "wolf") ==>> bet_wolf_bottom_sheet & bet_wolf_bottom_controller
  add("asslide-4", "flutter", "bet_wolf_bottom_sheet.dart", `
`);
  add("asslide-4", "flutter", "bet_wolf_bottom_controller.dart", `
`);

  // -- asslide-5 : Step 6: Add Score CTA (All game types) -- (2 files)
  add("asslide-5", "flutter", "add_score.dart", `
`);
  add("asslide-5", "flutter", "add_score_controller.dart", `
`);

  // -- asslide-6 : Step 7: Holes Grid â€” 18-hole score grid (All game types; 27 holes for Horse Race) -- (2 files)
  add("asslide-6", "flutter", "add_score.dart", `
`);
  add("asslide-6", "flutter", "add_score_controller.dart", `
`);

  // -- asslide-7 : Step 8: Scorecard â€” per-hole score entry (All game types) -- (2 files)
  add("asslide-7", "flutter", "input_score.dart", `
`);
  add("asslide-7", "flutter", "input_score_controller.dart", `
`);

  // -- asslide-8 : Step 9: Skode & Junk â€” side rewards (All game types; MADE/MISSED/EARNED) -- (2 files)
  add("asslide-8", "flutter", "input_score.dart", `
`);
  add("asslide-8", "flutter", "input_score_controller.dart", `
`);

  // -- asslide-9 : Step 10: Leaderboard â€” live standings (All game types) -- (2 files)
  add("asslide-9", "flutter", "leader_board_screen.dart", `
`);
  add("asslide-9", "flutter", "leader_board_screen_controller.dart", `
`);

})();