const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  place: {type: String, required: true},
  image: {type: String, required: true},
});

module.exports = mongoose.model("Place", placeSchema);