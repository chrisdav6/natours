const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const signup = catchAsync(async (req, res, next) => {
  //Create new user
  const newUser = await User.create(req.body);

  //Send Response
  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
});

module.exports = {
  signup
}