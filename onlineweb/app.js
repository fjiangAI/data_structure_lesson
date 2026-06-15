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

function viewerUrl(path) {
  return "viewer.html?src=" + encodeURIComponent(path);
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
      const lectureUrl = viewerUrl(week.folder + "lecture.md");
      const codeUrl = viewerUrl(week.folder + "examples/" + week.codeFile);
      const exerciseUrl = viewerUrl(week.folder + "exercises.md");
      const card = document.createElement("article");
      card.className = "week-card" + (done.has(week.id) ? " done" : "");
      card.innerHTML = `
        <header>
          <h3>Week ${String(week.id).padStart(2, "0")} ${week.title}</h3>
          <span class="badge">${week.shortTitle}</span>
        </header>
        <p>${week.theme}</p>
        <div class="topic-tags">${week.topics.slice(0, 5).map((t) => "<span>" + t + "</span>").join("")}</div>
        <div class="card-links">
          <a href="${lectureUrl}">讲义</a>
          <a href="${week.folder}interactive.html">演示</a>
          <a href="${codeUrl}">代码</a>
          <a href="${exerciseUrl}">练习</a>
          <button class="mark-btn" data-id="${week.id}">${done.has(week.id) ? "取消完成" : "标记完成"}</button>
        </div>
      `;
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

