const express = require("express");
const placesController = require('../controllers/mongooseController');

const router = express.Router();

router.get('/', placesController.getWelcome);

router.get('/api/places', placesController.getPlaces);

router.get('/api/places/:pId', placesController.getOnePlace);

router.post('/api/places', placesController.createPlace);

router.put('/api/places/:pId', placesController.updatePlace);

router.delete('/api/places/:pId', placesController.deletePlace);

module.exports = router;