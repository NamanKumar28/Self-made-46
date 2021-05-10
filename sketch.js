
var mouse,mouseImage,score,gameState = "play"
function preload(){  
roomImage = loadImage("Images/room.jpg")
CheeseImage = loadImage("Images/Cheese.png")
mouseRunningImage = loadAnimation("Images/Mouse1.png","Images/Mouse2.png","Images/Mouse3.png")
mouseStillImage = loadAnimation("Images/death.png")
ob1 = loadImage("Images/obstacle1.png")
ob2 = loadImage("Images/obstacle2.png")
restartImage = loadImage("Images/restart.png")
crunch = loadSound("crunch.mp3")
}

function setup() { 
  createCanvas(1200,600);
  room = createSprite(600,200)
  room.addImage(roomImage);
  room.scale = 2
 // room.x = room.width/2
  room.velocityX = -10
  restart = createSprite(560,140);
  restart.addImage(restartImage); 
  restart.scale = 0.7
  restart.visible = false;
  mouse = createSprite(100, 500, 50, 50);
  mouse.addAnimation("running",mouseRunningImage)
  mouse.addAnimation("standing",mouseStillImage);
  score = 0;
  mouse.setCollider("rectangle",17,0,100,50)
  cheeseGroup = new Group()
  obstaclesGroup = new Group()
}

function draw() {
  background(0); 
 
  if(gameState === "play"){
    if(keyDown(UP_ARROW) && mouse.y >370){
      mouse.y = mouse.y-10 
    } 
    if(keyDown(DOWN_ARROW) && mouse.y <558){
      mouse.y = mouse.y+10 
    } 
  if(room.x <250){
    room.x = 950
    if(score === 10){
      room.velocityX = -14
     }
     if(score === 20){
      room.velocityX = -18
     }
     if(score === 30){
      room.velocityX = -22
     }
     if(score === 40){
      room.velocityX = -26
     }
     if(score === 40)
      room.velocityX = -30
  }

  Spawncheese();
   for (var index = 0; index < cheeseGroup.length; index++) {

     if(mouse.isTouching(cheeseGroup.get(index))){
       score = score + 2
       cheeseGroup.get(index).destroy()
       crunch.play();
    }
 }
 spawnObstacles();

 if(mouse.isTouching(obstaclesGroup)){
    gameState = "end"
 }
  } else if(gameState === "end"){
    obstaclesGroup.destroyEach()
    restart.visible = true;
    room.velocityX = 0;
    cheeseGroup.destroyEach()
    mouse.changeAnimation("standing",mouseStillImage);
    mouse.scale =0.5;
  }

  
   
if(mousePressedOver(restart)){
  gameState = "play"
  score = 0;
  restart.visible = false;
  mouse.scale = 1;
  mouse.changeAnimation("running",mouseRunningImage)
  room.velocityX = -10
}

  drawSprites();
  textSize (18)
  text("Score :" +  score, 1100,50)
  fill ("black");
  text(mouseX + ' ' + mouseY, mouseX, mouseY) 
}


function Spawncheese(){
  if (frameCount % 100 === 0) {
    cheese = createSprite(1200,0,10,21)
    cheese.addImage(CheeseImage);
    cheese.scale = 0.15
    cheese.y = Math.round(random(350,580))
    cheese.velocityX = -4
    cheese.lifetime = 300
    cheeseGroup.add(cheese)
  }
  
}
function spawnObstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(1200,0,10,40);
    obstacle.y = Math.round(random(350,580))
    obstacle.velocityX = -4
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(ob1);
              break;
      case 2: obstacle.addImage(ob2);
              break;

      
    }
   
    
    obstacle.scale = 0.6
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}