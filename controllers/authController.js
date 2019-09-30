const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const signup = catchAsync(async (req, res, next) => {
  //Create new user
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  //Log new user in
  const token = jwt.sign({ id: newUser._id }, process.env.JWTSECRET,
    { expiresIn: process.env.JWTEXPIRESIN }
  );

  //Send Response
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

module.exports = {
  signup
}