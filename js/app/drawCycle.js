define(function(require) {
	"use strict";

	var Game = require('app/game');
	// Needs access to player1 and enemy obj

	function drawCycle(player1, enemy) {
		Game.ctx.save();

		Game.ctx.shadowBlur = 10;
		Game.ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';

		// Draws Player1 Cycle
		// Rotate when going left/right
		//ctx.drawImage(tronCycle, posx, posy);
		Game.ctx.beginPath();
		Game.ctx.rect(player1.coordinates[currentRound].posx, player1.coordinates[currentRound].posy, 4, 4);
		Game.ctx.fillStyle = player1.color;
		Game.ctx.fill();

		// Draws Enemy Cycle
		//ctx.drawImage(tronCycle, posx, posy);
		Game.ctx.beginPath();
		Game.ctx.rect(enemy.coordinates[currentRound].posx, enemy.coordinates[currentRound].posy, 4, 4);
		Game.ctx.fillStyle = enemy.color;
		Game.ctx.fill();

		Game.ctx.restore();
	}

	return drawCycle;

});