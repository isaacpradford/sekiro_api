// Auth reference : https://www.youtube.com/watch?v=Q0a0594tOrc


const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const passport = require('passport')
require('./auth')

const app = express();

app.use(session({ secret: 'test' }));
app.use(passport.initialize());
app.use(passport.session());

const port = 5500;

function isLoggedIn(req, res, next) {
    req.user ? next(): res.sendStatus(401);
}

app.get('/', (req, res) => {
    res.send("<a href='/auth/google'> Authenticate with Google: </a>")
});

app.get('/auth/google', 
    passport.authenticate('google', {scope: ['email', 'profile'] })
);

app.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/npcs',
        failureRedirect: '/auth/failure'
    })
)

app.get('/auth/failure', (req, res) => {
    res.send('Something went wrong.')
})

app.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });

    req.session.destroy()
    res.send('Goodbye')
});

app

    .use(bodyParser.json())
    .use((req, res, next) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', isLoggedIn, require('./routes'))

mongodb.initializeDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Listening on port: ${port}`)
    }
});

process.on('uncaughtException', (err, origin) => {
    console.error(`Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});
