var express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const logger = require('./logging/logger');

var app = express();
const port = 5500;

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
