const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
    min: 3,
    max: 25,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
