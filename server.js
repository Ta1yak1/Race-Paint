//Requiring necessary Packages=====================================
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

//Accessable public folder
app.use(express.static("public"));

//
var PORT = process.env.PORT || 8080;

require('./routes/html-routes.js')(app);

//Used to give values to new connecting Players
server.lastPlayerID = 0;
server.lastPlayerX = 0;
server.lastPlayerY = 200;


// Starts the server to begin listening
// =============================================================

io.on('connection', function (socket) {

    //On recieving a client's emit 'newPlayerConnect', run callback
    socket.on('newPlayerConnect', function () {
        console.log('New Player connected to server');
      
        socket.player = {
            id: server.lastPlayerID++,
            x: server.lastPlayerX += 100,
            y: server.lastPlayerY,
            rotating: false
        };

        //socket.emit sends message to sender-client 
        // and passes additional information through parameters
        console.log('adding Self : '+socket.player.id)
        socket.emit('addSelf', socket.player.id, 
            socket.player.x, socket.player.y);

        socket.emit('addAllOthers', getOthers(socket.player.id)); 

        //socket.broadcast.emit specifically emits to all OTHER 
        //connected clients that isn't the sender-client
        socket.broadcast.emit('otherPlayer', socket.player.id,
            socket.player.x,socket.player.y); 

        //io.emit emits message to ALL clients
        socket.on('disconnect', function () {
            io.emit('remove', socket.player.id);
        });

    });
    //Server emits sender-client's coordinates to all other clients
    socket.on('update_Me', function (id, x, y, angle) {
        if(server.lastPlayerID >1){
        socket.broadcast.emit('updateMeToAll', id, x, y, angle);
        }
    });

    //Server emitting sender-client's movements to all other clients--------
    socket.on('upKey', function () {
        if (socket.player) {
            socket.broadcast.emit('moveUp', socket.player)
        }
    });

    socket.on('downKey', function () {
        if (socket.player) {
            socket.broadcast.emit('moveDown', socket.player)
        }
    });

    socket.on('leftKey', function () {
        if (socket.player) {
            socket.player.rotating = true;
            socket.broadcast.emit('moveLeft', socket.player)
        }
    });

    socket.on('rightKey', function () {
        if (socket.player) {
            socket.player.rotating = true;
            socket.broadcast.emit('moveRight', socket.player)
        }
    });

    socket.on('noneClick', function () {
        if (socket.player) {
            if (socket.player.rotating) {
                socket.player.rotating = false;
                socket.broadcast.emit('moveNone', socket.player)
            }
        }

    });
    //-----------------------------------------------------------------------
    
});

//Returns list of clients minus player with given id, based on connection to server
function getOthers(id) {
    var players = [];
    Object.keys(io.sockets.connected).forEach(function (socketID) {
        var player = io.sockets.connected[socketID].player;
        if (player && player.id != id) {
            players.push(player);
        }
    })
    return players;
}

//Connecting to Port
server.listen(PORT, function () {
    console.log('Running on Port ' + PORT + '...');
});
