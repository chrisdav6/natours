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
app.use(morgan('dev'));

//BodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Custom Middleware
const myMiddle = (req, res, next) => {
  console.log('Hello from middleware!');
  next();
}
app.use(myMiddle);

const dateMiddle = (req, res, next) => {
  const date = new Date();
  console.log(date);
  next();
}
app.use(dateMiddle);

const singleMiddle = (req, res, next) => {
  console.log('Single Middle!');
  next();
}

////////////////////////////
///////----Routes----//////
///////////////////////////

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;