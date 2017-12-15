
game.state.add('Game', Game);
game.state.start('Game');

var Game = {};

Game.init = function () {
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
    game.load.image('sprite','assets/sprites/sprite.png'); // this will be the sprite of the players
};