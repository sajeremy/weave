const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Trip = mongoose.model("Trip");
const { requireUser } = require("../../config/passport");

//TRIP SHOW
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
  return res.json({ trip: trip });
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

//TRIP UPDATE
router.patch("/:tripId", requireUser, async function (req, res, next) {
  // const startDateObj = new Date(req.body.startDate);
  // const endDateObj = new Date(req.body.endDate);

  // let trip = await Trip.findById(req.params.tripId);

  // if (!trip) {
  //   return res.status(400).send("trip not found");
  // } else {
  //   (trip.owner = req.user._id),
  //     (trip.startDate = startDateObj),
  //     (trip.endDate = endDateObj),
  //     (trip.name = req.body.name),
  //     (trip.description = req.body.description);
  //   trip.save();
  //   return res.json(trip);
  // }
  let trip;
  try {
    trip = await Trip.findById(req.params.tripId);

    const startDateObj = new Date(req.body.startDate);
    const endDateObj = new Date(req.body.endDate);

    trip.owner = req.user._id;
    trip.startDate = startDateObj;
    trip.endDate = endDateObj;
    trip.name = req.body.name;
    trip.description = req.body.description;
    trip.save();
  } catch (err) {
    next(err);
  }
  return res.json(trip);
});

//TRIP DELETE
router.delete("/:tripId", requireUser, async function (req, res, next) {
  // let trip = await Trip.findById(req.params.tripId);

  // if (!trip) {
  //   return res.status(400).send("trip not found");
  // } else {
  //   trip.delete();
  //   return res.send("trip has been successfully deleted");
  // }
  try {
    let trip = await Trip.findById(req.params.tripId);
    trip.delete();
    return res.send("trip has been successfully deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
