class Weapon {
  constructor(name, damage, frameScale, frameXOffset, frameYOffset, imageSrc) {
    this.name = name;
    this.damage = damage;

    this.frameWidth = 512;
    this.frameHeight = 512;
    this.frameXOffset = frameXOffset;
    this.frameYOffset = frameYOffset;
    this.frameScale = frameScale

    this.image = new Image();
    console.log('Loading image from:', imageSrc); 
    this.image.src = imageSrc; //'./weapons/sprites/bow.png';
  }

  draw(ctx, x, y, facingRight) {

    const sourceX = x + this.frameXOffset;
    const sourceY = y + this.frameYOffset;
    const w =  this.frameWidth * this.frameScale;
    const h = this.frameHeight * this.frameScale;


    ctx.save();
    if (facingRight) {
      ctx.scale(1, 1);
      ctx.drawImage(this.image, sourceX, sourceY, w, h); // Adjust size and position as needed
    } else {
      ctx.scale(-1, 1);
      ctx.drawImage(this.image, -sourceX - 32, sourceY, w, h); // Adjust size and position as needed
    }
    ctx.restore();
  }
}

export const createNewWeapon = ({ctx, name, frameScale, frameXOffset, frameYOffset, src}) => {
  return new Weapon(ctx, name, frameScale, frameXOffset, frameYOffset, src);
};
