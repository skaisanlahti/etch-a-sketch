/*=== App overview ===
- Create a grid of div squares with javascript
- Make the divs change color when the cursor passes over them
- Add a button that will clear the screen and prompt the user to
  give a resolution for the new grid
=============================================================================*/

/*=== DOM Elements ===
=============================================================================*/
const gridContainer = document.querySelector(".eas-main__content");
const newButton = document.querySelector(".eas-main__button--new");
const clearButton = document.querySelector(".eas-main__button--clear");
const colorButton = document.querySelector(".eas-main__button--color");
const randomButton = document.querySelector(".eas-main__button--random");
const colorPreview = document.querySelector(".eas-color-preview");

/*=== Variables ===
=============================================================================*/
const gridDefaultColumns = 64;
let gridColumns = gridDefaultColumns;
let color = "black";
let random = false;

/*=== Event Listeners ===
=============================================================================*/
newButton.addEventListener("click", setNewGrid);
clearButton.addEventListener("click", refreshGrid);
colorButton.addEventListener("click", setColor);
randomButton.addEventListener("click", setRandom);
window.addEventListener("resize", refreshGrid);

/*=== Event functions ===
=============================================================================*/
function setNewGrid(){
    gridColumns = prompt("Enter grid columns:");
    if (gridColumns === "" || gridColumns === null) gridColumns = gridDefaultColumns;
    createGrid(gridContainer, gridColumns);
}
function refreshGrid(){
    createGrid(gridContainer, gridColumns);
}
function setColor(){
    color = prompt("Enter color as css string (rgb/hsl/hex):");
    if (color) colorPreview.style.backgroundColor = color;
    else {
        color = "black";
        colorPreview.style.backgroundColor = color;
    }
    random = false;
    randomButton.textContent = "Random: OFF";
}
function setRandom(){
    random = !random;
    if (random) randomButton.textContent = "Random: ON";
    else randomButton.textContent = "Random: OFF";
}
function changeCellColor(){
    if (random) this.style.backgroundColor = getRandomHSL();
    else this.style.backgroundColor = color;
}

/*=== Helpers ===
=============================================================================*/
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function getRandomRGB(){
    let r = getRandomInteger(0,360);
    let g = getRandomInteger(0,360);
    let b = getRandomInteger(0,360);
    return `rgb(${r}, ${g}, ${b})`;
}
function getRandomHSL(){
    let h = getRandomInteger(0,360);
    let s = getRandomInteger(0,100);
    let l = getRandomInteger(0,100);
    return `hsl(${h}, ${s}%, ${l}%)`;
}

/*=== Grid creation ===
=============================================================================*/
function createGrid(container, columns) {
    let gridDimensions = getGridDimensions(container, columns);
    styleGridContainer(container, gridDimensions);
    createGridItems(container, gridDimensions.cells);
}
function getGridDimensions(container, columns){
    let gridInfo = container.getBoundingClientRect();
    let rows = Math.floor(gridInfo.height/gridInfo.width*columns);
    let cells = columns * rows;
    console.log(`columns: ${columns}, rows: ${rows}, cells: ${cells}`);
    return {columns: columns, rows: rows, cells: cells};
}
function styleGridContainer(container, gridDimensions){
    container.style.gridTemplateColumns = `repeat(${gridDimensions.columns}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${gridDimensions.rows}, 1fr)`;
}
function createGridItems(container, cells){
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    for (let i = 0; i < cells; i++){
        const cell = document.createElement("div");
        cell.classList.add("grid-item");
        container.appendChild(cell);
        cell.addEventListener("mouseenter", changeCellColor);
    }
}

/*=== Start App ===
=============================================================================*/
createGrid(gridContainer, gridDefaultColumns);