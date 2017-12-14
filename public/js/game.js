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
       
        this.playerSpeed = 50;
        //set collision with the world border, might be larger than our tilemap currently
        this.player.body.collideWorldBounds = true;
    },
    update: function () {},
};