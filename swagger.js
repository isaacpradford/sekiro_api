const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'SekiroAPI',
        description: 'An API for all things Sekiro.'
    }, 
    host: 'sekiro-api.onrender.com',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);