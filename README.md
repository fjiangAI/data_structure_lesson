# 数据结构 C 语言版课程辅助材料

本项目是一套面向高水平大学本科生的《数据结构》课程辅助材料，按 16 周设计，每周 2 节课。内容参考常见《数据结构教程》第 3 版同等难度，重点放在数据的组织形式、操作过程、复杂度分析和 C 语言实现。

## 在线预览

- 本地入口：[onlineweb/index.html](onlineweb/index.html)
- GitHub Pages 入口：`https://<你的用户名或组织名>.github.io/<仓库名>/`
- 课程网站入口文件：[index.html](index.html) 会自动跳转到 `onlineweb/`，方便 GitHub Pages 直接访问。

本项目的 Pages 工作流会发布一个包含 `onlineweb/`、16 个 week 文件夹、`test/` 和 README 的静态站点。这样在线网站中的“讲义、演示、代码、练习”链接都能正常打开。

## 项目亮点

- 16 周完整课程路径，覆盖线性结构、树、图、查找、排序和算法分析。
- 每周包含系统讲义、C 示例代码、练习题、参考答案、拓展问题和交互演示页。
- 示例代码围绕 C 语言数组、结构体、指针、动态内存和模块化接口展开。
- `test/` 中包含随堂测试、课后作业、阶段任务和 LLM 辅助学习模板。
- `onlineweb/` 提供可直接托管的静态课程网站，不依赖前端构建工具。

## 课程核心观念

程序 = 数据结构 + 算法。

更直接地说，数据结构回答“物质如何组成”，算法回答“物质如何行动”。如果类比现实世界，数据结构像对象的组成方式、层次关系和连接方式，算法像这些对象运行、变化和相互作用的规律。一个程序之所以有效，不只是因为它写了很多语句，而是因为它选择了合适的数据组织形式，并在这种组织形式上执行了正确、可分析、可验证的操作。

这门课不把数据结构当成一组名词表，而把它当成计算机专业学生理解程序世界的底层语言：

- 顺序表强调连续空间和随机访问。
- 链表强调指针关系和局部修改。
- 栈和队列强调受限操作带来的秩序。
- 串强调字符序列上的模式发现。
- 树和图强调层次关系与多对多关系。
- 查找结构强调关键字定位。
- 排序算法强调数据重排的代价和规律。
- 算法分析让我们能判断一个方案是否经得起规模增长。

## 项目结构

```text
.
├── .github/workflows/pages.yml
├── .gitignore
├── .nojekyll
├── index.html
├── README.md
├── LICENSE
├── week01_algorithm_analysis/
│   ├── lecture.md
│   ├── exercises.md
│   ├── answers.md
│   ├── extensions.md
│   ├── interactive.html
│   └── examples/
├── ...
├── week16_integration_review/
├── test/
├── onlineweb/
└── tools/
```

每个 week 文件夹包含：

- `lecture.md`：系统讲义，包含概念、C 表示、关键操作、复杂度和授课建议。
- `examples/*.c`：可编译运行的 C 语言示例代码。
- `exercises.md`：基础理解、代码阅读、分析设计和 LLM 辅助任务。
- `answers.md`：参考答案和评分建议。
- `extensions.md`：不带标准答案的拓展讨论问题。
- `interactive.html`：独立交互演示页，可直接用浏览器打开。

`test/` 包含随堂测试、课后作业、LLM/代码大模型辅助学习任务和参考答案。`onlineweb/` 是课程总网站，用于集中浏览周次、查看知识图谱、做练习和记录学习进度。`.github/workflows/pages.yml` 用于自动部署 GitHub Pages，`tools/generate_course.mjs` 用于重新生成课程材料。

## 16 周安排

| 周次 | 主题 | 教学重点 |
|---|---|---|
| Week 01 | [课程导论与算法分析基础](week01_algorithm_analysis/lecture.md) | 从程序、数据结构、算法的关系建立课程地图，掌握时间复杂度、空间复杂度、递归分析和常见复杂度比较。 |
| Week 02 | [线性表之一：顺序表](week02_sequential_list/lecture.md) | 理解连续存储的线性结构，掌握顺序表的初始化、扩容、插入、删除、查找和遍历。 |
| Week 03 | [线性表之二：链表](week03_linked_list/lecture.md) | 理解指针连接形成的线性结构，掌握单链表、带头结点、插入删除、逆置和链表调试方法。 |
| Week 04 | [受限线性表之一：栈](week04_stack/lecture.md) | 掌握后进先出结构，理解栈在表达式、括号匹配、递归调用和回溯中的作用。 |
| Week 05 | [受限线性表之二：队列](week05_queue/lecture.md) | 掌握先进先出结构，理解循环队列、队满判定、层序遍历和任务调度。 |
| Week 06 | [串与模式匹配](week06_string/lecture.md) | 理解串的顺序存储、朴素匹配和 KMP，重点掌握 next 数组如何复用已经匹配的信息。 |
| Week 07 | [树与二叉树基础](week07_tree_binary_tree/lecture.md) | 理解层次结构，掌握二叉树的链式表示、遍历、深度、结点数和由遍历序列理解结构。 |
| Week 08 | [二叉搜索树与平衡树基础](week08_bst_balanced_tree/lecture.md) | 掌握有序二叉树的查找、插入、删除，理解平衡因子与 AVL 旋转如何控制树高。 |
| Week 09 | [堆与优先队列](week09_heap_priority_queue/lecture.md) | 理解完全二叉树的数组表示，掌握上滤、下滤、建堆、堆排序和优先队列接口。 |
| Week 10 | [图的表示与遍历](week10_graph_representation_traversal/lecture.md) | 理解多对多关系，掌握邻接矩阵、邻接表、DFS、BFS 和连通分量。 |
| Week 11 | [图算法基础](week11_graph_algorithms/lecture.md) | 在图表示基础上学习拓扑排序、最短路径和最小生成树，理解算法与图模型的对应关系。 |
| Week 12 | [查找结构：顺序、二分与哈希表](week12_search_hash/lecture.md) | 掌握从线性查找到二分查找再到哈希表的性能演进，理解装载因子和冲突处理。 |
| Week 13 | [排序算法之一：简单排序](week13_simple_sorts/lecture.md) | 掌握插入排序、选择排序、冒泡排序的过程、稳定性、复杂度和适用场景。 |
| Week 14 | [排序算法之二：快速、归并与堆排序](week14_efficient_sorts/lecture.md) | 掌握快速排序、归并排序、堆排序的核心思想，比较它们在时间、空间和稳定性上的取舍。 |
| Week 15 | [排序算法之三：线性时间排序](week15_linear_sorts/lecture.md) | 理解计数排序、桶排序、基数排序为什么可以突破比较排序下界，以及它们对数据分布的要求。 |
| Week 16 | [综合设计、复习与 AI 辅助实践](week16_integration_review/lecture.md) | 把线性结构、树、图、查找、排序和复杂度分析放到同一工程问题中，训练结构选择和实现验证。 |

## 教学目标

完成本课程后，学生应能：

1. 用抽象数据类型描述一个结构的对象、关系和基本操作。
2. 用 C 语言实现顺序存储、链式存储、树、图、哈希和排序算法。
3. 对关键操作进行时间复杂度、空间复杂度和边界条件分析。
4. 在具体问题中选择合适结构，而不是机械套用算法。
5. 使用 LLM 或代码大模型辅助学习、测试和解释，同时保持人工判断。

## 建议考核方式

- 随堂小测与课后练习：20%
- C 语言编程作业：30%
- 期中结构设计题：15%
- 期末综合题：25%
- LLM 辅助学习记录与反思：10%

LLM 相关部分不评价“是否用了模型”，而评价学生是否能提出好问题、验证模型输出、发现边界漏洞，并把模型回答转化为自己的结构化理解。

## 使用方式

1. 从 `onlineweb/index.html` 进入课程网站。
2. 每周先读 `lecture.md`，再运行 `examples/*.c`。
3. 完成 `exercises.md` 后对照 `answers.md` 自查。
4. 用 `interactive.html` 做课堂演示或学生自学演示。
5. 使用 `test/` 中的测验和作业组织随堂测试、课后作业或复习。

如需整体重新生成课程材料，可在安装 Node.js 的环境中运行：

```bash
node tools/generate_course.mjs
```

## GitHub Pages 发布

本仓库已经包含 GitHub Actions 工作流 [pages.yml](.github/workflows/pages.yml)，适合把课程网站托管到 GitHub Pages。

推荐发布流程：

1. 在 GitHub 创建仓库并推送本项目到 `main` 或 `master` 分支。
2. 进入仓库 `Settings -> Pages`。
3. 在 `Build and deployment` 中把 `Source` 设置为 `GitHub Actions`。
4. 回到 `Actions` 页面，等待 `Deploy course website to GitHub Pages` 工作流完成。
5. 打开 `https://<你的用户名或组织名>.github.io/<仓库名>/`，页面会自动进入 `onlineweb/`。

这里选择发布“准备后的仓库静态内容”，而不是只发布 `onlineweb/`。原因是 `onlineweb` 中的周次卡片会链接到 `week*/lecture.md`、`week*/examples/*.c` 和 `test/`，如果只发布 `onlineweb/`，这些学习材料会在 Pages 上断链。

## C 语言编译建议

示例代码均按 C11 风格编写。单个示例可用如下命令编译：

```bash
gcc -std=c11 -Wall -Wextra week02_sequential_list/examples/seq_list.c -o seq_list
```

Windows PowerShell 中也可把输出文件命名为 `.exe`：

```powershell
gcc -std=c11 -Wall -Wextra week02_sequential_list/examples/seq_list.c -o seq_list.exe
./seq_list.exe
```

## GitHub 项目维护建议

- 课程内容修改后，优先直接编辑对应 week 文件夹；如果要批量重建，再修改 [tools/generate_course.mjs](tools/generate_course.mjs)。
- 公开发布前，请检查 [LICENSE](LICENSE) 是否符合你的课程材料授权预期。
- 建议在每次开课前创建一个 release，例如 `2026-fall`，便于学生使用稳定版本。
- 如果学生也通过 GitHub 提交作业，建议另建作业模板仓库，不要直接把学生作业提交到本课程资料仓库。

## 教师二次开发建议

- 如果要压缩课程，可合并 Week 10 与 Week 11，或合并 Week 13 到 Week 15。
- 如果要增强实践，可把 Week 16 扩展为两周课程设计。
- 如果学生 C 基础较弱，可在 Week 1 增加指针、数组、结构体和动态内存复习。
- 如果要更贴近 AI 时代，可要求每次作业提交一段 LLM 使用记录：提问、模型回答、人工核查、最终修正。

