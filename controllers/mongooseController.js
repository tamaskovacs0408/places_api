const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const URL = `mongodb+srv://tkwebdev:${process.env.MONGODB_PSW}@placescluster.wupqk8k.mongodb.net/?retryWrites=true&w=majority`;

const Place = require("../models/places");

mongoose.set("strictQuery", false);

mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((error) => {
    console.log(`Connection to the database is failed!\nError: ${error}`);
  });

const getWelcome = async (req, res) => {
  res.send(
    "Welcome to the Places REST API! You can get the places at the /api/places route!"
  );
};

const getPlaces = async (req, res) => {
  const places = await Place.find().exec();

  res.json(places);
};

const getOnePlace = async (req, res) => {
  const placeId = req.params.pId;
  const place = await Place.findById(placeId).exec();

  res.json({ place: place.toObject({ getters: true }) });
};

const createPlace = async (req, res) => {
  const createdPlace = new Place({
    placeName: req.body.placeName,
    location: req.body.location,
    image: req.body.image,
  });
  let result;
  try {
    result = await createdPlace.save();
  } catch (error) {
    console.log(error)
  }

  res.json(result);
};

const updatePlace = async (req, res, next) => {
  const {placeName, location, image} = req.body;
  const placeId = req.params.pId;

  let plc;
  try {
    plc = await Place.findById(placeId);

  } catch (error) {
    console.log(error);
    return next(error);
  }

  plc.placeName = placeName;
  plc.location = location;
  plc.image = image;

  try {
    await plc.save();
  } catch (error) {
    console.log(error);
    return next(error);
  }

  res.json({plc: plc.toObject({getters: true})});
}


const deletePlace = async (req, res, next) => {
  const placeId = req.params.pId;
  let place;

  try {
    place = await Place.findById(placeId).exec()
  } catch (error) {
    console.log(error)
    return next(error);
  }

  try {
    await Place.deleteOne(place)
    //await Place.remove(place)
  } catch (error) {
    console.log(error)
    return next(error)
  }
  

  res.json({
    message: `Place ${placeId} deleted.`
  })
}

exports.getWelcome = getWelcome;
exports.createPlace = createPlace;
exports.getPlaces = getPlaces;
exports.getOnePlace = getOnePlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
