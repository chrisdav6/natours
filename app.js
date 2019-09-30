const path = require('path');
const express = require('express');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
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

//Custom Middleware
// app.use((req, res, next) => {
//   console.log(req.headers);
//   next();
// });

////////////////////////////
///////----Routes----//////
///////////////////////////

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {

  // const err = new Error('Test Error');
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError('Cant find URL', 404));
});

//Error Handling
app.use(globalErrorHandler);

module.exports = app;