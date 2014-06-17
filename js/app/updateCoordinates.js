define(function(require) {
	"use strict";

	function updateCoordinates(player) {
		var posx, posy;

		switch(player.direction) {
			case 'up':
				posy = player.coordinates[currentRound].posy - 1;
				posx = player.coordinates[currentRound].posx;
				break;
			case 'down':
				posy = player.coordinates[currentRound].posy + 1;
				posx = player.coordinates[currentRound].posx;
				break;
			case 'left':
				posy = player.coordinates[currentRound].posy;
				posx = player.coordinates[currentRound].posx - 1;
				break;
			case 'right':
				posy = player.coordinates[currentRound].posy;
				posx = player.coordinates[currentRound].posx + 1;
				break;
			default:
				posy = player.coordinates[currentRound].posy;
				posx = player.coordinates[currentRound].posx;
				break;
		}

		return [posx, posy];
	}

	return updateCoordinates;

});