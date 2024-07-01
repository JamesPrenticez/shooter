class Controls {
  constructor(name, damage, frameScale, frameXOffset, frameYOffset, imageSrc) {
    this.name = name;
    this.damage = damage;

    this.frameWidth = 512;
    this.frameHeight = 512;
    this.frameXOffset = frameXOffset;
    this.frameYOffset = frameYOffset;
    this.frameScale = frameScale

    this.image = new Image();
    this.image.src = './controls/sprites/controlsSpriteSheet.png';
  }

  draw(ctx) {

    const sourceX = x + this.frameXOffset;
    const sourceY = y + this.frameYOffset;
    const w =  this.frameWidth * this.frameScale;
    const h = this.frameHeight * this.frameScale;

    ctx.drawImage(this.image, sourceX, sourceY, w, h); // Adjust size and position as needed
  }
}

export const createNewControls = ({ctx}) => {
  return new Controls(ctx);
};
