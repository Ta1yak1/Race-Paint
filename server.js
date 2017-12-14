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

    socket.on('newPlayer', function () {
        console.log('newplayer on server');
        socket.player = {
            id: server.lastPlayerID++,
            x: server.lastPlayerX += 100,
            y: server.lastPlayerY,
            key_input: null,
            rotating: false
        };

        socket.emit('allPlayers', getAllPlayers()); //sends message to new client updating them with existing clients
        socket.broadcast.emit('newPlayer', socket.player); //sends message to all clients minus existing updating about new client



        //handling disconnects
        socket.on('disconnect', function () {
            io.emit('remove', socket.player.id);
        });

    });
    socket.on('upKey', function () {
        io.emit('moveUp', socket.player)
    });

    socket.on('downKey', function () {
        io.emit('moveDown', socket.player)
    });

    socket.on('leftKey', function () {
        socket.player.rotating = true;
        io.emit('moveLeft', socket.player)
    });

    socket.on('rightKey', function () {
        socket.player.rotating = true;
        
        io.emit('moveRight', socket.player)
    });

    socket.on('noneClick', function () {
        if (socket.player.rotating) {
            socket.player.rotating = false;
            io.emit('moveNone', socket.player)
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

server.listen(PORT, function () {
    console.log('Running on Port ' + PORT + '...');
});
