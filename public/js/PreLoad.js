var racePaint = racePaint || {};

//loading the game assets
racePaint.Preload = function () {};

racePaint.Preload.prototype = {
    preload: function () {
        //show logo in loading screen
        //these will add the logo onto the screen based on x/y coords.
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.splash.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'loading');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);
        
        this.load.sprite('redCar', 'assets/images/redcar.png');
        // load game assets, here we need to/can add a abunch of assets to be used in the game.
        this.load.image('space', 'assets/images/space.png');
        // this.load.image('rock', 'assets/images/rock.png');
        // this.load.spritesheet('playership', 'assets/images/player.png', 12, 12);
        // this.load.spritesheet('power', 'assets/images/power.png', 12, 12);
        // this.load.image('playerParticle', 'assets/images/player-particle.png');
        // this.load.audio('collect', 'assets/audio/collect.ogg');
        // this.load.audio('explosion', 'assets/audio/explosion.ogg');
    },
    create: function () {
        this.state.start('MainMenu', Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
    }
};