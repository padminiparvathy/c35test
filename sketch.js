var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database,position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(800,700);

  balloon=createSprite(250,450,500,500);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.3;

  var balloonPosition=database.ref('balloon/position');
  balloonPosition.on("value",readPosition,showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);
if(position!==undefined){
  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    updateHeight(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    updateHeight(1,0);
  }
  else if(keyDown(UP_ARROW)){
    
    //write code to move air balloon in up direction
    updateHeight(0,-10);
    balloon.scale=balloon.scale+0.01;
    balloon.addAnimation("hotAirBalloon",balloonImage2);

  }
  else if(keyDown(DOWN_ARROW)){
    
    //write code to move air balloon in down direction
    updateHeight(0,10);
    balloon.scale=balloon.scale-0.01;
    balloon.addAnimation("hotAirBalloon",balloonImage2);

  }
}
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updateHeight(x,y){
  database.ref('balloon/position').set({
    'x': position.x + x ,
    'y':position.y + y
  })
  }

function readPosition(data){
  position=data.val();
  console.log(position.x);
  balloon.x=position.x;
  balloon.y=position.y;
}

function showError(){
  console.log("Error in writing to the database");
}


