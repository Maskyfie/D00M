var mouse = {
  active: false,
  x: 0,
  y: 0,
  px: 0,
  py: 0,
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
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  mouse.px = Math.floor(mouse.x / game.blockSize);
  mouse.py = Math.floor(mouse.y / game.blockSize);
});
