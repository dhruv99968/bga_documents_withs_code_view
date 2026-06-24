// ============================================================
// Flutter — Quick Start Wizard (wslide-0 … wslide-9)
// ============================================================

window.CODE_DATA = window.CODE_DATA || {};
(function () {
  function add(k, s, n, c) {
    window.CODE_DATA[k] = window.CODE_DATA[k] || {};
    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];
    window.CODE_DATA[k][s].push({ name: n, code: c });
  }
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // Quick Start Wizard â€” unique steps 0â€“19
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

  // -- wslide-0 : Welcome (Main Wizard) -- (1 file)
  add("wslide-0", "flutter", "welcome_screen.dart", `
`);

  // -- wslide-1 : Sign Up (Main Wizard) -- (2 files)
  add("wslide-1", "flutter", "signup_screen.dart", `
`);
  add("wslide-1", "flutter", "signup_controller.dart", `
`);

  // -- wslide-2 : Course Selection (Main Wizard) -- (2 files)
  add("wslide-2", "flutter", "course_screen.dart", `
`);
  add("wslide-2", "flutter", "course_controller.dart", `
`);

  // -- wslide-3 : Home Dashboard (Main Wizard) -- (3 files)
  add("wslide-3", "flutter", "home_screen.dart", `
`);
  add("wslide-3", "flutter", "home_general_item.dart", `
`);
  add("wslide-3", "flutter", "home_controller.dart", `
`);

  // -- wslide-4 : Create Game (Main Wizard) -- (2 files)
  add("wslide-4", "flutter", "create_game.dart", `
`);
  add("wslide-4", "flutter", "create_game_controller.dart", `
`);

  // -- wslide-5 : Game Created (Main Wizard) -- (2 files)
  add("wslide-5", "flutter", "create_game.dart", `
`);
  add("wslide-5", "flutter", "create_game_controller.dart", `
`);

  // -- wslide-6 : Game Overview (Main Wizard) -- (2 files)
  add("wslide-6", "flutter", "game_details_screen.dart", `
`);
  add("wslide-6", "flutter", "game_details_controller.dart", `
`);

  // -- wslide-7 : Add Bets (Main Wizard) -- (2 files)
  add("wslide-7", "flutter", "add_bet_bottom_sheet.dart", `
`);
  add("wslide-7", "flutter", "add_bet_bottom_sheet_controller.dart", `
`);

  // -- wslide-8 : Select Foursome (Main Wizard) -- (2 files)
  add("wslide-8", "flutter", "add_score.dart", `
`);
  add("wslide-8", "flutter", "add_score_controller.dart", `
`);

  // -- wslide-9 : Scoring (Main Wizard) -- (2 files)
  add("wslide-9", "flutter", "input_score.dart", `
`);
  add("wslide-9", "flutter", "input_score_controller.dart", `
`);


  add("wslide-0", "flutter", "welcome_controller.dart", `
`);

  add("wslide-4", "flutter", "games_and_events.dart", `
`);

  add("wslide-4", "flutter", "games_and_events_controller.dart", `
`);
})();