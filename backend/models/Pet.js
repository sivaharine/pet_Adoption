const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['dog', 'cat', 'bird', 'other']
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
    required: true,
  }],
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'adopted', 'pending'],
    default: 'available'
  },
  healthInfo: {
    vaccinated: Boolean,
    neutered: Boolean,
    microchipped: Boolean
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pet', petSchema); 