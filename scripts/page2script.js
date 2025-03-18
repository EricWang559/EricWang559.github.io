document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const startScreen = document.getElementById("startScreen");
  const gameScreen = document.getElementById("gameScreen");
  const endScreen = document.getElementById("endScreen");

  const canvas = document.getElementById("snakeCanvas");
  const ctx = canvas.getContext("2d");
  const scoreDisplay = document.getElementById("score");
  const finalScoreDisplay = document.getElementById("finalScore");

  const startButton = document.getElementById("startButton");
  const playAgainButton = document.getElementById("playAgainButton");

  // Settings inputs on start screen
  const playerColorInput = document.getElementById("playerColor");
  const gameSpeedInput = document.getElementById("gameSpeed");

  // Settings inputs on game screen
  const playerColorGameInput = document.getElementById("playerColorGame");
  const gameSpeedGameInput = document.getElementById("gameSpeedGame");
  const updateSettingsButton = document.getElementById("updateSettings");

  // Game variables
  const grid = 20;
  const canvasSize = canvas.width;
  let count = 0;
  let score = 0;
  let gameRunning = false;
  let animationFrameId; // for canceling animation if needed

  // User settings
  let snakeColor = "#008000";
  let speedFactor = 4;

  // Snake object
  let snake = {
    x: grid * 5,
    y: grid * 5,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
  };

  // Apple object
  let apple = { x: 0, y: 0 };

  // Prevent default scrolling on arrow keys
  document.addEventListener("keydown", (e) => {
    const keys = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown", " "];
    if (keys.includes(e.key)) {
      e.preventDefault();
    }
  });

  // Helper: Get random integer between min and max
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Place the apple randomly on the grid
  function placeApple() {
    apple.x = getRandomInt(0, canvasSize / grid) * grid;
    apple.y = getRandomInt(0, canvasSize / grid) * grid;
  }

  // Reset game state
  function resetGame() {
    snake.x = grid * 5;
    snake.y = grid * 5;
    snake.dx = grid;
    snake.dy = 0;
    snake.cells = [];
    snake.maxCells = 4;
    score = 0;
    scoreDisplay.textContent = "Score: " + score;
    placeApple();
  }

  // End the game
  function endGame() {
    gameRunning = false;
    cancelAnimationFrame(animationFrameId);
    gameScreen.style.display = "none";
    endScreen.style.display = "flex";
    finalScoreDisplay.textContent = "Your score was: " + score;
  }

  // Game loop (only runs when gameRunning is true)
  function gameLoop() {
    animationFrameId = requestAnimationFrame(gameLoop);
    if (!gameRunning) return;

    // Control speed
    if (++count < speedFactor) return;
    count = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move snake head
    snake.x += snake.dx;
    snake.y += snake.dy;

    // Check wall collisions
    if (
      snake.x < 0 ||
      snake.x >= canvas.width ||
      snake.y < 0 ||
      snake.y >= canvas.height
    ) {
      endGame();
      return;
    }

    // Add new head position to cells array
    snake.cells.unshift({ x: snake.x, y: snake.y });
    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop();
    }

    // Draw apple
    ctx.fillStyle = "red";
    ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    // Draw snake and check for apple collision and self-collision
    ctx.fillStyle = snakeColor;
    snake.cells.forEach((cell, index) => {
      ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);

      // Check if snake eats apple
      if (cell.x === apple.x && cell.y === apple.y) {
        snake.maxCells++;
        score++;
        scoreDisplay.textContent = "Score: " + score;
        placeApple();
      }

      // Check self-collision
      for (let i = index + 1; i < snake.cells.length; i++) {
        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
          endGame();
          return;
        }
      }
    });
  }

  // Handle keyboard input for snake movement
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        if (snake.dx === 0) {
          snake.dx = -grid;
          snake.dy = 0;
        }
        break;
      case "ArrowUp":
        if (snake.dy === 0) {
          snake.dy = -grid;
          snake.dx = 0;
        }
        break;
      case "ArrowRight":
        if (snake.dx === 0) {
          snake.dx = grid;
          snake.dy = 0;
        }
        break;
      case "ArrowDown":
        if (snake.dy === 0) {
          snake.dy = grid;
          snake.dx = 0;
        }
        break;
    }
  });

  // Start button event listener (from start screen)
  startButton.addEventListener("click", () => {
    // Get settings from start screen
    snakeColor = playerColorInput.value || "#008000";
    speedFactor = parseInt(gameSpeedInput.value, 10);
    if (isNaN(speedFactor) || speedFactor < 1) {
      speedFactor = 4;
    }
    // Also set game screen inputs to match
    playerColorGameInput.value = snakeColor;
    gameSpeedGameInput.value = speedFactor;

    startScreen.style.display = "none";
    gameScreen.style.display = "flex";
    endScreen.style.display = "none";

    resetGame();
    gameRunning = true;
    // Start the game loop now that the game has started
    requestAnimationFrame(gameLoop);
  });

  // Update settings on the game screen if changed during the game
  updateSettingsButton.addEventListener("click", () => {
    snakeColor = playerColorGameInput.value || "#008000";
    speedFactor = parseInt(gameSpeedGameInput.value, 10);
    if (isNaN(speedFactor) || speedFactor < 1) {
      speedFactor = 4;
    }
  });

  // Play again button event listener (from end screen)
  playAgainButton.addEventListener("click", () => {
    endScreen.style.display = "none";
    startScreen.style.display = "flex";
  });
});
