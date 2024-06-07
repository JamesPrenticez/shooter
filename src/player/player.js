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
    this.speed = 0;
    this.baseAcceleration = 0.07
    this.acceleration = 0.07; // Initial acceleration
    this.accelerationIncrement = 0.0008; // Acceleration increment
    this.maxAcceleration = 0.14; // Maximum acceleration
    this.maxSpeed = 3;
    this.walkFriction = 0.95;
    this.friction = this.walkFriction;
    this.runFriction = 0.98;

    // Player Controls
    this.playerControls();

    this.up = false;
    this.left = false;
    this.down = false;
    this.right = false;
    
    this.space = false;
    this.plus = false;
    this.minus = false;

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
    this.facingRight = true;

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

    // Inventory
    this.weapon = null;

  }

  update = () =>{
    this.physics();
    this.movePlayer();
    this.setPlayerAction();
    this.drawPlayerSprite();
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
    const width = this.frameWidth * this.frameScale;
    const height = this.frameHeight * this.frameScale;
    const x = this.position.x - 32;
    const y = this.position.y - 32;

    this.ctx.save();

    if (this.facingRight) {
      this.ctx.scale(1, 1);
      this.ctx.drawImage(this.img, sourceX, sourceY, 512, 512, x, y, width, height);
    } else {
      this.ctx.scale(-1, 1);
      this.ctx.drawImage(this.img, sourceX, sourceY, 512, 512, -x - 64, y, width, height);
    }

    this.ctx.restore();

    // Draw the weapon if the player has one
    if (this.weapon) {
      this.weapon.draw(this.ctx, this.position.x, this.position.y, this.facingRight);
    }

    // this.ctx.drawImage(
    //   this.img, // image
    //   sourceX, // source x
    //   sourceY, // source y (assuming the sprite is in the first row)
    //   512, // source width
    //   512, // source height
    //   this.position.x - (32), // x
    //   this.position.y - (32), // y
    //   this.frameWidth * this.frameScale, // destination width
    //   this.frameHeight * this.frameScale, // destination height
    // );
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

  pickUpWeapon = (weapon) => {
    this.weapon = weapon;
  }

  physics = () => {
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    
    // Small threshold to avoid floating-point precision issues
    const threshold = 0.01;

    if (Math.abs(this.velocity.x) < threshold) {
        this.velocity.x = 0;
    }
    if (Math.abs(this.velocity.y) < threshold) {
        this.velocity.y = 0;
    }

    // Applying the friction might result in slightly less than maxSpeed
    // So we normalize it again after friction is applied if it is close to maxSpeed
    // if (this.speed > this.maxSpeed - threshold) {
    //     const ratio = this.maxSpeed / this.speed;
    //     this.velocity.x *= ratio;
    //     this.velocity.y *= ratio;
    //     this.speed = this.maxSpeed; // Ensure speed is exactly maxSpeed
    // }

  }

  movePlayer = () => {
    let accelerationX = 0;
    let accelerationY = 0;

    if (this.w) {
        accelerationY -= this.acceleration;
    }
    if (this.a) {
        accelerationX -= this.acceleration;
    }
    if (this.s) {
        accelerationY += this.acceleration;
    }
    if (this.d) {
        accelerationX += this.acceleration;
    }

    // Calculate the combined acceleration
    const combinedAcceleration = Math.sqrt(accelerationX ** 2 + accelerationY ** 2);

    if (combinedAcceleration > 0) {
      // Normalize acceleration to ensure consistent speed increase
      accelerationX = (accelerationX / combinedAcceleration) * this.acceleration;
      accelerationY = (accelerationY / combinedAcceleration) * this.acceleration;
    }

    this.velocity.x += accelerationX;
    this.velocity.y += accelerationY;

    // Calculate the combined speed
    this.speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
    this.speed = Math.round(this.speed * 1000) / 1000; 

    // Normalize the velocity vector if the speed exceeds maxSpeed
    if (this.speed > this.maxSpeed) {
        const ratio = this.maxSpeed / this.speed;
        this.velocity.x *= ratio;
        this.velocity.y *= ratio;
        this.speed = this.maxSpeed; // Ensure speed is exactly maxSpeed
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Handle facing right/left
    if (this.velocity.x > 0) {
      this.facingRight = true;
    } else if (this.velocity.x < 0) {
      this.facingRight = false;
    }
  }

  setPlayerAction = () => {


     // Determine the direction for animation purposes
    //  let direction = '';
    //  if (this.w) direction += 'up';
    //  if (this.s) direction += 'down';
    //  if (this.a) direction += 'left';
    //  if (this.d) direction += 'right';
 
    //  // Update the frame row based on the direction
    //  switch (direction) {
    //     case 'up':
    //       this.action = "walk"
    //       // this.frameRow = 1;
    //       break;
    //     case 'down':
    //       this.action = "walk"
    //       // this.frameRow = 1;
    //       break;
    //     case 'left':
    //       this.action = "walk"
    //       // this.frameRow = 1;
    //       break;
    //     case 'right':
    //       this.action = "walk"
    //       // this.frameRow = 1;
    //       break;
    //     // Add other direction cases if needed
    //     default:
    //       this.action = "idle"
    //       //this.frameRow = 0; // Default to idle frame row
    //       break;
    //   }

      // console.log(this.speed)

      if (this.speed < 0.4) {
        this.friction = this.walkFriction 
        this.acceleration = this.baseAcceleration
        this.action = 'idle';
      } else if (this.speed <= 1.99) {
        this.action = 'walk';
      } else {
        this.friction = this.runFriction
        this.action = 'run';
      }

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
  
    // Determine the direction
    // let direction = '';
    // if (this.w) direction += 'up';
    // if (this.s) direction += 'down';
    // if (this.a) direction += 'left';
    // if (this.d) direction += 'right';
  
    // switch (direction) {
    //   case 'upright':
    //     this.action += '_up_right';
    //     break;
    //   case 'upleft':
    //     this.action += '_up_left';
    //     break;
    //   case 'downright':
    //     this.action += '_down_right';
    //     break;
    //   case 'downleft':
    //     this.action += '_down_left';
    //     break;
    //   case 'up':
    //     this.action += '_up';
    //     break;
    //   case 'down':
    //     this.action += '_down';
    //     break;
    //   case 'left':
    //     this.action += '_left';
    //     break;
    //   case 'right':
    //     this.action += '_right';
    //     break;
    //   default:
    //     // No direction keys are pressed, so keep the action as is
    //     break;
    // }

    // switch (this.action) {
    //   case 'idle':
    //     this.frameRow = 0;
    //     this.frameLength = 7;
    //     break;
    //   case 'walk':
    //     this.frameRow = 1;
    //     this.frameLength = 7;
    //     break;
    //   case 'run':
    //     this.frameRow = 2;
    //     this.frameLength = 7;
    //     break;
    //   // Add other actions if needed
    // }
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
      if (this.acceleration < this.maxAcceleration) {
        this.acceleration += this.accelerationIncrement;
      }
      this.setPlayerAction(); // Update action on key down
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
      //this.acceleration = this.baseAcceleration; // Reset acceleration when keys are released
      this.setPlayerAction(); // Update action on key up
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