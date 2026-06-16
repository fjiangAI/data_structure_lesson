import argparse
import os
import platform
import shutil
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
EXPECTED = ROOT / "expected_output.txt"
BUILD = ROOT / "build"

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")


def relative_or_copy(source):
    try:
        return source.relative_to(ROOT).as_posix()
    except ValueError:
        copied = BUILD / source.name
        shutil.copyfile(source, copied)
        return copied.relative_to(ROOT).as_posix()


def main():
    parser = argparse.ArgumentParser(description="Compile and test this ADT-style lab.")
    parser.add_argument("--source", default=str(ROOT / "starter" / "lab03_tree_heap.c"), help="C implementation file to test.")
    parser.add_argument("--cc", default=os.environ.get("CC", "gcc"), help="C compiler, default gcc or CC env.")
    parser.add_argument("--keep-build", action="store_true", help="Keep build directory after running.")
    args = parser.parse_args()
    source = Path(args.source).resolve()
    if not source.exists():
        raise SystemExit(f"Source file does not exist: {source}")
    compiler = shutil.which(args.cc)
    if compiler is None:
        raise SystemExit(f"Compiler not found: {args.cc}. Install gcc/clang or set CC.")
    BUILD.mkdir(exist_ok=True)
    source_arg = relative_or_copy(source)
    suffix = ".exe" if platform.system().lower().startswith("win") else ""
    exe = BUILD / (f"{source.stem}_{os.getpid()}{suffix}")
    output_arg = exe.relative_to(ROOT).as_posix()
    compile_cmd = [
        compiler,
        "-std=c11",
        "-Wall",
        "-Wextra",
        "-I",
        "starter",
        source_arg,
        "tests/public_main.c",
        "-o",
        output_arg,
    ]
    try:
        subprocess.run(compile_cmd, check=True, cwd=ROOT)
        result = subprocess.run(
            [str(exe)],
            check=True,
            text=True,
            capture_output=True,
            encoding="utf-8",
            errors="replace",
        )
    finally:
        if not args.keep_build:
            exe.unlink(missing_ok=True)
    expected = EXPECTED.read_text(encoding="utf-8").strip()
    actual = result.stdout.strip()
    if actual != expected:
        print("Expected:")
        print(expected)
        print("\nActual:")
        print(actual)
        raise SystemExit(1)
    print("Lab test passed.")


if __name__ == "__main__":
    main()

