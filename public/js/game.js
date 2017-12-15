//Setting up game Canvas
var game = new Phaser.Game(16 * 32, 600, Phaser.AUTO, document.getElementById('game'));

var UPDATE_TIC_RATE = 10;
var Game = {};
var selfCreated = false;

var bmdDest;
var bmd;
var map;



Game.init = function() {
    game.stage.disableVisibilityChange = true;
};


//Phaser's Preload:  tiles, sprites
//TODO change all file pathings for sprites
Game.preload = function() {
    game.load.image('car', '../img/redcar.png');
};

//create game and setup visuals
Game.create = function() {
    //Used to identify server to it's own Car
    Game.self;
    //Used to track cars of other players
    Game.playerMap = {};
    game.physics.startSystem(Phaser.Physics.P2JS);

    map = game.add.tilemap();
    bmdDest = game.make.bitmapData(32 * 25, 32 * 20);
    layer = map.create('testlevel', window.innerWidth, window.innerHeight, 32, 32);


    bmdDest.copy();
    bmdDest.addToWorld();

    bmd = game.make.bitmapData(800, 600);
    bmd.context.fillStyle = "#ffffff";

    //Setting up keyboard arrowKey controls
    keyInput = game.input.keyboard.createCursorKeys();

    //Client emits message to server that they are attempting to connect
    Client.askNewPlayer(); //client notifies server new player

    //Updating other players of this player's position

    setInterval(Client.updateMe, UPDATE_TIC_RATE);


};

//game updates
Game.update = function() {
    if (selfCreated) {

        var MyCar = Game.self.sprite.body
        bmdDest.fill(0, 0, 0, 0);
        bmdDest.copy(bmd, 0, 0);
        bmd.dirty = true;

        Game.paint(MyCar.x, MyCar.y);


        if (keyInput.left.isDown) {
            MyCar.rotateLeft(100);
            Client.sendLeft();
        } else if (keyInput.right.isDown) {
            MyCar.rotateRight(100);
            Client.sendRight();
        } else {
            if (MyCar) {
                MyCar.setZeroRotation();
                Client.sendStill();
            }
        }
        if (keyInput.up.isDown) {
            MyCar.thrust(300);
            Client.sendUp();
        } else if (keyInput.down.isDown) {
            MyCar.reverse(100);
            Client.sendDown();
        }
    }
}

//adding player object to have client self identify to
Game.addSelf = function(id, x, y) {
        Game.self = {
            sprite: game.add.sprite(x, y, 'car'),
            id: id
        };
        game.physics.p2.enable(Game.self.sprite);
        game.physics.p2.setBoundsToWorld(true, true, true, true, false);
        selfCreated = true;
    }
    //adding other players to seperate trackable list
Game.addOtherPlayer = function(id, x, y) {
    Game.playerMap[id] = game.add.sprite(x, y, 'car')
    game.physics.p2.enable(Game.playerMap[id]);
    game.physics.p2.setBoundsToWorld(true, true, true, true, false);

};

//remove player by id
Game.removePlayer = function(id) {
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

//Player Mobility methods=====================
Game.pressUp = function(id) {
    player = Game.playerMap[id];
    player.body.thrust(300);


}
Game.pressDown = function(id) {
    player = Game.playerMap[id];
    player.body.reverse(100);


}
Game.pressNone = function(id) {
    player = Game.playerMap[id];
    player.body.setZeroRotation();


}
Game.pressLeft = function(id) {
    player = Game.playerMap[id];
    player.body.rotateLeft(100);

}
Game.pressRight = function(id) {
        player = Game.playerMap[id];
        player.body.rotateRight(100);

    }
    //==============================================

Game.updateOthers = function(id, x, y, angle) {
    console.log('updating other sprites..');
    player = Game.playerMap[id];
    if (player) {
        player.body.x = x;
        player.body.y = y;
        player.body.angle = angle
        Game.paint(player.body.x, player.body.y);
    }
}

Game.paint = function(x, y) {
    var colors = Phaser.Color.HSVColorWheel();
    bmd.context.fillRect(x, y, 5, 5)
}


//Loading in our Game state into canvas
game.state.add('Game', Game);
game.state.start('Game');