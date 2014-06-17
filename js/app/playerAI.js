define(function(require) {
	"use strict";

	function playerAI() {
		var posx, posy;

		switch(player1.direction) {
			case 'up':
				posy = player1.coordinates[currentRound].posy - 1;
				posx = player1.coordinates[currentRound].posx;
				break;
			case 'down':
				posy = player1.coordinates[currentRound].posy + 1;
				posx = player1.coordinates[currentRound].posx;
				break;
			case 'left':
				posy = player1.coordinates[currentRound].posy;
				posx = player1.coordinates[currentRound].posx - 1;
				break;
			case 'right':
				posy = player1.coordinates[currentRound].posy;
				posx = player1.coordinates[currentRound].posx + 1;
				break;
			default:
				posy = player1.coordinates[currentRound].posy;
				posx = player1.coordinates[currentRound].posx;
				break;
		}

		// Alternative to Switch
		// if(player1.direction == 'up') {
		// 	posy = player1.coordinates[currentRound].posy - 1,
		// 	posx = player1.coordinates[currentRound].posx
		// }else if(player1.direction == 'down') {
		// 	posy = player1.coordinates[currentRound].posy + 1,
		// 	posx = player1.coordinates[currentRound].posx
		// }else if(player1.direction == 'left') {
		// 	posy = player1.coordinates[currentRound].posy,
		// 	posx = player1.coordinates[currentRound].posx - 1
		// }else if(player1.direction == 'right') {
		// 	posy = player1.coordinates[currentRound].posy,
		// 	posx = player1.coordinates[currentRound].posx + 1
		// }

		player1.coordinates[nextRound] = { 
			posy: posy,
			posx: posx
		}
	}

	return playerAI;

});