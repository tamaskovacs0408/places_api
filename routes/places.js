const express = require("express");
const path = require("path");
const placesController = require('../controllers/mongooseController');

const router = express.Router();

router.get('/places', placesController.getPlaces);

router.get('/places/:pId', placesController.getOnePlace);

router.post('/places/create', placesController.createPlace);

router.put('/places/:pId', placesController.updatePlace);

router.delete('/places/:pId', placesController.deletePlace);

module.exports = router;