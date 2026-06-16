# 教师指南

本文件夹面向授课教师和助教，帮助把课程材料转化为课堂活动、实验作业和评分标准。

建议使用方式：

1. 每周课前阅读对应 `week*/lecture.md`、[week_facilitation.md](week_facilitation.md) 和 [lesson_plans/](lesson_plans/) 中的教案。
2. 课堂中使用 `interactive.html` 做状态演示，要求学生同步写出操作伪代码。
3. 每 2 到 3 周布置一次 [assignments/](../assignments/) 中的实验。
4. 批改编程题时参考 [rubrics.md](rubrics.md)。
5. 参考 [lab_solutions/](lab_solutions/) 准备 public/hidden tests 和讲评。
6. 若要提升课堂挑战度，参考 [deep_teaching_guide.md](deep_teaching_guide.md) 设计不变量审查、反例构造、性能实验和 AI 代码审查。
7. 对学生的 AI 使用记录参考 [../AI_LEARNING_GUIDE.md](../AI_LEARNING_GUIDE.md)。
8. 正式考试、真实 hidden tests 和成绩脚本不要放在公开 Pages 中，发布边界见 [../ASSESSMENT_SECURITY.md](../ASSESSMENT_SECURITY.md)。

## 公开与私有材料分层

- 公开仓库：讲义、示例、交互动画、练习、模拟自测、Lab starter、public tests、Rubric。
- 私有教师仓库或学校平台：正式试卷、补考题、真实 hidden tests、完整评分脚本、未公开参考实现。
- 在线自测页面只用于复习诊断。由于静态页面会暴露答案，不应作为正式成绩依据。
- 每学期发布前建议检查一次公开目录，确认没有误放本学期正式考核材料。

## 教学重点

- 先讲组织形式，再讲操作。
- 每个操作都要回到结构不变量。
- 复杂度必须从操作步骤推导，不只背结论。
- C 代码必须关注边界、失败返回、内存释放和测试证据。
- 高阶训练应要求学生提交证据：反例、状态表、性能数据、错误代码诊断或 AI 输出审查记录。
