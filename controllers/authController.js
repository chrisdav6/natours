const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET,
    { expiresIn: process.env.JWTEXPIRESIN }
  );
};

const signup = catchAsync(async (req, res, next) => {
  //Create new user
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt
  });

  //Log new user in
  const token = signToken(newUser._id);

  //Send Response
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  //2) Check if user exist && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password!', 401));
  }

  //3) If all okay, send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token
  });
});

const protect = catchAsync(async (req, res, next) => {
  let token;

  //1) Check if token exists
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in!', 401));
  }

  //2) Verify token is valid and not tampered with
  const decoded = await promisify(jwt.verify)(token, process.env.JWTSECRET);

  //3) Check if user still exists
  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return next(new AppError('The user belonging to this token no longer exists!', 401));
  }

  //4) Check if user changed password after the token was issued
  if (await freshUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please log in again!', 401));
  };

  //Grant access to Protected routes
  req.user = freshUser;
  next();
});

module.exports = {
  protect,
  signup,
  login
}