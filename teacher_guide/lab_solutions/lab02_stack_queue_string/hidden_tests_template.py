import argparse
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


EXPECTED_PUBLIC = [
    "brackets: matched",
    "queue: 30 40 50 60 70",
    "match abcac: 5"
]

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")


def compile_and_run(source, compiler):
    compiler_path = shutil.which(compiler)
    if compiler_path is None:
        raise SystemExit(f"Compiler not found: {compiler}")
    source = Path(source).resolve()
    with tempfile.TemporaryDirectory() as tmp:
        exe = Path(tmp) / ("solution.exe" if os.name == "nt" else "solution")
        subprocess.run(
            [compiler_path, "-std=c11", "-Wall", "-Wextra", source.name, "-o", str(exe)],
            check=True,
            cwd=source.parent,
        )
        return subprocess.run(
            [str(exe)],
            check=True,
            text=True,
            capture_output=True,
            encoding="utf-8",
            errors="replace",
        ).stdout.strip().splitlines()


def main():
    parser = argparse.ArgumentParser(description="Hidden test template for 受限线性结构与串匹配.")
    parser.add_argument("source", help="Student C source file.")
    parser.add_argument("--cc", default=os.environ.get("CC", "gcc"))
    args = parser.parse_args()

    actual = compile_and_run(Path(args.source), args.cc)
    if actual != EXPECTED_PUBLIC:
        print("Public-output compatibility failed.")
        print("Expected:", EXPECTED_PUBLIC)
        print("Actual:", actual)
        raise SystemExit(1)

    # TODO: Replace or extend the check above with hidden cases.
    # Recommended hidden dimensions:
    # - 栈: add one boundary, duplicate, empty, or stress case.
    # - 循环队列: add one boundary, duplicate, empty, or stress case.
    # - 串匹配: add one boundary, duplicate, empty, or stress case.
    # - KMP: add one boundary, duplicate, empty, or stress case.
    print("Hidden test template passed. Add real hidden cases before formal grading.")


if __name__ == "__main__":
    main()

