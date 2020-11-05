var game = {
  width: 25,
  height: 25,
  blockSize: 500 / 25,
  inGame: false,
  wallSize: 64,
  canvasWidth: 500,
};

$(document).ready(function () {
  game.element = document.getElementById("myCanvas");
  game.ctx = game.element.getContext("2d");
  initMap();
  player = new Player(mouse.px, mouse.py, mouse.x, mouse.y);
  update();
});
function toRad(angle) {
  return (angle * Math.PI) / 180;
}

function update() {
  if (!game.inGame) {
    game.ctx.clearRect(0, 0, game.canvasWidth, game.canvasWidth);

    drawMap();
    inputMap();
    player.drawInMap();
    player.radar();
  }

  if (game.inGame) {
    game.ctx.clearRect(0, 0, game.canvasWidth, game.canvasWidth);

    player.radar();
    player.update();
  }
  requestAnimationFrame(update);
}
