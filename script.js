var game = {
  width: 25,
  height: 25,
  blockSize: 500 / 25,
  inGame: true,
  wallSize: 64,
  canvasWidth: 500,
  canvasHeight: 500,
};

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

$(document).ready(function () {
  game.element = document.getElementById("myCanvas");
  game.ctx = game.element.getContext("2d");
  initMap();
  player = new Player(12, 12, 12 * game.blockSize, 12 * game.blockSize);
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
  }

  if (game.inGame) {
    game.ctx.clearRect(0, 0, game.canvasWidth, game.canvasHeight);
    game.ctx.fillStyle = "blue";
    game.ctx.fillRect(0, 0, game.canvasWidth, game.canvasHeight / 2);
    game.ctx.fillStyle = "black";
    game.ctx.fillRect(
      0,
      game.canvasHeight / 2,
      game.canvasWidth,
      game.canvasHeight
    );

    player.radar();
  }

  requestAnimationFrame(update);
}
