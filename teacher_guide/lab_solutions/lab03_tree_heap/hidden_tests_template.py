import argparse
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


EXPECTED_PUBLIC = [
    "preorder: A B D E C F",
    "avl-root: 20",
    "heap-pop: 3 7 12"
]
HIDDEN_CASES = [
    {
        "id": "single-node",
        "trigger": "单结点树遍历",
        "expected": "三种遍历均只输出一个结点"
    },
    {
        "id": "empty-tree",
        "trigger": "空树高度与遍历",
        "expected": "高度和遍历定义清楚，不解引用 NULL"
    },
    {
        "id": "avl-ll",
        "trigger": "插入 30,20,10",
        "expected": "触发右旋并保持中序有序"
    },
    {
        "id": "avl-lr",
        "trigger": "插入 30,10,20",
        "expected": "触发左右旋"
    },
    {
        "id": "heap-duplicates",
        "trigger": "堆中有重复关键字",
        "expected": "pop 序列仍非降序"
    }
]
REQUIRED_SIGNALS = [
    "tree",
    "avl",
    "heap"
]
HIDDEN_MAIN = r'''#include "lab03_tree_heap.h"
#include <stdio.h>
#include <string.h>

int main(void) {
    char order[64];
    tree_demo_preorder(order, sizeof(order));
    if (strcmp(order, "A B D E C F") != 0) return 1;
    if (avl_demo_root() != 20) return 2;
    MinHeap heap;
    heap_init(&heap);
    int values[] = {5, 1, 5, 0};
    for (int i = 0; i < 4; ++i) if (!heap_push(&heap, values[i])) return 3;
    int x = 0;
    int expected[] = {0, 1, 5, 5};
    for (int i = 0; i < 4; ++i) {
        if (!heap_pop(&heap, &x) || x != expected[i]) return 4;
    }
    if (heap_pop(&heap, &x)) return 5;
    puts("hidden: ok");
    return 0;
}
'''
LAB_ROOT = Path(__file__).resolve().parents[3] / "assignments" / "lab03_tree_heap"
HEADER_PATH = LAB_ROOT / "starter" / "lab03_tree_heap.h"

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
    if "LAB03_STARTER" in text:
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
    parser = argparse.ArgumentParser(description="Hidden test template for 树、AVL 与堆.")
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

