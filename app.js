const path = require('path');
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tours');
const userRouter = require('./routes/users');
const app = express();

//Serve Static Folders
app.use(express.static(path.join(__dirname, 'public')));

////////////////////////////
/////----Middleware----////
///////////////////////////

//Morgan Logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//BodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

////////////////////////////
///////----Routes----//////
///////////////////////////

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl}`
  // });
  // next();
  const err = new Error('Test Error');
  err.status = 'fail';
  err.statusCode = 404;

  next(err);
});

//Error Handling
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
});

module.exports = app;