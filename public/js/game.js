var racePaint = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');
//title screen
game.state.add('Boot', bootState);
game.state.add('Load', preLoadState);
game.state.add('Menu', mainMenuState);
game.state.add('Play', playState);

game.state.start('boot');
