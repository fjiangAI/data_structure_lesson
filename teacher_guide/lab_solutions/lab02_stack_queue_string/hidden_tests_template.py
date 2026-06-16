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
HIDDEN_CASES = [
    {
        "id": "empty-pop",
        "trigger": "空栈 pop",
        "expected": "返回失败，不访问非法栈顶"
    },
    {
        "id": "mismatch-bracket",
        "trigger": "表达式 ([)]",
        "expected": "判定不匹配"
    },
    {
        "id": "queue-wrap",
        "trigger": "循环队列多次入队出队后回绕",
        "expected": "front/rear 取模正确"
    },
    {
        "id": "full-queue",
        "trigger": "循环队列满后继续入队",
        "expected": "返回失败且不覆盖 front"
    },
    {
        "id": "kmp-overlap",
        "trigger": "文本 aaaaa，模式 aaa",
        "expected": "能处理重叠匹配或说明返回第一个匹配"
    }
]
REQUIRED_SIGNALS = [
    "stack",
    "queue",
    "match"
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
    if "LAB02_STARTER" in text:
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
    parser = argparse.ArgumentParser(description="Hidden test template for 受限线性结构与串匹配.")
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

