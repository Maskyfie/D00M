var map = [];

function initMap() {
  for (let py = 0; py < game.mapHeight; py++) {
    map[py] = [];
    for (let px = 0; px < game.mapWidth; px++) {
      if (
        px > 5 &&
        px < game.mapWidth - 5 &&
        py > 5 &&
        py < game.mapWidth - 5
      ) {
        map[py][px] = new Tile(false, px, py);
      } else {
        map[py][px] = new Tile(true, px, py);
      }
    }
  }
}

function drawMap() {
  for (let py = 0; py < game.mapHeight; py++) {
    for (let px = 0; px < game.mapWidth; px++) {
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

function saveMap() {
  window.localStorage.setItem("map", JSON.stringify(map));
}

function loadMap() {
  map = JSON.parse(window.localStorage.getItem("map"));
  for (let py = 0; py < game.mapHeight; py++) {
    for (let px = 0; px < game.mapWidth; px++) {
      tile = map[py][px];
      map[py][px] = new Tile(tile.solid, tile.px, tile.py);
    }
  }
}
