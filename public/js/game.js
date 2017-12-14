var racePaint = racePaint || {};

//title screen
racePaint.Game = function () {};

racePaint.Game.prototype = {
    create: function () {
        this.game.world.setBounds(0, 0, 400, 400);
        //set the world for the game 
        this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');

        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'redCar');

        this.player.scale.setTo(1.5);


        //TODO set the animation for the car moving, I can't remember what it was.
        //something along the lines of
        //this.player.animations.add('drive',[1], 1, true);
        //this.player.animations.play('drive');

        //set collision with the world border, world might be larger than our tilemap currently
        this.game.physics.P2JS.enable(this.player);
        
        this.playerSpeed = 50;

        this.player.body.collideWorldBounds = true;

        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
    },
    update: function () {
        if (arrowKeys.left.isDown) {
            this.player.body.rotateLeft(100);
        } else if (arrowKeys.right.isDown) {
            this.player.body.rotateRight(100);
        } else {
            this.player.body.setZeroRotation();
        }
        if (arrowKeys.up.isDown) {
            this.player.body.thrust(150);
        } else if (arrowKeys.down.isDown) {
            this.player.body.reverse(100);
        }
    }
};