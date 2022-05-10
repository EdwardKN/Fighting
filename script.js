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
    image: new Image(),
    current:{
        x:undefined,
        y:undefined
    },
    maxHealth:30,
    health:30,
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
    image: new Image(),
    current:{
        x:undefined,
        y:undefined
    },
    maxHealth:30,
    health:30,
    waitTilPunch:0,
    equippedWeapon:weapons.fist
}

var healthBar = new Image();

healthBar.src = `Images/healthbar.png`

player1.image.src = `Images/player1.png`;
player2.image.src = `Images/player2.png`;

player1.current = {x:0,y:0}
player2.current = {x:0,y:0}

player1.canvas.imageSmoothingEnabled = false;
player2.canvas.imageSmoothingEnabled = false;


window.addEventListener("keydown",function(event){
    console.log(event)
    if(event.code === "KeyD" && player1.direction !== 1){
        player1.direction = 1;
        if(player1.crouching === false){
            player1.current = {x:2,y:0};
        }else{
            player1.current = {x:2,y:4};
        }
    }
    if(event.code === "KeyA" && player1.direction !== 2){
        player1.direction = 2;
        if(player1.crouching === false){
            player1.current = {x:4,y:0};
        }else{
            player1.current = {x:4,y:4};
        }
    }
    if(event.code === "KeyW" && player1.goingUp === false && player1.crouching === false){
        player1.momentumY = scale*2;
        player1.goingUp = true;
    }
    if(event.code === "KeyS" && player1.goingUp === false){
        player1.crouching = true;
        player1.current.y = 4;
    }
    if(event.code === "Space" && player1.waitTilPunch <= 0){
        punch(1)
        player1.waitTilPunch = 100;
    }
    
    if(event.code === "ArrowRight" && player2.direction !== 1){
        player2.direction = 1;
        if(player2.crouching === false){
            player2.current = {x:2,y:0};
        }else{
            player2.current = {x:2,y:4};
        }
    }
    if(event.code === "ArrowLeft" && player2.direction !== 2){
        player2.direction = 2;
        if(player2.crouching === false){
            player2.current = {x:4,y:0};
        }else{
            player2.current = {x:4,y:4};
        }
    }
    if(event.code === "ArrowUp" && player2.goingUp === false && player2.crouching === false){
        player2.momentumY = scale*2;
        player2.goingUp = true;
    }
    if(event.code === "ArrowDown" && player2.goingUp === false){
        player2.crouching = true;
        player2.current.y = 4;
    }
    if(event.code === "ShiftRight" && player2.waitTilPunch <= 0){
        punch(2)
        player2.waitTilPunch = 100;
    }
})

window.addEventListener("keyup",function(event){
    if(event.code === "KeyD" && player1.direction === 1){
        clearPlayer(player1);

        player1.direction = 0;
        if(player1.crouching === false){
            player1.current = {x:0,y:0};
        }else{
            player1.current = {x:0,y:4};
        }
        paintPlayer(player1)

    }
    if(event.code === "KeyA" && player1.direction === 2){
        clearPlayer(player1);

        player1.direction = 0;
        if(player1.crouching === false){
            player1.current = {x:0,y:0};
        }else{
            player1.current = {x:0,y:4};
        }
        paintPlayer(player1)
    }
    if(event.code === "KeyS"){
        clearPlayer(player1);
        player1.crouching = false;
        player1.height = 2;
        player1.current.y = 0;

        paintPlayer(player1);
    }

    if(event.code === "ArrowRight" && player2.direction === 1){
        clearPlayer(player2);

        player2.direction = 0;
        if(player2.crouching === false){
            player2.current = {x:0,y:0};
        }else{
            player2.current = {x:0,y:4};
        }
        paintPlayer(player2)
    }
    if(event.code === "ArrowLeft" && player2.direction === 2){
        clearPlayer(player2);

        player2.direction = 0;
        if(player2.crouching === false){
            player2.current = {x:0,y:0};
        }else{
            player2.current = {x:0,y:4};
        }
        paintPlayer(player2)
    }
    if(event.code === "ArrowDown"){
        clearPlayer(player2);
        player2.crouching = false;
        player2.height = 2;
        player2.current.y = 0;
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
        p.current = {x:0,y:2};
    }
    if(p.direction === 1){
        p.current = {x:3,y:0};
    }
    if(p.direction === 2){
        p.current = {x:4,y:0};
    }
    p.y -= p.momentumY;
    p.momentumY -= p.gravity;
    paintPlayer(p)
    if(p.y > groundHeight){
        
        clearPlayer(p)
        if(p.direction === 0){
            p.current = {x:0,y:0};
        }
        if(p.direction === 1){
            p.current = {x:2,y:0};
        }
        if(p.direction === 2){
            p.current = {x:5,y:0};
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
    if (p.image.complete) {
        
        p.canvas.drawImage(p.image, p.current.x*p.size, p.current.y*p.size, p.size,p.size*p.height,Math.floor(p.x),Math.floor(p.y + (p.size*scale) - (p.size*scale)*p.height),Math.floor((p.size*scale)),Math.floor((p.size*scale)*p.height));
    }
}
function clearPlayer(p){

    p.canvas.clearRect(p.x,p.y + (p.size*scale) - (p.size*scale)*p.height-(10/scale),(p.size*scale),(p.size*scale)*p.height+(20/scale))
}

function animate(speed,p){


    if(p.direction === 0){
        setTimeout(() => {
            animate(speed,p)
        }, speed+ Math.random()*speed);
    }else{
        setTimeout(() => {
            animate(speed,p)
        }, speed);
    }

    if(p.direction == 0 && p.crouching === false){

        if(p.current.x === 0 && p.current.y === 0 || p.current.x === 0 && p.current.y === 4){

            clearPlayer(p)

            p.current = {x:1,y:0}
            paintPlayer(p)
            return
        }
        if(p.current.x === 1 && p.current.y === 0 || p.current.x === 1 && p.current.y === 4){
            clearPlayer(p)
            p.current = {x:0,y:0}
            paintPlayer(p)
            return
        }
    }
    
    if(p.direction == 0 && p.crouching === true){
        if(p.current.x === 0 && p.current.y === 4 || p.current.x === 0 && p.current.y === 0){
            clearPlayer(p)
            p.current = {x:1,y:4}
            paintPlayer(p)
            return
        }
        if(p.current.x === 1 && p.current.y === 4 || p.current.x === 1 && p.current.y === 0){
            clearPlayer(p)
            p.current = {x:0,y:4}
            paintPlayer(p)
            return
        }
    }
    
    if(p.direction == 1 && p.crouching === false){
        if(p.current.x === 2 && p.current.y === 0 || p.current.x === 2 && p.current.y === 4){
            clearPlayer(p)
            p.current = {x:3,y:0}
            paintPlayer(p)
            return
        }
        if(p.current.x === 3 && p.current.y === 0 || p.current.x === 3 && p.current.y === 4){
            clearPlayer(p)
            p.current = {x:2,y:0}
            paintPlayer(p)
            return
        }
    }
    
    if(p.direction == 1 && p.crouching === true){
        if(p.current.x === 2 && p.current.y === 4 || p.current.x === 2 && p.current.y === 0){
            clearPlayer(p)
            p.current = {x:3,y:4}
            paintPlayer(p)
            return
        }
        if(p.current.x === 3 && p.current.y === 4 || p.current.x === 3 && p.current.y === 0){
            clearPlayer(p)
            p.current = {x:2,y:4}
            paintPlayer(p)
            return
        }
    }
    
    if(p.direction == 2 && p.crouching === false){
        if(p.current.x === 4 && p.current.y === 0 || p.current.x === 4 && p.current.y === 4){
            clearPlayer(p)
            p.current = {x:5,y:0}
            paintPlayer(p)
            return
        }
        if(p.current.x === 5 && p.current.y === 0 || p.current.x === 5 && p.current.y === 4){
            clearPlayer(p)
            p.current = {x:4,y:0}
            paintPlayer(p)
            return
        }
    }
    
    if(p.direction == 2 && p.crouching === true){
        if(p.current.x === 4 && p.current.y === 4 || p.current.x === 4 && p.current.y === 0){
            clearPlayer(p)
            p.current = {x:5,y:4}
            paintPlayer(p)
            return
        }
        if(p.current.x === 5 && p.current.y === 4 || p.current.x === 5 && p.current.y === 0){
            clearPlayer(p)
            p.current = {x:4,y:4}
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

    if (healthBar.complete) {
        //gui.drawImage(healthBar,scale,scale,41*scale,8*scale,0,(player1.maxHealth-player1.health)*8,41,8);
        //gui.drawImage(healthBar,1920-42*scale,scale,41*scale,8*scale,(player2.maxHealth-player2.health)*8,41,8);
    }    
}

function isIntersect(Ax, Ay, Aw, Ah, Bx, By, Bw, Bh){
    return Bx + Bw > Ax && By + Bh > Ay && Ax + Aw > Bx & Ay + Ah > By;
}

animate(300,player1)
animate(300,player2)

