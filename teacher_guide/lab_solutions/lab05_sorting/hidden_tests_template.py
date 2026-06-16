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
HIDDEN_CASES = [
    {
        "id": "already-sorted",
        "trigger": "输入已升序",
        "expected": "插入/归并/计数保持正确，比较移动成本可解释"
    },
    {
        "id": "reverse-sorted",
        "trigger": "输入逆序",
        "expected": "简单排序能体现最坏移动"
    },
    {
        "id": "duplicates",
        "trigger": "存在重复关键字",
        "expected": "说明稳定性或给出稳定输出"
    },
    {
        "id": "negative-values",
        "trigger": "含负数",
        "expected": "比较排序支持；计数排序需偏移或拒绝"
    },
    {
        "id": "single-element",
        "trigger": "单元素数组",
        "expected": "不发生越界访问"
    }
]
REQUIRED_SIGNALS = [
    "sort",
    "merge",
    "count"
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


def inspect_source(source, enforce_signals=False):
    text = Path(source).read_text(encoding="utf-8-sig", errors="replace")
    fatal = []
    warnings = []
    if "TODO" in text:
        fatal.append("source still contains TODO markers")
    if "LAB05_STARTER" in text:
        fatal.append("starter placeholder output is still present")
    lowered = text.lower()
    missing = [token for token in REQUIRED_SIGNALS if token.lower() not in lowered]
    if missing:
        warnings.append("missing structure signal(s): " + ", ".join(missing))
    if enforce_signals and missing:
        fatal.append("required structure signals are missing: " + ", ".join(missing))
    return fatal, warnings


def print_hidden_case_plan():
    print("Hidden scenario samples for private grading:")
    for case in HIDDEN_CASES:
        print(f"- {case['id']}: {case['trigger']} -> {case['expected']}")


def main():
    parser = argparse.ArgumentParser(description="Hidden test template for 排序算法实验.")
    parser.add_argument("source", help="Student C source file.")
    parser.add_argument("--cc", default=os.environ.get("CC", "gcc"))
    parser.add_argument("--enforce-signals", action="store_true", help="Fail when source does not contain suggested structure signals.")
    args = parser.parse_args()

    source = Path(args.source)
    actual = compile_and_run(source, args.cc)
    if actual != EXPECTED_PUBLIC:
        print("Public-output compatibility failed.")
        print("Expected:", EXPECTED_PUBLIC)
        print("Actual:", actual)
        raise SystemExit(1)

    fatal, warnings = inspect_source(source, args.enforce_signals)
    for warning in warnings:
        print("Warning:", warning)
    if fatal:
        print("Automatic hidden checks failed:")
        for item in fatal:
            print("-", item)
        raise SystemExit(1)

    print_hidden_case_plan()
    print("Automatic hidden checks passed. Move the scenario samples into a private harness for formal grading.")


if __name__ == "__main__":
    main()

