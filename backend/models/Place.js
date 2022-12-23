const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = Schema(
  {
    coordinates: {
      type: Object,
      required: true,
    },
    hours: Array,
    photo: String,
    rating: Number,
    title: {
      type: String,
      required: true,
    },
    website: String,
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
