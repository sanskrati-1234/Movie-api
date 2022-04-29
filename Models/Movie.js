const mongoose = require("mongoose");

const MovieModel = mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  year: {
    type: String,
    trim: true,
  },
  rating: {
    type: String,
    trim: true,
  },
  thumbnail: { type: String, trim: true },

  category: {
    type: String,
    trim: true,
  },
});
const Movie = new mongoose.model("movie", MovieModel);
module.exports = Movie;
