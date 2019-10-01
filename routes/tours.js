const express = require('express');
const router = express.Router();
const { getMonthlyPlan, getTourStats, aliasTopTours, getAllTours, getTour, createTour, updateTour, deleteTour } = require('../controllers/tours');
const { protect, restrictTo } = require('../controllers/authController');

//GET - /api/v1/tours/stats
router.get('/monthly-plan/:year', getMonthlyPlan);

//GET - /api/v1/tours/stats
router.get('/tour-stats', getTourStats);

//GET - /api/v1/tours?limit=5&sort=-ratingsAverage,price
router.get('/top-5-cheap', aliasTopTours, getAllTours);

//GET - /api/v1/tours
router.get('/', protect, getAllTours);

//GET - /api/v1/tours/:id
router.get('/:id', getTour);

//POST - /api/v1/tours
router.post('/', createTour);

//PATCH - /api/v1/tours/:id
//Not really updating, just simulating
router.patch('/:id', updateTour);

//DELETE - /api/v1/tours/:id
//Not really deleting, just simulating
router.delete('/:id', protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;