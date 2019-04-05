var express=require('express');
var app = express();
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('sqlite3/users.db');
var bodyParser = require('body-parser'); 


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

//routes

app.get('/', function (request, response) {
    response.send('Hello, world');
});


app.get('/users', function (request, response) {
    console.log('GET request received at /users');
    db.all('SELECT * FROM users', function (err, rows) {
        if (err) {
            console.log("Error: " + err);
        }
        else {
            response.send(rows);
        }
    });
});


app.post('/users', function (request, response) {
    console.log('POST request received at/users');
    db.run('INSERT INTO users VALUES(?,?,?,?)',
        [request.body.fname, request.body.surname, request.body.password], function (err) {
            if (err) {
                console.log("Error: " + err);
            }
            else {
                response.status(200).redirect('../main/index.html');
                
            }
        });
});

app.post('/message', function (request, response) {
    console.log('POST request /users updated');    
    db.run('UPDATE users SET message=? WHERE fname=? AND surname=?',
        [request.body.message], function (err) {
            if (err) {
                console.log("Error: " + err);
            }
            else {
                response.send('Message is being sent');
            }
        });
});

app.listen(3000,function(){
	console.log("Server is running on port 3000");
});