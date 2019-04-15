var express=require('express');
var app = express();
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('sqlite3/users.db');
var bodyParser = require('body-parser');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

//routes

app.get('/', function (request, response) {
    response.send('Hello, world');
});


app.get('/receiverot13', function (request, response) {
    console.log('GET request received at /users');
    var post = request.body;
    
    db.get('SELECT messagerot13 FROM users WHERE fname = ? AND surname = ?',
        [request.body.fname, request.body.surname, request.body.messagerot13], function (row) {
            if (row) {
                response.send(document.getElementById("messagedecoderot13").innerHTML = row);

            }
            else {
                console.log("No message");
                response.status(200).redirect('../messages/index.html');
            }
        });
});

app.get('/receiveb64', function (request, response) {
    console.log('GET request received at /users');
    var post = request.body;
    db.get('SELECT messageb64 FROM users WHERE fname = ? AND surname = ?',
        [request.body.fname, request.body.surname],
        function (row) {
            if (!row) {
                console.log("No message");
                response.status(200).redirect('../messages/index.html');
            }
            else {
                function showMessage(comments) {                    
                    var commentsSection = document.getElementById("messagereceivedB64");
                    for (var i = 0; i < comments.length; i++) {
                        commentsSection.innerHTML = messageb64[i];
                        response.end();
                    };

                };

            };

        });
});


//sign up

app.post('/users', function (request, response) {
    db.get('SELECT fname, surname, password FROM users WHERE fname=? AND surname=? AND password=?',
        [request.body.fname, request.body.surname, request.body.password], function (err, row) {
            var post = request.body;
            if (!row) {
                db.run('INSERT INTO users VALUES(?,?,?,?,?)',
                    [request.body.fname, request.body.surname, request.body.password],
                    function (err) {
                        if (err) {
                            console.log("Error: " + err);
                        }
                        else {
                            console.log('POST request received at/users');
                            response.status(200).redirect('../main/index.html');
                        }
                    });
            }
            else {
                console.log('User authenticated');
                response.redirect('../main/index.html');

            };
        });

});

//message

app.post('/messagerot13', function (request, response) {
    var post = request.body;
    db.run("UPDATE users SET messagerot13 = ? WHERE fname = ? AND surname = ?",
        [request.body.messagerot13,request.body.fname,request.body.surname],
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

app.post('/messageb64', function (request, response) {
    var post = request.body;
    db.run("UPDATE users SET messageb64 = ? WHERE fname = ? AND surname = ?",
        [request.body.messageb64, request.body.fname, request.body.surname],
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

app.listen(3000, function () {
     console.log("Server is running on port 3000");
});