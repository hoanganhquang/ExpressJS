const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema({
  name: {type: String, default: ''},
  description: String,
  slug: String
});

Course.plugin(mongooseDelete, {
  overrideMethods: 'all',
  deletedAt: true
});

module.exports = mongoose.model('Course', Course);