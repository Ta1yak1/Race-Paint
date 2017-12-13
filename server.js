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
server.lastPlayerX = 200;
server.lastPlayerY = 200;


// Starts the server to begin listening
// =============================================================
io.on('connection', function (socket) {
    //handling new connection

    socket.on('newPlayer', function () {
        socket.player = {
            id: server.lastPlayerID++,
            x: server.lastPlayerX += 200,
            y: server.lastPlayerY
        };
        socket.emit('allPlayer', getAllPlayers()); //sends message to new client updating them with existing clients
        socket.broadcast.emit('newPlayer', socket.player); //sends message to all clients minus existing updating about new client

        //handling inputs
        socket.on('click', function (data) {
            console.log('click to ' + data.x + ', ' + data.y);
            socket.player.x = data.x;
            socket.player.y = data.y;
            io.emit('move', socket.player);
        });

        //handling disconnects
        socket.on('disconnect', function () {
            io.emit('remove', socket.player.id);
        });
    });
    socket.on('test', function(){
        console.log('test recived from client.js');
    });
});

function getAllPlayers() {
    var players = [];
    Objects.keys(io.sockets.connected).forEach(function (socketID) {
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
