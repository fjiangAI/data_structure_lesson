# 考核安全与公开发布边界

本仓库默认作为公开课程资料与自学网站使用。公开 Pages 站点中的讲义、练习、参考答案、在线自测和 public tests 都应被视为学习材料，而不是正式考试系统。

## 材料分层

| 层级 | 建议位置 | 可公开 | 用途 |
|---|---|---:|---|
| 讲义、示例代码、交互动画 | 本仓库 | 是 | 预习、课堂演示、自学复习 |
| 练习题、参考答案、在线自测 | 本仓库 | 是 | 学生即时反馈和自我诊断 |
| Lab starter 与 public tests | 本仓库 | 是 | 统一提交格式和基础正确性检查 |
| Lab 参考实现 | 教师私有仓库优先，本仓库仅作课程维护示例 | 谨慎 | 助教核对 public output 和讲解思路 |
| hidden tests、正式试卷、评分脚本 | 私有教师仓库或学校平台 | 否 | 正式批改、期中期末、补考 |

## 在线自测的定位

`onlineweb/exam.html` 是静态页面，题目、答案和解析都在前端 JavaScript 中。它适合学生自测，不适合作为正式成绩来源。正式考试建议使用学校 LMS、OJ、GitHub Classroom、Moodle、雨课堂或其他具备身份认证、限时、日志和题库保密能力的平台。

## 教师使用建议

1. 公开仓库保留模拟卷、练习题、public tests 和评分 Rubric。
2. 私有仓库维护正式试卷、hidden tests、补考题和最终评分脚本。
3. 每学期开课前从公开仓库同步 starter 和 Rubric，再在私有仓库更新正式考核材料。
4. 批改编程题时不要只看输出，应结合结构不变量、边界测试、复杂度解释、内存安全和 AI 使用记录。
5. 发布 Pages 前确认没有把本学期正式考试题、hidden tests 或未公开答案放入公开目录。

## 推荐目录策略

公开仓库：

```text
week*/                 # 讲义、示例、练习、公开答案
onlineweb/             # 自学网站和在线自测
assignments/           # Lab starter 和 public tests
test/                  # 随堂与模拟训练
teacher_guide/         # Rubric、教案、可公开教师说明
```

私有教师仓库：

```text
formal_exams/          # 正式期中、期末、补考
hidden_tests/          # 每个 Lab 的真实隐藏测试
grading_scripts/       # 自动批改脚本与成绩汇总
solutions_private/     # 不公开的完整参考实现
```

