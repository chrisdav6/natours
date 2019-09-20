const Tour = require('../models/tourModel');

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
}

const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
}

const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!'
    });
  }
}

const updateTour = (req, res) => {
  //Get Tour
  const tour = tours.find(el => el.id == req.params.id);

  res.status(200).json({
    status: 'success',
    updated: true,
    data: {
      tour
    }
  })
}

const deleteTour = (req, res) => {
  //Get Tour
  const tour = tours.find(el => el.id == req.params.id);

  res.status(200).json({
    status: 'success',
    deleted: true,
    data: {
      tour
    }
  })
}

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour
}