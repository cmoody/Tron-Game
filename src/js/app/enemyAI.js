define(function(require) {
	"use strict";

	// Needs access to enemy object

	function enemyAI(enemy) {
		var posx, posy;
		// Get current position
		// Add +1 to current positions direction
		// If +1 is == to player1 coordinates or enemy coordinates randomly choose left or right
		// check if left or right is in arrays and if so go other way

		// Insert pick direction function
		// player1.coordinates[currentRound]
		// enemy has to check all possible directions and then make a decision on which direction to go
		
		/*
		if(enemy.direction == 'up') {
			posy = enemy.coordinates[currentRound].posy - 1, // Make these the if check not direction
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

		var player1Length = player1.coordinates.Length;
		for(var i = 0; i < player1Length; i++) {
			// if current direction is good stay course
			// option 1 go up
			// option 2 go down
			// option 3 go left
			// option 4 go right
		}
		*/

		switch(enemy.direction) {
			case 'up':
				posy = enemy.coordinates[currentRound].posy - 1;
				posx = enemy.coordinates[currentRound].posx;
				break;
			case 'down':
				posy = enemy.coordinates[currentRound].posy + 1;
				posx = enemy.coordinates[currentRound].posx;
				break;
			case 'left':
				posy = enemy.coordinates[currentRound].posy;
				posx = enemy.coordinates[currentRound].posx - 1;
				break;
			case 'right':
				posy = enemy.coordinates[currentRound].posy;
				posx = enemy.coordinates[currentRound].posx + 1;
				break;
			default:
				posy = enemy.coordinates[currentRound].posy;
				posx = enemy.coordinates[currentRound].posx;
				break;
		}

		// if(enemy.direction == 'up') {
		// 	posy = enemy.coordinates[currentRound].posy - 1,
		// 	posx = enemy.coordinates[currentRound].posx
		// }else if(enemy.direction == 'down') {
		// 	posy = enemy.coordinates[currentRound].posy + 1,
		// 	posx = enemy.coordinates[currentRound].posx
		// }else if(enemy.direction == 'left') {
		// 	posy = enemy.coordinates[currentRound].posy,
		// 	posx = enemy.coordinates[currentRound].posx - 1
		// }else if(enemy.direction == 'right') {
		// 	posy = enemy.coordinates[currentRound].posy,
		// 	posx = enemy.coordinates[currentRound].posx + 1
		// }

		// var coords = updateCoordinates(enemy);
		// console.log(coords);

		enemy.coordinates[nextRound] = { 
			posy: posy,
			posx: posx
		}
	}

	return playerAI;

});