var menuState = {

    create: function () {
        //TODO: change this to display what tile we want to have displayed on our game
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

   
        this.background.autoScroll(-20, 0);

        
        var text = "Tap to begin";
        var style = {
            font: "30px Arial",
            fill: "#fff",
            align: "center"
        };
       
    },
    start: function () {
        if (this.game.input.activePointer.justPressed()) {
            this.game.state.start('play');
        }
    }
};