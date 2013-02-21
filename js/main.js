/*
 *	Paul Irish RequestAnimationFrame 
 *	Gist https://gist.github.com/1579671
 */
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
 *	Light Cycle Object
 */
var Cycle = {
	coordinates: {},

	direction: 'up',

	color: '269bff',

	avatar: 'img/tronCycle.png'
};

/*
 *	Creates player1 and enemy objects
 */
var player1 = Object.create(Cycle);
player1.coordinates = [{ posx: 150, posy: 275 }];

var enemy = Object.create(Cycle);
enemy.coordinates = [{ posx: 150, posy: 25 }];
enemy.direction = 'down';
enemy.color = 'ffe800';

/*
 *	Globals
 */
var canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	canvasWidth = canvas.width,
	canvasHeight = canvas.height,
	requestId,
	gameOver = false,
	nextRound,
	currentRound;

$('.reset').on('click', reset);

function endGame(player) {
	if (requestId) {
		gameOver = true;
    	cancelAnimationFrame(requestId);
    	requestId = undefined;

    	if(player) {
    		player = "Player 1";
    	}else{
    		player = "Computer";
    	}

    	ctx.fillStyle = '#f00';
		ctx.font = 'italic bold 30px sans-serif';
		ctx.textBaseline = 'bottom';
		ctx.fillText(player + ' Loses!', 70, 100);

		// Insert function to keep track of score and update on page
		// Pass in crash coords to add in explosion animation
    }
}

function reset() {
	cancelAnimationFrame(requestId);
	player1.coordinates = [];
	player1.coordinates[0] = { 
		posx: 150,
		posy: 275
	};

	player1.direction = 'up';

	gameOver = false;

	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	draw();
}
 
function draw() {
	currentRound = player1.coordinates.length - 1;
	nextRound = player1.coordinates.length;

	// Draws Player1 & Enemy Cycles
	drawCycle();

	// Makes Decision for Enemy
	enemyAI();

	// Updates Player1 Coordinates
	playerAI();

	// Checks to see if Enemy or Player loses
	checkCollision();

	// Checks keyboard input for direction
	$(document).keydown(changeDirection);

	// Determines if the game is over
	if(!gameOver) {
		requestId = requestAnimationFrame(draw);
	}
}

function drawCycle() {
	// Draws Player1 Cycle
	// Rotate when going left/right
	//ctx.drawImage(tronCycle, posx, posy);
	ctx.beginPath();
	ctx.rect(player1.coordinates[currentRound].posx, player1.coordinates[currentRound].posy, 4, 4);
	ctx.fillStyle = player1.color;
	ctx.fill();

	// Draws Enemy Cycle
	//ctx.drawImage(tronCycle, posx, posy);
	ctx.beginPath();
	ctx.rect(enemy.coordinates[currentRound].posx, enemy.coordinates[currentRound].posy, 4, 4);
	ctx.fillStyle = enemy.color;
	ctx.fill();
}

function playerAI() {
	var posx, posy;

	if(player1.direction == 'up') {
		posy = player1.coordinates[currentRound].posy - 1,
		posx = player1.coordinates[currentRound].posx
	}else if(player1.direction == 'down') {
		posy = player1.coordinates[currentRound].posy + 1,
		posx = player1.coordinates[currentRound].posx
	}else if(player1.direction == 'left') {
		posy = player1.coordinates[currentRound].posy,
		posx = player1.coordinates[currentRound].posx - 1
	}else if(player1.direction == 'right') {
		posy = player1.coordinates[currentRound].posy,
		posx = player1.coordinates[currentRound].posx + 1
	}

	player1.coordinates[nextRound] = { 
		posy: posy,
		posx: posx
	}
}

function enemyAI() {
	var posx, posy;
	// Get current position
	// Add +1 to current positions direction
	// If +1 is == to player1 coordinates or enemy coordinates randomly choose left or right
	// check if left or right is in arrays and if so go other way

	// enemy.coordinates[player1CurrentCoords].posx
	// enemy.coordinates[player1CurrentCoords].posy
	// enemy.direction
	// if(nextRound == 30) {
	// 	enemy.direction = 'left';
	// }

	if(enemy.direction == 'up') {
		posy = enemy.coordinates[currentRound].posy - 1,
		posx = enemy.coordinates[currentRound].posx
	}else if(enemy.direction == 'down') {
		posy = enemy.coordinates[currentRound].posy + 1,
		posx = enemy.coordinates[currentRound].posx
	}else if(enemy.direction == 'left') {
		posy = enemy.coordinates[currentRound].posy,
		posx = enemy.coordinates[currentRound].posx - 1
	}else if(enemy.direction == 'right') {
		posy = enemy.coordinates[currentRound].posy,
		posx = enemy.coordinates[currentRound].posx + 1
	}

	enemy.coordinates[nextRound] = { 
		posy: posy,
		posx: posx
	}
}

function checkCollision() {
	// Checks if player or enemy hit edge
	if(player1.coordinates[nextRound].posx <= 0
		|| player1.coordinates[nextRound].posx >= canvasWidth
		|| player1.coordinates[nextRound].posy <= 0
		|| player1.coordinates[nextRound].posy >= canvasHeight) {
		endGame(true);
	}

	if(enemy.coordinates[nextRound].posx <= 0
		|| enemy.coordinates[nextRound].posx >= canvasWidth
		|| enemy.coordinates[nextRound].posy <= 0
		|| enemy.coordinates[nextRound].posy >= canvasHeight) {
		endGame(false);
	}

	// Checks if player or enemy coordinates cross
	for(k = 0; k < nextRound; k++) {
		// Player runs into self
		if(player1.coordinates[k].posx == player1.coordinates[nextRound].posx
			&& player1.coordinates[k].posy == player1.coordinates[nextRound].posy
			|| player1.coordinates[nextRound].posx == enemy.coordinates[k].posx
			&& player1.coordinates[nextRound].posy == enemy.coordinates[k].posy) {
			endGame(true);
		}

		// Enemy runs into self
		if(enemy.coordinates[k].posx == enemy.coordinates[nextRound].posx
			&& enemy.coordinates[k].posy == enemy.coordinates[nextRound].posy
			|| enemy.coordinates[nextRound].posx == player1.coordinates[k].posx
			&& enemy.coordinates[nextRound].posy == player1.coordinates[k].posy) {
			endGame(false);
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
