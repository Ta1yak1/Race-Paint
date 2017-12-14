
//Setting up game
var game = new Phaser.Game(16 * 32, 600, Phaser.AUTO, document.getElementById('game'));


var Game = {};

var isGame = false;

//
Game.init = function () {
    game.stage.disableVisibilityChange = true;
};


//Preload tiles, sprites
//TODO change all file pathings for sprites
Game.preload = function () {
    // game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    // game.load.spritesheet('tileset', 'assets/map/tilesheet.png', 32, 32);
    // game.load.image('sprite', 'assets/sprites/sprite.png'); // this will be the sprite of the players
    game.load.image('diamond', '../img/diamond.png');
    game.load.image('car', '../img/redcar.png');
};

//create game and setup visuals
Game.create = function () {
    
    Game.playerMap = {} //Used to keep track of players 

    // var map = game.add.tilemap('map');
    // map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file

    // var layer;
    // for (var i = 0; i < map.layers.length; i++) {
    //     layer = map.createLayer(i);
    // }
    // layer.inputEnabled = true; // Allows clicking on the map


    //layer.events.onInputUp.add(Game.getCoordinates, this);

    //bitmap data

    var bmd = game.make.bitmapData(game.width, game.height)
    bmd.context.fillStyle = '#ffffff';

    var bg = game.add.sprite(0, 0, bmd);

    game.physics.startSystem(Phaser.Physics.P2JS);

    keyInput = game.input.keyboard.createCursorKeys();

    Client.askNewPlayer(); //client notifies server new player
    isGame = true;
};

//game updates
Game.update = function () {
    if (isGame){
        if (keyInput.left.isDown) {
            Client.sendLeft();
        }
        else if (keyInput.right.isDown) {
            Client.sendRight();
        }
        //SERVER BREAKS WHEN SENDSTILL FOR SOME REASON
        else {
            Client.sendStill();
        }
        if (keyInput.up.isDown) {
            Client.sendUp();
        }
        else if (keyInput.down.isDown) {
            Client.sendDown();
        }
    }
}



//add player
Game.addNewPlayer = function (id, x, y) {
    Game.playerMap[id] = game.add.sprite(x, y, 'car');
    game.physics.p2.enable(Game.playerMap[id]);
    game.physics.p2.setBoundsToWorld(true, true, true, true, false);

};

//remove player 
Game.removePlayer = function (id) {
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

Game.pressUp = function (id) {
    player = Game.playerMap[id];
    player.body.thrust(300);

}
Game.pressDown = function (id) {
    player = Game.playerMap[id];
    player.body.reverse(100);
  
}
Game.pressNone = function(id){
    player = Game.playerMap[id];
    player.body.setZeroRotation();
    
}
Game.pressLeft = function (id) {
    player = Game.playerMap[id];
    player.body.rotateLeft(100);
}
Game.pressRight = function (id) {
    player = Game.playerMap[id];
    player.body.rotateRight(100);
}



game.state.add('Game', Game);
game.state.start('Game');
