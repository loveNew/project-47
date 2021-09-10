var player,playerImg,enemy,enemyImg,bullet,bulletImg;
var gameState = "serve";
var edges;
var invi;
var bulletGroup,enemyGroup;
var score;
var timelimit;

// i will make the reset button in the next project
// and the things that are left also

function preload(){
  playerImg = loadImage("player.png");
  enemyImg = loadImage("enemy.png");
  bulletImg = loadImage("bullet.png");
}

function setup() {
  createCanvas(1350,600);

  player = createSprite(170, 300, 50, 50);
  player.addImage(playerImg);
  player.scale = 1.5;

 invi  = createSprite(300,height/2,10000,10);
 invi.visible = false;

  bulletGroup = new Group();
  enemyGroup = new Group();

  score = 0;
  edges = createEdgeSprites();

  timelimit = 200;
}

function draw() {
background("black");

if(gameState === "serve"){
  //console.log("serve");
  textSize(25);
  fill("yellow");
   text("Press 'SPACE' to shoot.",width/3,height-500);
   text("Press arrow keys to move.",width/3,height-450);
   text("Destroy all the enemy ships within 200 seconds.",width/3,height-400);
   text("If you reached 100 score you will win.",width/3,height-350);
   text("But if you can't get 100 score under 200 seconds you will defeat.",width/3,height-300);
   text("Press 'p' to play the game.",width/3,height-250);
}

if(gameState === "play"){
 player.x = width/2;
 player.y = 500;
 gameState = "game";
}

if(gameState === "game"){
  player.collide(invi);
   spawnEnemy();
   time();
}

if(gameState === "end"){
  textSize(50);
  fill("red");
  text("😔 You lose 😔",width/3,height-200);
  text("Your score is " + score,width/3,height-300);
  text("⏱ Time over ⏱",width/3,height-400);
  player.destroy();
  enemyGroup.destroyEach();
}

if(gameState === "win"){
  textSize(50);
  fill("white");
 text("🎉😊 Yeh!! you win 😊🎉",width/3,height-300);
 text("Your score is " + score,width/3,height-200);
 player.destroy();
 enemyGroup.destroyEach();
}

if(keyDown("p") && gameState === "serve"){gameState = "play"};
if(keyDown(UP_ARROW)){player.y = player.y-5;}
if(keyDown(DOWN_ARROW)){player.y = player.y+5;}
if(keyDown(LEFT_ARROW)){player.x = player.x-10;}
if(keyDown(RIGHT_ARROW)){player.x = player.x+10;}

if(keyWentDown("space")){
  shootBullets();
}
if(keyWentUp("space")){}

if(enemyGroup.isTouching(bulletGroup)){
  for(var i = 0; i<enemyGroup.length; i++){
  if(enemyGroup[i].isTouching(bulletGroup)){
  enemyGroup[i].destroy();
  score = score + 1;
  bulletGroup.destroyEach();
 }
}
}

if(timelimit < 1){
  gameState = "end";
}

if(score > 99){
  gameState = "win";
}

 player.collide(edges);
 drawSprites();

 fill("white")
 textSize(25);
 text("Score: " +score,1100,550);
 text("Time left: " +timelimit + " seconds",width/10,height-50);

}

function spawnEnemy(){
  if(frameCount % 65 === 0){
  enemy = createSprite(Math.round(random(150,1200)),100,50,50);
  enemy.addImage(enemyImg);
  enemyGroup.add(enemy);
  }
}

function shootBullets(){
  bullet = createSprite(player.x,player.y,50,50);
  bullet.addImage(bulletImg);
  bullet.scale = 0.7;
  bullet.velocityY= -10;
  bullet.lifetime = 100;
  bulletGroup.add(bullet);
}

function time(){

if(frameCount % 50 === 0){
timelimit = timelimit - 1;
}
}