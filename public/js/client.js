
var Client = {};
Client.socket = io.connect('http://localhost:8080');

Client.askNewPlayer = function () {
    Client.socket.emit('newPlayer');
    console.log('askNewPlayer');
}

Client.sendTest = function () {
    console.log('test sent from client.js');
    Client.socket.emit('test');
}
//take data from server and create Client newPlayer
Client.socket.on('newPlayer', function (player) {
    Game.addNewPlayer(player.id, player.x, player.y);
    console.log('adding new player');
});

//add all players ofr client
Client.socket.on('allPlayers', function (data) {
    console.log('client allplayers')
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        Game.addNewPlayer(data[i].id, data[i].x, data[i].y);
    }
});

//delete player based on id passed from server
Client.socket.on('remove', function (id) {
    Game.removePlayer(id);
});

//sending button click of player
// Client.sendButton = function (arrowKeys) {
//     Client.socket.emit('button', arrowKeys);
// };

Client.socket.on('moveUp', function (data) {
    Game.pressUp(data.id);
});
Client.socket.on('moveDown', function (data) {
    Game.pressDown(data.id);
});
Client.socket.on('moveLeft', function (data) {
    Game.pressLeft(data.id);
});
Client.socket.on('moveRight', function (data) {
    Game.pressRight(data.id);
});
Client.socket.on('moveNone', function (data) {
    Game.pressNone(data.id);
});
Client.sendUp = function () {
    Client.socket.emit('upKey');
}
Client.sendDown = function () {
    Client.socket.emit('downKey');
}
Client.sendLeft = function () {
    Client.socket.emit('leftKey');
}
Client.sendRight = function () {
    Client.socket.emit('rightKey');
}
Client.sendStill = function () {
    Client.socket.emit('noneClick');
}


