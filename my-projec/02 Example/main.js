// main.js — fixed

import "./components/my-card.js"; // ← all imports at the TOP
import { store } from "./store.js";

// ─── Load static partials ─────────────────────────────────────
async function loadIncludes() {
  const els = document.querySelectorAll("[data-include]");
  await Promise.all(
    [...els].map(async (el) => {
      const res = await fetch(el.dataset.include);
      el.outerHTML = await res.text();
    }),
  );
}

// ─── Load dynamic data ────────────────────────────────────────
async function loadData() {
  const res = await fetch("data/content.json");
  return res.json();
}

// ─── Load markdown ────────────────────────────────────────────
async function loadMarkdown(path) {
  const res = await fetch(path);
  const text = await res.text();
  return marked.parse(text);
}

// ─── Render ───────────────────────────────────────────────────
function renderHero(data) {
  const el = document.getElementById("hero");
  el.innerHTML = `
    <h1>${data.hero.title}</h1>
    <p class="subtitle">${data.hero.subtitle}</p>
  `;
}

function renderCards(data) {
  const el = document.getElementById("cards");
  el.innerHTML = "";
  data.cards.forEach((card) => {
    const cardEl = document.createElement("my-card");
    cardEl.setAttribute("title", card.title);
    cardEl.setAttribute("body", card.body);
    cardEl.setAttribute("tag", card.tag);
    el.appendChild(cardEl);
  });
}

async function renderContent(data) {
  const el = document.getElementById("content");
  const html = await loadMarkdown(data.contentFile);
  el.innerHTML = html;
}

// ─── Boot ─────────────────────────────────────────────────────
async function init() {
  await loadIncludes();
  const data = await loadData();
  renderHero(data);
  renderCards(data);
  await renderContent(data);
  console.log("✅ App ready");
}

init();
