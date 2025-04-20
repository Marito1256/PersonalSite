const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var gridSize = 30; // 30x30
const canvasWidth = canvas.width;
console.log('Canvas Width '+canvasWidth);
const canvasHeight = canvas.height;
console.log('Canvas Height '+canvasHeight);
var cellSize = canvasWidth/gridSize;
console.log('Cell Size '+cellSize);
var rows = 20;
var cols = 20;
console.log('rows: ' + rows + ' cols: ' + cols);
var speed = 20; // updates 20 times per second
  // Draw a filled rectangle
ctx.fillStyle = 'red'; // color
for(var i = 0; i<30;i++){
    ctx.fillRect(i*cellSize, i*cellSize, cellSize, cellSize);
}
function draw(){

}
function update(){
    
    draw();
}
function gameLoop(){
    update();
    selfTimeout(gameLoop, 1000 / speed);
}
document.addEventListener('keydown', (e)=>{
    if(e.key === "ArrowRight"){
        ctx.fillStyle = 'lime';
        ctx.fillRect(50, 50, 100, 100)
    }
});
console.log('filled it in?');
