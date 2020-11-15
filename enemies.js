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
    this.direction = this.getDirection();
    this.goingLeft = false;
    this.goingRight = false;
    this.goingDown = false;
    this.goingTop = false;
    this.newTile = true;
    this.nextTile = {};
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
          if (
            map[Math.floor(dy / blockSize)][Math.floor(dx / blockSize)].solid
          ) {
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
          if (
            map[Math.floor(dy / blockSize)][Math.floor(dx / blockSize)] ==
            map[Math.floor(player.y / blockSize)][
              Math.floor(player.x / blockSize)
            ]
          ) {
            this.playerFound = true;
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
      this.playerFound = false;
    } else {
      // on instale les variables
      this.px = this.x / blockSize;
      this.py = this.y / blockSize;

      let sauvegardeX = Math.floor(this.x / blockSize);
      let sauvegardeY = Math.floor(this.y / blockSize);
      let offset = 1 - this.speed;

      this.x = this.x + this.speed * this.direction.x;
      this.y = this.y + this.speed * this.direction.y;

      this.px = Math.floor(this.x / blockSize);
      this.py = Math.floor(this.y / blockSize);

      var tileSiMovementX;
      var tileSiMovementY;

      // direction / offset, pas obligatoire mais plus propre ? à voir
      if (this.direction.x == 1) {
        this.goingLeft = false;
        this.goingRight = true;
        this.goingDown = false;
        this.goingTop = false;
        offset = offset * 0;
      }
      if (this.direction.x == -1) {
        this.goingLeft = true;
        this.goingRight = false;
        this.goingDown = false;
        this.goingTop = false;
        offset = offset * 1;
      }

      if (this.direction.y == -1) {
        this.goingLeft = false;
        this.goingRight = false;
        this.goingDown = false;
        this.goingTop = true;
        offset = offset * 1;
      }
      if (this.direction.y == 1) {
        this.goingLeft = false;
        this.goingRight = false;
        this.goingDown = true;
        this.goingTop = false;
        offset = offset * 0;
      }
      if (this.goingUp) this.rotation = 0;
      if (this.goingRight) this.rotation = 90;
      if (this.goingDown) this.rotation = 180;
      if (this.goingLeft) this.rotation = 270;

      // Découverte de la prochaine tile (si solide)
      if (this.direction.x > 0)
        tileSiMovementX =
          map[Math.floor(sauvegardeY)][Math.floor(this.px + offset)];
      else
        tileSiMovementX =
          map[Math.floor(sauvegardeY)][Math.floor(this.px / blockSize)];

      if (this.direction.y > 0)
        tileSiMovementY =
          map[Math.floor(this.py + offset)][Math.floor(sauvegardeX)];
      else tileSiMovementY = map[Math.floor(this.py)][Math.floor(sauvegardeX)];

      //si on est à la recherche d'une nouvelle tile alors prendre ses coordonées
      if (this.newTile) {
        this.nextTile = {
          x: this.px + this.direction.x,
          y: this.py + this.direction.y,
        };
        this.newTile = false;
      }
      // si on est arrivé à la nextTile alors on en cherche une nouvelle
      if (
        Math.floor(this.nextTile.x) == Math.floor(this.px + offset) &&
        Math.floor(this.nextTile.y) == Math.floor(this.py + offset)
      ) {
        this.newTile = true;
        this.direction = this.getDirection();
      }
      if (tileSiMovementY.solid) {
        this.py = sauvegardeY;
        this.direction = this.getDirection();
        this.nextTile = {
          x: this.px + this.direction.x,
          y: this.py + this.direction.y,
        };
      }
      if (tileSiMovementX.solid) {
        this.px = sauvegardeX;
        this.direction = this.getDirection();
        this.nextTile = {
          x: this.px + this.direction.x,
          y: this.py + this.direction.y,
        };
      }
    }
  }

  getDirection() {
    let px = Math.floor(this.px);
    let py = Math.floor(this.py);
    let possDeDepl = [];

    if (
      map[py][px - 1].solid == false &&
      map[py - 1][px].solid == false &&
      map[py + 1][px].solid == false &&
      map[py][px + 1].solid == false
    ) {
    }
    if (!this.goingRight) {
      if (!map[py][px - 1].solid) possDeDepl.push({ x: -1, y: 0 });
    }

    if (!this.goingDown) {
      if (!map[py - 1][px].solid) possDeDepl.push({ x: 0, y: -1 });
    }

    if (!this.goingTop) {
      if (!map[py + 1][px].solid) possDeDepl.push({ x: 0, y: 1 });
    }

    if (!this.goingLeft) {
      if (!map[py][px + 1].solid) possDeDepl.push({ x: 1, y: 0 });
    }

    if (possDeDepl.length == 0 && this.goingLeft) {
      if (!map[py][px + 1].solid) possDeDepl.push({ x: 1, y: 0 });
    }
    if (possDeDepl.length == 0 && this.goingRight) {
      if (!map[py][px - 1].solid) possDeDepl.push({ x: -1, y: 0 });
    }
    if (possDeDepl.length == 0 && this.goingTop) {
      if (!map[py + 1][px].solid) possDeDepl.push({ x: 0, y: 1 });
    }
    if (possDeDepl.length == 0 && this.goingDown) {
      if (!map[py - 1][px].solid) possDeDepl.push({ x: 0, y: -1 });
    }
    if (possDeDepl.length > 0)
      return possDeDepl[getRandomInt(possDeDepl.length)];
  }
}
