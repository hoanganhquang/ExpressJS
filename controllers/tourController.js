const Tour = require("../models/tourModel");

exports.getAllTours = (req, res, next) => {
  res.status(200).json({
    data: "dataTour",
  });
};

exports.getTour = (req, res, next) => {
  res.status(200).json({
    data: "Tour1",
  });
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
