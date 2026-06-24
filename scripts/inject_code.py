#!/usr/bin/env python3
"""
inject_code.py
--------------
Reads real source files from the checked-out Flutter repo and injects them
into matching <script type="text/x-code"> blocks inside index.html.

Also auto-generates API documentation blocks for any screen that has a
controller: it scans the controller for apiService.methodName() calls,
looks up the method definition in api_services.dart, and builds a formatted
documentation block.

Controllers are auto-discovered from FILE_MAP entries whose file name ends
with _controller.dart — no separate mapping needed.

Run from the docs repo root in CI (see inject-code.yml), or locally:

    DOCS_HTML_PATH=index.html FLUTTER_SRC_PATH=../bga_flutter_app python3 scripts/inject_code.py
"""

import os
import re
import sys

DOCS_HTML_PATH = os.environ.get("DOCS_HTML_PATH", "index.html")
FLUTTER_SRC_PATH = os.environ.get("FLUTTER_SRC_PATH", "flutter-src")

API_SERVICES_REL = "lib/apis/api_services.dart"
BASE_URL_VAR = "{{baseUrl}}"

# ──────────────────────────────────────────────────────────────────────────
# FILE_MAP — regular source-code injection
# ──────────────────────────────────────────────────────────────────────────
FILE_MAP = [
    # ── Signup Flow — 4 Steps ──
    dict(key="sslide-0", stack="flutter", file="signup_screen.dart",
         src="lib/views/auth/signup_screen.dart"),
    dict(key="sslide-0", stack="flutter", file="signup_controller.dart",
         src="lib/controllers/auth_controller/signup_controller.dart"),

    dict(key="sslide-1", stack="flutter", file="otp_screen.dart",
         src="lib/views/auth/otp_screen.dart"),
    dict(key="sslide-1", stack="flutter", file="otp_controller.dart",
         src="lib/controllers/auth_controller/otp_controller.dart"),

    dict(key="sslide-2", stack="flutter", file="change_password_screen.dart",
         src="lib/views/auth/change_password_screen.dart"),
    dict(key="sslide-2", stack="flutter", file="change_password_controller.dart",
         src="lib/controllers/auth_controller/change_password_controller.dart"),

    dict(key="sslide-3", stack="flutter", file="course_screen.dart",
         src="lib/views/course/courses_screen.dart"),
    dict(key="sslide-3", stack="flutter", file="course_controller.dart",
         src="lib/controllers/course_controller/course_controller.dart"),

    # ── Welcome / Intro ──
    dict(key="wslide-0", stack="flutter", file="welcome_screen.dart",
         src="lib/views/auth/welcome_screen.dart"),
    dict(key="wslide-0", stack="flutter", file="welcome_controller.dart",
         src="lib/controllers/auth_controller/welcome_controller.dart"),

    dict(key="welcome-detail", stack="flutter", file="welcome_screen.dart",
         src="lib/views/auth/welcome_screen.dart"),
    dict(key="welcome-detail", stack="flutter", file="welcome_controller.dart",
         src="lib/controllers/auth_controller/welcome_controller.dart"),

    # ── Agenda Detail ──
    dict(key="agenda-detail", stack="flutter", file="home_screen.dart",
         src="lib/views/home/home_screen.dart"),
    dict(key="agenda-detail", stack="flutter", file="home_controller.dart",
         src="lib/controllers/home/home_controller.dart"),

    # ── Home Dashboard Detail ──
    dict(key="home-detail", stack="flutter", file="home_screen.dart",
         src="lib/views/home/home_screen.dart"),
    dict(key="home-detail", stack="flutter", file="home_controller.dart",
         src="lib/controllers/home/home_controller.dart"),
    dict(key="home-detail", stack="flutter", file="home_general_item.dart",
         src="lib/views/home/home_general_item.dart"),

    # ── View Game Detail ──
    dict(key="viewgame-detail", stack="flutter", file="game_details_screen.dart",
         src="lib/views/games/game_details_screen.dart"),
    dict(key="viewgame-detail", stack="flutter", file="game_details_controller.dart",
         src="lib/controllers/games/game_details_controller.dart"),

    # ── Add Bets Detail ──
    dict(key="addbets-detail", stack="flutter", file="add_bet_bottom_sheet.dart",
         src="lib/views/bottem_sheets/add_bet_bottom_sheet.dart"),
    dict(key="addbets-detail", stack="flutter", file="add_bet_bottom_sheet_controller.dart",
         src="lib/controllers/bets/add_bet_bottom_sheet_controller.dart"),

    # ── Results Flow (vrslide-0 .. vrslide-3) ──
    dict(key="vrslide-0", stack="flutter", file="game_details_screen.dart",
         src="lib/views/games/game_details_screen.dart"),
    dict(key="vrslide-0", stack="flutter", file="game_details_controller.dart",
         src="lib/controllers/games/game_details_controller.dart"),
    dict(key="vrslide-1", stack="flutter", file="game_details_screen.dart",
         src="lib/views/games/game_details_screen.dart"),
    dict(key="vrslide-1", stack="flutter", file="game_details_controller.dart",
         src="lib/controllers/games/game_details_controller.dart"),
    dict(key="vrslide-2", stack="flutter", file="game_details_screen.dart",
         src="lib/views/games/game_details_screen.dart"),
    dict(key="vrslide-2", stack="flutter", file="game_details_controller.dart",
         src="lib/controllers/games/game_details_controller.dart"),
    dict(key="vrslide-3", stack="flutter", file="game_details_screen.dart",
         src="lib/views/games/game_details_screen.dart"),
    dict(key="vrslide-3", stack="flutter", file="game_details_controller.dart",
         src="lib/controllers/games/game_details_controller.dart"),

    # ── Ledger Flow (vlslide-0 .. vlslide-4) ──
    dict(key="vlslide-0", stack="flutter", file="game_details_screen.dart",
         src="lib/views/games/game_details_screen.dart"),
    dict(key="vlslide-0", stack="flutter", file="game_details_controller.dart",
         src="lib/controllers/games/game_details_controller.dart"),
    dict(key="vlslide-1", stack="flutter", file="game_details_screen.dart",
         src="lib/views/games/game_details_screen.dart"),
    dict(key="vlslide-1", stack="flutter", file="game_details_controller.dart",
         src="lib/controllers/games/game_details_controller.dart"),
    dict(key="vlslide-1", stack="flutter", file="organizer_ledger_bottom_Sheet.dart",
         src="lib/views/bottem_sheets/organizer_ledger_bottom_sheet.dart"),
    dict(key="vlslide-1", stack="flutter", file="organizer_ledger_bottom_controller.dart",
         src="lib/controllers/bottom_sheets_controller/organizer_ledger_bottom_controller.dart"),
    dict(key="vlslide-2", stack="flutter", file="game_details_screen.dart",
         src="lib/views/games/game_details_screen.dart"),
    dict(key="vlslide-2", stack="flutter", file="game_details_controller.dart",
         src="lib/controllers/games/game_details_controller.dart"),
    dict(key="vlslide-2", stack="flutter", file="organizer_ledger_bottom_Sheet.dart",
         src="lib/views/bottem_sheets/organizer_ledger_bottom_sheet.dart"),
    dict(key="vlslide-2", stack="flutter", file="organizer_ledger_bottom_controller.dart",
         src="lib/controllers/bottom_sheets_controller/organizer_ledger_bottom_controller.dart"),
    dict(key="vlslide-3", stack="flutter", file="organizer_ledger_bottom_Sheet.dart",
         src="lib/views/bottem_sheets/organizer_ledger_bottom_sheet.dart"),
    dict(key="vlslide-3", stack="flutter", file="organizer_ledger_bottom_controller.dart",
         src="lib/controllers/bottom_sheets_controller/organizer_ledger_bottom_controller.dart"),
    dict(key="vlslide-4", stack="flutter", file="game_details_screen.dart",
         src="lib/views/games/game_details_screen.dart"),
    dict(key="vlslide-4", stack="flutter", file="game_details_controller.dart",
         src="lib/controllers/games/game_details_controller.dart"),
    dict(key="vlslide-4", stack="flutter", file="organizer_ledger_bottom_Sheet.dart",
         src="lib/views/bottem_sheets/organizer_ledger_bottom_sheet.dart"),
    dict(key="vlslide-4", stack="flutter", file="organizer_ledger_bottom_controller.dart",
         src="lib/controllers/bottom_sheets_controller/organizer_ledger_bottom_controller.dart"),

    # ── Quick Start Wizard — wslide-1 … wslide-9 ──
    dict(key="wslide-1", stack="flutter", file="signup_screen.dart",
         src="lib/views/auth/signup_screen.dart"),
    dict(key="wslide-1", stack="flutter", file="signup_controller.dart",
         src="lib/controllers/auth_controller/signup_controller.dart"),

    dict(key="wslide-2", stack="flutter", file="course_screen.dart",
         src="lib/views/course/courses_screen.dart"),
    dict(key="wslide-2", stack="flutter", file="course_controller.dart",
         src="lib/controllers/course_controller/course_controller.dart"),

    dict(key="wslide-3", stack="flutter", file="home_screen.dart",
         src="lib/views/home/home_screen.dart"),
    dict(key="wslide-3", stack="flutter", file="home_general_item.dart",
         src="lib/views/home/home_general_item.dart"),
    dict(key="wslide-3", stack="flutter", file="home_controller.dart",
         src="lib/controllers/home/home_controller.dart"),

    dict(key="wslide-4", stack="flutter", file="games_and_events.dart",
         src="lib/views/home/games_and_events.dart"),
    dict(key="wslide-4", stack="flutter", file="games_and_events_controller.dart",
         src="lib/controllers/home/games_and_events_controller.dart"),

    dict(key="wslide-5", stack="flutter", file="create_game.dart",
         src="lib/views/games/game_create_wizard/create_game.dart"),
    dict(key="wslide-5", stack="flutter", file="create_game_controller.dart",
         src="lib/controllers/games/create_game/create_game_controller.dart"),

    dict(key="wslide-6", stack="flutter", file="game_details_screen.dart",
         src="lib/views/games/game_details_screen.dart"),
    dict(key="wslide-6", stack="flutter", file="game_details_controller.dart",
         src="lib/controllers/games/game_details_controller.dart"),

    dict(key="wslide-7", stack="flutter", file="add_bet_bottom_sheet.dart",
         src="lib/views/bottem_sheets/add_bet_bottom_sheet.dart"),
    dict(key="wslide-7", stack="flutter", file="add_bet_bottom_sheet_controller.dart",
         src="lib/controllers/bets/add_bet_bottom_sheet_controller.dart"),

    dict(key="wslide-8", stack="flutter", file="add_score.dart",
         src="lib/views/score/add_score.dart"),
    dict(key="wslide-8", stack="flutter", file="add_score_controller.dart",
         src="lib/controllers/score/add_score_controller.dart"),

    dict(key="wslide-9", stack="flutter", file="input_score.dart",
         src="lib/views/score/input_score.dart"),
    dict(key="wslide-9", stack="flutter", file="input_score_controller.dart",
         src="lib/controllers/score/input_score_controller.dart"),

    # ── Create Game Wizard — cgslide-0 … cgslide-9 ──
    dict(key="cgslide-0", stack="flutter", file="create_game.dart",
         src="lib/views/games/game_create_wizard/create_game.dart"),
    dict(key="cgslide-0", stack="flutter", file="create_game_controller.dart",
         src="lib/controllers/games/create_game/create_game_controller.dart"),
    dict(key="cgslide-1", stack="flutter", file="create_game.dart",
         src="lib/views/games/game_create_wizard/create_game.dart"),
    dict(key="cgslide-1", stack="flutter", file="create_game_controller.dart",
         src="lib/controllers/games/create_game/create_game_controller.dart"),
    dict(key="cgslide-2", stack="flutter", file="create_game.dart",
         src="lib/views/games/game_create_wizard/create_game.dart"),
    dict(key="cgslide-2", stack="flutter", file="create_game_controller.dart",
         src="lib/controllers/games/create_game/create_game_controller.dart"),
    dict(key="cgslide-3", stack="flutter", file="create_game.dart",
         src="lib/views/games/game_create_wizard/create_game.dart"),
    dict(key="cgslide-3", stack="flutter", file="create_game_controller.dart",
         src="lib/controllers/games/create_game/create_game_controller.dart"),
    dict(key="cgslide-4", stack="flutter", file="create_game.dart",
         src="lib/views/games/game_create_wizard/create_game.dart"),
    dict(key="cgslide-4", stack="flutter", file="create_game_controller.dart",
         src="lib/controllers/games/create_game/create_game_controller.dart"),
    dict(key="cgslide-5", stack="flutter", file="create_game.dart",
         src="lib/views/games/game_create_wizard/create_game.dart"),
    dict(key="cgslide-5", stack="flutter", file="create_game_controller.dart",
         src="lib/controllers/games/create_game/create_game_controller.dart"),
    dict(key="cgslide-6", stack="flutter", file="create_game.dart",
         src="lib/views/games/game_create_wizard/create_game.dart"),
    dict(key="cgslide-6", stack="flutter", file="create_game_controller.dart",
         src="lib/controllers/games/create_game/create_game_controller.dart"),
    dict(key="cgslide-7", stack="flutter", file="create_game.dart",
         src="lib/views/games/game_create_wizard/create_game.dart"),
    dict(key="cgslide-7", stack="flutter", file="create_game_controller.dart",
         src="lib/controllers/games/create_game/create_game_controller.dart"),
    dict(key="cgslide-8", stack="flutter", file="create_game.dart",
         src="lib/views/games/game_create_wizard/create_game.dart"),
    dict(key="cgslide-8", stack="flutter", file="create_game_controller.dart",
         src="lib/controllers/games/create_game/create_game_controller.dart"),
    dict(key="cgslide-9", stack="flutter", file="create_game.dart",
         src="lib/views/games/game_create_wizard/create_game.dart"),
    dict(key="cgslide-9", stack="flutter", file="create_game_controller.dart",
         src="lib/controllers/games/create_game/create_game_controller.dart"),

    # ── Add Score Flow — asslide-0 … asslide-11 (all game types) ──
    dict(key="asslide-0", stack="flutter", file="add_score.dart",
         src="lib/views/score/add_score.dart"),
    dict(key="asslide-0", stack="flutter", file="add_score_controller.dart",
         src="lib/controllers/score/add_score_controller.dart"),

    dict(key="asslide-1", stack="flutter", file="foursome_bottom.dart",
         src="lib/views/bottem_sheets/foursome_bottom.dart"),
    dict(key="asslide-1", stack="flutter", file="foursome_bottom_controller.dart",
         src="lib/controllers/bottom_sheets_controller/foursome_bottom_controller.dart"),

    dict(key="asslide-2", stack="flutter", file="vegas_match_config_bottom.dart",
         src="lib/views/bottem_sheets/vegas_match_config_bottom.dart"),
    dict(key="asslide-2", stack="flutter", file="vegas_match_config_bottom_controller.dart",
         src="lib/controllers/bottom_sheets_controller/vegas_match_config_bottom_controller.dart"),
    dict(key="asslide-2", stack="flutter", file="foursome_override_2v2_bottom.dart",
         src="lib/views/bottem_sheets/foursome_override_2v2_bottom.dart"),
    dict(key="asslide-2", stack="flutter", file="foursome_override_2v2_bottom_controller.dart",
         src="lib/controllers/bottom_sheets_controller/foursome_override_2v2_bottom_controller.dart"),

    dict(key="asslide-3", stack="flutter", file="add_score.dart",
         src="lib/views/score/add_score.dart"),
    dict(key="asslide-3", stack="flutter", file="add_score_controller.dart",
         src="lib/controllers/score/add_score_controller.dart"),

    dict(key="asslide-4", stack="flutter", file="foursome_bet_bottom_sheet.dart",
         src="lib/views/bottem_sheets/foursome_bet_bottom_sheet.dart"),
    dict(key="asslide-4", stack="flutter", file="foursome_bet_bottom_controller.dart",
         src="lib/controllers/bottom_sheets_controller/foursome_bet_bottom_controller.dart"),
    dict(key="asslide-4", stack="flutter", file="bet_wolf_bottom_sheet.dart",
         src="lib/views/bottem_sheets/bet_wolf_bottom_sheet.dart"),
    dict(key="asslide-4", stack="flutter", file="bet_wolf_bottom_controller.dart",
         src="lib/controllers/bottom_sheets_controller/bet_wolf_bottom_controller.dart"),

    dict(key="asslide-5", stack="flutter", file="add_score.dart",
         src="lib/views/score/add_score.dart"),
    dict(key="asslide-5", stack="flutter", file="add_score_controller.dart",
         src="lib/controllers/score/add_score_controller.dart"),

    dict(key="asslide-6", stack="flutter", file="add_score.dart",
         src="lib/views/score/add_score.dart"),
    dict(key="asslide-6", stack="flutter", file="add_score_controller.dart",
         src="lib/controllers/score/add_score_controller.dart"),

    dict(key="asslide-7", stack="flutter", file="input_score.dart",
         src="lib/views/score/input_score.dart"),
    dict(key="asslide-7", stack="flutter", file="input_score_controller.dart",
         src="lib/controllers/score/input_score_controller.dart"),

    dict(key="asslide-8", stack="flutter", file="input_score.dart",
         src="lib/views/score/input_score.dart"),
    dict(key="asslide-8", stack="flutter", file="input_score_controller.dart",
         src="lib/controllers/score/input_score_controller.dart"),

    dict(key="asslide-9", stack="flutter", file="leader_board_screen.dart",
         src="lib/views/leaderboard/new_leaderboard/leader_board_screen.dart"),
    dict(key="asslide-9", stack="flutter", file="leader_board_screen_controller.dart",
         src="lib/controllers/leaderboard_controller/leader_board_screen_controller.dart"),

    dict(key="asslide-10", stack="flutter", file="add_score.dart",
         src="lib/views/score/add_score.dart"),
    dict(key="asslide-10", stack="flutter", file="add_score_controller.dart",
         src="lib/controllers/score/add_score_controller.dart"),

    dict(key="asslide-11", stack="flutter", file="add_score.dart",
         src="lib/views/score/add_score.dart"),
    dict(key="asslide-11", stack="flutter", file="add_score_controller.dart",
         src="lib/controllers/score/add_score_controller.dart"),

    # ── Add Score — Calcutta unique steps ──
    dict(key="asslide-calcutta-1", stack="flutter", file="calcutta_round_one_bottom_sheet.dart",
         src="lib/views/bottem_sheets/calcutta_round_one_bottom_sheet.dart"),
    dict(key="asslide-calcutta-1", stack="flutter", file="calcutta_round_one_bottom_sheet_controller.dart",
         src="lib/controllers/bottom_sheets_controller/calcutta_round_one_bottom_sheet_controller.dart"),

    dict(key="asslide-calcutta-2", stack="flutter", file="calcutta_round_select_player_bottom_sheet.dart",
         src="lib/views/bottem_sheets/calcutta_round_select_player_bottom_sheet.dart"),
    dict(key="asslide-calcutta-2", stack="flutter", file="calcutta_round_select_player_bottom_sheet_controller.dart",
         src="lib/controllers/bottom_sheets_controller/calcutta_round_select_player_bottom_sheet_controller.dart"),

    dict(key="asslide-calcutta-5", stack="flutter", file="caluctta_select_player_bottom_sheet.dart",
         src="lib/views/bottem_sheets/caluctta_select_player_bottom_sheet.dart"),
    dict(key="asslide-calcutta-5", stack="flutter", file="calcutta_player_select_bottom_controller.dart",
         src="lib/controllers/bottom_sheets_controller/calcutta_player_select_bottom_controller.dart"),

    dict(key="asslide-calcutta-6", stack="flutter", file="shuffle_cards_bottom_sheet.dart",
         src="lib/views/bottem_sheets/shuffle_cards_bottom_sheet.dart"),
    dict(key="asslide-calcutta-6", stack="flutter", file="shuffle_cards_bottom_controller.dart",
         src="lib/controllers/bottom_sheets_controller/shuffle_cards_bottom_controller.dart"),

    dict(key="asslide-calcutta-7", stack="flutter", file="Calcutta_foursome_match_config_bottom_sheet.dart",
         src="lib/views/bottem_sheets/Calcutta_foursome_match_config_bottom_sheet.dart"),
    dict(key="asslide-calcutta-7", stack="flutter", file="Calcutta_foursome_match_config_bottom_sheet_controller.dart",
         src="lib/controllers/bottom_sheets_controller/Calcutta_foursome_match_config_bottom_sheet_controller.dart"),

    dict(key="asslide-calcutta-8", stack="flutter", file="calcutta_genrate_match_config_bottom_sheet.dart",
         src="lib/views/bottem_sheets/calcutta_genrate_match_config_bottom_sheet.dart"),
    dict(key="asslide-calcutta-8", stack="flutter", file="calcutta_generate_match_config_bottom_controller.dart",
         src="lib/controllers/bottom_sheets_controller/calcutta_generate_match_config_bottom_controller.dart"),

    # ── Add Score — Ryder Cup unique steps ──
    dict(key="asslide-ryder_cup-2", stack="flutter", file="pick_player_bottom_sheet.dart",
         src="lib/views/bottem_sheets/pick_player_bottom_sheet.dart"),
    dict(key="asslide-ryder_cup-2", stack="flutter", file="pick_bottom_sheet_controller.dart",
         src="lib/controllers/bottom_sheets_controller/pick_bottom_sheet_controller.dart"),

    dict(key="asslide-ryder_cup-4", stack="flutter", file="select_single_player_bottom_sheet.dart",
         src="lib/views/bottem_sheets/select_single_player_bottom_sheet.dart"),
    dict(key="asslide-ryder_cup-4", stack="flutter", file="single_player_select_bottom_controller.dart",
         src="lib/controllers/bottom_sheets_controller/single_player_select_bottom_controller.dart"),

    dict(key="asslide-ryder_cup-8", stack="flutter", file="ryder_cup_custom_match_bottom.dart",
         src="lib/views/bottem_sheets/ryder_cup_custom_match_bottom.dart"),
    dict(key="asslide-ryder_cup-8", stack="flutter", file="ryder_custom_match_bottom_controller.dart",
         src="lib/controllers/bottom_sheets_controller/ryder_custom_match_bottom_controller.dart"),

    # ── Add Score — Horse Race unique steps ──
    dict(key="asslide-horse_race-1", stack="flutter", file="horse_acrrosse_select_team_bottom.dart",
         src="lib/views/bottem_sheets/horse_acrrosse_select_team_bottom.dart"),
    dict(key="asslide-horse_race-1", stack="flutter", file="horse_across_select_bottom_controller.dart",
         src="lib/controllers/bottom_sheets_controller/horse_across_select_bottom_controller.dart"),

    dict(key="asslide-horse_race-2", stack="flutter", file="horse_race_group_team_bottom.dart",
         src="lib/views/bottem_sheets/horse_race_group_team_bottom.dart"),
    dict(key="asslide-horse_race-2", stack="flutter", file="horse_race_group_team_bottom_controller.dart",
         src="lib/controllers/bottom_sheets_controller/horse_race_group_team_bottom_controller.dart"),
]


# ──────────────────────────────────────────────────────────────────────────
# External JS file targets
# Keys listed here are stored in separate JS files (not index.html blocks).
# inject_code.py updates the add() calls inside those JS files directly.
# ──────────────────────────────────────────────────────────────────────────

EXTERNAL_JS_TARGETS = {
    # ── Account Setup (sslide-0 … sslide-3) ──
    "sslide-0": {"flutter": "JavaScripts/flutter/account-setup.js", "apis": "JavaScripts/api/account-setup.js"},
    "sslide-1": {"flutter": "JavaScripts/flutter/account-setup.js", "apis": "JavaScripts/api/account-setup.js"},
    "sslide-2": {"flutter": "JavaScripts/flutter/account-setup.js", "apis": "JavaScripts/api/account-setup.js"},
    "sslide-3": {"flutter": "JavaScripts/flutter/account-setup.js", "apis": "JavaScripts/api/account-setup.js"},
    # ── Quick Start Wizard (wslide-0 … wslide-9) ──
    "wslide-0":  {"flutter": "JavaScripts/flutter/quick-start-wizard.js", "apis": "JavaScripts/api/quick-start-wizard.js"},
    "wslide-1":  {"flutter": "JavaScripts/flutter/quick-start-wizard.js", "apis": "JavaScripts/api/quick-start-wizard.js"},
    "wslide-2":  {"flutter": "JavaScripts/flutter/quick-start-wizard.js", "apis": "JavaScripts/api/quick-start-wizard.js"},
    "wslide-3":  {"flutter": "JavaScripts/flutter/quick-start-wizard.js", "apis": "JavaScripts/api/quick-start-wizard.js"},
    "wslide-4":  {"flutter": "JavaScripts/flutter/quick-start-wizard.js", "apis": "JavaScripts/api/quick-start-wizard.js"},
    "wslide-5":  {"flutter": "JavaScripts/flutter/quick-start-wizard.js", "apis": "JavaScripts/api/quick-start-wizard.js"},
    "wslide-6":  {"flutter": "JavaScripts/flutter/quick-start-wizard.js", "apis": "JavaScripts/api/quick-start-wizard.js"},
    "wslide-7":  {"flutter": "JavaScripts/flutter/quick-start-wizard.js", "apis": "JavaScripts/api/quick-start-wizard.js"},
    "wslide-8":  {"flutter": "JavaScripts/flutter/quick-start-wizard.js", "apis": "JavaScripts/api/quick-start-wizard.js"},
    "wslide-9":  {"flutter": "JavaScripts/flutter/quick-start-wizard.js", "apis": "JavaScripts/api/quick-start-wizard.js"},
    # ── Add Score — Common steps (asslide-0 … asslide-11) ──
    "asslide-0":  {"flutter": "JavaScripts/flutter/add-score.js", "apis": "JavaScripts/api/add-score-common.js"},
    "asslide-1":  {"flutter": "JavaScripts/flutter/add-score.js", "apis": "JavaScripts/api/add-score-common.js"},
    "asslide-2":  {"flutter": "JavaScripts/flutter/add-score.js", "apis": "JavaScripts/api/add-score-common.js"},
    "asslide-3":  {"flutter": "JavaScripts/flutter/add-score.js", "apis": "JavaScripts/api/add-score-common.js"},
    "asslide-4":  {"flutter": "JavaScripts/flutter/add-score.js", "apis": "JavaScripts/api/add-score-common.js"},
    "asslide-5":  {"flutter": "JavaScripts/flutter/add-score.js", "apis": "JavaScripts/api/add-score-common.js"},
    "asslide-6":  {"flutter": "JavaScripts/flutter/add-score.js", "apis": "JavaScripts/api/add-score-common.js"},
    "asslide-7":  {"flutter": "JavaScripts/flutter/add-score.js", "apis": "JavaScripts/api/add-score-common.js"},
    "asslide-8":  {"flutter": "JavaScripts/flutter/add-score.js", "apis": "JavaScripts/api/add-score-common.js"},
    "asslide-9":  {"flutter": "JavaScripts/flutter/add-score.js", "apis": "JavaScripts/api/add-score-common.js"},
    "asslide-10": {"flutter": "JavaScripts/flutter/add-score.js", "apis": "JavaScripts/api/add-score-common.js"},
    "asslide-11": {"flutter": "JavaScripts/flutter/add-score.js", "apis": "JavaScripts/api/add-score-common.js"},
    # ── Create Game Wizard (cgslide-0 … cgslide-9) ──
    "cgslide-0": {"flutter": "JavaScripts/flutter/create-game-wizard.js", "apis": "JavaScripts/api/create-game-wizard.js"},
    "cgslide-1": {"flutter": "JavaScripts/flutter/create-game-wizard.js", "apis": "JavaScripts/api/create-game-wizard.js"},
    "cgslide-2": {"flutter": "JavaScripts/flutter/create-game-wizard.js", "apis": "JavaScripts/api/create-game-wizard.js"},
    "cgslide-3": {"flutter": "JavaScripts/flutter/create-game-wizard.js", "apis": "JavaScripts/api/create-game-wizard.js"},
    "cgslide-4": {"flutter": "JavaScripts/flutter/create-game-wizard.js", "apis": "JavaScripts/api/create-game-wizard.js"},
    "cgslide-5": {"flutter": "JavaScripts/flutter/create-game-wizard.js", "apis": "JavaScripts/api/create-game-wizard.js"},
    "cgslide-6": {"flutter": "JavaScripts/flutter/create-game-wizard.js", "apis": "JavaScripts/api/create-game-wizard.js"},
    "cgslide-7": {"flutter": "JavaScripts/flutter/create-game-wizard.js", "apis": "JavaScripts/api/create-game-wizard.js"},
    "cgslide-8": {"flutter": "JavaScripts/flutter/create-game-wizard.js", "apis": "JavaScripts/api/create-game-wizard.js"},
    "cgslide-9": {"flutter": "JavaScripts/flutter/create-game-wizard.js", "apis": "JavaScripts/api/create-game-wizard.js"},
    # ── Detail screens ──
    "home-detail":     {"flutter": "JavaScripts/flutter/home-detail.js",     "apis": "JavaScripts/api/home-detail.js"},
    "agenda-detail":   {"flutter": "JavaScripts/flutter/agenda-detail.js",   "apis": "JavaScripts/api/agenda-detail.js"},
    "viewgame-detail": {"flutter": "JavaScripts/flutter/viewgame-detail.js", "apis": "JavaScripts/api/viewgame-detail.js"},
    "addbets-detail":  {"flutter": "JavaScripts/flutter/addbets-detail.js",  "apis": "JavaScripts/api/addbets-detail.js"},
    "welcome-detail":  {"flutter": "JavaScripts/flutter/welcome-detail.js",  "apis": "JavaScripts/api/welcome-detail.js"},
    # ── View Results (vrslide-0 … vrslide-3) ──
    "vrslide-0": {"flutter": "JavaScripts/flutter/view-results.js", "apis": "JavaScripts/api/view-results.js"},
    "vrslide-1": {"flutter": "JavaScripts/flutter/view-results.js", "apis": "JavaScripts/api/view-results.js"},
    "vrslide-2": {"flutter": "JavaScripts/flutter/view-results.js", "apis": "JavaScripts/api/view-results.js"},
    "vrslide-3": {"flutter": "JavaScripts/flutter/view-results.js", "apis": "JavaScripts/api/view-results.js"},
    # ── View Ledger (vlslide-0 … vlslide-4) ──
    "vlslide-0": {"flutter": "JavaScripts/flutter/view-ledger.js", "apis": "JavaScripts/api/view-ledger.js"},
    "vlslide-1": {"flutter": "JavaScripts/flutter/view-ledger.js", "apis": "JavaScripts/api/view-ledger.js"},
    "vlslide-2": {"flutter": "JavaScripts/flutter/view-ledger.js", "apis": "JavaScripts/api/view-ledger.js"},
    "vlslide-3": {"flutter": "JavaScripts/flutter/view-ledger.js", "apis": "JavaScripts/api/view-ledger.js"},
    "vlslide-4": {"flutter": "JavaScripts/flutter/view-ledger.js", "apis": "JavaScripts/api/view-ledger.js"},
    # ── Add Score — Calcutta (asslide-calcutta-0 … asslide-calcutta-17) ──
    "asslide-calcutta-0":  {"flutter": "JavaScripts/flutter/add-score-calcutta.js"},
    "asslide-calcutta-1":  {"flutter": "JavaScripts/flutter/add-score-calcutta.js"},
    "asslide-calcutta-2":  {"flutter": "JavaScripts/flutter/add-score-calcutta.js"},
    "asslide-calcutta-3":  {"flutter": "JavaScripts/flutter/add-score-calcutta.js"},
    "asslide-calcutta-4":  {"flutter": "JavaScripts/flutter/add-score-calcutta.js"},
    "asslide-calcutta-5":  {"flutter": "JavaScripts/flutter/add-score-calcutta.js"},
    "asslide-calcutta-6":  {"flutter": "JavaScripts/flutter/add-score-calcutta.js"},
    "asslide-calcutta-7":  {"flutter": "JavaScripts/flutter/add-score-calcutta.js"},
    "asslide-calcutta-8":  {"flutter": "JavaScripts/flutter/add-score-calcutta.js"},
    "asslide-calcutta-9":  {"flutter": "JavaScripts/flutter/add-score-calcutta.js"},
    "asslide-calcutta-10": {"flutter": "JavaScripts/flutter/add-score-calcutta.js"},
    "asslide-calcutta-11": {"flutter": "JavaScripts/flutter/add-score-calcutta.js"},
    "asslide-calcutta-12": {"flutter": "JavaScripts/flutter/add-score-calcutta.js"},
    "asslide-calcutta-13": {"flutter": "JavaScripts/flutter/add-score-calcutta.js"},
    "asslide-calcutta-14": {"flutter": "JavaScripts/flutter/add-score-calcutta.js"},
    "asslide-calcutta-15": {"flutter": "JavaScripts/flutter/add-score-calcutta.js"},
    "asslide-calcutta-16": {"flutter": "JavaScripts/flutter/add-score-calcutta.js"},
    "asslide-calcutta-17": {"flutter": "JavaScripts/flutter/add-score-calcutta.js"},
    # ── Add Score — Ryder Cup (asslide-ryder_cup-0 … asslide-ryder_cup-9) ──
    "asslide-ryder_cup-0": {"flutter": "JavaScripts/flutter/add-score-ryder-cup.js"},
    "asslide-ryder_cup-1": {"flutter": "JavaScripts/flutter/add-score-ryder-cup.js"},
    "asslide-ryder_cup-2": {"flutter": "JavaScripts/flutter/add-score-ryder-cup.js"},
    "asslide-ryder_cup-3": {"flutter": "JavaScripts/flutter/add-score-ryder-cup.js"},
    "asslide-ryder_cup-4": {"flutter": "JavaScripts/flutter/add-score-ryder-cup.js"},
    "asslide-ryder_cup-5": {"flutter": "JavaScripts/flutter/add-score-ryder-cup.js"},
    "asslide-ryder_cup-6": {"flutter": "JavaScripts/flutter/add-score-ryder-cup.js"},
    "asslide-ryder_cup-7": {"flutter": "JavaScripts/flutter/add-score-ryder-cup.js"},
    "asslide-ryder_cup-8": {"flutter": "JavaScripts/flutter/add-score-ryder-cup.js"},
    "asslide-ryder_cup-9": {"flutter": "JavaScripts/flutter/add-score-ryder-cup.js"},
    # ── Add Score — Horse Race (asslide-horse_race-0 … asslide-horse_race-3) ──
    "asslide-horse_race-0": {"flutter": "JavaScripts/flutter/add-score-horse-race.js"},
    "asslide-horse_race-1": {"flutter": "JavaScripts/flutter/add-score-horse-race.js"},
    "asslide-horse_race-2": {"flutter": "JavaScripts/flutter/add-score-horse-race.js"},
    "asslide-horse_race-3": {"flutter": "JavaScripts/flutter/add-score-horse-race.js"},
}

# In-memory cache for external JS files — read once, write once at the end.
_external_js_cache = {}


def _load_external_js(path):
    if path not in _external_js_cache:
        if os.path.isfile(path):
            with open(path, "r", encoding="utf-8") as f:
                _external_js_cache[path] = f.read()
        else:
            _external_js_cache[path] = None
    return _external_js_cache[path]


def _save_external_js_files():
    """Write all modified external JS files back to disk."""
    for path, content in _external_js_cache.items():
        if content is not None:
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)


def inject_into_external_js(key, stack, filename, code):
    """Replace the body of an add(key, stack, filename, `...`) call in the external JS file."""
    target = EXTERNAL_JS_TARGETS.get(key, {}).get(stack)
    if not target:
        return False
    content = _load_external_js(target)
    if content is None:
        print(f"  SKIP  External JS file not found: {target}")
        return False

    pat = re.compile(
        r'(add\("' + re.escape(key) + r'",\s*"' + re.escape(stack) + r'",\s*"' +
        re.escape(filename) + r'",\s*`)([\s\S]*?)(`\s*\))',
        re.S
    )
    match = pat.search(content)
    if not match:
        print(f"  SKIP  No add() call in {target} for {key}/{stack}/{filename}")
        return False

    new_content = content[:match.end(1)] + "\n" + code + match.group(3) + content[match.end():]
    _external_js_cache[target] = new_content
    return True


def inject_api_into_external_js(key, method_name, doc):
    """Update or insert an API add() call in an external API JS file."""
    target = EXTERNAL_JS_TARGETS.get(key, {}).get("apis")
    if not target:
        return False
    content = _load_external_js(target)
    if content is None:
        print(f"  SKIP  External JS API file not found: {target}")
        return False

    # Try to update an existing add() call for this method
    pat = re.compile(
        r'(add\("' + re.escape(key) + r'",\s*"apis",\s*"' + re.escape(method_name) +
        r'",\s*`)([\s\S]*?)(`\s*\))',
        re.S
    )
    match = pat.search(content)
    if match:
        new_content = content[:match.end(1)] + "\n" + doc + match.group(3) + content[match.end():]
        _external_js_cache[target] = new_content
        return True

    # No existing call — insert a new one before the closing })();
    insert_marker = "})();"
    pos = content.rfind(insert_marker)
    if pos == -1:
        print(f"  SKIP  Cannot find closing }})(); in {target}")
        return False

    new_add = f'\n  add("{key}", "apis", "{method_name}", `\n{doc}`);\n'
    _external_js_cache[target] = content[:pos] + new_add + content[pos:]
    return True


# ──────────────────────────────────────────────────────────────────────────
# Helpers
# ──────────────────────────────────────────────────────────────────────────

def read_source(entry):
    path = os.path.join(FLUTTER_SRC_PATH, entry["src"])
    if not os.path.isfile(path):
        print(f"  SKIP  {entry['key']} / {entry['file']} — not found at {path}")
        return None
    with open(path, "r", encoding="utf-8") as f:
        code = f.read()
    return code.rstrip() + "\n"


def build_block_regex(key, stack, file):
    open_tag = (
        r'(<script type="text/x-code" data-key="'
        + re.escape(key)
        + r'" data-stack="'
        + re.escape(stack)
        + r'" data-file="'
        + re.escape(file)
        + r'">)'
    )
    return re.compile(open_tag + r"(.*?)(</script>)", re.S)


# ──────────────────────────────────────────────────────────────────────────
# API documentation generator
# ──────────────────────────────────────────────────────────────────────────

def load_api_services():
    """Read api_services.dart and return its content, or None."""
    path = os.path.join(FLUTTER_SRC_PATH, API_SERVICES_REL)
    if not os.path.isfile(path):
        print(f"  WARN  api_services.dart not found at {path}")
        return None
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def _extract_braces(code, start):
    """Return the balanced brace-enclosed block starting at start (the '{')."""
    if start < 0 or code[start] != '{':
        return None, -1
    depth = 0
    for i in range(start, len(code)):
        if code[i] == '{':
            depth += 1
        elif code[i] == '}':
            depth -= 1
            if depth == 0:
                return code[start:i+1], i+1
    return None, -1


def _find_method_definition(api_code, method_name):
    """
    Find Future<ReturnType> methodName(...) in api_services.dart.
    Returns dict with return_type, params_str, body text, or None.
    """
    pat = re.compile(
        r'Future<([^>]+)>\s+' + re.escape(method_name) + r'\s*\(',
        re.S
    )
    m = pat.search(api_code)
    if not m:
        return None

    return_type = m.group(1)

    # Skip past the full parameter list by finding matching )
    paren_depth = 1
    body_start = m.end()
    for i in range(m.end(), len(api_code)):
        if api_code[i] == '(':
            paren_depth += 1
        elif api_code[i] == ')':
            paren_depth -= 1
            if paren_depth == 0:
                body_start = i + 1
                break

    brace_pos = api_code.find('{', body_start)
    if brace_pos == -1:
        return None

    params_text = api_code[m.end():body_start - 1]
    params_text = re.sub(r'\s*async\s*$', '', params_text).strip()
    params_text = re.sub(r'^\{\s*([\s\S]*?)\s*\}$', r'\1', params_text.strip())

    body, _ = _extract_braces(api_code, brace_pos)
    if not body:
        return None

    return {
        "return_type": return_type,
        "params": params_text,
        "body": body,
    }


def _extract_http_info(body):
    m = re.search(r'apiUtils\.(get|post|put|delete)\([^)]*?url:\s*[\'"]([^\'"]+)[\'"]', body)
    if m:
        return m.group(1).upper(), m.group(2)

    m = re.search(r'http\.(get|post|put|delete)\([^)]*?Uri\.parse\([\'"]([^\'"]+)[\'"]', body)
    if m:
        return m.group(1).upper(), m.group(2)

    m = re.search(r'http\.(get|post|put|delete)\(\s*uri', body)
    if m:
        http_verb = m.group(1).upper()
        m2 = re.search(r'Uri\.parse\("([^"]+)"\)', body)
        if m2:
            return http_verb, m2.group(1)
        m2 = re.search(r'StaticData\.(\w+)\s*\+\s*"([^"]+)"', body)
        if m2:
            return http_verb, "${" + m2.group(1) + "}" + m2.group(2)
        return http_verb, "?"

    m = re.search(r'http\.MultipartRequest\("(GET|POST|PUT|DELETE)",', body)
    if m:
        m2 = re.search(r'Uri\.parse\("([^"]+)"\)', body)
        if m2:
            return m.group(1), m2.group(1)
        return m.group(1), "?"

    return None, None


def _extract_body_fields(body):
    return re.findall(r'bodyMap\[\s*["\'](\w+)["\']\s*\]', body)


def _extract_header_fields(body):
    return re.findall(r'headerMap\[\s*["\'](\w+)["\']\s*\]', body)


def _clean_param_type(p):
    p = p.strip()
    p = re.sub(r'\brequired\b', '', p).strip()
    p = re.sub(r'^(\w+\??)\s+(\w+)$', r'\2: \1', p)
    return p


def generate_api_doc(method_name, def_info, controller_file_name):
    return_type = def_info["return_type"]
    params_raw = def_info["params"]
    body = def_info.get("body", "")
    http_verb, url_path = _extract_http_info(body)
    body_fields = _extract_body_fields(body)
    header_fields = _extract_header_fields(body)

    if params_raw.strip():
        param_lines = []
        for p in re.split(r',\s*', params_raw):
            p = p.strip()
            if p:
                p = _clean_param_type(p)
                param_lines.append(p)
        params_display = ",\n    ".join(param_lines)
        params_display = f"{{\n    {params_display}\n  }}"
    else:
        params_display = "()"

    sig = f"  apiService.{method_name}({params_display}) \u2192 Future&lt;{return_type}&gt;"

    if http_verb and url_path:
        http_line = f"  {http_verb} {{{{baseUrl}}}}/{url_path.lstrip('/')}"
        if http_verb in ("POST", "PUT", "PATCH"):
            if "form-urlencoded" in body or "application/x-www-form-urlencoded" in body:
                content_type = "  Content-Type: application/x-www-form-urlencoded"
            else:
                content_type = "  Content-Type: application/json"
        else:
            content_type = ""
    else:
        http_line = ""
        content_type = ""

    req_body_lines = []
    if body_fields:
        req_body_lines.append("Request Body:")
        req_body_lines.append("  {")
        for f in body_fields:
            req_body_lines.append(f'    "{f}": "..."')
        req_body_lines.append("  }")

    header_lines = []
    static_headers = [h for h in header_fields if h not in ("Authorization",)]
    if "Authorization" in header_fields:
        header_lines.append("  Authorization: Bearer {{accessToken}}")
    if static_headers:
        for h in static_headers:
            header_lines.append(f"  {h}: ...")
    if "X-Organization-Id" in header_fields or "X-Organization-Id" in (body or ""):
        header_lines.insert(0, "  X-Organization-Id: all")

    lines = []
    if http_verb and url_path:
        lines.append(f"// {http_verb} {{{{baseUrl}}}}/{url_path.lstrip('/')}")
    lines.append(f"// Controller: {controller_file_name} \u2192 apiService.{method_name}()")
    lines.append("")
    lines.append("Dart Method:")
    lines.append(sig)
    lines.append("")

    if http_verb and url_path:
        lines.append("HTTP Request:")
        lines.append(http_line)
        if header_lines:
            lines.extend(header_lines)
        if content_type:
            lines.append(content_type)
        lines.append("")

    if req_body_lines:
        lines.extend(req_body_lines)
        lines.append("")

    lines.append(f"Response ({return_type}):")
    lines.append("  {")
    lines.append('    "error":   false,')
    lines.append('    "message": "..."')
    if "error" in body:
        lines[-2] = '    "error":   false,'
    lines.append("  }")

    return "\n".join(lines) + "\n"


def _find_api_insertion_point(html, key):
    """Find position after the last existing block for this key (apis, laravel, or flutter)."""
    for stack in ("apis", "laravel", "flutter"):
        pat = re.compile(
            r'<script type="text/x-code" data-key="' + re.escape(key) +
            r'" data-stack="' + stack + r'".*?</script>',
            re.S
        )
        matches = list(pat.finditer(html))
        if matches:
            return matches[-1].end()
    return None


# ──────────────────────────────────────────────────────────────────────────
# API controller auto-discovery
# ──────────────────────────────────────────────────────────────────────────

def build_api_controller_map():
    """Build key-controller mappings from FILE_MAP entries ending with _controller.dart."""
    seen = set()
    result = []
    for entry in FILE_MAP:
        if entry["stack"] != "flutter":
            continue
        if not entry["file"].endswith("_controller.dart"):
            continue
        key = entry["key"]
        if key in seen:
            continue
        seen.add(key)
        ctrl_path = os.path.join(FLUTTER_SRC_PATH, entry["src"])
        if os.path.isfile(ctrl_path):
            result.append(dict(key=key, controller_src=entry["src"]))
    return result


# Keys that should always show API docs, even without an existing block.
ALWAYS_OPT_IN_KEYS = {
    # Sign-up flow
    "sslide-0", "sslide-1", "sslide-2", "sslide-3",
    # Quick Start Wizard (all steps)
    "wslide-0", "wslide-1", "wslide-2", "wslide-3", "wslide-4",
    "wslide-5", "wslide-6", "wslide-7", "wslide-8", "wslide-9",
    "welcome-detail",
    # Create Game Wizard (all steps)
    "cgslide-0", "cgslide-1", "cgslide-2", "cgslide-3", "cgslide-4",
    "cgslide-5", "cgslide-6", "cgslide-7", "cgslide-8", "cgslide-9",
    # Home / misc
    "agenda-detail", "home-detail",
    "viewgame-detail", "addbets-detail",
    # View Results
    "vrslide-0", "vrslide-1", "vrslide-2", "vrslide-3",
    # View Ledger
    "vlslide-0", "vlslide-1", "vlslide-2", "vlslide-3", "vlslide-4",
    # Add Score — common steps (all game types)
    "asslide-0",  "asslide-1",  "asslide-2",  "asslide-3",
    "asslide-4",  "asslide-5",  "asslide-6",  "asslide-7",
    "asslide-8",  "asslide-9",  "asslide-10", "asslide-11",
    # Add Score — Calcutta unique steps
    "asslide-calcutta-0",  "asslide-calcutta-1",  "asslide-calcutta-2",
    "asslide-calcutta-3",  "asslide-calcutta-4",  "asslide-calcutta-5",
    "asslide-calcutta-6",  "asslide-calcutta-7",  "asslide-calcutta-8",
    "asslide-calcutta-9",  "asslide-calcutta-10", "asslide-calcutta-11",
    "asslide-calcutta-12", "asslide-calcutta-13", "asslide-calcutta-14",
    "asslide-calcutta-15", "asslide-calcutta-16", "asslide-calcutta-17",
    # Add Score — Ryder Cup unique steps
    "asslide-ryder_cup-0", "asslide-ryder_cup-1", "asslide-ryder_cup-2",
    "asslide-ryder_cup-3", "asslide-ryder_cup-4", "asslide-ryder_cup-5",
    "asslide-ryder_cup-6", "asslide-ryder_cup-7", "asslide-ryder_cup-8",
    "asslide-ryder_cup-9",
    # Add Score — Horse Race unique steps
    "asslide-horse_race-0", "asslide-horse_race-1",
    "asslide-horse_race-2", "asslide-horse_race-3",
}


def process_api_controllers(html, api_code):
    """
    Auto-discover controllers from FILE_MAP, scan each for apiService calls,
    look up definitions in api_services.dart, update matching API blocks,
    and auto-insert blocks for newly discovered methods.

    Auto-inserts for keys that already have at least one 'apis' block
    OR are listed in ALWAYS_OPT_IN_KEYS.
    """
    if api_code is None:
        print("  SKIP  API doc generation (api_services.dart not available)")
        return html, 0

    api_controller_map = build_api_controller_map()
    if not api_controller_map:
        print("  SKIP  No controllers auto-discovered from FILE_MAP")
        return html, 0

    # Keys already opted in via an existing block
    opted_in = set()
    for m in re.finditer(r'data-key="([^"]+)" data-stack="apis"', html):
        opted_in.add(m.group(1))
    # Also force-opt-in the defined set of keys
    opted_in.update(ALWAYS_OPT_IN_KEYS)

    updated = 0

    for entry in api_controller_map:
        key = entry["key"]
        ctrl_src = entry["controller_src"]
        ctrl_path = os.path.join(FLUTTER_SRC_PATH, ctrl_src)

        if not os.path.isfile(ctrl_path):
            print(f"  SKIP  API scan for {key} — controller not found at {ctrl_path}")
            continue

        with open(ctrl_path, "r", encoding="utf-8") as f:
            ctrl_code = f.read()

        api_calls = sorted(set(
            m for m in re.findall(r'apiService\.(\w+)\s*\(', ctrl_code)
        ))

        if not api_calls:
            continue

        ctrl_filename = os.path.basename(ctrl_src)

        for method_name in api_calls:
            def_info = _find_method_definition(api_code, method_name)
            if not def_info:
                print(f"  SKIP  API {key}/{method_name} \u2014 method not found in api_services.dart")
                continue

            doc = generate_api_doc(method_name, def_info, ctrl_filename)

            # Route keys that live in external JS files
            if key in EXTERNAL_JS_TARGETS and "apis" in EXTERNAL_JS_TARGETS[key]:
                if inject_api_into_external_js(key, method_name, doc):
                    updated += 1
                    print(f"  API {key} / {method_name}  ({len(doc)} chars) \u2192 external JS")
                else:
                    print(f"  SKIP  API {key} / {method_name}  \u2014 external JS update failed")
                continue

            pattern = build_block_regex(key, "apis", method_name)
            match = pattern.search(html)

            if match:
                new_block = match.group(1) + "\n" + doc + match.group(3)
                html = html[:match.start()] + new_block + html[match.end():]
                updated += 1
                print(f"  API {key} / {method_name}  ({len(doc)} chars)")
            elif key in opted_in:
                insert_pos = _find_api_insertion_point(html, key)
                if insert_pos is not None:
                    new_tag = f'<script type="text/x-code" data-key="{key}" data-stack="apis" data-file="{method_name}">'
                    new_block = f"{new_tag}\n{doc}</script>"
                    html = html[:insert_pos] + "\n" + new_block + html[insert_pos:]
                    updated += 1
                    print(f"  NEW  API {key} / {method_name}  ({len(doc)} chars)")
                else:
                    print(f"  SKIP  API {key} / {method_name}  \u2014 no insertion point found")
            else:
                print(f"  SKIP  API {key} / {method_name}  \u2014 no block in HTML, add manually to opt in")

    return html, updated


# ──────────────────────────────────────────────────────────────────────────
# Main
# ──────────────────────────────────────────────────────────────────────────

def main():
    if not os.path.isfile(DOCS_HTML_PATH):
        print(f"Could not find {DOCS_HTML_PATH}")
        sys.exit(1)

    with open(DOCS_HTML_PATH, "r", encoding="utf-8") as f:
        html = f.read()

    # Step 1: Regular source-code injection
    updated = 0
    skipped = 0

    for entry in FILE_MAP:
        key, stack, file = entry["key"], entry["stack"], entry["file"]
        code = read_source(entry)
        if code is None:
            skipped += 1
            continue

        # Route keys that live in external JS files
        if key in EXTERNAL_JS_TARGETS and stack in EXTERNAL_JS_TARGETS[key]:
            if inject_into_external_js(key, stack, file, code):
                updated += 1
                print(f"  Injected {key} / {stack} / {file}  ({len(code)} chars) → external JS")
            else:
                skipped += 1
            continue

        pattern = build_block_regex(key, stack, file)
        match = pattern.search(html)
        if not match:
            print(f"  SKIP  No matching <script> block in HTML for {key} / {stack} / {file}")
            skipped += 1
            continue

        new_block = match.group(1) + "\n" + code + match.group(3)
        html = html[: match.start()] + new_block + html[match.end():]
        updated += 1
        print(f"  Injected {key} / {stack} / {file}  ({len(code)} chars)")

    print(f"\nSource injection: {updated} block(s) updated, {skipped} skipped.")

    # Step 2: Auto-generated API documentation
    api_code = load_api_services()
    html, api_updated = process_api_controllers(html, api_code)
    if api_updated > 0:
        print(f"API injection: {api_updated} block(s) updated.")

    with open(DOCS_HTML_PATH, "w", encoding="utf-8") as f:
        f.write(html)

    # Write external JS files that were modified
    _save_external_js_files()

    total = updated + api_updated
    print(f"\nDone. {total} block(s) updated total.")


if __name__ == "__main__":
    main()
