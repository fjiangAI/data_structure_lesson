(function () {
  const params = new URLSearchParams(window.location.search);
  const src = params.get("src") || "../README.md";
  const docTitle = document.getElementById("docTitle");
  const srcPath = document.getElementById("srcPath");
  const rawLink = document.getElementById("rawLink");
  const badges = document.getElementById("fileBadges");
  const content = document.getElementById("docContent");
  const outline = document.getElementById("outline");

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch];
    });
  }

  function cleanText(value) {
    return value.replace(/^\uFEFF/, "");
  }

  function fileName(path) {
    const parts = decodeURIComponent(path).split("/").filter(Boolean);
    return parts[parts.length - 1] || "课程材料";
  }

  function fileKind(path) {
    const lower = path.toLowerCase();
    if (lower.endsWith(".md")) return "markdown";
    if (lower.endsWith(".c") || lower.endsWith(".h")) return "c";
    return "text";
  }

  function safeRelative(path) {
    return !/^https?:\/\//i.test(path) && !path.startsWith("//");
  }

  function setBadges(kind, text) {
    const lineCount = text.split(/\r?\n/).length;
    const words = text.length;
    const labels = kind === "c"
      ? ["C 语言源码", lineCount + " 行", "UTF-8"]
      : kind === "markdown"
        ? ["Markdown 讲义", lineCount + " 行", "已排版"]
        : ["文本材料", lineCount + " 行", words + " 字符"];
    badges.innerHTML = labels.map(function (label) {
      return "<span>" + escapeHtml(label) + "</span>";
    }).join("");
  }

  function buildOutline() {
    const headings = Array.from(content.querySelectorAll("h1, h2, h3"));
    if (!headings.length) {
      outline.innerHTML = "<span>当前文件没有可提取目录</span>";
      return;
    }
    outline.innerHTML = headings.map(function (heading, index) {
      if (!heading.id) heading.id = "heading-" + index;
      const depth = heading.tagName === "H3" ? " depth-3" : "";
      return '<a class="' + depth.trim() + '" href="#' + heading.id + '">' + escapeHtml(heading.textContent.trim()) + "</a>";
    }).join("");
  }

  function highlightMarkdownCode() {
    if (!window.hljs) return;
    content.querySelectorAll("pre code").forEach(function (block) {
      window.hljs.highlightElement(block);
    });
  }

  function rewriteRelativeLinks() {
    const sourceUrl = new URL(src, window.location.href);
    content.querySelectorAll("a[href]").forEach(function (link) {
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || /^[a-z]+:/i.test(href)) return;
      const target = new URL(href, sourceUrl);
      if (target.origin !== window.location.origin) {
        link.href = target.href;
        return;
      }
      const lower = target.pathname.toLowerCase();
      if (lower.endsWith(".md") || lower.endsWith(".c") || lower.endsWith(".h")) {
        link.href = "viewer.html?src=" + encodeURIComponent(target.pathname + target.search);
      } else {
        link.href = target.href;
      }
    });
  }

  function renderMarkdown(text) {
    if (!window.marked || !window.DOMPurify) {
      content.innerHTML = '<pre><code>' + escapeHtml(text) + "</code></pre>";
      return;
    }
    window.marked.setOptions({ gfm: true, breaks: false });
    const html = window.marked.parse(text);
    content.classList.remove("code-panel");
    content.innerHTML = window.DOMPurify.sanitize(html);
    rewriteRelativeLinks();
    highlightMarkdownCode();
    buildOutline();
  }

  function renderCode(text, language) {
    content.classList.add("code-panel");
    const highlighted = window.hljs && window.hljs.getLanguage(language)
      ? window.hljs.highlight(text, { language: language }).value
      : escapeHtml(text);
    const rows = highlighted.split(/\r?\n/).map(function (line, index) {
      const body = line.length ? line : "&nbsp;";
      return '<span class="code-line"><span class="line-no">' + (index + 1) + '</span><code>' + body + '</code></span>';
    }).join("");
    content.innerHTML = '<pre class="code-view" tabindex="0">' + rows + "</pre>";
    outline.innerHTML = "<span>C 代码阅读模式</span><span>建议结合讲义中的结构不变量逐函数阅读。</span>";
  }

  function renderText(text) {
    content.classList.remove("code-panel");
    content.innerHTML = '<pre><code>' + escapeHtml(text) + "</code></pre>";
    outline.innerHTML = "<span>文本阅读模式</span>";
  }

  async function load() {
    const decoded = decodeURIComponent(src);
    docTitle.textContent = fileName(src);
    srcPath.textContent = decoded;
    rawLink.href = src;

    if (!safeRelative(src)) {
      content.innerHTML = '<div class="error-box">只允许读取本仓库中的相对路径文件。</div>';
      return;
    }

    try {
      const response = await fetch(src);
      if (!response.ok) throw new Error("HTTP " + response.status);
      const text = cleanText(await response.text());
      const kind = fileKind(src);
      setBadges(kind, text);
      if (kind === "markdown") renderMarkdown(text);
      else if (kind === "c") renderCode(text, "c");
      else renderText(text);
    } catch (error) {
      content.classList.remove("code-panel");
      content.innerHTML = '<div class="error-box"><strong>材料加载失败。</strong><p>如果你是直接用 file:// 打开本页面，浏览器可能会阻止读取本地 Markdown 或 C 文件。请通过 GitHub Pages 或本地静态服务器访问。</p><p>' + escapeHtml(error.message) + "</p></div>";
      outline.innerHTML = "<span>加载失败</span>";
    }
  }

  load();
})();

