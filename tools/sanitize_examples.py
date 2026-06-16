import argparse
import os
import platform
import shutil
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")


def find_compiler():
    preferred = os.environ.get("CC")
    candidates = [preferred] if preferred else []
    candidates.extend(["gcc", "clang", "cc"])
    for candidate in candidates:
        if candidate and shutil.which(candidate):
            return candidate
    return None


def main():
    parser = argparse.ArgumentParser(description="Compile and run C examples with sanitizers where supported.")
    parser.add_argument("--force", action="store_true", help="run even on Windows")
    args = parser.parse_args()

    if platform.system().lower().startswith("win") and not args.force:
        print("Sanitizer check skipped on Windows. Run on Linux CI or pass --force.")
        return

    compiler = find_compiler()
    if not compiler:
        raise SystemExit("No C compiler found. Install gcc/clang, or set CC.")

    build_dir = ROOT / "build" / "sanitize"
    build_dir.mkdir(parents=True, exist_ok=True)
    failures = []
    env = os.environ.copy()
    env.setdefault("ASAN_OPTIONS", "detect_leaks=0:abort_on_error=1")
    env.setdefault("UBSAN_OPTIONS", "halt_on_error=1")

    for source in sorted(ROOT.glob("week*/examples/*.c")):
        exe = build_dir / (f"{source.parents[1].name}_{source.stem}" + (".exe" if platform.system().lower().startswith("win") else ""))
        command = [
            compiler,
            "-std=c11",
            "-Wall",
            "-Wextra",
            "-g",
            "-O1",
            "-fno-omit-frame-pointer",
            "-fsanitize=address,undefined",
            source.relative_to(ROOT).as_posix(),
            "-o",
            exe.relative_to(ROOT).as_posix(),
        ]
        print("Sanitizing", source.relative_to(ROOT).as_posix())
        compile_result = subprocess.run(
            command,
            cwd=ROOT,
            text=True,
            capture_output=True,
            encoding="utf-8",
            errors="replace",
        )
        if compile_result.returncode != 0:
            failures.append((source, "compile", compile_result.stdout + compile_result.stderr))
            continue
        run_result = subprocess.run(
            [str(exe)],
            cwd=ROOT,
            text=True,
            capture_output=True,
            encoding="utf-8",
            errors="replace",
            timeout=10,
            env=env,
        )
        if run_result.returncode != 0:
            failures.append((source, "run", run_result.stdout + run_result.stderr))

    if failures:
        print("Sanitizer failures:")
        for source, stage, output in failures:
            print(f"- {source.relative_to(ROOT).as_posix()} ({stage})")
            print(output.strip())
        raise SystemExit(1)

    print("Sanitizer check passed for all C examples.")


if __name__ == "__main__":
    main()

