var PLAY = 1;
var END = 0;
var gameState = PLAY;


var boy, boyImage,boyCollide;
var ground, groundImage;
var coinGroup, barrierGroup;
var coin, coinImage;
var barrier1,barrier2,barrier3;
var gameOver,restart;
var gameOverImage,restartImage;
var score;


function preload()
{
    boyImage = loadAnimation("boy1.png","boy2.png","boy3.png",
    "boy4.png","boy5.png","boy6.png","boy7.png","boy8.png","boy9.png","boy10.png","boy11.png");
    boyCollide = loadAnimation("boycollider.png");
    groundImage= loadImage("ground.png");

    coinImage = loadImage ("coin.png");
    barrier1 = loadImage ("barrier1.png")
    barrier2 = loadImage ("barrier2.png")
    barrier3 = loadImage ("barrier3.png")

    

    gameOverImage = loadImage("gameover.png")
    restartImage = loadImage("restart.png")

}
function setup(){
    createCanvas(600, 200);

    //boy
    boy = createSprite(50,130,20,50);
    boy.addAnimation("boy",boyImage);
    boy.addAnimation("boycollide",boyCollide);
    boy.scale= 0.180;
    
    
    //ground
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -2;

    gameOver = createSprite(300,60);
    gameOver.addImage(gameOverImage);
    gameOver.scale = 0.3; 
    
    restart = createSprite(300,120);
    restart.addImage(restartImage);
    restart.scale = 0.3;
    
   

    coinGroup = new Group();
    barrierGroup = new Group();

    score = 0;
   
}
function draw()
{
    background("black");
    

     //displaying score
  text("Score: "+ score, 500,50);

  if(gameState === PLAY){

  gameOver.visible = false;
  restart.visible = false;
  if (ground.x<0){
    ground.x = ground.width/2;
  }

if(keyDown("space") && boy.y>=100) {
    boy.velocityY = -10;
  }
  boy.velocityY = boy.velocityY + 0.8;
  boy.collide(ground);

  spawnCoins ();
  spawnBarrier();
  boy.changeAnimation("boy", boyImage);
  if(boy.isTouching(coinGroup)) {
    coinGroup.destroyEach();
    score = score + 1;

  }

  if(boy.isTouching(barrierGroup)) {
   gameState = END;
     
  
  }

 }
  

    
       else if(gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
        
        ground.velocityX = 0;
        //boy.velocityY = 0;

         //change the boy animation
        boy.changeAnimation("boycollide",boyCollide);

        coinGroup.setLifetimeEach(-1);
        barrierGroup.setLifetimeEach(-1);

        coinGroup.setVelocityXEach(0);
        barrierGroup.setVelocityXEach(0);  
         
        if(mousePressedOver(restart)) {
          reset();
        }
       }

      
       
    //  boy.setCollider("rectangle",0,0,boy.width,boy.height); 

     drawSprites();
      }

      function reset(){
        gameState = PLAY
        gameOver.visible = false;
        restart.visible = false;

        coinGroup.destroyEach();
        barrierGroup.destroyEach();
         
        score = 0;

      }

function spawnCoins ()
{
    if (frameCount % 180 === 0) {
        coin = createSprite(600,100,40,10);
        coin.addImage(coinImage)
        coin.y = Math.round(random(10,60))
        coin.scale = 0.01;
        coin.velocityX = -3;
        coin.lifetime=200;
        //adjust the depth
        coin.depth = boy.depth
        boy.depth = boy.depth + 1;

       coinGroup.add(coin);
        }
}

function spawnBarrier ()
{
    if (frameCount % 290 === 0){
        var barrier = createSprite(400,165,10,40);
        barrier.velocityX = -4;
     
        
         // //generate random obstacles
         var rand = Math.round(random(1,3));
         switch(rand) {
           case 1: barrier.addImage(barrier1);
                   break;
           case 2: barrier.addImage(barrier2);
                   break;
           case 3: barrier.addImage(barrier3);
           
           default: break;
         }
        
         //assign scale and lifetime to the barrier 
         barrier.scale = 0.1;
        // barrier.lifetime = 300;
        barrierGroup.add(barrier);
      }
}
