const express = require('express');
const router = express.Router();
const { checkId, checkBody, getAllTours, getTour, createTour, updateTour, deleteTour } = require('../controllers/tours');

//Use Param middleware to check id on routes with :id
router.param('id', checkId);

//GET - /api/v1/tours
router.get('/', getAllTours);

//GET - /api/v1/tours/:id
router.get('/:id', getTour);

//POST - /api/v1/tours
router.post('/', checkBody, createTour);

//PATCH - /api/v1/tours/:id
//Not really updating, just simulating
router.patch('/:id', updateTour);

//DELETE - /api/v1/tours/:id
//Not really deleting, just simulating
router.delete('/:id', deleteTour);

module.exports = router;