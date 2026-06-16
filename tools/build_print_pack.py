import argparse
import re
import shutil
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "build" / "print_pack"
OUT_MD = OUT_DIR / "course_pack.md"
FENCE = chr(96) * 3


def read_text(rel):
    path = ROOT / rel
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8-sig").strip()


def demote_headings(text, levels=1):
    lines = []
    in_fence = False
    for line in text.splitlines():
        if line.strip().startswith(FENCE):
            in_fence = not in_fence
            lines.append(line)
            continue
        if not in_fence and line.startswith("#"):
            lines.append("#" * levels + line)
        else:
            lines.append(line)
    return "\n".join(lines).strip()


def append_file(parts, title, rel, level=1):
    text = read_text(rel)
    if not text:
        return
    marker = "#" * level
    parts.append(f"\n\n{marker} {title}\n\n{demote_headings(text, 1)}")


def week_title(week_dir):
    match = re.match(r"week(\d{2})_(.+)", week_dir.name)
    if not match:
        return week_dir.name
    return f"Week {match.group(1)} {match.group(2).replace('_', ' ')}"


def build_markdown():
    parts = [
        "# 数据结构 C 语言版课程讲义包",
        "本文件由 tools/build_print_pack.py 生成，便于教师备课、归档和离线阅读。正式发布前请以仓库源文件为准。",
    ]
    append_file(parts, "课程总览", "README.md", 1)
    append_file(parts, "课程日历", "syllabus.md", 1)
    append_file(parts, "教学质量控制", "TEACHING_QUALITY.md", 1)
    append_file(parts, "学生提交指南", "SUBMISSION_GUIDE.md", 1)

    for week in sorted(ROOT.glob("week??_*")):
        if not week.is_dir():
            continue
        parts.append(f"\n\n# {week_title(week)}")
        append_file(parts, "课前预习", week / "preview.md", 2)
        append_file(parts, "课程讲义", week / "lecture.md", 2)
        append_file(parts, "练习题", week / "exercises.md", 2)
        append_file(parts, "拓展问题", week / "extensions.md", 2)

    append_file(parts, "复习包", "review/README.md", 1)
    append_file(parts, "复杂度速查", "review/complexity_cheatsheet.md", 1)
    append_file(parts, "高频易错点", "review/common_mistakes.md", 1)
    return "\n".join(parts).strip() + "\n"


def maybe_build_pdf(md_path):
    pandoc = shutil.which("pandoc")
    if pandoc is None:
        raise SystemExit("Pandoc not found. Markdown pack has been generated; install pandoc to export PDF.")
    pdf = md_path.with_suffix(".pdf")
    subprocess.run([pandoc, str(md_path), "-o", str(pdf)], check=True)
    print(f"PDF written to {pdf.relative_to(ROOT)}")


def main():
    parser = argparse.ArgumentParser(description="Build a printable markdown pack for the course.")
    parser.add_argument("--pdf", action="store_true", help="Also export PDF with pandoc if available.")
    args = parser.parse_args()

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    OUT_MD.write_text(build_markdown(), encoding="utf-8")
    print(f"Markdown pack written to {OUT_MD.relative_to(ROOT)}")
    if args.pdf:
        maybe_build_pdf(OUT_MD)


if __name__ == "__main__":
    main()

