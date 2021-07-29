let canvas = document.getElementById('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let context = canvas.getContext('2d')
let lastFrameTime = 0
let currentFrameTime = Date.now()


class Player{
    constructor(playerName, hp, killCount, ammo, x, y, radius, color) {
        this.playerName = playerName
        this.hp = hp
        this.killCount = killCount
        this.ammo = ammo
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
    draw(){
        //Draw Blue Sphere Player Object
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)    
        context.fillStyle = this.color
        context.fill()
        //Draw Player Name
        context.font = 'bold 16px serif';
        context.fillStyle = "gold"
        context.fillText(this.playerName, this.x - this.radius + 3, this.y)
        //Draw Player Healthbar
        context.beginPath();
        context.moveTo(this.x - this.radius, this.y - this.radius - 20);
        context.lineTo(this.x - this.radius + this.hp, this.y - this.radius - 20);
        context.strokeStyle = "#33FF00";
        context.lineWidth = 12;
        context.stroke();
        //Draw HP text
        context.font = 'bold 12px serif';
        context.fillStyle = "red"
        context.fillText(this.hp + "/60", this.x - this.radius + 18, this.y - this.radius - 16, 100)
    } 
    update(){
        // Draw Kill Count
        context.font = 'bold 16px serif';
        context.fillStyle = "gold"
        context.fillText("Kill Count: " + this.killCount,20, 100)
        // Draw Ammo
        context.font = 'bold 16px serif';
        context.fillStyle = "gold"
        context.fillText("Ammunition: " + this.ammo,20, 150)
        this.draw()
    }
}

let players = []

//Create New Player
function newPlayer(){
    let playerName = "player 1"
    let hp = 10
    let radius = 30

    // Centre the player
    let x = canvas.width / 2 
    let y = canvas.height / 2 
    
    //Spawn in a random start location
    // if (Math.random() < .5){
    //     x = Math.random() < 0.5 ?  - radius : canvas.width + radius
    //     y = Math.random() * canvas.height
    // } else {
    //     x = Math.random() * canvas.width
    //     y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
    // }

    //Static Color
    let color = "blue"
    //Random Color
    //let randomHex = Math.floor(Math.random()*16777215).toString(16);
    //let color = "#" + randomHex;

    let killCount = 0
    let ammo = 100

    // (playerName, hp, killCount, ammo, x, y, radius, color) {
    players.push(new Player(playerName, hp, killCount, ammo, x, y, radius, color))
}

newPlayer()
let player = players[0]
//console.log(players)


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
console.log(projectiles)

    let angle = Math.atan2(
        event.clientY - player.y,
        event.clientX - player.x)

    // Multiply by factor to increase shooting speeds =)
        let velocity = {
            x: Math.cos(angle) * 4,
            y: Math.sin(angle) * 4
        }

        projectiles.push(new Projectile(
            player.x,
            player.y,
            5,
            'red',
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

        let color = 'white'

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
                    //remove from screen
                    enemies.splice(enemyIndex, 1)
                    projectiles.splice(projectileIndex, 1)
                    //Update enemy death on the score card
                    players[playerIndex].killCount += 1
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

