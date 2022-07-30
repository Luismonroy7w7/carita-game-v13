var PLAY = 1;
var END = 0;
var gameState = PLAY;

var carita, carita_corriendo, carita_muriendo;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;

var cancion;

function preload(){
  carita_corriendo = loadAnimation("carita_zi0.png","carita_zi1.png","carita_zi2.png");
  carita_muriendo= loadAnimation("muricion0.png");
  
  groundImage = loadImage("piso2.png");
  muerte =loadSound("muerte.mp3")
  cloudImage = loadImage("nube2.png");
  cancion = loadSound("jump.mp3") ;
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  carita = createSprite(50,180,20,50);
  
  carita.addAnimation("corriendo", carita_corriendo);
  carita.addAnimation("muriendo", carita_muriendo);
  carita.scale = 0.9;
  
  ground = createSprite(200,195,400,200);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  ground.scale =1
 


  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //carita.debug = true;
  background("#f9ba24");
  text("puntuaje: "+ score, 300,30);
  //cancion.play()
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
     
    if(touches.length > 0 && trex.y  >= height -120 || keyDown("space") && carita.y >= 159) {
      carita.velocityY = -12;
      cancion.play();
      touches = [];
    }
  
    if(keyDown("UP_ARROW") && carita.y >= 159) {
      carita.velocityY = -12;
      cancion.play();
    }

    if(keyDown("W") && carita.y >= 159) {
      carita.velocityY = -12;
      cancion.play();
    }

    carita.velocityY = carita.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    carita.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(carita)){
        gameState = END;
        muerte.play();
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    //carita(300,100);
    
    //establecer velocidad para cada objeto del juego en 0
    ground.velocityX = 0;
    carita.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //cambiar la animación del trex
    carita.changeAnimation("muriendo",carita_muriendo);
    
    //establecer tiempo de vida a los objetos del juego para que nunca se destruyan.
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || mousePressedOver(restart)) {
      reset();
      touches = [];
    }
  }
  
  console.log(ground.x)
  drawSprites();
}

function spawnClouds() {
  //escribir código aquí para aparecer nubes.
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.05;
    cloud.velocityX = -3;
    
     //asignar tiempo de vida a la variable
    cloud.lifetime = 200;
    
    //ajustar la profundidad.
    cloud.depth = carita.depth;
    carita.depth = carita.depth + 1;
    
    //agregar cada nube a un grupo.
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generar obstáculos aleatorios
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //asignar tamaño y tiempo de vida al obstáculo.            
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //agregar cada obstáculo al grupo
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  //obstaclesGroup.destroyEach();
  //cloudsGroup.destroyEach();
  
  carita.changeAnimation("corriendo",carita_corriendo);
  
 
  score = 0;
  
}