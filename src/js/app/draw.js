define(function(require) {
	"use strict";

	// Vendor
	var $ = require('jquery');
	var requestAnimationFrame = require('libs/rAF');

	// Cycle
	var LightCycle = require('app/lightCycle');

	// Game Object
	var Game = require('app/game');

	// Player and Enemy Objects
	var player1 = new LightCycle();
	var enemy = new LightCycle();

	//
	var $doc = $(document);

	function draw() {
		Game.nextRound = player1.coordinates.length;
		Game.currentRound = nextRound - 1;	

		// Draws Player1 & Enemy Cycles
		drawCycle(player1, enemy);

		// Makes Decision for Enemy
		enemyAI(enemy);

		// Updates Player1 Coordinates
		playerAI(player1);

		// Checks to see if Enemy or Player loses
		checkCollision(player1, enemy);

		// Checks keyboard input for direction
		$doc.keydown(function(e) {
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
		});

		// Determines if the game is over
		if(!Game.gameOver) {
			Game.requestId = requestAnimationFrame(this);
		}
	}

	return draw;

});