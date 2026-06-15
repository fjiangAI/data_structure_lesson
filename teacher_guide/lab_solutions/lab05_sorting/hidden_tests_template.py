import argparse
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


EXPECTED_PUBLIC = [
    "insertion: 3 10 14 14 29 37",
    "merge: 3 9 10 27 38 43 82",
    "counting: 1 2 2 3 3 4 8"
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
    parser = argparse.ArgumentParser(description="Hidden test template for 排序算法实验.")
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
    # - 插入排序: add one boundary, duplicate, empty, or stress case.
    # - 归并排序: add one boundary, duplicate, empty, or stress case.
    # - 计数排序: add one boundary, duplicate, empty, or stress case.
    # - 稳定性: add one boundary, duplicate, empty, or stress case.
    print("Hidden test template passed. Add real hidden cases before formal grading.")


if __name__ == "__main__":
    main()

