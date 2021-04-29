let width;
let height;
let fps;
let tileSize;
let canvas;
let ctx;
let snake;
let food;
let score;
let isPaused;
let interval;

window.addEventListener("load", () => {
  game();
});

window.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();
    isPaused = !isPaused;
    showPaused();
  } else if (e.key === "ArrowUp"){
    e.preventDefault();
    if (snake.velY != 1 && snake.x >= 0 && snake.x <= width && snake.y >= 0 && snake.y <= height) {
      snake.dir(0, -1);
    }; 
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (snake.velY != 1 && snake.x >= 0 && snake.x <= width && snake.y >= 0 && snake.y <= height) {
      snake.dir(0, 1);
    }; 
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    if (snake.velX != 1 && snake.x >= 0 && snake.x <= width && snake.y >= 0 && snake.y <= height) {
      snake.dir(-1, 0);
    };
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    if (snake.velX != 1 && snake.x >= 0 && snake.x <= width && snake.y >= 0 && snake.y <= height) {
      snake.dir(1, 0);
    };
  };
});



// create array of possible food colors - randomize to create food color
function game() {
  init();
  interval = setInterval(update, 1000 / fps);
};

function init() {
  tileSize = 20;
  width = (tileSize * Math.floor(window.innerWidth / tileSize)) / 1.25;
  height = (tileSize * Math.floor(window.innerHeight / tileSize)) / 1.25;

  fps = 10;

  canvas = document.getElementById("snake-canvas")
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext("2d");

  score = 0;
  isPaused = false;

  food = new Food(spawnLocation(), randColor())
  snake = new Snake({x: tileSize * Math.floor(width / (2 * tileSize)), y: tileSize * Math.floor(height / (2 * tileSize))}, "#127327")
};

function update() {
  if (isPaused) {
    return; 
  };

  if (snake.dead()) {
    alert("Aw, you suck!");
    clearInterval(interval);
    window.location.reload();
  };

  snake.border();

  if (snake.eat()) {
    food = new Food(spawnLocation(), randColor())
    score += 10;
  };

  ctx.clearRect(0, 0, width, height);
  food.draw();
  snake.draw();
  snake.move();
  showScore();

};

function spawnLocation() {
  let rows = width / tileSize;
  let columns = height / tileSize;

  let xPos, yPos;

  xPos = Math.floor(Math.random() * rows) * tileSize;
  yPos = Math.floor(Math.random() * columns) * tileSize;

  return { x: xPos, y: yPos};
};

function showScore() {
  ctx.textAlign = "center";
  ctx.font = "25px 'Press Start 2P'";
  ctx.fillStyle = "black";
  ctx.fillText("SCORE: " + score, width - 120, 30);
}

function showPaused() {
  ctx.textAlign = "center";
  ctx.font = "35px 'Press Start 2P'";
  ctx.fillStyle = "black";
  ctx.fillText("PAUSED", width / 2, height / 2);
}

const randColor = () => {
  let colors = ["#E03D1A", "#E06E1A", "#E0CE1A", "#44E01A", "#1A85E0","#1A62E0", "#6C1AE0"];
  let index = Math.floor(Math.random()*colors.length)
  return colors[index];
}