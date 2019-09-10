const express = require('express');
const helmet = require('helmet');
const carRoutes = require('./routes/carRoutes.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/cars', carRoutes);

server.use('/api', (req, res) => {
    res.status(200).json({
        message: 'SERVER IS SERVED.'
    })
});

module.exports = server;