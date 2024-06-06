class Player {
  constructor(ctx, name, x, y) {
    this.ctx = ctx;
    this.name = name;
    this.position = {x, y}

    this.hp = 10;
    this.killCount = 0;
    this.radius = 10;
    this.color = "#FFF";
    this.velocity = {x: 0, y: 0};
    this.maxSpeed = 5;
    this.friction = 0.960;

    // Player Controls
    this.playerControls();

    this.up = false;
    this.left = false;
    this.down = false;
    this.right = false;
    
    this.space = false;
    this.plus = false;
    this.minus = false;


    this.test = 90

    // Load sprite images
    this.frameRow = 0; 
    this.frameColumn = 0;
    this.frameSpeed = 10;
    this.frameCurrent = 0;
    this.frameLength = 7;
    this.frameWidth = 512;
    this.frameHeight = 512;
    this.frameXOffset = 200;
    this.frameYOffset = 200;
    this.frameScale = 0.5;

    this.action = "idle"

    /*===============
     * Player
     * Sprite Sheet
     * Height = 512 px
     * Width = 43008 px
     * Cols = 1
     * Rows = 84
     * Walking = 
     * Run = 59 to 66
    ================*/

    this.img = new Image()
    this.img.src = './player/sprites/spritesheet.png'

  }

  update = () =>{
    this.physics();
    this.movePlayer();
    this.drawPlayerSprite();
    this.setPlayerAction();
  }

  drawPlayerSprite = () => {
    this.frameColumn++;

    if (this.frameColumn >= this.frameSpeed) {
      this.frameColumn = 0;
  
      // Update the current frame
      this.frameCurrent++;

      // Reset if too much
      if (this.frameCurrent > this.frameLength) {
        this.frameCurrent = 0;
      }
    }
  
    // Calculate the x coordinate for the source image based on the current frame
    const sourceX = (this.frameCurrent * this.frameWidth) + this.frameXOffset;
    const sourceY = (this.frameRow * this.frameHeight) + this.frameYOffset;

    this.ctx.drawImage(
      this.img, // image
      sourceX, // source x
      sourceY, // source y (assuming the sprite is in the first row)
      512, // source width
      512, // source height
      this.position.x - (32), // x
      this.position.y - (32), // y
      this.frameWidth * this.frameScale, // destination width
      this.frameHeight * this.frameScale, // destination height
    );
  
    switch (this.action) {
      case 'idle':
        this.frameRow = 0;
        this.frameLength = 7;
        break;
      case 'walk':
        this.frameRow = 1;
        this.frameLength = 7;
        break;
      case 'run':
        this.frameRow = 2;
        this.frameLength = 7;
        break;
      // Add other actions if needed
    }
  };

  drawPlayerName = () => {
    this.ctx.font = 'bold 12px verdana';
    this.ctx.fillStyle = "green"
    this.ctx.fillText(this.playerName, this.x - this.radius + 3, this.y + 3)
  }
  drawPlayerHP = () => {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x - this.radius, this.y - this.radius - 20);
    this.ctx.lineTo(this.x - this.radius + this.hp * 6, this.y - this.radius - 20);
    this.ctx.strokeStyle = "#33FF00";
    this.ctx.lineWidth = 12;
    this.ctx.stroke();

    //Draw HP text
    this.ctx.font = 'bold 12px serif';
    this.ctx.fillStyle = "red"
    this.ctx.fillText(this.hp + "/10", this.x - this.radius + 18, this.y - this.radius - 16, 100)
  }

  drawPlayerKillCount = () => {
    // Draw Kill Count
    this.ctx.font = 'bold 16px serif';
    this.ctx.fillStyle = "gold"
    this.ctx.fillText("Kill Count: " + this.killCount, 20, 100)
  }

  physics = () => {
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  movePlayer = () => {
    if (this.w && this.velocity.y > -this.maxSpeed) {
      this.velocity.y -= 0.15;
    }
    if (this.a && this.velocity.x > -this.maxSpeed) {
      this.velocity.x -= 0.15;
    }

    if (this.s && this.velocity.y < this.maxSpeed) {
      this.velocity.y += 0.15;
    }

    if (this.d && this.velocity.x < this.maxSpeed) {
      this.velocity.x += 0.15;
    }
  }

  setPlayerAction = () => {
    const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
  
    console.log(speed)

    if (speed < 0.1) {
      this.action = 'idle';
    } else if (speed <= 2) {
      this.action = 'walk';
    } else {
      this.action = 'run';
    }
  
    // Determine the direction
    let direction = '';
    if (this.w) direction += 'up';
    if (this.s) direction += 'down';
    if (this.a) direction += 'left';
    if (this.d) direction += 'right';
  
    switch (direction) {
      case 'upright':
        this.action += '_up_right';
        break;
      case 'upleft':
        this.action += '_up_left';
        break;
      case 'downright':
        this.action += '_down_right';
        break;
      case 'downleft':
        this.action += '_down_left';
        break;
      case 'up':
        this.action += '_up';
        break;
      case 'down':
        this.action += '_down';
        break;
      case 'left':
        this.action += '_left';
        break;
      case 'right':
        this.action += '_right';
        break;
      default:
        // No direction keys are pressed, so keep the action as is
        break;
    }
  };

  playerControls(){
    document.addEventListener('keydown', (e) => {
      switch(e.key){
        case "w":
          this.w = true
          break
        case "a":
          this.a = true
          break
        case "s":
          this.s = true
          break
        case "d":
          this.d = true
          break
      }
    })
    document.addEventListener('keyup', (e) => {
      switch(e.key){
        case "w":
          this.w = false
          break
        case "a":
          this.a = false
          break
        case "s":
          this.s = false
          break
        case "d":
          this.d = false
          break
      }
    })
  }


}

export const createNewPlayer = ({ctx, name, x, y}) => {
  return new Player(ctx, name, x, y);
};


// ctx.drawImage(
//   this.img, //image
//   this.width * this.frameX, // source x
//   this.height * this.frameY, // source y
//   this.width, // source width
//   this.height, // source height
//   this.x, // x
//   this.y, // y
//   this.width * 4, // destination width
//   this.height * 4, // destination height
// )