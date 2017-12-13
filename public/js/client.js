
var Client = {};
Client.socket = io.connect('http://localhost:8080');

Client.askNewPlayer = function(){
    Client.socket.emit('newPlayer');
}

Client.sendTest = function(){
    console.log('test sent from client.js');
    Client.socket.emit('test'); 
}
//take data from server and create Client newPlayer
Client.socket.on('newplayer',function(player){
    Game.addNewPlayer(player.id, player.x,player.y);
});

//add all players ofr client
Client.socket.on('allplayers',function(data){
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
    Client.socket.emit('click',{x:xCor,y:yCor});
  };

  Client.socket.on('move',function(data){
    Game.movePlayer(data.id,data.x,data.y);
}); 

Client.sendTest();

