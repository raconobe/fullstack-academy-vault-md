// components/my-nav.js
import { store } from '../store.js';

class MyNav extends HTMLElement {
  connectedCallback() {
    // Subscribe: "whenever 'theme' changes, update my class"
    store.on('theme', (val) => {
      this.classList.toggle('dark', val === 'dark');
    });

    // Read current value
    const current = store.get('theme');
    if (current === 'dark') this.classList.add('dark');
  }
}   