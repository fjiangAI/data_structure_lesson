import argparse
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


EXPECTED_PUBLIC = [
    "bfs: A B C D E",
    "dist D: 9",
    "hash 46: found"
]
HIDDEN_CASES = [
    {
        "id": "disconnected-bfs",
        "trigger": "非连通图从 A 遍历",
        "expected": "只访问 A 所在连通分量"
    },
    {
        "id": "cycle-dfs",
        "trigger": "有环图 DFS",
        "expected": "visited 防止无限递归"
    },
    {
        "id": "unreachable-shortest",
        "trigger": "Dijkstra 查询不可达顶点",
        "expected": "距离保持 INF"
    },
    {
        "id": "negative-edge",
        "trigger": "含负权边",
        "expected": "拒绝运行或明确说明 Dijkstra 不适用"
    },
    {
        "id": "hash-collision",
        "trigger": "多个 key 落入同一桶",
        "expected": "探测/链地址策略一致"
    }
]
REQUIRED_SIGNALS = [
    "visited",
    "dist",
    "hash"
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
    if "LAB04_STARTER" in text:
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
    parser = argparse.ArgumentParser(description="Hidden test template for 图遍历、最短路与查找结构.")
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

