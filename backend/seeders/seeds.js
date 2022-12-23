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

users.push(
  new User({
    firstName: "Jeremy",
    lastName: "Demo",
    email: "9jsantiago4@gmail.com",
    hashedPassword: bcrypt.hashSync("password", 10),
  })
);
users.push(
  new User({
    firstName: "Bonnie",
    lastName: "Demo",
    email: "bonnieli51@gmail.com",
    hashedPassword: bcrypt.hashSync("password", 10),
  })
);
users.push(
  new User({
    firstName: "Gleb",
    lastName: "Demo",
    email: "gmirzayev@gmail.com",
    hashedPassword: bcrypt.hashSync("password", 10),
  })
);

// Create trips
const trips = [];

trips.push(
  new Trip({
    owner: users[0]._id,
    members: [users[0], users[1], users[2], users[3], users[4]],
    startDate: "2023-01-17",
    endDate: "2023-01-24",
    name: "Vacation in Puerto Rico",
    locations: [
      {
        coordinates: { lat: 18.012, lng: -66.614 },
        hours: [
          "Monday: 9:30 AM - 5:00 PM",
          "Tuesday: 9:30 AM - 5:00 PM",
          "Wednesday: 9:30 AM - 5:00 PM",
          "Thursday: 9:30 AM - 5:00 PM",
          "Friday: 9:30 AM - 5:00 PM",
          "Saturday: 9:30 AM - 5:00 PM",
          "Sunday: 9:30 AM - 5:00 PM",
        ],
        photo:
          "https://lh3.googleusercontent.com/places/AJDFj43istbo2o2rmXZZpH-484pw7PODn_zKOHvuHam2u4TJSaYKPa-E1atLC1wKXOKjfzLO1n1tk6U0_MXvlOk-UUcGnw5CXUvTjfI=s1600-w3000",
        rating: 4.7,
        title: "Parque de Bombas",
        website: "",
        address: "296P+QG6 Plaza Las Delicias, Ponce, 00731, Puerto Rico",
      },
      {
        coordinates: { lat: 18.493, lng: -66.642 },
        hours: [
          "Monday: 9:30 AM - 5:00 PM",
          "Tuesday: 9:30 AM - 5:00 PM",
          "Wednesday: 9:30 AM - 5:00 PM",
          "Thursday: 9:30 AM - 5:00 PM",
          "Friday: 9:30 AM - 5:00 PM",
          "Saturday: 9:30 AM - 5:00 PM",
          "Sunday: 9:30 AM - 5:00 PM",
        ],
        photo:
          "https://lh3.googleusercontent.com/places/AJDFj42cAOWuCm5s6pF0wZNmNTPpupXvLK4LU-_aENW5eJoXmOIcq6-yP_oAktOtgFrs5_bxGAs9xzoDATrddGfuRtOkihfEKqGWAK4=s1600-w12000",
        rating: 4.6,
        title: "Reserva Marina La Cueva del Indio",
        website:
          "https://www.discoverpuertorico.com/profile/cueva-del-indio-arecibo/8721",
        address: "",
      },
      {
        coordinates: { lat: 17.934, lng: -67.196 },
        hours: [
          "Monday: 9:30 AM - 5:00 PM",
          "Tuesday: 9:30 AM - 5:00 PM",
          "Wednesday: 9:30 AM - 5:00 PM",
          "Thursday: 9:30 AM - 5:00 PM",
          "Friday: 9:30 AM - 5:00 PM",
          "Saturday: 9:30 AM - 5:00 PM",
          "Sunday: 9:30 AM - 5:00 PM",
        ],
        photo:
          "https://lh3.googleusercontent.com/places/AJDFj40_rxMBjFmgXyB3HcS4IT3fCgfqKY7LP8tEW6u1ryrtY_csNTJyvYhic7buRuwVqkl97O_eQOr_D7a4l0abVZt1RlBQBhkevpI=s1600-w4128",
        rating: 4.5,
        title: "Puente de Piedra",
        website: "",
        address: "WRM3+GPX, Cabo Rojo, Puerto Rico",
      },
    ],
  })
);
trips.push(
  new Trip({
    owner: users[0]._id,
    members: [users[0], users[5], users[6], users[7]],
    startDate: "2023-02-06",
    endDate: "2023-02-09",
    name: "Autonomous Vehicles Conference in Detroit",
    locations: [
      {
        coordinates: { lat: 42.332, lng: -83.047 },
        hours: [
          "Monday: 9:30 AM - 5:00 PM",
          "Tuesday: 9:30 AM - 5:00 PM",
          "Wednesday: 9:30 AM - 5:00 PM",
          "Thursday: 9:30 AM - 5:00 PM",
          "Friday: 9:30 AM - 5:00 PM",
          "Saturday: 9:30 AM - 5:00 PM",
          "Sunday: 9:30 AM - 5:00 PM",
        ],
        photo:
          "https://lh3.googleusercontent.com/places/AJDFj41RQeWOfs8Qw5_2BKrXkE1hu3mBdS8r0o_i4SvJeu7XRD5q8nYPxDeYfJuD9V0w3KHzNMRNe4ncqsra0McRk-9hWVaCy_OucS4=s1600-w880",
        rating: 4.7,
        title: "Campus Martius Park",
        website: "https://downtowndetroitparks.com/parks/campus-martius/",
        address: "",
      },
      {
        coordinates: { lat: 42.393, lng: -83.044 },
        hours: [
          "Monday: Closed",
          "Tuesday: 5:00 - 11:00 PM",
          "Wednesday: 5:00 - 11:00 PM",
          "Thursday: 5:00 - 11:00 PM",
          "Friday: 5:00 PM - 12:00 AM",
          "Saturday: 2:00 PM - 12:00 AM",
          "Sunday: 12:00 - 6:00 PM",
        ],
        photo:
          "https://lh3.googleusercontent.com/places/AJDFj41c2FOTrGmKss0MhEwIqXvLYnmVR5Z-J6f3HmN6x5uGSNVTm8qqxokH2X6tx7UbSWxXkkupU12Vb-qG8cns84EH0heyzKlnz8A=s1600-w7639",
        rating: 4.6,
        title: "Fowling Warehouse Hamtramck",
        website: "https://fowlingwarehouse.com/hamtramck",
        address: "",
      },
      {
        coordinates: { lat: 42.298, lng: -83.703 },
        hours: [
          "Monday: 9:30 AM - 5:00 PM",
          "Tuesday: 9:30 AM - 5:00 PM",
          "Wednesday: 9:30 AM - 5:00 PM",
          "Thursday: 9:30 AM - 5:00 PM",
          "Friday: 9:30 AM - 5:00 PM",
          "Saturday: 9:30 AM - 5:00 PM",
          "Sunday: 9:30 AM - 5:00 PM",
        ],
        photo:
          "https://lh3.googleusercontent.com/places/AJDFj409FJE-tIzDOhemky7RTC42mZjjE_F0GfF9VwH8PfuD7c3OeYtghleYwFEnEESaRqj9ICoj9uJx7kl82bW_mnlO-kSDsJs9EEY=s1600-w4032",
        rating: 3.8,
        title: "University of Michigan Transportation Research Institute",
        website: "http://www.umtri.umich.edu/",
        address: "",
      },
    ],
  })
);
trips.push(
  new Trip({
    owner: users[0]._id,
    members: [users[0], users[2], users[3], users[7], users[8]],
    startDate: "2023-04-02",
    endDate: "2023-04-09",
    name: "Trip to NY",
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
