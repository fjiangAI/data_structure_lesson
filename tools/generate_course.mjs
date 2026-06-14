import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const weeks = [
  {
    id: 1,
    folder: "week01_algorithm_analysis",
    title: "课程导论与算法分析基础",
    shortTitle: "算法分析",
    theme: "从程序、数据结构、算法的关系建立课程地图，掌握时间复杂度、空间复杂度、递归分析和常见复杂度比较。",
    topics: ["程序 = 数据结构 + 算法", "抽象数据类型", "时间复杂度", "空间复杂度", "递归分析", "C 语言内存模型"],
    adt: "ADT 是数据对象、数据关系和基本操作的组合。C 语言中常用 struct 表示对象，用函数表示操作，用头文件表达接口边界。",
    operations: [
      ["顺序执行", "一次完成固定工作量", "O(1)"],
      ["循环扫描", "元素逐个处理", "O(n)"],
      ["二分缩小", "每轮排除一半", "O(log n)"],
      ["嵌套枚举", "两层独立循环", "O(n^2)"],
      ["递归分治", "T(n)=aT(n/b)+f(n)", "依递推式而定"]
    ],
    codeFile: "complexity_demo.c",
    visual: "complexity"
  },
  {
    id: 2,
    folder: "week02_sequential_list",
    title: "线性表之一：顺序表",
    shortTitle: "顺序表",
    theme: "理解连续存储的线性结构，掌握顺序表的初始化、扩容、插入、删除、查找和遍历。",
    topics: ["线性结构", "连续存储", "随机访问", "动态扩容", "插入删除移动代价", "边界检查"],
    adt: "顺序表把线性关系映射到连续内存，逻辑相邻通常也是物理相邻。它用容量 capacity 和长度 size 分离可用空间与已有元素。",
    operations: [
      ["按位访问", "直接计算地址 base + i * sizeof(ElemType)", "O(1)"],
      ["尾部插入", "容量足够时直接写入", "均摊 O(1)"],
      ["中间插入", "从后向前移动元素", "O(n)"],
      ["按值查找", "顺序扫描比较", "O(n)"],
      ["删除元素", "后续元素前移", "O(n)"]
    ],
    codeFile: "seq_list.c",
    visual: "array"
  },
  {
    id: 3,
    folder: "week03_linked_list",
    title: "线性表之二：链表",
    shortTitle: "链表",
    theme: "理解指针连接形成的线性结构，掌握单链表、带头结点、插入删除、逆置和链表调试方法。",
    topics: ["结点", "指针域", "头结点", "前驱结点", "动态分配", "链表逆置"],
    adt: "链表把线性关系保存在指针中，结点的物理位置不要求连续。操作通常先定位前驱，再改变少量指针。",
    operations: [
      ["头插", "新结点指向原首元结点，头结点指向新结点", "O(1)"],
      ["尾插", "若维护尾指针可直接追加", "O(1) 或 O(n)"],
      ["按位查找", "从头逐步走到第 i 个结点", "O(n)"],
      ["已知前驱插入", "修改两条 next 指针", "O(1)"],
      ["逆置", "逐结点改变 next 方向", "O(n)"]
    ],
    codeFile: "linked_list.c",
    visual: "list"
  },
  {
    id: 4,
    folder: "week04_stack",
    title: "受限线性表之一：栈",
    shortTitle: "栈",
    theme: "掌握后进先出结构，理解栈在表达式、括号匹配、递归调用和回溯中的作用。",
    topics: ["LIFO", "栈顶", "入栈", "出栈", "括号匹配", "递归调用栈"],
    adt: "栈只允许在栈顶进行插入和删除。限制操作位置带来了简单清晰的状态变化，也让它适合处理最近未完成的任务。",
    operations: [
      ["push", "元素进入栈顶", "O(1)"],
      ["pop", "删除并返回栈顶元素", "O(1)"],
      ["peek", "读取栈顶但不删除", "O(1)"],
      ["isEmpty", "判断 top 是否为空", "O(1)"],
      ["括号匹配", "左括号入栈，右括号匹配栈顶", "O(n)"]
    ],
    codeFile: "stack_parentheses.c",
    visual: "stack"
  },
  {
    id: 5,
    folder: "week05_queue",
    title: "受限线性表之二：队列",
    shortTitle: "队列",
    theme: "掌握先进先出结构，理解循环队列、队满判定、层序遍历和任务调度。",
    topics: ["FIFO", "队头", "队尾", "循环队列", "牺牲一个单元", "广度优先思想"],
    adt: "队列在队尾入队、队头出队。循环队列用取模把数组首尾连接起来，避免普通数组队列的整体搬移。",
    operations: [
      ["enqueue", "从 rear 位置加入元素", "O(1)"],
      ["dequeue", "从 front 位置取出元素", "O(1)"],
      ["front", "读取队头元素", "O(1)"],
      ["isFull", "(rear + 1) % capacity == front", "O(1)"],
      ["层序处理", "当前对象出队，其相邻对象入队", "O(n)"]
    ],
    codeFile: "circular_queue.c",
    visual: "queue"
  },
  {
    id: 6,
    folder: "week06_string",
    title: "串与模式匹配",
    shortTitle: "串",
    theme: "理解串的顺序存储、朴素匹配和 KMP，重点掌握 next 数组如何复用已经匹配的信息。",
    topics: ["字符数组", "串长度", "朴素匹配", "KMP", "next 数组", "文本处理"],
    adt: "串是元素类型限定为字符的线性表。它的核心操作包括求长、比较、连接、求子串和模式匹配。",
    operations: [
      ["strlen", "扫描到字符串结束符", "O(n)"],
      ["朴素匹配", "失配后模式串整体右移一位", "O(nm)"],
      ["构造 next", "计算前后缀最长公共长度", "O(m)"],
      ["KMP 匹配", "文本指针不回退", "O(n+m)"],
      ["子串复制", "复制连续区间", "O(k)"]
    ],
    codeFile: "kmp_string.c",
    visual: "string"
  },
  {
    id: 7,
    folder: "week07_tree_binary_tree",
    title: "树与二叉树基础",
    shortTitle: "二叉树",
    theme: "理解层次结构，掌握二叉树的链式表示、遍历、深度、结点数和由遍历序列理解结构。",
    topics: ["树", "二叉树", "孩子兄弟表示", "前序遍历", "中序遍历", "后序遍历", "层序遍历"],
    adt: "树描述一对多的层次关系。二叉树把每个结点的孩子数限制为不超过两个，使递归定义和递归操作非常自然。",
    operations: [
      ["前序遍历", "根、左、右", "O(n)"],
      ["中序遍历", "左、根、右", "O(n)"],
      ["后序遍历", "左、右、根", "O(n)"],
      ["求高度", "1 + max(leftHeight, rightHeight)", "O(n)"],
      ["层序遍历", "队列保存下一层结点", "O(n)"]
    ],
    codeFile: "binary_tree.c",
    visual: "tree"
  },
  {
    id: 8,
    folder: "week08_bst_balanced_tree",
    title: "二叉搜索树与平衡树基础",
    shortTitle: "BST/AVL",
    theme: "掌握有序二叉树的查找、插入、删除，理解平衡因子与 AVL 旋转如何控制树高。",
    topics: ["二叉搜索树", "中序有序", "删除三种情况", "平衡因子", "LL/RR/LR/RL 旋转", "树高退化"],
    adt: "二叉搜索树把有序关系保存在树形结构中。平衡树在每次修改后控制左右子树高度差，避免退化成链表。",
    operations: [
      ["BST 查找", "按关键字大小选择左右子树", "平均 O(log n)，最坏 O(n)"],
      ["BST 插入", "查找失败位置成为新叶子", "平均 O(log n)"],
      ["BST 删除", "叶子、单孩子、双孩子分别处理", "平均 O(log n)"],
      ["AVL 旋转", "局部改变父子关系恢复高度", "O(1)"],
      ["AVL 插入", "沿递归返回路径更新高度并旋转", "O(log n)"]
    ],
    codeFile: "avl_tree.c",
    visual: "bst"
  },
  {
    id: 9,
    folder: "week09_heap_priority_queue",
    title: "堆与优先队列",
    shortTitle: "堆",
    theme: "理解完全二叉树的数组表示，掌握上滤、下滤、建堆、堆排序和优先队列接口。",
    topics: ["完全二叉树", "数组存储", "最小堆", "最大堆", "上滤", "下滤", "优先队列"],
    adt: "堆是一棵满足堆序性质的完全二叉树，常用数组存储。它只保证根是全局最优，不保证整体有序。",
    operations: [
      ["push", "插入尾部后上滤", "O(log n)"],
      ["pop", "根与尾交换后下滤", "O(log n)"],
      ["peek", "读取根元素", "O(1)"],
      ["buildHeap", "从最后一个非叶结点开始下滤", "O(n)"],
      ["heapSort", "反复取堆顶", "O(n log n)"]
    ],
    codeFile: "min_heap.c",
    visual: "heap"
  },
  {
    id: 10,
    folder: "week10_graph_representation_traversal",
    title: "图的表示与遍历",
    shortTitle: "图遍历",
    theme: "理解多对多关系，掌握邻接矩阵、邻接表、DFS、BFS 和连通分量。",
    topics: ["图", "顶点", "边", "邻接矩阵", "邻接表", "DFS", "BFS", "连通性"],
    adt: "图用于描述任意对象之间的关系。邻接矩阵适合稠密图和快速判断边，邻接表适合稀疏图和遍历邻接点。",
    operations: [
      ["添加边", "矩阵赋值或链表头插", "O(1)"],
      ["判断边存在", "矩阵直接读，邻接表扫描", "O(1) 或 O(deg)"],
      ["DFS", "沿一条路径尽量深入", "O(V+E)"],
      ["BFS", "按距离层次扩展", "O(V+E)"],
      ["连通分量", "多次从未访问顶点启动遍历", "O(V+E)"]
    ],
    codeFile: "graph_traversal.c",
    visual: "graph"
  },
  {
    id: 11,
    folder: "week11_graph_algorithms",
    title: "图算法基础",
    shortTitle: "图算法",
    theme: "在图表示基础上学习拓扑排序、最短路径和最小生成树，理解算法与图模型的对应关系。",
    topics: ["拓扑排序", "Dijkstra", "Prim", "Kruskal 思想", "松弛操作", "贪心选择"],
    adt: "图算法的关键不是背步骤，而是明确每个数组或集合表示的含义，例如 dist 表示当前已知最短距离，visited 表示已经确定的顶点集合。",
    operations: [
      ["拓扑排序", "反复删除入度为 0 的顶点", "O(V+E)"],
      ["Dijkstra", "每轮确定一个最近未确定顶点", "O(V^2) 或 O(E log V)"],
      ["松弛", "尝试用 u 改进 v 的距离", "O(1)"],
      ["Prim", "每轮选择连接生成树的最小边", "O(V^2) 或 O(E log V)"],
      ["路径恢复", "pre 数组记录前驱", "O(path length)"]
    ],
    codeFile: "graph_algorithms.c",
    visual: "path"
  },
  {
    id: 12,
    folder: "week12_search_hash",
    title: "查找结构：顺序、二分与哈希表",
    shortTitle: "查找/哈希",
    theme: "掌握从线性查找到二分查找再到哈希表的性能演进，理解装载因子和冲突处理。",
    topics: ["顺序查找", "有序表", "二分查找", "哈希函数", "线性探测", "装载因子", "冲突"],
    adt: "查找结构围绕集合成员测试和关键字定位展开。哈希表把关键字映射到桶位置，用空间换平均常数时间。",
    operations: [
      ["顺序查找", "逐个比较关键字", "O(n)"],
      ["二分查找", "在有序数组中折半", "O(log n)"],
      ["哈希插入", "计算地址，冲突时探测", "平均 O(1)"],
      ["哈希查找", "沿同一探测序列查找", "平均 O(1)"],
      ["再散列", "扩大表并重新插入", "O(n)"]
    ],
    codeFile: "search_hash.c",
    visual: "hash"
  },
  {
    id: 13,
    folder: "week13_simple_sorts",
    title: "排序算法之一：简单排序",
    shortTitle: "简单排序",
    theme: "掌握插入排序、选择排序、冒泡排序的过程、稳定性、复杂度和适用场景。",
    topics: ["排序问题", "稳定性", "原地排序", "插入排序", "选择排序", "冒泡排序", "最好最坏情况"],
    adt: "排序把记录按关键字重新排列。理解排序要同时看比较次数、移动次数、额外空间和稳定性。",
    operations: [
      ["插入排序", "维护已排序前缀，将新元素插入合适位置", "O(n^2)，近有序时好"],
      ["选择排序", "每轮选择最小元素放到前部", "O(n^2)，移动少"],
      ["冒泡排序", "相邻逆序则交换，大元素逐步后移", "O(n^2)"],
      ["稳定性判断", "相等关键字是否保持相对次序", "依算法而定"],
      ["提前终止", "一趟无交换即可停止冒泡", "最好 O(n)"]
    ],
    codeFile: "simple_sorts.c",
    visual: "sort_simple"
  },
  {
    id: 14,
    folder: "week14_efficient_sorts",
    title: "排序算法之二：快速、归并与堆排序",
    shortTitle: "高效排序",
    theme: "掌握快速排序、归并排序、堆排序的核心思想，比较它们在时间、空间和稳定性上的取舍。",
    topics: ["分治", "快速排序", "归并排序", "堆排序", "划分", "递归深度", "最坏情况"],
    adt: "高效排序的核心是减少无效比较。快速排序靠划分，归并排序靠有序子序列合并，堆排序靠优先队列结构。",
    operations: [
      ["快速排序划分", "小于枢轴放左侧，大于枢轴放右侧", "平均 O(n log n)"],
      ["归并", "两个有序段线性合并", "O(n)"],
      ["堆排序", "建堆后反复交换堆顶与末尾", "O(n log n)"],
      ["递归深度", "影响栈空间和最坏情况", "O(log n) 到 O(n)"],
      ["稳定性", "归并可稳定，快排和堆排序通常不稳定", "概念判断"]
    ],
    codeFile: "efficient_sorts.c",
    visual: "sort_fast"
  },
  {
    id: 15,
    folder: "week15_linear_sorts",
    title: "排序算法之三：线性时间排序",
    shortTitle: "线性排序",
    theme: "理解计数排序、桶排序、基数排序为什么可以突破比较排序下界，以及它们对数据分布的要求。",
    topics: ["比较排序下界", "计数排序", "桶排序", "基数排序", "关键字范围", "稳定分配", "空间换时间"],
    adt: "线性时间排序不是通用比较排序。它们利用关键字范围、位数或分布信息，把比较问题转化为计数和分配问题。",
    operations: [
      ["计数排序", "统计每个关键字出现次数并前缀累加", "O(n+k)"],
      ["桶排序", "按分布把元素放入桶，再桶内排序", "期望 O(n+k)"],
      ["基数排序", "按位稳定排序多轮", "O(d(n+r))"],
      ["稳定分配", "从后向前放置可保持相等元素顺序", "O(n)"],
      ["范围压缩", "处理 min 到 max 的偏移", "O(n+k)"]
    ],
    codeFile: "linear_sorts.c",
    visual: "radix"
  },
  {
    id: 16,
    folder: "week16_integration_review",
    title: "综合设计、复习与 AI 辅助实践",
    shortTitle: "综合复习",
    theme: "把线性结构、树、图、查找、排序和复杂度分析放到同一工程问题中，训练结构选择和实现验证。",
    topics: ["结构选择", "接口设计", "复杂度论证", "测试驱动", "代码大模型辅助", "课程复习"],
    adt: "综合设计要求先建模，再选择结构，最后实现操作。评价一个方案时同时看正确性、复杂度、可维护性和测试证据。",
    operations: [
      ["需求建模", "识别对象、关系和高频操作", "设计活动"],
      ["结构选择", "用访问模式决定数组、链表、树、图或哈希", "设计活动"],
      ["接口实现", "保持 ADT 边界清晰", "工程活动"],
      ["复杂度评审", "给出关键操作的上界", "分析活动"],
      ["AI 辅助验证", "让模型生成反例、边界用例和解释", "学习活动"]
    ],
    codeFile: "student_index_lab.c",
    visual: "review"
  }
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(rel, content) {
  const file = path.join(root, rel);
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content.trimStart() + "\n", "utf8");
}

function weekName(week) {
  return `Week ${String(week.id).padStart(2, "0")}`;
}

function cFileFor(week) {
  return `examples/${week.codeFile}`;
}

const codeSamples = {
  "complexity_demo.c": String.raw`
#include <stdio.h>

long long linear_sum(const int a[], int n) {
    long long sum = 0;
    for (int i = 0; i < n; ++i) {
        sum += a[i];
    }
    return sum;
}

int binary_search(const int a[], int n, int key) {
    int left = 0;
    int right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (a[mid] == key) return mid;
        if (a[mid] < key) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

long long pair_count_less_than(const int a[], int n, int limit) {
    long long count = 0;
    for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
            if (a[i] + a[j] < limit) {
                ++count;
            }
        }
    }
    return count;
}

long long fibonacci_calls(int n, long long *calls) {
    ++(*calls);
    if (n <= 1) return n;
    return fibonacci_calls(n - 1, calls) + fibonacci_calls(n - 2, calls);
}

int main(void) {
    int a[] = {1, 3, 5, 7, 9, 11, 13, 15};
    int n = (int)(sizeof(a) / sizeof(a[0]));

    printf("linear sum = %lld\n", linear_sum(a, n));
    printf("binary search 9 -> index %d\n", binary_search(a, n, 9));
    printf("pair count less than 16 = %lld\n", pair_count_less_than(a, n, 16));

    long long calls = 0;
    long long value = fibonacci_calls(8, &calls);
    printf("fib(8) = %lld, recursive calls = %lld\n", value, calls);
    return 0;
}
`,
  "seq_list.c": String.raw`
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int *data;
    int size;
    int capacity;
} SeqList;

int init_list(SeqList *list, int capacity) {
    list->data = (int *)malloc(sizeof(int) * capacity);
    if (!list->data) return 0;
    list->size = 0;
    list->capacity = capacity;
    return 1;
}

void destroy_list(SeqList *list) {
    free(list->data);
    list->data = NULL;
    list->size = 0;
    list->capacity = 0;
}

int reserve(SeqList *list, int new_capacity) {
    if (new_capacity <= list->capacity) return 1;
    int *new_data = (int *)realloc(list->data, sizeof(int) * new_capacity);
    if (!new_data) return 0;
    list->data = new_data;
    list->capacity = new_capacity;
    return 1;
}

int insert_at(SeqList *list, int index, int value) {
    if (index < 0 || index > list->size) return 0;
    if (list->size == list->capacity) {
        int next_capacity = list->capacity == 0 ? 4 : list->capacity * 2;
        if (!reserve(list, next_capacity)) return 0;
    }
    for (int i = list->size; i > index; --i) {
        list->data[i] = list->data[i - 1];
    }
    list->data[index] = value;
    ++list->size;
    return 1;
}

int erase_at(SeqList *list, int index) {
    if (index < 0 || index >= list->size) return 0;
    for (int i = index; i < list->size - 1; ++i) {
        list->data[i] = list->data[i + 1];
    }
    --list->size;
    return 1;
}

int find_value(const SeqList *list, int value) {
    for (int i = 0; i < list->size; ++i) {
        if (list->data[i] == value) return i;
    }
    return -1;
}

void print_list(const SeqList *list) {
    printf("[");
    for (int i = 0; i < list->size; ++i) {
        printf("%d%s", list->data[i], i + 1 == list->size ? "" : ", ");
    }
    printf("] size=%d capacity=%d\n", list->size, list->capacity);
}

int main(void) {
    SeqList list;
    if (!init_list(&list, 2)) return 1;

    insert_at(&list, 0, 10);
    insert_at(&list, 1, 30);
    insert_at(&list, 1, 20);
    insert_at(&list, 3, 40);
    print_list(&list);

    printf("find 30 -> %d\n", find_value(&list, 30));
    erase_at(&list, 1);
    print_list(&list);

    destroy_list(&list);
    return 0;
}
`,
  "linked_list.c": String.raw`
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

Node *create_node(int value) {
    Node *node = (Node *)malloc(sizeof(Node));
    if (!node) return NULL;
    node->data = value;
    node->next = NULL;
    return node;
}

Node *create_head(void) {
    return create_node(0);
}

int insert_after(Node *prev, int value) {
    if (!prev) return 0;
    Node *node = create_node(value);
    if (!node) return 0;
    node->next = prev->next;
    prev->next = node;
    return 1;
}

Node *find_prev(Node *head, int value) {
    Node *p = head;
    while (p && p->next) {
        if (p->next->data == value) return p;
        p = p->next;
    }
    return NULL;
}

int erase_value(Node *head, int value) {
    Node *prev = find_prev(head, value);
    if (!prev) return 0;
    Node *target = prev->next;
    prev->next = target->next;
    free(target);
    return 1;
}

void reverse(Node *head) {
    Node *prev = NULL;
    Node *cur = head->next;
    while (cur) {
        Node *next = cur->next;
        cur->next = prev;
        prev = cur;
        cur = next;
    }
    head->next = prev;
}

void print_list(const Node *head) {
    const Node *p = head->next;
    printf("head");
    while (p) {
        printf(" -> %d", p->data);
        p = p->next;
    }
    printf(" -> NULL\n");
}

void destroy(Node *head) {
    Node *p = head;
    while (p) {
        Node *next = p->next;
        free(p);
        p = next;
    }
}

int main(void) {
    Node *head = create_head();
    insert_after(head, 30);
    insert_after(head, 20);
    insert_after(head, 10);
    print_list(head);

    erase_value(head, 20);
    print_list(head);

    reverse(head);
    print_list(head);

    destroy(head);
    return 0;
}
`,
  "stack_parentheses.c": String.raw`
#include <stdio.h>
#include <string.h>

#define MAX_STACK 128

typedef struct {
    char data[MAX_STACK];
    int top;
} CharStack;

void init_stack(CharStack *s) {
    s->top = -1;
}

int is_empty(const CharStack *s) {
    return s->top == -1;
}

int push(CharStack *s, char ch) {
    if (s->top + 1 >= MAX_STACK) return 0;
    s->data[++s->top] = ch;
    return 1;
}

int pop(CharStack *s, char *out) {
    if (is_empty(s)) return 0;
    *out = s->data[s->top--];
    return 1;
}

int match_pair(char left, char right) {
    return (left == '(' && right == ')') ||
           (left == '[' && right == ']') ||
           (left == '{' && right == '}');
}

int is_matched(const char *text) {
    CharStack s;
    init_stack(&s);

    for (int i = 0; text[i] != '\0'; ++i) {
        char ch = text[i];
        if (ch == '(' || ch == '[' || ch == '{') {
            if (!push(&s, ch)) return 0;
        } else if (ch == ')' || ch == ']' || ch == '}') {
            char left;
            if (!pop(&s, &left) || !match_pair(left, ch)) {
                return 0;
            }
        }
    }
    return is_empty(&s);
}

int main(void) {
    const char *cases[] = {
        "a[(b+c)*d]",
        "{[()()]}",
        "([)]",
        "((missing)"
    };
    int n = (int)(sizeof(cases) / sizeof(cases[0]));
    for (int i = 0; i < n; ++i) {
        printf("%s -> %s\n", cases[i], is_matched(cases[i]) ? "matched" : "invalid");
    }
    return 0;
}
`,
  "circular_queue.c": String.raw`
#include <stdio.h>

#define CAPACITY 8

typedef struct {
    int data[CAPACITY];
    int front;
    int rear;
} Queue;

void init_queue(Queue *q) {
    q->front = 0;
    q->rear = 0;
}

int is_empty(const Queue *q) {
    return q->front == q->rear;
}

int is_full(const Queue *q) {
    return (q->rear + 1) % CAPACITY == q->front;
}

int enqueue(Queue *q, int value) {
    if (is_full(q)) return 0;
    q->data[q->rear] = value;
    q->rear = (q->rear + 1) % CAPACITY;
    return 1;
}

int dequeue(Queue *q, int *out) {
    if (is_empty(q)) return 0;
    *out = q->data[q->front];
    q->front = (q->front + 1) % CAPACITY;
    return 1;
}

void print_queue(const Queue *q) {
    printf("front=%d rear=%d |", q->front, q->rear);
    int i = q->front;
    while (i != q->rear) {
        printf(" %d", q->data[i]);
        i = (i + 1) % CAPACITY;
    }
    printf("\n");
}

int main(void) {
    Queue q;
    init_queue(&q);
    for (int i = 1; i <= 6; ++i) {
        enqueue(&q, i * 10);
    }
    print_queue(&q);

    int value;
    dequeue(&q, &value);
    dequeue(&q, &value);
    print_queue(&q);

    enqueue(&q, 70);
    enqueue(&q, 80);
    print_queue(&q);
    return 0;
}
`,
  "kmp_string.c": String.raw`
#include <stdio.h>
#include <string.h>

#define MAX_PATTERN 128

void build_next(const char *pattern, int next[]) {
    int m = (int)strlen(pattern);
    next[0] = 0;
    int len = 0;
    int i = 1;
    while (i < m) {
        if (pattern[i] == pattern[len]) {
            next[i++] = ++len;
        } else if (len > 0) {
            len = next[len - 1];
        } else {
            next[i++] = 0;
        }
    }
}

int kmp_search(const char *text, const char *pattern) {
    int n = (int)strlen(text);
    int m = (int)strlen(pattern);
    if (m == 0) return 0;

    int next[MAX_PATTERN];
    build_next(pattern, next);

    int i = 0;
    int j = 0;
    while (i < n) {
        if (text[i] == pattern[j]) {
            ++i;
            ++j;
            if (j == m) return i - j;
        } else if (j > 0) {
            j = next[j - 1];
        } else {
            ++i;
        }
    }
    return -1;
}

int main(void) {
    const char *text = "ababcabcacbab";
    const char *pattern = "abcac";
    int next[MAX_PATTERN];
    build_next(pattern, next);

    printf("pattern: %s\nnext: ", pattern);
    for (int i = 0; pattern[i] != '\0'; ++i) {
        printf("%d ", next[i]);
    }
    printf("\nposition = %d\n", kmp_search(text, pattern));
    return 0;
}
`,
  "binary_tree.c": String.raw`
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    char data;
    struct Node *left;
    struct Node *right;
} Node;

Node *new_node(char data) {
    Node *node = (Node *)malloc(sizeof(Node));
    if (!node) return NULL;
    node->data = data;
    node->left = NULL;
    node->right = NULL;
    return node;
}

Node *build_demo_tree(void) {
    Node *a = new_node('A');
    Node *b = new_node('B');
    Node *c = new_node('C');
    Node *d = new_node('D');
    Node *e = new_node('E');
    Node *f = new_node('F');
    a->left = b;
    a->right = c;
    b->left = d;
    b->right = e;
    c->right = f;
    return a;
}

void preorder(const Node *root) {
    if (!root) return;
    printf("%c ", root->data);
    preorder(root->left);
    preorder(root->right);
}

void inorder(const Node *root) {
    if (!root) return;
    inorder(root->left);
    printf("%c ", root->data);
    inorder(root->right);
}

void postorder(const Node *root) {
    if (!root) return;
    postorder(root->left);
    postorder(root->right);
    printf("%c ", root->data);
}

int height(const Node *root) {
    if (!root) return 0;
    int lh = height(root->left);
    int rh = height(root->right);
    return (lh > rh ? lh : rh) + 1;
}

int count_nodes(const Node *root) {
    if (!root) return 0;
    return 1 + count_nodes(root->left) + count_nodes(root->right);
}

void destroy(Node *root) {
    if (!root) return;
    destroy(root->left);
    destroy(root->right);
    free(root);
}

int main(void) {
    Node *root = build_demo_tree();
    printf("preorder: ");
    preorder(root);
    printf("\ninorder: ");
    inorder(root);
    printf("\npostorder: ");
    postorder(root);
    printf("\nheight=%d nodes=%d\n", height(root), count_nodes(root));
    destroy(root);
    return 0;
}
`,
  "avl_tree.c": String.raw`
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int key;
    int height;
    struct Node *left;
    struct Node *right;
} Node;

int height(Node *node) {
    return node ? node->height : 0;
}

int max_int(int a, int b) {
    return a > b ? a : b;
}

Node *new_node(int key) {
    Node *node = (Node *)malloc(sizeof(Node));
    if (!node) return NULL;
    node->key = key;
    node->height = 1;
    node->left = NULL;
    node->right = NULL;
    return node;
}

void update_height(Node *node) {
    node->height = max_int(height(node->left), height(node->right)) + 1;
}

int balance_factor(Node *node) {
    return node ? height(node->left) - height(node->right) : 0;
}

Node *rotate_right(Node *y) {
    Node *x = y->left;
    Node *t2 = x->right;
    x->right = y;
    y->left = t2;
    update_height(y);
    update_height(x);
    return x;
}

Node *rotate_left(Node *x) {
    Node *y = x->right;
    Node *t2 = y->left;
    y->left = x;
    x->right = t2;
    update_height(x);
    update_height(y);
    return y;
}

Node *insert(Node *root, int key) {
    if (!root) return new_node(key);
    if (key < root->key) root->left = insert(root->left, key);
    else if (key > root->key) root->right = insert(root->right, key);
    else return root;

    update_height(root);
    int bf = balance_factor(root);

    if (bf > 1 && key < root->left->key) return rotate_right(root);
    if (bf < -1 && key > root->right->key) return rotate_left(root);
    if (bf > 1 && key > root->left->key) {
        root->left = rotate_left(root->left);
        return rotate_right(root);
    }
    if (bf < -1 && key < root->right->key) {
        root->right = rotate_right(root->right);
        return rotate_left(root);
    }
    return root;
}

int search(Node *root, int key) {
    while (root) {
        if (key == root->key) return 1;
        root = key < root->key ? root->left : root->right;
    }
    return 0;
}

void inorder(Node *root) {
    if (!root) return;
    inorder(root->left);
    printf("%d(h=%d) ", root->key, root->height);
    inorder(root->right);
}

void destroy(Node *root) {
    if (!root) return;
    destroy(root->left);
    destroy(root->right);
    free(root);
}

int main(void) {
    int keys[] = {30, 20, 10, 25, 40, 50, 45};
    int n = (int)(sizeof(keys) / sizeof(keys[0]));
    Node *root = NULL;
    for (int i = 0; i < n; ++i) {
        root = insert(root, keys[i]);
        printf("after insert %d: ", keys[i]);
        inorder(root);
        printf("\n");
    }
    printf("search 25 -> %s\n", search(root, 25) ? "yes" : "no");
    destroy(root);
    return 0;
}
`,
  "min_heap.c": String.raw`
#include <stdio.h>

#define MAX_HEAP 64

typedef struct {
    int data[MAX_HEAP];
    int size;
} MinHeap;

void swap_int(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

void init_heap(MinHeap *h) {
    h->size = 0;
}

void sift_up(MinHeap *h, int index) {
    while (index > 0) {
        int parent = (index - 1) / 2;
        if (h->data[parent] <= h->data[index]) break;
        swap_int(&h->data[parent], &h->data[index]);
        index = parent;
    }
}

void sift_down(MinHeap *h, int index) {
    while (1) {
        int left = index * 2 + 1;
        int right = index * 2 + 2;
        int smallest = index;
        if (left < h->size && h->data[left] < h->data[smallest]) smallest = left;
        if (right < h->size && h->data[right] < h->data[smallest]) smallest = right;
        if (smallest == index) break;
        swap_int(&h->data[index], &h->data[smallest]);
        index = smallest;
    }
}

int push(MinHeap *h, int value) {
    if (h->size >= MAX_HEAP) return 0;
    h->data[h->size] = value;
    sift_up(h, h->size);
    ++h->size;
    return 1;
}

int pop(MinHeap *h, int *out) {
    if (h->size == 0) return 0;
    *out = h->data[0];
    h->data[0] = h->data[--h->size];
    sift_down(h, 0);
    return 1;
}

void print_heap(const MinHeap *h) {
    for (int i = 0; i < h->size; ++i) {
        printf("%d ", h->data[i]);
    }
    printf("\n");
}

int main(void) {
    int values[] = {35, 12, 28, 7, 18, 3, 42};
    MinHeap h;
    init_heap(&h);
    for (int i = 0; i < 7; ++i) {
        push(&h, values[i]);
        print_heap(&h);
    }

    int x;
    printf("pop order: ");
    while (pop(&h, &x)) {
        printf("%d ", x);
    }
    printf("\n");
    return 0;
}
`,
  "graph_traversal.c": String.raw`
#include <stdio.h>
#include <stdlib.h>

#define V 6

typedef struct Edge {
    int to;
    struct Edge *next;
} Edge;

typedef struct {
    Edge *head[V];
} Graph;

void init_graph(Graph *g) {
    for (int i = 0; i < V; ++i) g->head[i] = NULL;
}

void add_edge(Graph *g, int u, int v) {
    Edge *e = (Edge *)malloc(sizeof(Edge));
    e->to = v;
    e->next = g->head[u];
    g->head[u] = e;
}

void add_undirected_edge(Graph *g, int u, int v) {
    add_edge(g, u, v);
    add_edge(g, v, u);
}

void dfs(Graph *g, int u, int visited[]) {
    visited[u] = 1;
    printf("%d ", u);
    for (Edge *e = g->head[u]; e; e = e->next) {
        if (!visited[e->to]) dfs(g, e->to, visited);
    }
}

void bfs(Graph *g, int start) {
    int visited[V] = {0};
    int queue[V];
    int front = 0, rear = 0;
    visited[start] = 1;
    queue[rear++] = start;

    while (front < rear) {
        int u = queue[front++];
        printf("%d ", u);
        for (Edge *e = g->head[u]; e; e = e->next) {
            if (!visited[e->to]) {
                visited[e->to] = 1;
                queue[rear++] = e->to;
            }
        }
    }
}

void destroy(Graph *g) {
    for (int i = 0; i < V; ++i) {
        Edge *p = g->head[i];
        while (p) {
            Edge *next = p->next;
            free(p);
            p = next;
        }
    }
}

int main(void) {
    Graph g;
    init_graph(&g);
    add_undirected_edge(&g, 0, 1);
    add_undirected_edge(&g, 0, 2);
    add_undirected_edge(&g, 1, 3);
    add_undirected_edge(&g, 2, 4);
    add_undirected_edge(&g, 3, 5);

    int visited[V] = {0};
    printf("DFS: ");
    dfs(&g, 0, visited);
    printf("\nBFS: ");
    bfs(&g, 0);
    printf("\n");

    destroy(&g);
    return 0;
}
`,
  "graph_algorithms.c": String.raw`
#include <stdio.h>
#include <limits.h>

#define N 5
#define INF 1000000

int min_unvisited(const int dist[], const int visited[]) {
    int best = -1;
    for (int i = 0; i < N; ++i) {
        if (!visited[i] && (best == -1 || dist[i] < dist[best])) {
            best = i;
        }
    }
    return best;
}

void dijkstra(int graph[N][N], int source, int dist[], int prev[]) {
    int visited[N] = {0};
    for (int i = 0; i < N; ++i) {
        dist[i] = INF;
        prev[i] = -1;
    }
    dist[source] = 0;

    for (int step = 0; step < N; ++step) {
        int u = min_unvisited(dist, visited);
        if (u == -1 || dist[u] == INF) break;
        visited[u] = 1;
        for (int v = 0; v < N; ++v) {
            if (graph[u][v] > 0 && !visited[v]) {
                int candidate = dist[u] + graph[u][v];
                if (candidate < dist[v]) {
                    dist[v] = candidate;
                    prev[v] = u;
                }
            }
        }
    }
}

void print_path(int prev[], int target) {
    if (target == -1) return;
    print_path(prev, prev[target]);
    printf("%d ", target);
}

int main(void) {
    int graph[N][N] = {
        {0, 10, 3, 0, 0},
        {0, 0, 1, 2, 0},
        {0, 4, 0, 8, 2},
        {0, 0, 0, 0, 7},
        {0, 0, 0, 9, 0}
    };
    int dist[N];
    int prev[N];
    dijkstra(graph, 0, dist, prev);

    for (int i = 0; i < N; ++i) {
        printf("0 -> %d: dist=%d path=", i, dist[i]);
        print_path(prev, i);
        printf("\n");
    }
    return 0;
}
`,
  "search_hash.c": String.raw`
#include <stdio.h>

#define TABLE_SIZE 11
#define EMPTY -1

int sequential_search(const int a[], int n, int key) {
    for (int i = 0; i < n; ++i) {
        if (a[i] == key) return i;
    }
    return -1;
}

int binary_search(const int a[], int n, int key) {
    int left = 0;
    int right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (a[mid] == key) return mid;
        if (a[mid] < key) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

void init_table(int table[]) {
    for (int i = 0; i < TABLE_SIZE; ++i) table[i] = EMPTY;
}

int hash(int key) {
    return key % TABLE_SIZE;
}

int hash_insert(int table[], int key) {
    int start = hash(key);
    for (int i = 0; i < TABLE_SIZE; ++i) {
        int pos = (start + i) % TABLE_SIZE;
        if (table[pos] == EMPTY || table[pos] == key) {
            table[pos] = key;
            return pos;
        }
    }
    return -1;
}

int hash_search(int table[], int key) {
    int start = hash(key);
    for (int i = 0; i < TABLE_SIZE; ++i) {
        int pos = (start + i) % TABLE_SIZE;
        if (table[pos] == EMPTY) return -1;
        if (table[pos] == key) return pos;
    }
    return -1;
}

int main(void) {
    int sorted[] = {3, 8, 12, 19, 24, 31, 44};
    int n = (int)(sizeof(sorted) / sizeof(sorted[0]));
    printf("seq search 24 -> %d\n", sequential_search(sorted, n, 24));
    printf("bin search 24 -> %d\n", binary_search(sorted, n, 24));

    int table[TABLE_SIZE];
    init_table(table);
    int keys[] = {22, 41, 53, 46, 30, 13, 1};
    for (int i = 0; i < 7; ++i) {
        printf("insert %d at %d\n", keys[i], hash_insert(table, keys[i]));
    }
    printf("search 46 -> %d\n", hash_search(table, 46));
    return 0;
}
`,
  "simple_sorts.c": String.raw`
#include <stdio.h>

void print_array(const int a[], int n) {
    for (int i = 0; i < n; ++i) printf("%d ", a[i]);
    printf("\n");
}

void insertion_sort(int a[], int n) {
    for (int i = 1; i < n; ++i) {
        int key = a[i];
        int j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            --j;
        }
        a[j + 1] = key;
    }
}

void selection_sort(int a[], int n) {
    for (int i = 0; i < n - 1; ++i) {
        int min_index = i;
        for (int j = i + 1; j < n; ++j) {
            if (a[j] < a[min_index]) min_index = j;
        }
        int t = a[i];
        a[i] = a[min_index];
        a[min_index] = t;
    }
}

void bubble_sort(int a[], int n) {
    for (int pass = 0; pass < n - 1; ++pass) {
        int swapped = 0;
        for (int i = 0; i < n - 1 - pass; ++i) {
            if (a[i] > a[i + 1]) {
                int t = a[i];
                a[i] = a[i + 1];
                a[i + 1] = t;
                swapped = 1;
            }
        }
        if (!swapped) break;
    }
}

void copy_array(int dst[], const int src[], int n) {
    for (int i = 0; i < n; ++i) dst[i] = src[i];
}

int main(void) {
    int source[] = {29, 10, 14, 37, 14, 3};
    int n = (int)(sizeof(source) / sizeof(source[0]));
    int a[6];

    copy_array(a, source, n);
    insertion_sort(a, n);
    printf("insertion: ");
    print_array(a, n);

    copy_array(a, source, n);
    selection_sort(a, n);
    printf("selection: ");
    print_array(a, n);

    copy_array(a, source, n);
    bubble_sort(a, n);
    printf("bubble: ");
    print_array(a, n);
    return 0;
}
`,
  "efficient_sorts.c": String.raw`
#include <stdio.h>
#include <stdlib.h>

void print_array(const int a[], int n) {
    for (int i = 0; i < n; ++i) printf("%d ", a[i]);
    printf("\n");
}

void swap_int(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

int partition(int a[], int low, int high) {
    int pivot = a[high];
    int i = low;
    for (int j = low; j < high; ++j) {
        if (a[j] <= pivot) {
            swap_int(&a[i], &a[j]);
            ++i;
        }
    }
    swap_int(&a[i], &a[high]);
    return i;
}

void quick_sort(int a[], int low, int high) {
    if (low >= high) return;
    int p = partition(a, low, high);
    quick_sort(a, low, p - 1);
    quick_sort(a, p + 1, high);
}

void merge(int a[], int temp[], int left, int mid, int right) {
    int i = left, j = mid + 1, k = left;
    while (i <= mid && j <= right) {
        if (a[i] <= a[j]) temp[k++] = a[i++];
        else temp[k++] = a[j++];
    }
    while (i <= mid) temp[k++] = a[i++];
    while (j <= right) temp[k++] = a[j++];
    for (i = left; i <= right; ++i) a[i] = temp[i];
}

void merge_sort_rec(int a[], int temp[], int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    merge_sort_rec(a, temp, left, mid);
    merge_sort_rec(a, temp, mid + 1, right);
    merge(a, temp, left, mid, right);
}

void merge_sort(int a[], int n) {
    int *temp = (int *)malloc(sizeof(int) * n);
    if (!temp) return;
    merge_sort_rec(a, temp, 0, n - 1);
    free(temp);
}

void heap_sift_down(int a[], int n, int index) {
    while (1) {
        int left = index * 2 + 1;
        int right = index * 2 + 2;
        int largest = index;
        if (left < n && a[left] > a[largest]) largest = left;
        if (right < n && a[right] > a[largest]) largest = right;
        if (largest == index) break;
        swap_int(&a[index], &a[largest]);
        index = largest;
    }
}

void heap_sort(int a[], int n) {
    for (int i = n / 2 - 1; i >= 0; --i) heap_sift_down(a, n, i);
    for (int end = n - 1; end > 0; --end) {
        swap_int(&a[0], &a[end]);
        heap_sift_down(a, end, 0);
    }
}

void copy_array(int dst[], const int src[], int n) {
    for (int i = 0; i < n; ++i) dst[i] = src[i];
}

int main(void) {
    int source[] = {38, 27, 43, 3, 9, 82, 10};
    int n = (int)(sizeof(source) / sizeof(source[0]));
    int a[7];

    copy_array(a, source, n);
    quick_sort(a, 0, n - 1);
    printf("quick: ");
    print_array(a, n);

    copy_array(a, source, n);
    merge_sort(a, n);
    printf("merge: ");
    print_array(a, n);

    copy_array(a, source, n);
    heap_sort(a, n);
    printf("heap: ");
    print_array(a, n);
    return 0;
}
`,
  "linear_sorts.c": String.raw`
#include <stdio.h>
#include <stdlib.h>

void print_array(const int a[], int n) {
    for (int i = 0; i < n; ++i) printf("%d ", a[i]);
    printf("\n");
}

void counting_sort_nonnegative(int a[], int n, int max_value) {
    int *count = (int *)calloc((size_t)max_value + 1, sizeof(int));
    int *output = (int *)malloc(sizeof(int) * n);
    if (!count || !output) {
        free(count);
        free(output);
        return;
    }

    for (int i = 0; i < n; ++i) ++count[a[i]];
    for (int i = 1; i <= max_value; ++i) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; --i) {
        output[--count[a[i]]] = a[i];
    }
    for (int i = 0; i < n; ++i) a[i] = output[i];

    free(count);
    free(output);
}

int get_max(const int a[], int n) {
    int m = a[0];
    for (int i = 1; i < n; ++i) if (a[i] > m) m = a[i];
    return m;
}

void radix_counting_pass(int a[], int n, int exp) {
    int count[10] = {0};
    int *output = (int *)malloc(sizeof(int) * n);
    if (!output) return;

    for (int i = 0; i < n; ++i) ++count[(a[i] / exp) % 10];
    for (int i = 1; i < 10; ++i) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; --i) {
        int digit = (a[i] / exp) % 10;
        output[--count[digit]] = a[i];
    }
    for (int i = 0; i < n; ++i) a[i] = output[i];
    free(output);
}

void radix_sort(int a[], int n) {
    int max_value = get_max(a, n);
    for (int exp = 1; max_value / exp > 0; exp *= 10) {
        radix_counting_pass(a, n, exp);
    }
}

int main(void) {
    int scores[] = {4, 2, 2, 8, 3, 3, 1};
    int score_n = (int)(sizeof(scores) / sizeof(scores[0]));
    counting_sort_nonnegative(scores, score_n, 8);
    printf("counting: ");
    print_array(scores, score_n);

    int ids[] = {170, 45, 75, 90, 802, 24, 2, 66};
    int id_n = (int)(sizeof(ids) / sizeof(ids[0]));
    radix_sort(ids, id_n);
    printf("radix: ");
    print_array(ids, id_n);
    return 0;
}
`,
  "student_index_lab.c": String.raw`
#include <stdio.h>
#include <string.h>

#define MAX_STUDENTS 32
#define NAME_LEN 32
#define HASH_SIZE 53

typedef struct {
    int id;
    char name[NAME_LEN];
    int score;
} Student;

typedef struct {
    Student data[MAX_STUDENTS];
    int size;
} StudentList;

typedef struct {
    int key;
    int index;
} HashSlot;

void init_hash(HashSlot table[]) {
    for (int i = 0; i < HASH_SIZE; ++i) {
        table[i].key = -1;
        table[i].index = -1;
    }
}

int hash_id(int id) {
    return id % HASH_SIZE;
}

int add_student(StudentList *list, HashSlot table[], int id, const char *name, int score) {
    if (list->size >= MAX_STUDENTS) return 0;
    int index = list->size++;
    list->data[index].id = id;
    strncpy(list->data[index].name, name, NAME_LEN - 1);
    list->data[index].name[NAME_LEN - 1] = '\0';
    list->data[index].score = score;

    int start = hash_id(id);
    for (int i = 0; i < HASH_SIZE; ++i) {
        int pos = (start + i) % HASH_SIZE;
        if (table[pos].key == -1) {
            table[pos].key = id;
            table[pos].index = index;
            return 1;
        }
    }
    return 0;
}

Student *find_by_id(StudentList *list, HashSlot table[], int id) {
    int start = hash_id(id);
    for (int i = 0; i < HASH_SIZE; ++i) {
        int pos = (start + i) % HASH_SIZE;
        if (table[pos].key == -1) return NULL;
        if (table[pos].key == id) return &list->data[table[pos].index];
    }
    return NULL;
}

void sort_by_score(StudentList *list) {
    for (int i = 1; i < list->size; ++i) {
        Student key = list->data[i];
        int j = i - 1;
        while (j >= 0 && list->data[j].score < key.score) {
            list->data[j + 1] = list->data[j];
            --j;
        }
        list->data[j + 1] = key;
    }
}

void print_students(const StudentList *list) {
    for (int i = 0; i < list->size; ++i) {
        printf("%d %-8s %d\n", list->data[i].id, list->data[i].name, list->data[i].score);
    }
}

int main(void) {
    StudentList list = {.size = 0};
    HashSlot table[HASH_SIZE];
    init_hash(table);

    add_student(&list, table, 202401, "Lin", 91);
    add_student(&list, table, 202402, "Chen", 86);
    add_student(&list, table, 202403, "Wang", 95);
    add_student(&list, table, 202404, "Zhao", 78);

    Student *found = find_by_id(&list, table, 202403);
    if (found) printf("found: %s score=%d\n", found->name, found->score);

    sort_by_score(&list);
    printf("rank by score:\n");
    print_students(&list);
    return 0;
}
`
};

const functionComments = {
  linear_sum: "线性扫描示例：每个元素访问一次，用来观察 O(n) 的来源。",
  binary_search: "二分查找示例：区间 [left, right] 每轮缩小一半，前提是数组有序且支持随机访问。",
  pair_count_less_than: "双重循环示例：枚举所有二元组，用来观察 O(n^2) 的增长。",
  fibonacci_calls: "递归调用示例：故意使用朴素递归，展示重复子问题会造成指数级调用。",
  init_list: "建立顺序表的合法空状态：申请连续空间，并把 size 与 capacity 分开维护。",
  destroy_list: "释放顺序表持有的动态内存，并把字段清空，避免悬空指针被继续使用。",
  reserve: "扩容只改变物理容量，不改变逻辑长度；realloc 成功后原元素仍按原顺序保存。",
  insert_at: "顺序表插入的核心：先保证容量，再从后向前搬移元素，最后写入新值。",
  erase_at: "顺序表删除的核心：目标之后的元素整体前移，逻辑长度减一。",
  find_value: "按值查找只能顺序比较；顺序表的 O(1) 随机访问不等于 O(1) 按值查找。",
  print_list: "输出函数用于观察结构状态，调试数据结构时要同时看元素、size 和 capacity。",
  create_node: "封装结点申请，保证每个新结点的数据域和指针域都有明确初始值。",
  create_head: "创建头结点。头结点不存业务数据，它让首元结点的插入删除更统一。",
  insert_after: "已知前驱结点时插入是 O(1)：先让新结点接上后继，再让前驱指向新结点。",
  find_prev: "单链表删除通常需要前驱结点，因此查找时返回目标结点的前驱。",
  erase_value: "删除结点时要先改前驱指针，再释放目标结点，避免链表断裂和内存泄漏。",
  reverse: "链表逆置逐个改变 next 方向，需要同时保存 prev、cur 和 next 三个位置。",
  destroy: "释放结构中的动态结点；释放前要保证仍能访问到尚未释放的部分。",
  init_stack: "初始化栈顶位置。这里 top=-1 表示空栈。",
  is_empty: "判断结构是否为空，很多操作都要先走这个边界检查。",
  push: "入栈只改变栈顶一端；先检查容量，再移动 top 并写入元素。",
  pop: "出栈只从栈顶删除；先判断空栈，再返回栈顶元素并移动 top。",
  match_pair: "把括号配对规则集中到一个函数中，主算法只关心入栈和出栈。",
  is_matched: "括号匹配的核心：左括号入栈，右括号必须匹配最近的左括号。",
  init_queue: "循环队列初始化时 front 和 rear 指向同一位置，表示队空。",
  is_full: "牺牲一个数组单元后，rear 的下一个位置等于 front 表示队满。",
  enqueue: "入队在 rear 写入，然后 rear 取模后移，避免普通数组队列的整体搬移。",
  dequeue: "出队在 front 读取，然后 front 取模后移，操作代价为 O(1)。",
  print_queue: "按循环下标从 front 走到 rear，显示队列的逻辑顺序。",
  build_next: "构造 KMP 的 next 数组，记录模式串前缀与后缀可复用的匹配长度。",
  kmp_search: "KMP 匹配时文本指针不回退，失配后只根据 next 调整模式串下标。",
  new_node: "创建树结点或 AVL 结点，所有孩子指针必须初始化为空。",
  build_demo_tree: "手工连接一棵小二叉树，便于观察三种深度优先遍历的差别。",
  preorder: "前序遍历：先访问根，再递归访问左子树和右子树。",
  inorder: "中序遍历：左、根、右；在 BST 中会得到有序序列。",
  postorder: "后序遍历：先处理左右子树，最后处理根，常用于释放树。",
  height: "返回子树高度：普通二叉树版本递归计算，AVL 版本读取结点中维护的高度字段。",
  count_nodes: "结点计数递归：根结点 1 个，加上左右子树结点数。",
  max_int: "小工具函数，避免在高度更新时重复写条件表达式。",
  update_height: "AVL 每次修改子树后都要重新计算高度，高度是判断平衡的基础。",
  balance_factor: "平衡因子等于左子树高度减右子树高度，用它判断旋转类型。",
  rotate_right: "右旋处理 LL 型失衡，局部改变父子关系但保持中序有序。",
  rotate_left: "左旋处理 RR 型失衡，旋转后要从下到上更新高度。",
  insert: "AVL 插入先按 BST 插入，再沿递归返回路径更新高度并旋转恢复平衡。",
  search: "BST/AVL 查找利用关键字大小，每次只进入一侧子树。",
  swap_int: "交换两个整数位置，排序和堆调整中都会频繁使用。",
  init_heap: "堆的 size 表示当前元素个数，数组下标关系隐含完全二叉树结构。",
  sift_up: "上滤用于插入后修复堆序：新元素不断与父结点比较并交换。",
  sift_down: "下滤用于删除堆顶或建堆：父结点与更小的孩子交换直到堆序恢复。",
  init_graph: "邻接表初始化时，每个顶点的边链表都为空。",
  add_edge: "添加一条有向边，使用头插法把边结点接到顶点的邻接链表。",
  add_undirected_edge: "无向边可以看成两条方向相反的有向边。",
  dfs: "深度优先遍历沿一条路径尽量深入，递归调用栈保存回退位置。",
  bfs: "广度优先遍历使用队列，保证按距离层次扩展顶点。",
  min_unvisited: "Dijkstra 每轮选择当前 dist 最小且尚未确定的顶点。",
  dijkstra: "Dijkstra 的核心是选择最小未确定顶点，并用它松弛所有邻接边。",
  print_path: "根据 prev 前驱数组递归恢复从源点到目标点的路径。",
  sequential_search: "顺序查找逐个比较，不要求数据有序，但最坏要看完所有元素。",
  init_table: "哈希表空槽要有明确标记，这里用 EMPTY 表示从未存放关键字。",
  hash: "哈希函数把关键字映射到桶下标，实际系统要关注分布是否均匀。",
  hash_insert: "线性探测插入：冲突时按固定序列寻找下一个空槽。",
  hash_search: "线性探测查找必须沿同一探测序列前进，遇到空槽才停止。",
  print_array: "输出数组用于观察排序每次操作后的结果。",
  insertion_sort: "插入排序维护有序前缀，把当前元素插入前缀中的合适位置。",
  selection_sort: "选择排序每轮选择未排序区间最小元素放到前面。",
  bubble_sort: "冒泡排序通过相邻交换把大元素逐步推到后面，可用 swapped 提前结束。",
  copy_array: "排序实验需要复制原数组，避免前一个算法的结果影响后一个算法。",
  partition: "快速排序划分函数维护小于等于 pivot 的左侧区间。",
  quick_sort: "快速排序先划分确定 pivot 最终位置，再递归处理左右区间。",
  merge: "归并函数把两个有序子段线性合并成一个有序段。",
  merge_sort_rec: "归并排序递归拆分区间，直到单元素区间天然有序。",
  merge_sort: "归并排序需要辅助数组保存合并结果，空间复杂度为 O(n)。",
  heap_sift_down: "堆排序中的下滤维护最大堆性质。",
  heap_sort: "堆排序先建最大堆，再反复把堆顶最大值放到数组末尾。",
  counting_sort_nonnegative: "计数排序统计关键字出现次数，再用前缀和决定输出位置。",
  get_max: "基数排序需要知道最大值，从而确定要处理多少位。",
  radix_counting_pass: "基数排序每一位都使用稳定的计数排序作为子过程。",
  radix_sort: "基数排序从低位到高位多轮稳定排序，最终得到整体有序结果。",
  init_hash: "综合实验中的哈希索引初始化，key=-1 表示空槽。",
  hash_id: "学号到桶位置的映射函数，示例使用取模。",
  add_student: "添加学生时同时维护顺序表和哈希索引，保证后续按学号快速查找。",
  find_by_id: "按学号查找通过哈希索引找到顺序表下标，再返回学生记录地址。",
  sort_by_score: "按成绩排序使用插入排序，示例规模较小时实现简单且稳定。",
  print_students: "输出所有学生记录，用于检查排序和查询结果。",
  main: "用小规模数据驱动核心操作，观察结构状态和输出是否符合预期。"
};

function annotateCCode(week, source) {
  const header = `/*
 * ${weekName(week)} ${week.title}
 * 学习重点：先看数据如何组织，再看操作如何维护结构不变量。
 * 阅读路线：结构体定义 -> 初始化/销毁 -> 核心操作 -> 边界条件 -> main 中的小样例。
 * 这些注释强调思想和状态变化，课堂上建议配合 lecture.md 与 interactive.html 一起阅读。
 */
`;
  const lines = source.trimStart().split("\n");
  const output = [];
  for (const line of lines) {
    if (/^typedef struct/.test(line)) {
      output.push("");
      output.push("/* 结构体定义：把抽象数据类型落实为 C 语言中的字段。 */");
    }
    const match = line.match(/^(?:[A-Za-z_][\w\s\*]*\s+)([A-Za-z_]\w*)\s*\(/);
    if (match && functionComments[match[1]]) {
      output.push("");
      output.push(`/* ${functionComments[match[1]]} */`);
    }
    output.push(line);
  }
  return header + output.join("\n");
}

function markdownTable(rows) {
  return [
    "| 操作 | 组织方式/关键动作 | 复杂度 |",
    "|---|---|---|",
    ...rows.map((r) => `| ${r[0]} | ${r[1]} | ${r[2]} |`)
  ].join("\n");
}

function studyGuideFor(week) {
  const demo = demoFor(week);
  const opLines = week.operations.map((op, i) => `${i + 1}. **${op[0]}**：${op[1]}。分析时先找会重复执行的语句，再判断重复次数，所以复杂度为 ${op[2]}。`).join("\n");
  const stepLines = demo.steps.map((step, i) => `${i + 1}. **${step.title}**：${step.text}`).join("\n");
  const kindNotes = {
    complexity: {
      representation: "本周没有单一结构体，重点是把代码片段转化为增长函数：顺序语句看常数，循环看迭代次数，递归看子问题规模和递归层数。",
      code: "阅读示例代码时，把 `linear_sum`、`binary_search`、`pair_count_less_than` 和 `fibonacci_calls` 分别标注为线性、对数、平方和递归增长。不要只看函数名，要数循环和递归调用。"
    },
    array: {
      representation: "顺序表通常包含 `data`、`size`、`capacity` 三个字段。`data` 指向连续内存，`size` 表示已有元素个数，`capacity` 表示已申请空间能容纳多少元素。",
      code: "`insert_at` 是本周最值得精读的函数：先检查下标，再判断是否扩容，最后从后向前移动元素。移动方向是顺序表插入正确性的关键。"
    },
    list: {
      representation: "链表结点至少包含数据域和指针域。带头结点的链表让首元结点插入、删除和普通位置保持统一，因为所有删除都可以描述为“已知前驱，越过目标”。",
      code: "阅读链表代码时要画箭头。每看到一次 `next` 赋值，就在纸上重画一次箭头，确认没有丢失后续链。"
    },
    stack: {
      representation: "顺序栈用数组保存元素，用 `top` 表示栈顶位置。空栈常写作 `top == -1`，入栈先移动 top 再写入，出栈先读栈顶再移动 top。",
      code: "括号匹配代码展示了栈的核心思想：左括号表示尚未完成的任务，右括号必须解决最近的未完成任务。"
    },
    queue: {
      representation: "循环队列用 `front` 和 `rear` 两个下标描述状态。`front` 指向队头元素，`rear` 指向下一个可写位置，所有移动都对容量取模。",
      code: "阅读队列代码时重点看队空和队满条件。牺牲一个数组单元后，`front == rear` 表示空，`(rear + 1) % capacity == front` 表示满。"
    },
    string: {
      representation: "串可以看成字符类型的线性表。KMP 的额外结构是 `next` 数组，它记录模式串每个前缀中最长相等前后缀长度。",
      code: "读 KMP 时要分开两个阶段：`build_next` 只处理模式串，`kmp_search` 才同时处理文本串和模式串。失配时文本下标不回退。"
    },
    tree: {
      representation: "二叉树结点包含数据、左孩子指针和右孩子指针。空指针也是结构的一部分，它表示对应子树不存在。",
      code: "遍历函数的递归出口是 `root == NULL`。只要理解“对左子树和右子树做同样的事”，前序、中序、后序的差别就只剩访问根的位置。"
    },
    bst: {
      representation: "二叉搜索树在二叉树结构上增加关键字有序约束：左子树关键字小于根，右子树关键字大于根。AVL 额外维护高度。",
      code: "AVL 插入代码要按递归返回路径理解：先按 BST 规则插入，再更新高度，最后根据平衡因子选择旋转。"
    },
    heap: {
      representation: "堆用数组表示完全二叉树。下标关系是结构的核心：父结点 `(i-1)/2`，左孩子 `2*i+1`，右孩子 `2*i+2`。",
      code: "`sift_up` 和 `sift_down` 分别对应插入和删除堆顶后的修复。每次交换都在恢复父子之间的堆序关系。"
    },
    graph: {
      representation: "邻接表用顶点数组加边链表保存图。它适合稀疏图，因为只保存实际存在的边。",
      code: "DFS 的隐含结构是递归调用栈，BFS 的显式结构是队列。两者访问同一张图，但扩展顺序完全不同。"
    },
    path: {
      representation: "图算法中的数组就是算法状态：`dist` 保存当前最短距离估计，`prev` 保存路径前驱，`visited` 或 settled 集合保存已经确定的顶点。",
      code: "读 Dijkstra 代码时抓住“选择最小未确定顶点”和“松弛邻接边”两个动作，其余循环都是为了实现这两个动作。"
    },
    hash: {
      representation: "查找结构的表示取决于是否有序。二分查找需要有序数组；哈希表需要桶数组、哈希函数和冲突处理策略。",
      code: "线性探测查找必须沿插入时同一探测序列前进。遇到空槽才能断定不存在，不能遇到第一个不相等元素就停止。"
    },
    sort_simple: {
      representation: "排序算法操作的是记录序列和关键字。分析时要区分比较次数、移动次数、额外空间和稳定性。",
      code: "插入排序的内层循环负责移动比 key 大的元素。它不是简单交换，而是先腾位置，最后一次写入 key。"
    },
    sort_fast: {
      representation: "高效排序通过分治或结构约束减少比较。快速排序维护划分边界，归并排序维护有序子段，堆排序维护堆序。",
      code: "快速排序代码重点看 partition 的循环不变量：扫描到 j 之前，左侧区间已经不大于 pivot。"
    },
    radix: {
      representation: "线性时间排序利用关键字范围或位数，不通过两两比较确定顺序。它通常需要辅助数组。",
      code: "计数排序从后向前放置元素是为了稳定性；基数排序依赖每一轮按位排序都稳定。"
    },
    review: {
      representation: "综合设计不是把结构堆在一起，而是让每种结构服务于一个高频操作。顺序表负责遍历，哈希表负责按关键字定位，排序负责排名。",
      code: "综合示例代码展示了索引一致性：添加学生时既要写入顺序表，也要把学号映射到顺序表下标。"
    }
  };
  const note = kindNotes[week.visual] || kindNotes.array;
  return `
## 从问题出发理解本周结构

本周可以从这个具体问题进入：${demo.scenario}

学习时不要先背定义，而要先回答：如果只用最朴素的数组、循环或指针，会在哪个操作上变慢、变乱或容易出错？数据结构的价值就在于把对象之间的关系稳定地组织起来，让操作可以按照可预测的方式执行。

## 结构不变量

${demo.invariant}

不变量是实现数据结构时最重要的检查标准。每个操作执行前不变量应当成立，操作执行后也必须重新成立。如果程序出错，通常就是某一步破坏了不变量，例如顺序表的 \`size\` 与实际元素不一致，链表断链，队列 \`front/rear\` 含义混乱，或者树的有序性被破坏。

## 存储表示拆解

${note.representation}

把逻辑结构翻译成 C 语言时，重点不是写出一个 \`struct\`，而是解释每个字段承担什么责任。字段一旦设计错误，后面的操作会变得复杂甚至无法保证正确。

## 核心操作推演

${opLines}

本周交互演示中的状态变化如下：

${stepLines}

建议学生在纸上跟着演示重画结构图。每一步都要标出“读了哪些字段、写了哪些字段、哪些关系保持不变”。

## 复杂度推导方法

复杂度不是结论表，而是从操作过程推出来的。分析时按下面顺序：

1. 明确输入规模，例如元素个数 \`n\`、模式串长度 \`m\`、顶点数 \`V\`、边数 \`E\` 或关键字范围 \`k\`。
2. 找到最内层重复执行的基本动作，例如比较、赋值、指针跳转、交换或松弛。
3. 说明这个动作最多执行多少次。
4. 区分最好、平均和最坏情况，尤其是查找、哈希和快速排序。
5. 写出额外空间来自哪里，例如辅助数组、队列、栈或递归调用栈。

## 结合代码理解思想

${note.code}

阅读代码时建议按“结构定义 -> 初始化 -> 核心操作 -> 边界处理 -> 释放资源”的顺序。不要从 \`main\` 开始只看输出结果；数据结构课更关心状态如何被维护。
`;
}

function conceptMap(week) {
  return week.topics.map((topic, i) => `${i + 1}. ${topic}`).join("\n");
}

function lectureContent(week, prev, next) {
  const nav = [
    prev ? `上一周：${prev.title}` : "上一周：无，本周建立课程共同语言",
    next ? `下一周：${next.title}` : "下一周：课程总结与考核"
  ].join("\n");

  return `
# ${weekName(week)} ${week.title}

## 本周定位

${week.theme}

${nav}

本课程把数据结构看作“数据的组织形式”，把算法看作“作用在组织形式上的操作过程”。当组织形式变了，同一个操作的代价、边界条件和程序写法都会变化。

## 学习目标

- 能说清本周结构解决的核心问题，以及它不适合解决的问题。
- 能用 C 语言描述本周结构的存储表示，并写出主要操作接口。
- 能分析关键操作的时间复杂度和空间复杂度。
- 能识别常见边界条件，例如空结构、满结构、越界、重复关键字和内存释放。
- 能借助测试用例和代码大模型检查实现，但不把模型输出当作最终答案。

## 知识地图

${conceptMap(week)}

## 核心概念

${week.adt}

讲课时建议始终抓住三个问题：

- 数据对象是什么：元素、结点、记录、顶点还是字符。
- 关系如何保存：连续位置、指针、父子关系、邻接关系、关键字映射还是有序关系。
- 操作如何改变结构：插入、删除、查找、遍历、排序、合并或旋转到底修改了哪些字段。

${studyGuideFor(week)}

## C 语言表示

示例代码见 [${cFileFor(week)}](${cFileFor(week)})。课堂建议先读结构体定义，再读初始化函数，然后读最能体现结构特点的操作函数。

一个可靠的 C 语言实现通常包含：

- 明确的结构体定义，字段名能反映含义。
- 初始化和销毁函数，避免未初始化状态和内存泄漏。
- 操作函数返回成功或失败，调用者能处理异常情况。
- 对数组下标、空指针、容量和边界位置做检查。
- 用小规模样例打印结构状态，帮助观察每一步变化。

## 关键操作与复杂度

${markdownTable(week.operations)}

复杂度分析不要只背结论。要说明输入规模是什么，循环次数或递归层数如何随输入增长，额外空间来自数组、递归栈还是辅助结构。

## 两节课建议安排

### 第 1 节：结构与基本操作

- 用一个现实问题引入本周结构，例如排队、目录树、课程先修关系或关键字查找。
- 画出逻辑结构，再画出 C 语言存储结构。
- 从初始化、插入、删除、查找或遍历中选择 2 到 3 个核心操作手写推导。
- 对照示例代码运行小样例，观察每一步结构状态。

### 第 2 节：复杂度、边界与应用

- 比较不同实现方案的复杂度和适用场景。
- 讨论空结构、满结构、重复元素、非法输入等边界情况。
- 让学生独立补全一个操作，再用测试样例验证。
- 引导学生让 LLM 解释代码或生成测试，但要求学生指出模型回答中的前提和可能错误。

## 常见误区

- 只记操作名称，不知道操作具体改变哪些内存单元。
- 混淆逻辑结构和存储结构，例如以为线性结构一定连续存储。
- 忽略边界条件，导致下标越界、空指针访问或死循环。
- 复杂度只写大 O 结论，不说明 n、m、V、E、k 等规模变量。
- 让代码大模型直接给最终程序，却没有自己设计接口和测试。

## 课堂检查点

- 让学生用一句话解释本周结构的“组织形式”。
- 给出 5 个元素的例子，手工执行一次插入或删除。
- 写出最核心操作的伪代码。
- 给出一个最坏情况输入，并解释为什么是最坏情况。

## 课后学习建议

1. 先复现示例代码，不要直接粘贴，至少手打一遍核心函数。
2. 修改一处边界条件，例如空表删除或查找不存在元素，观察程序行为。
3. 让 LLM 生成 5 个测试用例，再判断这些用例是否覆盖了边界。
4. 把本周结构与上一周结构比较，写出一个适合场景和一个不适合场景。
`;
}

function exercisesContent(week) {
  return `
# ${weekName(week)} ${week.title} 练习题

## 基础理解

1. 用自己的话解释本周主题中的“组织形式”是什么，不超过 120 字。
2. 画出一个包含 5 个元素的小例子，并标出关键字段或关键位置。
3. 写出本周最核心 ADT 操作的函数原型，要求使用 C 语言风格。
4. 说明 ${week.operations[0][0]} 的执行过程，并指出它的时间复杂度。

## 代码阅读

5. 阅读 [${cFileFor(week)}](${cFileFor(week)})，找出初始化函数、核心修改函数和输出函数。
6. 在示例代码中加入一个边界测试，例如空结构操作、容量不足、查找失败或重复关键字。
7. 说明示例代码中最容易写错的一行，并解释错误会造成什么后果。

## 分析与设计

8. 比较本周结构与上一种相关结构的差异，至少写出两个操作层面的差别。
9. 给出一个适合使用本周结构的问题，并说明为什么不用更简单的数组或普通循环。
10. 设计一组最小测试用例，覆盖正常情况、边界情况和异常情况。

## LLM 辅助任务

11. 向代码大模型提问：“请指出下面这段 ${week.shortTitle} C 代码的潜在 bug，并给出测试用例。”然后记录模型答案中最有价值的一点和最需要人工核查的一点。
12. 让 LLM 把本周代码改写为带头文件和源文件分离的版本，检查它是否保持了接口一致性。
`;
}

function demoFor(week) {
  const common = {
    id: week.id,
    title: week.title,
    shortTitle: week.shortTitle,
    theme: week.theme,
    operations: week.operations.map((op) => ({ name: op[0], action: op[1], cost: op[2] }))
  };
  const demos = {
    complexity: {
      kind: "complexity",
      scenario: "比较 n 从 8 增长到 32 时，不同复杂度函数的增长速度。",
      invariant: "复杂度分析关注增长趋势，不关注机器、语言和常数级差异。",
      steps: [
        { title: "O(1)：固定工作量", n: 8, values: [["O(1)", 1], ["O(log n)", 3], ["O(n)", 8], ["O(n log n)", 24], ["O(n^2)", 64]], active: ["O(1)"], text: "无论 n 是多少，常数时间操作只执行固定次数，例如读取数组 a[i]。" },
        { title: "O(log n)：每次缩小一半", n: 16, values: [["O(1)", 1], ["O(log n)", 4], ["O(n)", 16], ["O(n log n)", 64], ["O(n^2)", 256]], active: ["O(log n)"], text: "二分查找每轮排除一半元素，因此规模翻倍只多一次比较。" },
        { title: "O(n)：逐个扫描", n: 32, values: [["O(1)", 1], ["O(log n)", 5], ["O(n)", 32], ["O(n log n)", 160], ["O(n^2)", 1024]], active: ["O(n)", "O(n^2)"], text: "线性扫描随元素个数等比例增长；平方复杂度在规模增加后会迅速变得不可接受。" }
      ]
    },
    array: {
      kind: "array",
      scenario: "在顺序表 [10,20,30,40] 的下标 2 插入 25，观察为什么要从后往前移动。",
      invariant: "0 <= size <= capacity；下标 0 到 size-1 是有效元素；逻辑相邻由连续内存位置表示。",
      steps: [
        { title: "插入前", cells: [10, 20, 30, 40, "_", "_"], size: 4, capacity: 6, active: [2], markers: { insert: 2 }, text: "目标位置是 index=2。直接写入会覆盖 30，所以必须先腾出位置。" },
        { title: "移动尾部元素", cells: [10, 20, 30, 40, 40, "_"], size: 4, capacity: 6, active: [3, 4], markers: { from: 3, to: 4 }, text: "从最后一个有效元素开始后移，先把 a[3] 复制到 a[4]。" },
        { title: "继续向后移动", cells: [10, 20, 30, 30, 40, "_"], size: 4, capacity: 6, active: [2, 3], markers: { from: 2, to: 3 }, text: "再把 a[2] 复制到 a[3]。从后往前移动可以避免数据被提前覆盖。" },
        { title: "写入新元素", cells: [10, 20, 25, 30, 40, "_"], size: 5, capacity: 6, active: [2], markers: { insert: 2 }, text: "把 25 写到 a[2]，size 从 4 变成 5。中间插入的代价来自元素移动。" }
      ]
    },
    list: {
      kind: "list",
      scenario: "在带头结点单链表中，把 20 插入到 10 和 30 之间。",
      invariant: "每个结点只知道自己的 next；插入和删除的关键是先找到前驱结点。",
      steps: [
        { title: "找到前驱", nodes: ["head", "10", "30", "NULL"], active: [1], text: "要在 10 后插入 20，必须先保存前驱结点 p=10。" },
        { title: "分配新结点", nodes: ["head", "10", "20", "30", "NULL"], active: [2], dashed: [[2, 3]], text: "创建新结点 s。此时先让 s->next 指向原来的 p->next，也就是 30。" },
        { title: "接入链表", nodes: ["head", "10", "20", "30", "NULL"], active: [1, 2], text: "再令 p->next = s。顺序不能反，否则会丢失 30 之后的链。" },
        { title: "删除结点的本质", nodes: ["head", "10", "30", "NULL"], active: [1, 2], text: "删除 20 时，让前驱 10 的 next 越过 20 指向 30，然后释放 20。" }
      ]
    },
    stack: {
      kind: "stack",
      scenario: "用栈检查表达式 a[(b+c)*d] 的括号是否匹配。",
      invariant: "栈顶保存最近尚未匹配的左括号；右括号必须和栈顶配对。",
      steps: [
        { title: "读到 [", input: "a[(b+c)*d]", cursor: 1, stack: ["["], active: [0], text: "左括号入栈，等待后续右括号匹配。" },
        { title: "读到 (", input: "a[(b+c)*d]", cursor: 2, stack: ["[", "("], active: [1], text: "新的左括号继续入栈。栈顶现在是最近的未匹配括号 (。" },
        { title: "读到 )", input: "a[(b+c)*d]", cursor: 6, stack: ["["], active: [0], text: "右括号 ) 必须匹配栈顶 (。匹配成功后弹出。" },
        { title: "读到 ]", input: "a[(b+c)*d]", cursor: 9, stack: [], active: [], text: "右括号 ] 匹配栈顶 [。最终栈为空，说明所有括号都被匹配。" }
      ]
    },
    queue: {
      kind: "queue",
      scenario: "循环队列容量为 6，观察 rear 和 front 如何取模移动。",
      invariant: "front 指向队头元素；rear 指向下一个可写位置；牺牲一个单元区分队空和队满。",
      steps: [
        { title: "初始入队", cells: [10, 20, 30, "_", "_", "_"], front: 0, rear: 3, active: [0, 1, 2], text: "元素从 rear 写入，rear 每次加 1 并对 capacity 取模。" },
        { title: "出队两次", cells: ["_", "_", 30, "_", "_", "_"], front: 2, rear: 3, active: [2], text: "出队只移动 front，不移动数组中的所有元素，所以是 O(1)。" },
        { title: "尾部继续入队", cells: ["_", "_", 30, 40, 50, "_"], front: 2, rear: 5, active: [3, 4], text: "rear 继续向后写入，空出来的前两个位置暂时不搬移。" },
        { title: "rear 回绕", cells: [70, "_", 30, 40, 50, 60], front: 2, rear: 1, active: [5, 0], text: "写到数组末尾后 rear 回到 0，这就是循环队列避免整体搬移的关键。" }
      ]
    },
    string: {
      kind: "kmp",
      scenario: "在文本 ababcabcacbab 中查找模式 abcac，观察失配时模式串如何回退。",
      invariant: "KMP 的文本指针 i 不回退；next 数组告诉 j 应该回到哪个前后缀长度。",
      steps: [
        { title: "开始比较", textChars: "ababcabcacbab", pattern: "abcac", i: 2, j: 0, offset: 2, next: [0, 0, 0, 1, 0], text: "尝试从文本下标 2 开始匹配，a 与 a 成功。" },
        { title: "连续匹配", textChars: "ababcabcacbab", pattern: "abcac", i: 5, j: 3, offset: 2, next: [0, 0, 0, 1, 0], text: "abc 已经匹配。此时 j=3，表示模式串前三个字符已经确认。" },
        { title: "失配回退", textChars: "ababcabcacbab", pattern: "abcac", i: 6, j: 1, offset: 5, next: [0, 0, 0, 1, 0], text: "失配时 i 不回退，j 根据 next[j-1] 回到 1，复用已知前后缀。" },
        { title: "找到模式串", textChars: "ababcabcacbab", pattern: "abcac", i: 9, j: 4, offset: 5, next: [0, 0, 0, 1, 0], text: "从下标 5 开始的 abcac 完整匹配，返回位置 5。" }
      ]
    },
    tree: {
      kind: "tree",
      scenario: "对二叉树执行前序遍历，理解递归为什么天然适合树。",
      invariant: "每个子树仍然是一棵二叉树；遍历规则对根、左子树、右子树递归适用。",
      steps: [
        { title: "访问根 A", active: ["A"], visited: ["A"], text: "前序遍历规则是根、左、右。先访问根结点 A。" },
        { title: "进入左子树 B", active: ["B"], visited: ["A", "B"], text: "对左子树重复同样规则，访问 B。" },
        { title: "访问 B 的孩子", active: ["D", "E"], visited: ["A", "B", "D", "E"], text: "左子树处理完 D，再处理右孩子 E。" },
        { title: "进入右子树 C", active: ["C", "F"], visited: ["A", "B", "D", "E", "C", "F"], text: "最后处理 A 的右子树 C，再访问 C 的右孩子 F。" }
      ]
    },
    bst: {
      kind: "rotation",
      scenario: "AVL 插入 30、20、10 后出现 LL 失衡，观察右旋如何恢复高度。",
      invariant: "AVL 要求每个结点左右子树高度差不超过 1；旋转只改变局部父子关系，不破坏中序有序。",
      steps: [
        { title: "插入 30", nodes: [{ id: "30", x: 50, y: 15 }], active: ["30"], text: "第一 个关键字成为根结点。" },
        { title: "插入 20", nodes: [{ id: "30", x: 50, y: 15 }, { id: "20", x: 32, y: 45, parent: "30" }], active: ["20"], text: "20 小于 30，插入到左子树。此时仍然平衡。" },
        { title: "插入 10 后失衡", nodes: [{ id: "30", x: 50, y: 15 }, { id: "20", x: 32, y: 45, parent: "30" }, { id: "10", x: 18, y: 75, parent: "20" }], active: ["30"], text: "30 的左子树高度比右子树高 2，这是 LL 型失衡。" },
        { title: "对 30 右旋", nodes: [{ id: "20", x: 50, y: 15 }, { id: "10", x: 32, y: 45, parent: "20" }, { id: "30", x: 68, y: 45, parent: "20" }], active: ["20"], text: "20 成为新的局部根，10 和 30 分别成为左右孩子，中序序列仍是 10,20,30。" }
      ]
    },
    heap: {
      kind: "heap",
      scenario: "在最小堆中插入 3，观察上滤如何维护堆序性质。",
      invariant: "堆是完全二叉树，数组下标 i 的父结点是 (i-1)/2；每个父结点不大于孩子。",
      steps: [
        { title: "插入到数组末尾", values: [7, 12, 28, 18, 35, 3], active: [5], text: "新元素先放在完全二叉树的最后一个位置，保证形状仍是完全二叉树。" },
        { title: "与父结点比较", values: [7, 12, 3, 18, 35, 28], active: [2, 5], text: "3 小于父结点 28，交换。数组中交换两个位置，树形关系由下标决定。" },
        { title: "继续上滤到根", values: [3, 12, 7, 18, 35, 28], active: [0, 2], text: "3 继续小于父结点 7，再交换到根。此时每个父结点都不大于孩子。" }
      ]
    },
    graph: {
      kind: "graph",
      scenario: "从顶点 A 开始执行 BFS，观察队列如何按层扩展。",
      invariant: "BFS 队列中保存已经发现但邻接点尚未全部处理的顶点。",
      steps: [
        { title: "A 入队", activeNodes: ["A"], visited: ["A"], queue: ["A"], activeEdges: [], text: "从 A 出发，先标记 A 并入队。" },
        { title: "扩展 A", activeNodes: ["B", "C"], visited: ["A", "B", "C"], queue: ["B", "C"], activeEdges: ["A-B", "A-C"], text: "A 出队，发现 B 和 C，它们的距离都是 1。" },
        { title: "扩展 B", activeNodes: ["D"], visited: ["A", "B", "C", "D"], queue: ["C", "D"], activeEdges: ["B-D"], text: "B 出队，发现 D。队列保证先处理距离更近的 C。" },
        { title: "完成遍历", activeNodes: ["E"], visited: ["A", "B", "C", "D", "E"], queue: [], activeEdges: ["C-E"], text: "所有可达顶点都被访问，BFS 访问顺序体现层次。" }
      ]
    },
    path: {
      kind: "path",
      scenario: "Dijkstra 从 A 出发，观察 dist 数组如何通过松弛变小。",
      invariant: "每轮选择 dist 最小的未确定顶点；一旦确定，该顶点最短距离不再改变。",
      steps: [
        { title: "初始化", activeNodes: ["A"], settled: [], dist: { A: 0, B: "∞", C: "∞", D: "∞", E: "∞" }, activeEdges: [], text: "源点 A 的距离为 0，其余未知为无穷大。" },
        { title: "确定 A 并松弛", activeNodes: ["B", "C"], settled: ["A"], dist: { A: 0, B: 10, C: 3, D: "∞", E: "∞" }, activeEdges: ["A-B", "A-C"], text: "通过 A 可以到达 B 和 C，更新 dist[B]=10，dist[C]=3。" },
        { title: "选择 C", activeNodes: ["B", "E"], settled: ["A", "C"], dist: { A: 0, B: 7, C: 3, D: 11, E: 5 }, activeEdges: ["C-B", "C-E"], text: "未确定顶点中 C 最近。经 C 到 B 的距离 3+4=7，比 10 更短。" },
        { title: "继续确定最短路", activeNodes: ["E", "B"], settled: ["A", "C", "E", "B"], dist: { A: 0, B: 7, C: 3, D: 9, E: 5 }, activeEdges: ["B-D"], text: "每次选择当前最小 dist 的未确定顶点，最终得到从 A 到各点的最短距离。" }
      ]
    },
    hash: {
      kind: "search",
      scenario: "先看二分查找的边界收缩，再看哈希表线性探测如何处理冲突。",
      invariant: "二分查找依赖有序数组；线性探测查找必须沿插入时同一条探测序列前进。",
      steps: [
        { title: "二分：检查中点", array: [3, 8, 12, 19, 24, 31, 44], low: 0, mid: 3, high: 6, target: 24, text: "mid=3，对应 19。目标 24 更大，因此左边界移动到 mid+1。" },
        { title: "二分：缩小区间", array: [3, 8, 12, 19, 24, 31, 44], low: 4, mid: 5, high: 6, target: 24, text: "现在只需在下标 4 到 6 中查找。31 大于 24，右边界左移。" },
        { title: "二分：找到目标", array: [3, 8, 12, 19, 24, 31, 44], low: 4, mid: 4, high: 4, target: 24, text: "mid=4，找到目标。二分的高效来自每轮排除一半。" },
        { title: "哈希：线性探测", buckets: [22, "", 13, 46, "", 30, 41, "", 53, "", 1], active: [2, 3], target: 46, text: "查找 46 从 hash(46)=2 开始。2 号槽被 13 占用，继续探测到 3 号槽找到 46。" }
      ]
    },
    sort_simple: {
      kind: "sort",
      scenario: "对同一组数据观察插入、选择、冒泡三种简单排序的关键动作差异。",
      invariant: "简单排序都在原数组中逐步减少无序关系，但它们移动元素的方式不同：插入维护有序前缀，选择固定最小值位置，冒泡通过相邻交换推进最大值。",
      steps: [
        { title: "插入排序：取出 key", values: [29, 10, 14, 37, 14, 3], active: [1], sorted: 1, text: "已排序前缀是 [29]。插入排序取出 key=10，准备把它插入前缀中的正确位置。" },
        { title: "插入排序：移动并插入", values: [10, 29, 14, 37, 14, 3], active: [0, 1], sorted: 2, text: "29 > 10，所以 29 后移，10 放到下标 0。插入排序的移动是为了维护有序前缀。" },
        { title: "选择排序：选择最小值", values: [3, 10, 14, 37, 14, 29], active: [0, 5], sorted: 1, text: "选择排序在未排序区间中找到最小值 3，并与区间首元素交换。它每轮只确定一个最终位置。" },
        { title: "冒泡排序：相邻交换", values: [10, 14, 29, 14, 3, 37], active: [4, 5], sorted: 0, text: "冒泡排序只比较相邻元素，逆序就交换。一趟扫描后，最大值 37 被推到末尾。" },
        { title: "三者对比", values: [3, 10, 14, 14, 29, 37], active: [0, 5], sorted: 6, text: "三种算法最终都得到有序序列，但比较次数、移动次数和稳定性不同。" }
      ]
    },
    sort_fast: {
      kind: "sort",
      scenario: "比较快速排序、归并排序和堆排序的核心状态变化。",
      invariant: "高效排序都把 O(n^2) 的无效比较压缩掉：快排靠划分，归并靠有序子段合并，堆排序靠堆序性质反复选出最大值。",
      steps: [
        { title: "快速排序：选择枢轴", values: [38, 27, 43, 3, 9, 82, 10], active: [6], pivot: 10, text: "快排选末尾 10 作为 pivot，扫描数组，把不大于 pivot 的元素放到左侧。" },
        { title: "快速排序：枢轴归位", values: [3, 9, 10, 38, 27, 82, 43], active: [2], pivot: 10, text: "划分结束后，10 的最终位置已经确定，左右两侧再递归排序。" },
        { title: "归并排序：两个有序段", values: [3, 27, 38, 43, 9, 10, 82], active: [0, 4], sorted: 4, text: "归并排序先把区间拆到足够小，再得到两个有序段：[3,27,38,43] 和 [9,10,82]。" },
        { title: "归并排序：线性合并", values: [3, 9, 10, 27, 38, 43, 82], active: [1, 2, 3], sorted: 7, text: "合并两个有序段时，每次取较小者放入辅助数组，整个合并过程是 O(n)。" },
        { title: "堆排序：堆顶最大值归位", values: [3, 9, 10, 27, 38, 43, 82], active: [6], sorted: 7, text: "堆排序先建最大堆，再不断把堆顶最大值交换到末尾，末尾有序区逐步扩大。" }
      ]
    },
    radix: {
      kind: "counting",
      scenario: "比较计数排序、桶排序和基数排序为什么可以不靠元素两两比较。",
      invariant: "线性时间排序用关键字范围、分布或位数换取速度；它们必须满足数据范围或分布前提，并通常需要额外空间。",
      steps: [
        { title: "计数排序：统计次数", input: [4, 2, 2, 8, 3, 3, 1], counts: { 1: 1, 2: 2, 3: 2, 4: 1, 8: 1 }, output: [], active: ["2", "3"], text: "计数排序扫描原数组，记录每个关键字出现多少次，适合关键字范围较小的整数。" },
        { title: "计数排序：稳定放置", input: [4, 2, 2, 8, 3, 3, 1], counts: { 1: 0, 2: 1, 3: 3, 4: 5, 8: 6 }, output: [1, 2, 2, 3, 3, 4, 8], active: ["output"], text: "通过前缀和确定位置，从后向前填入输出数组，可以保持稳定性。" },
        { title: "桶排序：按区间分桶", input: [0.12, 0.42, 0.31, 0.78, 0.66, 0.25], buckets: [["0.12", "0.25"], ["0.31", "0.42"], ["0.66", "0.78"]], output: [], active: ["bucket"], text: "桶排序按数据分布把元素放进不同区间的桶里，桶内再排序或插入。" },
        { title: "基数排序：个位稳定分配", input: [170, 45, 75, 90, 802, 24, 2, 66], buckets: [["170", "90"], ["802", "2"], ["24"], ["45", "75"], ["66"]], output: [170, 90, 802, 2, 24, 45, 75, 66], active: ["bucket"], text: "基数排序按位处理。先按个位稳定分配，再按十位、百位重复。" },
        { title: "基数排序：多轮后有序", input: [170, 45, 75, 90, 802, 24, 2, 66], counts: { ones: "完成", tens: "完成", hundreds: "完成" }, output: [2, 24, 45, 66, 75, 90, 170, 802], active: ["output"], text: "每一轮按位排序都必须稳定，低位顺序才能被高位排序正确保留。" }
      ]
    },
    review: {
      kind: "review",
      scenario: "把学生记录查询系统分解为结构选择：数组保存记录，哈希表按学号查找，排序生成排名。",
      invariant: "先识别高频操作，再选择结构；每个结构只承担它擅长的职责。",
      steps: [
        { title: "识别数据对象", blocks: ["Student 记录", "id/name/score", "操作：查询、插入、排名"], active: [0], text: "先定义记录和字段，不急着写代码。" },
        { title: "选择存储结构", blocks: ["顺序表保存全部记录", "哈希表 id -> 下标", "排序生成成绩榜"], active: [0, 1], text: "顺序表便于遍历和排序，哈希表让按学号查询接近 O(1)。" },
        { title: "维护一致性", blocks: ["add_student", "更新 list", "更新 hash index"], active: [1, 2], text: "插入记录时必须同时维护顺序表和哈希索引，否则查询结果会失效。" },
        { title: "验证方案", blocks: ["边界测试", "复杂度说明", "LLM 生成反例"], active: [0, 1, 2], text: "综合设计的质量来自正确性、复杂度、接口清晰度和测试证据。" }
      ]
    }
  };
  const demo = demos[week.visual] || demos.array;
  return { ...common, ...demo };
}

function answersContent(week) {
  return `
# ${weekName(week)} ${week.title} 参考答案

> 参考答案用于校准思路，不要求学生逐字一致。程序题重点看接口、边界、复杂度说明和测试证据。

1. 本周组织形式应围绕“元素如何保存关系”回答。例如：${week.adt}
2. 图示答案应包含元素、位置或指针关系，并标出操作会改变的位置。若是树或图，需要标出根、孩子、顶点、边或邻接关系。
3. 函数原型示例可以写成 \`int operation(Structure *s, ElemType value);\`。关键是区分输入、输出、结构指针和失败返回值。
4. \`${week.operations[0][0]}\` 的关键动作是：${week.operations[0][1]}。复杂度通常为 ${week.operations[0][2]}，需要结合输入规模解释。
5. 初始化函数负责建立合法空状态；核心修改函数负责改变结构字段；输出函数用于观察状态，不应替代测试。
6. 合格的边界测试至少包含一个失败路径。例如空结构删除应返回失败，查找不存在元素应返回 -1 或 NULL，容量不足应触发扩容或拒绝插入。
7. 易错点通常出现在下标移动、指针重连、递归出口、容量判断或循环终止条件。答案需要指出具体行并说明后果。
8. 对比要落到操作代价上。例如数组随机访问快但中间插入慢；链表插入删除局部快但定位慢；树能降低有序查找高度；哈希用空间换平均常数查找。
9. 适合场景必须匹配操作频率。如果问题大量执行本周结构擅长的操作，就有选择理由；若只是一次性扫描，普通数组可能更简单。
10. 最小测试集建议包含：空结构、单元素、多元素、目标在首部/中部/尾部、目标不存在、重复值、容量边界或极端规模。
11. 评价 LLM 输出时要看它是否给出可执行测试、是否区分未定义行为和逻辑错误、是否遗漏边界。
12. 头文件分离版本应把结构定义、函数声明、实现和 main 拆开；若模型改变了返回约定或隐藏了必要字段，需要指出。

## 评分建议

- 概念表达：20%
- C 语言接口与实现：35%
- 复杂度分析：20%
- 测试与边界：15%
- LLM 使用反思：10%
`;
}

function extensionsContent(week) {
  return `
# ${weekName(week)} ${week.title} 拓展问题

这些问题不提供标准答案，适合课堂讨论、读书报告或小组展示。

1. 如果输入规模扩大 100 倍，本周结构的主要瓶颈会出现在哪里？
2. 本周结构在真实系统中的一个应用是什么？请说明数据对象、关系和高频操作。
3. 如果要把示例代码写成可复用库，哪些字段应该隐藏，哪些函数应该暴露？
4. 对本周主题，代码大模型最可能生成哪类看似正确但实际危险的代码？
5. 能否设计一种混合结构，让本周结构和另一种结构互补？请说明维护成本。
6. 如果把元素类型从 int 改为结构体记录，比较函数、复制函数和内存管理需要怎样变化？
`;
}

function interactiveHtml(week) {
  const demo = demoFor(week);
  const demoJson = JSON.stringify(demo, null, 2).replace(/</g, "\\u003c");
  const demoTopicList = week.topics.map((t) => `<span>${t}</span>`).join("");
  const demoOperationCards = week.operations.map((op) => `
          <button class="op-card" data-name="${op[0]}" data-action="${op[1]}" data-cost="${op[2]}">
            <strong>${op[0]}</strong>
            <small>${op[2]}</small>
          </button>`).join("");
  return `
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${weekName(week)} ${week.title}</title>
  <link rel="stylesheet" href="../assets/course-visualizer.css">
</head>
<body>
  <header class="week-hero">
    <nav class="week-nav">
      <a href="../onlineweb/">课程首页</a>
      <a href="lecture.md">讲义</a>
      <a href="${cFileFor(week)}">C 代码</a>
      <a href="exercises.md">练习</a>
    </nav>
    <div class="week-hero-grid">
      <div>
        <p class="eyebrow">${weekName(week)} 交互演示</p>
        <h1>${week.title}</h1>
        <p class="theme">${week.theme}</p>
        <div class="topics">${demoTopicList}</div>
      </div>
      <aside class="principle-panel">
        <strong>本演示要验证的结构不变量</strong>
        <p>${demo.invariant}</p>
      </aside>
    </div>
  </header>
  <main class="learning-shell">
    <section class="demo-stage">
      <div class="stage-header">
        <div>
          <p class="eyebrow">Scenario</p>
          <h2>${demo.scenario}</h2>
        </div>
        <div class="stage-actions">
          <button id="prevStep" class="icon-btn" aria-label="上一步" title="上一步">←</button>
          <button id="playSteps" class="primary-btn">自动播放</button>
          <button id="nextStep" class="icon-btn" aria-label="下一步" title="下一步">→</button>
          <button id="resetSteps" class="ghost-btn">重置</button>
        </div>
      </div>
      <div class="progress-track" aria-hidden="true"><span id="progressBar"></span></div>
      <div class="stage-grid">
        <div id="visualCanvas" class="visual-canvas"></div>
        <aside class="step-panel">
          <p id="stepCounter" class="step-counter"></p>
          <h3 id="stepTitle"></h3>
          <p id="stepText"></p>
          <div id="stepMeta" class="step-meta"></div>
        </aside>
      </div>
    </section>

    <section class="operation-section">
      <div>
        <p class="eyebrow">Operations</p>
        <h2>关键操作不是口号，而是状态变化</h2>
      </div>
      <div class="ops">${demoOperationCards}
      </div>
      <div id="operationExplain" class="operation-explain">点击一个操作，观察它对应的组织方式和复杂度。</div>
    </section>

    <section class="resource-strip">
      <a href="lecture.md">课程讲义</a>
      <a href="${cFileFor(week)}">C 示例代码</a>
      <a href="exercises.md">练习题</a>
      <a href="answers.md">参考答案</a>
      <a href="extensions.md">拓展问题</a>
    </section>
  </main>
  <script>
    window.COURSE_DEMO = ${demoJson};
  </script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
  <script src="../assets/course-visualizer.js"></script>
</body>
</html>
`;
  const topicList = week.topics.map((t) => `<span>${t}</span>`).join("");
  const operationCards = week.operations.map((op) => `
        <button class="op-card" data-name="${op[0]}" data-action="${op[1]}" data-cost="${op[2]}">
          <strong>${op[0]}</strong>
          <small>${op[2]}</small>
        </button>`).join("");

  return `
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${weekName(week)} ${week.title}</title>
  <style>
    :root {
      color-scheme: light;
      --ink: #1f2933;
      --muted: #667085;
      --line: #d6dce5;
      --panel: #ffffff;
      --soft: #f3f7f4;
      --accent: #1f8a70;
      --accent-2: #c2410c;
      --accent-3: #334e68;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Microsoft YaHei", "Noto Sans SC", Arial, sans-serif;
      color: var(--ink);
      background: #f7f8fa;
      line-height: 1.6;
    }
    header {
      padding: 28px clamp(18px, 5vw, 64px);
      background: #ffffff;
      border-bottom: 1px solid var(--line);
    }
    .eyebrow { margin: 0 0 8px; color: var(--accent); font-weight: 700; }
    h1 { margin: 0; font-size: clamp(28px, 4vw, 44px); letter-spacing: 0; }
    .theme { max-width: 900px; color: var(--muted); font-size: 17px; }
    main { max-width: 1180px; margin: 0 auto; padding: 28px 18px 48px; }
    .layout { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 18px; align-items: start; }
    section {
      background: var(--panel);
      border: 1px solid var(--line);
      border-radius: 8px;
      padding: 18px;
    }
    h2 { margin: 0 0 12px; font-size: 22px; }
    .topics { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
    .topics span {
      border: 1px solid #bfd7d2;
      color: #116149;
      background: #eef8f4;
      border-radius: 999px;
      padding: 5px 10px;
      font-size: 14px;
    }
    .visual {
      min-height: 300px;
      display: grid;
      place-items: center;
      background: linear-gradient(180deg, #fbfcfd 0%, #eef4f1 100%);
      border: 1px solid var(--line);
      border-radius: 8px;
      overflow: hidden;
      position: relative;
    }
    .canvas { width: min(720px, 100%); min-height: 260px; padding: 16px; display: grid; place-items: center; }
    .array-row, .stack-col, .queue-row, .hash-grid, .sort-row { display: flex; gap: 8px; align-items: end; justify-content: center; flex-wrap: wrap; }
    .cell, .node, .bar, .bucket {
      min-width: 44px;
      min-height: 44px;
      display: grid;
      place-items: center;
      border-radius: 8px;
      border: 2px solid #7aa89d;
      background: #ffffff;
      font-weight: 700;
      transition: transform .25s ease, background .25s ease, border-color .25s ease;
    }
    .cell.active, .node.active, .bar.active, .bucket.active { background: #fde68a; border-color: var(--accent-2); transform: translateY(-6px); }
    .node { border-radius: 999px; position: relative; }
    .link { width: 34px; height: 2px; background: #7993a6; align-self: center; }
    .stack-col { flex-direction: column-reverse; min-height: 210px; align-items: center; }
    .queue-row .cell:first-child { border-color: var(--accent-2); }
    .tree-layer { display: flex; gap: 18px; justify-content: center; margin: 10px 0; }
    .graph-svg { width: 100%; height: 260px; }
    .graph-edge { stroke: #8da2b5; stroke-width: 2; }
    .graph-node { fill: #fff; stroke: #1f8a70; stroke-width: 3; }
    .graph-node.active { fill: #fde68a; stroke: #c2410c; }
    .graph-label { font-weight: 700; text-anchor: middle; dominant-baseline: middle; fill: #1f2933; }
    .bar { width: 34px; min-width: 34px; align-items: end; color: #ffffff; background: #2f6f88; border-color: #2f6f88; padding-bottom: 6px; }
    .ops { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; }
    button {
      font: inherit;
      cursor: pointer;
      border-radius: 8px;
      border: 1px solid var(--line);
      background: #fff;
      color: var(--ink);
    }
    .op-card { padding: 12px; text-align: left; min-height: 84px; }
    .op-card strong, .op-card small { display: block; }
    .op-card small { color: var(--muted); margin-top: 6px; }
    .controls { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px; }
    .controls button {
      padding: 9px 12px;
      background: #1f8a70;
      color: #fff;
      border-color: #1f8a70;
      font-weight: 700;
    }
    .controls button.secondary { background: #fff; color: var(--accent-3); border-color: var(--line); }
    .explain { margin-top: 12px; padding: 12px; border-left: 4px solid var(--accent); background: #f4faf8; min-height: 76px; }
    .links { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 14px; }
    .links a {
      color: #0f766e;
      text-decoration: none;
      border-bottom: 1px solid currentColor;
      font-weight: 700;
    }
    @media (max-width: 860px) {
      .layout { grid-template-columns: 1fr; }
      .cell, .node, .bucket { min-width: 38px; min-height: 38px; }
    }
  </style>
</head>
<body>
  <header>
    <p class="eyebrow">${weekName(week)} 交互演示</p>
    <h1>${week.title}</h1>
    <p class="theme">${week.theme}</p>
    <div class="topics">${topicList}</div>
  </header>
  <main>
    <div class="layout">
      <section>
        <h2>结构可视化</h2>
        <div class="visual">
          <div id="canvas" class="canvas"></div>
        </div>
        <div class="controls">
          <button id="stepBtn">执行一步</button>
          <button id="resetBtn" class="secondary">重置</button>
        </div>
        <div id="explain" class="explain"></div>
      </section>
      <section>
        <h2>关键操作</h2>
        <div class="ops">${operationCards}
        </div>
        <div class="links">
          <a href="lecture.md">课程讲义</a>
          <a href="${cFileFor(week)}">C 示例代码</a>
          <a href="exercises.md">练习题</a>
          <a href="answers.md">参考答案</a>
          <a href="extensions.md">拓展问题</a>
        </div>
      </section>
    </div>
  </main>
  <script>
    const kind = "${week.visual}";
    const steps = [
      "观察结构的初始状态，先说清元素之间的关系。",
      "执行核心操作，注意哪些位置、指针或辅助数组发生变化。",
      "分析本步操作的时间复杂度，并说明输入规模。",
      "检查边界条件：空结构、满结构、查找失败或重复元素。"
    ];
    let step = 0;
    const canvas = document.getElementById("canvas");
    const explain = document.getElementById("explain");

    function cell(value, active) {
      return '<div class="cell' + (active ? ' active' : '') + '">' + value + '</div>';
    }
    function node(value, active) {
      return '<div class="node' + (active ? ' active' : '') + '">' + value + '</div>';
    }
    function bar(value, active) {
      const h = 42 + value * 8;
      return '<div class="bar' + (active ? ' active' : '') + '" style="height:' + h + 'px">' + value + '</div>';
    }
    function renderGraph(active) {
      const nodes = [
        [70, 60, 'A'], [190, 48, 'B'], [315, 88, 'C'], [125, 178, 'D'], [275, 196, 'E']
      ];
      const edges = [[0,1],[0,3],[1,2],[1,3],[2,4],[3,4]];
      let svg = '<svg class="graph-svg" viewBox="0 0 380 250">';
      edges.forEach(([a,b]) => {
        svg += '<line class="graph-edge" x1="' + nodes[a][0] + '" y1="' + nodes[a][1] + '" x2="' + nodes[b][0] + '" y2="' + nodes[b][1] + '"></line>';
      });
      nodes.forEach((n, i) => {
        svg += '<circle class="graph-node' + (i === active ? ' active' : '') + '" cx="' + n[0] + '" cy="' + n[1] + '" r="24"></circle>';
        svg += '<text class="graph-label" x="' + n[0] + '" y="' + n[1] + '">' + n[2] + '</text>';
      });
      return svg + '</svg>';
    }
    function render() {
      const active = step % 5;
      if (kind === "list") {
        canvas.innerHTML = '<div class="array-row">' + node('head', active === 0) + '<div class="link"></div>' + node('10', active === 1) + '<div class="link"></div>' + node('20', active === 2) + '<div class="link"></div>' + node('30', active === 3) + '</div>';
      } else if (kind === "stack") {
        canvas.innerHTML = '<div class="stack-col">' + [10,20,30,40].map((v,i) => cell(v, i === active)).join('') + '</div>';
      } else if (kind === "queue") {
        canvas.innerHTML = '<div class="queue-row">' + [20,30,40,50,60].map((v,i) => cell(v, i === active)).join('') + '</div>';
      } else if (kind === "tree" || kind === "bst" || kind === "heap") {
        canvas.innerHTML = '<div><div class="tree-layer">' + node(kind === "heap" ? '3' : 'A', active === 0) + '</div><div class="tree-layer">' + node(kind === "heap" ? '7' : 'B', active === 1) + node(kind === "heap" ? '12' : 'C', active === 2) + '</div><div class="tree-layer">' + node(kind === "heap" ? '18' : 'D', active === 3) + node(kind === "heap" ? '28' : 'E', active === 4) + '</div></div>';
      } else if (kind === "graph" || kind === "path") {
        canvas.innerHTML = renderGraph(active);
      } else if (kind.indexOf("sort") >= 0 || kind === "radix") {
        canvas.innerHTML = '<div class="sort-row">' + [5,2,8,3,7,1,6].map((v,i) => bar(v, i === active)).join('') + '</div>';
      } else if (kind === "hash") {
        canvas.innerHTML = '<div class="hash-grid">' + [22,'',13,46,'',30,41,'',53,'',1].map((v,i) => '<div class="bucket' + (i === active ? ' active' : '') + '">' + v + '</div>').join('') + '</div>';
      } else if (kind === "string") {
        canvas.innerHTML = '<div><div class="array-row">' + ['a','b','a','b','c','a','b','c','a','c'].map((v,i) => cell(v, i === active + 2)).join('') + '</div><p style="text-align:center;color:#667085">模式串：abcac，观察失配时 j 如何回退</p></div>';
      } else if (kind === "complexity") {
        canvas.innerHTML = '<div class="sort-row">' + [1,2,4,8,16,32].map((v,i) => bar(Math.min(8, i + 1), i === active)).join('') + '</div>';
      } else {
        canvas.innerHTML = '<div class="array-row">' + [10,20,30,40,50].map((v,i) => cell(v, i === active)).join('') + '</div>';
      }
      explain.textContent = steps[step % steps.length];
    }
    document.getElementById("stepBtn").addEventListener("click", () => { step += 1; render(); });
    document.getElementById("resetBtn").addEventListener("click", () => { step = 0; render(); });
    document.querySelectorAll(".op-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        explain.textContent = btn.dataset.name + "： " + btn.dataset.action + "。复杂度：" + btn.dataset.cost + "。";
      });
    });
    render();
  </script>
</body>
</html>
`;
}

function readmeContent() {
  const table = weeks.map((w) => `| ${weekName(w)} | [${w.title}](${w.folder}/lecture.md) | ${w.theme} |`).join("\n");
  return `
# 数据结构 C 语言版课程辅助材料

本项目是一套面向高水平大学本科生的《数据结构》课程辅助材料，按 16 周设计，每周 2 节课。内容参考常见《数据结构教程》第 3 版同等难度，重点放在数据的组织形式、操作过程、复杂度分析和 C 语言实现。

## 在线预览

- 本地入口：[onlineweb/index.html](onlineweb/index.html)
- GitHub Pages 入口：\`https://<你的用户名或组织名>.github.io/<仓库名>/\`
- 课程网站入口文件：[index.html](index.html) 会自动跳转到 \`onlineweb/\`，方便 GitHub Pages 直接访问。

本项目的 Pages 工作流会发布一个包含 \`onlineweb/\`、16 个 week 文件夹、\`test/\` 和 README 的静态站点。这样在线网站中的“讲义、演示、代码、练习”链接都能正常打开。

## 项目亮点

- 16 周完整课程路径，覆盖线性结构、树、图、查找、排序和算法分析。
- 每周包含系统讲义、C 示例代码、练习题、参考答案、拓展问题和交互演示页。
- 示例代码围绕 C 语言数组、结构体、指针、动态内存和模块化接口展开。
- \`test/\` 中包含随堂测试、课后作业、阶段任务和 LLM 辅助学习模板。
- \`interactive.html\` 和 \`onlineweb/\` 使用 GSAP 驱动步骤动画，不依赖前端构建工具，可直接托管到 GitHub Pages。

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

\`\`\`text
.
├── .github/workflows/pages.yml
├── .gitignore
├── .nojekyll
├── index.html
├── README.md
├── LICENSE
├── assets/
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
\`\`\`

每个 week 文件夹包含：

- \`lecture.md\`：系统讲义，包含概念、C 表示、关键操作、复杂度和授课建议。
- \`examples/*.c\`：可编译运行的 C 语言示例代码。
- \`exercises.md\`：基础理解、代码阅读、分析设计和 LLM 辅助任务。
- \`answers.md\`：参考答案和评分建议。
- \`extensions.md\`：不带标准答案的拓展讨论问题。
- \`interactive.html\`：独立交互演示页，可直接用浏览器打开。

\`assets/\` 存放公共可视化样式和脚本。\`test/\` 包含随堂测试、课后作业、LLM/代码大模型辅助学习任务和参考答案。\`onlineweb/\` 是课程总网站，用于集中浏览周次、查看知识图谱、做练习和记录学习进度。\`.github/workflows/pages.yml\` 用于自动部署 GitHub Pages，\`tools/generate_course.mjs\` 用于重新生成课程材料。

## 16 周安排

| 周次 | 主题 | 教学重点 |
|---|---|---|
${table}

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

1. 从 \`onlineweb/index.html\` 进入课程网站。
2. 每周先读 \`lecture.md\`，再运行 \`examples/*.c\`。
3. 完成 \`exercises.md\` 后对照 \`answers.md\` 自查。
4. 用 \`interactive.html\` 做课堂演示或学生自学演示。
5. 使用 \`test/\` 中的测验和作业组织随堂测试、课后作业或复习。

如需整体重新生成课程材料，可在安装 Node.js 的环境中运行：

\`\`\`bash
node tools/generate_course.mjs
\`\`\`

## GitHub Pages 发布

本仓库已经包含 GitHub Actions 工作流 [pages.yml](.github/workflows/pages.yml)，适合把课程网站托管到 GitHub Pages。

推荐发布流程：

1. 在 GitHub 创建仓库并推送本项目到 \`main\` 或 \`master\` 分支。
2. 进入仓库 \`Settings -> Pages\`。
3. 在 \`Build and deployment\` 中把 \`Source\` 设置为 \`GitHub Actions\`。
4. 回到 \`Actions\` 页面，等待 \`Deploy course website to GitHub Pages\` 工作流完成。
5. 打开 \`https://<你的用户名或组织名>.github.io/<仓库名>/\`，页面会自动进入 \`onlineweb/\`。

这里选择发布“准备后的仓库静态内容”，而不是只发布 \`onlineweb/\`。原因是 \`onlineweb\` 中的周次卡片会链接到 \`week*/lecture.md\`、\`week*/examples/*.c\` 和 \`test/\`，如果只发布 \`onlineweb/\`，这些学习材料会在 Pages 上断链。

首次部署如果在 \`Configure Pages\` 步骤看到 \`Get Pages site failed\` 或 \`HttpError: Not Found\`，通常表示 GitHub 还没有为这个仓库创建 Pages site。处理方式是重新进入 \`Settings -> Pages\`，确认 \`Source\` 已保存为 \`GitHub Actions\`，然后回到 \`Actions\` 手动重新运行工作流。如果仓库是私有仓库，还需要确认当前 GitHub 计划支持私有仓库 Pages。

## C 语言编译建议

示例代码均按 C11 风格编写。单个示例可用如下命令编译：

\`\`\`bash
gcc -std=c11 -Wall -Wextra week02_sequential_list/examples/seq_list.c -o seq_list
\`\`\`

Windows PowerShell 中也可把输出文件命名为 \`.exe\`：

\`\`\`powershell
gcc -std=c11 -Wall -Wextra week02_sequential_list/examples/seq_list.c -o seq_list.exe
./seq_list.exe
\`\`\`

## GitHub 项目维护建议

- 课程内容修改后，优先直接编辑对应 week 文件夹；如果要批量重建，再修改 [tools/generate_course.mjs](tools/generate_course.mjs)。
- 公开发布前，请检查 [LICENSE](LICENSE) 是否符合你的课程材料授权预期。
- 建议在每次开课前创建一个 release，例如 \`2026-fall\`，便于学生使用稳定版本。
- 如果学生也通过 GitHub 提交作业，建议另建作业模板仓库，不要直接把学生作业提交到本课程资料仓库。

## 教师二次开发建议

- 如果要压缩课程，可合并 Week 10 与 Week 11，或合并 Week 13 到 Week 15。
- 如果要增强实践，可把 Week 16 扩展为两周课程设计。
- 如果学生 C 基础较弱，可在 Week 1 增加指针、数组、结构体和动态内存复习。
- 如果要更贴近 AI 时代，可要求每次作业提交一段 LLM 使用记录：提问、模型回答、人工核查、最终修正。
`;
}

function testsReadme() {
  return `
# test 测试题库说明

本文件夹用于随堂测试、课后作业和阶段复习。题目设计强调三个能力：

1. 说清数据结构的组织形式。
2. 写出 C 语言关键操作。
3. 借助 LLM 或代码大模型更快发现错误，但最终由学生自己验证正确性。

建议使用方式：

- 随堂测试：每次 10 到 15 分钟，关注概念和小规模手算。
- 课后作业：每 2 到 3 周一次，关注代码实现和复杂度分析。
- LLM 任务：要求学生提交提示词、模型输出摘要、人工验证结果和最终代码修改。
- 阶段测试：线性结构、树图结构、查找排序、综合设计各一次。
`;
}

function inClassQuizzes() {
  const items = weeks.map((w) => `
## ${weekName(w)} ${w.title}

1. 用一句话说明本周结构的组织形式。
2. 写出 \`${w.operations[0][0]}\` 的复杂度，并说明输入规模。
3. 给出一个本周结构最容易出错的边界情况。
4. 阅读本周示例代码，指出一个返回失败的条件。
5. 让 LLM 解释本周一个函数时，你最需要核查哪一点？
`).join("\n");
  return `
# 随堂测试题

每周题目可任选 3 到 5 题，要求学生在纸面或在线平台快速完成。

${items}
`;
}

function homeworkSets() {
  return `
# 课后作业题

## 作业 1：线性结构实现

覆盖 Week 2 到 Week 6。

1. 实现一个动态顺序表，支持插入、删除、查找、扩容和打印。
2. 实现一个带头结点单链表，支持尾插、按值删除和逆置。
3. 使用栈完成括号匹配，并扩展到表达式中的单引号和双引号忽略规则。
4. 使用循环队列模拟打印任务队列，要求能处理队满和队空。
5. 实现 KMP，并输出 next 数组。

提交要求：C 源码、测试截图或输出、每个核心操作的复杂度说明。

## 作业 2：树与图

覆盖 Week 7 到 Week 11。

1. 输入前序序列和空标记，构造二叉树并输出三种遍历。
2. 实现 BST 的查找、插入、删除，并说明删除双孩子结点时的处理策略。
3. 在 AVL 插入代码中打印每次旋转类型。
4. 用邻接表实现无向图，输出 DFS、BFS 和连通分量数量。
5. 在一个带权有向图上实现 Dijkstra，并输出最短路径。

提交要求：至少 5 组测试，其中 1 组要覆盖极端或退化情况。

## 作业 3：查找与排序

覆盖 Week 12 到 Week 15。

1. 实现线性探测哈希表，统计不同装载因子下的平均探测次数。
2. 比较插入排序、选择排序和冒泡排序在近有序数组上的表现。
3. 实现快速排序随机选枢轴版本，并和固定枢轴版本比较。
4. 实现稳定归并排序，证明它为什么稳定。
5. 对学生成绩 0 到 100 使用计数排序，并说明它的适用前提。

提交要求：实验数据表、复杂度分析、对至少一个反常结果的解释。

## 作业 4：综合课程设计

设计一个“课程学习记录系统”或“校园路径查询系统”。要求：

1. 至少使用两类数据结构，例如哈希表 + 顺序表，图 + 优先队列，树 + 队列。
2. 写出 ADT 接口和模块划分。
3. 给出不少于 8 个测试用例。
4. 给出关键操作复杂度。
5. 提交一页 LLM 使用记录，说明模型帮助了什么、哪里必须人工修正。
`;
}

function llmTasks() {
  return `
# LLM 与代码大模型辅助学习任务

## 基本原则

- 先自己画结构图，再让模型解释或检查。
- 先写接口和测试，再让模型补全实现。
- 模型输出必须经过编译、运行、边界测试和复杂度核查。
- 禁止提交无法解释的代码。

## 推荐提示词模板

### 解释类

\`\`\`text
我正在学习 C 语言数据结构中的【主题】。请用“数据对象、数据关系、基本操作、复杂度、常见错误”五个部分解释它，并给一个 5 个元素以内的小例子。
\`\`\`

### 代码审查类

\`\`\`text
请审查下面的 C 代码，重点检查：数组越界、空指针、内存泄漏、循环终止、复杂度是否符合预期。请给出最小反例测试。
\`\`\`

### 测试生成类

\`\`\`text
请为这个 ADT 操作生成测试用例，要求覆盖：空结构、单元素、多元素、目标不存在、重复元素、容量边界和随机压力测试。
\`\`\`

### 复杂度追问类

\`\`\`text
你刚才给出的复杂度结论中，输入规模 n 指什么？是否还存在 m、V、E、k 等其他规模变量？请逐行解释循环或递归次数。
\`\`\`

## 学生提交记录模板

| 项目 | 内容 |
|---|---|
| 我的问题 |  |
| 模型回答摘要 |  |
| 我验证了什么 |  |
| 发现的问题 |  |
| 最终修改 |  |
| 我学到的结构性知识 |  |

## 反思问题

1. 模型是否默认了某种存储结构？这个默认是否合理？
2. 模型是否遗漏了释放内存或错误返回值？
3. 模型给出的复杂度是否说明了输入规模？
4. 模型是否生成了足够强的测试，还是只覆盖了正常情况？
5. 你能否用自己的话解释最终代码每个字段的含义？
`;
}

function answerKey() {
  return `
# 测试题参考答案与评分尺度

## 随堂测试

随堂测试以短答案为主，参考尺度如下：

- 组织形式说清楚：2 分。
- 操作过程能落到字段或位置变化：3 分。
- 复杂度结论正确且说明输入规模：3 分。
- 边界情况合理：2 分。

## 编程作业

- 正确性：40%。核心操作能通过正常和边界测试。
- 结构设计：20%。ADT 接口清晰，模块职责明确。
- 复杂度分析：15%。能说明关键操作的时间和空间代价。
- C 语言质量：15%。处理内存、越界、错误返回和命名。
- LLM 使用记录：10%。能说明模型输出如何被验证和修正。

## 常见扣分点

1. 只给代码，不说明结构组织形式。
2. 操作函数没有失败返回值。
3. 动态内存申请后没有释放。
4. 把平均复杂度写成最坏复杂度，或没有说明前提。
5. 直接粘贴 LLM 代码，无法解释字段和边界。
`;
}

function onlineIndex() {
  return `
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>数据结构 C 语言版课程网站</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="site-header">
    <nav>
      <strong>数据结构 C 语言版</strong>
      <div>
        <a href="#weeks">周次</a>
        <a href="#lab">交互实验</a>
        <a href="#practice">练习</a>
      </div>
    </nav>
    <section class="hero">
      <div>
        <p class="eyebrow">16 周本科课程辅助材料</p>
        <h1>程序 = 数据结构 + 算法</h1>
        <p>数据结构描述物质如何组成，算法描述行动如何发生。进入课程后，学生将从 C 语言表示、关键操作、复杂度分析和测试验证四条线同时学习。</p>
        <div class="hero-actions">
          <a class="primary" href="#weeks">开始学习</a>
          <a class="secondary" href="../README.md">查看课程 README</a>
        </div>
      </div>
      <div class="hero-board" aria-label="课程知识结构示意">
        <div class="board-row"><span>线性结构</span><b>顺序表</b><b>链表</b><b>栈</b><b>队列</b></div>
        <div class="board-row"><span>非线性结构</span><b>树</b><b>堆</b><b>图</b></div>
        <div class="board-row"><span>查找结构</span><b>二分</b><b>哈希</b><b>BST</b><b>AVL</b></div>
        <div class="board-row"><span>排序算法</span><b>插入</b><b>快排</b><b>归并</b><b>基数</b></div>
      </div>
    </section>
  </header>

  <main>
    <section class="band summary">
      <article>
        <strong id="progressText">0/16</strong>
        <span>已标记完成周次</span>
      </article>
      <article>
        <strong>64+</strong>
        <span>讲义、练习、答案、拓展与示例代码文件</span>
      </article>
      <article>
        <strong>C11</strong>
        <span>全部示例围绕 C 语言结构体、指针和数组</span>
      </article>
    </section>

    <section id="weeks" class="content-section">
      <div class="section-title">
        <p class="eyebrow">Course Map</p>
        <h2>16 周学习路径</h2>
      </div>
      <div class="toolbar">
        <input id="searchInput" type="search" placeholder="搜索：链表、图、排序、哈希...">
        <select id="topicFilter">
          <option value="all">全部主题</option>
          <option value="线性">线性结构</option>
          <option value="树">树与堆</option>
          <option value="图">图</option>
          <option value="查找">查找</option>
          <option value="排序">排序</option>
          <option value="算法">算法分析</option>
        </select>
      </div>
      <div id="weekGrid" class="week-grid"></div>
    </section>

    <section id="lab" class="content-section lab-layout">
      <div>
        <p class="eyebrow">Interactive Lab</p>
        <h2>结构操作演示</h2>
        <p class="muted">选择一个结构，逐步观察插入、删除、遍历或排序过程中状态如何变化。</p>
        <div class="segmented" id="labTabs"></div>
      </div>
      <div class="lab-panel">
        <div id="labCanvas" class="lab-canvas"></div>
        <div class="lab-controls">
          <button id="labPrev" aria-label="上一步">←</button>
          <button id="labNext" aria-label="下一步">→</button>
        </div>
        <p id="labExplain"></p>
      </div>
    </section>

    <section id="practice" class="content-section practice-layout">
      <div>
        <p class="eyebrow">Practice</p>
        <h2>自测练习</h2>
        <p class="muted">题目强调概念、操作和复杂度。提交后会给出即时反馈。</p>
      </div>
      <div class="quiz-card">
        <p id="quizTopic" class="eyebrow"></p>
        <h3 id="quizQuestion"></h3>
        <div id="quizOptions" class="quiz-options"></div>
        <p id="quizFeedback"></p>
        <button id="nextQuiz">下一题</button>
      </div>
    </section>
  </main>

  <footer>
    <p>面向 C 语言版数据结构课程。建议与每周 lecture.md、examples/*.c 和 test/ 题库配合使用。</p>
  </footer>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"></script>
  <script src="data.js"></script>
  <script src="app.js"></script>
</body>
</html>
`;
}

function onlineStyles() {
  return `
:root {
  --ink: #1e293b;
  --muted: #64748b;
  --line: #d7dee8;
  --paper: #ffffff;
  --bg: #f6f8f7;
  --green: #1f8a70;
  --green-dark: #0f5f4d;
  --rust: #b45309;
  --blue: #315f7d;
  --soft-green: #ecf7f3;
  --soft-rust: #fff4e6;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: "Microsoft YaHei", "Noto Sans SC", Arial, sans-serif;
  color: var(--ink);
  background: var(--bg);
  line-height: 1.6;
}
a { color: inherit; }
.site-header {
  background:
    linear-gradient(rgba(246, 248, 247, .88), rgba(246, 248, 247, .95)),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='720' viewBox='0 0 1200 720'%3E%3Crect width='1200' height='720' fill='%23f6f8f7'/%3E%3Cg stroke='%239ab7ad' stroke-width='2' opacity='.45'%3E%3Cpath d='M120 160H360V300H120zM460 110H700V250H460zM820 170H1080V330H820zM210 430H480V590H210zM650 410H990V600H650z' fill='none'/%3E%3Cpath d='M360 230H460M700 180H820M300 300L330 430M600 250L720 410M950 330L860 410'/%3E%3C/g%3E%3Cg fill='%231f8a70' opacity='.55'%3E%3Ccircle cx='120' cy='160' r='8'/%3E%3Ccircle cx='360' cy='300' r='8'/%3E%3Ccircle cx='700' cy='250' r='8'/%3E%3Ccircle cx='990' cy='600' r='8'/%3E%3C/g%3E%3C/svg%3E");
  background-size: cover;
  border-bottom: 1px solid var(--line);
}
nav {
  max-width: 1180px;
  margin: 0 auto;
  padding: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}
nav div { display: flex; gap: 16px; flex-wrap: wrap; }
nav a { text-decoration: none; color: var(--muted); font-weight: 700; }
.hero {
  max-width: 1180px;
  min-height: 520px;
  margin: 0 auto;
  padding: 52px 18px 42px;
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 28px;
  align-items: center;
}
.eyebrow {
  margin: 0 0 8px;
  color: var(--green-dark);
  font-weight: 800;
  letter-spacing: 0;
}
h1, h2, h3 { letter-spacing: 0; line-height: 1.2; }
h1 { margin: 0; font-size: clamp(42px, 6vw, 72px); max-width: 720px; }
h2 { margin: 0; font-size: clamp(28px, 4vw, 42px); }
h3 { margin: 0 0 14px; font-size: 22px; }
.hero p:not(.eyebrow) { font-size: 18px; color: #425466; max-width: 720px; }
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 22px; }
.hero-actions a, .quiz-card button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 10px 14px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 800;
  border: 1px solid var(--green);
}
.primary, .quiz-card button { background: var(--green); color: #fff; }
.secondary { color: var(--green-dark); background: #fff; }
.hero-board {
  border: 1px solid var(--line);
  background: rgba(255,255,255,.78);
  border-radius: 8px;
  padding: 18px;
  display: grid;
  gap: 12px;
  box-shadow: 0 18px 45px rgba(31, 41, 55, .08);
}
.board-row {
  display: grid;
  grid-template-columns: 100px repeat(4, minmax(54px, 1fr));
  gap: 8px;
  align-items: center;
}
.board-row span { color: var(--muted); font-size: 14px; }
.board-row b {
  min-height: 44px;
  display: grid;
  place-items: center;
  border: 1px solid #bed7d1;
  background: #fff;
  border-radius: 8px;
  font-size: 14px;
}
main { max-width: 1180px; margin: 0 auto; padding: 0 18px 48px; }
.band {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 18px 0 42px;
}
.summary article, .week-card, .lab-panel, .quiz-card {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 8px;
}
.summary article { padding: 16px; }
.summary strong { display: block; font-size: 28px; color: var(--green-dark); }
.summary span, .muted { color: var(--muted); }
.content-section { margin: 42px 0; }
.section-title { margin-bottom: 16px; }
.toolbar {
  display: flex;
  gap: 10px;
  margin: 16px 0;
  flex-wrap: wrap;
}
input, select {
  min-height: 42px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fff;
  color: var(--ink);
  padding: 0 12px;
  font: inherit;
}
input { flex: 1 1 280px; }
.week-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;
}
.week-card {
  padding: 16px;
  display: grid;
  gap: 12px;
  min-height: 250px;
}
.week-card.done { border-color: #77b7a5; background: #fbfffd; }
.week-card header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 10px;
}
.week-card h3 { font-size: 20px; margin: 0; }
.badge {
  flex: none;
  color: var(--green-dark);
  background: var(--soft-green);
  border: 1px solid #b8d8cf;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 800;
}
.week-card p { margin: 0; color: var(--muted); }
.topic-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.topic-tags span {
  font-size: 12px;
  color: #425466;
  background: #f2f5f7;
  border: 1px solid #e0e6ed;
  border-radius: 999px;
  padding: 3px 7px;
}
.card-links { display: flex; gap: 8px; flex-wrap: wrap; align-self: end; }
.card-links a, .mark-btn {
  border: 1px solid var(--line);
  background: #fff;
  color: var(--blue);
  border-radius: 8px;
  padding: 7px 9px;
  text-decoration: none;
  font-weight: 800;
  font-size: 13px;
}
button { font: inherit; cursor: pointer; }
.mark-btn { color: var(--green-dark); }
.lab-layout, .practice-layout {
  display: grid;
  grid-template-columns: .8fr 1.2fr;
  gap: 18px;
  align-items: start;
}
.segmented { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; }
.segmented button {
  border: 1px solid var(--line);
  background: #fff;
  border-radius: 999px;
  padding: 7px 12px;
  color: var(--ink);
  font-weight: 800;
}
.segmented button.active { background: var(--green); color: #fff; border-color: var(--green); }
.lab-panel { padding: 18px; }
.lab-canvas {
  min-height: 300px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: #f9fbfa;
  display: grid;
  place-items: center;
  overflow: hidden;
}
.lab-controls { display: flex; justify-content: center; gap: 10px; margin-top: 12px; }
.lab-controls button {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid var(--green);
  background: #fff;
  color: var(--green-dark);
  font-weight: 900;
}
#labExplain { margin: 12px 0 0; color: var(--muted); }
.viz-row { display: flex; gap: 10px; align-items: center; justify-content: center; flex-wrap: wrap; padding: 18px; }
.viz-cell, .viz-node, .viz-bucket, .viz-bar {
  display: grid;
  place-items: center;
  min-width: 48px;
  min-height: 48px;
  border: 2px solid #8db6ac;
  background: #fff;
  border-radius: 8px;
  font-weight: 900;
  transition: transform .2s ease, background .2s ease, border-color .2s ease;
}
.viz-node { border-radius: 999px; }
.viz-active { background: #fde68a; border-color: var(--rust); transform: translateY(-7px); }
.viz-link { width: 36px; height: 2px; background: #8da2b5; }
.viz-stack { display: flex; flex-direction: column-reverse; gap: 8px; min-height: 220px; justify-content: flex-start; }
.viz-bar { min-width: 34px; color: #fff; background: #315f7d; border-color: #315f7d; align-items: end; padding-bottom: 6px; }
.quiz-card { padding: 18px; }
.quiz-options { display: grid; gap: 10px; margin: 16px 0; }
.quiz-options button {
  text-align: left;
  min-height: 44px;
  border-radius: 8px;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink);
  padding: 10px 12px;
}
.quiz-options button.correct { border-color: #1f8a70; background: var(--soft-green); }
.quiz-options button.wrong { border-color: #b45309; background: var(--soft-rust); }
#quizFeedback { min-height: 28px; color: var(--muted); }
footer {
  border-top: 1px solid var(--line);
  padding: 22px 18px;
  color: var(--muted);
  text-align: center;
}
@media (max-width: 860px) {
  .hero, .lab-layout, .practice-layout { grid-template-columns: 1fr; }
  .band { grid-template-columns: 1fr; }
  .board-row { grid-template-columns: 84px repeat(2, minmax(54px, 1fr)); }
}
`;
}

function onlineData() {
  const weekData = weeks.map((w) => ({
    id: w.id,
    folder: `../${w.folder}/`,
    title: w.title,
    shortTitle: w.shortTitle,
    theme: w.theme,
    topics: w.topics,
    codeFile: w.codeFile
  }));
  const quizzes = [
    {
      topic: "复杂度",
      question: "二分查找能达到 O(log n) 的前提是什么？",
      options: ["数据按关键字有序并支持随机访问", "数据必须存储在链表中", "数据元素不能重复", "数组长度必须是 2 的幂"],
      answer: 0,
      explain: "二分查找每轮排除一半，需要有序关系和能直接访问中间位置。"
    },
    {
      topic: "链表",
      question: "单链表在已知前驱结点时插入新结点的复杂度是？",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      answer: 0,
      explain: "只需要修改新结点和前驱结点的 next 指针。"
    },
    {
      topic: "栈",
      question: "括号匹配中遇到右括号时应执行什么操作？",
      options: ["弹出栈顶左括号并检查是否匹配", "把右括号入队", "清空整个栈", "从数组头部删除元素"],
      answer: 0,
      explain: "栈保存最近尚未匹配的左括号。"
    },
    {
      topic: "哈希",
      question: "线性探测哈希表查找失败时，通常遇到什么可以停止？",
      options: ["同一探测序列中的空槽", "任意非空槽", "表中最大关键字", "数组下标为 0 的位置"],
      answer: 0,
      explain: "插入也沿同一探测序列进行，遇到空槽说明该关键字不存在。"
    },
    {
      topic: "排序",
      question: "下列排序通常可以稳定实现的是？",
      options: ["归并排序", "堆排序", "选择排序", "普通快速排序"],
      answer: 0,
      explain: "合并两个有序段时相等元素优先取左段，可以保持相对顺序。"
    },
    {
      topic: "图",
      question: "邻接表遍历一个无向图的 DFS/BFS 复杂度通常写作？",
      options: ["O(V+E)", "O(V^2)", "O(log V)", "O(E^2)"],
      answer: 0,
      explain: "每个顶点和每条边都会被常数次访问。"
    }
  ];
  return `window.COURSE_WEEKS = ${JSON.stringify(weekData, null, 2)};\nwindow.COURSE_QUIZZES = ${JSON.stringify(quizzes, null, 2)};`;
}

function onlineApp() {
  return `
const weeks = window.COURSE_WEEKS;
const quizzes = window.COURSE_QUIZZES;
const doneKey = "ds-course-done-weeks";
let done = new Set(JSON.parse(localStorage.getItem(doneKey) || "[]"));

const grid = document.getElementById("weekGrid");
const searchInput = document.getElementById("searchInput");
const topicFilter = document.getElementById("topicFilter");
const progressText = document.getElementById("progressText");

function saveDone() {
  localStorage.setItem(doneKey, JSON.stringify([...done]));
  progressText.textContent = done.size + "/16";
}

function matchesFilter(week, filter) {
  if (filter === "all") return true;
  const text = [week.title, week.theme, ...week.topics].join(" ");
  return text.includes(filter);
}

function renderWeeks() {
  const q = searchInput.value.trim().toLowerCase();
  const filter = topicFilter.value;
  grid.innerHTML = "";
  weeks
    .filter((week) => matchesFilter(week, filter))
    .filter((week) => {
      const text = [week.title, week.theme, ...week.topics].join(" ").toLowerCase();
      return !q || text.includes(q);
    })
    .forEach((week) => {
      const card = document.createElement("article");
      card.className = "week-card" + (done.has(week.id) ? " done" : "");
      card.innerHTML = \`
        <header>
          <h3>Week \${String(week.id).padStart(2, "0")} \${week.title}</h3>
          <span class="badge">\${week.shortTitle}</span>
        </header>
        <p>\${week.theme}</p>
        <div class="topic-tags">\${week.topics.slice(0, 5).map((t) => "<span>" + t + "</span>").join("")}</div>
        <div class="card-links">
          <a href="\${week.folder}lecture.md">讲义</a>
          <a href="\${week.folder}interactive.html">演示</a>
          <a href="\${week.folder}examples/\${week.codeFile}">代码</a>
          <a href="\${week.folder}exercises.md">练习</a>
          <button class="mark-btn" data-id="\${week.id}">\${done.has(week.id) ? "取消完成" : "标记完成"}</button>
        </div>
      \`;
      grid.appendChild(card);
    });
  if (window.gsap) {
    gsap.fromTo(".week-card", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .35, stagger: .025, ease: "power2.out" });
  }
  document.querySelectorAll(".mark-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      if (done.has(id)) done.delete(id);
      else done.add(id);
      saveDone();
      renderWeeks();
    });
  });
}

searchInput.addEventListener("input", renderWeeks);
topicFilter.addEventListener("change", renderWeeks);
saveDone();
renderWeeks();

const labs = {
  array: {
    label: "顺序表",
    steps: [
      { values: [10, 20, 30, 40], active: 1, text: "按位访问通过下标直接定位，复杂度 O(1)。" },
      { values: [10, 20, "_", 30, 40], active: 2, text: "中间插入前，需要从后向前移动元素。" },
      { values: [10, 20, 25, 30, 40], active: 2, text: "写入新元素后，长度增加。" }
    ]
  },
  list: {
    label: "链表",
    steps: [
      { nodes: ["head", "10", "30"], active: 1, text: "链表通过 next 指针保存线性关系。" },
      { nodes: ["head", "10", "20", "30"], active: 2, text: "已知前驱后，插入只修改两条指针。" },
      { nodes: ["head", "20", "30"], active: 1, text: "删除首元结点需要让头结点越过目标结点。" }
    ]
  },
  stack: {
    label: "栈",
    steps: [
      { values: [10, 20], active: 1, text: "栈只在栈顶操作。" },
      { values: [10, 20, 30], active: 2, text: "push 把元素放到新的栈顶。" },
      { values: [10, 20], active: 1, text: "pop 删除最近进入的元素。" }
    ]
  },
  graph: {
    label: "图",
    steps: [
      { values: ["A", "B", "C", "D"], active: 0, text: "图描述多对多关系，遍历从起点开始。" },
      { values: ["A", "B", "C", "D"], active: 1, text: "BFS 使用队列按层次扩展。" },
      { values: ["A", "B", "C", "D"], active: 3, text: "DFS 使用递归或栈沿路径深入。" }
    ]
  },
  sort: {
    label: "排序",
    steps: [
      { values: [5, 2, 8, 3, 7], active: 1, text: "排序先识别逆序关系。" },
      { values: [2, 5, 8, 3, 7], active: 0, text: "交换或移动元素改变相对位置。" },
      { values: [2, 3, 5, 7, 8], active: 4, text: "最终得到按关键字有序的序列。" }
    ]
  }
};
let currentLab = "array";
let labStep = 0;
const tabs = document.getElementById("labTabs");
const labCanvas = document.getElementById("labCanvas");
const labExplain = document.getElementById("labExplain");

function renderTabs() {
  tabs.innerHTML = "";
  Object.entries(labs).forEach(([key, lab]) => {
    const btn = document.createElement("button");
    btn.textContent = lab.label;
    btn.className = key === currentLab ? "active" : "";
    btn.addEventListener("click", () => {
      currentLab = key;
      labStep = 0;
      renderTabs();
      renderLab();
    });
    tabs.appendChild(btn);
  });
}

function renderLab() {
  const lab = labs[currentLab];
  const state = lab.steps[labStep];
  if (currentLab === "list") {
    labCanvas.innerHTML = '<div class="viz-row">' + state.nodes.map((v, i) => '<div class="viz-node ' + (i === state.active ? 'viz-active' : '') + '">' + v + '</div>' + (i + 1 < state.nodes.length ? '<div class="viz-link"></div>' : '')).join("") + '</div>';
  } else if (currentLab === "stack") {
    labCanvas.innerHTML = '<div class="viz-stack">' + state.values.map((v, i) => '<div class="viz-cell ' + (i === state.active ? 'viz-active' : '') + '">' + v + '</div>').join("") + '</div>';
  } else if (currentLab === "sort") {
    labCanvas.innerHTML = '<div class="viz-row">' + state.values.map((v, i) => '<div class="viz-bar ' + (i === state.active ? 'viz-active' : '') + '" style="height:' + (50 + v * 16) + 'px">' + v + '</div>').join("") + '</div>';
  } else {
    labCanvas.innerHTML = '<div class="viz-row">' + state.values.map((v, i) => '<div class="viz-cell ' + (i === state.active ? 'viz-active' : '') + '">' + v + '</div>').join("") + '</div>';
  }
  labExplain.textContent = state.text;
  if (window.gsap) {
    gsap.fromTo("#labCanvas .viz-cell, #labCanvas .viz-node, #labCanvas .viz-bar", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .32, stagger: .04, ease: "power2.out" });
    gsap.fromTo("#labCanvas .viz-active", { scale: .92 }, { scale: 1, duration: .45, ease: "back.out(1.8)" });
  }
}

document.getElementById("labPrev").addEventListener("click", () => {
  const total = labs[currentLab].steps.length;
  labStep = (labStep - 1 + total) % total;
  renderLab();
});
document.getElementById("labNext").addEventListener("click", () => {
  const total = labs[currentLab].steps.length;
  labStep = (labStep + 1) % total;
  renderLab();
});
renderTabs();
renderLab();

let quizIndex = 0;
const quizTopic = document.getElementById("quizTopic");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");

function renderQuiz() {
  const quiz = quizzes[quizIndex];
  quizTopic.textContent = quiz.topic;
  quizQuestion.textContent = quiz.question;
  quizFeedback.textContent = "";
  quizOptions.innerHTML = "";
  quiz.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", () => {
      [...quizOptions.children].forEach((child, i) => {
        child.disabled = true;
        if (i === quiz.answer) child.classList.add("correct");
      });
      if (index !== quiz.answer) btn.classList.add("wrong");
      quizFeedback.textContent = (index === quiz.answer ? "回答正确。 " : "需要复习。 ") + quiz.explain;
      if (window.gsap) {
        gsap.fromTo(".quiz-card", { x: index === quiz.answer ? 0 : -6 }, { x: 0, duration: .25, ease: "power2.out" });
        gsap.fromTo("#quizFeedback", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .25 });
      }
    });
    quizOptions.appendChild(btn);
  });
}
document.getElementById("nextQuiz").addEventListener("click", () => {
  quizIndex = (quizIndex + 1) % quizzes.length;
  renderQuiz();
});
renderQuiz();
`;
}

function visualizerCss() {
  return `
:root {
  color-scheme: light;
  --ink: #172033;
  --muted: #667085;
  --line: #d7dee8;
  --paper: #ffffff;
  --bg: #f5f7f6;
  --green: #147a63;
  --blue: #315f7d;
  --rust: #b45309;
  --gold: #f3c969;
  --violet: #6d5bd0;
  --soft-green: #eaf7f2;
  --soft-blue: #eef5fb;
  --soft-rust: #fff4e6;
}
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: "Microsoft YaHei", "Noto Sans SC", Arial, sans-serif;
  color: var(--ink);
  background: var(--bg);
  line-height: 1.6;
}
a { color: inherit; }
.week-hero {
  padding: 18px clamp(18px, 4vw, 58px) 32px;
  background:
    linear-gradient(rgba(255,255,255,.92), rgba(255,255,255,.96)),
    radial-gradient(circle at 20% 10%, #d9efe8 0, transparent 32%),
    radial-gradient(circle at 84% 16%, #f8dfb8 0, transparent 28%),
    #fff;
  border-bottom: 1px solid var(--line);
}
.week-nav {
  max-width: 1180px;
  margin: 0 auto 26px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.week-nav a {
  text-decoration: none;
  color: var(--muted);
  font-weight: 800;
  border-bottom: 1px solid transparent;
}
.week-nav a:hover { color: var(--green); border-color: currentColor; }
.week-hero-grid {
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 22px;
  align-items: end;
}
.eyebrow { margin: 0 0 8px; color: var(--green); font-weight: 900; letter-spacing: 0; }
h1, h2, h3 { letter-spacing: 0; line-height: 1.2; }
h1 { margin: 0; font-size: clamp(34px, 5vw, 58px); }
h2 { margin: 0; font-size: clamp(24px, 3vw, 34px); }
h3 { margin: 0; font-size: 22px; }
.theme { max-width: 850px; color: #46566a; font-size: 18px; }
.topics { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.topics span, .step-meta span {
  border: 1px solid #bbd8d0;
  color: #0f5f4d;
  background: var(--soft-green);
  border-radius: 999px;
  padding: 5px 10px;
  font-size: 13px;
  font-weight: 800;
}
.principle-panel, .demo-stage, .operation-section, .resource-strip {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: 0 16px 40px rgba(31, 41, 55, .06);
}
.principle-panel { padding: 18px; }
.principle-panel strong { display: block; margin-bottom: 8px; color: var(--blue); }
.principle-panel p { margin: 0; color: var(--muted); }
.learning-shell { max-width: 1180px; margin: 0 auto; padding: 26px 18px 54px; }
.demo-stage { padding: 18px; }
.stage-header {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: start;
}
.stage-actions { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }
button {
  font: inherit;
  cursor: pointer;
  border-radius: 8px;
  min-height: 40px;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink);
  font-weight: 800;
}
.primary-btn { background: var(--green); color: #fff; border-color: var(--green); padding: 8px 13px; }
.ghost-btn { padding: 8px 13px; color: var(--blue); }
.icon-btn { width: 42px; font-size: 18px; }
.progress-track {
  height: 8px;
  background: #e9eef2;
  border-radius: 999px;
  overflow: hidden;
  margin: 18px 0;
}
.progress-track span { display: block; height: 100%; width: 0; background: linear-gradient(90deg, var(--green), var(--rust)); }
.stage-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 18px;
  align-items: stretch;
}
.visual-canvas {
  min-height: 420px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background:
    linear-gradient(180deg, #fbfcfd, #f1f5f4);
  display: grid;
  place-items: center;
  padding: 18px;
  overflow: hidden;
}
.step-panel {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fbfcfd;
  padding: 18px;
}
.step-counter { margin: 0 0 8px; color: var(--rust); font-weight: 900; }
#stepText { color: #46566a; }
.step-meta { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
.viz-row, .viz-stack, .viz-queue, .viz-buckets, .viz-bars, .viz-blocks {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.viz-stack { min-height: 260px; flex-direction: column-reverse; justify-content: flex-start; }
.viz-cell, .viz-node, .viz-bucket, .viz-token, .viz-count, .viz-block {
  min-width: 54px;
  min-height: 52px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  border: 2px solid #8fb6ac;
  background: #fff;
  color: var(--ink);
  font-weight: 900;
  position: relative;
}
.viz-node { border-radius: 999px; }
.viz-null { color: var(--muted); border-style: dashed; }
.is-active, .is-changed {
  background: #ffefb0 !important;
  border-color: var(--rust) !important;
  box-shadow: 0 8px 18px rgba(180, 83, 9, .18);
}
.is-sorted { background: var(--soft-green); border-color: var(--green); }
.viz-link { width: 34px; height: 2px; background: #8094a8; position: relative; }
.viz-link::after {
  content: "";
  position: absolute;
  right: -1px;
  top: -4px;
  border-left: 8px solid #8094a8;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}
.viz-index { margin-top: 8px; color: var(--muted); font-size: 12px; text-align: center; }
.marker { display: block; margin-top: 4px; color: var(--rust); font-size: 12px; min-height: 18px; }
.queue-wrap, .kmp-wrap, .counting-wrap, .complexity-wrap { width: 100%; display: grid; gap: 18px; }
.queue-cells { display: grid; grid-template-columns: repeat(6, minmax(46px, 1fr)); gap: 10px; }
.queue-labels { display: grid; grid-template-columns: repeat(6, minmax(46px, 1fr)); gap: 10px; color: var(--muted); font-size: 13px; text-align: center; }
.input-line { display: flex; justify-content: center; flex-wrap: wrap; gap: 6px; margin-bottom: 12px; }
.viz-token { min-width: 38px; min-height: 38px; border-color: #bdc9d6; }
.pattern-row { margin-left: var(--offset, 0); }
.next-row, .dist-table, .count-row { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
.viz-count { min-width: 64px; min-height: 44px; font-size: 13px; background: var(--soft-blue); border-color: #a8c2d8; }
.viz-bars { align-items: end; min-height: 260px; }
.viz-bar {
  width: 52px;
  min-height: 34px;
  border-radius: 8px 8px 4px 4px;
  background: var(--blue);
  color: #fff;
  display: grid;
  align-items: end;
  justify-items: center;
  padding-bottom: 8px;
  font-weight: 900;
}
.bar-label { color: var(--muted); font-size: 12px; text-align: center; margin-top: 6px; max-width: 78px; }
.tree-svg, .graph-svg { width: 100%; height: 340px; }
.svg-edge { stroke: #8da2b5; stroke-width: 3; }
.svg-edge.active { stroke: var(--rust); stroke-width: 5; }
.svg-node { fill: #fff; stroke: var(--green); stroke-width: 3; }
.svg-node.active { fill: #ffefb0; stroke: var(--rust); stroke-width: 4; }
.svg-node.settled { fill: var(--soft-green); stroke: var(--green); }
.svg-label { text-anchor: middle; dominant-baseline: middle; font-weight: 900; fill: var(--ink); }
.operation-section { margin-top: 18px; padding: 18px; }
.ops { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 10px; margin-top: 14px; }
.op-card { padding: 12px; text-align: left; min-height: 84px; }
.op-card strong, .op-card small { display: block; }
.op-card small { color: var(--muted); margin-top: 6px; }
.operation-explain {
  margin-top: 14px;
  padding: 13px;
  border-left: 4px solid var(--green);
  background: #f4faf8;
  color: #46566a;
}
.resource-strip {
  margin-top: 18px;
  padding: 14px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.resource-strip a {
  color: var(--blue);
  text-decoration: none;
  border: 1px solid var(--line);
  background: #fff;
  border-radius: 8px;
  padding: 8px 10px;
  font-weight: 900;
}
@media (max-width: 920px) {
  .week-hero-grid, .stage-grid { grid-template-columns: 1fr; }
  .stage-header { flex-direction: column; }
  .visual-canvas { min-height: 360px; }
}
`;
}

function visualizerJs() {
  return `
(function () {
  const demo = window.COURSE_DEMO;
  if (!demo) return;

  const canvas = document.getElementById("visualCanvas");
  const stepTitle = document.getElementById("stepTitle");
  const stepText = document.getElementById("stepText");
  const stepCounter = document.getElementById("stepCounter");
  const stepMeta = document.getElementById("stepMeta");
  const progressBar = document.getElementById("progressBar");
  const opExplain = document.getElementById("operationExplain");
  let index = 0;
  let timer = null;

  function esc(value) {
    return String(value).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[ch]);
  }

  function isActive(active, value) {
    return Array.isArray(active) && active.map(String).includes(String(value));
  }

  function cell(value, active, extra = "") {
    const blank = value === "_" || value === "" || value === null || value === undefined;
    return '<div class="viz-cell ' + (active ? "is-active " : "") + (blank ? "viz-null " : "") + extra + '">' + esc(blank ? "空" : value) + '</div>';
  }

  function renderArray(step) {
    const cells = step.cells.map((v, i) => {
      const marker = step.markers && Object.entries(step.markers).filter(([, pos]) => pos === i).map(([name]) => name).join("/");
      return '<div>' + cell(v, isActive(step.active, i)) + '<div class="viz-index">' + i + '</div><span class="marker">' + (marker || "") + '</span></div>';
    }).join("");
    return '<div><div class="viz-row">' + cells + '</div><div class="step-meta"><span>size=' + step.size + '</span><span>capacity=' + step.capacity + '</span></div></div>';
  }

  function renderList(step) {
    return '<div class="viz-row">' + step.nodes.map((n, i) => {
      const node = '<div class="viz-node ' + (isActive(step.active, i) ? "is-active" : "") + (n === "NULL" ? " viz-null" : "") + '">' + esc(n) + '</div>';
      return node + (i + 1 < step.nodes.length ? '<div class="viz-link"></div>' : "");
    }).join("") + '</div>';
  }

  function renderStack(step) {
    const tokens = step.input ? '<div class="input-line">' + step.input.split("").map((ch, i) => '<div class="viz-token ' + (i === step.cursor ? "is-active" : "") + '">' + esc(ch) + '</div>').join("") + '</div>' : "";
    const stack = '<div class="viz-stack">' + step.stack.map((v, i) => cell(v, isActive(step.active, i))).join("") + '</div>';
    return '<div>' + tokens + stack + '</div>';
  }

  function renderQueue(step) {
    const cells = step.cells.map((v, i) => cell(v, isActive(step.active, i))).join("");
    const labels = step.cells.map((_, i) => {
      const tags = [];
      if (i === step.front) tags.push("front");
      if (i === step.rear) tags.push("rear");
      return '<div>' + tags.join(" / ") + '</div>';
    }).join("");
    return '<div class="queue-wrap"><div class="queue-cells">' + cells + '</div><div class="queue-labels">' + labels + '</div></div>';
  }

  function renderKmp(step) {
    const text = step.textChars.split("").map((ch, i) => '<div class="viz-token ' + (i === step.i ? "is-active" : "") + '">' + esc(ch) + '<span class="marker">' + i + '</span></div>').join("");
    const pattern = step.pattern.split("").map((ch, j) => '<div class="viz-token ' + (j === step.j ? "is-active" : "") + '">' + esc(ch) + '</div>').join("");
    const next = step.next.map((v, i) => '<div class="viz-count">next[' + i + ']=' + v + '</div>').join("");
    return '<div class="kmp-wrap"><div class="input-line">' + text + '</div><div class="input-line pattern-row" style="--offset:' + (step.offset * 44) + 'px">' + pattern + '</div><div class="next-row">' + next + '</div></div>';
  }

  function treeNodes(kind, step) {
    if (kind === "tree") {
      return [
        { id: "A", x: 50, y: 14 },
        { id: "B", x: 30, y: 42, parent: "A" },
        { id: "C", x: 70, y: 42, parent: "A" },
        { id: "D", x: 20, y: 72, parent: "B" },
        { id: "E", x: 40, y: 72, parent: "B" },
        { id: "F", x: 80, y: 72, parent: "C" }
      ];
    }
    if (kind === "heap") {
      const positions = [[50,12],[30,42],[70,42],[20,72],[40,72],[60,72]];
      return step.values.map((v, i) => ({ id: String(v), x: positions[i][0], y: positions[i][1], parentIndex: i === 0 ? -1 : Math.floor((i - 1) / 2), index: i }));
    }
    return step.nodes;
  }

  function renderTreeLike(kind, step) {
    const nodes = treeNodes(kind, step);
    const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
    let svg = '<svg class="tree-svg" viewBox="0 0 100 90" preserveAspectRatio="xMidYMid meet">';
    nodes.forEach((n) => {
      const parent = n.parent || (n.parentIndex >= 0 ? nodes[n.parentIndex].id : null);
      if (parent && byId[parent]) {
        svg += '<line class="svg-edge" x1="' + byId[parent].x + '" y1="' + byId[parent].y + '" x2="' + n.x + '" y2="' + n.y + '"></line>';
      }
    });
    nodes.forEach((n) => {
      const active = isActive(step.active, n.id) || isActive(step.active, n.index);
      const settled = isActive(step.visited, n.id);
      svg += '<circle class="svg-node ' + (active ? "active " : "") + (settled ? "settled" : "") + '" cx="' + n.x + '" cy="' + n.y + '" r="6"></circle>';
      svg += '<text class="svg-label" x="' + n.x + '" y="' + n.y + '">' + esc(n.id) + '</text>';
    });
    svg += '</svg>';
    if (step.visited) svg += '<div class="step-meta"><span>访问序列：' + step.visited.join(" -> ") + '</span></div>';
    return svg;
  }

  function graphModel() {
    const nodes = [
      ["A", 16, 24], ["B", 40, 15], ["C", 42, 54], ["D", 68, 29], ["E", 78, 68]
    ];
    const edges = [["A","B",10],["A","C",3],["B","D",2],["C","B",4],["C","E",2],["C","D",8],["D","E",7],["E","D",9]];
    return { nodes, edges };
  }

  function renderGraph(step, withDist) {
    const model = graphModel();
    const byId = Object.fromEntries(model.nodes.map((n) => [n[0], n]));
    let svg = '<svg class="graph-svg" viewBox="0 0 100 84" preserveAspectRatio="xMidYMid meet">';
    model.edges.forEach(([a, b, w]) => {
      const edgeId = a + "-" + b;
      const active = isActive(step.activeEdges, edgeId);
      svg += '<line class="svg-edge ' + (active ? "active" : "") + '" x1="' + byId[a][1] + '" y1="' + byId[a][2] + '" x2="' + byId[b][1] + '" y2="' + byId[b][2] + '"></line>';
      if (withDist) svg += '<text class="svg-label" x="' + ((byId[a][1] + byId[b][1]) / 2) + '" y="' + ((byId[a][2] + byId[b][2]) / 2 - 2) + '" font-size="4">' + w + '</text>';
    });
    model.nodes.forEach(([id, x, y]) => {
      const active = isActive(step.activeNodes, id);
      const settled = isActive(step.settled || step.visited, id);
      svg += '<circle class="svg-node ' + (active ? "active " : "") + (settled ? "settled" : "") + '" cx="' + x + '" cy="' + y + '" r="6"></circle>';
      svg += '<text class="svg-label" x="' + x + '" y="' + y + '">' + id + '</text>';
    });
    svg += '</svg>';
    const extra = withDist
      ? '<div class="dist-table">' + Object.entries(step.dist).map(([k, v]) => '<div class="viz-count">dist[' + k + ']=' + v + '</div>').join("") + '</div>'
      : '<div class="step-meta"><span>visited: ' + (step.visited || []).join(", ") + '</span><span>queue: ' + (step.queue || []).join(" -> ") + '</span></div>';
    return '<div class="counting-wrap">' + svg + extra + '</div>';
  }

  function renderSearch(step) {
    if (step.buckets) {
      return '<div class="viz-buckets">' + step.buckets.map((v, i) => '<div><div class="viz-bucket ' + (isActive(step.active, i) ? "is-active" : "") + '">' + esc(v === "" ? "空" : v) + '</div><div class="viz-index">' + i + '</div></div>').join("") + '</div>';
    }
    return '<div class="viz-row">' + step.array.map((v, i) => {
      const tags = [];
      if (i === step.low) tags.push("low");
      if (i === step.mid) tags.push("mid");
      if (i === step.high) tags.push("high");
      return '<div>' + cell(v, i === step.mid || v === step.target) + '<span class="marker">' + tags.join("/") + '</span></div>';
    }).join("") + '</div>';
  }

  function renderSort(step) {
    const max = Math.max(...step.values);
    return '<div class="viz-bars">' + step.values.map((v, i) => {
      const h = 54 + Math.round((v / max) * 190);
      const cls = (isActive(step.active, i) ? "is-active " : "") + (i < (step.sorted || 0) ? "is-sorted " : "");
      const pivot = step.pivot === v ? '<div class="bar-label">pivot</div>' : '<div class="bar-label">' + i + '</div>';
      return '<div><div class="viz-bar ' + cls + '" style="height:' + h + 'px">' + v + '</div>' + pivot + '</div>';
    }).join("") + '</div>';
  }

  function renderCounting(step) {
    const input = '<div class="viz-row">' + step.input.map((v) => cell(v, false)).join("") + '</div>';
    const buckets = step.buckets
      ? '<div class="count-row">' + step.buckets.map((bucket, i) => '<div class="viz-count ' + (isActive(step.active, "bucket") ? "is-active" : "") + '">桶 ' + i + '<br>' + bucket.map(esc).join(", ") + '</div>').join("") + '</div>'
      : "";
    const counts = step.counts
      ? '<div class="count-row">' + Object.entries(step.counts).map(([k, v]) => '<div class="viz-count ' + (isActive(step.active, k) ? "is-active" : "") + '">' + k + ': ' + v + '</div>').join("") + '</div>'
      : "";
    const output = step.output && step.output.length ? '<div class="viz-row">' + step.output.map((v) => cell(v, true)).join("") + '</div>' : '<div class="viz-row">' + cell("输出数组待填充", false) + '</div>';
    return '<div class="counting-wrap">' + input + counts + buckets + output + '</div>';
  }

  function renderComplexity(step) {
    const max = Math.max(...step.values.map(([, v]) => v));
    return '<div class="complexity-wrap"><div class="viz-bars">' + step.values.map(([label, value]) => {
      const h = 42 + Math.round((value / max) * 220);
      return '<div><div class="viz-bar ' + (isActive(step.active, label) ? "is-active" : "") + '" style="height:' + h + 'px">' + value + '</div><div class="bar-label">' + esc(label) + '</div></div>';
    }).join("") + '</div><div class="step-meta"><span>n=' + step.n + '</span></div></div>';
  }

  function renderReview(step) {
    return '<div class="viz-blocks">' + step.blocks.map((b, i) => '<div class="viz-block ' + (isActive(step.active, i) ? "is-active" : "") + '">' + esc(b) + '</div>').join('<div class="viz-link"></div>') + '</div>';
  }

  function renderVisual(step) {
    switch (demo.kind) {
      case "complexity": return renderComplexity(step);
      case "array": return renderArray(step);
      case "list": return renderList(step);
      case "stack": return renderStack(step);
      case "queue": return renderQueue(step);
      case "kmp": return renderKmp(step);
      case "tree": return renderTreeLike("tree", step);
      case "rotation": return renderTreeLike("rotation", step);
      case "heap": return renderTreeLike("heap", step);
      case "graph": return renderGraph(step, false);
      case "path": return renderGraph(step, true);
      case "search": return renderSearch(step);
      case "sort": return renderSort(step);
      case "counting": return renderCounting(step);
      case "review": return renderReview(step);
      default: return renderArray(step);
    }
  }

  function animate() {
    if (!window.gsap) return;
    gsap.fromTo(canvas.querySelectorAll(".viz-cell,.viz-node,.viz-token,.viz-bucket,.viz-count,.viz-block,.viz-bar,.svg-node"),
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: .36, stagger: .025, ease: "power2.out" }
    );
    gsap.fromTo(canvas.querySelectorAll(".is-active,.svg-node.active,.svg-edge.active"),
      { scale: .92 },
      { scale: 1, duration: .48, ease: "back.out(1.8)", transformOrigin: "center" }
    );
  }

  function render() {
    const step = demo.steps[index];
    canvas.innerHTML = renderVisual(step);
    stepCounter.textContent = "Step " + (index + 1) + " / " + demo.steps.length;
    stepTitle.textContent = step.title;
    stepText.textContent = step.text;
    stepMeta.innerHTML = '<span>' + demo.shortTitle + '</span><span>' + demo.kind + '</span>';
    progressBar.style.width = ((index + 1) / demo.steps.length * 100) + "%";
    animate();
  }

  function next() { index = (index + 1) % demo.steps.length; render(); }
  function prev() { index = (index - 1 + demo.steps.length) % demo.steps.length; render(); }
  function reset() { index = 0; render(); }
  function play() {
    if (timer) {
      clearInterval(timer);
      timer = null;
      document.getElementById("playSteps").textContent = "自动播放";
      return;
    }
    document.getElementById("playSteps").textContent = "暂停";
    timer = setInterval(next, 1800);
  }

  document.getElementById("nextStep").addEventListener("click", next);
  document.getElementById("prevStep").addEventListener("click", prev);
  document.getElementById("resetSteps").addEventListener("click", reset);
  document.getElementById("playSteps").addEventListener("click", play);
  document.querySelectorAll(".op-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      opExplain.textContent = btn.dataset.name + "： " + btn.dataset.action + "。复杂度：" + btn.dataset.cost + "。";
      if (window.gsap) gsap.fromTo(opExplain, { x: -8, opacity: .65 }, { x: 0, opacity: 1, duration: .25 });
    });
  });
  render();
})();
`;
}

function rootIndexContent() {
  return `
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0; url=onlineweb/">
  <title>数据结构 C 语言版课程</title>
  <link rel="canonical" href="onlineweb/">
  <style>
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      font-family: "Microsoft YaHei", "Noto Sans SC", Arial, sans-serif;
      color: #1e293b;
      background: #f6f8f7;
    }
    main {
      max-width: 680px;
      padding: 32px;
      text-align: center;
    }
    a {
      color: #0f766e;
      font-weight: 700;
    }
  </style>
</head>
<body>
  <main>
    <h1>数据结构 C 语言版课程</h1>
    <p>正在进入课程网站。如果浏览器没有自动跳转，请打开 <a href="onlineweb/">onlineweb/</a>。</p>
  </main>
</body>
</html>
`;
}

function pagesWorkflowContent() {
  return `
name: Deploy course website to GitHub Pages

on:
  push:
    branches:
      - main
      - master
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Configure Pages
        uses: actions/configure-pages@v6

      - name: Prepare static site
        shell: bash
        run: |
          rm -rf _site
          mkdir -p _site
          cp -R index.html README.md assets onlineweb test tools week* _site/
          if [ -f LICENSE ]; then cp LICENSE _site/; fi
          touch _site/.nojekyll

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v5
        with:
          path: _site
          include-hidden-files: true

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
`;
}

function gitignoreContent() {
  return `
# C build artifacts
*.exe
*.out
*.o
*.obj
*.dll
*.so
*.dylib
a.out

# Generated site artifact used by GitHub Pages workflow
_site/
verification_screenshots/

# Editor and OS files
.DS_Store
Thumbs.db
.vscode/
.idea/
`;
}

function generate() {
  writeFile("index.html", rootIndexContent());
  writeFile(".gitignore", gitignoreContent());
  writeFile(".nojekyll", "");
  writeFile(".github/workflows/pages.yml", pagesWorkflowContent());
  writeFile("assets/course-visualizer.css", visualizerCss());
  writeFile("assets/course-visualizer.js", visualizerJs());
  writeFile("README.md", readmeContent());
  weeks.forEach((week, index) => {
    const prev = weeks[index - 1];
    const next = weeks[index + 1];
    const base = week.folder;
    writeFile(`${base}/lecture.md`, lectureContent(week, prev, next));
    writeFile(`${base}/exercises.md`, exercisesContent(week));
    writeFile(`${base}/answers.md`, answersContent(week));
    writeFile(`${base}/extensions.md`, extensionsContent(week));
    writeFile(`${base}/interactive.html`, interactiveHtml(week));
    writeFile(`${base}/examples/${week.codeFile}`, annotateCCode(week, codeSamples[week.codeFile]));
  });
  writeFile("test/README.md", testsReadme());
  writeFile("test/in_class_quizzes.md", inClassQuizzes());
  writeFile("test/homework_sets.md", homeworkSets());
  writeFile("test/llm_code_model_tasks.md", llmTasks());
  writeFile("test/answer_key.md", answerKey());
  writeFile("onlineweb/index.html", onlineIndex());
  writeFile("onlineweb/styles.css", onlineStyles());
  writeFile("onlineweb/data.js", onlineData());
  writeFile("onlineweb/app.js", onlineApp());
}

generate();
console.log(`Generated ${weeks.length} weeks, test bank, and online website in ${root}`);
