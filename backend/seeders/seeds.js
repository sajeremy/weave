const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require("../models/User");
const Trip = require("../models/Trip");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

const NUM_SEED_USERS = 10;
const NUM_SEED_TRIPS = 5;

// Create users
const users = [];

// Create users
users.push(
  new User({
    firstName: "Demo",
    lastName: "User",
    email: "demo@user.io",
    hashedPassword: bcrypt.hashSync("password", 10),
  })
);

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User({
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
    })
  );
}

// Create trips
const trips = [];

for (let i = 1; i < NUM_SEED_TRIPS; i++) {
  trips.push(
    new Trip({
      owner: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      members: [users[1], users[2], users[3], users[4]],
      startDate: "2023-01-17",
      endDate: "2023-01-24",
      name: "Vacation to Puerto Rico",
      locations: [
        { title: "app academy", coordinates: { lat: -40.01, lon: 32 } },
      ],
    })
  );
}

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
