class Tile {
  constructor(solid, px, py) {
    this.solid = solid;
    this.px = px;
    this.py = py;
  }
  draw() {
    if (this.solid) {
      game.ctx.fillStyle = "grey";
      game.ctx.fillRect(
        this.px * blockSize,
        this.py * blockSize,
        blockSize,
        blockSize
      );
    }
    if (!this.solid) {
      game.ctx.fillStyle = "white";
      game.ctx.fillRect(
        this.px * blockSize,
        this.py * blockSize,
        blockSize,
        blockSize
      );
    }
  }
}
