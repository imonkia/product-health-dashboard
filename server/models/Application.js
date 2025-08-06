const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  order: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  linkName: {
    type: String,
    required: true
  },
  linkUrl: {
    type: String,
    required: true
  }
});

const applicationSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  groupName: {
    type: String,
    required: true
  },
  gatehouseCheckin: {
    type: Boolean,
    default: false
  },
  gatehouseCheckinDate: {
    type: String,
    required: true
  },
  links: [linkSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Application', applicationSchema); 