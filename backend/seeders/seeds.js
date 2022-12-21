const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require("../models/User");
const Trip = require("../models/Trip");
const bcrypt = require("bcryptjs");

// Create users
const users = [];

// Create users
users.push(
  new User({
    firstName: "demo",
    lastName: "user",
    email: "demo@user.io",
    hashedPassword: bcrypt.hashSync("password", 10),
  })
);

// Create trips

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
    insertSeeds();
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = () => {
  console.log("Resetting db and seeding users and trips...");

  User.collection
    .drop()
    .then(() => User.insertMany(users))
    .then(() => {
      console.log("Done!");
      mongoose.disconnect();
    })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });
};
