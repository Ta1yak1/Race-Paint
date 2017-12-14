var racePaint = racePaint || {};

//title screen
racePaint.Game = function () {};

racePaint.Game.prototype = {
        create: function () {
            game.stage.backgroundColor = '#2d2d2d';

            //  Creates a blank tilemap
            map = game.add.tilemap();

            //  This is our tileset - it's just a BitmapData filled with a selection of randomly colored tiles
            //  but you could generate anything here
            bmd = game.make.bitmapData(32 * 25, 32 * 2);

            var colors = Phaser.Color.HSVColorWheel();

            var i = 0;

            for (var y = 0; y < 2; y++) {
                for (var x = 0; x < 25; x++) {
                    bmd.rect(x * 32, y * 32, 32, 32, colors[i].rgba);
                    i += 6;
                }
            }
            this.game.world.setBounds(0, 0, 400, 400);
            map.addTilesetImage('tiles', bmd);

            //  Creates a new blank layer and sets the map dimensions.
            //  In this case the map is 40x30 tiles in size and the tiles are 32x32 pixels in size.
            layer = map.create('level1', 40, 30, 32, 32);

            //  Populate some tiles for our player to start on
            map.putTile(30, 2, 10, layer);
            map.putTile(30, 3, 10, layer);
            map.putTile(30, 4, 10, layer);

            map.setCollisionByExclusion([0]);

            //  Create our tile selector at the top of the screen
            createTileSelector();

            player = game.add.sprite(64, 100, 'redCar');
            game.physics.P2JS.enable(player);
            game.physics.arcade.gravity.y = 350;

            player.body.bounce.y = 0.1;
            player.body.collideWorldBounds = true;
            player.body.setSize(20, 32, 5, 16);

            player.animations.add('left', [0, 1, 2, 3], 10, true);
            player.animations.add('turn', [4], 20, true);
            player.animations.add('right', [5, 6, 7, 8], 10, true);

            cursors = game.input.keyboard.createCursorKeys();
            jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            game.input.addMoveCallback(updateMarker, this);

        
        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'redCar');

        this.player.scale.setTo(1.5);


        var bmd = game.make.bitmapData(this.game.width, this.game.height)
        bmd.context.fillStyle = '#ffffff';

        //TODO set the animation for the car moving, I can't remember what it was.
        //something along the lines of
        //this.player.animations.add('drive',[1], 1, true);
        //this.player.animations.play('drive');

        //set collision with the world border, world might be larger than our tilemap currently
        this.game.physics.P2JS.enable(this.player);

        this.playerSpeed = 50;

        this.player.body.collideWorldBounds = true;

        game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
        arrowKeys = game.input.keyboard.createCursorKeys();

    },
    update: function () {
         bmd.context.fillRect(this.player.x, this.player.y, 5, 5);
         bmd.dirty = true;

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