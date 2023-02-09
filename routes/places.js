const express = require("express");
const placesController = require('../controllers/mongooseController');

const router = express.Router();

router.get('/', placesController.getWelcome);

router.get('/places', placesController.getPlaces);

router.get('/places/:pId', placesController.getOnePlace);

router.post('/create', placesController.createPlace);

router.put('/places/:pId', placesController.updatePlace);

router.delete('/places/:pId', placesController.deletePlace);

module.exports = router;