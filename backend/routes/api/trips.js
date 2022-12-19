const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Trip = mongoose.model("Trip");
const { requireUser } = require("../../config/passport");

//TRIP SHOW PAGE
router.get("/:tripId", async function (req, res, next) {
  let trip;
  try {
    trip = await Trip.findById(req.params.tripId);
  } catch (err) {
    const error = new Error("Trip not found");
    error.statusCode = 404;
    error.errors = { message: "No Trip found with that id" };
    return next(error);
  }
  return res.json({ test: trip });
});

//TRIP CREATE
router.post("/", requireUser, async function (req, res, next) {
  const startDateObj = new Date(req.body.startDate);
  const endDateObj = new Date(req.body.endDate);

  try {
    const newTrip = new Trip({
      owner: req.user._id,
      startDate: startDateObj,
      endDate: endDateObj,
      name: req.body.name,
      description: req.body.description,
    });

    let trip = await newTrip.save();
    return res.json(trip);
  } catch (err) {
    next(err);
  }
});

//TRIP EDIT
router.post("/:tripId/edit", requireUser, async function (req, res, next) {
  const startDateObj = new Date(req.body.startDate);
  const endDateObj = new Date(req.body.endDate);

  try {
    const newTrip = new Trip({
      owner: req.user._id,
      startDate: startDateObj,
      endDate: endDateObj,
      name: req.body.name,
      description: req.body.description,
    });

    let trip = await newTrip.save();
    return res.json(trip);
  } catch (err) {
    next(err);
  }
});

//TRIP DELETE

module.exports = router;
