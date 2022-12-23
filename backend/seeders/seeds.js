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
        photo: "https://maps.google.com/maps/contrib/105988571914224840772",
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
        photo: "https://maps.google.com/maps/contrib/110915644480179389748",
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
        photo: "https://maps.google.com/maps/contrib/112788636437282198896",
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
        photo: "https://maps.google.com/maps/contrib/106338701735648905646",
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
        photo: "https://maps.google.com/maps/contrib/1054…869014169318270",
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
        photo: "https://maps.google.com/maps/contrib/102378542986728774417",
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
    owner: users[8]._id,
    members: [users[0], users[2], users[3], users[7], users[8]],
    startDate: "2023-03-02",
    endDate: "2023-03-09",
    name: "Atlanta Salsa Bachata Festival",
    locations: [
      {
        coordinates: { lat: 33.764, lng: -84.349 },
        hours: [
          "Monday: 9:30 AM - 5:00 PM",
          "Tuesday: 9:30 AM - 5:00 PM",
          "Wednesday: 9:30 AM - 5:00 PM",
          "Thursday: 9:30 AM - 5:00 PM",
          "Friday: 9:30 AM - 5:00 PM",
          "Saturday: 9:30 AM - 5:00 PM",
          "Sunday: 9:30 AM - 5:00 PM",
        ],
        photo: "https://maps.google.com/maps/contrib/117847082933568165218",
        rating: 3.8,
        title: "Little Five Points",
        website: "",
        address: "",
      },
      // {
      //   title: "Ponce City Market",
      //   coordinates: { lat: 33.774, lng: -84.366 },
      // },
      // {
      //   title: "Piedmont Park",
      //   coordinates: { lat: 33.787, lng: -84.376 },
      // },
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
