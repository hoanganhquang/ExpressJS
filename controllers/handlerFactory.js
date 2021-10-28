import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import APIFeatures from "../utils/apiFeatures.js";

export function getAll(Model) {
  return catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const API = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagtinate();
    const data = await API.query;

    res.status(200).json({
      status: "Success",
      length: data.length,
      data: {
        data,
      },
    });
  });
}

export function deleteOne(Model) {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("Invalid info", 404));
    }

    res.status(200).json({
      status: "success",
      data: null,
    });
  });
}

export function updateOne(Model) {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("Invalid info", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
}

export function createOne(Model) {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });
}

export function getOne(Model, popOptions) {
  return catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError("Not a doc ID", 404));
    }

    res.status(200).json({
      status: "Success",
      data: {
        doc,
      },
    });
  });
}
