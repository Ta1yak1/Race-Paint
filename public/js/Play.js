
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
var UPDATE_TIC_RATE = 10;
var Game = {};
var selfCreated = false;

function paint(x, y) {
    colors = Phaser.Color.HSVColorWheel();
    bmd.context.fillRect(x, y, 5, 5, colors[i].rgba);
}



var Game = {

    create: function () {
        //create game and setup visuals
        //Used to identify server to it's own Car
        Game.self;
        //Used to track cars of other players
        Game.playerMap = {};
        racePaint.physics.startSystem(Phaser.Physics.P2JS);

        //Setting up keyboard arrowKey controls
        // keyInput = racePaint.input.keyboard.createCursorKeys();

        //Client emits message to server that they are attempting to connect
        Client.askNewPlayer(); //client notifies server new player

        //Updating other players of this player's position
        setInterval(Client.updateMe, UPDATE_TIC_RATE);


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
        // emitter = this.add.emitter(0, 200, 10);

        // emitter.makeParticles('logo');
        // emitter.lifespan = 5;
        // emitter.scale.x = 0.5;
        // emitter.scale.y = 0.5;

        // function particleBurst() {
        //     emitter.start(false, 500, 20, 20, 20);
        // }

        // var explode = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // explode.onDown.add(particleBurst, emitter);

        //sprite creation
        // this.physics.startSystem(Phaser.Physics.P2JS);
        // this.physics.p2.setImpactEvents(true);
        // this.physics.p2.setBoundsToWorld(true, true, true, true, false);



        tilesCollisionGroup = this.physics.p2.createCollisionGroup();

        var playerCollisionGroup = this.physics.p2.createCollisionGroup();
        this.physics.p2.updateBoundsCollisionGroup();
        
        cursors = this.input.keyboard.createCursorKeys();
    },



    update: function () {
        console.log(selfCreated);
        if (selfCreated) {
            player = Game.self.sprite;
            // function particleBurst() {
            //     emitter.start(false, 500, 20, 20, 20);
            // }

            bmdDest.fill(0, 0, 0, 0);
            bmdDest.copy(bmd, 0, 0);
            bmd.context.fillRect(player.x, player.y, 5, 5);
            bmd.dirty = true;

            if (cursors.up.isDown && velocity <= 400) {
                velocity += 10;
                paint();
                Client.sendUp();
            }
            else if (velocity >= 7) {
                velocity -= 10;
            }

            /*Set X and Y Speed of Velocity*/
            player.body.velocity.x = velocity * Math.cos((player.angle - 90) * 0.01745);
            player.body.velocity.y = velocity * Math.sin((player.angle - 90) * 0.01745);

            /*Rotation of player*/
            if (cursors.left.isDown) {
                player.body.angularVelocity = -10 * (velocity / 1000);
                Client.sendLeft();
            }
            else if (cursors.right.isDown) {
                player.body.angularVelocity = 10 * (velocity / 1000);
                Client.sendRight();
            }
            else if (cursors.down.isDown) {
                velocity -= 7;
                Client.sendDown();
            }
            else {
                player.body.angularVelocity = 0;
            }
            player.body.collides(tilesCollisionGroup);
        };
    },


};

Game.addSelf = function (id, x, y) {
    Game.self = {
        sprite: racePaint.add.sprite(x, y, 'redCar'),
        id: id
    };
    selfCreated = true;
    player = Game.self.sprite;
    racePaint.physics.p2.enable(player);

    racePaint.physics.p2.setBoundsToWorld(true, true, true, true, false);
    
}
//adding other players to seperate trackable list
Game.addOtherPlayer = function (id, x, y) {
    Game.playerMap[id] = racePaint.add.sprite(x, y, 'redCar');
    racePaint.physics.p2.enable(Game.playerMap[id]);
    racePaint.physics.p2.setBoundsToWorld(true, true, true, true, false);
};

//remove player by id
Game.removePlayer = function (id) {
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

//Player Mobility methods=====================
Game.pressUp = function (id) {
    player = Game.playerMap[id];
    player.body.velocity += 10;
    paint(player.body.x,player.body.y);
}
Game.pressDown = function (id) {
    player = Game.playerMap[id];
    player.body.velocity += 10;
    paint(player.body.x,player.body.y);

}
Game.pressNone = function (id) {
    player = Game.playerMap[id];
    player.body.setZeroRotation();
    player.body.angularVelocity = 0;
    paint(player.body.x,player.body.y);
}
Game.pressLeft = function (id) {
    player = Game.playerMap[id];
    player.body.angularVelocity = -10 * (velocity / 1000);
}
Game.pressRight = function (id) {
    player = Game.playerMap[id];
    player.body.angularVelocity = 10 * (velocity / 1000);
}

Game.updateOthers = function (id, x, y) {
    console.log('updating other sprites..');
    player = Game.playerMap[id];
    if (player) {
        player.body.x = x;
        player.body.y = y;
    }

};