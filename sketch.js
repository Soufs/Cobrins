var passarin;
var casa;
var cobras;
var vidas = 5;
var pontuacao = 0;
var estadoJogo = 0;
var titulo, button;
var Cvelocity = 5;
var perda;

function setup(){
    createCanvas(windowWidth - 25, windowHeight - 25);

    passarin = createSprite(width/2, height/2, 50, 50);
    passarin.shapeColor = "blue";

    casa = createSprite(width/2, 0, 400, 800);
    casa.shapeColor = "brown";

    cobras = new Group();

    titulo = createElement("h2");
    titulo.position(width/2, height/2);
    titulo.html("Start Game");
    titulo.class("customTitle");

    button = createButton("PLAY");
    button.position(width/2, height/2 + 150);
    button.class("customButton3");
}

function draw(){
    background("black");

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
        estadoJogo = 2;
    }

    gerarCobrins()

    textSize(25);
    text("Pontos: " + pontuacao, 50, 50);

    drawSprites();
        }

    if(estadoJogo === 2){
        perda = createElement("h2");
        perda.position(width/2, height/2);
        perda.html("YOU LOST");
        perda.class("customTitle2");;
        
    }

}

function gerarCobrins(){
    var ramdls = Math.round(random(50, 200));
    if(frameCount %ramdls === 0){
        var randms = Math.round(random(1,4));
        var cobrin; 
        
        //Se sortear o número 1: cobrinhas virão pelo lado esquerdo
        if(randms === 1){
          cobrin = createSprite(random(0, width/2 - 350), random(150, height/2), 65, 25);
          cobrin.velocityX = Cvelocity;
        } else if(randms === 2){
            cobrin = createSprite(random(width/2 + 350, width), random(140, height/2), 65, 25);
            cobrin.velocityX = -Cvelocity;
        } else if(randms === 3){
            cobrin = createSprite(random(0, width/2 - 150), random(height/2 + 100, height), 65, 25);
            cobrin.velocityX = Cvelocity;
            cobrin.velocityY = -Cvelocity;
        } else if(randms === 4){
            cobrin = createSprite(random(width/2 + 150, width), random(height/2 + 100, height), 65, 25);
            cobrin.velocityX = -Cvelocity;
            cobrin.velocityY = -Cvelocity;
        }
        cobras.add(cobrin);
    }
}