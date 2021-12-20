const tbl = document.getElementById("playing-field");
const startBtn = document.getElementById("start-btn");
const selectElement = document.getElementById("snake-color");
const appleCir = document.getElementById("apple");
const fieldSize = 17;
let gameStarted = false;

let playerColor = "violet";
let ballColor = "blue";
let snake = {
    body: [
        [10, 5],
        [9, 5],
        [8, 5]
    ],
    nextDir: [1, 0],
    color: playerColor
}

let gameState = {
    apple: [11, 8],
    snake: snake
}

// Set up the playing field 17 by 17
function makeField() {
    for (let j = 0; j < fieldSize; j++) {
        const newRow = document.createElement('tr');
        for (let i = 0; i < fieldSize; i++) {
            const newCell = document.createElement('td');
            newRow.appendChild(newCell);
        }
        tbl.appendChild(newRow);
    }
}

startBtn.addEventListener('click', (event) => {
    // event.preventDefault();
    makeField();

    // Add Snake
    let startRow = snake.body[0][0];
    let startCol = snake.body[0][1];
    let trow = tbl.children[startRow];
    let tcol = trow.cells[startCol];
    tcol.className = playerColor;
    for (let i = 1; i < snake.body.length; i++) {
        startRow = snake.body[i][0];
        startCol = snake.body[i][1];
        trow = tbl.children[startRow];
        tcol = trow.cells[startCol];
        tcol.className = playerColor;
    }

    // Add apple
    startRow = gameState.apple[0];
    startCol = gameState.apple[1];
    trow = tbl.children[startRow];
    tcol = trow.cells[startCol];
    tcol.className = 'apple';

    // Remove the Start button and Color Selector
    startBtn.style.display = "none";
    selectElement.style.display = "none";
    document.getElementsByTagName("h4")[0].style.display = "none";
    gameStarted = true;
})

// Set up color of the Snake
selectElement.addEventListener('change', function(event) {
    playerColor = event.target.value;
});

function moveHead() {

    let startRow = snake.body[0][0];
    let startCol = snake.body[0][1];
    let trow = tbl.children[startRow];
    let tcol = trow.cells[startCol];
    tcol.className = '';
    for (let i = 1; i < snake.body.length; i++) {
        startRow = snake.body[i][0];
        startCol = snake.body[i][1];
        trow = tbl.children[startRow];
        tcol = trow.cells[startCol];
        tcol.className = '';
    }

    let nextPosition = snake.body[0];
    console.log(nextPosition);
    snake.body[0][0] = snake.body[0][0] + snake.nextDir[0];
    snake.body[0][1] = snake.body[0][1] + snake.nextDir[1];


    let nextRow = snake.body[0][0];
    let nextCol = snake.body[0][1];
    let nrow = tbl.children[nextRow];
    let ncol = nrow.cells[nextCol];
    ncol.className = playerColor;

    let temp = [0, 0];
    for (let j = 1; j < snake.body.length; j++) {
        temp = snake.body[j];
        console.log(temp);
        console.log(nextPosition);
        snake.body[j] = nextPosition;
        console.log(snake.body[j]);
        nextRow = snake.body[j][0];
        nextCol = snake.body[j][1];
        nrow = tbl.children[nextRow];
        ncol = nrow.cells[nextCol];
        ncol.className = playerColor;
        nextPosition = temp;
    }
}

function relocateApple() {
    let startRow = Math.floor(Math.random() * (fieldSize - 1));
    let startCol = Math.floor(Math.random() * (fieldSize - 1));
    gameState.apple[0] = startRow;
    gameState.apple[1] = startCol;

    let trow = tbl.children[startRow];
    let tcol = trow.cells[startCol];
    tcol.className = 'apple';
}

window.addEventListener("keydown", moveSnake);

function moveSnake(event) {
    if (event.key === "ArrowUp") {
        snake.nextDir = [-1, 0];
        // moveHead();
    } else if (event.key === "ArrowDown") {
        snake.nextDir = [1, 0];
        // moveHead();
    } else if (event.key === "ArrowRight") {
        snake.nextDir = [0, 1];
        // moveHead();
    } else if (event.key === "ArrowLeft") {
        snake.nextDir = [0, -1];
        // moveHead();
    }
}

let a = gameState.apple;
let gameOver = false;

let trow;
let tcol;
let test;

let gamePlay = setInterval(function() {

    // Game Play
    if (gameOver) {
        alert("GAME OVER");
        clearInterval(gamePlay);
    }
    if (gameStarted) {
        moveHead();

        trow = tbl.children[a[0]];
        tcol = trow.cells[a[1]];
        if (tcol.className != "apple") {
            relocateApple(); // apple: [11, 8]
        }
        if (snake.body[0][0] >= (fieldSize - 1) || snake.body[0][1] >= (fieldSize - 1) || snake.body[0][0] <= 0 || snake.body[0][1] <= 0) {
            gameOver = true;
            gameStarted = false;
        }
    }

}, 1000);