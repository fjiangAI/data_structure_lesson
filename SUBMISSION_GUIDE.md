# GitHub Classroom / OJ 提交指南

本指南用于把课程仓库中的 Lab 作业迁移到 GitHub Classroom、OJ 或学校教学平台。

## 推荐提交结构

```text
student-id-name/
├── lab01_linear_list.c
├── lab02_stack_queue_string.c
├── report.md
└── ai_usage.md
```

学生只提交实现文件，不提交 public test、hidden tests 或教师参考实现。

## 本地自测

以 Lab 01 为例：

```bash
cd assignments/lab01_linear_list
python3 tests/test_lab.py --source ../../submissions/student01/lab01_linear_list.c
```

## GitHub Classroom 建议

1. 为每个 Lab 建一个 assignment template 仓库。
2. 模板中只放 `starter/*.h`、空实现 `starter/*.c`、public tests 和 README。
3. GitHub Actions 中运行对应 `tests/test_lab.py`。
4. hidden tests 放在教师私有仓库或 Classroom autograding 的私有配置中。

## OJ 建议

- 把 `starter/*.h` 作为题面附件或预置头文件。
- OJ 编译时链接学生实现和隐藏 main。
- 输出型 public test 只用于格式说明，正式判断应直接调用 ADT 函数。

## AI 使用记录

每次提交建议附带 `ai_usage.md`：

| 项目 | 内容 |
|---|---|
| 使用了哪些模型或工具 |  |
| 让模型做了什么 |  |
| 人工检查了哪些不变量 |  |
| 增加了哪些测试 |  |
| 最终修正了什么 |  |

