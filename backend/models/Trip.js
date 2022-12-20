const mongoose = require("mongoose");
const UserSchema = require("./User").schema;
const PlaceSchema = require("./Place").schema;
const Schema = mongoose.Schema;

const tripSchema = Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: String,
    locations: [PlaceSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", tripSchema);
