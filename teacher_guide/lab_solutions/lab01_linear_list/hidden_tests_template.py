import argparse
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


EXPECTED_PUBLIC = [
    "seq: 10 20 25 30",
    "list: 30 25 20 10",
    "find 25: yes"
]
HIDDEN_CASES = [
    {
        "id": "empty-seq",
        "trigger": "顺序表为空时删除下标 0",
        "expected": "返回失败且 size 保持 0"
    },
    {
        "id": "full-insert",
        "trigger": "容量已满时继续插入",
        "expected": "返回失败且原有元素顺序不变"
    },
    {
        "id": "head-delete",
        "trigger": "链表删除首元结点",
        "expected": "head 正确越过目标结点并释放内存"
    },
    {
        "id": "duplicate-find",
        "trigger": "插入重复值后查找",
        "expected": "能说明返回第一个匹配或全部匹配的策略"
    },
    {
        "id": "middle-insert",
        "trigger": "顺序表在中间插入",
        "expected": "只移动必要后缀，不覆盖原值"
    }
]
REQUIRED_SIGNALS = [
    "SeqList",
    "ListNode",
    "insert",
    "find"
]
HIDDEN_MAIN = r'''#include "lab01_linear_list.h"
#include <stdio.h>

int main(void) {
    SeqList seq;
    seq_init(&seq, 2);
    if (!seq_insert(&seq, 0, 1)) return 1;
    if (!seq_insert(&seq, 1, 2)) return 2;
    if (seq_insert(&seq, 2, 3)) return 3;
    if (!seq_erase(&seq, 0) || seq.size != 1 || seq.data[0] != 2) return 4;
    ListNode *head = 0;
    list_push_front(&head, 10);
    list_push_front(&head, 20);
    if (!list_find(head, 10) || list_find(head, 99)) return 5;
    if (!list_delete_value(&head, 10) || list_delete_value(&head, 99)) return 6;
    list_clear(&head);
    if (head != 0) return 7;
    puts("hidden: ok");
    return 0;
}
'''
LAB_ROOT = Path(__file__).resolve().parents[3] / "assignments" / "lab01_linear_list"
HEADER_PATH = LAB_ROOT / "starter" / "lab01_linear_list.h"

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
    if "LAB01_STARTER" in text:
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
    parser = argparse.ArgumentParser(description="Hidden test template for 线性表实现与对比.")
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

