exports.checkID = (req, res, next, val) => {
  if (val == 10) {
    return res.status(404).json({
      mess: "invalid ID",
    });
  }
  next();
};

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

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      mess: "invalid data",
    });
  }
  next();
};

exports.createTour = (req, res, next) => {
  res.status(200).json({
    data: "Create Tour",
  });
};
