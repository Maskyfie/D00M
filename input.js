var mouse = {
  active: false,
  x: 0,
  y: 0,
  px: 0,
  py: 0,
  old: 0,
  moving: false,
  direction: "",
  lastTile: {
    px: 0,
    py: 0,
  },
  editor: {
    x: 0,
    y: 0,
  },
  button: 0,
};

document.addEventListener("contextmenu", (event) => event.preventDefault());

$("#myCanvas").mousedown(function (event) {
  mouse.active = true;
  mouse.button = event.which;
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  mouse.px = Math.floor(mouse.x / blockSize);
  mouse.py = Math.floor(mouse.y / blockSize);
});

$("#myCanvas").mouseup(function (event) {
  mouse.active = false;
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  mouse.px = Math.floor(mouse.x / blockSize);
  mouse.py = Math.floor(mouse.y / blockSize);
  mouse.button = event.which;
});

$("#myCanvas").mousemove(function (event) {
  mouse.moving = true;
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  if (game.inGame) {
    mousemovemethod(event);
  }
  mouse.px = Math.floor(mouse.x / blockSize);
  mouse.py = Math.floor(mouse.y / blockSize);
  mouse.moving = false;
});

$("#switchInGame").click(function (event) {
  game.inGame = !game.inGame;
});

$("#saveMap").click(function (event) {
  saveMap();
});

$("#loadMap").click(function (event) {
  loadMap();
});

function mousemovemethod(e) {
  if (mouse.moving) {
    if (mouse.x < mouse.oldx) {
      mouse.direction = 1;
    }
    if (mouse.x > mouse.oldx) {
      mouse.direction = -1;
    }
    if (mouse.x == mouse.oldx) {
      mouse.direction = 0;
    }
    mouse.oldx = mouse.x;
  }
}

var Input = {
  keys: Array(),

  update: function () {
    let sinAng = Math.sin(toRad(player.rotation));
    let cosAng = Math.cos(toRad(player.rotation));
    let sinAngStraf = Math.sin(toRad(player.rotation - 90));
    let cosAngStraf = Math.cos(toRad(player.rotation - 90));
    saveX = player.x;
    saveY = player.y;
    if (this.keys["ArrowLeft"]) {
      player.rotation -= player.speedRota;
    }
    if (this.keys["ArrowRight"]) {
      player.rotation += player.speedRota;
    }
    if (this.keys["z"]) {
      player.x = player.x + sinAng * player.speed;
      player.y = player.y + cosAng * player.speed;
    }
    if (this.keys["s"]) {
      player.x = player.x - sinAng * player.speed;
      player.y = player.y - cosAng * player.speed;
    }
    if (this.keys["q"]) {
      player.x = player.x + sinAngStraf * player.speed;
      player.y = player.y + cosAngStraf * player.speed;
    }
    if (this.keys["d"]) {
      player.x = player.x - sinAngStraf * player.speed;
      player.y = player.y - cosAngStraf * player.speed;
    }
    let nextTileY =
      map[Math.floor(player.y / blockSize)][Math.floor(saveX / blockSize)];
    let nextTileX =
      map[Math.floor(saveY / blockSize)][Math.floor(player.x / blockSize)];
    if (nextTileX.solid) player.x = saveX;
    if (nextTileY.solid) player.y = saveY;
  },
};

window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  Input.keys[e.key] = true;
}
function keyUpHandler(e) {
  Input.keys[e.key] = false;
}
