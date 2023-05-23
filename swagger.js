const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'SekiroAPI',
        description: 'An API for all things Sekiro.'
    }, 
    // host: 'cse341-5zah.onrender.com',
    host: 'localhost:5500',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);