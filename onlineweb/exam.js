const exams = {
  "midterm": {
    "title": "期中模拟卷 A",
    "scope": "Week 01-08",
    "questions": [
      {
        "topic": "课程观念",
        "q": "“程序 = 数据结构 + 算法”中，数据结构最直接回答的问题是什么？",
        "options": [
          "数据对象如何组织关系",
          "CPU 如何执行指令",
          "语法如何缩进",
          "编译器如何优化"
        ],
        "answer": 0,
        "explain": "数据结构描述对象及其关系的组织形式。"
      },
      {
        "topic": "复杂度",
        "q": "二分查找每轮排除一半元素，其时间复杂度通常是？",
        "options": [
          "O(1)",
          "O(log n)",
          "O(n)",
          "O(n log n)"
        ],
        "answer": 1,
        "explain": "规模按 1/2 缩小，轮数为 log n。"
      },
      {
        "topic": "顺序表",
        "q": "顺序表中间插入元素时，为什么要从后向前移动？",
        "options": [
          "避免覆盖尚未移动的元素",
          "减少容量",
          "让元素自动排序",
          "释放内存"
        ],
        "answer": 0,
        "explain": "从前向后移动会覆盖后续原值。"
      },
      {
        "topic": "链表",
        "q": "单链表已知前驱结点 p 后插入 s，正确顺序是？",
        "options": [
          "s->next=p->next; p->next=s",
          "p->next=s; s->next=p->next",
          "free(p); p=s",
          "s=p->next; p=NULL"
        ],
        "answer": 0,
        "explain": "先接住后继，再让前驱指向新结点。"
      },
      {
        "topic": "栈",
        "q": "括号匹配中，栈保存的是什么？",
        "options": [
          "最近尚未匹配的左括号",
          "所有右括号",
          "表达式结果",
          "字符串长度"
        ],
        "answer": 0,
        "explain": "LIFO 对应最近未完成任务。"
      },
      {
        "topic": "循环队列",
        "q": "牺牲一个单元的循环队列中，队满条件是？",
        "options": [
          "front == rear",
          "(rear + 1) % capacity == front",
          "rear == capacity",
          "front == 0"
        ],
        "answer": 1,
        "explain": "front==rear 表示队空，队满用 rear 下一个位置等于 front。"
      },
      {
        "topic": "KMP",
        "q": "KMP 的关键优势是？",
        "options": [
          "文本指针 i 不回退",
          "每次都重新比较",
          "不需要模式串",
          "只能匹配单字符"
        ],
        "answer": 0,
        "explain": "next 数组复用已匹配前后缀信息。"
      },
      {
        "topic": "二叉树",
        "q": "前序遍历的顺序是？",
        "options": [
          "根-左-右",
          "左-根-右",
          "左-右-根",
          "右-根-左"
        ],
        "answer": 0,
        "explain": "前序先访问根，再遍历左右子树。"
      },
      {
        "topic": "AVL",
        "q": "AVL 旋转的目标是什么？",
        "options": [
          "恢复局部高度平衡且保持中序有序",
          "把所有结点变成叶子",
          "删除重复关键字",
          "让根最大"
        ],
        "answer": 0,
        "explain": "旋转是局部调整，不破坏 BST 中序有序。"
      },
      {
        "topic": "AI 审查",
        "q": "LLM 生成链表删除代码时，最应该首先检查什么？",
        "options": [
          "是否维护 next 关系和释放目标结点",
          "变量名是否好看",
          "注释是否很长",
          "是否用了递归"
        ],
        "answer": 0,
        "explain": "结构不变量和资源管理是首要风险。"
      }
    ]
  },
  "final": {
    "title": "期末模拟卷 A",
    "scope": "Week 01-16",
    "questions": [
      {
        "topic": "堆",
        "q": "最小堆 pop 后通常需要执行什么操作？",
        "options": [
          "用尾元素替换根并下滤",
          "直接删除任意叶子",
          "整表快速排序",
          "反转数组"
        ],
        "answer": 0,
        "explain": "删除堆顶后用尾元素补根，再下滤恢复堆序。"
      },
      {
        "topic": "图遍历",
        "q": "邻接表 BFS 的复杂度通常是？",
        "options": [
          "O(V+E)",
          "O(V^2E)",
          "O(log V)",
          "O(1)"
        ],
        "answer": 0,
        "explain": "顶点和边各被常数次处理。"
      },
      {
        "topic": "Dijkstra",
        "q": "Dijkstra 算法依赖的关键前提是？",
        "options": [
          "边权非负",
          "图必须是树",
          "所有边权相等",
          "不能有环"
        ],
        "answer": 0,
        "explain": "负权边会破坏贪心确定最短距离的正确性。"
      },
      {
        "topic": "哈希表",
        "q": "开放定址哈希表删除后为什么不能简单置为空？",
        "options": [
          "会截断后续关键字的探测链",
          "会让数组变大",
          "会改变关键字值",
          "会导致排序"
        ],
        "answer": 0,
        "explain": "查找必须沿原探测序列继续越过删除槽。"
      },
      {
        "topic": "排序稳定性",
        "q": "稳定排序要求什么保持不变？",
        "options": [
          "相等关键字记录的相对次序",
          "所有元素地址",
          "比较次数",
          "数组容量"
        ],
        "answer": 0,
        "explain": "稳定性关注相等关键字之间的相对顺序。"
      },
      {
        "topic": "快速排序",
        "q": "快速排序最坏情况可能退化为？",
        "options": [
          "O(n^2)",
          "O(log n)",
          "O(1)",
          "O(n)"
        ],
        "answer": 0,
        "explain": "分区极不平衡时递归深度接近 n。"
      },
      {
        "topic": "归并排序",
        "q": "归并排序的主要额外空间来自哪里？",
        "options": [
          "辅助数组",
          "哈希桶",
          "图邻接表",
          "平衡因子"
        ],
        "answer": 0,
        "explain": "合并有序段通常需要辅助空间。"
      },
      {
        "topic": "计数排序",
        "q": "计数排序适合什么前提？",
        "options": [
          "关键字范围较小且可计数",
          "任意对象都可直接比较",
          "只用于链表",
          "必须是图"
        ],
        "answer": 0,
        "explain": "它用关键字范围换取线性时间。"
      },
      {
        "topic": "综合设计",
        "q": "顺序表 + 哈希索引系统删除记录后最容易漏掉什么？",
        "options": [
          "维护哈希索引中的下标一致性",
          "输出换行",
          "函数命名",
          "注释"
        ],
        "answer": 0,
        "explain": "多个结构组合时，一致性维护是核心风险。"
      },
      {
        "topic": "AI 时代",
        "q": "使用大模型生成数据结构代码后，最可靠的下一步是？",
        "options": [
          "用不变量和测试审查输出",
          "直接提交",
          "删除所有错误处理",
          "只看代码行数"
        ],
        "answer": 0,
        "explain": "理解结构才能驾驭模型输出。"
      }
    ]
  }
};
const select = document.getElementById("examSelect");
const form = document.getElementById("examForm");
const meta = document.getElementById("examMeta");
const result = document.getElementById("examResult");
const key = "ds-course-exam-results";

function renderExam() {
  const exam = exams[select.value];
  meta.innerHTML = '<strong>' + exam.title + '</strong><br><span>范围：' + exam.scope + '，共 ' + exam.questions.length + ' 题。</span>';
  result.className = "exam-result";
  result.innerHTML = "";
  form.innerHTML = exam.questions.map((q, i) => '<article class="question-card"><small>' + q.topic + '</small><h3>' + (i + 1) + '. ' + q.q + '</h3><div class="options">' + q.options.map((opt, j) => '<label><input type="radio" name="q' + i + '" value="' + j + '"> ' + String.fromCharCode(65 + j) + '. ' + opt + '</label>').join("") + '</div></article>').join("");
}

function submitExam() {
  const exam = exams[select.value];
  let score = 0;
  const details = exam.questions.map((q, i) => {
    const picked = form.querySelector('input[name="q' + i + '"]:checked');
    const value = picked ? Number(picked.value) : -1;
    const ok = value === q.answer;
    if (ok) score += 1;
    return { q, value, ok, index: i };
  });
  const percent = Math.round(score / exam.questions.length * 100);
  const saved = JSON.parse(localStorage.getItem(key) || "{}");
  saved[select.value] = { score, total: exam.questions.length, percent, time: new Date().toISOString() };
  localStorage.setItem(key, JSON.stringify(saved));
  result.className = "exam-result show";
  result.innerHTML = '<h2>得分：' + score + '/' + exam.questions.length + '（' + percent + '%）</h2>' +
    details.map((item) => '<p><span class="' + (item.ok ? 'ok' : 'bad') + '">' + (item.ok ? '正确' : '错误') + '</span> 第 ' + (item.index + 1) + ' 题：你的答案 ' + (item.value >= 0 ? String.fromCharCode(65 + item.value) : '未作答') + '，正确答案 ' + String.fromCharCode(65 + item.q.answer) + '。' + item.q.explain + '</p>').join("");
  result.scrollIntoView({ behavior: "smooth", block: "start" });
}

select.addEventListener("change", renderExam);
document.getElementById("submitExam").addEventListener("click", submitExam);
document.getElementById("resetExam").addEventListener("click", renderExam);
renderExam();

