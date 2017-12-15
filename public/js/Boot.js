var bootState = {
    create: function (){
        racePaint.physics.startSystem(Phaser.Physics.P2JS);
        racePaint.state.start('Load');
    }
};