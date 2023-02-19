const Place = require("../models/placesModels");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const getPlaces = async (req, res, next) => {
  const places = await Place.find().exec();

  if (!places) {
    return next(new HttpError("Couldn't find places.", 404));
  }

  res.status(200).json(places);
};

const getOnePlace = async (req, res, next) => {
  const placeId = req.params.pId;
  const place = await Place.findById(placeId).exec();

  if (!place) {
    return next(new HttpError("Couldn't find place for the provided id.", 404));
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const getPlacesByLocation = async (req, res, next) => {
  const locName = req.params.loc;
  let placeByLocation;

  try {
    placeByLocation = await Place.find({ location: locName }).exec();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Could not find location.", 500));
  }

  res.status(200).json({
    getPlacesByLocation: placeByLocation.map((place) =>
      place.toObject({ getters: true })
    ),
  });
};

const createPlace = async (req, res, next) => {
  const validationError = validationResult(req);

  if (!validationError.isEmpty()) {
    console.log(validationError);
    return next(new HttpError("Invalid input, please check your data!", 422));
  }

  const createdPlace = new Place({
    placeName: req.body.placeName,
    location: req.body.location,
    image: req.body.image,
  });
  let result;
  try {
    result = await createdPlace.save();
  } catch (error) {
    console.log(error);
    return next(new HttpError("Creating place failed, please try again,", 500));
  }

  res.status(201).json(result);
};

const updatePlace = async (req, res, next) => {
  const validationError = validationResult(req);

  if (!validationError.isEmpty()) {
    console.log(validationError);
    return next(new HttpError("Invalid input, please check your data!", 422));
  }

  const { placeName, location, image } = req.body;
  const placeId = req.params.pId;

  let plc;
  try {
    plc = await Place.findById(placeId);
  } catch (error) {
    console.log(error);
    return next(new HttpError("Updating place failed, please try again.", 500));
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

  res.json({ plc: plc.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pId;
  let place;

  try {
    place = await Place.findById(placeId).exec();
  } catch (error) {
    console.log(error);
    return next(error);
  }

  try {
    await Place.remove(place);
  } catch (error) {
    console.log(error);
    return next(new HttpError("Deleting place failed, please try again.", 500));
  }

  res.json({
    message: `Place ${placeId} deleted.`,
  });
};

exports.createPlace = createPlace;
exports.getPlaces = getPlaces;
exports.getPlacesByLocation = getPlacesByLocation;
exports.getOnePlace = getOnePlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
