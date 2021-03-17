var monkey;
var monkey_running;
var monkey_collided;
var ground;
var bacground,bg_anime;
var banana,banana_anime;

var obstacle,obstacle_anime,obstacleGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;
var BananasGroup;

var gameOver,gameOverImg;
function preload(){
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","  sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png");
  
  monkey_collided=loadImage("sprite_8.png");
  
  banana_anime=loadImage("banana.png");
  obstacle_anime = loadImage("obstacle.png");
  
  bg_anime=loadAnimation("jungle_image.jpg");
  
  gameOverImg = loadImage("game_over.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
  
  monkey = createSprite(50,300,30,30);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,400,400,10);

  bacground = createSprite(230,235);
  bacground.addAnimation("anime",bg_anime);
  bacground.scale = 1.5;
  
  BananasGroup = new Group();
  obstacleGroup = new Group();
  
  gameOver = createSprite(200,230);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1.7;
}

function draw() {
  background("white");
  
  fill("blue");
  text("Score: "+ score,0,30);
  
  fill("green");
  text("Monkey has escaped from the zoo, help him run away",80,30);
  
  ground.visible = false;
  
 if(gameState === PLAY){
   spawnObstacles();
   spawnBanana();
   bacground.velocityX = -3;
   gameOver.visible = false;
   
   if (bacground.x < 150){
      bacground.x = bacground.width/2;
    }
   
   if(keyDown("space")&& monkey.y>=120){ 
     monkey.velocityY = -12;
    }
   if(BananasGroup.isTouching(monkey)){
   score= score+2;
   BananasGroup.destroyEach();
    }
   if(obstacleGroup.isTouching(monkey)){
      gameState = END;
   }
 } else if(gameState === END){
     gameOver.visible = true;
     monkey.visible = false;
     score = 0;
     obstacleGroup.destroyEach();
     BananasGroup.destroyEach();
   if(mousePressedOver(gameOver)) {
      reset();
    }
 }

  monkey.velocityY = monkey.velocityY+0.5;
  monkey.collide(ground);
  monkey.depth = monkey.depth+1;
  
  drawSprites();
}

function spawnBanana(){
  if(frameCount%80===0){
    banana = createSprite(400,250,20,20);
    BananasGroup.add(banana);
    banana.velocityX = -4;
    banana.y = Math.round(random(120,200));
    banana.addImage("anime",banana_anime);
    banana.scale = 0.1;
    banana.lifetime = 100;
  }
 
}

function spawnObstacles(){
  if(frameCount%110===0){
    obstacle = createSprite(400,380);
    obstacle.velocityX = -4;
    obstacle.addImage("anime",obstacle_anime);
    obstacle.scale = 0.3;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  monkey.visible = true;
  score = 0;
}



