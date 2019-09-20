const Tour = require('../models/tourModel');

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Must containe a Name and Price!'
    });
  }

  next();
}

const getAllTours = async (req, res) => {
  const tours = await Tour.find({}).then((foundTours) => {
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

const createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour
    }
  });
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
  checkBody,
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour
}