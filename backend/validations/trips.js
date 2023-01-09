const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateTripInput = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Trip must have a name"),
  check("startDate")
    .exists({ checkFalsy: true })
    .withMessage("Trip must specify start date"),
  check("endDate")
    .exists({ checkFalsy: true })
    .withMessage("Trip must specify end date"),
  handleValidationErrors,
];

module.exports = validateTripInput;
