const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Trip = mongoose.model("Trip");
const { requireUser } = require("../../config/passport");
const sendEmail = require("../../Email");
const validateTripInput = require("../../validations/trips");

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
  let ownerTrips;
  let memberTrips = [];

  try {
    trips = await Trip.find();
    ownerTrips = trips.filter((trip) => {
      return trip.owner == req.params.userId;
    });

    trips.forEach((trip) => {
      let tripMember = false;
      trip.members.forEach((member) => {
        if (member._id == req.params.userId) {
          tripMember = true;
        }
      });
      if (tripMember) {
        memberTrips.push(trip);
      }
    });
  } catch (err) {
    const error = new Error("Trip not found");
    error.statusCode = 404;
    error.errors = { message: "No Trip found with that id" };
    return next(error);
  }
  // return res.json({ trips: ownerTrips });
  return res.json({ trips: memberTrips });
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

// //TRIP CREATE
// router.post("/", requireUser, async function (req, res, next) {
//   try {
//     const startDateObj = new Date(req.body.trip.startDate);
//     const endDateObj = new Date(req.body.trip.endDate);

//     const newTrip = new Trip({
//       owner: req.user._id,
//       members: req.user,
//       startDate: startDateObj,
//       endDate: endDateObj,
//       name: req.body.trip.name,
//     });

//     let trip = await newTrip.save();
//     return res.json(trip);
//   } catch (err) {
//     next(err);
//   }
// });

//TRIP CREATE - V2 w/ error handling
router.post("/", requireUser, async function (req, res, next) {
  const startDateObj = new Date(req.body.trip.startDate);
  const endDateObj = new Date(req.body.trip.endDate);

  if (startDateObj.getTime() >= endDateObj.getTime()) {
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    errors.dates = "Start date and time must occur before end date and time";
    err.errors = errors;
    return next(err);
  }

  const tripName = req.body.trip.name;
  const charArr = tripName.split(" ");

  if (charArr.every((char) => char === "")) {
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    errors.name = "Trip name cannot be blank";
    err.errors = errors;
    return next(err);
  }

  const newCharArr = tripName.split("").filter((char) => char !== " ");

  if (newCharArr.length < 3) {
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    errors.name = "Trip name must be at least 3 characters";
    err.errors = errors;
    return next(err);
  }

  const newTrip = new Trip({
    owner: req.user._id,
    members: req.user,
    startDate: startDateObj,
    endDate: endDateObj,
    name: req.body.trip.name,
  });
  let trip = await newTrip.save();
  return res.json(trip);
});

//TRIP INVITE MULTIPLE MEMBERS
router.post("/:tripId/invite", requireUser, async function (req, res, next) {
  let users = req.body.members;
  let weaveUsers = [];
  let newTripMembers = [];
  let checkUser;
  let trip = await Trip.findById(req.params.tripId);
  let tripOwner = await User.findById(trip.owner);
  let tripMemberEmails = [];
  let tripInvitedUserEmails = [];

  //Filter emails that are not Weave Users
  for (let i = 0; i < users.length; i++) {
    checkUser = await User.findOne({
      $or: [{ email: req.body.members[i] }],
    });
    // console.log(checkUser);
    if (checkUser) {
      weaveUsers.push(checkUser);
    } else {
      const err = new Error("Validation Error");
      err.statusCode = 400;
      const errors = {};
      errors.email = "The email you entered is not a registered Weave User";
      err.errors = errors;
      return next(err);
    }
  }
  //Accumulate array of emails in Trip
  for (let i = 0; i < trip.members.length; i++) {
    tripMemberEmails.push(trip.members[i].email);
  }
  //Accumulate array of emails of invited users in Trip
  for (let i = 0; i < trip.invitedUsers.length; i++) {
    tripInvitedUserEmails.push(trip.invitedUsers[i].email);
  }
  //Filter Weave Users that are not in members or invited to Trip
  for (let i = 0; i < weaveUsers.length; i++) {
    let user = weaveUsers[i];
    if (
      !tripMemberEmails.includes(user.email) &&
      !tripInvitedUserEmails.includes(user.email)
    ) {
      newTripMembers.push(user);
    } else {
      // console.log("it hit here line 184");
      const err = new Error("Validation Error");
      err.statusCode = 400;
      const errors = {};
      errors.email = "This email had already been invited";
      err.errors = errors;
      return next(err);
    }
  }

  //Send Email, update Trip, & User for each User
  let tripDetails;
  newTripMembers.forEach((newMember) => {
    //Compile member and trip details for email
    tripDetails = {
      newMemberId: newMember._id,
      newMemberEmail: newMember.email,
      newMemberFirstName: newMember.firstName,
      ownerName: tripOwner.firstName,
      tripName: trip.name,
      tripId: trip._id,
    };

    //Send Email to new trip members & update invite arrays in User & Trip
    sendEmail(tripDetails);
    // newMember.invitedTrips.push(trip._id);
    // newMember.save();
    trip.invitedUsers.push(newMember);
    trip.save();
  });

  return res.json(`${newTripMembers.length} email invitations have sent`);
});

//TRIP INVITE MEMBER
// router.post("/:tripId/invite", requireUser, async function (req, res, next) {
//   let user;
//   let userInfo = {};
//   let trip;
//   try {
//     trip = await Trip.findById(req.params.tripId);
//     const email = req.body.email;
//     invitedUser = await User.findOne({
//       $or: [{ email: req.body.email }],
//     });
//     userInfo._id = invitedUser._id;
//     userInfo.firstName = invitedUser.firstName;
//     userInfo.lastName = invitedUser.lastName;
//     userInfo.email = invitedUser.email;
//     userInfo.trips = invitedUser.trips;
//     userInfo.owner = req.user.firstName;
//     userInfo.tripName = trip.name;
//     userInfo.tripId = trip._id;
//     userInfo.tripInfo = trip;
//   } catch (err) {
//     next(err);
//   }
//   const tripDetails = {
//     invitedUserId: userInfo._id,
//     invitedUserEmail: userInfo.email,
//     invitedUserName: userInfo.firstName,
//     ownerName: userInfo.owner,
//     tripName: userInfo.tripId,
//     tripId: userInfo.tripInfo._id,
//   };
//   sendEmail(tripDetails);
//   return res.json(userInfo);
// });

//TRIP UPDATE
router.patch("/:tripId", requireUser, async function (req, res, next) {
  let trip;

  const tripName = req.body.name;
  const charArr = tripName.split(" ");

  if (charArr.every((char) => char === "")) {
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    errors.name = "Trip name cannot be blank";
    err.errors = errors;
    return next(err);
  }

  const newCharArr = tripName.split("").filter((char) => char !== " ");

  if (newCharArr.length < 3) {
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    errors.name = "Trip name must be at least 3 characters";
    err.errors = errors;
    return next(err);
  }

  try {
    trip = await Trip.findById(req.params.tripId);

    const startDateObj = new Date(req.body.startDate);
    const endDateObj = new Date(req.body.endDate);

    trip.startDate = startDateObj;
    trip.endDate = endDateObj;
    trip.name = req.body.name;
    trip.locations = req.body.locations;
    trip.members = req.body.members;
    //Prevent Backend error during creating a trip
    if (req.body.invitedUsers) trip.invitedUsers = req.body.invitedUsers;
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
