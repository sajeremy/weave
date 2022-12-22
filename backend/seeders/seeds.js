const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require("../models/User");
const Trip = require("../models/Trip");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

const NUM_SEED_USERS = 10;

// Create users
const users = [];

users.push(
  new User({
    firstName: "Demo",
    lastName: "User",
    email: "demouser@user.io",
    hashedPassword: bcrypt.hashSync("password", 10),
  })
);

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User({
      firstName: firstName,
      lastName: lastName,
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
    })
  );
}

// Create trips
const trips = [];

trips.push(
  new Trip({
    owner: users[0]._id,
    members: [users[1], users[2], users[3], users[4]],
    startDate: "2023-01-17",
    endDate: "2023-01-24",
    name: "Vacation in Puerto Rico",
    locations: [
      {
        title: "Parque de Bombas",
        coordinates: { lat: 18.012, lon: -66.614 },
      },
      {
        title: "La Cueva del Indio",
        coordinates: { lat: 18.493, lon: -66.642 },
      },
      {
        title: "Puente de Piedra",
        coordinates: { lat: 17.934, lon: -67.196 },
      },
    ],
  })
);
trips.push(
  new Trip({
    owner: users[0]._id,
    members: [users[5], users[6], users[7]],
    startDate: "2023-02-06",
    endDate: "2023-02-09",
    name: "Autonomous Vehicles Conference in Detroit",
    locations: [
      {
        title: "Campus Martius Park",
        coordinates: { lat: 42.332, lon: -83.047 },
      },
      {
        title: "Fowling Warehouse Hamtramck",
        coordinates: { lat: 42.393, lon: -83.044 },
      },
      {
        title: "University of Michigan Transportation Research Institute",
        coordinates: { lat: 42.298, lon: -83.703 },
      },
    ],
  })
);
trips.push(
  new Trip({
    owner: users[8]._id,
    members: [users[0], users[2], users[3], users[7]],
    startDate: "2023-03-02",
    endDate: "2023-03-09",
    name: "Atlanta Salsa Bachata Festival",
    locations: [
      {
        title: "Little Five Points",
        coordinates: { lat: 33.764, lon: -84.349 },
      },
      {
        title: "Ponce City Market",
        coordinates: { lat: 33.774, lon: -84.366 },
      },
      {
        title: "Piedmont Park",
        coordinates: { lat: 33.787, lon: -84.376 },
      },
    ],
  })
);

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
    .then(() => Trip.collection.drop())
    .then(() => User.insertMany(users))
    .then(() => Trip.insertMany(trips))
    .then(() => {
      console.log("Done!");
      mongoose.disconnect();
    })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });
};
