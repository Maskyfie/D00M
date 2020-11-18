var game = {
  mapWidth: 25,
  mapHeight: 25,
  blockSize: this.canvasWidth / 25,
  inGame: true,
  wallSize: 64,
  canvasWidth: 750,
  canvasHeight: 750,
}; // alo
blockSize = game.canvasWidth / game.mapWidth;

function LightenDarkenColor(col, amt) {
  col = parseInt(col, 16);
  return (
    "#" +
    (
      ((col & 0x0000ff) + amt) |
      ((((col >> 8) & 0x00ff) + amt) << 8) |
      (((col >> 16) + amt) << 16)
    ).toString(16)
  );
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));////te
}

$(document).ready(function () {
  game.element = document.getElementById("myCanvas");
  game.ctx = game.element.getContext("2d");
  initMap();
  player = new Player(12, 12, 12 * blockSize, 12 * blockSize);
  enemy = new Enemies(11, 11, 11 * blockSize, 11 * blockSize);
  update();
});
function toRad(angle) {
  return (angle * Math.PI) / 180;
}

function update() {
  Input.update();
  if (!game.inGame) {
    game.ctx.clearRect(0, 0, game.canvasWidth, game.canvasHeight);

    drawMap();
    inputMap();
    player.drawInMap();
    player.radar();
    enemy.radar();
  }

  if (game.inGame) {
    game.ctx.clearRect(0, 0, game.canvasWidth, game.canvasHeight);
    game.ctx.fillStyle = "#03224c";
    game.ctx.fillRect(0, 0, game.canvasWidth, game.canvasHeight / 2);
    game.ctx.fillStyle = "#383838";
    game.ctx.fillRect(
      0,
      game.canvasHeight / 2,
      game.canvasWidth,
      game.canvasHeight
    );
    enemy.radar();
    enemy.update();
    player.radar();
  }

  requestAnimationFrame(update);
}
