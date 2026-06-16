import json
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "assignments" / "labs.json"

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")


def main():
    labs = json.loads(MANIFEST.read_text(encoding="utf-8"))
    failures = []
    for lab in labs:
        lab_dir = ROOT / lab["folder"]
        test = lab_dir / lab["test"]
        solution_dir = ROOT / "teacher_guide" / "lab_solutions" / f"{lab['id']}_{lab['slug']}"
        source = solution_dir / "reference_solution.c"
        if not source.exists():
            failures.append((lab["id"], "missing reference_solution.c"))
            continue
        result = subprocess.run(
            [sys.executable, str(test), "--source", str(source)],
            cwd=lab_dir,
            text=True,
            capture_output=True,
            encoding="utf-8",
            errors="replace",
        )
        if result.returncode != 0:
            failures.append((lab["id"], (result.stdout or "") + (result.stderr or "")))
        else:
            print(f"[PASS] {lab['id']} {lab['title']}")

    if failures:
        print("Reference solution public test failures:")
        for lab_id, message in failures:
            print(f"- {lab_id}: {message.strip()}")
        raise SystemExit(1)

    print(f"Reference public tests passed for {len(labs)} lab(s).")


if __name__ == "__main__":
    main()

