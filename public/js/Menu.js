var menuState = {

    create: function () {
        //TODO: change this to display what tile we want to have displayed on our game
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

        
        this.background.autoScroll(-20, 0);

        var nameLabel = this.add.text(80, 80, 'racePaint',{
            font: '50px Courier', fill: '#ffffff'
        });
        var startLabel = this.add.text(80,220, 'to Start Game press A!',{
            font: '24px Courier', fill:'#ffffff'
        });
        var aKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
        aKey.onDown.addOnce(this.start, this);    
    },
       
        
    start: function () {
            this.state.start('Play');
    }
};