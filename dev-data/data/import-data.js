const fs = require("fs");

const Tour = require("../../models/tourModel");
const Review = require("../../models/reviewModel");
const User = require("../../models/userModel");

const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then((con) => console.log("DB connection successful"))
  .catch((err) => console.log(err));

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, "utf-8"));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
);

const importData = async () => {
  try {
    // await User.create(users);
    // await Review.create(reviews);
    await Tour.create(tours);
    console.log("data imported");
  } catch (error) {
    console.log("Import fail");
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log("deleted");
  } catch (error) {
    console.log("delete fail");
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
