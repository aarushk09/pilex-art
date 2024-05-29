const container = document.querySelector('.container');
const sizeEl = document.querySelector('.size');
let size = parseInt(sizeEl.value);
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
    size = parseInt(sizeEl.value);
    zoomLevel = 1; // Reset zoom level
    container.style.setProperty('--zoom', zoomLevel);
    populate(size);
}

resetBtn.addEventListener('click', reset);

sizeEl.addEventListener('keyup', function () {
    size = parseInt(sizeEl.value);
    reset();
});

container.addEventListener('wheel', function (event) {
    event.preventDefault();
    if (event.deltaY > 0 && size > standardSize) {
        size -= 5; // Decrease grid size
        sizeEl.value = size;
        reset();
    } else if (event.deltaY < 0) {
        size += 5; // Increase grid size
        sizeEl.value = size;
        reset();
    }
});

populate(size); // Start with the initial size of the grid squares
