var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var bodyParser = require('body-parser');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use('/assets', express.static(__dirname + '/assets'));

app.use(express.static("app/public"));

var PORT = process.env.PORT || 8080;


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', function (client) {
    client.on('event', function (data) { });
    client.on('disconnect', function () { });
});

server.listen(process.env.PORT || 8080, function () {
    console.log('Listening on ' + server.address().port);
});
