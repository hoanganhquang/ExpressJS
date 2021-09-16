const Tour = require("../models/tourModel");

exports.getAllTours = async (req, res, next) => {
  try {
    let data = JSON.stringify(req.query);
    data = data.replace(/\b(gt|lt)\b/g, (match) => `$${match}`);
    data = JSON.parse(data);
    let allTour = Tour.find(data);

    if (req.query.sort){
      allTour = allTour.sort(req.query.sort)
    }

    const q = await allTour;

    res.status(200).json({
      status: "Success",
      data: {
        q,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
    });
  }
};

exports.getTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: "Success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.createTour = async (req, res, next) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(200).json({
      status: "Success",
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "Success",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
    });
  }
};
