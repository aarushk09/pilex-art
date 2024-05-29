const container = document.querySelector('.container');
const sizeEl = document.querySelector('.size');
let size = sizeEl.value;
const color = document.querySelector('.color');
const resetBtn = document.querySelector('.btn');
const zoomEl = document.querySelector('.zoom');
let draw = false;

function populate(size) {
  container.style.setProperty('--size', size);
  container.innerHTML = ''; // Clear previous grid
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement('div');
    div.classList.add('pixel');
    div.addEventListener('mouseover', function() {
      if (!draw) return;
      div.style.backgroundColor = color.value;
    });
    div.addEventListener('mousedown', function() {
      div.style.backgroundColor = color.value;
    });
    container.appendChild(div);
  }
}

window.addEventListener("mousedown", function() {
  draw = true;
});
window.addEventListener("mouseup", function() {
  draw = false;
});

function reset() {
  size = sizeEl.value;
  populate(size);
}

resetBtn.addEventListener('click', reset);

sizeEl.addEventListener('keyup', function() {
  size = sizeEl.value;
  reset();
});

zoomEl.addEventListener('input', function() {
  container.style.setProperty('--zoom', zoomEl.value);
});

populate(100); // Start with a 100x100 grid
