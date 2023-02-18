const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  placeName: {type: String, required: true},
  location: {type: String, required: true},
  image: {type: String, required: true},
});

module.exports = mongoose.model("Place", placeSchema);