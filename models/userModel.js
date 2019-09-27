const mongoose = require('mongoose');
const validator = require('validator');

//Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name!'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email!']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'A user must have a password!'],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm password!']
  }
});

//Model
const User = mongoose.model('User', userSchema);

module.exports = User;