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
    const tl = gsap.timeline();
    tl.fromTo(canvas.querySelectorAll(".svg-edge,.viz-link"),
      { opacity: 0, scaleX: .65 },
      { opacity: 1, scaleX: 1, duration: .28, stagger: .02, ease: "power2.out", transformOrigin: "left center" }
    );
    tl.fromTo(canvas.querySelectorAll(".viz-cell,.viz-node,.viz-token,.viz-bucket,.viz-count,.viz-block,.viz-bar,.svg-node"),
      { opacity: 0, y: 14, scale: .96 },
      { opacity: 1, y: 0, scale: 1, duration: .42, stagger: .028, ease: "power3.out" },
      "-=.12"
    );
    tl.fromTo(canvas.querySelectorAll(".is-active,.svg-node.active,.svg-edge.active"),
      { scale: .9, filter: "brightness(1.08)" },
      { scale: 1, filter: "brightness(1)", duration: .55, ease: "back.out(1.9)", transformOrigin: "center" },
      "-=.18"
    );
  }

  function render() {
    const step = demo.steps[index];
    canvas.innerHTML = renderVisual(step);
    stepCounter.textContent = "Step " + (index + 1) + " / " + demo.steps.length;
    stepTitle.textContent = step.title;
    stepText.textContent = step.text;
    stepMeta.innerHTML = '<span>' + demo.shortTitle + '</span><span>' + demo.kind + '</span>';
    const progress = ((index + 1) / demo.steps.length * 100) + "%";
    if (window.gsap) gsap.to(progressBar, { width: progress, duration: .34, ease: "power2.out" });
    else progressBar.style.width = progress;
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

