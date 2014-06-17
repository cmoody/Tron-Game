define(function(require) {
	"use strict";

	function endGame(player) {
		if (requestId) {
			gameOver = true;
	    	cancelAnimationFrame(requestId);
	    	requestId = undefined;

	    	if(player) {
	    		player = "Player 1";
	    		enemy.score = enemy.score + 1;
	    		$('.computer .score').html(enemy.score);
	    	}else{
	    		player = "Computer";
	    		player1.score = player1.score + 1;
	    		$('.player1 .score').html(player1.score);
	    	}

	    	// Remove when explosion finished
	    	ctx.fillStyle = '#f00';
			ctx.font = 'italic bold 30px sans-serif';
			ctx.textBaseline = 'bottom';
			ctx.fillText(player + ' Loses!', 70, 100);

			// Pass in crash coords to add in explosion animation
			// endGameExplosion(coords, color);
	    }
	}

	return endGame;

});