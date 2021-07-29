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
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
        console.log("bye")
    }
}

// let projectiles = [projectile]

let projectile = new Projectile(
    player.x,
    player.y,
    5,
    'red',
    {
        x: 1,
        y: 1
    })

//Event Listener - Projectiles - OnMouseDown
canvas.addEventListener('mousedown', (event) => {
    //console.log(event)
    //Instead of using the centre of the screen we use the play x,y
    //event.clientX ----- for cursor
    //event.clientY ----- for cursor
    //canvas.width / 2 ------ for centre
    //canvas.height / 2 ----- for centre
    //player.x
    //player.y
    
})

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

    // Draw Objects on Canvas
    // player.draw()
    // projectile.draw()
    // projectile.update()
    frame.update()
    
    projectiles.forEach(projectile => {
            projectile.update()
    })
    
    // Update LastFrameTime Global
    lastFrameTime = currentFrameTime    

    //Request next animation frame
    window.requestAnimationFrame(drawGame)
    }
    


drawGame()