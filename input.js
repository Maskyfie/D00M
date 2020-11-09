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
}; // alo

document.addEventListener("contextmenu", (event) => event.preventDefault());

$("#myCanvas").mousedown(function (event) {
  mouse.active = true;
  mouse.button = event.which;
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  mouse.px = Math.floor(mouse.x / game.blockSize);
  mouse.py = Math.floor(mouse.y / game.blockSize);
});

$("#myCanvas").mouseup(function (event) {
  mouse.active = false;
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  mouse.px = Math.floor(mouse.x / game.blockSize);
  mouse.py = Math.floor(mouse.y / game.blockSize);
  mouse.button = event.which;
});

$("#myCanvas").mousemove(function (event) {
  mouse.moving = true;
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  if (game.inGame) {
    mousemovemethod(event);
  }
  mouse.px = Math.floor(mouse.x / game.blockSize);
  mouse.py = Math.floor(mouse.y / game.blockSize);
  mouse.moving = false;
});

$("#switchInGame").click(function (event) {
  game.inGame = !game.inGame;
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
    if (this.keys["q"]) {
      player.rotation -= player.speedRota;
    }
    if (this.keys["d"]) {
      player.rotation += player.speedRota;
    }
    if (this.keys["z"]) {
      player.x = player.x + sinAng * 1;
      player.y = player.y + cosAng * 1;
    }
    if (this.keys["s"]) {
      player.x = player.x - sinAng * 1;
      player.y = player.y - cosAng * 1;
    }
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
