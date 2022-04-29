const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./db/Connection");
const Movie = require("./Models/Movie");
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded());
connectDB();
app.get("/movies", (req, res) => {
  res.send("get movies");
});

app.post("/movies", async (req, res) => {
  console.log("lin12", req.body);
  console.log(Movie);
  const data = new Movie(req.body);
  await data.save();
  res.sendStatus(200);

  //   const [title, year, rating, thumbnail, category] = req.body;
});
app.listen(port, () => {
  console.log(` listening on port ${port}`);
});
