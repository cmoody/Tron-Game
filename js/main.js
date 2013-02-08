// Paul Irish RequestAnimationFrame Gist https://gist.github.com/1579671
(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
								   || window[vendors[x]+'CancelRequestAnimationFrame'];
	}
 
	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
			  timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
 
	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
}());

/*
	Player Object
	- Fix this object to reuse for multiple players
*/
// function tronCycle() {
// 	coordinates = [
// 		{ posx: 150, posy: 275 }
// 	];

// 	direction = 'up';
// }
var player1 = {
	coordinates: [
		{ posx: 150, posy: 275 }
	],

	direction: 'up',

	avatar: 'img/tronCycle.png'
};

// Globals variables
var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	canvasWidth = canvas.width,
	canvasHeight = canvas.height,
	requestId,
	gameOver = false,
	i = 0
	j = 0;
			
function init() {
	draw();
}

function endGame() {
	if (requestId) {
		gameOver = true;
    	cancelAnimationFrame(requestId);
    	requestId = undefined;

    	ctx.fillStyle = '#f00';
		ctx.font = 'italic bold 30px sans-serif';
		ctx.textBaseline = 'bottom';
		ctx.fillText('Game Over', 70, 100);
    }
}

// Type into console to restart game
function reset() {
	player1.coordinates = [];
	player1.coordinates[0] = { 
		posx: 150,
		posy: 275
	};

	player1.direction = 'up';

	i = 0;
	j = 0;
	gameOver = false;

	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	draw();
}
 
function draw() {
	var currentposx = player1.coordinates[i].posx;
	var currentposy = player1.coordinates[i].posy;
	var currentDirection = player1.direction;
	
	updateCycle(currentposx, currentposy);

	j = i + 1;

	if(currentDirection == 'up') {
		player1.coordinates[j] = { 
			posy: currentposy - 1,
			posx: currentposx
		}
	}else if(currentDirection == 'down') {
		player1.coordinates[j] = { 
			posy: currentposy + 1,
			posx: currentposx
		}
	}else if(currentDirection == 'left') {
		player1.coordinates[j] = { 
			posy: currentposy,
			posx: currentposx - 1
		}
	}else if(currentDirection == 'right') {
		player1.coordinates[j] = { 
			posy: currentposy,
			posx: currentposx + 1
		}
	}

	checkCollision(player1.coordinates[j].posx, player1.coordinates[j].posy);

	$(document).keydown(changeDirection);

	i++;

	if(!gameOver) {
		requestId = requestAnimationFrame(draw);
	}
}

function updateCycle(posx, posy) {
	// Rotate when going left/right
	//ctx.drawImage(tronCycle, posx, posy);
	ctx.beginPath();
	ctx.rect(posx, posy, 4, 4);
	ctx.fillStyle = '269bff';
	ctx.fill();
}

function checkCollision(posx, posy) {
	var coordLength = player1.coordinates.length - 1;

	for(k = 0; k < coordLength; k++) {
		if(player1.coordinates[k].posx == posx && player1.coordinates[k].posy == posy) {
			endGame();
		}
	}
}

function changeDirection(e) {
	e.preventDefault();
	
	if(e.keyCode == 38) {
		player1.direction = 'up';
	}else if(e.keyCode == 40) {
		player1.direction = 'down';
	}else if(e.keyCode == 37) {
		player1.direction = 'left';
	}else if(e.keyCode == 39) {
		player1.direction = 'right';
	}
}
