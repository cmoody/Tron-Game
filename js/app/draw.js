define(function(require) {
	"use strict";

	var LightCycle = require('app/lightCycle');
	var Game = require('app/game'); // Holds game data
	var changeDirection = require('app/changeDirection');

	// Maybe add to Game object?
	var player1 = new LightCycle();
	var enemy = new LightCycle();

	function draw() {
		Game.nextRound = player1.coordinates.length;
		Game.currentRound = nextRound - 1;	

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

	return draw;

});