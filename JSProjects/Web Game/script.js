const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
const paddleHeight = 100;
const paddleWidth = 10;
let paddle1Y = canvas.height / 2 - paddleHeight / 2;
let paddle2Y = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 10;
let score = 0;
let highScore = 0;

// Variables to track which keys are being pressed
let upPressed = false;
let downPressed = false;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.closePath();

  ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

function updateScoreDisplay() {
  document.getElementById("highScoreValue").textContent = highScore;
}

function update() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (score > highScore) {
    highScore = score;
  }

  if (ballY < 0 || ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  if (
    (ballX < paddleWidth &&
      ballY > paddle1Y &&
      ballY < paddle1Y + paddleHeight) ||
    (ballX > canvas.width - paddleWidth &&
      ballY > paddle2Y &&
      ballY < paddle2Y + paddleHeight)
  ) {
    ballSpeedX = -ballSpeedX;
    score++;
  }

  // Reset ball position and update score if ball goes out of bounds
  if (ballX < 0 || ballX > canvas.width) {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    score = 0;
    updateScoreDisplay(); // Update the score display
  }

  let paddle2YCenter = paddle2Y + paddleHeight / 2;
  if (paddle2YCenter < ballY - 35) {
    paddle2Y += paddleSpeed;
  } else if (paddle2YCenter > ballY + 35) {
    paddle2Y -= paddleSpeed;
  }

  // Update paddle position based on key presses
  if (upPressed && paddle1Y > 0) {
    paddle1Y -= paddleSpeed;
  }
  if (downPressed && paddle1Y < canvas.height - paddleHeight) {
    paddle1Y += paddleSpeed;
  }

  // Update the score display
  updateScoreDisplay();
}

function gameLoop() {
  update();
  draw();
}

setInterval(gameLoop, 1000 / 60);

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    upPressed = true;
  } else if (event.key === "ArrowDown") {
    downPressed = true;
  }
});

document.addEventListener("keyup", function (event) {
  if (event.key === "ArrowUp") {
    upPressed = false;
  } else if (event.key === "ArrowDown") {
    downPressed = false;
  }
});
