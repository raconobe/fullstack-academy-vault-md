// lib/home.js — "Home Framework" v1.0

// ─── State ────────────────────────────────────────────────
let ROOT = "/";
const _cache = new Map();

// ─── Path resolution ──────────────────────────────────────
function resolve(path) {
  if (path.startsWith("/")) return path;
  return ROOT + path;
}

async function detectRoot() {
  const segments = window.location.pathname.split("/");
  for (let i = segments.length; i >= 0; i--) {
    const candidate = segments.slice(0, i).join("/") + "/";
    try {
      const res = await fetch(candidate + "data/site.json", { method: "HEAD" });
      if (res.ok) { ROOT = candidate || "/"; return; }
    } catch { /* keep walking */ }
    if (candidate === "/") break;
  }
  ROOT = "/";
}

// ─── Fetch (with cache) ───────────────────────────────────
async function fetchText(path) {
  if (_cache.has(path)) return _cache.get(path);
  const res = await fetch(path);
  if (!res.ok) throw new Error(`${path}: ${res.status} ${res.statusText}`);
  const text = await res.text();
  _cache.set(path, text);
  return text;
}

async function fetchJSON(path) {
  if (_cache.has(path)) return JSON.parse(_cache.get(path));
  const res = await fetch(path);
  if (!res.ok) throw new Error(`${path}: ${res.status} ${res.statusText}`);
  const text = await res.text();
  _cache.set(path, text);
  return JSON.parse(text);
}

// ─── Include (with error handling) ────────────────────────
async function include(id, path) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const res = await fetch(path);
    if (res.status === 404) {
      el.innerHTML = `<div class="include-missing"><span>⚠️ Partial not found: <code>${path}</code></span></div>`;
      console.warn(`[include] 404: ${path}`);
      return;
    }
    if (!res.ok) throw new Error(`${path}: ${res.status}`);
    el.innerHTML = await res.text();
  } catch (err) {
    el.innerHTML = `<div class="include-error"><span>⚠️ Failed: <code>${path}</code>: ${err.message}</span></div>`;
    console.error("[include]", err);
  }
}

// ─── Lazy include ─────────────────────────────────────────
function lazyInclude(id, path) {
  const el = document.getElementById(id);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight + 200) {
    include(id, path);
    return;
  }
  const obs = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting) {
      await include(id, path);
      obs.disconnect();
    }
  }, { rootMargin: "200px" });
  obs.observe(el);
}

// ─── Markdown ─────────────────────────────────────────────
function md(text) {
  const blocks = text.split(/\n\n+/);
  return blocks.map((block) => {
    const trimmed = block.trim();

    if (/^### /.test(trimmed)) return `<h3 class="md-h3">${trimmed.slice(4)}</h3>`;
    if (/^## /.test(trimmed))  return `<h2 class="md-h2">${trimmed.slice(3)}</h2>`;
    if (/^# /.test(trimmed))   return `<h1 class="md-h1">${trimmed.slice(2)}</h1>`;

    if (trimmed.startsWith("```")) {
      const lines = trimmed.split("\n");
      const lang = lines[0].slice(3).trim();
      const code = lines.slice(1).join("\n")
        .replace(/```$/g, "")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      const langClass = lang ? ` class="code--${lang}"` : "";
      return `<pre class="code-block"><code${langClass}>${code}</code></pre>`;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) return `<hr class="md-hr">`;

    if (/^> /.test(trimmed)) {
      const inner = trimmed.replace(/^> /gm, "");
      return `<blockquote class="md-quote">${inline(inner)}</blockquote>`;
    }

    if (/^- /.test(trimmed) || /^\s+- /.test(trimmed)) return parseList(trimmed);

    return `<p class="md-p">${inline(trimmed)}</p>`;
  }).join("");
}

function parseList(block) {
  const lines = block.split("\n");
  let html = "";
  let stack = [];

  for (const line of lines) {
    const match = line.match(/^(\s*)- (.*)/);
    if (!match) continue;
    const indent = Math.floor(match[1].length / 2);
    const content = inline(match[2]);

    while (stack.length > indent + 1) { html += "</li></ul>"; stack.pop(); }
    if (stack.length < indent + 1) { html += "<ul>"; stack.push(indent); }
    else { html += "</li>"; }
    html += `<li>${content}`;
  }
  while (stack.length > 0) { html += "</li></ul>"; stack.pop(); }
  return html;
}

function inline(text) {
  return text
    .replace(/`([^`]+)`/g, '<code class="md-code">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="md-link">$1</a>');
}

// ─── Security ─────────────────────────────────────────────
function esc(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function sanitize(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+\s*=\s*["'][^"']*["']/gi, "")
    .replace(/javascript:/gi, "");
}

// ─── Validation ───────────────────────────────────────────
function validate(data, schema, defaults = {}) {
  const result = { ...defaults };
  for (const key in schema) {
    if (data[key] !== undefined) {
      result[key] = data[key];
    } else if (schema[key] === "required") {
      console.warn(`[validate] Missing required key: "${key}"`);
    }
  }
  return result;
}

// ─── Theme ────────────────────────────────────────────────
function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : null;
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

function initTheme() {
  const saved = getCookie("theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = saved ? saved === "dark" : systemDark;
  applyTheme(isDark);

  if (!saved) {
    window.matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => applyTheme(e.matches));
  }

  const btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      setCookie("theme", isDark ? "dark" : "light", 365);
      updateThemeIcon(isDark);
    });
  }
}

function applyTheme(isDark) {
  document.documentElement.classList.toggle("dark", isDark);
  updateThemeIcon(isDark);
}

function updateThemeIcon(isDark) {
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.textContent = isDark ? "☀️" : "🌙";
}

// ─── Debug / Dev tools ────────────────────────────────────
function debug(id) {
  const el = document.getElementById(id);
  if (!el) {
    console.error(`❌ #${id} NOT FOUND`);
    return null;
  }
  console.log(`✅ #${id} →`, el.tagName, el.innerHTML.slice(0, 50) + "...");
  return el;
}

function checkStyles() {
  const selectors = [
    ".card", ".card__title", ".card__body", ".card__tag",
    ".nav", ".theme-toggle", ".slot", ".include-error",
    ".md-h1", ".code-block",
  ];
  selectors.forEach((sel) => {
    const found = [...document.styleSheets]
      .flatMap((s) => { try { return [...s.cssRules]; } catch { return []; } })
      .some((r) => r.selectorText?.includes(sel.replace(".", "")));
    if (!found) console.warn(`⚠️ No CSS rule for: ${sel}`);
  });
}

// ─── Single export ────────────────────────────────────────
export {
  detectRoot,
  resolve,
  fetchText,
  fetchJSON,
  include,
  lazyInclude,
  md,
  esc,
  sanitize,
  validate,
  initTheme,
  debug,
  checkStyles,
};   