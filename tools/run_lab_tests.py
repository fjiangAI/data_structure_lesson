import argparse
import json
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "assignments" / "labs.json"


def load_labs():
    return json.loads(MANIFEST.read_text(encoding="utf-8"))


def find_solution(lab, source_root):
    if not source_root:
        return ROOT / lab["folder"] / lab["source"]
    root = Path(source_root)
    candidates = [
        root / Path(lab["source"]).name,
        root / lab["folder"] / Path(lab["source"]).name,
        root / lab["id"] / Path(lab["source"]).name,
    ]
    for candidate in candidates:
        if candidate.exists():
            return candidate
    raise FileNotFoundError(f"Cannot find source for {lab['id']} under {root}")


def run_one(lab, source_root, expect_starter_fail):
    lab_dir = ROOT / lab["folder"]
    test = lab_dir / lab["test"]
    source = find_solution(lab, source_root)
    cmd = [sys.executable, str(test), "--source", str(source)]
    result = subprocess.run(cmd, cwd=lab_dir, text=True, capture_output=True)
    starter_mode = source_root is None
    if result.returncode == 0:
        status = "PASS"
        ok = not (starter_mode and expect_starter_fail)
    else:
        status = "FAIL"
        ok = starter_mode and expect_starter_fail
    return {
        "id": lab["id"],
        "title": lab["title"],
        "source": str(source.relative_to(ROOT) if source.is_relative_to(ROOT) else source),
        "status": status,
        "ok": ok,
        "stdout": result.stdout.strip(),
        "stderr": result.stderr.strip(),
    }


def main():
    parser = argparse.ArgumentParser(description="Run public tests for course labs.")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--all", action="store_true", help="Run all labs.")
    group.add_argument("--lab", help="Run one lab id, such as lab01.")
    parser.add_argument("--source-root", help="Directory containing student C files.")
    parser.add_argument("--expect-starter-fail", action="store_true", help="Treat starter failure as expected.")
    args = parser.parse_args()

    labs = load_labs()
    if args.lab:
        labs = [lab for lab in labs if lab["id"] == args.lab]
        if not labs:
            raise SystemExit(f"Unknown lab id: {args.lab}")

    results = [run_one(lab, args.source_root, args.expect_starter_fail) for lab in labs]
    for item in results:
        mark = "OK" if item["ok"] else "ERR"
        print(f"[{mark}] {item['id']} {item['status']} {item['title']}")
        if item["stdout"]:
            print(item["stdout"])
        if item["stderr"]:
            print(item["stderr"])

    if not all(item["ok"] for item in results):
        raise SystemExit(1)


if __name__ == "__main__":
    main()

