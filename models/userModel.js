const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = required("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Require a name"],
    trim: true,
    maxlength: 20,
    minlength: 3,
  },
  email: {
    tpye: String,
    required: [true, "Need your email"],
    unique: true,
    trim: true,
    validate: [validator.isEmail, "Provide a valid email"],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Must have password"],
    trim: true,
    minlength: 6,
    lowercase: true,
  },
  passwordConfirm: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        return value == this.password;
      },
      message: "passwordConfirm must same as password",
    },
  },
});

const User = mongoose.Model("User", userSchema);

module.exports = User;
