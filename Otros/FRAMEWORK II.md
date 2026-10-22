
## Improving Messy HTML

The quickest wins are **linters + formatter** in VS Code:

- **HTMLHint** – catches missing `alt` attrs, bad tag usage, duplicate IDs
- **Stylelint** – enforces consistent CSS/SCSS rules
- **ESLint** – catches JS/TS issues
- **Prettier** – auto-formats all three on save

Add these as dev dependencies and enable `editor.codeActionsOnSave` in your VS Code settings.

## Frameworks for HTML + SCSS + TypeScript

There is no single "HTML framework" — but several options let you keep writing **real HTML** (not JSX), use **SCSS**, and write **TypeScript**:

| Framework | HTML-like syntax | SCSS support | TypeScript | Best for |
|---|---|---|---|---|
| Svelte | ✅ native HTML in `.svelte` files | ✅ built-in | ✅ first-class | Small–medium apps, component reuse |
| Lit | ✅ Web Components (real HTML) | ✅ | ✅ native | Design systems, framework-agnostic |
| Astro | ✅ plain HTML in `.astro` files | ✅ | ✅ | Content sites, islands of JS |
| Vue | ✅ `<template>` block (HTML-like) | ✅ | ✅ | Full apps, gradual adoption |
| Angular | ✅ templates (HTML-like) | ✅ | ✅ native | Large enterprise apps |

**If you want the least change from plain HTML/CSS/JS:**
- **Svelte** is the closest — you write `<script lang="ts">` and `<style lang="scss">` right in the component file. No JSX, no virtual DOM.
- **Lit** (web components) if you want framework-agnostic, standards-based components.
- **Astro** if your site is mostly static content with a little interactivity.

**If you just want a build tool** (no framework, plain HTML + SCSS + TS):
- **Vite** with `vanilla-ts` template handles SCSS compilation and TS out of the box — no extra config needed.

The most common recommendation from the community for "I want components without a heavy framework" is **Svelte** or **Lit**.

