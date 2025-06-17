const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: errors.array()
      // Optionally, for custom shape:
      // errors: errors.mapped()
      // or map to array: errors.array().map(err => ({ field: err.param, message: err.msg }))
    });
  }
  next();
};
