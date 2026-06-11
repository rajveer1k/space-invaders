var ship;
var flowers = [];
var drops = [];

function setup(){
  createCanvas(600, 400);
  ship = new Ship();
  for (var i = 0; i < 6; i++){
    flowers[i] = new Flower((i*80 + 80), 60);
  }
}

function draw(){
  background(51);
  ship.show();
  ship.move();

  for (var i = 0; i < drops.length; i++){
    drops[i].show();
    drops[i].move();
    for (var j = 0; j < flowers.length; j++){
      if (drops[i].hits(flowers[j])){
        flowers[j].grow();
        drops[i].evaporate();
      }
    }
  }

  var edge = false;

  for (var f = 0; f < flowers.length; f++){
    flowers[f].show();
    flowers[f].move();
    if (flowers[f].x > width || flowers[f].x < 0){
      edge = true;
    }
  }

  if (edge){
    for (var f = 0; f < flowers.length; f++){
      flowers[f].shiftDown();
    }
  }

  for (var i = drops.length - 1; i >= 0; i--){
    if (drops[i].toDelete){
      drops.splice(i, 1);
    }
  }

  // NEW: delete flowers that have been hit 5 times
  for (var i = flowers.length - 1; i >= 0; i--){
    if (flowers[i].toDelete){
      flowers.splice(i, 1);
    }
  }
}

function keyReleased(){
  if (key != ' '){
    ship.setDir(0);
  }
}

function keyPressed(){
  if (key === ' '){
    var drop = new Drop(ship.x, height);
    drops.push(drop);
  }
  if (keyCode === RIGHT_ARROW){
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW){
    ship.setDir(-1);
  }
}
