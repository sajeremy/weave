const mongoose = require("mongoose");
const TripSchema = require("./Trip").schema;
const Schema = mongoose.Schema;

const userSchema = Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    availableDates: [Date],
    trips: Array,
    invitedTrips: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
