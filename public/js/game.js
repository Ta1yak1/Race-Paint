var racePaint = new Phaser.Game(640, 480, Phaser.AUTO, 'game');
//title screen
racePaint.state.add('Boot', bootState);
racePaint.state.add('Load', preLoadState);
racePaint.state.add('Menu', menuState);
racePaint.state.add('Play', playState);

racePaint.state.start('Boot');
