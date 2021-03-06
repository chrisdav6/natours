require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');

//Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION - Shutting Down!');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');
const port = process.env.port || 3000;

//Connect to DB
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DBPASSWORD);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => console.log('Connected to DB'));

//Start Server
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//Handle Promise Rejection - Shut down application
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION - Shutting Down!');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});