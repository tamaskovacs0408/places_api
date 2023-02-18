const Place = require("../models/places");
const HttpError = require("../models/http-error");

const getPlaces = async (req, res, next) => {
  const places = await Place.find().exec();

  if(!places) {
    return next(new HttpError("Couldn't find places.", 404))
  }

  res.status(200).json(places);
};

const getOnePlace = async (req, res , next) => {
  const placeId = req.params.pId;
  const place = await Place.findById(placeId).exec();

  if (!place) {
    return next(new HttpError("Couldn't find place for the provided id.", 404))
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const createPlace = async (req, res, next) => {
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

  res.status(201).json(result);
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

exports.createPlace = createPlace;
exports.getPlaces = getPlaces;
exports.getOnePlace = getOnePlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
