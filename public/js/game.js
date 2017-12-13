var Client = require('./client.js');
//Setting up game
var game = new Phaser.Game(16*32, 600, Phaser.AUTO, document.getElementById('game'));


var Game = {};

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
    Client.askNewPlayer(); //client notifies server new player

    layer.events.onInputUp.add(Game.getCoordinates, this);

    //bitmap data

    var bmd = game.make.bitmapData(game.width, game.height)
    bmd.context.fillStyle = '#ffffff';

    var bg = game.add.sprite(0, 0, bmd);

    player = game.add.sprite(200, 200, 'car');
    game.physics.p2.enable(player);
    game.physics.p2.setBoundsToWorld(true, true, true, true, false);

    arrowKeys = game.input.keyboard.createCursorKeys();
};

function update() {

    bmd.context.fillRect(player.x, player.y, 5, 5);
    bmd.dirty = true;

    if (arrowKeys.left.isDown) {
        player.body.rotateLeft(100);
    }
    else if (arrowKeys.right.isDown) {
        player.body.rotateRight(100);
    }
    else {
        player.body.setZeroRotation();
    }
    if (arrowKeys.up.isDown) {
        player.body.thrust(150);
    }
    else if (arrowKeys.down.isDown) {
        player.body.reverse(100);
    }


    //add player
    Game.addNewPlayer = function (id, x, y) {
        Game.playerMap[id] = game.add.sprite(x, y, 'car');
    };

    //remove player 
    Game.removePlayer = function (id) {
        Game.playerMap[id].destroy();
        delete Game.playerMap[id];
    };

    //sends client coordinates
    Game.getCoordinates = function (layer, pointer) {
        //TODO give client coordinates
        Client.sendClick(player.x,player.y);
    };

    //move player
    Game.movePlayer = function (id, x, y) {
        var player = Game.playerMap[id];
        //TODO make player move
    };
}

game.state.add('Game', Game);
game.state.start('Game');


module.exports = Game;