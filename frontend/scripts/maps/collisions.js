const collisionsLevelOne = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 0,
  0, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0,
  0, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0,
  0, 292, 292, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 292, 0,
  0, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 292, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]

Array.prototype.parse2D = function (){
  const rows = []
  for (let i=0; i<this.length; i+=16){
    rows.push(this.slice(i, i+16))
  }
  return rows;
}

export const parsedCollisionsLevelOne = collisionsLevelOne.parse2D();

export class CollisionBlock {
  constructor({ ctx, position }){
    this.ctx = ctx;
    this.position = position;
    this.w = 64;
    this.h = 64;
  }

  draw = () => { 
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.position.x, this.position.y, this.w, this.h)
  }
}