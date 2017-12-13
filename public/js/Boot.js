var racePaint = racePaint || {};

racePaint.Boot = function () {};

//setting game configuration and loading the assets for the loading screen
racePaint.Boot.prototype = {
    preload: function () {
        // WE CAN ADD OUR OWN LOGO HERE IF WE WANT
        //assets we'll use in the loading screen
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('preloadbar', 'assets/images/loading.png');
    },
    create: function () {
        //loading screen will have a white background
        this.game.stage.backgroundColor = '#fff';

        //scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 240;
        this.scale.minHeight = 240;
        this.scale.maxWidth = 2880;
        this.scale.maxHeight = 2880;

        //have the game centered horizontally
        this.scale.pageAlignHorizontally = true;

        //screen size will be set automatically
        this.scale.setScreenSize(true);

        //physics system for movement
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        this.state.start('Preload', Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
    }
};