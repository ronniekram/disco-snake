class Food {
  constructor(pos, color) {
    this.x = pos.x;
    this.y = pos.y;
    this.color = color;
  };

  draw() {
    ctx.beginPath();
    ctx.rect(this.x, this.y, tileSize, tileSize);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  };
};