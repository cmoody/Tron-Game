define(function(require) {
	"use strict";

	// Need access to player1 and enemy objects

	function checkCollision(player1, enemy) {
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

	return checkCollision;

});