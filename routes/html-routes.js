var express = require('express');
var path = require('path');

module.exports = function (app) {

    app.get("/game", function (req, res) {
        res.sendFile(path.join(__dirname, '../public/game.html'))
    })

    app.get("/index", function (req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'))
    })

}