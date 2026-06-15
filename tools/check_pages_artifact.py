from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


REQUIRED = [
    "index.html",
    "README.md",
    "onlineweb/index.html",
    "onlineweb/viewer.html",
    "onlineweb/exam.html",
    "assets/course-visualizer.css",
    "assets/course-visualizer.js",
    "assignments/README.md",
    "teacher_guide/README.md",
    "teacher_guide/lesson_plans/README.md",
    "teacher_guide/lab_solutions/README.md",
    "review/README.md",
    "AI_LEARNING_GUIDE.md",
    "STUDENT_GUIDE.md",
    "syllabus.md",
    "test/README.md",
]


def main():
    missing = [rel for rel in REQUIRED if not (ROOT / rel).exists()]
    if missing:
        print("Missing files required by Pages artifact:")
        for rel in missing:
            print("-", rel)
        raise SystemExit(1)
    week_pages = sorted(ROOT.glob("week*/interactive.html"))
    if len(week_pages) != 16:
        raise SystemExit(f"Expected 16 week interactive pages, found {len(week_pages)}")
    print("Pages artifact check passed.")


if __name__ == "__main__":
    main()

