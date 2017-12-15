var racePaint = new Phaser.Game(800, 600, Phaser.CANVAS, 'game');

racePaint.state.add('Boot', bootState);
racePaint.state.add('Load', preLoadState);
racePaint.state.add('Menu', menuState);
racePaint.state.add('Play', Game);

racePaint.state.start('Boot');
