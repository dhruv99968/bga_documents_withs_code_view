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

    # NOTE: cgslide-* (Quick Start Wizard) and asslide-* (Score Entry Flow)
    # are intentionally omitted — they use shared/generated code stubs.
]


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
# These come from the screens the project has opted in for.
ALWAYS_OPT_IN_KEYS = {
    "sslide-0", "sslide-1", "sslide-2", "sslide-3",
    "wslide-0", "welcome-detail",
    "agenda-detail", "home-detail",
    "viewgame-detail", "addbets-detail",
    "vrslide-0", "vrslide-1", "vrslide-2", "vrslide-3",
    "vlslide-0", "vlslide-1", "vlslide-2", "vlslide-3", "vlslide-4",
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

    total = updated + api_updated
    print(f"\nDone. {total} block(s) updated total.")


if __name__ == "__main__":
    main()
