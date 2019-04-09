// JavaScript source code


var express = require('express');
var app = express();
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('sqlite3/users.db');
var bodyParser = require('body-parser');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));


///message


    let data = ['Ansi C1', 'first Name'];
    let sql = 'UPDATE users SET fname=? WHERE fname=?';
    db.run(sql, function (err) {
        if (err) {
            console.log("Error: " + err);
        }
        else {
            console.log('POST request /users updated');
            
        }
    });


app.listen(3000, function () {
    console.log("Server is running on port 3000");
});


app.post('/message', function (request, response) {
    var post = request.body;
    db.run("UPDATE users SET message='post.message' WHERE fname = 'post.fname' AND surname = 'post.surname'",
        [request.body.message],
        function (err) {
            if (err) {
                console.log("Error: " + err);
            }
            else {
                console.log('POST request /users updated');
                response.send('Message is being sent');
            }
        });
});

app.post('/message', function (request, response) {
    var post = request.body;
    db.run("INSERT INTO users('message')VALUES (?)",
        [request.body.message],
        function (err) {
            if (err) {
                console.log("Error: " + err);
            }
            else {
                console.log('POST request /users updated');
                response.send('Message is being sent');
            }
        });
});

var post = request.body;
var first_name = document.getElementById("message").value;
var sur_name = document.getElementById("surname").value;