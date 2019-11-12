let canvas;
let canvasWidth = 600;
let canvasHeight = 400;

function setup(){
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position(windowWidth/2 - canvasWidth/2, 20);
}
function draw(){
  background(255,255,255);
  fill(0);
  textAlign(CENTER);
  drawSprites();
}
function mousePressed(){
  var s =createSprite(mouseX,mouseY,30,30);
}
