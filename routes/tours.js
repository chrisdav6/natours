const express = require('express');
const router = express.Router();
const { getTourStats, aliasTopTours, getAllTours, getTour, createTour, updateTour, deleteTour } = require('../controllers/tours');

//GET - /api/v1/tours/stats
router.get('/tour-stats', getTourStats);

//GET - /api/v1/tours?limit=5&sort=-ratingsAverage,price
router.get('/top-5-cheap', aliasTopTours, getAllTours);

//GET - /api/v1/tours
router.get('/', getAllTours);

//GET - /api/v1/tours/:id
router.get('/:id', getTour);

//POST - /api/v1/tours
router.post('/', createTour);

//PATCH - /api/v1/tours/:id
//Not really updating, just simulating
router.patch('/:id', updateTour);

//DELETE - /api/v1/tours/:id
//Not really deleting, just simulating
router.delete('/:id', deleteTour);

module.exports = router;