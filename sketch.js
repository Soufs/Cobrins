var passarin;
var casa;
var cobras;
var vidas = 5;
var pontuacao = 0;
var estadoJogo = 0;
var titulo, button;
var Cvelocity = 5;
var perda;
var img_birb, img_sneakUp, img_snakeGo;
var img_vida5, img_vida4, img_vida3, img_vida2, img_vida1, img_vida0;
var img_button;

function preload(){
    img_birb = loadImage("assets/birb.png");

    img_snakeUp = loadImage("assets/cobraup.png");

    img_snakeGo = loadImage("assets/cobrago.png");

    img_button = loadImage("assets/startbutton.png");

    img_vida5 = loadImage("assets/coracao5.png");
    img_vida4 = loadImage("assets/coracao4.png");
    img_vida3 = loadImage("assets/coracao3.png");
    img_vida2 = loadImage("assets/coracao2.png");
    img_vida1 = loadImage("assets/coracao1.png");
    img_vida0 = loadImage("assets/coracao0.png");

}

function setup(){
    createCanvas(windowWidth - 25, windowHeight - 25);

    passarin = createSprite(width/2, height/2, 50, 50);
    passarin.shapeColor = "blue";
    passarin.addImage(img_birb);
    passarin.scale = 0.009;
    passarin.scale.x = 5;
    passarin.debug = true;

    casa = createSprite(width/2, 0, 400, 800);
    casa.shapeColor = "brown";

    vida = createSprite(150, 100, 50, 50);
    vida.addImage("vida_5", img_vida5);
    vida.addImage("vida_4", img_vida4);
    vida.addImage("vida_3", img_vida3);
    vida.addImage("vida_2", img_vida2);
    vida.addImage("vida_1", img_vida1);
    vida.addImage("vida_0", img_vida0);

    vida.scale = 0.02;

    cobras = new Group();

    titulo = createElement("h2");
    titulo.position(width/2, height/2);
    titulo.html("Start Game");
    titulo.class("customTitle");

    button = createImg("assets/startbutton.png", "ImgButton");
    button.position(width/2, height/2 + 150);
    button.class("customButton");

    imageMode(CENTER);
    angleMode(DEGREES);

}

function draw(){
    background("white");

    if(estadoJogo === 0){
      background("gray");
      button.mousePressed(()=>{
          titulo.hide();
          button.hide();
          estadoJogo = 1;
      })
    } 
    
    else if(estadoJogo === 1){

    passarin.collide(casa);

    if(keyDown(DOWN_ARROW)){
        passarin.y = passarin.y + 8;
    }

    if(keyDown(UP_ARROW)){
        passarin.y = passarin.y - 8;
    }    

    if(keyDown(LEFT_ARROW)){
        passarin.x = passarin.x - 8;
    }

    if(keyDown(RIGHT_ARROW)){
        passarin.x = passarin.x + 8;
    }

    if(cobras.isTouching(passarin)){
      for(var i = 0; i < cobras.length; i = i + 1){
          if(cobras[i].isTouching(passarin)){
              cobras[i].destroy();
              pontuacao = pontuacao + 50;
          }}}
   
    if(cobras.isTouching(casa)){
      for(var i = 0; i < cobras.length; i = i + 1){
          if(cobras[i].isTouching(casa)){
              cobras[i].destroy();
              vidas = vidas - 1;
              console.log(vidas);
          }}}

    if(pontuacao >= 5500){
       Cvelocity = Cvelocity + 1;
    }

    if(vidas === 0){
        vida.changeImage("vida_0", img_vida0);
        estadoJogo = 2;
    }

    gerarCobrins()

    textSize(25);
    text("Pontos: " + pontuacao, 50, 50);

    if(vidas === 4){
        vida.changeImage("vida_4", img_vida4);
    } if(vidas === 3){
        vida.changeImage("vida_3", img_vida3);
    } if(vidas === 2){
        vida.changeImage("vida_2", img_vida2);
    } else if(vidas === 1){
        vida.changeImage("vida_1", img_vida1);
    }

    drawSprites();
        }

    if(estadoJogo === 2){
        background("black");
        perda = createElement("h2");
        perda.position(width/2, height/2);
        perda.html("YOU LOST");
        perda.class("customTitle2");;
    }

}

function gerarCobrins(){
    var ramdls = Math.round(random(100, 200));
    if(frameCount %ramdls === 0){
        var randms = Math.round(random(4,7));
        var cobrin; 
        
        //vindo pelo lado esquerdo
        if(randms === 1){
          cobrin = createSprite(0, random(150, height/2 - 325), 65, 25);
          cobrin.velocityX = Cvelocity;
          cobrin.addImage(img_snakeUp);
          cobrin.scale = 0.02;
          cobrin.rotation = 90;
          cobras.add(cobrin);
          }
          
        //vindo pelo lado direito
        else if(randms === 2){
            cobrin = createSprite(width, random(150, height/2 - 325), 65, 25);
            cobrin.velocityX = -Cvelocity;
            cobrin.addImage(img_snakeUp);
            cobrin.scale = 0.02;
            cobrin.rotation = -90;
            cobras.add(cobrin);
        } 

        //vindo de baixo
        else if(randms === 3){
            cobrin = createSprite(random(width/2 - 200, width/2 + 200), height, 25, 65);
            cobrin.velocityY = -Cvelocity;
            cobrin.addImage(img_snakeUp);
            cobrin.scale = 0.02;
            cobras.add(cobrin);
        }
        
        //vindo pelo lado esquerdo (diagonal + para cima)
        else if(randms === 4){
            cobrin = createSprite(0, random(height - 200, height), 65, 25);
            cobrin.velocityX = Cvelocity;
            cobrin.velocityY = -Cvelocity;
            cobrin.addImage(img_snakeGo);
            cobrin.scale = 0.02;
            cobrin.rotation = 90;
            cobras.add(cobrin);
        } 

        //vindo pelo lado esquerdo (diagonal)
        else if(randms === 5){
            cobrin = createSprite(random(0, 500), height, 65, 25);
            cobrin.velocityX = Cvelocity;
            cobrin.velocityY = -Cvelocity;
            cobrin.addImage(img_snakeGo);
            cobrin.scale = 0.02;
            cobrin.rotation = 90;
            cobras.add(cobrin);
        } 
        
        //vindo pelo lado direito (diagonal + para cima)
        else if(randms === 6){
            cobrin = createSprite(width, random(height - 200, height), 65, 25);
            cobrin.velocityX = -Cvelocity;
            cobrin.velocityY = -Cvelocity;
            cobrin.addImage(img_snakeGo);
            cobrin.scale = 0.02;
            cobrin.rotation = 0;
            cobras.add(cobrin);
        } 

        //vindo pelo lado direito (diagonal)
        else if(randms === 7){
            cobrin = createSprite(random(width, width -500), height, 65, 25);
            cobrin.velocityX = -Cvelocity;
            cobrin.velocityY = -Cvelocity;
            cobrin.addImage(img_snakeGo);
            cobrin.scale = 0.02;
            cobrin.rotation = 0;
            cobras.add(cobrin);
        } 
        
    }
}