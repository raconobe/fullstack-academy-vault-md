async function loadIncludes() {
  const elements = document.querySelectorAll('[data-include]');

  for (const el of elements) {
    const path = el.getAttribute('data-include');
    try {
      const response = await fetch(path);
      const html = await response.text();
      el.outerHTML = html;
    } catch (err) {
      el.innerHTML = `<span style="color:red">Failed to load: ${path}</span>`;
      console.error(err);
    }
  }
}

// Wait for DOM to be ready, then load all includes
document.addEventListener('DOMContentLoaded', loadIncludes);   