// JavaScript source code

const express=require('express')
const app = express()
const port = 3000

function isAuthenticated(req, res, next) {
    let auth = false;
    if (auth)
    {
        console.log('authorised:' + auth);
        return next();
    }

    console.error('authorised:' + auth);
    res.redirect('/');
}

app.get('/', (req, res) => res.send('Hello World'));
app.get('/secret', isAuthenticated, function (req, res) { res.send('daka daka daka'); });

app.listen(port, () => console.log('Example app listening on port ${port}!'))