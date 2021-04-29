class Snake {
  constructor(pos, color){
    this.x = pos.x;
    this.y = pos.y;
    this.tail = [{ x: pos.x - tileSize, y: pos.y }, { x: pos.x - tileSize * 2, y: pos.y }];
    this.velX = 1;
    this.velY = 0;
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

    for (let i = 0; i < this.tail.length; i++) {
      let tail = this.tail[i];
      ctx.beginPath();
      ctx.rect(tail.x, tail.y, tileSize, tileSize)
      ctx.fillStyle = randColor();
      ctx.fill();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
    };
  };

  move() {
    for (let i = this.tail.length - 1; i > 0; i--) {
      this.tail[i] = this.tail[i - 1];
    };

    if (this.tail.length != 0) {
      this.tail[0] = {x: this.x, y: this.y}
    };

    this.x += this.velX * tileSize;
    this.y += this.velY * tileSize;
  };

  dir(dirX, dirY) {
    this.velX = dirX;
    this.velY = dirY;
  };

  eat() {
    if (Math.abs(this.x - food.x) < tileSize && Math.abs(this.y - food.y) < tileSize) {
      this.tail.push({});
      return true;
    };
    return false;
  };

  dead() {
    for (let i = 0; i < this.tail.length; i++) {
      let tail = this.tail[i];
      if (Math.abs(this.x - tail.x) < tileSize && Math.abs(this.y - tail.y) < tileSize) {
        return true;
      };
    };
    return false;
  };

  border() {
    if (this.x + tileSize > width && this.velX != -1 || this.x < 0 && this.velX != 1) {
      this.x = width - this.x;
    } else if (this.y + tileSize > height && this.velY != -1 || this.velY != 1 && this.y < 0){
      this.y = height - this.y;
    };
  };
};