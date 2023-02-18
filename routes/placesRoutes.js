const express = require("express");
const { check } = require("express-validator");
const placesController = require("../controllers/placesControllers");

const router = express.Router();

router.get("/", placesController.getPlaces);

router.get("/:pId", placesController.getOnePlace);

router.post(
  "/",
  [
    check("placeName").trim().not().isEmpty(),
    check("location").trim().toLowerCase().not().isEmpty(),
    check("image").trim().not().isEmpty()
  ],
  placesController.createPlace
);

router.put(
  "/:pId",
  [
    check("placeName").trim().not().isEmpty(),
    check("location").trim().toLowerCase().not().isEmpty(),
    check("image").trim().not().isEmpty(),
  ],
  placesController.updatePlace
);

router.delete("/:pId", placesController.deletePlace);

module.exports = router;
