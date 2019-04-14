
function login() {
        db.get('SELECT fname, surname, password FROM users WHERE fname=? AND surname=?AND password=?',
            [request.body.fname, request.body.surname, request.body.password], function (err,row) {
                var post = request.body;
                if (!row) {
                    response.send('You have to sign up');
                    console.log('User no authorised/go to login');
                }
                else {
                    console.log('User authenticated');
                    response.redirect('../main/index.html');

                };
            });

    };

    





