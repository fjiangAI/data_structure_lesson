import platform
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "starter" / "lab03_tree_heap.c"
EXPECTED = ROOT / "expected_output.txt"
BUILD = ROOT / "build"
EXE = BUILD / ("lab03_tree_heap" + (".exe" if platform.system().lower().startswith("win") else ""))


def main():
    BUILD.mkdir(exist_ok=True)
    compile_cmd = ["gcc", "-std=c11", "-Wall", "-Wextra", str(SOURCE), "-o", str(EXE)]
    subprocess.run(compile_cmd, check=True)
    result = subprocess.run([str(EXE)], check=True, text=True, capture_output=True)
    expected = EXPECTED.read_text(encoding="utf-8").strip()
    actual = result.stdout.strip()
    if actual != expected:
        print("Expected:")
        print(expected)
        print("\nActual:")
        print(actual)
        raise SystemExit(1)
    print("Lab test passed.")


if __name__ == "__main__":
    main()

