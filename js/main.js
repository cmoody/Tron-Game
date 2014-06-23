require.config({
	paths: {
	 	'jquery': 'vendor/jquery/dist/jquery.min',
        'text' : 'vendor/requirejs-text/text',
	    'app': 'app',
	    'libs': 'libs'
    },
	shim: {}
});

require([
	'libs/rAF',
	'app/draw'
], function(draw) {
	//var draw = require('app/draw');

	// Move to canvas module?
	// var canvas = document.getElementById('canvas');
	// var ctx = canvas.getContext('2d');
	// var canvasWidth = canvas.width;
	// var canvasHeight = canvas.height;
	// var gameOver = false;
	// var requestId;
	// var nextRound;
	// var currentRound;

	/*
	 *	Creates player1 and enemy objects
	 */
	

	draw();

	//$('.reset').on('click', reset);
});