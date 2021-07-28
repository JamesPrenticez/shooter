let canvas = document.getElementById('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

let context = canvas.getContext('2d')




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

player.draw()

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


//Main draw/animate functin
//requestAnimationFrame will call this function over and over in a loop
function animate(){
    requestAnimationFrame(animate)
    projectile.draw()
    projectile.update()
    //console.log("hi")
}


animate()