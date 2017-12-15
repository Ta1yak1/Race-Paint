var racePaint = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');
//title screen
racePaint.state.add('Boot', bootState);
racePaint.state.add('Load', preLoadState);
racePaint.state.add('Menu', menuState);
racePaint.state.add('Play', playState);

racePaint.state.start('Boot');
