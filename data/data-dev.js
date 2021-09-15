const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("../models/tourModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then((con) => console.log("DB connection successful"))
  .catch((err) => console.log(err));

// Read JSON
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8"));

// import data into db
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Success");
  } catch (error) {
    console.log(err);
  }
};

// delete all from db
const deleteData = async () => {
  try {
    await Tour.deleteMany();

    console.log("Success")
  } catch (err) {
    console.log(err);
  }
}
