
class Map {
  constructor(ctx, name, tileSize, x, y, collisionValues, collisionBlocks) {
    this.ctx = ctx;
    this.name = name;
    this.tileSize = tileSize
    this.x = x;
    this.y = y;
    this.collisonBlocks = collisionBlocks;
    this.collisionValues = collisionValues;
  }

  update = () =>{
    this.drawCollisions();
  }

  drawCollisionBlocks = () => {

  }

  drawCollisions = () => {
    this.collisonBlocks.forEach((block) => {
        block.draw();
    })
  }
}
  
export const createNewMap = ({ctx, name, tileSize, x, y, collisionValues, collisionBlocks}) => {
  return new Map(ctx, name, tileSize, x, y, collisionValues, collisionBlocks);
};