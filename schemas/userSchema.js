const mongoose = require("mongoose");
const validator = require("validator/validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Require a name"],
    trim: true,
    maxlength: 20,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "Need an email"],
    trim: true,
    unique: true,
    validate: [validator.isEmail, "Provide a valid email"],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "guide", "lead-guide", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Must have password"],
    trim: true,
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Need same as password",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

module.exports = userSchema;
