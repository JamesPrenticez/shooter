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

    // Gravity and ground detection
    this.gravity = .12;
    this.isOnGround = false;
    this.isCrouching = false;
    this.isJumping = false;

    // Jump
    // this.jumpVelocity = -100;

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
      // console.log('Loading image from:', imageSrc); 
    this.img.src = "./assets/sprites/player/player.png"

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

  };

  pickUpWeapon = (weapon) => {
    this.weapon = weapon;
  }

  physics = () => {
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;

    // Apply gravity
    if (!this.isOnGround) {
      this.velocity.y += this.gravity;
    }
    
    // Small threshold to avoid floating-point precision issues
    const threshold = 0.01;

    if (Math.abs(this.velocity.x) < threshold) {
        this.velocity.x = 0;
    }
    if (Math.abs(this.velocity.y) < threshold) {
        this.velocity.y = 0;
    }
  }

  movePlayer = () => {
    let accelerationX = 0;
    // let accelerationY = 0; // jump doesnt use acceleration... yet

    if (this.w && this.isOnGround && !this.isCrouching && !this.isJumping) {
      this.isCrouching = true;
      setTimeout(() => {
        this.isOnGround = false;
        this.isJumping = true;
        this.isCrouching = false;
        this.velocity.y -= 20;
      }, 50);
    }

    if (this.a) {
      accelerationX -= this.acceleration;
    }
    if (this.s) {
      // do nothing
    }
    if (this.d) {
      accelerationX += this.acceleration;
    }

    // Calculate the combined speed
    this.speed = Math.sqrt(this.velocity.x ** 2);
    this.speed = Math.round(this.speed * 1000) / 1000; 

    // Reduces jumping too high while running
    // Normalize the velocity vector if the speed exceeds maxSpeed
    if (this.speed > this.maxSpeed) {
      const ratio = this.maxSpeed / this.speed;
      this.velocity.x *= ratio;
      this.velocity.y *= ratio;
      this.speed = this.maxSpeed;
    }
    
    this.velocity.x += accelerationX;
    // this.velocity.y += accelerationY; // jump doesnt use acceleration... yet

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;


    // Handle facing right/left
    if (this.velocity.x > 0) {
      this.facingRight = true;
    } else if (this.velocity.x < 0) {
      this.facingRight = false;
    }

    // Handle ground collision
    const groundLevel = 500; // Replace with your actual ground level
    if (this.position.y + this.radius >= groundLevel) {
      this.position.y = groundLevel - this.radius;
      this.velocity.y = 0;
      this.isOnGround = true;
      this.isJumping = false;
    } else {
      this.isOnGround = false;
    }
  }
  
  setPlayerAction = () => {
    if (this.isCrouching){
      this.action = 'crouch';
    }
    else if(this.isJumping) {
      this.action = 'jump';
    } else if (this.speed < 0.4) {
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
      case 'crouch':
        this.frameRow = 3;
        this.frameColumn = 0;
        this.frameCurrent = 0;
        break
      case 'jump':
        this.frameRow = 3; 
        if(this.velocity.y > 2.36){
          this.frameColumn = 3;
          this.frameCurrent = 3;
        } else {
          this.frameColumn = 1;
          this.frameCurrent = 1;
        }
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
