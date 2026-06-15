from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", "_site", "build", "verification_screenshots"}


def iter_text_files():
    suffixes = {".md", ".html", ".css", ".js", ".py", ".yml", ".yaml", ".json", ".c", ".h", ".txt"}
    for path in ROOT.rglob("*"):
        if any(part in SKIP_DIRS for part in path.parts):
            continue
        if path.is_file() and path.suffix.lower() in suffixes:
            yield path


def main():
    failures = []
    for path in iter_text_files():
        data = path.read_bytes()
        if path.suffix.lower() == ".c" and not data.startswith(b"\xef\xbb\xbf"):
            failures.append(f"{path.relative_to(ROOT)} should be UTF-8 with BOM for Windows editors")
        try:
            data.decode("utf-8-sig")
        except UnicodeDecodeError as exc:
            failures.append(f"{path.relative_to(ROOT)} is not valid UTF-8: {exc}")
    if failures:
        print("Encoding check failed:")
        for item in failures:
            print("-", item)
        raise SystemExit(1)
    print("Encoding check passed.")


if __name__ == "__main__":
    main()

