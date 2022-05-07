var backCanvas = document.getElementById("background")
var player1C = document.getElementById("player1")
var player2C = document.getElementById("player2")
var bc = backCanvas.getContext("2d");





backCanvas.width = 1920;
backCanvas.height = 1080;
player1C.width = 1920;
player1C.height = 1080;
player2C.width = 1920;
player2C.height = 1080;

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
    canvas:player1C.getContext("2d"),
    crouching:false,
    height:2,
    color:"red",
    images:{
        idle1: new Image(),
        idle2: new Image(),
        walk1: new Image(),
        walk2: new Image(),
        walk3: new Image(),
        walk4: new Image(),
        jump: new Image()
    },
    current:undefined
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
    canvas:player2C.getContext("2d"),
    crouching:false,
    height:2,
    color:"blue",
    images:{
        idle1: new Image(),
        idle2: new Image(),
        walk1: new Image(),
        walk2: new Image(),
        walk3: new Image(),
        walk4: new Image(),
        jump: new Image()
    },
    current:undefined
}

console.log(player1.images.walk1)
player1.current = player1.images.idle1
player2.current = player2.images.idle2
player1.images.idle1.src = `Images/Player1/idle1.png`;
player1.images.idle2.src = `Images/Player1/idle2.png`;
player2.images.idle1.src = `Images/Player2/idle1.png`;
player2.images.idle2.src = `Images/Player2/idle2.png`;

player1.images.walk1.src = `Images/Player1/walk1.png`;
player1.images.walk2.src = `Images/Player1/walk2.png`;
player2.images.walk1.src = `Images/Player2/walk1.png`;
player2.images.walk2.src = `Images/Player2/walk2.png`;

player1.images.walk3.src = `Images/Player1/walk3.png`;
player1.images.walk4.src = `Images/Player1/walk4.png`;
player2.images.walk3.src = `Images/Player2/walk3.png`;
player2.images.walk4.src = `Images/Player2/walk4.png`;

player1.images.jump.src = `Images/Player1/jump.png`;
player2.images.jump.src = `Images/Player2/jump.png`;

player1.canvas.imageSmoothingEnabled = false;
player2.canvas.imageSmoothingEnabled = false;


window.addEventListener("keydown",function(event){
    console.log(event)
    if(event.code === "KeyD" && player1.direction !== 1){
        player1.direction = 1;
        player1.current = player1.images.walk1;
    }
    if(event.code === "KeyA" && player1.direction !== 2){
        player1.direction = 2;
        player1.current = player1.images.walk3;

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
        player2.current = player2.images.walk1;
    }
    if(event.code === "ArrowLeft" && player2.direction !== 2){
        player2.direction = 2;
        player2.current = player2.images.walk3;
    }
    if(event.code === "ArrowUp" && player2.goingUp === false && player2.crouching === false){
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
        player1.current = player1.images.idle1;
    }
    if(event.code === "KeyA" && player1.direction === 2){
        player1.direction = 0;
        player1.current = player1.images.idle1;

    }
    if(event.code === "KeyS"){
        clearPlayer(player1);
        player1.crouching = false;
        player1.height = 2;
        paintPlayer(player1);
    }

    if(event.code === "ArrowRight" && player2.direction === 1){
        player2.direction = 0;
        player2.current = player2.images.idle1;
    }
    if(event.code === "ArrowLeft" && player2.direction === 2){
        player2.direction = 0;
        player2.current = player2.images.idle1;
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
    if(p.direction === 0){
        p.current = p.images.jump;
    }
    if(p.direction === 1){
        p.current = p.images.walk2;
    }
    if(p.direction === 2){
        p.current = p.images.walk3;
    }
    p.y -= p.momentumY;
    p.momentumY -= p.gravity;
    paintPlayer(p)
    if(p.y > groundHeight){
        
        clearPlayer(p)
        if(p.direction === 0){
            p.current = p.images.idle1;
        }
        if(p.direction === 1){
            p.current = p.images.walk1;
        }
        if(p.direction === 2){
            p.current = p.images.walk4;
        }
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
    //p.canvas.fillStyle = p.color;
    //p.canvas.fillRect(p.x,p.y + p.size - p.size*p.height,p.size,p.size*p.height)
    if (p.current.complete) {
        p.canvas.drawImage(p.current, Math.floor(p.x),Math.floor(p.y + p.size - p.size*p.height),Math.floor(p.size),Math.floor(p.size*p.height));
    }
}
function clearPlayer(p){
    p.canvas.clearRect(p.x,p.y + p.size - p.size*p.height,p.size,p.size*p.height)
}

function animate(speed,p){
    

    setTimeout(() => {
        animate(p,speed)
    }, speed);
    if(p.direction == 0){
        if(p.current === p.images.idle1){
            clearPlayer(p)
            p.current = p.images.idle2
            paintPlayer(p)
            return
        }
        if(p.current === p.images.idle2){
            clearPlayer(p)
            p.current = p.images.idle1
            paintPlayer(p)
            return
        }
    }
    if(p.direction == 1){
        if(p.current === p.images.walk1){
            clearPlayer(p)
            p.current = p.images.walk2
            paintPlayer(p)
            return
        }
        if(p.current === p.images.walk2){
            clearPlayer(p)
            p.current = p.images.walk1
            paintPlayer(p)
            return
        }
    }
    if(p.direction == 2){
        if(p.current === p.images.walk3){
            clearPlayer(p)
            p.current = p.images.walk4
            paintPlayer(p)
            return
        }
        if(p.current === p.images.walk4){
            clearPlayer(p)
            p.current = p.images.walk3
            paintPlayer(p)
            return
        }
    }
}

animate(300,player1)
animate(300,player2)