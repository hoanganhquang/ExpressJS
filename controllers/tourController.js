const Tour = require("../models/tourModel");

exports.getAllTours = async (req, res, next) => {
  try {
    const allTour = await Tour.find();

    res.status(200).json({
      status: "Success",
      data: {
        allTour,
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

exports.deleteTour = async (req, res)=>{
  try {
    await Tour.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: "Success"
    })
  } catch (error) {
    res.status(400).json({
      status: "Fail"
    })
  }
}