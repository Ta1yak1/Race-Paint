var express = require('express');
var path = require('path');
var mysql = require('mysql');

module.exports = function(app) {

    app.get("/api/get", function(req, res) {
        console.log(path.join(__dirname, '../public/index.html'));

        res.sendFile(path.join(__dirname, '../public/index.html'))
    })


    app.post("/api/register", function(req, res) {
        console.log(req.body);

        //    res.sendFile(path.join(__dirname, '../public/index.html'))


        var connection = mysql.createPool({
            connectionLimit: 10,
            host: "tk3mehkfmmrhjg0b.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
            user: "qbrhypfyxqvzgg4d",
            password: "d0rxpgswki3830cw",
            database: "tymkh4euex835957"
        });

        connection.getConnection(function(err, connec) {
            console.log("connected as id " + connection.threadId);

        });


        console.log(req.body.playername);
        console.log(req.body.nickname);
        connection.query("insert into users (playername, nickname) values (\'" + req.body.playername + "\',\'" + req.body.nickname + "\')", function(err, res1) {
            if (err) throw err;

            connection.query("select * from users", function(err, res2) {
                if (err) throw err;
                console.log(res2);
                res.json(JSON.stringify(res2));
                connection.end();
            });
        });

    })
}