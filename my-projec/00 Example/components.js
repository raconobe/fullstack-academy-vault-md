// "Mixin" — a function that returns a DOM element
function createCard(title, body) {
  const div = document.createElement('div');
  div.className = 'card';
  div.innerHTML = `
    <h3>${title}</h3>
    <p>${body}</p>
  `;
  return div;
}   