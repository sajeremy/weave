const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    category: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Location", locationSchema);
