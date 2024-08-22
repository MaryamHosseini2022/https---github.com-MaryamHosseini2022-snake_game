// My Resource :: https://www.geeksforgeeks.org/create-a-snake-game-using-html-css-and-javascript/

let blockSize = 25;
let total_row = 17; //total row number
let total_col = 17; //total column number
let food_size = 15;
let food_counter = 0
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// Set the total number of rows and columns
let speedX = 0;  //speed of snake in x coordinate.
let speedY = 0;  //speed of snake in Y coordinate.

let snakeBody = [];

let foodX;
let foodY;

let stones = [];

let gameOver = false;

window.onload = function () {
    // Set board height and width
    board = document.getElementById("board");
    msgBox = document.getElementById("massage_box");
    reload_btn = document.getElementById("reload-game");
    total_food = document.getElementById("total_food");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    placeFood();
    placeStone();
    document.addEventListener("keyup", changeDirection);  //for movements

    reload_btn.addEventListener('click', () => {
        location.reload();
        return;
    })

    // Set snake speed
    setInterval(update, 2000 / 10);
    // setInterval(update, 1000 / 10);
}

function update() {
    if (gameOver) {
        msgBox.style.display = "block";
    }

    // Background of a Game
    context.fillStyle = "rgb(150,229,150)";
    context.fillRect(0, 0, board.width, board.height);

    // Set food color and position
    context.fillStyle = "rgb(2,64,2)";
    context.fillRect(foodX, foodY, food_size, food_size);

    // Set stone color and position
    context.fillStyle = "brown";
    for (let i = 0; i < stones.length; i++) {
        context.fillRect(stones[i][0], stones[i][1], food_size, food_size);
    }

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }


    // body of snake will grow
    for (let i = snakeBody.length - 1; i > 0; i--) {
        // it will store previous part of snake to the current part
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "white";
    snakeX += speedX * blockSize; //updating Snake position in X coordinate.
    snakeY += speedY * blockSize;  //updating Snake position in Y coordinate.
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0
        || snakeX > total_col * blockSize
        || snakeY < 0
        || snakeY > total_row * blockSize) {

        // Out of bound condition
        gameOver = true;
    }

    for (let i = 0; i < stones.length; i++) {

        if (snakeX == stones[i][0] && snakeY == stones[i][1]) {
            gameOver = true;
            speedX = 0;
            speedY = 0;
        }
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {

            // Snake eats own body
            gameOver = true;
        }
    }
}

// Movement of the Snake - We are using addEventListener
function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) {
        // If up arrow key pressed with this condition...
        // snake will not move in the opposite direction
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        //If down arrow key pressed
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        //If left arrow key pressed
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1) {
        //If Right arrow key pressed
        speedX = 1;
        speedY = 0;
    }
}
// Randomly place food
function placeFood() {
    // in x coordinates.
    foodX = Math.floor(Math.random() * total_col) * blockSize;
    //in y coordinates.
    foodY = Math.floor(Math.random() * total_row) * blockSize;
    food_counter += 1;
    total_food.innerHTML = food_counter - 1;
}
function placeStone() {
    for (i = 0; i < 3; i++) {
        // in x coordinates.
        stoneX = Math.floor(Math.random() * total_col) * blockSize;
        //in y coordinates.
        stoneY = Math.floor(Math.random() * total_row) * blockSize;
        stones[i] = [stoneX, stoneY];
    }
}
