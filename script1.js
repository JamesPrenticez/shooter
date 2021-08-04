//console.log(gsap)
let canvas = document.getElementById('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let context = canvas.getContext('2d')
let lastFrameTime = 0
let currentFrameTime = Date.now()


class Player{
    constructor(playerName, hp, killCount, x, y, radius, color, velocity) {
        this.playerName = playerName
        this.hp = hp
        this.killCount = killCount
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw(){
        //Draw Blue Sphere Player Object
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)    
        context.fillStyle = this.color
        context.fill()
        //Draw Player Name
        context.font = 'bold 12px verdana';
        context.fillStyle = "green"
        context.fillText(this.playerName, this.x - this.radius + 3, this.y + 3)
        //Draw Player Healthbar
        context.beginPath();
        context.moveTo(this.x - this.radius, this.y - this.radius - 20);
        context.lineTo(this.x - this.radius + this.hp * 6, this.y - this.radius - 20);
        context.strokeStyle = "#33FF00";
        context.lineWidth = 12;
        context.stroke();
        //Draw HP text
        context.font = 'bold 12px serif';
        context.fillStyle = "red"
        context.fillText(this.hp + "/10", this.x - this.radius + 18, this.y - this.radius - 16, 100)
        // Draw Kill Count
        context.font = 'bold 16px serif';
        context.fillStyle = "gold"
        context.fillText("Kill Count: " + this.killCount, 20, 100)
    } 
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

let players = []

//Create New Player
function newPlayer(){
    var playerName = "player 1"
    var hp = 10
    var radius = 30

    // Centre the player
    var x = canvas.width / 2 
    var y = canvas.height / 2 
    
    //Spawn in a random start location
    // if (Math.random() < .5){
    //     x = Math.random() < 0.5 ?  - radius : canvas.width + radius
    //     y = Math.random() * canvas.height
    // } else {
    //     x = Math.random() * canvas.width
    //     y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
    // }

    //Static Color
    var color = 'white'
    //Random Color
    //let randomHex = Math.floor(Math.random()*16777215).toString(16);
    //let color = "#" + randomHex;

    var killCount = 0
    var ammo = 100
    var velocity = {
        x: 0,
        y: 0
    }

    // (playerName, hp, killCount, ammo, x, y, radius, color) {
    players.push(new Player(playerName, hp, killCount, x, y, radius, color, velocity))
}

newPlayer()
let player = players[0]
//console.log(players)

// Move Player
canvas.addEventListener('keydown', (event) => {
    
    // Up - W Key
        if(event.key == "w" && player.y  > 0 + player.radius){
            player.velocity.y =- 3;
            //console.log(player.velocity.y)
        }
        
    // Left - A Key
        if(event.key == "a" && player.x  > 0 + player.radius){
            player.velocity.x =- 3;
        }
    // Down - S Key
        if(event.key == "s" && player.y  < canvas.height - player.radius){
            player.velocity.y =+ 3;
            console.log(canvas.height)
            console.log(player.y)
        }
    // Right - D Key  
        if(event.key == "d" && player.x  < canvas.width - player.radius){
            player.velocity.x =+ 3;
        } 
    })

//Stop Player
canvas.addEventListener('keyup', (event) => {
        // Up - W Key
        if(event.key == "w"){
            player.velocity.y = 0;
        }
        
    // Left - A Key
        if(event.key == "a"){
            player.velocity.x = 0;
        }
    // Down - S Key
        if(event.key == "s"){
            player.velocity.y = 0;
        }
    // Right - D Key  
        if(event.key == "d"){
            player.velocity.x = 0;
        } 
})

        // if(event.keyCode[87] && player.y > 2){
        //   player.y -= player.velocity;
        // }
        // if(keys[83] && player1.y < (HEIGHT - player1.h - 2)){
        //   player1.y += SPEED;
        // }
        // if(keys[65] && player1.x > 2){
        //   player1.x -= SPEED;
        // }
        // if(keys[68] && player1.x < (WIDTH - player1.w - 2)){
        //   player1.x += SPEED;
        // } else return 



// Projectiles
class Projectile {
    constructor(x, y, radius, color, velocity){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw(){
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)    
        context.fillStyle = this.color
        context.fill()
    }
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

let projectiles = []

//Event Listener - Projectiles - OnMouseDown
canvas.addEventListener('mousedown', (event) => {
//console.log(projectiles)

    let angle = Math.atan2(
        event.clientY - player.y,
        event.clientX - player.x)

    // Multiply by factor to increase shooting speeds =)
        let velocity = {
            x: Math.cos(angle) * 4,
            y: Math.sin(angle) * 4
        }
        //console.log(velocity)

        projectiles.push(new Projectile(
            player.x,
            player.y,
            5,
            'hsl(0, 0%, 100%)',
            velocity
            )
        )

    //console.log(angle)
    //For some reason this function takes y,x not x,y
    //Take the mouse destination from event
    //console.log(event)
    
    //Instead of using the centre of the screen we use the play x,y
    //event.clientX ----- for cursor
    //event.clientY ----- for cursor
    //canvas.width / 2 ------ for centre
    //canvas.height / 2 ----- for centre
    //player.x
    //player.y
})

// Enemies
class Enemy {
    constructor(x, y, radius, color, velocity){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }
    draw(){
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)    
        context.fillStyle = this.color
        context.fill()
    }
    update(){
        this.draw()
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

let enemies = []

// Enemies Explode
let friction = 0.99

class Particle {
    constructor(x, y, radius, color, velocity, alpha){
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
        this.alpha = 1 //make particles disappear
    }
    draw(){
        //Using canvas to edit opacity values is a little tricky
        //We need to call save which puts us in this kinda state
        //Where we can call a canvas global function
        //But its only going to effect the code in this function locally
        context.save()//need this
        context.globalAlpha = this.alpha // to change this
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)    
        context.fillStyle = this.color
        context.fill()
        context.restore()//need this
    }
    update(){
        this.draw()
        this.x = this.x + this.velocity.x //here calculate direction away from player
        this.y = this.y + this.velocity.y 
        this.alpha -= 0.01
    }
}

let particles = []


function spawnEnemies(){
    //Instead of using requestAnimationFrame 
    //We are going to use setInterval
    setInterval(() => {
        let radius = Math.random() * (30 - 10) + 10

        let x 
        let y

        if (Math.random() < .5){
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
            y = Math.random() * canvas.height
        } else {
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }

        let color = `hsl(${Math.random() * 360}, 75%, 50%)`

        let angle = Math.atan2(
            player.y - y,
            player.x - x)
        //console.log(angle)
        let velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemies.push(new Enemy(x, y, radius, color, velocity))

        //console.log(enemies)
    }, 1000) //every 1 second)
}

//Frame Rate
class Frame {
    constructor(currentSecond, frameCount, lastFrameTime){
        this.currentSecond = currentSecond
        this.frameCount = frameCount
        this.lastFrameTime = lastFrameTime
    }
    draw(framesLastSecond){
        context.font = 'bold 50px serif';
        context.fillStyle = "#ff0000"
        context.fillText("FPS: " + framesLastSecond, 20, 50)
    }
    update(){
        
        let sec = Math.floor(Date.now()/1000)

        if(sec != this.currentSecond){
            this.currentSecond = sec
            this.framesLastSecond = this.frameCount
            this.frameCount = 1;
        } else {
            this.frameCount ++
        }
        this.draw(this.framesLastSecond)
    }
}

let frame = new Frame(
    0,
    0,
    lastFrameTime
    )


//
let animationID

//Main draw/animate functin
//requestAnimationFrame will call this function over and over in a loop
function animate(){
    // Animation ID 
    animationID = requestAnimationFrame(animate)

    //Redraw Background
    context.fillStyle = 'rgba(0, 0, 0, 0.1)'
    context.fillRect(0, 0, canvas.width, canvas.height);

    //FPS
    frame.update()

    // Player
    player.update()

    // Projectile
    // projectile.draw()
    // projectile.update()
    projectiles.forEach((projectile, projectileIndex) => {
        projectile.update()
        //Preform collision detection with the edge of canvas
        //So that we are not waasting computational power on things we can't even see!
        if(
            projectile.x + projectile.radius < 0                ||
            projectile.x - projectile.radius > canvas.width     ||
            projectile.y + projectile.radius < 0                ||
            projectile.y - projectile.radius > canvas.height    
            ) {
            setTimeout(() => {
                projectiles.splice(projectileIndex, 1)
            }, 0)
        }
    })
    //Explosions for Particles when projectiles kill enmey
    particles.forEach((particle, particlesIndex) =>  {
        if(particle.alpha <=0) {
            particles.splice(particlesIndex, 1)
        } else{
        particle.update()
        }
    })

    // Player Does Damage to Enemies
    // Remember foreEach does automatic indexing of the second arugment
    players.forEach((player, playerIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            enemy.update()
            //Nested loop to check the distance to each one of our projectiles
            projectiles.forEach((projectile, projectileIndex) => {
                const dist =  Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y)
                
                //collision detection AKA objects touch eachother
                if(dist - enemy.radius - projectile.radius < 1){
                    //Create Particles to Make enemy explode
                    for (let i = 0; i < enemy.radius * 8; i++){
                        particles.push(new Particle(
                            projectile.x,
                            projectile.y,
                            Math.random() * 2,
                            enemy.color,
                            {
                                x: (Math.random() - 0.5) * (Math.random() * 4),
                                y: (Math.random() - 0.5) * (Math.random() * 4)}
                            ))
                    }
                    
                    //Shrink Enemy on hit
                    if(enemy.radius - 10 > 5){
                        gsap.to(enemy, {
                            radius: enemy.radius - 10
                        })
                        projectiles.splice(projectileIndex, 1)
                    } else {
                        //remove from screen
                        enemies.splice(enemyIndex, 1)
                        projectiles.splice(projectileIndex, 1)
                        //Update enemy death on the score card
                        players[playerIndex].killCount += 1
                    }
                }
            })
        })
    })
    
    // Player Takes Damage from Emeny
    players.forEach((player, playerIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            const dist =  Math.hypot(player.x - enemy.x, player.y - enemy.y)
            
            //console.log(enemy.radius - player.radius)
            //collision detection AKA objects touch eachother
            //console.log(dist - enemy.radius - player.radius < 1)
            if(dist - enemy.radius - player.radius < 1){
                if(players[playerIndex].hp == 1){
                    //Stop game on this specific frame
                    cancelAnimationFrame(animationID)
                    console.log("end game")
                } else {
                    //reduce hp by 1
                    players[playerIndex].hp -= 1
                    //Remove the enemy that did the damage
                    enemies.splice(enemyIndex, 1)
                } 
            }
        })
    })

    // Update LastFrameTime Global
    lastFrameTime = currentFrameTime    

    //Request next animation frame
   // window.requestAnimationFrame(animate)
}

animate()
spawnEnemies()        

