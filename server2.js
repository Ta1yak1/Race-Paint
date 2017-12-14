var express = require('express');
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use(express.static("public"));

var PORT = process.env.PORT || 8080;


require('./routes/html-routes.js')(app);


//keeping track of players
server.lastPlayerID = 0;
server.lastPlayerX = 0;
server.lastPlayerY = 200;


// Starts the server to begin listening
// =============================================================
io.on('connection', function (socket) {
    //handling new connection

    socket.on('newPlayerConnect', function () {
        console.log('newplayer on server');
        socket.player = {
            id: server.lastPlayerID++,
            x: server.lastPlayerX += 100,
            y: server.lastPlayerY,
            key_input: null,
            rotating: false
        };

        socket.emit('addSelf', socket.player);
        socket.emit('addOthers', getOthers());
        socket.broadcast.emit('newPlayer', socket.player); //sends message to all clients minus existing updating about new client


        //handling disconnects
        socket.on('disconnect', function () {
            io.emit('remove', socket.player.id);
        });

    });
    socket.on('upKey', function () {
        socket.broadcast.emit('moveUp',socket.player)
    });

    socket.on('downKey', function () {
        socket.broadcast.emit('moveDown', socket.player)
    });

    socket.on('leftKey', function () {
        socket.player.rotating = true;
        socket.broadcast.emit('moveLeft', socket.player)
    });

    socket.on('rightKey', function () {
        socket.player.rotating = true;
        
        socket.broadcast.emit('moveRight', socket.player)
    });

    socket.on('noneClick', function () {
        if (socket.player.rotating) {
            socket.player.rotating = false;
            socket.broadcast.emit('moveNone', socket.player)
        }

    });
    socket.on('test', function () {
        console.log('test recived from client.js');
    });
});

function getAllPlayers() {
    var players = [];
    Object.keys(io.sockets.connected).forEach(function (socketID) {
        var player = io.sockets.connected[socketID].player;
        if (player) {
            players.push(player);
        }
    })
    return players;
}

function getOthers() {
    var players = [];
    Object.keys(io.sockets.connected).forEach(function (socketID) {
        var player = io.sockets.connected[socketID].player;
        if (player) {
            players.push(player);
        }
    })
    if(players.length <2){
        return [];
    }
    players.slice(0,players.length-2)
    return players;
}

server.listen(PORT, function () {
    console.log('Running on Port ' + PORT + '...');
});
