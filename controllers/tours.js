const Tour = require('../models/tourModel');

const getAllTours = async (req, res) => {
  await Tour.find({}).then((foundTours) => {
    res.status(200).json({
      status: 'success',
      results: foundTours.length,
      data: {
        foundTours
      }
    });
  });
}

const getTour = (req, res) => {
  //Get Tour
  const tour = tours.find(el => el.id == req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
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