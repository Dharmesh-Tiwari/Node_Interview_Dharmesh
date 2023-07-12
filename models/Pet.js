const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const CategorySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const PetSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  category: {
    type: CategorySchema,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  photoUrls: {
    type: [String],
    required: true,
  },
  tags: {
    type: [TagSchema],
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'pending', 'sold'],
    required: true,
  },
});

const Pet = mongoose.model('Pet', PetSchema);

module.exports = Pet;
