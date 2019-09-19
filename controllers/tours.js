const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`./dev-data/data/tours-simple.json`));

const checkId = (req, res, next, val) => {
  console.log(`The id is: ${req.params.id}`);

  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'No tour found with that ID!'
    });
  }

  next();
}

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Must containe a Name and Price!'
    });
  }

  next();
}

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
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
  //Create ID
  const newId = tours[tours.length - 1].id + 1;
  //Create new Tour
  const newTour = Object.assign({ id: newId }, req.body);
  //Add new tour to tours array
  tours.push(newTour);
  //Save into file
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
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
  checkId,
  checkBody,
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour
}