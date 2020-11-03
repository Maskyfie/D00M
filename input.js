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
  mouse.moving = true
	mouse.x = event.pageX;
  mouse.y = event.pageY;
	if (game.inGame) {
		mousemovemethod(event)
		}
  mouse.px = Math.floor(mouse.x / game.blockSize);
  mouse.py = Math.floor(mouse.y / game.blockSize);
	mouse.moving = false
});

$("#switchInGame").click(function (event) {
  game.inGame = !game.inGame  
});

function mousemovemethod (e) {
		if (mouse.moving) {
        if (e.pageX < mouse.oldx) {
            mouse.direction = 1
        } else if (e.pageX > mouse.oldx) {
            mouse.direction = -1
        }	else {
					mouse.direction = 0 
				}

        mouse.oldx = e.pageX;
	}
}
