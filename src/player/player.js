/*eslint no-restricted-imports: ["error", "fs"]*/


class Player {
  constructor(ctx, name, hp, killCount, x, y, radius, color, velocity) {
    this.ctx = ctx
    this.name = name;
    this.hp = hp;
    this.killCount = killCount;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw = () => {
      //Draw Blue Sphere Player Object
      this.ctx.beginPath()
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
      this.ctx.fillStyle = this.color
      this.ctx.fill()
      //Draw Player Name
      this.ctx.font = 'bold 12px verdana';
      this.ctx.fillStyle = "green"
      this.ctx.fillText(this.playerName, this.x - this.radius + 3, this.y + 3)
      //Draw Player Healthbar
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
      // Draw Kill Count
      this.ctx.font = 'bold 16px serif';
      this.ctx.fillStyle = "gold"
      this.ctx.fillText("Kill Count: " + this.killCount, 20, 100)
  }

  update = () =>{
    this.draw()
    this.x = this.x + this.velocity.x
    this.y = this.y + this.velocity.y
  }
}

export const createNewPlayer = ({context, name}) => {
  const ctx = context;
  const playerName = name;
  const hp = 10;
  const radius = 30;
  const x = 0; //canvas.width / 2; // Zcenter player
  const y = 0; //canvas.height / 2;
  const color = "white";
  const killCount = 0;
  // const ammo = 100;
  const velocity = {
    x: 0,
    y: 0,
  };

  return new Player(ctx, playerName, hp, killCount, x, y, radius, color, velocity);
};
