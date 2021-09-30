const mongoose = require("mongoose");
const validator = require("../node_modules/validator/validator");
const bcrypt = require("bcrypt");

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
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
