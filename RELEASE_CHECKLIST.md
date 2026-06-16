# 课程发布检查清单

每次开课前建议创建一个稳定版本，例如 `2026-fall-v1.0`。

## 发布前检查

- [ ] README 中 Pages 地址正确。
- [ ] `ASSESSMENT_SECURITY.md` 已确认，不含正式考试题。
- [ ] 所有 `week*/preview.md`、`lecture.md`、`exercises.md`、`answers.md` 存在。
- [ ] 6 个 Lab 的 ADT 接口、public harness 和测试脚本存在。
- [ ] 教师私有仓库中的 hidden tests 与公开 starter 匹配。
- [ ] GitHub Actions 的 Course CI 通过。
- [ ] Pages 部署成功。
- [ ] 已创建 release/tag。

## 建议命令

```bash
python3 tools/check_course_structure.py
python3 tools/check_links.py
python3 tools/check_encoding.py
python3 tools/check_pages_artifact.py
python3 tools/compile_examples.py --require-compiler
python3 tools/run_lab_tests.py --all --expect-starter-fail
python3 tools/run_reference_solutions.py
python3 tools/build_print_pack.py
```

