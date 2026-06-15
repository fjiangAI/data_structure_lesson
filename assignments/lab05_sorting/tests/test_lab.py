import argparse
import os
import platform
import shutil
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
EXPECTED = ROOT / "expected_output.txt"
BUILD = ROOT / "build"
EXE = BUILD / ("lab05_sorting" + (".exe" if platform.system().lower().startswith("win") else ""))


def main():
    parser = argparse.ArgumentParser(description="Compile and test this lab.")
    parser.add_argument("--source", default=str(ROOT / "starter" / "lab05_sorting.c"), help="C source file to test.")
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
    compile_cmd = [compiler, "-std=c11", "-Wall", "-Wextra", str(source), "-o", str(EXE)]
    subprocess.run(compile_cmd, check=True)
    result = subprocess.run([str(EXE)], check=True, text=True, capture_output=True)
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

