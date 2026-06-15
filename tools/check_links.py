import re
from pathlib import Path
from urllib.parse import unquote


ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", "_site", "build", "verification_screenshots"}
HTML_ATTR_RE = re.compile(r'(?:href|src)="([^"]+)"')
MD_LINK_RE = re.compile(r'(?<!!)\[[^\]]+\]\(([^)]+)\)')


def iter_files(pattern):
    for path in ROOT.rglob(pattern):
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        yield path


def is_external(target):
    return (
        target.startswith("#")
        or target.startswith("http://")
        or target.startswith("https://")
        or target.startswith("mailto:")
        or target.startswith("data:")
        or target.startswith("javascript:")
    )


def clean_target(target):
    target = target.strip()
    if target.startswith("<") and target.endswith(">"):
        target = target[1:-1]
    target = target.split("#", 1)[0].split("?", 1)[0]
    return unquote(target)


def check_target(source, raw, failures):
    if not raw or is_external(raw):
        return
    target = clean_target(raw)
    if not target:
        return
    resolved = (source.parent / target).resolve()
    try:
        resolved.relative_to(ROOT)
    except ValueError:
        failures.append(f"{source.relative_to(ROOT)} -> {raw} escapes repository")
        return
    if not resolved.exists():
        failures.append(f"{source.relative_to(ROOT)} -> {raw} missing")


def main():
    failures = []
    for html in iter_files("*.html"):
        text = html.read_text(encoding="utf-8-sig")
        for match in HTML_ATTR_RE.finditer(text):
            check_target(html, match.group(1), failures)

    for md in iter_files("*.md"):
        text = md.read_text(encoding="utf-8-sig")
        for match in MD_LINK_RE.finditer(text):
            check_target(md, match.group(1), failures)

    if failures:
        print("Broken local links:")
        for item in failures:
            print("-", item)
        raise SystemExit(1)
    print("Local link check passed.")


if __name__ == "__main__":
    main()

