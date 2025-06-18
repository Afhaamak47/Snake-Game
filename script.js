// Game variables
const start = document.getElementById("start");
const stop = document.getElementById("pause");
const reset = document.getElementById("reset");
const text = document.getElementById("text");
const snakeSize = 10;
const snakeSpeed = 10;
let score = 0;
let snake = [{ x: 500, y: 300 }];
let food = { x: 200, y: 200 };
let dx = 30;
let dy = 0;
let running = false;
// Creating snake game using js
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const display = document.getElementById("score");
// Function to draw snake
function rectdraw(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, snakeSize, snakeSize);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  rectdraw(food.x, food.y, "red"); // Draw food
  snake.forEach((part) => rectdraw(part.x, part.y, "green")); // Draw snake
}

function snakemove() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head); // Add new head
  if (head.x === food.x && head.y === food.y) {
    generatefood(); // Generate new food
    score++;
    display.innerHTML = "Score: " + score;
    if (score % 5 === 0 && speed > 40) {
      speed -= 10; // Increase speed by reducing delay
    }
  } else {
    snake.pop(); // Remove last part of snake
  }
  if (
    head.x === 0 ||
    head.x === canvas.width - snakeSize ||
    head.y === 0 ||
    head.y === canvas.height - snakeSize
  ) {
    running = false;
    document.getElementById("over").innerHTML = "Game Over!";
  }
}

function generatefood() {
  food.x =
    Math.floor((Math.random() * (canvas.width - snakeSize)) / snakeSize) *
    snakeSize;
  food.y =
    Math.floor((Math.random() * (canvas.height - snakeSize)) / snakeSize) *
    snakeSize;
}

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      dx = 0;
      dy = -snakeSpeed;
      break;
    case "ArrowDown":
      dx = 0;
      dy = snakeSpeed;
      break;
    case "ArrowLeft":
      dx = -snakeSpeed;
      dy = 0;
      break;
    case "ArrowRight":
      dx = snakeSpeed;
      dy = 0;
      break;
  }
});
let speed = 100;
function main() {
  setTimeout(() => {
    if (!running) return;
    draw();
    snakemove();
    requestAnimationFrame(main);
  }, speed);
}
main();

// If the snake hits the border

start.addEventListener("click", function () {
  if (!running) {
    running = true;
    main();
    text.style.display = "none";
    document.getElementById("over").innerHTML = "";
  }
});
stop.addEventListener("click", function () {
  running = false;
  document.getElementById("over").innerHTML = "Game paused!";
});
reset.addEventListener("click", function () {
  running = true;
  score = 0;
  snake = [{ x: 500, y: 300 }];
  food = { x: 200, y: 200 };
  dx = 30;
  dy = 0;
  display.innerHTML = "Score: " + score;
  document.getElementById("over").innerHTML = "";
  main();
});
