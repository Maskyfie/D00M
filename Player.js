const pi = 3.141;

class Player {
  constructor(px, py, x, y) {
    this.px = px;
    this.py = py;
    this.x = x;
    this.y = y;
    this.size = 20;
    this.camSize = game.wallSize / 2;
    this.rotation = 0;
    this.fov = 60;
    this.camAngle = 20;
    this.viewMax = 10;
    this.rayon = game.width;
    this.rayon = game.width;
    this.distCam = Math.floor(game.width / 2 / Math.tan((pi * (this.fov / 2)) / 180));
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
    for (let angle = this.rotation - this.fov / 2; angle < this.rotation + this.fov / 2; angle += 1) {
      let found = false;
      let dist = 1;
      while (!found) {
        let dx = this.x + Math.sin(toRad(angle)) * dist;
        let dy = this.y + Math.cos(toRad(angle)) * dist;
        if (dx > 0 && dx < game.canvasWidth && dy > 0 && dy < game.canvasWidth) {
          if (!game.inGame) {
            game.ctx.beginPath();
            game.ctx.arc(dx, dy, 1, 0, 2 * Math.PI);
            game.ctx.stroke();
          }

          if (map[Math.floor(dy / game.blockSize)][Math.floor(dx / game.blockSize)].solid) {
            found = true;
            if (game.inGame) {
              update(dx, dy, dist);
            }
          }
        }

        dist = dist + 10;
        if (dist > 500) found = true;
      }
    }
  }
  update(dx, dy, dist) {
    taille = dist;

    print(distanceX);
  }
}
