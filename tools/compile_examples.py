import argparse
import os
import platform
import shutil
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def find_compiler():
    preferred = os.environ.get("CC")
    candidates = [preferred] if preferred else []
    candidates.extend(["gcc", "clang", "cc"])
    for candidate in candidates:
        if candidate and shutil.which(candidate):
            return candidate
    return None


def source_files():
    return sorted(ROOT.glob("week*/examples/*.c"))


def output_name(source):
    stem = f"{source.parents[1].name}_{source.stem}"
    suffix = ".exe" if platform.system().lower().startswith("win") else ""
    return stem + suffix


def main():
    parser = argparse.ArgumentParser(description="Compile every C example in the course repository.")
    parser.add_argument("--require-compiler", action="store_true", help="fail if gcc/clang/cc is not available")
    parser.add_argument("--list", action="store_true", help="only list discovered source files")
    parser.add_argument("--build-dir", default="build/examples", help="directory for compiled outputs")
    args = parser.parse_args()

    sources = source_files()
    if not sources:
        raise SystemExit("No C examples found under week*/examples/*.c")

    if args.list:
        for source in sources:
            print(source.relative_to(ROOT).as_posix())
        return

    compiler = find_compiler()
    if not compiler:
        message = "No C compiler found. Install gcc or clang, or set CC to a compiler executable."
        if args.require_compiler:
            raise SystemExit(message)
        print(message)
        return

    build_dir = ROOT / args.build_dir
    build_dir.mkdir(parents=True, exist_ok=True)
    failures = []

    for source in sources:
        output = build_dir / output_name(source)
        command = [
            compiler,
            "-std=c11",
            "-Wall",
            "-Wextra",
            str(source),
            "-o",
            str(output),
        ]
        print("Compiling", source.relative_to(ROOT).as_posix())
        result = subprocess.run(command, cwd=ROOT, text=True, capture_output=True)
        if result.returncode != 0:
            failures.append((source, result.stdout, result.stderr))
            print(result.stdout)
            print(result.stderr)

    if failures:
        print(f"\n{len(failures)} C example(s) failed to compile:")
        for source, _, _ in failures:
            print("-", source.relative_to(ROOT).as_posix())
        raise SystemExit(1)

    print(f"Compiled {len(sources)} C example(s) into {build_dir.relative_to(ROOT).as_posix()}")


if __name__ == "__main__":
    main()

