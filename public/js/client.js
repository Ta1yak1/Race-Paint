var Client = {};
Client.socket = io.connect();

//Client methods emit signals to server============================

Client.askNewPlayer = function () {
    Client.socket.emit('newPlayerConnect');
};

Client.updateMe = function () {
    Client.socket.emit('update_Me', Game.self.id,
        Game.self.sprite.x, Game.self.sprite.y)
};

//Player movement---------------------------------------------------
Client.sendUp = function () {
    Client.socket.emit('upKey');
};

Client.sendDown = function () {
    Client.socket.emit('downKey');
};

Client.sendLeft = function () {
    Client.socket.emit('leftKey');
};

Client.sendRight = function () {
    Client.socket.emit('rightKey');
};

Client.sendStill = function () {
    Client.socket.emit('noneClick');
};

//===================================================================


//Listens for emits from server =====================================
Client.socket.on('addSelf', function (id, x, y) {
    Game.addSelf(id, x, y);
});

Client.socket.on('otherPlayer', function (id, x, y) {
    Game.addOtherPlayer(id, x, y);
});

Client.socket.on('updateMeToAll', function (id, x, y) {
    Game.updateOthers(id, x, y);
});

Client.socket.on('addAllOthers', function (data) {
    for (var i = 0; i < data.length; i++) {
        Game.addOtherPlayer(data[i].id,
            data[i].x, data[i].y);
    }
});

Client.socket.on('remove', function (id) {
    Game.removePlayer(id);
});

//Player movement---------------------------------------------------
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

//===================================================================