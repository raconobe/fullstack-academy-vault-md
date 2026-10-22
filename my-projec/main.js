// main.js
import {
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
} from "./lib/home.js";

// ─── Views (render functions) ─────────────────────────────
function populateHeader(config) {
  const header = document.querySelector("header");
  if (!header) return;
  header.querySelector('[data-bind="siteName"]').textContent = config.siteName;
  const nav = header.querySelector('[data-bind="nav"]');
  nav.classList.add("nav");
  nav.innerHTML = config.nav
    .map((i) => `<a href="${esc(i.href)}">${esc(i.label)}</a>`)
    .join("");
}

function populateFooter(config) {
  const footer = document.querySelector("footer");
  if (!footer) return;
  footer.querySelector('[data-bind="copyright"]').textContent =
    config.footer.copyright;
}

function renderCards(cards) {
  const el = document.getElementById("slot-cards");
  if (!el) return;
  el.innerHTML = cards
    .map(
      (card) => `
    <article class="card ${card.tag ? `card--${esc(card.tag)}` : ""}">
      <span class="card__tag">${esc(card.tag)}</span>
      <h3 class="card__title">${esc(card.title)}</h3>
      <p class="card__body">${esc(card.body)}</p>
    </article>
  `
    )
    .join("");
}

// ─── Boot ─────────────────────────────────────────────────
async function init() {
  //  await detectRoot();  // ← sets ROOT before any resolve() call

  // With:
  //ROOT = "/"; // ← just set it directly (but you need to export ROOT or use resolve differently)

  // Parallel: load everything at once
  const [headerHtml, footerHtml, config, cards] = await Promise.all([
    fetchText(resolve("/partials/header.html")).catch(() => "<header></header>"),
    fetchText(resolve("/partials/footer.html")).catch(() => "<footer></footer>"),
    fetchJSON(resolve("/data/site.json")).catch(() => ({
      siteName: "My Site",
      nav: [],
      footer: { copyright: "" },
    })),
    fetchJSON(resolve("data/cards.json")).catch(() => []),
  ]);

  // Render
  document.getElementById("slot-header").innerHTML = headerHtml;
  document.getElementById("slot-footer").innerHTML = footerHtml;
  initTheme();

  const safe = validate(
    config,
    { siteName: "required", nav: "required", footer: "optional" },
    { siteName: "My Site", nav: [], footer: { copyright: "© 2026", links: [] } }
  );
  populateHeader(safe);
  populateFooter(safe);

  const safeCards = cards.map((card, i) =>
    validate(
      card,
      { id: "required", title: "required", body: "optional", tag: "optional" },
      { id: i + 1, title: `Card ${i + 1}`, body: "", tag: "" }
    )
  );
  renderCards(safeCards);

  // Non-critical
  await include("slot-related", resolve("partials/related.html"));

  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 200));
  idle(async () => {
    try {
      const el = document.getElementById("slot-content");
      const text = await fetchText(resolve("content/about.md"));
      el.classList.add("content");
      el.innerHTML = sanitize(md(text));
    } catch (err) {
      console.error("[content]", err);
    }
  });

  checkStyles();
  console.log("✅ Ready");
}

init();
