var map = [];

function initMap() {
  for (let py = 0; py < game.height; py++) {
    map[py] = [];
    for (let px = 0; px < game.width; px++) {
      if (px > 5 && px < game.width - 5 && py > 5 && py < game.width - 5) {
        map[py][px] = new Tile(false, px, py);
      } else {
        map[py][px] = new Tile(true, px, py);
      }
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
        player.x = mouse.x;
        player.y = mouse.y;

        break;
      case 3:
        map[mouse.py][mouse.px].solid = true;
        break;
      default:
    }
  }
}
