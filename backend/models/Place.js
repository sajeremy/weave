const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },

    coordinates: {
      type: Object,
      required: true,
    },
    address: String,
    category: String,
    startDateTime: Date,
    endDateTime: Date,
    voteCount: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Location", placeSchema);
