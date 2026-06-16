import argparse
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


EXPECTED_PUBLIC = [
    "find 202403: Wang 95",
    "rank: Wang Lin Chen Zhao",
    "delete 202402: ok"
]
HIDDEN_CASES = [
    {
        "id": "duplicate-id",
        "trigger": "重复学号插入",
        "expected": "拒绝插入或更新策略明确"
    },
    {
        "id": "delete-reindex",
        "trigger": "删除中间记录后继续查找",
        "expected": "哈希索引中的下标同步更新"
    },
    {
        "id": "tie-rank",
        "trigger": "成绩相同",
        "expected": "排名规则稳定且可解释"
    },
    {
        "id": "missing-delete",
        "trigger": "删除不存在学号",
        "expected": "返回失败且结构不变"
    },
    {
        "id": "rehash-load",
        "trigger": "大量插入导致高装载因子",
        "expected": "扩容或冲突策略可证明"
    }
]
REQUIRED_SIGNALS = [
    "struct",
    "find",
    "delete"
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
    if "LAB06_STARTER" in text:
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
    parser = argparse.ArgumentParser(description="Hidden test template for 学生记录索引系统.")
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

