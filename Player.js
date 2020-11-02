class Player {
  constructor(px, py) {
    this.px = px;
    this.py = py;
    this.size = 20;
  }
  draw() {
    game.ctx.fillStyle = "green";
    game.ctx.fillRect(this.px * game.blockSize, this.py * game.blockSize, this.size, this.size);
  }
}
