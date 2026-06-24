#!/usr/bin/env python3
"""
extract_sections.py
--------------------
Extracts all remaining sections from code-data-*.js into separate
flutter/, laravel/, api/ files. Run once from the docs repo root.

    python scripts/extract_sections.py
"""

import re, os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + "/JavaScripts"
BT = chr(96)  # backtick — avoids PowerShell escape-char issue when editing this file

JS_HEADER = (
    "// ============================================================\n"
    "// {title}\n"
    "// ============================================================\n\n"
    "window.CODE_DATA = window.CODE_DATA || {{}};\n"
    "(function () {{\n"
    "  function add(k, s, n, c) {{\n"
    "    window.CODE_DATA[k] = window.CODE_DATA[k] || {{}};\n"
    "    window.CODE_DATA[k][s] = window.CODE_DATA[k][s] || [];\n"
    "    window.CODE_DATA[k][s].push({{ name: n, code: c }});\n"
    "  }}\n\n"
)

JS_FOOTER = "\n})();\n"


def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  Wrote {os.path.basename(path)}  ({len(content):,} chars)")


def extract_add_calls(content, target_keys):
    """Extract complete add() calls grouped by key using backtick delimiter."""
    results = {}
    pos = 0
    pattern = re.compile(r'\badd\("([^"]+)"')
    while pos < len(content):
        m = pattern.search(content, pos)
        if not m:
            break
        key = m.group(1)
        call_start = m.start()
        if key not in target_keys:
            pos = m.end()
            continue
        # Find the opening backtick (template literal start)
        bt_s = content.find(BT, call_start)
        if bt_s == -1:
            pos = m.end()
            continue
        # Find the closing backtick (template literal end)
        bt_e = content.find(BT, bt_s + 1)
        if bt_e == -1:
            pos = m.end()
            continue
        # Consume  `);  after closing backtick
        close = bt_e + 1
        if close < len(content) and content[close] == ")":
            close += 1
        if close < len(content) and content[close] == ";":
            close += 1
        call_text = content[call_start:close]
        results.setdefault(key, []).append(call_text)
        pos = close
    return results


def remove_keys_from_content(content, target_keys, redirect_lines):
    """Remove all add() calls for target_keys, inserting a redirect comment once."""
    out = []
    pos = 0
    inserted_redirect = False
    pattern = re.compile(r'\badd\("([^"]+)"')
    while pos < len(content):
        m = pattern.search(content, pos)
        if not m:
            out.append(content[pos:])
            break
        key = m.group(1)
        call_start = m.start()
        if key not in target_keys:
            out.append(content[pos:m.end()])
            pos = m.end()
            continue
        # Keep everything up to (and including) any preceding comment on its own line
        pre = content[pos:call_start]
        comment_m = re.search(r'(\n\s*//[^\n]*\n)\s*$', pre)
        if comment_m:
            pre = pre[:comment_m.start(1) + 1]  # keep up to the newline before comment
        out.append(pre)
        if not inserted_redirect:
            out.append("\n" + redirect_lines + "\n")
            inserted_redirect = True
        # Skip the full add() call
        bt_s = content.find(BT, call_start)
        if bt_s == -1:
            pos = m.end()
            continue
        bt_e = content.find(BT, bt_s + 1)
        if bt_e == -1:
            pos = m.end()
            continue
        close = bt_e + 1
        if close < len(content) and content[close] == ")":
            close += 1
        if close < len(content) and content[close] == ";":
            close += 1
        if close < len(content) and content[close] == "\n":
            close += 1
        pos = close
    return "".join(out)


# ── Section definitions ──────────────────────────────────────────────────────
SECTIONS = [
    {
        "name": "account-setup",
        "title_f": "Flutter — Account Setup (sslide-0 … sslide-3)",
        "title_l": "Laravel — Account Setup (sslide-0 … sslide-3)",
        "title_a": "API Docs — Account Setup (sslide-0 … sslide-3)",
        "keys": ["sslide-0", "sslide-1", "sslide-2", "sslide-3"],
    },
    {
        "name": "create-game-wizard",
        "title_f": "Flutter — Create Game Wizard (cgslide-0 … cgslide-9)",
        "title_l": "Laravel — Create Game Wizard (cgslide-0 … cgslide-9)",
        "title_a": None,  # api/create-game-wizard.js already exists
        "keys": ["cgslide-" + str(i) for i in range(10)],
    },
    {
        "name": "home-detail",
        "title_f": "Flutter — Home Dashboard (home-detail)",
        "title_l": "Laravel — Home Dashboard (home-detail)",
        "title_a": "API Docs — Home Dashboard (home-detail)",
        "keys": ["home-detail"],
    },
    {
        "name": "agenda-detail",
        "title_f": "Flutter — Agenda Detail (agenda-detail)",
        "title_l": "Laravel — Agenda Detail (agenda-detail)",
        "title_a": "API Docs — Agenda Detail (agenda-detail)",
        "keys": ["agenda-detail"],
    },
    {
        "name": "viewgame-detail",
        "title_f": "Flutter — View Game Detail (viewgame-detail)",
        "title_l": "Laravel — View Game Detail (viewgame-detail)",
        "title_a": "API Docs — View Game Detail (viewgame-detail)",
        "keys": ["viewgame-detail"],
    },
    {
        "name": "addbets-detail",
        "title_f": "Flutter — Add Bets (addbets-detail)",
        "title_l": "Laravel — Add Bets (addbets-detail)",
        "title_a": "API Docs — Add Bets (addbets-detail)",
        "keys": ["addbets-detail"],
    },
    {
        "name": "welcome-detail",
        "title_f": "Flutter — Welcome Detail (welcome-detail)",
        "title_l": "Laravel — Welcome Detail (welcome-detail)",
        "title_a": "API Docs — Welcome Detail (welcome-detail)",
        "keys": ["welcome-detail"],
    },
    # wslide and asslide were already extracted in a previous pass but
    # git restore brought back the originals — re-extract them too.
    {
        "name": "quick-start-wizard",
        "title_f": "Flutter — Quick Start Wizard (wslide-0 … wslide-9)",
        "title_l": "Laravel — Quick Start Wizard (wslide-0 … wslide-9)",
        "title_a": "API Docs — Quick Start Wizard (wslide-0 … wslide-9)",
        "keys": ["wslide-" + str(i) for i in range(10)],
    },
    {
        "name": "add-score",
        "title_f": "Flutter — Add Score — Common Steps (asslide-0 … asslide-11)",
        "title_l": None,  # laravel/add-score-common.js already exists
        "title_a": None,  # api/add-score-common.js already exists
        "keys": ["asslide-" + str(i) for i in range(12)],
    },
]


def main():
    flutter_path = BASE + "/code-data-flutter.js"
    laravel_path = BASE + "/code-data-laravel.js"
    apis_path    = BASE + "/code-data-apis.js"

    flutter_content = read_file(flutter_path)
    laravel_content = read_file(laravel_path)
    apis_content    = read_file(apis_path)

    all_keys = set()

    for sec in SECTIONS:
        keys     = sec["keys"]
        name     = sec["name"]
        print(f"\nProcessing {name}  ({len(keys)} key(s))...")

        # Flutter
        if sec.get("title_f"):
            calls = extract_add_calls(flutter_content, keys)
            if calls:
                body = "\n\n".join(
                    "  " + call
                    for key in keys
                    for call in calls.get(key, [])
                )
                write_file(
                    BASE + "/flutter/" + name + ".js",
                    JS_HEADER.format(title=sec["title_f"]) + body + JS_FOOTER,
                )
            else:
                print(f"  WARN  No flutter content found for {name}")

        # Laravel
        if sec.get("title_l"):
            calls = extract_add_calls(laravel_content, keys)
            if calls:
                body = "\n\n".join(
                    "  " + call
                    for key in keys
                    for call in calls.get(key, [])
                )
                write_file(
                    BASE + "/laravel/" + name + ".js",
                    JS_HEADER.format(title=sec["title_l"]) + body + JS_FOOTER,
                )
            else:
                print(f"  WARN  No laravel content found for {name}")

        # APIs
        if sec.get("title_a"):
            calls = extract_add_calls(apis_content, keys)
            if calls:
                body = "\n\n".join(
                    "  " + call
                    for key in keys
                    for call in calls.get(key, [])
                )
                write_file(
                    BASE + "/api/" + name + ".js",
                    JS_HEADER.format(title=sec["title_a"]) + body + JS_FOOTER,
                )
            else:
                # No existing API content — write shell for inject_code.py
                shell = (
                    JS_HEADER.format(title=sec["title_a"])
                    + "  // API docs are auto-generated by inject_code.py from controllers.\n"
                    + JS_FOOTER
                )
                write_file(BASE + "/api/" + name + ".js", shell)

        all_keys.update(keys)

    # ── Remove all extracted keys from the original code-data files ──────────
    print("\nRemoving extracted keys from code-data files...")

    new_f = remove_keys_from_content(
        flutter_content, all_keys,
        "  // These sections are now in separate files under JavaScripts/flutter/"
    )
    write_file(flutter_path, new_f)

    new_l = remove_keys_from_content(
        laravel_content, all_keys,
        "  // These sections are now in separate files under JavaScripts/laravel/"
    )
    write_file(laravel_path, new_l)

    new_a = remove_keys_from_content(
        apis_content, all_keys,
        "  // These sections are now in separate files under JavaScripts/api/"
    )
    write_file(apis_path, new_a)

    print("\nAll done.")


if __name__ == "__main__":
    main()
