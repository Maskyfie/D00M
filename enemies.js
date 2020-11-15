
class Enemies {
  constructor(px, py, x, y) {
    this.px = px;
    this.py = py;
    this.x = x;
    this.y = y;
    this.size = 20;
    this.rotation = 90;
    this.fov = 60;
    this.viewMax = 10;
    this.rayon = game.canvasWidth;
    this.speed = 1;
    this.speedRota = 1;
		this.playerFound = false;
  }

  drawInMap() {
    game.ctx.fillStyle = "red";
    game.ctx.fillRect(this.x, this.y, this.size, this.size);
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
          if (map[Math.floor(dy / blockSize)][Math.floor(dx / blockSize)].solid) {
            found = true;
          /*  if (!game.inGame) {
              game.ctx.beginPath();
              game.ctx.moveTo(this.x, this.y);
              game.ctx.lineTo(dx, dy);
              game.ctx.stroke();
            }*/
            if (game.inGame) {
          }
//					console.log(Math.floor(dy / blockSize),
             // Math.floor(dx / blockSize))
					}	
					if (map[Math.floor(dy / blockSize)][Math.floor(dx / blockSize)] == map[Math.floor(player.y / blockSize)][Math.floor(player.x / blockSize)]) {
					this.playerFound = true
        } 
        dist = dist + 1;
        if (dist > game.canvasWidth) found = true;
      }
      rayXposition += quality;
    }
  }
}
 update() {
	 if (this.playerFound) {
	  let sinAng = Math.sin(toRad(this.rotation));
    let cosAng = Math.cos(toRad(this.rotation));
	  this.x = this.x + sinAng * this.speed;
    this.y = this.y + cosAng * this.speed;
		this.playerFound = false
		}
 }
}