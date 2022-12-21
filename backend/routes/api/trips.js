const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Trip = mongoose.model("Trip");
const { requireUser } = require("../../config/passport");

//TRIP INDEX
router.get("/", async function (req, res, next) {
  let trips;
  try {
    trips = await Trip.find();
  } catch (err) {
    const error = new Error("Trip not found");
    error.statusCode = 404;
    error.errors = { message: "No Trip found with that id" };
    return next(error);
  }
  return res.json({ trips: trips });
});

//USER TRIP INDEX
router.get("/users/:userId", async function (req, res, next) {
  let trips;
  try {
    trips = await Trip.find();
  } catch (err) {
    const error = new Error("Trip not found");
    error.statusCode = 404;
    error.errors = { message: "No Trip found with that id" };
    return next(error);
  }
  return res.json({ trips: trips });
});

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
  const startDateObj = new Date(req.body.trip.startDate);
  const endDateObj = new Date(req.body.trip.endDate);
  try {
    const newTrip = new Trip({
      owner: req.user._id,
      startDate: startDateObj,
      endDate: endDateObj,
      startDate: req.body.trip.startDate,
      endDate: req.body.trip.endDate,
      name: req.body.trip.name,
      description: req.body.trip.description,
    });

    let trip = await newTrip.save();
    return res.json(trip);
  } catch (err) {
    next(err);
  }
});

//TRIP INVITE
router.post("/:tripId/invite", requireUser, async function (req, res, next) {
  try {
    const email = req.body.email;
    const user = await User.findOne({
      $or: [{ email: req.body.email }],
    });
  } catch (err) {
    next(err);
  }
});

//TRIP UPDATE
router.patch("/:tripId", requireUser, async function (req, res, next) {
  let trip;
  try {
    trip = await Trip.findById(req.params.tripId);

    const startDateObj = new Date(req.body.trip.startDate);
    const endDateObj = new Date(req.body.trip.endDate);

    trip.owner = req.user._id;
    trip.startDate = startDateObj;
    trip.endDate = endDateObj;
    trip.name = req.body.trip.name;
    trip.description = req.body.trip.description;
    trip.save();
  } catch (err) {
    next(err);
  }
  return res.json(trip);
});

//TRIP DELETE
router.delete("/:tripId", requireUser, async function (req, res, next) {
  try {
    let trip = await Trip.findById(req.params.tripId);
    trip.delete();
    return res.send("trip has been successfully deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
