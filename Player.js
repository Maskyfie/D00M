const pi = 3.141;

class Player {
  constructor(px, py, x, y) {
    this.px = px;
    this.py = py;
    this.x = x;
    this.y = y;
    this.size = 20;
    this.camSize = game.wallSize / 2;
    this.rotation = 90;
    this.fov = 60;
    this.camAngle = 20;
    this.viewMax = 10;
    this.rayon = game.canvasWidth;
    this.speed = 10;
    this.speedRota = 10;
    this.distCam = Math.floor(
      game.canvasWidth / 2 / Math.tan((pi * (this.fov / 2)) / 180)
    );
  }

  drawInMap() {
    game.ctx.fillStyle = "green";
    game.ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  detectWalls() {
    px = this.px;
    py = this.py;
  }

  radar() {
    let quality = 0.5;
    let rayXposition = 0;
    for (
      let angle = this.rotation - this.fov / 2;
      angle < this.rotation + this.fov / 2;
      angle += quality
    ) {
      let found = false;

      let dist = 1;
      game.ctx.fillStyle = LightenDarkenColor("CCCCCC", 0);
      let sinAng = Math.sin(toRad(angle));
      let cosAng = Math.cos(toRad(angle));

      while (!found) {
        let dx = this.x + sinAng * dist;
        let dy = this.y + cosAng * dist;

        if (
          dx > 0 &&
          dx < game.canvasWidth &&
          dy > 0 &&
          dy < game.canvasWidth
        ) {
          if (
            map[Math.floor(dy / blockSize)][
              Math.floor(dx / blockSize)
            ].solid
          ) {
            found = true;
            if (!game.inGame) {
              game.ctx.beginPath();
              game.ctx.moveTo(this.x, this.y);
              game.ctx.lineTo(dx, dy);
              game.ctx.stroke();
            }
            if (game.inGame) {
              let distance = dist; // * Math.cos(toRad(angle));
              let height = (this.distCam * 64) / distance;

              //height = (this.distCam * 64) / dist / Math.cos(toRad(angle));

              game.ctx.fillStyle = LightenDarkenColor(
                "CCCCCC",
                -dist / (game.canvasWidth / 255) 
              );
              game.ctx.fillRect(
                (rayXposition * game.canvasWidth) / this.fov,
                game.canvasWidth/2 - height / 2,
                Math.ceil((quality * game.canvasWidth) / this.fov),
                height
              );
            }
          }
        }

        dist = dist + 1;
        if (dist > game.canvasWidth) found = true;
      }
      rayXposition += quality;
    }
  }
}
// alo// alo// alo
