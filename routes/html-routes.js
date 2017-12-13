var express = require('express');
var path = require('path');

module.exports = function(app){

    app.get("/", function(req,res){
        console.log('app.get /');
 
        res.sendFile(path.join(__dirname,'../public/test.html'))
    })
}