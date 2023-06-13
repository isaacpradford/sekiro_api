// Auth reference : https://www.youtube.com/watch?v=Q0a0594tOrc
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const passport = require('passport')

const app = express();
const port = 5500;

app.use(session({ secret: 'test' }));
app.use(passport.initialize());
app.use(passport.session());

app
    .use(bodyParser.json())
    .use((req, res, next) =>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'))

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
