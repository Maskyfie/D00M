var game = {
  width: 25,
  height: 25,
  blockSize: 500 / 25,
};

$(document).ready(function () {
  game.element = document.getElementById("myCanvas");
  game.ctx = game.element.getContext("2d");
  initMap();
  player = new Player(mouse.px, mouse.py);
  update();
});

function update() {
  drawMap();
  inputMap();
  player.draw();
  requestAnimationFrame(update);
}
