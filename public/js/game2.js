
window.onload = function () {

    
    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

    var i;
    var r;
    var bmd;
    var bmdDest;
    var colors;

    function preload() {
        // game.load.tilemap('map', 'assets/map/example_map.json', null, Phaser.Tilemap.TILED_JSON);
    // game.load.spritesheet('tileset', 'assets/map/tilesheet.png', 32, 32);
        game.load.image('car', '../img/redcar.png');
    }

    function create() {
        playerMap = {} //Used to keep track of players 


        //bitmap data
        bmd = game.make.bitmapData(game.width, game.height);
        bmd.context.fillStyle = '#ffffff';

        var bg = game.add.sprite(0, 0, bmd);

        colors = Phaser.Color.HSVColorWheel();
       
        i = 0;
        r = new Phaser.Rectangle(0, 0, game.width, game.height);
        data = { r: 0, s: 0.5 };
        game.add.tween(data).to({ r: 360, s: 2 }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, Number.MAX_VALUE, true);

        //sprite creation
        game.physics.startSystem(Phaser.Physics.P2JS);

        player = game.add.sprite(200, 200, 'car');
        game.physics.p2.enable(player);
        game.physics.p2.setBoundsToWorld(true, true, true, true, false);

        keyInput = game.input.keyboard.createCursorKeys();

    }


    function update() {

        bmd.context.fillRect(player.x, player.y, 5, 5);
        bmd.dirty = true;

        if (keyInput.left.isDown) {
            player.body.rotateLeft(100);
        }
        else if (keyInput.right.isDown) {
            player.body.rotateRight(100);
        }
        else {
            player.body.setZeroRotation();
        }
        if (keyInput.up.isDown) {
            player.body.thrust(300);


        }
        else if (keyInput.down.isDown) {
            player.body.reverse(100);
        }

    }
}
