var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use(express.static("app/public"));

var app = express();
var PORT = process.env.PORT || 8080;


// Starts the server to begin listening
// =============================================================
io.on('connection', function (client) {
    client.on('event', function (data) { });
    client.on('disconnect', function () { });
});

server.listen(PORT, function(){
    console.log('Running on Port '+PORT+'...');
});

