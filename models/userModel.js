const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm password!'],
    validate: {
      validator: function (el) {
        // This will only work with NEW user creation .create() and .save() - will not work with UPDATE
        return el === this.password;
      },
      message: `Passwords do not match!`
    }
  },
  passwordChangedAt: {
    type: Date
  }
});

//Encrypt the password
userSchema.pre('save', async function (next) {
  //Only run this function if password is modified
  if (!this.isModified('password')) return next;

  //Hash the password
  this.password = await bcrypt.hash(this.password, 12);

  //Delete the passwordConfirm field
  this.passwordConfirm = undefined;
  next()
});

//Validate Password on SignIn
userSchema.methods.correctPassword = async function (submittedPassword, userPassword) {
  return await bcrypt.compare(submittedPassword, userPassword);
}

//Validate token after password change
userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }

  //False means password not changed
  return false;
}

//Model
const User = mongoose.model('User', userSchema);

module.exports = User;