const Tour = require("../models/tourModel");

exports.aliasTopTour = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields = "name,price,ratingsAvarage,summary,difficulty";
  next();
};

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    let data = JSON.stringify(this.queryString);
    data = data.replace(/\b(gt|lt)\b/g, (match) => `$${match}`);
    data = JSON.parse(data);
    this.query = this.query.find(data);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  pagtinate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

exports.getAllTours = async (req, res, next) => {
  try {
    // let data = JSON.stringify(req.query);
    // data = data.replace(/\b(gt|lt)\b/g, (match) => `$${match}`);
    // data = JSON.parse(data);
    // let allTour = Tour.find(data);

    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(",").join(" ");
    //   allTour = allTour.sort(sortBy);
    // } else {
    //   allTour = allTour.sort("-createdAt");
    // }

    // if (req.query.fields) {
    //   const fields = req.query.fields.split(",").join(" ");
    //   allTour = allTour.select(fields);
    // }else {
    //   allTour = allTour.select('-__v');
    // }

    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;

    // allTour = allTour.skip(skip).limit(limit);

    // if(req.query.page){
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error('This page is not exist');
    // }

    const API = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .pagtinate();
    const q = await API.query;

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

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          _id: "$difficulty",
          numTours: { $sum: 1 },
          numRatings: { $sum: "$ratingsQuantity" },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        stats,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Fail",
      message: error,
    });
  }
};
