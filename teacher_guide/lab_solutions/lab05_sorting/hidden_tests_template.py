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
HIDDEN_MAIN = r'''#include "lab05_sorting.h"
#include <stdio.h>

static int sorted(const int *a, int n) {
    for (int i = 1; i < n; ++i) if (a[i - 1] > a[i]) return 0;
    return 1;
}

int main(void) {
    int a[] = {5, 4, 3, 2, 1};
    int b[] = {1};
    int c[] = {2, 0, 2, 1};
    int out[4];
    insertion_sort(a, 5);
    merge_sort(b, 1);
    if (!counting_sort(c, 4, out, 2)) return 1;
    if (!sorted(a, 5) || b[0] != 1 || !sorted(out, 4)) return 2;
    if (out[0] != 0 || out[1] != 1 || out[2] != 2 || out[3] != 2) return 3;
    puts("hidden: ok");
    return 0;
}
'''
LAB_ROOT = Path(__file__).resolve().parents[3] / "assignments" / "lab05_sorting"
HEADER_PATH = LAB_ROOT / "starter" / "lab05_sorting.h"

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

