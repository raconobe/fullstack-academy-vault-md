// components/my-card.js
import { store } from '../store.js';   

class MyCard extends HTMLElement {

  // ─── Observed attributes (external state) ─────────────────
  static get observedAttributes() {
    return ['title', 'body', 'tag', 'expanded'];
  }

  // ─── Internal state (private) ────────────────────────────
  #expanded = false;
  #likes = 0;

  // ─── React to attribute changes from outside ─────────────
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  // ─── Lifecycle ───────────────────────────────────────────
  connectedCallback() {
    this.render();
  }

  // ─── Public API (other scripts can call these) ───────────
  toggle() {
    this.#expanded = !this.#expanded;
    this.render();
    // Notify parent if needed:
    this.dispatchEvent(new CustomEvent('card-toggle', {
      detail: { expanded: this.#expanded, title: this.getAttribute('title') },
      bubbles: true
    }));
  }

  like() {
    this.#likes++;
    this.render();
  }

  // ─── Render (the "view") ─────────────────────────────────
  render() {
    const title = this.getAttribute('title') || '';
    const body  = this.getAttribute('body') || '';
    const tag   = this.getAttribute('tag') || '';

    this.innerHTML = `
      <div class="card ${this.#expanded ? 'expanded' : ''}">
        <span class="tag">${tag}</span>
        <h3>${title}</h3>
        <p>${body}</p>
        ${this.#expanded ? '<p class="extra">Extra details here...</p>' : ''}
        <div class="actions">
          <button data-action="toggle">Toggle</button>
          <button data-action="like">♥ ${this.#likes}</button>
        </div>
      </div>
    `;

    // Bind events (event delegation)
    this.querySelector('[data-action="toggle"]')?.addEventListener('click', () => this.toggle());
    this.querySelector('[data-action="like"]')?.addEventListener('click', () => this.like());
  }
}

customElements.define('my-card', MyCard);   