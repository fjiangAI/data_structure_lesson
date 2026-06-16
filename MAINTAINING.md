# 课程生成器维护说明

`tools/generate_course.mjs` 是本仓库的批量生成入口。它适合在需要统一更新 16 周讲义、练习、网站入口、Lab 模板或 CI 脚本时使用。

## 维护原则

1. 小范围修订优先直接改对应文件，例如某一周讲义或某个 C 示例。
2. 会影响多周结构、网站入口、统一脚本、Lab 模板的改动，应先改 `tools/generate_course.mjs`，再重新生成。
3. 重新生成后必须运行本地检查，至少包括结构、链接、编码、Pages artifact 和 C 示例编译。
4. 生成器写出的 `examples/*.c` 会使用 UTF-8 with BOM，避免 Windows 编辑器把中文注释误判成 ANSI。
5. `build/`、`assignments/lab*/build/`、`_site/` 和截图目录都是本地产物，不应提交。

## 推荐检查命令

```bash
python3 tools/check_course_structure.py
python3 tools/check_links.py
python3 tools/check_encoding.py
python3 tools/check_pages_artifact.py
python3 tools/compile_examples.py --require-compiler
python3 tools/run_lab_tests.py --all --expect-starter-fail
python3 tools/run_reference_solutions.py
python3 tools/sanitize_examples.py
```

Windows 本地环境如果 sanitizer 不可用，`tools/sanitize_examples.py` 会默认跳过；GitHub Actions 的 Linux 环境会执行完整检查。

## 长期拆分建议

当课程进入多学期维护后，可以把生成器逐步拆成更小的源数据：

- `course_weeks.json`：周次、主题、知识点、代码文件名。
- `quiz_bank.json`：网站自测题库。
- `lab_definitions.json`：Lab 目标、public output、hidden case 描述。
- `templates/`：README、网站、工作流和 Lab 文件模板。

当前版本先保持单文件生成器，原因是课程还处在快速迭代期，单文件更容易保证批量生成的一致性。

