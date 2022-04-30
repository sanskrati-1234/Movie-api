const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./db/Connection");
const Movie = require("./Models/Movie");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded());
connectDB();
app.get("/movies", async (req, res) => {
  try {
    const { search } = req.query;
    console.log("LIN13", search);
    const searchQ = {
      $or: [
        { title: new RegExp(search, "i") },
        { year: new RegExp(search, "i") },
        { rating: new RegExp(search, "i") },
        { thumbnail: new RegExp(search, "i") },
        { category: new RegExp(search, "i") },
      ],
    };
    res.send({
      data: {
        totalRecords: await Movie.find(searchQ).count(),
        results: await Movie.find(searchQ, {
          _id: 0,
          title: 1,
          year: 1,
          rating: 1,
          thumbnail: 1,
        }).limit(2),
      },
      meta: {
        message: "Movie details",
        code: 200,
      },
    });
  } catch (e) {
    res.send({
      data: {
        totalRecords: await Movie.find(searchQ).count(),
        results: [],
      },
      meta: {
        message: e.message,
        code: 200,
      },
    });
  }
});

app.post("/movies", async (req, res) => {
  console.log("lin12", req.body);
  console.log(Movie);
  try {
    const data = new Movie(req.body);
    await data.save();
    res.send({
      data: {
        totalRecords: await Movie.find().count(),
        results: [{ _id: data._id }],
      },
      meta: {
        message: "SUCCESS",
        code: 200,
      },
    });
  } catch (e) {
    res.send({
      data: {},
      meta: {
        message: e.message,
        code: 200,
      },
    });
  }
});
app.listen(port, () => {
  console.log(` listening on port ${port}`);
});
