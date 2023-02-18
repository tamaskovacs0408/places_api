const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

const placeRoutes = require("./routes/places");
const HttpError = require("./models/http-error");

const app = express();

const PORT = process.env.PORT;

const URL = `mongodb+srv://${process.env.MONGODB_ACC}:${process.env.MONGODB_PSW}@${process.env.MONGODB_CLUSTER}.wupqk8k.mongodb.net/?retryWrites=true&w=majority`;

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(placeRoutes);

app.use((req, res, next) => {
  return next(new HttpError("Could not find this route.", 404));
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({
    message: error.message || "An unknown error occurred.",
  });
});

mongoose.set("strictQuery", false);

mongoose
  .connect(URL)
  .then(() => {
    app.listen(PORT || 3000);
    console.log("Server's running and connected to the database.");
  })
  .catch((error) => {
    return next (new HttpError(`Connection to the database is failed.\nError: ${error}`, 503));
  });

module.exports = app;
