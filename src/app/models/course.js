const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
  name: {type: String, default: ''},
  description: String,
  slug: String
});


module.exports = mongoose.model('Course', Course);