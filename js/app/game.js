define(function(require) {
	"use strict";

	var Game = {
		canvas: document.getElementById('canvas'),
		ctx: canvas.getContext('2d'),
		canvasWidth: canvas.width,
		canvasHeight: canvas.height,
		gameOver: false,
		requestId: 0,
		nextRound: 0,
		currentRound: 0
	};

	return Game;

});