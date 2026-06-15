# 贡献与维护指南

本仓库既是课程资料库，也是可部署的静态课程网站。修改时优先保持“内容、代码、网站、测试”一致。

## 修改原则

1. 如果只是修正文案、错别字或单周讲义，可直接改对应文件。
2. 如果要批量更新周次结构、交互演示、README、测试脚本或网站公共样式，应先修改 `tools/generate_course.mjs`，再重新生成。
3. C 示例代码必须保持可单文件编译，不依赖课程外部库。
4. 新增练习或作业时，要明确学习目标、提交物、评分标准和 LLM 使用要求。
5. 不要把学生个人作业提交到本资料仓库；建议单独建立作业仓库或课程平台。

## 本地检查

```bash
python3 tools/check_course_structure.py
python3 tools/compile_examples.py --require-compiler
```

如果本机没有 C 编译器，可以先运行：

```bash
python3 tools/compile_examples.py --list
```

## Pull Request 建议

- 说明修改影响哪些周次或哪些网站页面。
- 若改了交互演示，附上本地截图或说明已运行 `tools/verify_visuals.py`。
- 若改了 C 代码，说明编译器版本和是否通过全部示例编译。
- 若改了教学内容，说明课堂目标、学生任务和评分变化。

