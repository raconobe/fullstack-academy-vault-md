// store.js// store.js — same folder as main.js (project root)

const store = {
  _state: {},
  _listeners: {},

  get(key) {
    return this._state[key];
  },

  set(key, value) {
    this._state[key] = value;
    (this._listeners[key] || []).forEach(fn => fn(value));
  },

  on(key, fn) {
    (this._listeners[key] ||= []).push(fn);
  }
};

export { store };  // ← THIS LINE WAS MISSING   

// Usage in any component:
// store.set('theme', 'dark');
// store.on('theme', (val) => this.setAttribute('theme', val));
