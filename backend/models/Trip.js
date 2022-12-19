const mongoose = require("mongoose");
const UserSchema = require("./User").schema;
const LocationSchema = require("./Location").schema;
const Schema = mongoose.Schema;

const tripSchema = Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [UserSchema],
    locations: [LocationSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", tripSchema);
