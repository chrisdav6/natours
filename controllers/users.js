const fs = require('fs');
const users = JSON.parse(fs.readFileSync(`./dev-data/data/users.json`));

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
}

const getUser = (req, res) => {
  //Get ID
  const userId = req.params.id;
  //Get Tour
  const user = users.find(el => el._id == userId);

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'No user found with that ID!'
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
}

const createUser = (req, res) => {
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

const updateUser = (req, res) => {
  //Get ID
  const userId = req.params.id;
  //Get Tour
  const user = users.find(el => el._id == userId);

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      updated: false,
      message: 'No user found with that ID!'
    })
  }

  res.status(200).json({
    status: 'success',
    updated: true,
    data: {
      user
    }
  })
}

const deleteUser = (req, res) => {
  //Get ID
  const userId = req.params.id;
  //Get Tour
  const user = users.find(el => el._id == userId);

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      deleted: false,
      message: 'No user found with that ID!'
    })
  }

  res.status(200).json({
    status: 'success',
    deleted: true,
    data: {
      user
    }
  })
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}
