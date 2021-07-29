let canvas = document.getElementById('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let context = canvas.getContext('2d')
let lastFrameTime = 0
let currentFrameTime = Date.now()


class Player{
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }
    draw(){
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)    
        context.fillStyle = this.color
        context.fill()
    }
}

// Centre the player
let x = canvas.width / 2 
let y = canvas.height / 2 

let player = new Player(x, y, 30, 'blue')

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
    //For some reason this function takes y,x not x,y
    //Take the mouse destination from event
    //console.log(event)
    let angle = Math.atan2(
        event.clientY - player.y,
        event.clientX - player.x)
    //console.log(angle)
    let velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    //Instead of using the centre of the screen we use the play x,y
    //event.clientX ----- for cursor
    //event.clientY ----- for cursor
    //canvas.width / 2 ------ for centre
    //canvas.height / 2 ----- for centre
    //player.x
    //player.y
    projectiles.push(new Projectile(
        player.x,
        player.y,
        5,
        'red',
        velocity
        )
    )
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
        let radius = 30
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

        console.log(enemies)
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

//Main draw/animate functin
//requestAnimationFrame will call this function over and over in a loop
function drawGame(){
    // Clear canvas for redraw
    context.clearRect(0, 0, canvas.width, canvas.height);
    //FPS
    frame.update()
    // Player
    player.draw()

    // Projectile
    // projectile.draw()
    // projectile.update()
    projectiles.forEach(projectile => {
        projectile.update()
    })

    // Enemies
    enemies.forEach((enemy) => {
        enemy.update()
    })
    
    // Update LastFrameTime Global
    lastFrameTime = currentFrameTime    

    //Request next animation frame
    window.requestAnimationFrame(drawGame)
    }
    


drawGame()
spawnEnemies()        
