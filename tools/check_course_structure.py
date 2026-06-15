import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
WEEK_RE = re.compile(r"^week\d{2}_")


def fail(message):
    raise SystemExit(message)


def read_text(path):
    return path.read_text(encoding="utf-8-sig")


def extract_demo(path):
    text = read_text(path)
    match = re.search(r"window\.COURSE_DEMO = ([\s\S]*?);\s*</script>", text)
    if not match:
        fail(f"{path.relative_to(ROOT)} does not contain window.COURSE_DEMO")
    return json.loads(match.group(1))


def main():
    required_root = [
        "README.md",
        "index.html",
        "onlineweb/index.html",
        "onlineweb/viewer.html",
        "assets/course-visualizer.css",
        "assets/course-visualizer.js",
        "AI_LEARNING_GUIDE.md",
        "CONTRIBUTING.md",
        "Makefile",
    ]
    for rel in required_root:
        if not (ROOT / rel).exists():
            fail(f"Missing required file: {rel}")

    week_dirs = sorted([p for p in ROOT.iterdir() if p.is_dir() and WEEK_RE.match(p.name)])
    if len(week_dirs) != 16:
        fail(f"Expected 16 week folders, found {len(week_dirs)}")

    for week in week_dirs:
        for rel in ["lecture.md", "exercises.md", "answers.md", "extensions.md", "interactive.html"]:
            if not (week / rel).exists():
                fail(f"Missing {week.name}/{rel}")
        examples = list((week / "examples").glob("*.c"))
        if len(examples) != 1:
            fail(f"Expected exactly one C example in {week.name}/examples")
        demo = extract_demo(week / "interactive.html")
        if len(demo.get("steps", [])) < 3:
            fail(f"{week.name} demo has fewer than 3 steps")
        if not demo.get("pseudocode"):
            fail(f"{week.name} demo is missing pseudocode")

    assignment_files = sorted((ROOT / "assignments").glob("lab*.md"))
    if len(assignment_files) < 6:
        fail("Expected at least 6 assignment lab files")

    teacher_files = sorted((ROOT / "teacher_guide").glob("*.md"))
    if len(teacher_files) < 3:
        fail("Expected teacher_guide markdown files")

    print("Course structure check passed.")


if __name__ == "__main__":
    main()

