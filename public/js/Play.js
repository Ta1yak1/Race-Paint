var playState = {
   
    create: function () {
        this.player = this.add.sprite(16, 16, 'redCar');
        this.keyboard = this.input.keyboard;
        this.physics.enable(this.player, Phaser.Physics.P2JS);

    },
    update: function () {
        bmdDest.fill(0, 0, 0, 0);
        bmdDest.copy(bmd, 0, 0);
        bmd.context.fillRect(player.x, player.y, 5, 5);
        bmd.dirty = true;

        var explode = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        explode.onDown.add(particleBurst, this);

        if (cursors.up.isDown && velocity <= 400) {
            velocity += 7;
            paint();
        } else {
            if (velocity >= 7) {
                velocity -= 7;
            }
        }

        /*Set X and Y Speed of Velocity*/
        player.body.velocity.x = velocity * Math.cos((player.angle - 90) * 0.01745);
        player.body.velocity.y = velocity * Math.sin((player.angle - 90) * 0.01745);

        /*Rotation of player*/
        if (cursors.left.isDown) {
            player.body.angularVelocity = -10 * (velocity / 1000);
        } else if (cursors.right.isDown) {
            player.body.angularVelocity = 10 * (velocity / 1000);
        } else if (cursors.down.isDown) {
            velocity -= 7;
        } else {
            player.body.angularVelocity = 0;
        }
        player.body.collides(tilesCollisionGroup, particleBurst());

        function particleBurst() {
            emitter.start(false, 500, 20, 20, 20);
        }
    }
};