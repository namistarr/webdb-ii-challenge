const express = require('express');
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(error => {
            res.status(500).json(error);
        })
});

router.get('/:id', (req, res) => {
    db('cars').where({ id: req.params.id })
    .first()
    .then(car => {
        res.status(200).json(car);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.post('/', (req, res) => {
    const { VIN, make, model, mileage, transmission, titleStatus } = req.body;

    if (
        typeof VIN === 'string'
        && typeof make === 'string'
        && typeof model === 'string'
        && typeof mileage === 'number'
    ) {
        db('cars').insert({ VIN, make, model, mileage, transmission, titleStatus }, 'id')
        .then(([id]) => {
            res.status(201).json(id);
        })
        .catch(error => {
            res.status(500).json(error);
        })        
    }
    else {
        res.status(400).json({
            message: 'Missing a required field.'
        })
    }
    
})

module.exports = router;