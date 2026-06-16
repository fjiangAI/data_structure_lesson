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
    "StudentSystem",
    "find",
    "delete"
]
HIDDEN_MAIN = r'''#include "lab06_integrated_project.h"
#include <stdio.h>
#include <string.h>

int main(void) {
    StudentSystem sys;
    system_init(&sys);
    if (!system_add(&sys, 1, "A", 70)) return 1;
    if (system_add(&sys, 1, "B", 90)) return 2;
    if (!system_add(&sys, 2, "B", 90) || !system_add(&sys, 3, "C", 80)) return 3;
    if (!system_find(&sys, 2)) return 4;
    if (!system_delete(&sys, 2) || system_find(&sys, 2)) return 5;
    char rank[64];
    system_rank_names(&sys, rank, sizeof(rank));
    if (strcmp(rank, "C A") != 0) return 6;
    puts("hidden: ok");
    return 0;
}
'''
LAB_ROOT = Path(__file__).resolve().parents[3] / "assignments" / "lab06_integrated_project"
HEADER_PATH = LAB_ROOT / "starter" / "lab06_integrated_project.h"

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")


def source_arg_for(source, tmp):
    try:
        return source.relative_to(LAB_ROOT).as_posix()
    except ValueError:
        copied = Path(tmp) / source.name
        shutil.copyfile(source, copied)
        return str(copied)


def compile_and_run(source, compiler, hidden=False):
    compiler_path = shutil.which(compiler)
    if compiler_path is None:
        raise SystemExit(f"Compiler not found: {compiler}")
    source = Path(source).resolve()
    with tempfile.TemporaryDirectory() as tmp:
        exe = Path(tmp) / ("solution.exe" if os.name == "nt" else "solution")
        harness = Path(tmp) / "hidden_main.c" if hidden else LAB_ROOT / "tests" / "public_main.c"
        if hidden:
            harness.write_text(HIDDEN_MAIN, encoding="utf-8")
        subprocess.run(
            [
                compiler_path,
                "-std=c11",
                "-Wall",
                "-Wextra",
                "-I",
                "starter",
                source_arg_for(source, tmp),
                str(harness) if hidden else "tests/public_main.c",
                "-o",
                str(exe),
            ],
            check=True,
            cwd=LAB_ROOT,
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
    if HEADER_PATH.exists():
        text += "\n" + HEADER_PATH.read_text(encoding="utf-8-sig", errors="replace")
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
    actual = compile_and_run(source, args.cc, hidden=False)
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

    hidden_actual = compile_and_run(source, args.cc, hidden=True)
    if hidden_actual != ["hidden: ok"]:
        print("Hidden harness failed.")
        print("Actual:", hidden_actual)
        raise SystemExit(1)

    print_hidden_case_plan()
    print("Automatic hidden checks passed. Add more private cases before formal grading.")


if __name__ == "__main__":
    main()

