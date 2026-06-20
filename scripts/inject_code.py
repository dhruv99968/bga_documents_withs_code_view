#!/usr/bin/env python3
"""
inject_code.py
--------------
Reads real source files from the checked-out Flutter (and optionally Laravel)
repo and injects them into the matching
  <script type="text/x-code" data-key="..." data-stack="..." data-file="...">
blocks inside index.html.

Run from the docs repo root in CI (see inject-code.yml), or locally:

    DOCS_HTML_PATH=index.html FLUTTER_SRC_PATH=../bga_flutter_app python3 scripts/inject_code.py
"""

import os
import re
import sys

DOCS_HTML_PATH = os.environ.get("DOCS_HTML_PATH", "index.html")
FLUTTER_SRC_PATH = os.environ.get("FLUTTER_SRC_PATH", "flutter-src")

# ──────────────────────────────────────────────────────────────────────────
# FILE_MAP
# Each entry says: "for this wizard step (key) + this stack (flutter/laravel),
# the file shown to the user as `file` should be pulled from `src` inside the
# matching source repo checkout."
#
# Pre-filled below for the Sign Up — 4 Step wizard (sslide-0 .. sslide-3),
# based on the import paths already present in the embedded code:
#   lib/views/auth_screen/{signup,otp,change_password}_screen.dart
#   lib/controllers/auth_controller/{signup,otp,change_password}_controller.dart
#   lib/views/course/course_screen.dart
#   lib/controllers/course_controller/course_controller.dart
#
# ⚠️ VERIFY these src paths against your actual repo folder structure
# (Step 6 in the setup guide) — update any that don't match.
# ──────────────────────────────────────────────────────────────────────────
FILE_MAP = [
    # ── Signup Flow — 4 Steps ──
    # Step 01 — Account Details
    dict(key="sslide-0", stack="flutter", file="signup_screen.dart",
         src="lib/views/auth/signup_screen.dart"),
    dict(key="sslide-0", stack="flutter", file="signup_controller.dart",
         src="lib/controllers/auth_controller/signup_controller.dart"),

    # Step 02 — OTP Verify
    dict(key="sslide-1", stack="flutter", file="otp_screen.dart",
         src="lib/views/auth/otp_screen.dart"),
    dict(key="sslide-1", stack="flutter", file="otp_controller.dart",
         src="lib/controllers/auth_controller/otp_controller.dart"),

    # Step 03 — Set Password
    dict(key="sslide-2", stack="flutter", file="change_password_screen.dart",
         src="lib/views/auth/change_password_screen.dart"),
    dict(key="sslide-2", stack="flutter", file="change_password_controller.dart",
         src="lib/controllers/auth_controller/change_password_controller.dart"),

    # Step 04 — Home Course
    dict(key="sslide-3", stack="flutter", file="course_screen.dart",
         src="lib/views/course/courses_screen.dart"),
    dict(key="sslide-3", stack="flutter", file="course_controller.dart",
         src="lib/controllers/course_controller/course_controller.dart"),

    # ── Welcome / Intro ──
    dict(key="wslide-0", stack="flutter", file="welcome_screen.dart",
         src="lib/views/auth/welcome_screen.dart"),
    dict(key="wslide-0", stack="flutter", file="welcome_controller.dart",
         src="lib/controllers/auth_controller/welcome_controller.dart"),

    # ── Welcome Detail ──
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

    # NOTE: cgslide-* (Quick Start Wizard) and asslide-* (Score Entry Flow)
    # are intentionally omitted — they use shared/generated code stubs.
]


def read_source(entry):
    path = os.path.join(FLUTTER_SRC_PATH, entry["src"])
    if not os.path.isfile(path):
        print(f"  ⚠️  SKIP  {entry['key']} / {entry['file']} — not found at {path}")
        return None
    with open(path, "r", encoding="utf-8") as f:
        code = f.read()
    # trim trailing whitespace/newlines to match how the existing blocks are stored
    return code.rstrip() + "\n"


def build_block_regex(key, stack, file):
    """
    Matches:
      <script type="text/x-code" data-key="KEY" data-stack="STACK" data-file="FILE">...code...</script>
    capturing the opening tag and the code body separately so we can swap only the body.
    """
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


def main():
    if not os.path.isfile(DOCS_HTML_PATH):
        print(f"❌ Could not find {DOCS_HTML_PATH}")
        sys.exit(1)

    with open(DOCS_HTML_PATH, "r", encoding="utf-8") as f:
        html = f.read()

    updated = 0
    skipped = 0

    for entry in FILE_MAP:
        key, stack, file = entry["key"], entry["stack"], entry["file"]
        code = read_source(entry)
        if code is None:
            skipped += 1
            continue

        pattern = build_block_regex(key, stack, file)
        match = pattern.search(html)
        if not match:
            print(f"  ⚠️  SKIP  No matching <script> block in HTML for {key} / {stack} / {file}")
            skipped += 1
            continue

        new_block = match.group(1) + "\n" + code + match.group(3)
        html = html[: match.start()] + new_block + html[match.end():]
        updated += 1
        print(f"  ✅ Injected {key} / {stack} / {file}  ({len(code)} chars)")

    with open(DOCS_HTML_PATH, "w", encoding="utf-8") as f:
        f.write(html)

    print(f"\nDone. {updated} block(s) updated, {skipped} skipped.")


if __name__ == "__main__":
    main()
