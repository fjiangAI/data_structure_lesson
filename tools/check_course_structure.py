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
        "onlineweb/exam.html",
        "ASSESSMENT_SECURITY.md",
        "MAINTAINING.md",
        "assets/course-visualizer.css",
        "assets/course-visualizer.js",
        "AI_LEARNING_GUIDE.md",
        "STUDENT_GUIDE.md",
        "syllabus.md",
        "CONTRIBUTING.md",
        "Makefile",
        "Dockerfile",
        ".devcontainer/devcontainer.json",
        ".devcontainer/Dockerfile",
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
        code_trace = demo.get("codeTrace") or {}
        if not code_trace.get("lines"):
            fail(f"{week.name} demo is missing C code trace")

    assignment_files = sorted((ROOT / "assignments").glob("lab*.md"))
    if len(assignment_files) < 6:
        fail("Expected at least 6 assignment lab files")

    lab_dirs = sorted((ROOT / "assignments").glob("lab??_*"))
    lab_dirs = [p for p in lab_dirs if p.is_dir()]
    if len(lab_dirs) < 6:
        fail("Expected at least 6 runnable assignment lab folders")
    if not (ROOT / "assignments" / "labs.json").exists():
        fail("Missing assignments/labs.json")
    if not (ROOT / "assignments" / "lab_testing_guide.md").exists():
        fail("Missing assignments/lab_testing_guide.md")
    if not (ROOT / "tools" / "run_lab_tests.py").exists():
        fail("Missing tools/run_lab_tests.py")
    for lab in lab_dirs:
        if not (lab / "README.md").exists():
            fail(f"Missing {lab.relative_to(ROOT)}/README.md")
        if not (lab / "expected_output.txt").exists():
            fail(f"Missing {lab.relative_to(ROOT)}/expected_output.txt")
        starters = sorted((lab / "starter").glob("*.c"))
        if len(starters) != 1:
            fail(f"Expected exactly one starter C file in {lab.relative_to(ROOT)}/starter")
        if not (lab / "tests" / "test_lab.py").exists():
            fail(f"Missing {lab.relative_to(ROOT)}/tests/test_lab.py")

    teacher_files = sorted((ROOT / "teacher_guide").glob("*.md"))
    if len(teacher_files) < 3:
        fail("Expected teacher_guide markdown files")
    lesson_plan_files = sorted((ROOT / "teacher_guide" / "lesson_plans").glob("week??_lesson_plan.md"))
    if len(lesson_plan_files) != 16:
        fail(f"Expected 16 teacher lesson plans, found {len(lesson_plan_files)}")
    solution_files = sorted((ROOT / "teacher_guide" / "lab_solutions").glob("lab??_*/solution_notes.md"))
    hidden_templates = sorted((ROOT / "teacher_guide" / "lab_solutions").glob("lab??_*/hidden_tests_template.py"))
    if len(solution_files) != 6 or len(hidden_templates) != 6:
        fail("Expected 6 lab solution notes and 6 hidden test templates")

    review_files = sorted((ROOT / "review").glob("*.md"))
    if len(review_files) < 5:
        fail("Expected review markdown files")
    exam_files = sorted((ROOT / "test" / "exams").glob("*.md"))
    if len(exam_files) < 3:
        fail("Expected online exam markdown files")

    print("Course structure check passed.")


if __name__ == "__main__":
    main()

