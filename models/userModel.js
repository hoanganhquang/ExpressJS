const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("../node_modules/validator/validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Require a name"],
    trim: true,
    maxlength: 20,
    minlength: 3,
  },
  email: {
    tpye: String,
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Must have password"],
    trim: true,
    minlength: 6,
  },
  passwordConfirm: {
    type: String,
    required: true,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
