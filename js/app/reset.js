define(function(require) {
	"use strict";

	var Game = require('app/game');
	var draw = require('app/draw');

	function reset() {
		cancelAnimationFrame(Game.requestId);

		player1.coordinates = [];
		player1.coordinates[0] = { 
			posx: 150,
			posy: 275
		};

		enemy.coordinates = [];
		enemy.color = 'ffe800';
		enemy.coordinates[0] = { 
			posx: 150,
			posy: 25
		};

		player1.direction = 'up';
		enemy.direction = 'down';

		Game.gameOver = false;

		Game.ctx.clearRect(0, 0, Game.canvasWidth, Game.canvasHeight);
		draw();
	}

	return reset;

});