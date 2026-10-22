class MyCard extends HTMLElement {
  connectedCallback() {
    const title = this.getAttribute('title') || 'No title';
    const body  = this.getAttribute('body')  || '';

    // If there's a <slot>, use it; otherwise use the body attribute
    const hasSlot = this.querySelector('slot');
    const content = this.innerHTML.trim()
      ? `<slot></slot>`
      : `<p>${body}</p>`;

    this.innerHTML = `
      <div class="card">
        <h3>${title}</h3>
        ${content}
      </div>
    `;
  }
}

customElements.define('my-card', MyCard);   