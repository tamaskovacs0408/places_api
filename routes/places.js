const express = require("express");
const { check } = require("express-validator");
const placesController = require('../controllers/mongooseController');

const router = express.Router();

router.get('/', placesController.getPlaces);

router.get('/:pId', placesController.getOnePlace);

router.post('/', placesController.createPlace);

router.put('/:pId', placesController.updatePlace);

router.delete('/:pId', placesController.deletePlace);

module.exports = router;