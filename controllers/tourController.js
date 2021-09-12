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
