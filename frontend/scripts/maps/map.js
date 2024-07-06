import { CollisionBlock } from "./collisions";

class Map {
  constructor(ctx, name, tileSize, x, y, collisionValues) {
    this.ctx = ctx;
    this.name = name;
    this.tileSize = tileSize
    this.x = x;
    this.y = y;
    this.collisonBlocks = [];
    this.collisionValues = collisionValues;
  }

  update = () =>{
    this.drawCollisions();
  }

  drawCollisions = () => {
    this.collisionValues.forEach((row, y) => {
      row.forEach((value, x) => {
        if(value === 292) {
          this.collisonBlocks = new CollisionBlock({
            ctx: this.ctx,
            position: {
              x: x * this.tileSize.w,
              y: y * this.tileSize.h
            }
          }).draw();
        }
      })
    })
  }
}
  
export const createNewMap = ({ctx, name, tileSize, x, y, collisionValues}) => {
  return new Map(ctx, name, tileSize, x, y, collisionValues);
};