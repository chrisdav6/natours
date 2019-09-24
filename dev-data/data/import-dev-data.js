const fs = require('fs');
require('dotenv').config({ path: '../../config.env' });
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');

//Connect to DB
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DBPASSWORD);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => console.log('Connected to DB'));

//Read JSON File
const tours = JSON.parse(fs.readFileSync('./tours-simple.json', 'utf-8'));

//Import data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data sucessfully loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
}

//Delete all existing Data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data sucessfully deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
}

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}


