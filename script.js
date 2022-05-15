var backCanvas = document.getElementById("background")
var player1C = document.getElementById("player1")
var player2C = document.getElementById("player2")
var healthCanvasC = document.getElementById("health")
var guiC = document.getElementById("gui")
var effecC = document.getElementById("effect")
var testC = document.getElementById("test")
var test = testC.getContext("2d");

var healthCanvas = healthCanvasC.getContext("2d");
var bc = backCanvas.getContext("2d");

var gui = guiC.getContext("2d");
var effect = effecC.getContext("2d");

var sounds = {
    punch : new Audio('Sounds/sounds/punch.mp3'),
    death : new Audio('Sounds/sounds/death.mp3'),
    click : new Audio('Sounds/sounds/click.mp3') 
};
var music = {
    level1 : new Audio('Sounds/music/level1.mp3'),
};

music.level1.loop = true;
music.level1.volume = 0.01;



png_font.setup(document.getElementById("gui").getContext("2d"));

let backImg = new Image();

backImg.src = `Images/back.png`

let scanlinesImg = new Image();

scanlinesImg.src = `Images/scanlines.png`

let bezelImg = new Image();

bezelImg.src = `Images/bezel.png`

backCanvas.width = 1920;
backCanvas.height = 1080;
player1C.width = 1920;
player1C.height = 1080;
player2C.width = 1920;
player2C.height = 1080;
healthCanvasC.width = 1920;
healthCanvasC.height = 1080;
guiC.width = 1920;
guiC.height = 1080;
effecC.width = 1920;
effecC.height = 1080;

testC.width = 1920;
testC.height = 1080;

document.width = 1920;
document.height = 1080;

var fps = undefined;

var fpsMultiplier = fps / 60;

const scale = 10;

var groundHeight = 1080-20*scale-scale*10;

var interacted = false;

var weapons = {
    fist:{
        damage:5,
        range:3,
        speed:1
    },
    test:{
        damage:5,
        range:3,
        speed:5
    }
}

var player1 = undefined

var player2 = undefined

var menu = undefined

var mouse = {
    x:undefined,
    Y:undefined
}

var healthBar = new Image();

healthBar.src = `Images/Healthbar.png`

var knapp = new Image();

knapp.src = `Images/meny.png`

var breakAnimate = false;

var effectOn = false;

window.addEventListener('load', function(){
    fakeCRT(testC)
}, false);

function addEffect(){
    player1.canvas.clearRect(0,0,1920,1080);
    player2.canvas.clearRect(0,0,1920,1080);
    groundHeight-=30;
    player1.y = groundHeight
    player2.y = groundHeight
    effectOn = true;
    bc.clearRect(0,0,1920,1080)
    bc.drawImage(backImg,0,0-30,1920,1080)

    effect.globalAlpha = 0.2
    effect.drawImage(scanlinesImg,0,0,800,192,0,0,1920,1080)
    effect.globalAlpha = 1
    effect.drawImage(bezelImg,0,0,1920,1080)
    updateMenu()
}

function removeEffect(){
    player1.canvas.clearRect(0,0,1920,1080);
    player2.canvas.clearRect(0,0,1920,1080);
    groundHeight+=30;
    player1.y = groundHeight;
    player2.y = groundHeight;
    effectOn = false;
    bc.clearRect(0,0,1920,1080)
    bc.drawImage(backImg,0,0,1920,1080)

    effect.clearRect(0,0,1920,1080)
    updateMenu()

}

function fakeCRT(i) {
    var glcanvas, source, texture, w, h, hw, hh, w75;
    
    try {
        glcanvas = fx.canvas();
    } catch (e) {return;}
    

    source = i;
    srcctx = source.getContext('2d');
    
    texture = glcanvas.texture(source);
    
    w = source.width;
    h = source.height;
    hw = w / 2;
    hh = h / 2;
    w75 = w * 0.75;

    source.parentNode.insertBefore(glcanvas, source);
    source.style.display = 'none';
    glcanvas.className = source.className;
    glcanvas.id = source.id;
    source.id = 'old_' + source.id;
    
    
    setInterval(function () {
    
        texture.loadContentsOf(source);
        if(effectOn === true){
            glcanvas.draw(texture)
            .bulgePinch(hw, hh, w75, 0.10)
            .vignette(0.25, 0.6).noise(0.05).hueSaturation(0, -0.1)
            .update();
        }else{
            glcanvas.draw(texture)
            .bulgePinch(hw, hh, w75, 0)
            .vignette(0, 0)
            .update();
        }
        
    }, Math.floor(1000 / 60));
}

healthCanvas.imageSmoothingEnabled = false;
gui.imageSmoothingEnabled = false;
bc.imageSmoothingEnabled = false;

player1 = {
    x:10
}
player2 = {
    x:1920-20*scale
}

function reset(){
    breakAnimate = true;
    player1.x = 10
    player2.x = 1920-20*scale
    menu = {
            menuState:3
        };
    
    setTimeout(() => {
        player1 = {
            x:10,
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
            healthGoingTo:30,
            waitTilPunch:0,
            equippedWeapon:weapons.test,
            regenCooldown:0,
            regenCooldownSpeed:1,
            regenSpeedDefault:0.06,
            regenSpeed:0.06,
            dead:false
        }
        
        player2 = {
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
            healthGoingTo:30,
            waitTilPunch:0,
            equippedWeapon:weapons.test,
            regenCooldown:0,
            regenCooldownSpeed:1,
            regenSpeedDefault:0.06,
            regenSpeed:0.06,
            dead:false
        }
        
        
        player1.image.src = `Images/player1.png`;
        player2.image.src = `Images/player2.png`;
        player1.canvas.imageSmoothingEnabled = false;
        player2.canvas.imageSmoothingEnabled = false;
        player1.current = {x:0,y:0}
        player2.current = {x:0,y:0}
        breakAnimate = false;

        player1.canvas.clearRect(0,0,1920,1080)
        player2.canvas.clearRect(0,0,1920,1080)

        updateMenu(false)
        paintHealth();

        animate(300,player1)
        animate(300,player2)
    
    }, 700);
}
reset()




window.addEventListener("mousemove",function(event){
    
    mouse.x = event.x
    mouse.y = event.y
    if(menu !== undefined){
        updateMenu(false);
    }
})

window.addEventListener("mousedown",function(event){
    if(menu !== undefined){
        updateMenu(true);
    }
})
window.addEventListener("mouseup",function(event){
    if(menu !== undefined){

        if(interacted === false){
            music.level1.play();
            interacted = true;
            paintHealth();
            


        }
        var parentDiv = document.getElementById("content");
        parentDiv.requestFullscreen();
        updateMenu(false);
    }
})

window.addEventListener("keydown",function(event){
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(event.code) > -1) {
        event.preventDefault();
    }

    console.log(event)
    if(player1.dead === false&& menu.menuState === 0 ||menu.menuState === 2){
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
            if(menu.menuState === 0){
                punch(1)
                player1.waitTilPunch = 100;
            }
        }
    }
    if(player2.dead === false && menu.menuState === 0 ||menu.menuState === 1){
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
            if(menu.menuState === 0){
                punch(2)
                player2.waitTilPunch = 100;
            }
        }
    }
})

window.addEventListener("keyup",function(event){

    if(event.code === "KeyO"){
        if(effectOn === true){
            removeEffect();
            return;
        }else{
            addEffect();
            return;
        }
    }
    
    if(player1.dead === false && menu.menuState === 0 ||menu.menuState === 2){
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
    }

    if(player2.dead === false && menu.menuState === 0 ||menu.menuState === 1){
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
    }
})

function update(){



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
    
    if(player1.crouching === false){
        player1.waitTilPunch -= player1.equippedWeapon.speed;
    }else{
        player1.waitTilPunch -= player1.equippedWeapon.speed/2;
    }

    if(player2.crouching === false){
        player2.waitTilPunch -= player2.equippedWeapon.speed;
    }else{
        player2.waitTilPunch -= player2.equippedWeapon.speed/2;
    }
    

    player1.regenCooldown -= player1.regenCooldownSpeed;
    player2.regenCooldown -= player1.regenCooldownSpeed;

    if(player1.regenCooldown > 0 || player2.regenCooldown > 0){
        paintHealth();
    }
    if(player1.regenCooldown < 0 && player1.regenSpeed !== 0){
        player1.regenSpeed *= 1.001;
        player1.healthGoingTo += player1.regenSpeed*(player1.health/30)
        player1.health += player1.regenSpeed*(player1.health/30)
        paintHealth();
    }
    if(player2.regenCooldown < 0 && player2.regenSpeed !== 0){
        player2.regenSpeed *= 1.001;
        player2.healthGoingTo += player2.regenSpeed*(player2.health/30)
        player2.health += player2.regenSpeed*(player2.health/30)
        paintHealth();

    }

    gui.clearRect(0,0,200,200);
    gui.fillStyle = "white"
    gui.fillText("FPS:"+fps,50,40);

    test.drawImage(backCanvas, 0, 0);
    test.drawImage(player1C, 0, 0);
    test.drawImage(player2C, 0, 0);
    test.drawImage(healthCanvasC, 0, 0);
    test.drawImage(guiC, 0, 0);
    test.drawImage(effecC, 0, 0);

}

setTimeout(() => {
    bc.drawImage(backImg,0,0,1920,1080)
    
}, 800);

function updateMenu(click){
    gui.clearRect(0,0,1920,1080);


    if(menu.menuState === 0){
        let b3
        if(effectOn === false){
            b3 = {x:182,y:98}
        }else{
            b3 = {x:176,y:95}
        }
        gui.drawImage(knapp,10,54,10,10,b3.x*scale,b3.y*scale,10*scale,10*scale)
        if(isIntersect(mouse.x,mouse.y,1,1,(b3.x)*scale,b3.y*scale,10*scale,10*scale)){
            gui.drawImage(knapp,0,54,10,10,b3.x*scale,b3.y*scale,10*scale,10*scale)
            if(click === true){
                menu.menuState = 3
                resetStuff()        
                playSound(sounds.click)
                updateMenu(false);
                return;
            }
        }
    }
    if(menu.menuState === 1){
        png_font.drawText("Player 2 won!", [scale*20,scale*20], "black", scale, null,  false);
        let b1 = {x:96-14,y:36}
        gui.fillStyle = "white"
        gui.fillRect(b1.x*scale,b1.y*scale,40*scale,13*scale)
        if(isIntersect(mouse.x,mouse.y,1,1,(b1.x)*scale,b1.y*scale,40*scale,13*scale)){
            gui.fillStyle = "black"
            gui.fillRect(b1.x*scale,b1.y*scale,40*scale,13*scale)
            if(click === true){
                resetStuff()        
                playSound(sounds.click)   
                menu.menuState = 3;
                updateMenu(false);
            }
        }
        png_font.drawText("Reset", [scale*(96-13),scale*33], "black", scale, null,  false);
    }
    if(menu.menuState === 2){
        png_font.drawText("Player 1 won!", [scale*20,scale*20], "black", scale, null,  false);
        let b1 = {x:96-14,y:36}
        gui.fillStyle = "white"
        gui.fillRect(b1.x*scale,b1.y*scale,40*scale,13*scale)
        if(isIntersect(mouse.x,mouse.y,1,1,(b1.x)*scale,b1.y*scale,40*scale,13*scale)){
            gui.fillStyle = "black"
            gui.fillRect(b1.x*scale,b1.y*scale,40*scale,13*scale)
            if(click === true){
                resetStuff()     
                playSound(sounds.click)
                menu.menuState = 3;
                updateMenu(false);
      
            }
        }
        png_font.drawText("Reset", [scale*(96-13),scale*33], "black", scale, null,  false);

    }
    if(menu.menuState === 3){

        let b1 = {x:96-17,y:36}
        gui.drawImage(knapp,0,0,33,9,b1.x*scale,b1.y*scale,33*scale,9*scale)
        if(isIntersect(mouse.x,mouse.y,1,1,(b1.x+3)*scale,b1.y*scale,27*scale,9*scale)){
            gui.drawImage(knapp,0,9,33,9,b1.x*scale,b1.y*scale,33*scale,9*scale)
            if(click === true){
                playSound(sounds.click)
                menu.menuState = 0;
                paintHealth();
                updateMenu(false);

            }
        }
        let b2 = {x:96-27,y:48}
        gui.drawImage(knapp,0,18,54,9,b2.x*scale,b2.y*scale,54*scale,9*scale)
        if(isIntersect(mouse.x,mouse.y,1,1,(b2.x+3)*scale,b2.y*scale,48*scale,9*scale)){
            gui.drawImage(knapp,0,27,54,9,b2.x*scale,b2.y*scale,54*scale,9*scale)
            if(click === true){
                playSound(sounds.click)
                updateMenu(false);
            }
        }
        let b4 = {x:96-27,y:60}
        gui.drawImage(knapp,0,36,59,9,b4.x*scale,b4.y*scale,54*scale,9*scale)
        if(isIntersect(mouse.x,mouse.y,1,1,(b4.x+3)*scale,b4.y*scale,48*scale,9*scale)){
            gui.drawImage(knapp,0,45,59,9,b4.x*scale,b4.y*scale,54*scale,9*scale)
            if(click === true){
                playSound(sounds.click)
                updateMenu(false);
            }
        }
        let b3
        if(effectOn === false){
            b3 = {x:182,y:98}
        }else{
            b3 = {x:176,y:95}
        }
        gui.drawImage(knapp,10,64,10,10,b3.x*scale,b3.y*scale,10*scale,10*scale)
        if(isIntersect(mouse.x,mouse.y,1,1,(b3.x)*scale,b3.y*scale,10*scale,10*scale)){
            gui.drawImage(knapp,0,64,10,10,b3.x*scale,b3.y*scale,10*scale,10*scale)
            if(click === true){
                menu.menuState = 4
                playSound(sounds.click)
                updateMenu(false);
                return;
            }
        }
    }
    if(menu.menuState === 4){
        let b3
        if(effectOn === false){
            b3 = {x:182,y:98}
        }else{
            b3 = {x:176,y:95}
        }
        gui.drawImage(knapp,10,54,10,10,b3.x*scale,b3.y*scale,10*scale,10*scale)
        if(isIntersect(mouse.x,mouse.y,1,1,(b3.x)*scale,b3.y*scale,10*scale,10*scale)){
            gui.drawImage(knapp,0,54,10,10,b3.x*scale,b3.y*scale,10*scale,10*scale)
            if(click === true){
                menu.menuState = 3
                playSound(sounds.click)
                updateMenu(false);
                return;
            }
        }
    }
}

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

    if(p.x < (10)){
        clearPlayer(p)
        p.x = (10);
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
    p.height = 1.5;
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
            if(player1.crouching === false){
                player2.healthGoingTo -= player1.equippedWeapon.damage;
            }else{
                player2.healthGoingTo -= player1.equippedWeapon.damage/2;
            }
            playSound(sounds.punch)
            player2.regenCooldown = 100;
            player2.regenSpeed = player2.regenSpeedDefault;
            paintHealth();

        }
    }
    if(p === 2){
        if(isIntersect(player2.x-(player2.equippedWeapon.range*scale),player2.y-(player2.equippedWeapon.range*scale),player2.size*scale+(player2.equippedWeapon.range*scale*2),player2.size*scale+(player2.equippedWeapon.range*scale*2),player1.x,player1.y,player1.size*scale,player1.size*scale) === 1){
            if(player2.crouching === false){
                player1.healthGoingTo -= player2.equippedWeapon.damage;
            }else{
                player1.healthGoingTo -= player2.equippedWeapon.damage/2;
            }
            playSound(sounds.punch)

            player1.regenCooldown = 100;
            player1.regenSpeed = player1.regenSpeedDefault;
            paintHealth();

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
    if(breakAnimate === false){

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
    

    if(player1.health > 30){
        player1.health = 30
        player1.regenSpeed = 0
    }
    if(player2.health > 30){
        player2.health = 30
        player2.regenSpeed = 0
    }
    

    if(player1.healthGoingTo > player1.maxHealth){
        player1.healthGoingTo = player1.maxHealth
    }
    if(player2.healthGoingTo > player2.maxHealth){
        player2.healthGoingTo = player2.maxHealth
    }

    if(player1.health > player1.healthGoingTo){
        player1.health -= 0.4;
    }
    if(player2.health > player2.healthGoingTo){
        player2.health -= 0.4;
    }
    if(player1.healthGoingTo <= 0 && player1.dead === false){
        clearPlayer(player1)
        menu.menuState = 1;
        player1.current = {x:1,y:2}
        updateMenu();
        player1.dead = true;
        let effect = sounds.death.cloneNode()
        playSound(sounds.death)
        paintPlayer(player1)
    }
    if(player2.healthGoingTo <= 0 && player2.dead === false){
        clearPlayer(player2)
        menu.menuState = 2;
        player2.current = {x:1,y:2}
        updateMenu();
        player2.dead = true;
        playSound(sounds.death)
        paintPlayer(player2)
    }

    if (healthBar.complete) {
        healthCanvas.clearRect(scale*4,scale*4,41*scale,8*scale)
        healthCanvas.clearRect(1920-46*scale,scale*4,41*scale,8*scale)
        if(menu.menuState === 0){
            healthCanvas.drawImage(healthBar,0,Math.floor(player1.maxHealth-player1.health)*8,41,8,scale*4,scale*4,41*scale,8*scale);
            healthCanvas.drawImage(healthBar,0,Math.floor(player2.maxHealth-player2.health)*8,41,8,1920-46*scale,scale*4,41*scale,8*scale);
        }
        
    }    
}

function resetStuff(){
    clearPlayer(player1);
    clearPlayer(player2)
    reset();
    paintPlayer(player1)
    paintPlayer(player2)
    paintHealth()
    updateMenu(false)
}

function isIntersect(Ax, Ay, Aw, Ah, Bx, By, Bw, Bh){
    return Bx + Bw > Ax && By + Bh > Ay && Ax + Aw > Bx & Ay + Ah > By;
}

var interval1 = undefined;


function updateFPS(thisFps) {
    clearInterval(interval1);
    interval1 = undefined;
    interval1 = setInterval(update, 1000 / thisFps);
    fpsMultiplier = thisFps / 60;
}

setInterval(() => {
    fps = oldCount - oldCount3;
    oldCount3 = oldCount;
    if (fps !== oldFPS) {
        updateFPS(fps)
    }
    oldFPS = fps;
}, 1000);

var oldFPS = 0;

var oldCount3 = 0;
var oldCount2 = 0;
var oldCount = 0;

count()

function count() {
    requestAnimationFrame(count)

    oldCount = oldCount2;
    oldCount2++;
    return oldCount;

}

function playSound(sound){
    let effect = sound.cloneNode()
    effect.play();
}