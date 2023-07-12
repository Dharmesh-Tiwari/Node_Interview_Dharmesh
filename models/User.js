const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  userStatus: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
