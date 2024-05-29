const container = document.querySelector('.container');
const sizeEl = document.querySelector('.size');
const color = document.querySelector('.color');
const resetBtn = document.querySelector('.btn');
let draw = false;
let zoomLevel = 1;
let gridSize = 30; // Starting grid size
const standardPixelSize = 8; // Standard size of pixels in pixels

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
    gridSize = 30;
    zoomLevel = 1;
    container.style.setProperty('--zoom', zoomLevel);
    populate(gridSize);
}

resetBtn.addEventListener('click', reset);

sizeEl.addEventListener('keyup', function () {
    gridSize = Math.min(30, Math.max(1, parseInt(sizeEl.value))); // Limit grid size between 1 and 30
    reset();
});

container.addEventListener('wheel', function (event) {
    event.preventDefault();
    if (event.deltaY > 0) {
        if (gridSize > 1) {
            gridSize--; // Zoom out by decreasing grid size
            zoomLevel = Math.max(0.1, zoomLevel - 0.1);
        }
    } else {
        if (zoomLevel < 1) {
            zoomLevel = Math.min(1, zoomLevel + 0.1); // Ensure zoom level doesn't exceed 1
        } else {
            if (gridSize < 30) {
                gridSize++; // Zoom in by increasing grid size
                zoomLevel = Math.min(5, zoomLevel + 0.1);
            }
        }
    }
    container.style.setProperty('--zoom', zoomLevel);
    populate(gridSize);
});

populate(gridSize); // Start with a 30x30 grid
