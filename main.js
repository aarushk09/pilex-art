const container = document.querySelector('.container');
const sizeEl = document.querySelector('.size');
let size = sizeEl.value;
const color = document.querySelector('.color');
const resetBtn = document.querySelector('.btn');
let draw = false;
let zoomLevel = 1;

// Initial size of the grid squares
const standardSize = 30;

function populate(size) {
    container.style.setProperty('--size', size);
    container.innerHTML = ''; // Clear previous grid
    for (let i = 0; i < size * size; i++) {
        const div = document.createElement('div');
        div.classList.add('pixel');
        div.addEventListener('mouseover', function () {
            if (!draw) return;
            div.style.backgroundColor = color.value;
        });
        div.addEventListener('mousedown', function () {
            div.style.backgroundColor = color.value;
        });
        container.appendChild(div);
    }
}

window.addEventListener("mousedown", function () {
    draw = true;
});
window.addEventListener("mouseup", function () {
    draw = false;
});

function reset() {
    size = sizeEl.value;
    zoomLevel = 1; // Reset zoom level
    container.style.setProperty('--zoom', zoomLevel);
    populate(size);
}

resetBtn.addEventListener('click', reset);

sizeEl.addEventListener('keyup', function () {
    size = sizeEl.value;
    reset();
});

container.addEventListener('wheel', function (event) {
    event.preventDefault();
    if (event.deltaY > 0) {
        zoomLevel = Math.max(0.1, zoomLevel - 0.1); // Zoom out
    } else {
        zoomLevel = Math.min(5, zoomLevel + 0.1); // Zoom in
    }
    container.style.setProperty('--zoom', zoomLevel);
});

populate(size); // Start with the initial size of the grid squares

