
var backgroundImage;
var spaceship, spaceship_img;
var asteroid, asteroidGroup;
var laser, laserGroup;
var shield;
var powerUp;
var score = 0;
const SPACE = 32;

var  lives = 5

function preload() {
  backgroundImage = loadImage("background.jpg");
  spaceship_img = loadImage("spaceshipimg.png");
  asteroidimg = loadImage("asteroid.png");
  laserimg = loadImage("laser.png");
  shieldimg = loadImage("shield.png");
  powerUpimg = loadImage("powerup.png");


}



function setup() {
  createCanvas(800, 600);
  spaceship = createSprite(100, 300, 40, 40);
  spaceship.addImage(spaceship_img);
  spaceship.color = "white";
  spaceship.scale = 0.3;
  asteroidGroup = createGroup()
  laserGroup = createGroup()
  shield = createSprite(700,501,40,40)
  shield.addImage(shieldimg)
  shield.scale = 0.5

  // laser = createSprite(spaceship.x, spaceship.y)
  // laser.addImage(laserimg)
  // laser.scale = 0.1;
  // laser.visible = false
  // laserGroup.add(laser)
  textSize(50)
  text("Score :" + score, 550, 50)
 
  //for(i=5;i<=600;i=i+150 ){

  //}
}

function draw() {
  background(backgroundImage);

  if(asteroidGroup.overlap(laserGroup,asteroidHit)) 
 { score = score + 1}
    //laserGroup.destroyEach()
   

  if (asteroidGroup.collide(spaceship)){
      lives=lives-1
   
    asteroidGroup.destroyEach()
    

  }
if (lives===0){
  spaceship.visible=false
  //asteroidGroup.lifetimeEach(-1)
}

  asteroid()
  textSize(50)
  text("Score :" + score, 50, 450)
  text("Lives :" + lives, 5, 150)
  drawSprites();
  spaceship.debug = false

  if (keyDown(LEFT_ARROW)) {
    spaceship.y += 0;
    spaceship.x += -20;

  }

  if (keyDown(UP_ARROW)) {
    spaceship.y += -20;
    spaceship.x += 0;

  }

  if (keyDown(RIGHT_ARROW)) {
    spaceship.y += 0;
    spaceship.x += 20;

  }

  if (keyDown(DOWN_ARROW)) {
    spaceship.y += 20;
    spaceship.x += 0;
  }

  if (keyDown(SPACE)) {
    laser();
  }
  if (shield.isTouching(spaceship)){
    asteroidGroup.setVelocityYEach(3)
    
  }
}

function asteroid() {
  if (frameCount % 10 === 0) {
    var asteroid = createSprite(Math.round(random(700, 800)), Math.round(random(50, 350)), 10, 10);
    asteroid.addImage(asteroidimg)
    asteroid.color = "white";
    asteroid.scale = 0.1;
    asteroid.velocityX = -3
    asteroidGroup.add(asteroid)
    asteroid.lifetime = 200
    asteroid.debug = false
  }
}


function laser() {
  var laser = createSprite(spaceship.x + 50, spaceship.y, 10, 10);
  laser.addImage(laserimg)
  laser.scale = 0.03;
  laser.velocityX = -3
  laser.lifetime = 150
  laser.debug = false
  laser.velocityX = 3
  laserGroup.add(laser)

}

function asteroidHit(asteroid, laser) {
  laser.remove();
  asteroid.remove();
}