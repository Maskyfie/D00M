const pi = 3.141;

class Player {
  constructor(px, py) {
    this.px = px;
    this.py = py;
    this.size = 20;
    this.camSize = game.wallSize / 2;
    this.direction = 0;
    this.fov = 60;
    this.camAngle = 20;
    this.viewMax = 10;
    this.rayon = game.width;
    this.rayon = game.width;
    this.distCam = Math.floor(game.width / 2 / Math.tan((pi * (this.fov / 2)) / 180));
  }

  drawInMap() {
    game.ctx.fillStyle = "green";
    game.ctx.fillRect(this.px * game.blockSize, this.py * game.blockSize, this.size, this.size);
  }
  detectWalls() {
    px = this.px;
    py = this.py;
  }

  update() {
    game.ctx.clearRect(0, 0, game.width, game.height);
    for (let i = 0; i < this.rayon; i++) {
      var pointYY = 0;
      var pointYX = 0;
      var pointXY = 0;
      var pointXX = 0;
      var yyDist = 0;
      var yxDist = 0;
      var xyDist = 0;
      var xxDist = 0;

      var angRayon = this.camAngle + this.fov / 2 - (this.fov / game.width) * i;
      if (angRayon < 0) angRayon = 360;
      if (angRayon > 360) angRayon = 0;

      angRayon = angRayon.toFixed(2);

      if (angRayon > 0 && angRayon < 180) {
        pointXX = this.px + 1;
        yyDist = 1;
      } else {
      }

      if (angRayon < 90 || angRayon > 270) {
        pointYa = 1;
      } else {
        pointYa = -1;
      }
    }
  }
}
