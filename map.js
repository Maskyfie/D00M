var map = [];

function initMap() {
  for (let py = 0; py < game.height; py++) {
    map[py] = [];
    for (let px = 0; px < game.width; px++) {
      map[py][px] = new Tile(true, px, py);
    }
  }
}

function drawMap() {
  for (let py = 0; py < game.height; py++) {
    for (let px = 0; px < game.width; px++) {
      map[py][px].draw();
    }
  }
}

function inputMap() {
  if (mouse.active) {
    switch (mouse.button) {
      case 1:
        map[mouse.py][mouse.px].solid = false;
        break;
      case 2:
        player.px = mouse.px;
        player.py = mouse.py;

        break;
      case 3:
        map[mouse.py][mouse.px].solid = true;
        break;
      default:
      // code block
    }
  }
}
