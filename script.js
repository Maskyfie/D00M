var game = {
  width: 25,
  height: 25,
  blockSize: 500 / 25,
	inGame: false,
};

$(document).ready(function () {
  game.element = document.getElementById("myCanvas");
  game.ctx = game.element.getContext("2d");
  initMap();
  player = new Player(mouse.px, mouse.py);
  update();
});

function update() {
	if (!game.inGame) {
  	drawMap();
  	inputMap();
  	player.drawInMap();
	}

	if(game.inGame) {
		player.update()
		
	}
  requestAnimationFrame(update);
}
