
var i;
var r;
var bmd;
var bmdDest;
var colors;
var emitter;
var velocity = 0;
var map;
var layer;
var collision;
var tilesCollisionGroup;

function paint(x, y) {
    colors = Phaser.Color.HSVColorWheel();
    bmd.circle(x, y, 10, colors[i].rgba);
}

var playState = {

    create: function () {

        //bitmap data

        map = this.add.tilemap();

        bmdDest = this.make.bitmapData(32 * 25, 32 * 20);

        layer = map.create('testlevel', window.innerWidth, window.innerHeight, 32, 32);

        map.setCollisionByExclusion([0]);

        for (var bodyIndex = 0; bodyIndex < map.layer.bodies.length; bodyIndex++) {
            var tileBody = map.layer.bodies[bodyIndex];
            tileBody.setCollisionGroup(tilesCollisionGroup);
            tileBody.collides([playerCollisionGroup]);
        }

        bmdDest.copy();
        bmdDest.addToWorld();

        bmd = this.make.bitmapData(800, 600);
        bmd.context.fillStyle = "#ffffff";


        this.input.addMoveCallback(paint, this);
        i = 0;
        r = new Phaser.Rectangle(0, 0, this.width, this.height);
        data = { r: 0, s: 0.5 };
        this.add.tween(data).to({ r: 360, s: 2 }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, Number.MAX_VALUE, true);


        //emitter 
        emitter = this.add.emitter(0, 200, 10);

        emitter.makeParticles('logo');
        emitter.lifespan = 5;
        emitter.scale.x = 0.5;
        emitter.scale.y = 0.5;

        function particleBurst() {
            emitter.start(false, 500, 20, 20, 20);
        }

        var explode = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        explode.onDown.add(particleBurst, emitter);

        //sprite creation
        this.physics.startSystem(Phaser.Physics.P2JS);
        this.physics.p2.setImpactEvents(true);
        this.physics.p2.setBoundsToWorld(true, true, true, true, false);

        tilesCollisionGroup = this.physics.p2.createCollisionGroup();

        var playerCollisionGroup = this.physics.p2.createCollisionGroup();
        this.physics.p2.updateBoundsCollisionGroup();

        player = this.add.sprite(200, 200, 'redCar');
        this.physics.p2.enable(player);

        player.body.setCollisionGroup(playerCollisionGroup);
        player.addChild(emitter);


        cursors = this.input.keyboard.createCursorKeys();
    },


    update: function () {

        function particleBurst() {
            emitter.start(false, 500, 20, 20, 20);
        }


        bmdDest.fill(0, 0, 0, 0);
        bmdDest.copy(bmd, 0, 0);
        bmd.context.fillRect(player.x, player.y, 5, 5);
        bmd.dirty = true;

        var explode = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        explode.onDown.add(particleBurst, this);

        if (cursors.up.isDown && velocity <= 400) {
            velocity += 10;
            paint();
        }
        else {
            if (velocity >= 7)
                velocity -= 10;
        }

        /*Set X and Y Speed of Velocity*/
        player.body.velocity.x = velocity * Math.cos((player.angle - 90) * 0.01745);
        player.body.velocity.y = velocity * Math.sin((player.angle - 90) * 0.01745);

        /*Rotation of player*/
        if (cursors.left.isDown)
            player.body.angularVelocity = -10 * (velocity / 1000);
        else if (cursors.right.isDown)
            player.body.angularVelocity = 10 * (velocity / 1000);
        else if (cursors.down.isDown) {
            velocity -= 7;
        }
        else
            player.body.angularVelocity = 0;

        player.body.collides(tilesCollisionGroup, particleBurst());
    },


};