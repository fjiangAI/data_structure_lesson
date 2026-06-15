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
  const pseudoCode = document.getElementById("pseudoCode");
  const cTrace = document.getElementById("cTrace");
  const codeTraceTitle = document.getElementById("codeTraceTitle");
  const customPanel = document.getElementById("customPanel");
  const customInput = document.getElementById("customInput");
  const customTarget = document.getElementById("customTarget");
  const applyCustom = document.getElementById("applyCustom");
  const restoreDemo = document.getElementById("restoreDemo");
  const customHint = document.getElementById("customHint");
  const originalSteps = JSON.parse(JSON.stringify(demo.steps || []));
  const originalScenario = demo.scenario;
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

  function svgDefs() {
    return '<defs><marker id="arrowHead" viewBox="0 0 4 4" refX="3.6" refY="2" markerWidth="4" markerHeight="4" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M 0 0 L 4 2 L 0 4 z" fill="#8094a8"></path></marker></defs>';
  }

  function labelLines(label) {
    return String(label).split("\n");
  }

  function svgLabel(cls, label, x, y, lineHeight = 5) {
    const lines = labelLines(label);
    const start = y - ((lines.length - 1) * lineHeight) / 2;
    return '<text class="' + cls + '" x="' + x + '" y="' + start + '">' + lines.map((line, i) => '<tspan x="' + x + '" dy="' + (i === 0 ? 0 : lineHeight) + '">' + esc(line) + '</tspan>').join("") + '</text>';
  }

  function renderEvolution(step) {
    const byId = Object.fromEntries(step.items.map((item) => [item.id, item]));
    let svg = '<svg class="evolution-svg" viewBox="0 0 100 92" preserveAspectRatio="xMidYMid meet">' + svgDefs();
    step.links.forEach(([from, to, kind]) => {
      if (!byId[from] || !byId[to]) return;
      svg += '<line class="evolution-link ' + (kind === "new" ? "new" : "") + '" x1="' + byId[from].x + '" y1="' + byId[from].y + '" x2="' + byId[to].x + '" y2="' + byId[to].y + '"></line>';
    });
    step.items.forEach((item) => {
      const active = isActive(step.active, item.id);
      svg += '<rect class="evolution-card ' + (active ? "active" : "") + '" x="' + (item.x - 8) + '" y="' + (item.y - 6) + '" width="16" height="12" rx="2"></rect>';
      svg += svgLabel("evolution-label", item.label, item.x, item.y);
    });
    svg += '</svg>';
    return '<div class="evolution-wrap">' + svg + '<div class="step-meta"><span>' + esc(step.caption) + '</span></div></div>';
  }

  function renderLinked(step) {
    const byId = Object.fromEntries(step.nodes.map((item) => [item.id, item]));
    let svg = '<svg class="linked-svg" viewBox="0 0 104 92" preserveAspectRatio="xMidYMid meet">' + svgDefs();
    step.links.forEach(([from, to, kind]) => {
      if (!byId[from] || !byId[to]) return;
      svg += '<line class="linked-arrow ' + (kind === "new" ? "new" : "") + '" x1="' + byId[from].x + '" y1="' + byId[from].y + '" x2="' + byId[to].x + '" y2="' + byId[to].y + '"></line>';
    });
    step.nodes.forEach((item) => {
      const active = isActive(step.active, item.id);
      const cls = (active ? "active " : "") + (item.ghost ? "ghost " : "") + (item.null ? "ghost " : "");
      svg += '<rect class="linked-node ' + cls + '" x="' + (item.x - 7.5) + '" y="' + (item.y - 6) + '" width="15" height="12" rx="2"></rect>';
      svg += svgLabel("linked-label", item.label, item.x, item.y);
    });
    svg += '</svg>';
    const meta = step.meta ? '<div class="step-meta">' + step.meta.map((m) => '<span>' + esc(m) + '</span>').join("") + '</div>' : "";
    return '<div class="linked-wrap">' + svg + meta + '</div>';
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

  function renderCircularQueue(step) {
    const n = step.cells.length;
    const slots = step.cells.map((value, i) => {
      const angle = (i * 360 / n) + "deg";
      const blank = value === "_" || value === "";
      return '<div class="ring-slot ' + (isActive(step.active, i) ? "ring-active" : "") + (blank ? " viz-null" : "") + '" style="--angle:' + angle + '">' + esc(blank ? "空" : value) + '</div><div class="ring-index" style="--angle:' + angle + '">' + i + '</div>';
    }).join("");
    const frontAngle = (step.front * 360 / n) + "deg";
    const rearAngle = (step.rear * 360 / n) + "deg";
    return '<div class="queue-wrap"><div class="queue-ring">' + slots +
      '<div class="ring-pointer front" style="--angle:' + frontAngle + '">front</div>' +
      '<div class="ring-pointer rear" style="--angle:' + rearAngle + '">rear</div>' +
      '<div class="ring-op">' + esc(step.op || "") + '</div></div>' +
      '<div class="step-meta"><span>front=' + step.front + '</span><span>rear=' + step.rear + '</span><span>capacity=' + n + '</span></div></div>';
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

  function renderTraversal(step) {
    const tree = renderTreeLike("tree", step);
    const visited = step.visited && step.visited.length
      ? step.visited.map((v) => '<span>' + esc(v) + '</span>').join("")
      : '<span>尚未访问</span>';
    const stack = step.stack && step.stack.length
      ? step.stack.map((v) => '<span>' + esc(v) + '</span>').join("")
      : '<span>调用栈为空</span>';
    return '<div class="traversal-wrap"><div class="traversal-layout"><div>' + tree + '</div><aside class="side-panel"><strong>访问序列</strong><div class="sequence">' + visited + '</div><strong>递归调用栈</strong><div class="call-stack">' + stack + '</div><div class="step-meta"><span>' + esc(step.phase || "traverse") + '</span></div></aside></div></div>';
  }

  function renderAvl(step) {
    const nodes = step.nodes || [];
    const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
    let svg = '<svg class="tree-svg" viewBox="0 0 100 90" preserveAspectRatio="xMidYMid meet">' + svgDefs();
    nodes.forEach((n) => {
      const parent = n.parent;
      if (parent && byId[parent]) {
        svg += '<line class="svg-edge ' + (isActive(step.active, n.id) ? "active" : "") + '" x1="' + byId[parent].x + '" y1="' + byId[parent].y + '" x2="' + n.x + '" y2="' + n.y + '"></line>';
      }
    });
    nodes.forEach((n) => {
      const active = isActive(step.active, n.id);
      svg += '<circle class="svg-node ' + (active ? "active " : "") + '" cx="' + n.x + '" cy="' + n.y + '" r="8"></circle>';
      svg += svgLabel("svg-label", n.label || n.id, n.x, n.y - 1, 4.2);
    });
    svg += '</svg>';
    const meta = step.meta ? '<div class="step-meta">' + step.meta.map((m) => '<span>' + esc(m) + '</span>').join("") + '</div>' : "";
    return '<div class="avl-wrap">' + svg + meta + '</div>';
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
    let svg = '<svg class="graph-svg" viewBox="0 0 100 84" preserveAspectRatio="xMidYMid meet">' + svgDefs();
    model.edges.forEach(([a, b, w]) => {
      const edgeId = a + "-" + b;
      const active = isActive(step.activeEdges, edgeId);
      svg += '<line class="svg-edge ' + (active ? "active" : "") + '" marker-end="url(#arrowHead)" x1="' + byId[a][1] + '" y1="' + byId[a][2] + '" x2="' + byId[b][1] + '" y2="' + byId[b][2] + '"></line>';
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
      ? '<div class="dist-table">' + Object.entries(step.dist).map(([k, v]) => '<div class="viz-count">dist[' + k + ']=' + v + '<br>prev=' + esc((step.prev || {})[k] || "-") + '</div>').join("") + '</div><div class="step-meta"><span>settled: ' + (step.settled || []).join(", ") + '</span><span>frontier: ' + (step.frontier || []).join(", ") + '</span></div>'
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

  function renderSearchLab(step) {
    if (step.mode === "hash") {
      const buckets = '<div class="viz-buckets">' + step.buckets.map((v, i) => {
        const cls = (isActive(step.active, i) ? "is-active " : "") + (isActive(step.probe, i) ? "is-checked " : "");
        return '<div><div class="viz-bucket ' + cls + '">' + esc(v === "" ? "空" : v) + '</div><div class="viz-index">' + i + '</div></div>';
      }).join("") + '</div>';
      const probe = '<div class="sequence">' + (step.probe || []).map((p) => '<span>' + p + '</span>').join("") + '</div>';
      return '<div class="search-wrap"><div class="search-panels"><div>' + buckets + '</div><aside class="side-panel"><strong>目标 key=' + esc(step.target) + '</strong><div class="search-note">' + esc(step.hashValue || "") + '</div><strong>探测路径</strong>' + probe + '</aside></div></div>';
    }
    const cells = step.array.map((v, i) => {
      let cls = "";
      if (isActive(step.discarded, i)) cls += "is-discarded ";
      if (isActive(step.checked, i)) cls += "is-checked ";
      const active = isActive(step.active, i) || i === step.mid;
      const tags = [];
      if (i === step.low) tags.push("low");
      if (i === step.mid) tags.push("mid");
      if (i === step.high) tags.push("high");
      if (v === step.target) tags.push("target");
      return '<div>' + cell(v, active, cls) + '<span class="marker">' + tags.join("/") + '</span></div>';
    }).join("");
    const probe = step.probe ? '<div class="sequence">' + step.probe.map((p) => '<span>' + esc(p) + '</span>').join("") + '</div>' : "";
    const mode = step.mode === "binary" ? "二分查找区间" : "顺序查找路径";
    return '<div class="search-wrap"><div class="search-panels"><div><div class="viz-row">' + cells + '</div></div><aside class="side-panel"><strong>' + mode + '</strong><div class="search-note">目标 key=' + esc(step.target) + '</div>' + probe + '</aside></div></div>';
  }

  function renderSort(step) {
    const max = Math.max(...step.values);
    const bars = '<div class="viz-bars">' + step.values.map((v, i) => {
      const h = 54 + Math.round((v / max) * 190);
      const prefix = step.sortedPrefix !== undefined ? i < step.sortedPrefix : i < (step.sorted || 0);
      const suffix = step.sortedSuffix !== undefined ? i >= step.values.length - step.sortedSuffix : false;
      const cls = (isActive(step.active, i) ? "is-active " : "") + (prefix || suffix ? "is-sorted " : "");
      let label = String(i);
      if (step.pivot === v) label = "pivot";
      else if (prefix) label = "有序前缀";
      else if (suffix) label = "有序后缀";
      return '<div><div class="viz-bar ' + cls + '" style="height:' + h + 'px">' + v + '</div><div class="bar-label">' + esc(label) + '</div></div>';
    }).join("") + '</div>';
    const badge = step.algorithm ? '<div class="algorithm-badge">' + esc(step.algorithm) + '</div>' : "";
    const note = step.note ? '<div class="bar-note">' + esc(step.note) + '</div>' : "";
    return '<div class="sort-wrap">' + badge + bars + note + '</div>';
  }

  function renderCounting(step) {
    const input = '<div class="viz-row">' + step.input.map((v) => cell(v, false)).join("") + '</div>';
    const buckets = step.buckets
      ? '<div class="count-row">' + step.buckets.map((bucket, i) => '<div class="viz-count ' + (isActive(step.active, "bucket") ? "is-active" : "") + '">桶 ' + i + '<br>' + bucket.map(esc).join(", ") + '</div>').join("") + '</div>'
      : "";
    const counts = step.counts
      ? '<div class="count-row">' + Object.entries(step.counts).map(([k, v]) => '<div class="viz-count ' + (isActive(step.active, k) ? "is-active" : "") + '">' + k + ': ' + v + '</div>').join("") + '</div>'
      : "";
    const output = step.output && step.output.length ? '<div class="viz-row">' + step.output.map((v) => cell(v, isActive(step.active, "output"))).join("") + '</div>' : '<div class="viz-row">' + cell("输出数组待填充", false) + '</div>';
    const badge = step.algorithm ? '<div class="algorithm-badge">' + esc(step.algorithm) + '</div>' : "";
    const note = step.note ? '<div class="bar-note">' + esc(step.note) + '</div>' : "";
    return '<div class="counting-wrap">' + badge + input + counts + buckets + output + note + '</div>';
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
      case "evolution": return renderEvolution(step);
      case "complexity": return renderComplexity(step);
      case "array": return renderArray(step);
      case "linked": return renderLinked(step);
      case "list": return renderList(step);
      case "stack": return renderStack(step);
      case "cqueue": return renderCircularQueue(step);
      case "queue": return renderQueue(step);
      case "kmp": return renderKmp(step);
      case "traversal": return renderTraversal(step);
      case "avl": return renderAvl(step);
      case "tree": return renderTreeLike("tree", step);
      case "rotation": return renderTreeLike("rotation", step);
      case "heap": return renderTreeLike("heap", step);
      case "graph": return renderGraph(step, false);
      case "path": return renderGraph(step, true);
      case "search_lab": return renderSearchLab(step);
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
    tl.fromTo(canvas.querySelectorAll(".svg-edge,.viz-link,.evolution-link,.linked-arrow"),
      { opacity: 0, scaleX: .65 },
      { opacity: 1, scaleX: 1, duration: .28, stagger: .02, ease: "power2.out", transformOrigin: "left center" }
    );
    tl.fromTo(canvas.querySelectorAll(".viz-cell,.viz-node,.viz-token,.viz-bucket,.viz-count,.viz-block,.viz-bar"),
      { opacity: 0, y: 14, scale: .96 },
      { opacity: 1, y: 0, scale: 1, duration: .42, stagger: .028, ease: "power3.out" },
      "-=.12"
    );
    tl.fromTo(canvas.querySelectorAll(".tree-svg,.graph-svg,.evolution-svg,.linked-svg"),
      { opacity: 0 },
      { opacity: 1, duration: .32, ease: "power2.out" },
      "-=.34"
    );
    tl.fromTo(canvas.querySelectorAll(".is-active,.svg-edge.active"),
      { scale: .9, filter: "brightness(1.08)" },
      { scale: 1, filter: "brightness(1)", duration: .55, ease: "back.out(1.9)", transformOrigin: "center" },
      "-=.18"
    );
  }

  function renderPseudo(step) {
    const lines = demo.pseudocode || [];
    if (!pseudoCode || !lines.length) return;
    const active = Math.max(0, Math.min(lines.length - 1, (step.codeLine || (index + 1)) - 1));
    pseudoCode.innerHTML = lines.map((line, i) => '<li class="' + (i === active ? "active" : "") + '">' + esc(line) + '</li>').join("");
  }

  function renderCodeTrace(step) {
    if (!cTrace || !demo.codeTrace) return;
    const lines = demo.codeTrace.lines || [];
    const active = Math.max(0, Math.min(lines.length - 1, (step.codeLine || (index + 1)) - 1));
    if (codeTraceTitle) codeTraceTitle.textContent = demo.codeTrace.title || "关键 C 片段";
    cTrace.innerHTML = lines.map((line, i) =>
      '<span class="c-line ' + (i === active ? "active" : "") + '"><span class="ln">' + (i + 1) + '</span><span>' + esc(line) + '</span></span>'
    ).join("");
  }

  function parseNumbers(text, fallback) {
    const values = String(text || "").split(/[，,\s]+/)
      .map((item) => Number(item.trim()))
      .filter((item) => Number.isFinite(item))
      .slice(0, 12);
    return values.length ? values : fallback.slice();
  }

  function setSteps(steps, scenario) {
    if (!steps || !steps.length) return;
    if (timer) {
      clearInterval(timer);
      timer = null;
      document.getElementById("playSteps").textContent = "自动播放";
    }
    demo.steps = steps;
    if (scenario) demo.scenario = scenario;
    index = 0;
    render();
  }

  function customArraySteps(nums, targetText) {
    const pair = String(targetText || "").split(":");
    let insertIndex = Number(pair[0]);
    let value = Number(pair.length > 1 ? pair[1] : targetText);
    if (!Number.isInteger(insertIndex)) insertIndex = Math.floor(nums.length / 2);
    if (!Number.isFinite(value)) value = 99;
    insertIndex = Math.max(0, Math.min(insertIndex, nums.length));
    const capacity = Math.max(6, nums.length + 2);
    const cells = nums.concat(Array(capacity - nums.length).fill("_"));
    const steps = [{
      title: "自定义顺序表初始状态",
      cells: cells.slice(),
      size: nums.length,
      capacity,
      active: [insertIndex],
      markers: { index: insertIndex },
      codeLine: 1,
      text: "准备在下标 " + insertIndex + " 插入 " + value + "。连续存储要求先给新元素腾出位置。"
    }];
    for (let j = nums.length - 1; j >= insertIndex; --j) {
      cells[j + 1] = cells[j];
      steps.push({
        title: "后移 a[" + j + "]",
        cells: cells.slice(),
        size: nums.length,
        capacity,
        active: [j, j + 1],
        markers: { j, target: insertIndex },
        codeLine: 3,
        text: "把下标 " + j + " 的元素复制到 " + (j + 1) + "。必须从后往前移动，避免覆盖还没搬走的数据。"
      });
    }
    cells[insertIndex] = value;
    steps.push({
      title: "写入新元素并更新 size",
      cells: cells.slice(),
      size: nums.length + 1,
      capacity,
      active: [insertIndex],
      markers: { inserted: insertIndex },
      codeLine: 4,
      text: "写入 " + value + " 后，逻辑长度增加。结构不变量仍是下标 0 到 size-1 保存有效元素。"
    });
    return steps;
  }

  function customQueueSteps(nums) {
    const capacity = Math.max(6, Math.min(10, nums.length + 2));
    const cells = Array(capacity).fill("_");
    let front = 0;
    let rear = 0;
    let size = 0;
    const steps = [{ title: "自定义空循环队列", cells: cells.slice(), front, rear, active: [0], op: "front == rear", codeLine: 1, text: "front 与 rear 相同表示队空。" }];
    function enqueue(value) {
      if ((rear + 1) % capacity === front) return;
      const write = rear;
      cells[write] = value;
      rear = (rear + 1) % capacity;
      size += 1;
      steps.push({ title: "enqueue " + value, cells: cells.slice(), front, rear, active: [write, rear], op: "rear = (rear + 1) % capacity", codeLine: 2, text: "写入 rear 原位置，再通过取模移动 rear。" });
    }
    function dequeue() {
      if (!size) return;
      const read = front;
      cells[read] = "_";
      front = (front + 1) % capacity;
      size -= 1;
      steps.push({ title: "dequeue", cells: cells.slice(), front, rear, active: [read, front], op: "front = (front + 1) % capacity", codeLine: 3, text: "出队不搬移元素，只移动 front，释放原队头槽位。" });
    }
    const first = nums.slice(0, Math.min(4, capacity - 2));
    const rest = nums.slice(first.length);
    first.forEach(enqueue);
    dequeue();
    dequeue();
    rest.forEach(enqueue);
    steps.push({ title: "队满条件检查", cells: cells.slice(), front, rear, active: [rear, front], op: "(rear + 1) % capacity == front", codeLine: 4, text: "循环队列的关键是把线性数组当成圆环，并用一个空槽区分队满和队空。" });
    return steps;
  }

  function customSearchSteps(nums, targetText) {
    const array = nums.slice().sort((a, b) => a - b);
    const target = Number.isFinite(Number(targetText)) ? Number(targetText) : array[Math.floor(array.length / 2)];
    let low = 0;
    let high = array.length - 1;
    const checked = [];
    const steps = [];
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      checked.push(mid);
      const discarded = [];
      for (let i = 0; i < array.length; ++i) {
        if (i < low || i > high) discarded.push(i);
      }
      steps.push({
        title: "检查 mid=" + mid,
        mode: "binary",
        array,
        target,
        low,
        mid,
        high,
        checked: checked.slice(),
        discarded,
        active: [mid],
        probe: checked.map((i) => "a[" + i + "]=" + array[i]),
        codeLine: 3,
        text: "在有序数组中比较 a[" + mid + "]=" + array[mid] + " 与目标 " + target + "。"
      });
      if (array[mid] === target) {
        steps.push({ title: "查找成功", mode: "binary", array, target, low, mid, high, checked: checked.slice(), active: [mid], probe: checked.map((i) => "a[" + i + "]=" + array[i]), codeLine: 4, text: "命中目标，返回下标 " + mid + "。" });
        return steps;
      }
      if (array[mid] < target) low = mid + 1;
      else high = mid - 1;
    }
    steps.push({ title: "查找失败", mode: "binary", array, target, low, mid: -1, high, checked: checked.slice(), active: [], probe: checked.map((i) => "a[" + i + "]=" + array[i]), codeLine: 5, text: "区间为空，目标不存在。二分查找的前提是数组有序。" });
    return steps;
  }

  function customSortSteps(nums) {
    const values = nums.slice().map((n) => Math.max(1, Math.floor(n)));
    const steps = [{ title: "自定义插入排序初始状态", algorithm: "insertion sort", values: values.slice(), active: [0], sortedPrefix: 1, codeLine: 1, text: "把第一个元素视为有序前缀。" }];
    for (let i = 1; i < values.length; ++i) {
      const key = values[i];
      let j = i - 1;
      steps.push({ title: "取 key=" + key, algorithm: "insertion sort", values: values.slice(), active: [i], sortedPrefix: i, codeLine: 1, text: "准备把 key 插入到前面的有序区间。" });
      while (j >= 0 && values[j] > key) {
        values[j + 1] = values[j];
        steps.push({ title: "右移 " + values[j], algorithm: "insertion sort", values: values.slice(), active: [j, j + 1], sortedPrefix: i, codeLine: 2, text: "较大的元素右移一格，为 key 腾位置。" });
        j -= 1;
      }
      values[j + 1] = key;
      steps.push({ title: "插入 key", algorithm: "insertion sort", values: values.slice(), active: [j + 1], sortedPrefix: i + 1, codeLine: 3, text: "key 放入正确位置，已排序前缀扩大。" });
    }
    return steps;
  }

  function customCountingSteps(nums) {
    const input = nums.map((n) => Math.max(0, Math.min(9, Math.floor(n))));
    const counts = {};
    const steps = [{ title: "自定义计数排序输入", algorithm: "counting sort", input, counts: {}, output: [], active: [], codeLine: 1, text: "计数排序要求关键字范围较小，这里把输入限制在 0 到 9。" }];
    input.forEach((value) => {
      counts[value] = (counts[value] || 0) + 1;
      steps.push({ title: "统计 " + value, algorithm: "counting sort", input, counts: { ...counts }, output: [], active: [String(value)], codeLine: 1, text: "count[" + value + "] 增加，记录这个关键字出现次数。" });
    });
    const output = [];
    Object.keys(counts).map(Number).sort((a, b) => a - b).forEach((key) => {
      for (let i = 0; i < counts[key]; ++i) output.push(key);
      steps.push({ title: "输出关键字 " + key, algorithm: "counting sort", input, counts: { ...counts }, output: output.slice(), active: ["output", String(key)], codeLine: 3, text: "按照关键字从小到大回填输出数组。" });
    });
    return steps;
  }

  function setupCustomPanel() {
    if (!customPanel) return;
    const supported = ["array", "cqueue", "search_lab", "sort", "counting"].includes(demo.kind);
    const hints = {
      array: "数据填顺序表初始元素；参数填 index:value，例如 2:99。",
      cqueue: "数据填一串入队元素；演示会先入队、出队，再继续入队观察回绕。",
      search_lab: "数据填数组，系统会排序后做二分；参数填要查找的目标。",
      sort: "数据填待排序序列；演示使用插入排序逐步重放。",
      counting: "数据填 0 到 9 的整数；演示计数排序的统计和回填。"
    };
    if (customHint) customHint.textContent = supported ? hints[demo.kind] : "本周结构不适合用简单数字序列参数化，建议使用默认演示理解不变量。";
    customPanel.classList.toggle("is-disabled", !supported);
    if (!supported) {
      if (applyCustom) applyCustom.disabled = true;
      if (customInput) customInput.disabled = true;
      if (customTarget) customTarget.disabled = true;
      return;
    }
    if (demo.kind === "array") customTarget.value = "2:99";
    if (demo.kind === "cqueue") customInput.value = "10,20,30,40,50,60,70";
    if (demo.kind === "search_lab") { customInput.value = "3,7,11,19,24,31,42"; customTarget.value = "24"; }
    if (demo.kind === "sort") customInput.value = "29,10,14,37,14,3";
    if (demo.kind === "counting") customInput.value = "4,2,2,8,3,3,1";
    applyCustom.addEventListener("click", () => {
      const nums = parseNumbers(customInput.value, [12, 7, 4, 20, 15]);
      let steps = null;
      if (demo.kind === "array") steps = customArraySteps(nums, customTarget.value);
      if (demo.kind === "cqueue") steps = customQueueSteps(nums);
      if (demo.kind === "search_lab") steps = customSearchSteps(nums, customTarget.value);
      if (demo.kind === "sort") steps = customSortSteps(nums);
      if (demo.kind === "counting") steps = customCountingSteps(nums);
      setSteps(steps, "自定义输入实验：用学生输入的数据重新生成操作步骤。");
    });
    restoreDemo.addEventListener("click", () => setSteps(JSON.parse(JSON.stringify(originalSteps)), originalScenario));
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
    renderPseudo(step);
    renderCodeTrace(step);
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
  setupCustomPanel();
  render();
})();

