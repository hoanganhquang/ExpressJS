const mongoose = require("mongoose");
const { schema } = require("./tourModel");

const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.tours.populate({
    path: "tours",
  });

  this.users.populate({
    path: "users",
  });
});

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
