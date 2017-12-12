

var Client = {};
Client.sockets = io.connect();

Client.askNewPlayer = function(){
    Client.sockets.emit('newPlayer');
}

//take data from server and create Client newPlayer
Client.sockets.on('newplayer',function(player){
    Game.addNewPlayer(player.id, player.x,player.y);
});

//add all players ofr client
Client.sockets.on('allplayers',function(data){
    console.log(data);
    for(var i = 0; i < data.length; i++){
        Game.addNewPlayer(data[i].id,data[i].x,data[i].y);
    }
});

//delete player based on id passed from server
Client.socket.on('remove',function(id){
    Game.removePlayer(id);
});

//sending new coordinates of player
Client.sendClick = function(xCor,yCor){
    Client.sockets.emit('click',{x:xCor,y:yCor});
  };

  Client.socket.on('move',function(data){
    Game.movePlayer(data.id,data.x,data.y);
});