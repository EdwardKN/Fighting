var backCanvas = document.getElementById("background")
var player1C = document.getElementById("player1")
var player2C = document.getElementById("player2")
var guiC = document.getElementById("gui")

var gui = guiC.getContext("2d");
var bc = backCanvas.getContext("2d");





backCanvas.width = 1920;
backCanvas.height = 1080;
player1C.width = 1920;
player1C.height = 1080;
player2C.width = 1920;
player2C.height = 1080;
guiC.width = 1920;
guiC.height = 1080;

document.width = 1920;
document.height = 1080;

const scale = 10;

const groundHeight = 1080-20*scale;

var weapons = {
    fist:{
        damage:5,
        range:3,
        speed:1
    }
}

var player1 = {
    x:0,
    y:groundHeight,
    size:20,
    speed:scale,
    direction:0,
    momentumY:0,
    gravity: scale/10,
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
        jump: new Image(),
        crouchIdle1: new Image(),
        crouchIdle2: new Image(),
        crouchWalk1: new Image(),
        crouchWalk2: new Image(),
        crouchWalk3: new Image(),
        crouchWalk4: new Image(),
    },
    current:undefined,
    maxHealth:50,
    health:50,
    waitTilPunch:0,
    equippedWeapon:weapons.fist
}

var player2 = {
    x:1920-20*scale,
    y:groundHeight,
    size:20,
    speed:scale,
    direction:0,
    momentumY:0,
    gravity: scale/10,
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
        jump: new Image(),
        crouchIdle1: new Image(),
        crouchIdle2: new Image(),
        crouchWalk1: new Image(),
        crouchWalk2: new Image(),
        crouchWalk3: new Image(),
        crouchWalk4: new Image(),
    },
    current:undefined,
    maxHealth:50,
    health:50,
    waitTilPunch:0,
    equippedWeapon:weapons.fist
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

player1.images.crouchIdle1.src = `Images/Player1/crouchIdle1.png`;
player1.images.crouchIdle2.src = `Images/Player1/crouchIdle2.png`;
player2.images.crouchIdle1.src = `Images/Player2/crouchIdle1.png`;
player2.images.crouchIdle2.src = `Images/Player2/crouchIdle2.png`;

player1.images.crouchWalk1.src = `Images/Player1/crouchWalk1.png`;
player1.images.crouchWalk2.src = `Images/Player1/crouchWalk2.png`;
player2.images.crouchWalk1.src = `Images/Player2/crouchWalk1.png`;
player2.images.crouchWalk2.src = `Images/Player2/crouchWalk2.png`;

player1.images.crouchWalk3.src = `Images/Player1/crouchWalk3.png`;
player1.images.crouchWalk4.src = `Images/Player1/crouchWalk4.png`;
player2.images.crouchWalk3.src = `Images/Player2/crouchWalk3.png`;
player2.images.crouchWalk4.src = `Images/Player2/crouchWalk4.png`;

player1.canvas.imageSmoothingEnabled = false;
player2.canvas.imageSmoothingEnabled = false;


window.addEventListener("keydown",function(event){
    console.log(event)
    if(event.code === "KeyD" && player1.direction !== 1){
        player1.direction = 1;
        if(player1.crouching === false){
            player1.current = player1.images.walk1;
        }else{
            player1.current = player1.images.crouchWalk1;
        }
    }
    if(event.code === "KeyA" && player1.direction !== 2){
        player1.direction = 2;
        if(player1.crouching === false){
            player1.current = player1.images.walk3;
        }else{
            player1.current = player1.images.crouchWalk3;
        }
    }
    if(event.code === "KeyW" && player1.goingUp === false && player1.crouching === false){
        player1.momentumY = scale*2;
        player1.goingUp = true;
    }
    if(event.code === "KeyS" && player1.goingUp === false){
        player1.crouching = true;
        if(player1.current === player1.images.idle1){
            player1.current = player1.images.crouchIdle1
        }
        if(player1.current === player1.images.idle2){
            player1.current = player1.images.crouchIdle2
        }
        if(player1.current === player1.images.walk1){
            player1.current = player1.images.crouchWalk1
        }
        if(player1.current === player1.images.walk2){
            player1.current = player1.images.crouchWalk2
        }
        if(player1.current === player1.images.walk3){
            player1.current = player1.images.crouchWalk3
        }
        if(player1.current === player1.images.walk4){
            player1.current = player1.images.crouchWalk4
        }
    }
    if(event.code === "Space" && player1.waitTilPunch <= 0){
        punch(1)
        player1.waitTilPunch = 100;
    }
    
    if(event.code === "ArrowRight" && player2.direction !== 1){
        player2.direction = 1;
        if(player2.crouching === false){
            player2.current = player2.images.walk1;
        }else{
            player2.current = player2.images.crouchWalk1;
        }
    }
    if(event.code === "ArrowLeft" && player2.direction !== 2){
        player2.direction = 2;
        if(player2.crouching === false){
            player2.current = player2.images.walk3;
        }else{
            player2.current = player2.images.crouchWalk3;
        }
    }
    if(event.code === "ArrowUp" && player2.goingUp === false && player2.crouching === false){
        player2.momentumY = scale*2;
        player2.goingUp = true;
    }
    if(event.code === "ArrowDown" && player2.goingUp === false){
        player2.crouching = true;
        if(player2.current === player2.images.idle1){
            player2.current = player2.images.crouchIdle1
        }
        if(player2.current === player2.images.idle2){
            player2.current = player2.images.crouchIdle2
        }
        if(player2.current === player2.images.walk1){
            player2.current = player2.images.crouchWalk1
        }
        if(player2.current === player2.images.walk2){
            player2.current = player2.images.crouchWalk2
        }
        if(player2.current === player2.images.walk3){
            player2.current = player2.images.crouchWalk3
        }
        if(player2.current === player2.images.walk4){
            player2.current = player2.images.crouchWalk4
        }
    }
    if(event.code === "ShiftRight" && player2.waitTilPunch <= 0){
        punch(2)
        player2.waitTilPunch = 100;
    }
})

window.addEventListener("keyup",function(event){
    if(event.code === "KeyD" && player1.direction === 1){
        player1.direction = 0;
        if(player1.crouching === false){
            player1.current = player1.images.idle1;
        }else{
            player1.current = player1.images.crouchIdle1;
        }
    }
    if(event.code === "KeyA" && player1.direction === 2){
        player1.direction = 0;
        if(player1.crouching === false){
            player1.current = player1.images.idle1;
        }else{
            player1.current = player1.images.crouchIdle1;
        }
    }
    if(event.code === "KeyS"){
        clearPlayer(player1);
        player1.crouching = false;
        player1.height = 2;
        if(player1.current === player1.images.crouchIdle1){
            player1.current = player1.images.idle1
        }
        if(player1.current === player1.images.crouchIdle2){
            player1.current = player1.images.idle2
        }
        if(player1.current === player1.images.crouchWalk1){
            player1.current = player1.images.walk1
        }
        if(player1.current === player1.images.crouchWalk2){
            player1.current = player1.images.walk2
        }
        if(player1.current === player1.images.crouchWalk3){
            player1.current = player1.images.walk3
        }
        if(player1.current === player1.images.crouchWalk4){
            player1.current = player1.images.walk3
        }
        paintPlayer(player1);
    }

    if(event.code === "ArrowRight" && player2.direction === 1){
        player2.direction = 0;
        if(player2.crouching === false){
            player2.current = player2.images.idle1;
        }else{
            player2.current = player2.images.crouchIdle1;
        }
    }
    if(event.code === "ArrowLeft" && player2.direction === 2){
        player2.direction = 0;
        if(player2.crouching === false){
            player2.current = player2.images.idle1;
        }else{
            player2.current = player2.images.crouchIdle1;
        }        
    }
    if(event.code === "ArrowDown"){
        clearPlayer(player2);
        player2.crouching = false;
        player2.height = 2;
        if(player2.current === player2.images.crouchIdle1){
            player2.current = player2.images.idle1
        }
        if(player2.current === player2.images.crouchIdle2){
            player2.current = player2.images.idle2
        }
        if(player2.current === player2.images.crouchWalk1){
            player2.current = player2.images.walk1
        }
        if(player2.current === player2.images.crouchWalk2){
            player2.current = player2.images.walk2
        }
        if(player2.current === player2.images.crouchWalk3){
            player2.current = player2.images.walk3
        }
        if(player2.current === player2.images.crouchWalk4){
            player2.current = player2.images.walk3
        }
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

    player1.waitTilPunch -= player1.equippedWeapon.speed;
    player2.waitTilPunch -= player1.equippedWeapon.speed;

    paintHealth();
}

update();

function moveRight(p){
    clearPlayer(p)
    p.x += p.speed;
    paintPlayer(p)
    if(p.x > (1920-(p.size*scale))){
        clearPlayer(p)
        p.x = (1920-(p.size*scale));
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
    if(p.y > groundHeight + p.height*(p.size*scale)){
        clearPlayer(p)
        p.y = groundHeight + p.height*(p.size*scale);
        paintPlayer(p)
    }
}

function punch(p){
    
    if(p === 1){
        if(isIntersect(player1.x-(player1.equippedWeapon.range*scale),player1.y-(player1.equippedWeapon.range*scale),player1.size*scale+(player1.equippedWeapon.range*scale*2),player1.size*scale+(player1.equippedWeapon.range*scale*2),player2.x,player2.y,player2.size*scale,player2.size*scale) === 1){
            player2.health -= player1.equippedWeapon.damage;
        }
    }
    if(p === 2){
        if(isIntersect(player2.x-(player2.equippedWeapon.range*scale),player2.y-(player2.equippedWeapon.range*scale),player2.size*scale+(player2.equippedWeapon.range*scale*2),player2.size*scale+(player2.equippedWeapon.range*scale*2),player1.x,player1.y,player1.size*scale,player1.size*scale) === 1){
            player1.health -= player2.equippedWeapon.damage;
        }
    }
}

function paintPlayer(p){
    //p.canvas.fillStyle = p.color;
    //p.canvas.fillRect(p.x,p.y + (p.size*scale) - (p.size*scale)*p.height,(p.size*scale),(p.size*scale)*p.height)
    if (p.current.complete) {
        p.canvas.drawImage(p.current, Math.floor(p.x),Math.floor(p.y + (p.size*scale) - (p.size*scale)*p.height),Math.floor((p.size*scale)),Math.floor((p.size*scale)*p.height));
    }
}
function clearPlayer(p){
    p.canvas.clearRect(p.x,p.y + (p.size*scale) - (p.size*scale)*p.height-(10/scale),(p.size*scale),(p.size*scale)*p.height+(20/scale))
}

function animate(speed,p){
    
    if(p.direction === 0){
        setTimeout(() => {
            animate(p,speed)
        }, speed+ Math.random()*speed);
    }else{
        setTimeout(() => {
            animate(p,speed)
        }, speed);
    }
    
    if(p.direction == 0 && p.crouching === false){
        if(p.current === p.images.idle1 || p.current === p.images.crouchIdle1){
            clearPlayer(p)
            p.current = p.images.idle2
            paintPlayer(p)
            return
        }
        if(p.current === p.images.idle2 || p.current === p.images.crouchIdle2){
            clearPlayer(p)
            p.current = p.images.idle1
            paintPlayer(p)
            return
        }
    }
    if(p.direction == 0 && p.crouching === true){
        if(p.current === p.images.crouchIdle1 || p.current === p.images.idle1){
            clearPlayer(p)
            p.current = p.images.crouchIdle2
            paintPlayer(p)
            return
        }
        if(p.current === p.images.crouchIdle2 || p.current === p.images.idle2){
            clearPlayer(p)
            p.current = p.images.crouchIdle1
            paintPlayer(p)
            return
        }
    }
    if(p.direction == 1 && p.crouching === false){
        if(p.current === p.images.walk1 || p.current === p.images.crouchWalk1){
            clearPlayer(p)
            p.current = p.images.walk2
            paintPlayer(p)
            return
        }
        if(p.current === p.images.walk2 || p.current === p.images.crouchWalk2){
            clearPlayer(p)
            p.current = p.images.walk1
            paintPlayer(p)
            return
        }
    }
    if(p.direction == 1 && p.crouching === true){
        if(p.current === p.images.crouchWalk1 || p.current === p.images.walk1){
            clearPlayer(p)
            p.current = p.images.crouchWalk2
            paintPlayer(p)
            return
        }
        if(p.current === p.images.crouchWalk2 || p.current === p.images.walk2){
            clearPlayer(p)
            p.current = p.images.crouchWalk1
            paintPlayer(p)
            return
        }
    }
    if(p.direction == 2 && p.crouching === false){
        if(p.current === p.images.walk3 || p.current === p.images.crouchWalk3){
            clearPlayer(p)
            p.current = p.images.walk4
            paintPlayer(p)
            return
        }
        if(p.current === p.images.walk4 || p.current === p.images.crouchWalk4){
            clearPlayer(p)
            p.current = p.images.walk3
            paintPlayer(p)
            return
        }
    }
    if(p.direction == 2 && p.crouching === true){
        if(p.current === p.images.crouchWalk3 || p.current === p.images.walk3){
            clearPlayer(p)
            p.current = p.images.crouchWalk4
            paintPlayer(p)
            return
        }
        if(p.current === p.images.crouchWalk4 || p.current === p.images.walk4){
            clearPlayer(p)
            p.current = p.images.crouchWalk3
            paintPlayer(p)
            return
        }
    }
}

function paintHealth(){
    if(player1.health < 0){
        player1.health = 0;
    }
    if(player2.health < 0){
        player2.health = 0;
    }
    if(player1.waitTilPunch <= 0){
        player1.waitTilPunch = 0;
    }
    if(player2.waitTilPunch <= 0){
        player2.waitTilPunch = 0;
    }

    gui.fillStyle = "black"
    gui.fillRect(scale,scale,scale*player1.maxHealth + scale*4,scale*10)
    gui.fillRect(1920-scale*player2.maxHealth - scale*5 ,scale,scale*player2.maxHealth + scale*4,scale*11)
    gui.fillStyle = "gray";
    gui.fillRect(scale,scale,(scale*player1.maxHealth + scale*4)*(player1.waitTilPunch/100),scale*10)
    gui.fillRect(1920-scale*player2.maxHealth - scale*5 ,scale,(scale*player2.maxHealth + scale*4)*(player2.waitTilPunch/100),scale*11)

    gui.fillStyle = "red"
    gui.fillRect(scale*3,scale*3,scale*player1.health,scale*6)
    gui.fillRect(1920-scale*player2.maxHealth - scale*3 ,scale*3,scale*player2.health,scale*7)
    
}

function isIntersect(Ax, Ay, Aw, Ah, Bx, By, Bw, Bh){
    return Bx + Bw > Ax && By + Bh > Ay && Ax + Aw > Bx & Ay + Ah > By;
}



animate(300,player1)
animate(300,player2)