let canvas;
let canvasWidth = 600;
let canvasHeight = 400;
var MAX_SPEED = 10;
var w,s
function setup(){
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position(windowWidth/2 - canvasWidth/2, 20);
}
function draw(){
  background(255,255,255);
  fill(0);
  textAlign(CENTER);
  w = createSprite(0,200,10,400);
  s =createSprite(mouseX,mouseY,30,30);
  print("bounce");

  drawSprites();
}
function mousePressed(){

  s.velocity.x = random(-5, 5);
  s.velocity.y = random(-5, 5);
  s.bounce(w);
  if(s.bounce(w)){

    s.velocity.x=s.velocity.x*-1;
    s.velocity.y*=s.velocity.y*-1;
  }
  }
