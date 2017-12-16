var express = require('express');
var path = require('path');

module.exports = function(app) {

    app.get("/get", function(req, res) {
        console.log('app.get /');

        res.sendFile(path.join(__dirname, '../public/index.html'))
    })


    app.get("/login", function(req, res) {
        console.log('app.play /');

        res.sendFile(path.join(__dirname, '../public/login.html'))
    })
}