// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');
// var gridSize = 30; // 30x30
// const canvasWidth = canvas.width;
// console.log('Canvas Width '+canvasWidth);
// const canvasHeight = canvas.height;
// console.log('Canvas Height '+canvasHeight);
// var cellSize = canvasWidth/gridSize;
// console.log('Cell Size '+cellSize);
// var rows = 20;
// var cols = 20;
// console.log('rows: ' + rows + ' cols: ' + cols);
// var speed = 20; // updates 20 times per second
//   // Draw a filled rectangle
// ctx.fillStyle = 'red'; // color
// var direction = 'right';
// console.log('starting direction: ' + direction);
// function draw(){

// }
// function update(){
//     ctx.clearRect(0,0,canvasWidth, canvasHeight);

//     draw();
// }
// function gameLoop(){
//     update();
//     selfTimeout(gameLoop, 1000 / speed);
// }
// document.addEventListener('keydown', (e)=>{
//     if(e.key === "ArrowRight"){
//         ctx.fillStyle = 'lime';
//         ctx.fillRect(50, 50, 100, 100)
//     }
// });
// console.log('filled it in?');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const gridSize = 30;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const cellSize = canvasWidth / gridSize;
const speed = 10; // updates per second

let snake = [{ x: 5, y: 5 }];
let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };
let food = spawnFood();

function spawnFood() {
  let fx, fy;
  do {
    fx = Math.floor(Math.random() * gridSize);
    fy = Math.floor(Math.random() * gridSize);
  } while (snake.some(segment => segment.x === fx && segment.y === fy));
  return { x: fx, y: fy };
}
const gridCanvas = document.getElementById('grid');
const gridCtx = gridCanvas.getContext('2d');

function drawStaticGrid() {
  gridCtx.strokeStyle = '#222';
  gridCtx.lineWidth = .5;

  for (let x = 0; x <= gridCanvas.width; x += cellSize) {
    gridCtx.beginPath();
    gridCtx.moveTo(x, 0);
    gridCtx.lineTo(x, gridCanvas.height);
    gridCtx.stroke();
  }

  for (let y = 0; y <= gridCanvas.height; y += cellSize) {
    gridCtx.beginPath();
    gridCtx.moveTo(0, y);
    gridCtx.lineTo(gridCanvas.width, y);
    gridCtx.stroke();
  }
}
function draw() {
  // clear canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // draw snake
  ctx.fillStyle = 'blue';
  for (let segment of snake) {
    ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
  }

  // draw food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
}

function update() {
  // update direction
  direction = nextDirection;

  // move snake
  const newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };

  // collision with wall
  if (
    newHead.x < 0 || newHead.y < 0 ||
    newHead.x >= gridSize || newHead.y >= gridSize
  ) {
    endGame();
    // location.reload();
  }
  function endGame() {
  document.getElementById('message').textContent = 'Game Over!';
  document.getElementById('restart-button').style.display = 'block';
  clearTimeout(loopId); // optional if you're using setTimeout
  }

  // collision with self
  if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
    endGame();
    return;
    location.reload();
  }

  snake.unshift(newHead);

  // check food
  if (newHead.x === food.x && newHead.y === food.y) {
    food = spawnFood();
  } else {
    snake.pop(); // keep length unless eating
  }

  draw();
}

function gameLoop() {
  update();
  setTimeout(gameLoop, 1000 / speed);
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && direction.y === 0) nextDirection = { x: 0, y: -1 };
  if (e.key === 'ArrowDown' && direction.y === 0) nextDirection = { x: 0, y: 1 };
  if (e.key === 'ArrowLeft' && direction.x === 0) nextDirection = { x: -1, y: 0 };
  if (e.key === 'ArrowRight' && direction.x === 0) nextDirection = { x: 1, y: 0 };
  if (e.key === 'w' && direction.y === 0) nextDirection = { x: 0, y: -1 };
  if (e.key === 's' && direction.y === 0) nextDirection = { x: 0, y: 1 };
  if (e.key === 'a' && direction.x === 0) nextDirection = { x: -1, y: 0 };
  if (e.key === 'd' && direction.x === 0) nextDirection = { x: 1, y: 0 };
});
// gameLoop();
document.addEventListener('DOMContentLoaded', ()=>{
drawStaticGrid();
gameLoop();
});