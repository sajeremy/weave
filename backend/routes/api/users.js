const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");
// const Trip = mongoose.model("Trip"); //Adding Trip Index for User
const passport = require("passport");
const { loginUser, restoreUser } = require("../../config/passport");
const { isProduction } = require("../../config/keys");

/* GET users listing. */
router.get("/current", restoreUser, (req, res) => {
  if (!isProduction) {
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    email: req.user.email,
  });
});

// POST /api/users/register
router.post("/register", async (req, res, next) => {
  // Check to make sure no one has already registered with the proposed email or
  // username.
  const user = await User.findOne({
    $or: [{ email: req.body.email }],
  });

  if (user) {
    // Throw a 400 error if the email address and/or email already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    err.errors = errors;
    return next(err);
  }

  // Otherwise create a new user
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      } catch (err) {
        next(err);
      }
    });
  });
});

router.post("/login", async (req, res, next) => {
  passport.authenticate("local", async function (err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error("Invalid credentials");
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

//-----------------------------------------------------------------------//
//Changes for linking Users to Trips

//USER SHOW PAGE
router.get("/:userId", async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId);
  } catch (err) {
    const error = new Error("User not found");
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  return res.json({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    availableDates: user.availableDates,
    trips: user.trips,
  });
});

//USER TRIP CREATE
// router.post("/:userId/trips", requireUser, async (req, res, next) => {
//   try {
//     const newTrip = new Trip({
//       owner: req.params.userId,
//     });

//     let trip = await newTrip.save();
//     trip = await trip.populate("author", "_id, username");
//     return res.json(tweet);
//   } catch (err) {
//     next(err);
//   }
// });
module.exports = router;
