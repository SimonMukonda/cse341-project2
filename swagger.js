const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'APIDev Catalog API',
        description: 'CRUD API for cataloging developer APIs - CSE 341 Project 2'
    },
    host: process.env.NODE_ENV === 'production' ? 'cse341-project2-nw1s.onrender.com' : 'localhost:3002',
    schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
