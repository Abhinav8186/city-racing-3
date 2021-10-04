var path, mainCyclist;
var player1, player2, player3;
var pathImg, mainRacerImg1, mainRacerImg2;
var a1, a2, a3, car;
var oppPink1Img, oppPink2Img;
var oppYellow1Img, oppYellow2Img;
var oppRed1Img, oppRed2Img;
var gameOverImg, cycleBell;
var myTimeout
var pinkCG, yellowCG, redCG;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance = 0;
var gameOver, restart;

function preload() {
  go = loadImage("images/accl.png")
  go1 = loadImage("images/press.png")
  left = loadImage("images/left.png")
  right = loadImage("images/right.png")
  pathImg = loadImage("images/road.png");
  car1 = loadImage("images/car3.png")
  car2 = loadImage("images/1.png")
  car3 = loadImage("images/454.png")
  car4 = loadImage("images/car1.png")
  gameOverImg = loadImage("images/gameOver.png");
  horn = loadSound("sound/car horn.mp3")
  engine = loadSound("sound/MARTIN GARRIX.mp3")
  restart = loadImage("images/RESTART.jpg")
}

function setup() {
  engine.loop();
  //chalo.loop();
  createCanvas(1536, 730);
  // Moving background


  path = createSprite(500, 360);
  path.addImage(pathImg);

  bot1 = new Group();
  bot2 = new Group();
  bot3 = new Group();

  car = createSprite(200, 380)
  car.addImage(car1)
  car.scale = 0.4

  accel = createSprite(200,600)
  accel.addImage(go)
  accel.scale = 0.9
  accel.visible=0

  //creating boy running
  l = createSprite(1300,600)
  l.addImage(left)
  l.scale=0.5
  l.visible=0

  d = createSprite(1100,600)
  d.addImage(right)
  d.scale=0.5
  d.visible=0



  /*nitro = createSprite(40,380)
  nitro.addImage(nos)
  nitro.scale = 0.2
  nitro.visible = 0
  */
  wall = createSprite(750, 700, 10000)
  wall.visible = 0
  wall1 = createSprite(750, 50, 10000)
  wall1.visible = 0

  r = createSprite(750, 500);
  r.addImage(restart);
  r.scale = 0.9;
  r.visible = false;

  gameOver = createSprite(750, 250);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;


}

function draw() {
  background(0);

  drawSprites();
  textSize(40);
  fill("grey");
  stroke(4)
  text("METRES YOU DROVE =  " + distance, 500, 30);
  fill("white")
  path.velocityX = -(6 + 4 * distance / 150);
  car.collide(wall)
  car.collide(wall1)

if(gameState === PLAY) {

      //nitro.y = car.y
      path.velocityX = -9;

      bot1.collide(bot3)
      bot1.collide(bot2)
      bot2.collide(bot1)
      bot2.collide(bot3)
      bot3.collide(bot1)
      bot3.collide(bot2)


     /* if (distance == 999) {
        gameState = END
      }*/
      //camera.position.x = car.x  


      //code to reset the background
      if (path.x < 400) {
        path.x = width / 1;
      }

      //code to play cycle bell sound
      if((touches.length > 0 || keyDown("left"))) {
        car.y = car.y - 20
        //car.velocityY = -20 
      }
      if((touches.length > 0 || keyDown("right"))) {
        car.y = car.y + 20
        //car.velocityY = 20 
 
      }
      if (keyDown("space")) {
        horn.play()
      }

      if((touches.length > 0 || keyDown("up"))) {
        accel.addImage(go1) 
        bot2.velocityX = -8
        path.velocityX = -9 * 9
      } else {
        accel.addImage(go) 

        path.velocityX = -45
        //nitro.visible = 0
        bot2.velocityX = -6
      }
      touches = [];
            // nitro.visible = 1
      distance = distance + Math.round(getFrameRate() / 50);


      //creating continous opponent players
      if (frameCount % 300 == 0) {
        c1();
      }
      if (frameCount % 700 == 0) {
        c2();
      }
      if (frameCount % 500 == 0) {
        c3();
      }

      if (car.isTouching(bot1)) {
        gameState = END
      }
      if (car.isTouching(bot2)) {
        gameState = END
      } 
      if (car.isTouching(bot3)) {
        gameState = END
      } 
  
  } else if (gameState === END) {
    r.visible = true
    fill("yellow")
    textSize(80)
    text("Game Over", 580, 300)
    
    /*text("GREAT ONES BREAK RECORDS", 500, 350)
    text(" CHANGE THE GAME", 620, 410)
    fill("red")
    text("ACES", 500, 410)
    text("~Anonymous Driver", 500, 460)*/


    //chalo.stop();


    path.velocityX = 0;



    bot1.setVelocityXEach(0);

    bot2.setVelocityXEach(0);

    bot3.setVelocityXEach(0);

    if (mousePressedOver(r) || touches.length > 0 ) {
      reset();
    }
  }
}
function c1() {
  a1 = createSprite(1800, random(50, 650))
  a1.addImage(car2);
  a1.scale = 0.6
  a1.velocityX = -20
  a1.collide(wall)
  a1.collide(wall1)
  a1.lifetime = 400
  bot1.add(a1);
  a1.depth = accel.depth
  accel.depth = a1.depth + 1  



}
function c2() {
  a2 = createSprite(1800, random(50, 650))
  a2.addImage(car3);
  a2.scale = 0.4 
  a2.velocityX = -30
  a2.collide(wall)
  a2.collide(wall1)
  a2.lifetime = 400
  bot2.add(a2);
  a2.depth = accel.depth
  accel.depth = a2.depth + 1  
  
  a2.depth = d.depth
  d.depth = a2.depth + 1
}
function c3() {
  a3 = createSprite(1800, random(50, 650))
  a3.addImage(car4);
  a3.scale = 0.5 
  a3.velocityX = -30
  a3.collide(wall)
  a3.collide(wall1)
  a3.lifetime = 400
  bot3.add(a3);
  a3.depth = accel.depth
  accel.depth = a3.depth + 1  
  
  a3.depth = d.depth
  d.depth = a3.depth + 1
}



function reset() {
  gameState = PLAY;
  r.visible = false;
  gameOver.visible = false;


  bot1.destroyEach();
  bot2.destroyEach();
  bot3.destroyEach();

  distance = 0;
}
