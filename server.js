var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);