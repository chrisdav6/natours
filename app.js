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
if (process.env.NODE_ENV === "development") {
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

module.exports = app;