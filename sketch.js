var earth, earthImg
var rocket, rocketImg
var asteroid, asteroidImg
var laser
var gameState = "play"
var score = 0
var restart, restartImg

function preload() {
    earthImg = loadImage("earth.png")
    bg = loadImage("space.jpg")
    rocketImg = loadImage("rocket.jpg")
    asteroidImg = loadImage("asteroid.jpg")
    restartImg = loadImage("restart.png")
}

function setup() {
    createCanvas(1200, 500)
    earth = createSprite(10, 240, 40, 40)
    earth.addImage(earthImg)
    earth.scale = 0.2
    earth.rotation = 180
    earth.rotateToDirection = true

    rocket = createSprite(350, 250, 40, 40)
    rocket.addImage(rocketImg)
    rocket.rotation = 90
    rocket.scale = 0.3

    restart = createSprite(600, 250, 50, 50)
    restart.addImage(restartImg)

    asteroidGroup1 = new Group()
    asteroidGroup2 = new Group()
    laserGroup = new Group()
}

function draw() {
    background(bg)
    earth.rotation += 1
    
    if (gameState === "play") {
        rocket.velocityY = rocket.velocityY + 0.7
        if (keyDown("space")) {
            rocket.velocityY = rocket.velocityY - 5
        }
        if (asteroidGroup1.isTouching(laserGroup)) {
            asteroidGroup1.destroyEach()
            score += 1
        }
        if (asteroidGroup2.isTouching(laserGroup)) {
            asteroidGroup2.destroyEach()
            score += 1
        }
        if (asteroidGroup1.isTouching(earth) || rocket.position.y > 500 || rocket.position.y < 0) {
            gameState = "end"
            asteroidGroup1.velocityX = 0
            asteroidGroup2.velocityX = 0
        }
        restart.visible = false
        console.log("i am from if "+gameState);
        spawnAsteroids()
        spawnAsteroids2()
    }
    else if(gameState==="end") {
        rocket.velocityY = 0
        restart.visible = true
        retry()
        laserGroup.velocityX = 0
        console.log("i am form else "+gameState);
    }
    textSize(25)
    fill("white")
    text("Score : " + score, 1030, 30)
    drawSprites()
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        laser = createSprite(rocket.position.x + 75, rocket.position.y, 30, 5)
        laser.velocityX = 7
        laserGroup.add(laser)
        laser.shapeColor = "red"
    }
}

function retry() {
    if (mousePressedOver(restart)) {
        console.log("i am from mouse pressed ")
       
        score = 0;
    } 
    gameState = "play";
    console.log("i am from retry()"+gameState);
}

function spawnAsteroids() {
    if (frameCount % 180 === 0) {
        asteroid = createSprite(1200, 400, 40, 40)
        asteroid.position.y = Math.round(random(50, 450))
        asteroid.velocityX = -5
        asteroid.lifetime = 240

        asteroid.addImage(asteroidImg)
        asteroid.rotation = 90
        asteroid.scale = 0.1

        asteroidGroup1.add(asteroid)
    }
}

function spawnAsteroids2() {
    if (frameCount % 250 === 0) {
        asteroid = createSprite(1200, 400, 40, 40)
        asteroid.position.y = Math.round(random(50, 450))
        asteroid.velocityX = -5
        asteroid.lifetime = 240

        asteroid.addImage(asteroidImg)
        asteroid.rotation = 90
        asteroid.scale = 0.1

        asteroidGroup2.add(asteroid)
    }
}