racePaint.MainMenu = function () {};

racePaint.MainMenu.prototype = {
    create: function () {
        //TODO: change this to display what tile we want to have displayed on our game
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');

        //give it speed in x
        this.background.autoScroll(-20, 0);

        //start game text
        var text = "Tap to begin";
        var style = {
            font: "30px Arial",
            fill: "#fff",
            align: "center"
        };
        var t = this.game.add.text(this.game.width / 2, this.game.height / 2, text, style);
        t.anchor.set(0.5);

        //if we wanted to add scores and or highscore, unnecesary in our project I believe 
        //text = "Highest score: "+this.highestScore;
        //style = { font: "15px Arial", fill: "#fff", align: "center" };

        var h = this.game.add.text(this.game.width / 2, this.game.height / 2 + 50, text, style);
        h.anchor.set(0.5);
    },
    update: function () {
        if (this.game.input.activePointer.justPressed()) {
            this.game.state.start('Game', Phaser.Plugin.StateTransition.Out.SlideLeft, Phaser.Plugin.StateTransition.In.SlideLeft);
        }
    }
};