var preLoadState = {

    preload: function () {
        
        //show logo in loading screen
        //these will add the logo onto the screen based on x/y coords.
        var loadinglabel = this.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});

       
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('loading', 'assets/images/loading.png');
        this.load.image('redCar', 'assets/images/redcar.png');
        // load game assets, here we need to/can add a abunch of assets to be used in the game.
        this.load.image('space', 'assets/images/space.png');
        console.log('hello');

        // this.splash = this.add.image(this.game.world.centerX, this.game.world.centerY, 'logo');
        // this.splash.anchor.setTo(0.5);

        // this.preloadBar = this.add.image(this.game.world.centerX, this.game.world.centerY + 128, 'loading');
        // this.preloadBar.anchor.setTo(0.5);
        // this.load.setPreloadSprite(this.preloadBar);
    },
    create: function () {
        this.state.start('Menu')  }
};