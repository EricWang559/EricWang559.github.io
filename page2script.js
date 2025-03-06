document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("snakeCanvas");
    const ctx = canvas.getContext("2d");
    const scoreDisplay = document.getElementById("score");
    const startButton = document.getElementById("startButton");
  
    const grid = 20;
    const canvasSize = canvas.width; // assuming canvas is 400px wide
    let count = 0;
    let score = 0;
  
    // Snake object with starting position, velocity, cells, and current length
    let snake = {
      x: grid * 5,
      y: grid * 5,
      dx: grid,
      dy: 0,
      cells: [],
      maxCells: 4,
    };
  
    // Apple object (its position will be randomized)
    let apple = { x: 0, y: 0 };
  
    // Return a random integer between min (inclusive) and max (exclusive)
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
  
    // Place the apple at a random grid cell
    function placeApple() {
      apple.x = getRandomInt(0, canvasSize / grid) * grid;
      apple.y = getRandomInt(0, canvasSize / grid) * grid;
    }
  
    // Reset game to its initial conditions
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
  
    // Main game loop
    function gameLoop() {
      requestAnimationFrame(gameLoop);
  
      // Slow down the loop for game speed control
      if (++count < 4) return;
      count = 0;
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Move the snake
      snake.x += snake.dx;
      snake.y += snake.dy;
  
      // Wrap snake position if it goes off canvas
      if (snake.x < 0) snake.x = canvas.width - grid;
      else if (snake.x >= canvas.width) snake.x = 0;
      if (snake.y < 0) snake.y = canvas.height - grid;
      else if (snake.y >= canvas.height) snake.y = 0;
  
      // Insert new head position at the beginning of the cells array
      snake.cells.unshift({ x: snake.x, y: snake.y });
      // Remove the tail cell if we've exceeded the allowed length
      if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
      }
  
      // Draw the apple
      ctx.fillStyle = "red";
      ctx.fillRect(apple.x, apple.y, grid - 1, grid - 1);
  
      // Draw snake and check for collisions
      ctx.fillStyle = "green";
      snake.cells.forEach((cell, index) => {
        ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);
  
        // Check if snake eats the apple
        if (cell.x === apple.x && cell.y === apple.y) {
          snake.maxCells++;
          score++;
          scoreDisplay.textContent = "Score: " + score;
          placeApple();
        }
  
        // Check for collision with self (skip the head)
        for (let i = index + 1; i < snake.cells.length; i++) {
          if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            resetGame();
            break;
          }
        }
      });
    }
  
    // Listen for arrow key presses using modern `e.key`
    document.addEventListener("keydown", (e) => {
      //console.log("Key pressed:", e.key); // Log the key pressed
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
  
    // Start the game when Start Game button is clicked
    startButton.addEventListener("click", () => {
      resetGame();
      gameLoop();
      startButton.disabled = true; // Disable start button to prevent multiple game loops
    });
  });
  