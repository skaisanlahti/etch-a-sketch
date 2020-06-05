/*=== App overview ===
- Create a grid of div squares with javascript
- Make the divs change color when the cursor passes over them
- Add a button that will clear the screen and prompt the user to
  give a resolution for the new grid
=============================================================================*/

/*=== DOM Elements ===
=============================================================================*/
const gridContainer = document.querySelector(".eas-main__content");
const gridStyle = document.querySelector(".eas-main__content").style;
const newButton = document.querySelector(".eas-main__button--new");
const clearButton = document.querySelector(".eas-main__button--clear");
const colorButton = document.querySelector(".eas-main__button--color");
const randomButton = document.querySelector(".eas-main__button--random");
const colorPreview = document.querySelector(".eas-color-preview");

/*=== Variables ===
=============================================================================*/
const gridDefault = 64;
let gridResolution = 64;
let color = "black";
let random = false;

/*=== Event Listeners ===
=============================================================================*/
newButton.addEventListener("click", setNewGrid);
clearButton.addEventListener("click", createGrid);
colorButton.addEventListener("click", setColor);
randomButton.addEventListener("click", setRandom);
window.addEventListener("resize", createGrid);

/*=== Button functions ===
=============================================================================*/
function setNewGrid(){
    gridResolution = prompt("Enter grid columns:");
    if (gridResolution === "" || gridResolution === null) gridResolution = gridDefault;
    createGrid();
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
function changeCellColor(){
    if (random) this.style.backgroundColor = getRandomHSL();
    else this.style.backgroundColor = color;
}

/*=== Grid creation ===
- Remove old cells if they exist to refresh grid
- Get container dimensions to make grid adjust to arbitrary container size
- Add grid styles to container to define columns and rows
- Create cells
=============================================================================*/
function createGrid() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
    
    let gridInfo = gridContainer.getBoundingClientRect();
    let gridHeight = gridInfo.height
    let gridWidth = gridInfo.width;

    let columns = gridResolution;
    let rows = Math.floor(gridHeight/gridWidth*columns);
    let cellCount = columns * rows;
    
    console.log(`columns: ${columns}, rows: ${rows}, cells: ${cellCount}`);
    
    gridStyle.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    gridStyle.gridTemplateRows = `repeat(${rows}, 1fr)`;
    
    for (let i = 0; i < cellCount; i++){
        const cell = document.createElement("div");
        cell.classList.add("grid-item");
        gridContainer.appendChild(cell);
        cell.addEventListener("mouseenter", changeCellColor);
    }
}

/*=== Start App ===
=============================================================================*/
createGrid();