const cells = document.querySelectorAll('[data-cell]');
let isXTurn = true;

cells.forEach((cell) => {
  cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'x' : 'o';
  placeMark(cell, currentClass);
  isXTurn = !isXTurn;
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
