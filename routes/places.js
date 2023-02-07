const express = require("express");
const placesController = require('../controllers/mongooseController');

const router = express.Router();

router.get('/', placesController.getPlaces);

router.get('/:pId', placesController.getOnePlace);

router.post('/create', placesController.createPlace);

router.put('/update/:pId', placesController.updatePlace);

router.delete('/delete/:pId', placesController.deletePlace);

module.exports = router;