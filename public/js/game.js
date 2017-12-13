
//Setting up game
var game = new Phaser.Game(16*32, 600, Phaser.AUTO, document.getElementById('game'));


game.state.add('Game',Game);
game.state.start('Game');
var Game = {};

//
Game.init = function(){
    game.stage.disableVisibilityChange = true;
};


//Preload tiles, sprites
//TODO change all file pathings for sprites
Game.preload = function() {
    game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
    game.load.image('sprite','assets/sprites/sprite.png'); // this will be the sprite of the players
    game.load.image('diamond', '../img/diamond.png');
};

//create game and setup visuals
Game.create = function(){
    Game.playerMap = {} //Used to keep track of players 
    
    var map = game.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
    
    var layer;
    for(var i = 0; i < map.layers.length; i++) {
        layer = map.createLayer(i);
    }
    layer.inputEnabled = true; // Allows clicking on the map
    Client.askNewPlayer(); //client notifies server new player

    layer.events.onInputUp.add(Game.getCoordinates, this);
};










//add player
Game.addNewPlayer = function(id,x,y){
    Game.playerMap[id] = game.add.sprite(x,y,'sprite');
};

//remove player 
Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

//sends client coordinates
Game.getCoordinates = function(layer,pointer){
    //TODO give client coordinates
    //Client.sendClick(pointer.worldX,pointer.worldY);
};

//move player
Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
    //TODO make player move
};