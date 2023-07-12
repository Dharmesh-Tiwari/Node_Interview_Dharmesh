const mongoose = require('mongoose');

const ApiResponseSchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const ApiResponse = mongoose.model('ApiResponse', ApiResponseSchema);

module.exports = ApiResponse;
