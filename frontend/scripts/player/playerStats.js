
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
