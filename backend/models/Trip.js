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
    // members: [UserSchema],
    locations: [PlaceSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", tripSchema);
