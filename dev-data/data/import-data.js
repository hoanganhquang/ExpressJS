const fs = require("fs");

const Tour = require("../../models/tourModel");
const Review = require("../../models/reviewModel");

const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then((con) => console.log("DB connection successful"))
  .catch((err) => console.log(err));

const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
);

const importData = async () => {
  try {
    await Review.create(reviews);
    console.log("data imported");
  } catch (error) {
    console.log("Import fail");
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Review.deleteMany();
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
