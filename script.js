var backCanvas = document.getElementById("background")
var player1C = document.getElementById("player1")
var player2C = document.getElementById("player2")
var bc = backCanvas.getContext("2d");





backCanvas.width = 1920;
backCanvas.height = 1080;
foreCanvas.width = 1920;
foreCanvas.height = 1080;
foreCanvas2.width = 1920;
foreCanvas2.height = 1080;

const groundHeight = 700;

var player1 = {
    x:500,
    y:groundHeight,
    size:200,
    speed:10,
    direction:0,
    momentumY:0,
    gravity: 1,
    goingUp:false,
    canvas:foreCanvas.getContext("2d"),
    crouching:false,
    height:2,
    color:"red",
    images:{
        idle: new Image()
    }
}

var player2 = {
    x:500,
    y:groundHeight,
    size:200,
    speed:10,
    direction:0,
    momentumY:0,
    gravity: 1,
    goingUp:false,
    canvas:foreCanvas2.getContext("2d"),
    crouching:false,
    height:2,
    color:"blue",
    images:{
        idle: new Image()
    }
}


player1.canvas.imageSmoothingEnabled = false;
player2.canvas.imageSmoothingEnabled = false;


window.addEventListener("keydown",function(event){
    console.log(event)
    if(event.code === "KeyD" && player1.direction !== 1){
        player1.direction = 1;
    }
    if(event.code === "KeyA" && player1.direction !== 2){
        player1.direction = 2;
    }
    if(event.code === "KeyW" && player1.goingUp === false && player1.crouching === false){
        player1.momentumY = 20;
        player1.goingUp = true;
    }
    if(event.code === "KeyS" && player1.goingUp === false){
        player1.crouching = true;
    }
    
    if(event.code === "ArrowRight" && player2.direction !== 1){
        player2.direction = 1;
    }
    if(event.code === "ArrowLeft" && player2.direction !== 2){
        player2.direction = 2;
    }
    if(event.code === "ArrowUp" && player2.goingUp === false){
        player2.momentumY = 20;
        player2.goingUp = true;
    }
    if(event.code === "ArrowDown" && player2.goingUp === false){
        player2.crouching = true;
    }
})

window.addEventListener("keyup",function(event){
    if(event.code === "KeyD" && player1.direction === 1){
        player1.direction = 0;
    }
    if(event.code === "KeyA" && player1.direction === 2){
        player1.direction = 0;
    }
    if(event.code === "KeyS"){
        clearPlayer(player1);
        player1.crouching = false;
        player1.height = 2;
        paintPlayer(player1);
    }

    if(event.code === "ArrowRight" && player2.direction === 1){
        player2.direction = 0;
    }
    if(event.code === "ArrowLeft" && player2.direction === 2){
        player2.direction = 0;
    }
    if(event.code === "ArrowDown"){
        clearPlayer(player2);
        player2.crouching = false;
        player2.height = 2;
        paintPlayer(player2);
    }
    
})

function update(){
    requestAnimationFrame(update)

    if(player1.direction === 1){
        moveRight(player1)
    }
    if(player1.direction === 2){
        moveLeft(player1)
    }
    if(player1.goingUp === true){
        moveUp(player1);
    }
    if(player1.crouching === true){
        crouch(player1);
    }

    if(player2.direction === 1){
        moveRight(player2)
    }
    if(player2.direction === 2){
        moveLeft(player2)
    }
    if(player2.goingUp === true){
        moveUp(player2);
    }
    if(player2.crouching === true){
        crouch(player2);
    }
}

update();

function moveRight(p){
    clearPlayer(p)
    p.x += p.speed;
    paintPlayer(p)
    if(p.x > (1920-p.size)){
        clearPlayer(p)
        p.x = (1920-p.size);
        paintPlayer(p)
    }
}
function moveLeft(p){
    clearPlayer(p)
    p.x -= p.speed;
    paintPlayer(p)

    if(p.x < (0)){
        clearPlayer(p)
        p.x = (0);
        paintPlayer(p)
    }
}

function moveUp(p){
    clearPlayer(p)
    p.y -= p.momentumY;
    p.momentumY -= p.gravity;
    paintPlayer(p)
    if(p.y > groundHeight){
        clearPlayer(p)
        p.y = groundHeight;
        paintPlayer(p)
        p.goingUp = false;
    }
}
function crouch(p){
    clearPlayer(p)
    p.height = 1;
    paintPlayer(p)
    if(p.y > groundHeight + p.height*p.size){
        clearPlayer(p)
        p.y = groundHeight + p.height*p.size;
        paintPlayer(p)
    }
}

function paintPlayer(p){
    p.canvas.fillStyle = p.color;
    p.canvas.fillRect(p.x,p.y + p.size - p.size*p.height,p.size,p.size*p.height)
    if (p.images.idle.complete) {
        p.canvas.drawImage(p.images.idle, Math.floor(p.x),Math.floor(p.y + p.size - p.size*p.height),Math.floor(p.size),Math.floor(p.size*p.height));
        p.images.idle.src = `Images/Player1/player1ImgIdle.png`;
    }
}
function clearPlayer(p){
    p.canvas.clearRect(p.x,p.y + p.size - p.size*p.height,p.size,p.size*p.height)
}