const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: "MM-DD-YYYY HH:mm:ss"
        }),
    winston.format.json()
    ),
    // defaultMeta: { service: 'user-service'},
    transports: [
        // All errors with importance level of `error` or less go to error.log
        new winston.transports.File({ filename: './logging/error.log', level: 'error' }),

        // All errors with importance level of `info` or less goes to combined.log
        new winston.transports.File({ filename: './logging/combined.log' }),
    ]
});

// Log errors to console, if you feel like it
logger.add(new winston.transports.Console({
// .simple() should follow // `${info.level}: ${info.message} JSON.stringify({ ...rest }) ` format
    format: winston.format.simple()
}));

module.exports = logger;