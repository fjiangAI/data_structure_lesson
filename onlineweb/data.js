window.COURSE_WEEKS = [
  {
    "id": 1,
    "folder": "../week01_algorithm_analysis/",
    "title": "课程导论与算法分析基础",
    "shortTitle": "算法分析",
    "theme": "从程序、数据结构、算法的关系建立课程地图，掌握时间复杂度、空间复杂度、递归分析和常见复杂度比较。",
    "topics": [
      "程序 = 数据结构 + 算法",
      "抽象数据类型",
      "时间复杂度",
      "空间复杂度",
      "递归分析",
      "C 语言内存模型"
    ],
    "codeFile": "complexity_demo.c"
  },
  {
    "id": 2,
    "folder": "../week02_sequential_list/",
    "title": "线性表之一：顺序表",
    "shortTitle": "顺序表",
    "theme": "理解连续存储的线性结构，掌握顺序表的初始化、扩容、插入、删除、查找和遍历。",
    "topics": [
      "线性结构",
      "连续存储",
      "随机访问",
      "动态扩容",
      "插入删除移动代价",
      "边界检查"
    ],
    "codeFile": "seq_list.c"
  },
  {
    "id": 3,
    "folder": "../week03_linked_list/",
    "title": "线性表之二：链表",
    "shortTitle": "链表",
    "theme": "理解指针连接形成的线性结构，掌握单链表、带头结点、插入删除、逆置和链表调试方法。",
    "topics": [
      "结点",
      "指针域",
      "头结点",
      "前驱结点",
      "动态分配",
      "链表逆置"
    ],
    "codeFile": "linked_list.c"
  },
  {
    "id": 4,
    "folder": "../week04_stack/",
    "title": "受限线性表之一：栈",
    "shortTitle": "栈",
    "theme": "掌握后进先出结构，理解栈在表达式、括号匹配、递归调用和回溯中的作用。",
    "topics": [
      "LIFO",
      "栈顶",
      "入栈",
      "出栈",
      "括号匹配",
      "递归调用栈"
    ],
    "codeFile": "stack_parentheses.c"
  },
  {
    "id": 5,
    "folder": "../week05_queue/",
    "title": "受限线性表之二：队列",
    "shortTitle": "队列",
    "theme": "掌握先进先出结构，理解循环队列、队满判定、层序遍历和任务调度。",
    "topics": [
      "FIFO",
      "队头",
      "队尾",
      "循环队列",
      "牺牲一个单元",
      "广度优先思想"
    ],
    "codeFile": "circular_queue.c"
  },
  {
    "id": 6,
    "folder": "../week06_string/",
    "title": "串与模式匹配",
    "shortTitle": "串",
    "theme": "理解串的顺序存储、朴素匹配和 KMP，重点掌握 next 数组如何复用已经匹配的信息。",
    "topics": [
      "字符数组",
      "串长度",
      "朴素匹配",
      "KMP",
      "next 数组",
      "文本处理"
    ],
    "codeFile": "kmp_string.c"
  },
  {
    "id": 7,
    "folder": "../week07_tree_binary_tree/",
    "title": "树与二叉树基础",
    "shortTitle": "二叉树",
    "theme": "理解层次结构，掌握二叉树的链式表示、遍历、深度、结点数和由遍历序列理解结构。",
    "topics": [
      "树",
      "二叉树",
      "孩子兄弟表示",
      "前序遍历",
      "中序遍历",
      "后序遍历",
      "层序遍历"
    ],
    "codeFile": "binary_tree.c"
  },
  {
    "id": 8,
    "folder": "../week08_bst_balanced_tree/",
    "title": "二叉搜索树与平衡树基础",
    "shortTitle": "BST/AVL",
    "theme": "掌握有序二叉树的查找、插入、删除，理解平衡因子与 AVL 旋转如何控制树高。",
    "topics": [
      "二叉搜索树",
      "中序有序",
      "删除三种情况",
      "平衡因子",
      "LL/RR/LR/RL 旋转",
      "树高退化"
    ],
    "codeFile": "avl_tree.c"
  },
  {
    "id": 9,
    "folder": "../week09_heap_priority_queue/",
    "title": "堆与优先队列",
    "shortTitle": "堆",
    "theme": "理解完全二叉树的数组表示，掌握上滤、下滤、建堆、堆排序和优先队列接口。",
    "topics": [
      "完全二叉树",
      "数组存储",
      "最小堆",
      "最大堆",
      "上滤",
      "下滤",
      "优先队列"
    ],
    "codeFile": "min_heap.c"
  },
  {
    "id": 10,
    "folder": "../week10_graph_representation_traversal/",
    "title": "图的表示与遍历",
    "shortTitle": "图遍历",
    "theme": "理解多对多关系，掌握邻接矩阵、邻接表、DFS、BFS 和连通分量。",
    "topics": [
      "图",
      "顶点",
      "边",
      "邻接矩阵",
      "邻接表",
      "DFS",
      "BFS",
      "连通性"
    ],
    "codeFile": "graph_traversal.c"
  },
  {
    "id": 11,
    "folder": "../week11_graph_algorithms/",
    "title": "图算法基础",
    "shortTitle": "图算法",
    "theme": "在图表示基础上学习拓扑排序、最短路径和最小生成树，理解算法与图模型的对应关系。",
    "topics": [
      "拓扑排序",
      "Dijkstra",
      "Prim",
      "Kruskal 思想",
      "松弛操作",
      "贪心选择"
    ],
    "codeFile": "graph_algorithms.c"
  },
  {
    "id": 12,
    "folder": "../week12_search_hash/",
    "title": "查找结构：顺序、二分与哈希表",
    "shortTitle": "查找/哈希",
    "theme": "掌握从线性查找到二分查找再到哈希表的性能演进，理解装载因子和冲突处理。",
    "topics": [
      "顺序查找",
      "有序表",
      "二分查找",
      "哈希函数",
      "线性探测",
      "装载因子",
      "冲突"
    ],
    "codeFile": "search_hash.c"
  },
  {
    "id": 13,
    "folder": "../week13_simple_sorts/",
    "title": "排序算法之一：简单排序",
    "shortTitle": "简单排序",
    "theme": "掌握插入排序、选择排序、冒泡排序的过程、稳定性、复杂度和适用场景。",
    "topics": [
      "排序问题",
      "稳定性",
      "原地排序",
      "插入排序",
      "选择排序",
      "冒泡排序",
      "最好最坏情况"
    ],
    "codeFile": "simple_sorts.c"
  },
  {
    "id": 14,
    "folder": "../week14_efficient_sorts/",
    "title": "排序算法之二：快速、归并与堆排序",
    "shortTitle": "高效排序",
    "theme": "掌握快速排序、归并排序、堆排序的核心思想，比较它们在时间、空间和稳定性上的取舍。",
    "topics": [
      "分治",
      "快速排序",
      "归并排序",
      "堆排序",
      "划分",
      "递归深度",
      "最坏情况"
    ],
    "codeFile": "efficient_sorts.c"
  },
  {
    "id": 15,
    "folder": "../week15_linear_sorts/",
    "title": "排序算法之三：线性时间排序",
    "shortTitle": "线性排序",
    "theme": "理解计数排序、桶排序、基数排序为什么可以突破比较排序下界，以及它们对数据分布的要求。",
    "topics": [
      "比较排序下界",
      "计数排序",
      "桶排序",
      "基数排序",
      "关键字范围",
      "稳定分配",
      "空间换时间"
    ],
    "codeFile": "linear_sorts.c"
  },
  {
    "id": 16,
    "folder": "../week16_integration_review/",
    "title": "综合设计、复习与 AI 辅助实践",
    "shortTitle": "综合复习",
    "theme": "把线性结构、树、图、查找、排序和复杂度分析放到同一工程问题中，训练结构选择和实现验证。",
    "topics": [
      "结构选择",
      "接口设计",
      "复杂度论证",
      "测试驱动",
      "代码大模型辅助",
      "课程复习"
    ],
    "codeFile": "student_index_lab.c"
  }
];
window.COURSE_QUIZZES = [
  {
    "topic": "复杂度",
    "question": "二分查找能达到 O(log n) 的前提是什么？",
    "options": [
      "数据按关键字有序并支持随机访问",
      "数据必须存储在链表中",
      "数据元素不能重复",
      "数组长度必须是 2 的幂"
    ],
    "answer": 0,
    "explain": "二分查找每轮排除一半，需要有序关系和能直接访问中间位置。"
  },
  {
    "topic": "链表",
    "question": "单链表在已知前驱结点时插入新结点的复杂度是？",
    "options": [
      "O(1)",
      "O(log n)",
      "O(n)",
      "O(n log n)"
    ],
    "answer": 0,
    "explain": "只需要修改新结点和前驱结点的 next 指针。"
  },
  {
    "topic": "栈",
    "question": "括号匹配中遇到右括号时应执行什么操作？",
    "options": [
      "弹出栈顶左括号并检查是否匹配",
      "把右括号入队",
      "清空整个栈",
      "从数组头部删除元素"
    ],
    "answer": 0,
    "explain": "栈保存最近尚未匹配的左括号。"
  },
  {
    "topic": "哈希",
    "question": "线性探测哈希表查找失败时，通常遇到什么可以停止？",
    "options": [
      "同一探测序列中的空槽",
      "任意非空槽",
      "表中最大关键字",
      "数组下标为 0 的位置"
    ],
    "answer": 0,
    "explain": "插入也沿同一探测序列进行，遇到空槽说明该关键字不存在。"
  },
  {
    "topic": "排序",
    "question": "下列排序通常可以稳定实现的是？",
    "options": [
      "归并排序",
      "堆排序",
      "选择排序",
      "普通快速排序"
    ],
    "answer": 0,
    "explain": "合并两个有序段时相等元素优先取左段，可以保持相对顺序。"
  },
  {
    "topic": "图",
    "question": "邻接表遍历一个无向图的 DFS/BFS 复杂度通常写作？",
    "options": [
      "O(V+E)",
      "O(V^2)",
      "O(log V)",
      "O(E^2)"
    ],
    "answer": 0,
    "explain": "每个顶点和每条边都会被常数次访问。"
  }
];
