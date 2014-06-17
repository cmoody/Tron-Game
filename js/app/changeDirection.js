define(function(require) {
	"use strict";

	// Needs access to player1 object

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

	return changeDirection;

});